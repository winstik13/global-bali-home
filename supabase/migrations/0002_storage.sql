-- ============================================================
-- Global Bali Home Admin · Storage bucket 'images' (migration 0002)
-- ============================================================
-- Bucket для всех картинок сайта: галерея проектов, планы этажей,
-- OG-превью. Публичное чтение (CDN-URL'ы embed'ятся прямо в HTML),
-- запись — только авторизованные с правом can_edit_content.
--
-- Структура путей внутри bucket:
--   gallery/<project>/<filename>.webp
--   plans/<project>/<filename>.webp
--   og/<filename>.webp
-- ============================================================

-- ─── bucket ───
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,                                    -- публичное чтение через CDN
  10485760,                                -- 10 MB на файл
  array['image/webp', 'image/jpeg', 'image/png']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ─── policies ───
-- Чтение — публично (bucket public = true это уже даёт, но дублируем
-- явной policy для прозрачности).
drop policy if exists "images_public_read" on storage.objects;
create policy "images_public_read" on storage.objects
  for select to public
  using (bucket_id = 'images');

-- Загрузка — авторизованные (роли super_admin/admin/editor).
-- can_edit_content проверка делается на уровне content-обновления,
-- сама загрузка файла доступна всем залогиненным (иначе UX ломается:
-- editor не может загрузить картинку для testimonial).
drop policy if exists "images_authenticated_upload" on storage.objects;
create policy "images_authenticated_upload" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'images'
    and public.current_role_name() is not null  -- юзер активен и в profiles
  );

-- Обновление (replace) — авторизованные.
drop policy if exists "images_authenticated_update" on storage.objects;
create policy "images_authenticated_update" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'images'
    and public.current_role_name() is not null
  );

-- Удаление — admin и super_admin. Editor не может удалять файлы
-- (защита от случайного «очистил галерею»).
drop policy if exists "images_admin_delete" on storage.objects;
create policy "images_admin_delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'images'
    and public.is_admin_or_super()
  );
