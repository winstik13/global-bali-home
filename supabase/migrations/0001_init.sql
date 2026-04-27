-- ============================================================
-- Global Bali Home Admin · Initial schema (migration 0001)
-- ============================================================
-- Single-tenant. 3 роли: super_admin, admin, editor.
-- Контент хранится JSON-блоками (5 row в site_content).
-- Build-скрипт читает их service_role-ключом и генерит
-- data/*.js + gallery-data.js на каждом Vercel build.
-- ============================================================

create extension if not exists "pgcrypto";

-- ─── helpers ───
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- ============================================================
-- profiles: расширение auth.users
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'editor'
    check (role in ('super_admin', 'admin', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Автосоздание профиля при insert в auth.users.
-- Дефолтная роль 'editor' — server-action invite сам поднимает её до нужной.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── role helpers ───
-- security definer чтобы из RLS-политик можно было читать profiles
-- без рекурсии (read-policy на profiles → читаем profiles → петля).

create or replace function public.current_role_name() returns text
language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid() and is_active = true;
$$;

create or replace function public.is_super_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role_name() = 'super_admin', false);
$$;

create or replace function public.is_admin_or_super() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role_name() in ('super_admin', 'admin'), false);
$$;

-- editor может править только эти keys; admin и super_admin — все.
create or replace function public.can_edit_content(p_key text) returns boolean
language sql stable security definer set search_path = public as $$
  select case
    when public.current_role_name() in ('super_admin', 'admin') then true
    when public.current_role_name() = 'editor' then p_key in ('gallery', 'faq', 'testimonials')
    else false
  end;
$$;

-- ============================================================
-- site_content: JSON-блоки контента (5 фиксированных keys)
-- ============================================================
create table public.site_content (
  key text primary key
    check (key in ('site', 'projects', 'gallery', 'faq', 'testimonials')),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

create or replace function public.touch_site_content() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end; $$;

create trigger site_content_touch before update on public.site_content
  for each row execute function public.touch_site_content();

-- Сидим пустые row, чтобы упрощённое UPSERT работало с самого начала.
-- Реальные данные зальёт миграционный скрипт scripts/migrate-content.js
insert into public.site_content (key, data) values
  ('site', '{}'::jsonb),
  ('projects', '{}'::jsonb),
  ('gallery', '{"villas":[],"estates":[],"village":[]}'::jsonb),
  ('faq', '[]'::jsonb),
  ('testimonials', '[]'::jsonb)
on conflict (key) do nothing;

-- ============================================================
-- audit_log: кто что менял
-- ============================================================
create table public.audit_log (
  id bigserial primary key,
  user_id uuid references public.profiles(id) on delete set null,
  user_email text,
  action text not null,                   -- 'content.update', 'user.invite', 'user.delete', и т.д.
  target text,                            -- ключ контента или email инвайтнутого юзера
  changes jsonb,                          -- произвольный context
  created_at timestamptz not null default now()
);
create index audit_log_created_at_idx on public.audit_log (created_at desc);
create index audit_log_user_idx on public.audit_log (user_id, created_at desc);

-- ============================================================
-- Row-Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.site_content enable row level security;
alter table public.audit_log enable row level security;

-- ─── profiles ───
-- Любой залогиненный видит всех (нужно для UI «список членов команды»).
-- Менять/удалять — только super_admin (через service_role в server-action).
drop policy if exists "profiles_read_authenticated" on public.profiles;
create policy "profiles_read_authenticated" on public.profiles
  for select to authenticated using (true);

drop policy if exists "profiles_update_super_admin" on public.profiles;
create policy "profiles_update_super_admin" on public.profiles
  for update to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "profiles_delete_super_admin" on public.profiles;
create policy "profiles_delete_super_admin" on public.profiles
  for delete to authenticated
  using (public.is_super_admin());

-- INSERT идёт только из триггера on_auth_user_created (security definer).
-- Прямой клиентский INSERT запрещаем — нет policy.

-- ─── site_content ───
-- Читать — любой залогиненный (для UI). Build использует service_role,
-- который обходит RLS, так что анон-доступ не нужен.
drop policy if exists "site_content_read_authenticated" on public.site_content;
create policy "site_content_read_authenticated" on public.site_content
  for select to authenticated using (true);

-- UPDATE — через can_edit_content(key)
drop policy if exists "site_content_update_by_role" on public.site_content;
create policy "site_content_update_by_role" on public.site_content
  for update to authenticated
  using (public.can_edit_content(key))
  with check (public.can_edit_content(key));

-- INSERT/DELETE — только super_admin (новые keys/удаление). Обычно не нужно.
drop policy if exists "site_content_insert_super_admin" on public.site_content;
create policy "site_content_insert_super_admin" on public.site_content
  for insert to authenticated
  with check (public.is_super_admin());

drop policy if exists "site_content_delete_super_admin" on public.site_content;
create policy "site_content_delete_super_admin" on public.site_content
  for delete to authenticated
  using (public.is_super_admin());

-- ─── audit_log ───
-- super_admin видит всё, остальные — только свои записи.
drop policy if exists "audit_log_read_by_role" on public.audit_log;
create policy "audit_log_read_by_role" on public.audit_log
  for select to authenticated
  using (public.is_super_admin() or user_id = auth.uid());

-- INSERT — любой залогиненный (логирование своих действий).
-- Защита от подделки user_id — через trigger ниже.
drop policy if exists "audit_log_insert_authenticated" on public.audit_log;
create policy "audit_log_insert_authenticated" on public.audit_log
  for insert to authenticated
  with check (true);

-- Принудительно проставляем user_id и user_email из auth.uid() —
-- юзер не может писать запись от чужого имени.
create or replace function public.audit_log_set_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_email text;
begin
  new.user_id = auth.uid();
  select email into v_email from public.profiles where id = auth.uid();
  new.user_email = v_email;
  return new;
end; $$;

create trigger audit_log_set_user_trg before insert on public.audit_log
  for each row execute function public.audit_log_set_user();

-- ============================================================
-- Готово. Следующие шаги (отдельные миграции / руками):
--   1. Storage bucket 'images' с RLS (миграция 0002)
--   2. Bootstrap первого super_admin:
--        update public.profiles
--        set role = 'super_admin'
--        where email = 'winstik@gmail.com';
--   3. Запуск scripts/migrate-content.js (зальёт текущий site-data.js
--      и картинки в Supabase)
-- ============================================================
