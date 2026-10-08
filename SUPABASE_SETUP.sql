-- RythuMitra V10.9 cloud table
-- Run this in Supabase SQL Editor for your own project.
create table if not exists public.farmer_cloud_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.farmer_cloud_data enable row level security;

create policy "Users can read their own RythuMitra cloud data"
on public.farmer_cloud_data for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own RythuMitra cloud data"
on public.farmer_cloud_data for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own RythuMitra cloud data"
on public.farmer_cloud_data for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
