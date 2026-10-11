alter table public.orders
  add column if not exists ebook_download_token_hash text;

alter table public.orders
  drop constraint if exists orders_ebook_download_token_hash_format;
alter table public.orders
  add constraint orders_ebook_download_token_hash_format
    check (
      ebook_download_token_hash is null
      or ebook_download_token_hash ~ '^[0-9a-f]{64}$'
    );

create unique index if not exists orders_ebook_download_token_hash_idx
  on public.orders (ebook_download_token_hash)
  where ebook_download_token_hash is not null;

create or replace function public.ensure_order_ebook_download_token_hash(
  p_order_id uuid,
  p_token_hash text
)
returns boolean
language plpgsql
set search_path = public
as $$
declare
  v_payment_method text;
  v_payment_status text;
  v_order_status text;
  v_existing_hash text;
begin
  if p_token_hash is null or p_token_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'Invalid eBook download token hash';
  end if;

  select
    orders.payment_method,
    orders.payment_status,
    orders.order_status,
    orders.ebook_download_token_hash
  into
    v_payment_method,
    v_payment_status,
    v_order_status,
    v_existing_hash
  from public.orders as orders
  where orders.id = p_order_id
  for update;

  if not found
    or v_order_status = 'cancelled'
    or not (
      (v_payment_method = 'cod' and v_payment_status in ('pending', 'paid'))
      or (v_payment_method = 'card' and v_payment_status = 'paid')
    ) then
    return false;
  end if;

  if v_existing_hash is not null and v_existing_hash <> p_token_hash then
    raise exception 'eBook token hash does not match the existing order token';
  end if;

  update public.orders
  set ebook_download_token_hash = p_token_hash
  where id = p_order_id
    and ebook_download_token_hash is null;

  return true;
end;
$$;

revoke all on function public.ensure_order_ebook_download_token_hash(uuid, text)
  from public, anon, authenticated;
grant execute on function public.ensure_order_ebook_download_token_hash(uuid, text)
  to service_role;
