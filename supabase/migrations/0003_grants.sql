-- ============================================================
-- Global Bali Home Admin · Grants (migration 0003)
-- ============================================================
-- Поскольку при создании Supabase-проекта мы выключили
-- "Automatically expose new tables and functions", роли Data API
-- (anon / authenticated / service_role) не получили автоматический
-- GRANT на наши таблицы. Выдаём вручную.
--
-- Замечания:
--  • service_role обходит RLS, но GRANT на таблицу всё равно нужен.
--  • authenticated + RLS-политики управляют доступом из админки.
--  • anon оставляем БЕЗ доступа — публичный сайт читает данные через
--    статические .js файлы (после build), напрямую к Supabase он не ходит.
-- ============================================================

-- Schema usage (на всякий случай — обычно есть, но дублируем явно).
grant usage on schema public to authenticated, service_role;

-- profiles
grant select, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;

-- site_content
grant select, update on public.site_content to authenticated;
grant all on public.site_content to service_role;

-- audit_log
grant select, insert on public.audit_log to authenticated;
grant all on public.audit_log to service_role;

-- Sequences (для bigserial id в audit_log).
grant usage, select on all sequences in schema public to authenticated, service_role;

-- Default privileges — чтобы будущие таблицы/последовательности тоже получали
-- грант автоматически (без необходимости править эту миграцию).
alter default privileges in schema public
  grant select, update on tables to authenticated;
alter default privileges in schema public
  grant all on tables to service_role;
alter default privileges in schema public
  grant usage, select on sequences to authenticated, service_role;
