-- Enable Row Level Security
alter table "public"."collections" enable row level security;
alter table "public"."dresses" enable row level security;

-- Create policies for collections table
create policy "Allow authenticated users to view collections"
  on "public"."collections"
  for select
  to authenticated
  using (true);

create policy "Allow authenticated users to create collections"
  on "public"."collections"
  for insert
  to authenticated
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to update their collections"
  on "public"."collections"
  for update
  to authenticated
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to delete their collections"
  on "public"."collections"
  for delete
  to authenticated
  using (auth.role() = 'authenticated');

-- Create policies for dresses table
create policy "Allow authenticated users to view dresses"
  on "public"."dresses"
  for select
  to authenticated
  using (true);

create policy "Allow authenticated users to create dresses"
  on "public"."dresses"
  for insert
  to authenticated
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to update their dresses"
  on "public"."dresses"
  for update
  to authenticated
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to delete their dresses"
  on "public"."dresses"
  for delete
  to authenticated
  using (auth.role() = 'authenticated');

-- Allow public access to view collections and dresses
create policy "Allow public to view collections"
  on "public"."collections"
  for select
  to anon
  using (true);

create policy "Allow public to view dresses"
  on "public"."dresses"
  for select
  to anon
  using (true);