create table public.purchase_requests (
  id uuid primary key default gen_random_uuid(),
  item text not null,
  quantity int not null,
  reason text,
  created_at timestamp default now()
);
