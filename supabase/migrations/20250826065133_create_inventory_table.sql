create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text unique not null,
  description text,
  category text,
  stock integer not null default 0,
  min integer not null default 0,
  price numeric(10,2) not null default 0.00,
  supplier text,
  warehouse text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
