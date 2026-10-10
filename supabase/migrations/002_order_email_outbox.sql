create table if not exists public.order_email_outbox (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  recipient_type text not null check (recipient_type in ('customer', 'owner')),
  recipient_email text not null,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'sent', 'failed')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  next_attempt_at timestamptz not null default now(),
  lease_token uuid,
  lease_expires_at timestamptz,
  resend_email_id text,
  last_error_code text,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  unique (order_id, recipient_type),
  check ((status = 'processing') = (lease_token is not null)),
  check ((status = 'processing') = (lease_expires_at is not null))
);

create index if not exists order_email_outbox_pending_idx
  on public.order_email_outbox (next_attempt_at, created_at)
  where status in ('pending', 'processing');

alter table public.order_email_outbox enable row level security;
revoke all on public.order_email_outbox from public, anon, authenticated;
grant all on public.order_email_outbox to service_role;

create or replace function public.enqueue_order_email_notifications(
  p_order_id uuid,
  p_owner_email text
)
returns void
language plpgsql
set search_path = public
as $$
declare
  v_customer_email text;
begin
  if p_owner_email is null or length(trim(p_owner_email)) = 0 then
    raise exception 'Owner email is required';
  end if;

  select customer_email into v_customer_email
  from public.orders
  where id = p_order_id;

  if v_customer_email is null then
    raise exception 'Order does not exist';
  end if;

  insert into public.order_email_outbox (
    order_id,
    recipient_type,
    recipient_email
  )
  values
    (p_order_id, 'customer', v_customer_email),
    (p_order_id, 'owner', trim(p_owner_email))
  on conflict (order_id, recipient_type) do nothing;
end;
$$;

create or replace function public.create_order_with_items(
  p_idempotency_key text,
  p_idempotency_hash text,
  p_order jsonb,
  p_items jsonb,
  p_owner_email text
)
returns table (order_id uuid, order_number text, created boolean)
language plpgsql
set search_path = public
as $$
declare
  v_order_id uuid;
  v_order_number text;
  v_existing_hash text;
  v_payment_method text;
  v_subtotal integer;
  v_shipping integer;
  v_total integer;
  v_items_subtotal bigint;
begin
  if p_idempotency_key is null or length(p_idempotency_key) > 100
    or p_idempotency_hash is null or length(p_idempotency_hash) <> 64
    or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Invalid order payload';
  end if;

  v_payment_method := p_order ->> 'payment_method';
  v_subtotal := (p_order ->> 'subtotal_rsd')::integer;
  v_shipping := (p_order ->> 'shipping_rsd')::integer;
  v_total := (p_order ->> 'total_rsd')::integer;
  if v_payment_method not in ('cod', 'card')
    or v_subtotal < 0 or v_shipping < 0 or v_total <> v_subtotal + v_shipping then
    raise exception 'Invalid order pricing';
  end if;

  select coalesce(sum(item.quantity::bigint * item.unit_price_rsd::bigint), 0)
  into v_items_subtotal
  from jsonb_to_recordset(p_items) as item(
    quantity integer,
    unit_price_rsd integer
  );
  if v_items_subtotal <> v_subtotal then
    raise exception 'Order item subtotal mismatch';
  end if;

  v_order_id := gen_random_uuid();
  v_order_number :=
    'OD-' || to_char(clock_timestamp(), 'YYYYMMDD') || '-' ||
    upper(substr(replace(v_order_id::text, '-', ''), 1, 8));

  insert into public.orders as inserted_order (
    id,
    order_number,
    customer_name,
    customer_email,
    customer_phone,
    shipping_address,
    shipping_city,
    shipping_postal_code,
    shipping_country,
    customer_note,
    payment_method,
    payment_status,
    order_status,
    subtotal_rsd,
    shipping_rsd,
    total_rsd,
    idempotency_key,
    idempotency_hash
  )
  values (
    v_order_id,
    v_order_number,
    p_order ->> 'customer_name',
    p_order ->> 'customer_email',
    p_order ->> 'customer_phone',
    p_order ->> 'shipping_address',
    p_order ->> 'shipping_city',
    p_order ->> 'shipping_postal_code',
    p_order ->> 'shipping_country',
    nullif(p_order ->> 'customer_note', ''),
    v_payment_method,
    'pending',
    'new',
    v_subtotal,
    v_shipping,
    v_total,
    p_idempotency_key,
    p_idempotency_hash
  )
  on conflict (idempotency_key) do nothing
  returning inserted_order.id, inserted_order.order_number
  into v_order_id, v_order_number;

  if v_order_id is null then
    select orders.id, orders.order_number, orders.idempotency_hash
    into v_order_id, v_order_number, v_existing_hash
    from public.orders as orders
    where orders.idempotency_key = p_idempotency_key;

    if v_existing_hash is distinct from p_idempotency_hash then
      raise exception 'Idempotency key reused with different order data';
    end if;

    if v_payment_method = 'cod' then
      perform public.enqueue_order_email_notifications(v_order_id, p_owner_email);
    end if;
    return query select v_order_id, v_order_number, false;
    return;
  end if;

  insert into public.order_items (
    order_id,
    product_id,
    product_name,
    variant_id,
    variant_name,
    quantity,
    unit_price_rsd,
    line_total_rsd
  )
  select
    v_order_id,
    item.product_id,
    item.product_name,
    item.variant_id,
    item.variant_name,
    item.quantity,
    item.unit_price_rsd,
    item.line_total_rsd
  from jsonb_to_recordset(p_items) as item(
    product_id text,
    product_name text,
    variant_id text,
    variant_name text,
    quantity integer,
    unit_price_rsd integer,
    line_total_rsd integer
  );

  if v_payment_method = 'cod' then
    perform public.enqueue_order_email_notifications(v_order_id, p_owner_email);
  end if;

  return query select v_order_id, v_order_number, true;
end;
$$;

create or replace function public.apply_stripe_order_payment(
  p_order_id uuid,
  p_stripe_session_id text,
  p_payment_status text,
  p_owner_email text
)
returns boolean
language plpgsql
set search_path = public
as $$
declare
  v_current_status text;
  v_order_status text;
begin
  if p_payment_status not in ('paid', 'failed') then
    raise exception 'Invalid Stripe payment status';
  end if;

  select orders.payment_status, orders.order_status
  into v_current_status, v_order_status
  from public.orders as orders
  where orders.id = p_order_id
    and orders.stripe_session_id = p_stripe_session_id
    and orders.payment_method = 'card'
  for update;

  if not found or v_order_status = 'cancelled' then
    return false;
  end if;

  if v_current_status = 'paid' then
    if p_payment_status = 'paid' then
      perform public.enqueue_order_email_notifications(p_order_id, p_owner_email);
      return true;
    end if;
    return false;
  end if;

  update public.orders
  set payment_status = p_payment_status
  where id = p_order_id;

  if p_payment_status = 'paid' then
    perform public.enqueue_order_email_notifications(p_order_id, p_owner_email);
  end if;

  return true;
end;
$$;

create or replace function public.claim_order_email_notifications(
  p_order_id uuid default null,
  p_limit integer default 10
)
returns table (
  notification_id uuid,
  order_id uuid,
  recipient_type text,
  recipient_email text,
  attempt_count integer,
  claim_token uuid
)
language sql
set search_path = public
as $$
  with exhausted as (
    update public.order_email_outbox as outbox
    set
      status = 'failed',
      lease_token = null,
      lease_expires_at = null,
      last_error_code = 'worker_lease_expired'
    where outbox.status = 'processing'
      and outbox.lease_expires_at <= now()
      and outbox.attempt_count >= 5
    returning outbox.id
  ),
  candidates as (
    select outbox.id
    from public.order_email_outbox as outbox
    where
      (p_order_id is null or outbox.order_id = p_order_id)
      and outbox.attempt_count < 5
      and (
        (outbox.status = 'pending' and outbox.next_attempt_at <= now())
        or
        (
          outbox.status = 'processing'
          and outbox.lease_expires_at <= now()
          and not exists (select 1 from exhausted where exhausted.id = outbox.id)
        )
      )
    order by outbox.created_at, outbox.recipient_type
    for update of outbox skip locked
    limit greatest(1, least(p_limit, 50))
  ),
  claimed as (
    update public.order_email_outbox as outbox
    set
      status = 'processing',
      attempt_count = outbox.attempt_count + 1,
      lease_token = gen_random_uuid(),
      lease_expires_at = now() + interval '5 minutes'
    from candidates
    where outbox.id = candidates.id
    returning outbox.id, outbox.order_id, outbox.recipient_type,
      outbox.recipient_email, outbox.attempt_count, outbox.lease_token
  )
  select claimed.id, claimed.order_id, claimed.recipient_type,
    claimed.recipient_email, claimed.attempt_count, claimed.lease_token
  from claimed;
$$;

create or replace function public.mark_order_email_sent(
  p_notification_id uuid,
  p_claim_token uuid,
  p_resend_email_id text
)
returns boolean
language plpgsql
set search_path = public
as $$
begin
  update public.order_email_outbox
  set
    status = 'sent',
    sent_at = now(),
    resend_email_id = p_resend_email_id,
    lease_token = null,
    lease_expires_at = null,
    last_error_code = null
  where id = p_notification_id
    and status = 'processing'
    and lease_token = p_claim_token;
  return found;
end;
$$;

create or replace function public.mark_order_email_failed(
  p_notification_id uuid,
  p_claim_token uuid,
  p_error_code text
)
returns boolean
language plpgsql
set search_path = public
as $$
declare
  v_attempt_count integer;
begin
  select attempt_count into v_attempt_count
  from public.order_email_outbox
  where id = p_notification_id
    and status = 'processing'
    and lease_token = p_claim_token
  for update;

  if not found then
    return false;
  end if;

  update public.order_email_outbox
  set
    status = case when v_attempt_count >= 5 then 'failed' else 'pending' end,
    next_attempt_at = now() + make_interval(
      secs => least(3600, 60 * (2 ^ least(v_attempt_count, 6))::integer)
    ),
    lease_token = null,
    lease_expires_at = null,
    last_error_code = left(coalesce(p_error_code, 'unknown'), 80)
  where id = p_notification_id;
  return true;
end;
$$;

create or replace function public.retry_failed_order_emails(p_order_number text)
returns integer
language plpgsql
set search_path = public
as $$
declare
  v_order_id uuid;
  v_updated integer;
begin
  select id into v_order_id
  from public.orders
  where order_number = p_order_number;
  if not found then
    return 0;
  end if;

  update public.order_email_outbox
  set
    status = 'pending',
    attempt_count = 0,
    next_attempt_at = now(),
    last_error_code = null
  where order_id = v_order_id
    and status = 'failed';
  get diagnostics v_updated = row_count;
  return v_updated;
end;
$$;

revoke all on function public.enqueue_order_email_notifications(uuid, text)
  from public, anon, authenticated;
revoke all on function public.create_order_with_items(text, text, jsonb, jsonb, text)
  from public, anon, authenticated;
revoke all on function public.apply_stripe_order_payment(uuid, text, text, text)
  from public, anon, authenticated;
revoke all on function public.claim_order_email_notifications(uuid, integer)
  from public, anon, authenticated;
revoke all on function public.mark_order_email_sent(uuid, uuid, text)
  from public, anon, authenticated;
revoke all on function public.mark_order_email_failed(uuid, uuid, text)
  from public, anon, authenticated;
revoke all on function public.retry_failed_order_emails(text)
  from public, anon, authenticated;

grant execute on function public.create_order_with_items(text, text, jsonb, jsonb, text)
  to service_role;
grant execute on function public.enqueue_order_email_notifications(uuid, text)
  to service_role;
grant execute on function public.apply_stripe_order_payment(uuid, text, text, text)
  to service_role;
grant execute on function public.claim_order_email_notifications(uuid, integer)
  to service_role;
grant execute on function public.mark_order_email_sent(uuid, uuid, text)
  to service_role;
grant execute on function public.mark_order_email_failed(uuid, uuid, text)
  to service_role;
grant execute on function public.retry_failed_order_emails(text)
  to service_role;
