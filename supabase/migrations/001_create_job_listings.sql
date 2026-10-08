-- Run once in the SQL Editor of a NEW student Supabase project.
-- Save the same file in the student's repository under supabase/migrations/.
-- Application users are created in Authentication > Users, not in this SQL file.

create table public.job_listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users(id) on delete cascade,
  company text not null check (length(btrim(company)) between 2 and 100),
  logo_url text,
  position text not null check (length(btrim(position)) between 2 and 150),
  role text not null check (role in ('Frontend', 'Backend', 'Fullstack')),
  level text not null check (level in ('Junior', 'Midweight', 'Senior')),
  contract text not null check (contract in ('Full Time', 'Part Time', 'Contract')),
  location text not null check (length(btrim(location)) between 2 and 100),
  languages text[] not null default '{}'::text[],
  tools text[] not null default '{}'::text[],
  is_new boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index job_listings_user_id_idx on public.job_listings (user_id);
create index job_listings_created_at_idx on public.job_listings (created_at desc);

alter table public.job_listings enable row level security;

-- Grants decide which operations a role may try; RLS decides which rows.
revoke all on table public.job_listings from anon, authenticated;
grant select on table public.job_listings to anon, authenticated;
grant insert, update, delete on table public.job_listings to authenticated;

create policy "Anyone can read job listings"
  on public.job_listings for select
  to anon, authenticated
  using (true);

create policy "Users can create their own job listings"
  on public.job_listings for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own job listings"
  on public.job_listings for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own job listings"
  on public.job_listings for delete
  to authenticated
  using ((select auth.uid()) = user_id);

