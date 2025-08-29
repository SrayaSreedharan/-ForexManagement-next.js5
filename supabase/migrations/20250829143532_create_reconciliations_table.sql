create table reconciliations (
  id uuid primary key default gen_random_uuid(),
  purchase_request_id uuid references purchase_requests(id) on delete cascade,
  requested_amount numeric not null,
  invoice_amount numeric not null,
  status text check (status in ('Matched','Mismatch')) default 'Matched',
  reconciled_by text,
  created_at timestamp default now()
);
