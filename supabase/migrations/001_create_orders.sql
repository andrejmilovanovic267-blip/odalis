create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_postal_code text not null,
  shipping_country text not null check (char_length(shipping_country) = 2),
  customer_note text,
  payment_method text not null check (payment_method in ('cod', 'card')),
  payment_status text not null check (payment_status in ('pending', 'paid', 'failed')),
  order_status text not null check (
    order_status in ('new', 'processing', 'shipped', 'delivered', 'cancelled')
  ),
  subtotal_rsd integer not null check (subtotal_rsd >= 0),
  shipping_rsd integer not null check (shipping_rsd >= 0),
  total_rsd integer not null check (total_rsd >= 0),
  stripe_session_id text unique,
  idempotency_key text not null unique,
  idempotency_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (subtotal_rsd + shipping_rsd = total_rsd)
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  variant_id text,
  variant_name text,
  quantity integer not null check (quantity > 0),
  unit_price_rsd integer not null check (unit_price_rsd >= 0),
  line_total_rsd integer not null check (
    line_total_rsd >= 0 and line_total_rsd = unit_price_rsd * quantity
  )
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_payment_status_idx on public.orders (payment_status);
create index if not exists orders_order_status_idx on public.orders (order_status);
create index if not exists order_items_order_id_idx on public.order_items (order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create or replace function public.create_order_with_items(
  p_idempotency_key text,
  p_idempotency_hash text,
  p_order jsonb,
  p_items jsonb
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

  return query select v_order_id, v_order_number, true;
end;
$$;

create or replace function public.apply_stripe_order_payment(
  p_order_id uuid,
  p_stripe_session_id text,
  p_payment_status text
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
    return p_payment_status = 'paid';
  end if;

  update public.orders
  set payment_status = p_payment_status
  where id = p_order_id;

  return true;
end;
$$;

create or replace function public.set_order_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_order_updated_at();

revoke all on public.orders, public.order_items from public, anon, authenticated;
grant all on public.orders, public.order_items to service_role;
revoke all on function public.create_order_with_items(text, text, jsonb, jsonb)
  from public, anon, authenticated;
revoke all on function public.apply_stripe_order_payment(uuid, text, text)
  from public, anon, authenticated;
grant execute on function public.create_order_with_items(text, text, jsonb, jsonb)
  to service_role;
grant execute on function public.apply_stripe_order_payment(uuid, text, text)
  to service_role;
