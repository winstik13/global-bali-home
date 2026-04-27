/**
 * One-time migration · текущие data/*.js + images/ → Supabase
 *
 * Запускается ОДИН РАЗ локально для первичного наполнения БД и Storage.
 * После этого источник истины — Supabase, build-script читает оттуда.
 *
 * Что делает:
 *   1. Читает локальные data/site-data.js, projects-data.js, faq-data.js,
 *      testimonials-data.js, gallery-data.js
 *   2. UPSERT'ит каждую структуру в site_content (по key)
 *   3. Загружает все картинки из images/<project>/* в Supabase Storage
 *      bucket 'images' под путями gallery/<project>/<filename>
 *   4. Перезаписывает gallery row с новыми CDN-URL'ами вместо локальных путей
 *
 * Запуск:
 *   node scripts/migrate-content.mjs              # dry-run (только проверка)
 *   node scripts/migrate-content.mjs --apply      # реально применить
 *
 * Идемпотентен: повторный запуск не дублирует — UPSERT по key + upsert на
 * Storage upload (overwrite=true).
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, resolve, basename, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..');

const APPLY = process.argv.includes('--apply');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('❌ SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY обязательны.');
  console.error('   Создай .env.local с этими переменными или передай в env при запуске.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

console.log(`🔄 Migration ${APPLY ? '(APPLY)' : '(DRY-RUN)'} · ${SUPABASE_URL}`);
console.log(`   Repo root: ${ROOT}\n`);

// ─── 1. Загрузить локальные данные ───
// data/*.js — это просто `const X = {...};`. Eval через dynamic import не сработает
// (нет export), поэтому парсим вручную: читаем как текст, отрезаем `const X = `,
// убираем `;` в конце, парсим JSON.

// Файлы data/*.js — это валидный JS (`const X = {...};`), но НЕ валидный JSON
// (могут содержать табы / unescape-символы в строках). Поэтому исполняем их
// как JS в изолированном vm-контексте и забираем глобальную переменную.
function loadDataFile(relPath, varName) {
  const fullPath = resolve(ROOT, relPath);
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠️  ${relPath} не найден — пропускаем.`);
    return null;
  }
  // const-declared переменные НЕ попадают в sandbox (lexical scope),
  // поэтому подменяем на var — тогда они оседают в глобальном объекте контекста.
  const code = readFileSync(fullPath, 'utf8')
    .replace(new RegExp(`\\bconst\\s+${varName}\\b`), `var ${varName}`);
  const sandbox = {};
  try {
    vm.runInNewContext(code, sandbox, { filename: relPath, timeout: 5000 });
  } catch (err) {
    console.error(`  ❌ Не удалось выполнить ${relPath}: ${err.message}`);
    process.exit(1);
  }
  if (!(varName in sandbox)) {
    console.error(`  ❌ В ${relPath} не найдена переменная ${varName}`);
    process.exit(1);
  }
  return sandbox[varName];
}

const SOURCES = {
  site:         { file: 'data/site-data.js',         varName: 'SITE_DATA' },
  projects:     { file: 'data/projects-data.js',     varName: 'PROJECTS_DATA' },
  faq:          { file: 'data/faq-data.js',          varName: 'FAQ_DATA' },
  testimonials: { file: 'data/testimonials-data.js', varName: 'TESTIMONIALS_DATA' },
  gallery:      { file: 'gallery-data.js',           varName: 'GALLERY_DATA' },
};

console.log('📖 Чтение локальных файлов:');
const loaded = {};
for (const [key, { file, varName }] of Object.entries(SOURCES)) {
  const data = loadDataFile(file, varName);
  loaded[key] = data;
  if (data) {
    const size = JSON.stringify(data).length;
    const items = Array.isArray(data) ? `${data.length} items` :
                  typeof data === 'object' ? `${Object.keys(data).length} keys` : '?';
    console.log(`  ✅ ${file} (${(size/1024).toFixed(1)} KB · ${items})`);
  }
}

// ─── 2. Загрузить картинки в Storage ───
console.log('\n🖼️  Поиск картинок в images/:');

const IMAGES_ROOT = resolve(ROOT, 'images');
const PROJECT_DIRS = ['serenity-villas', 'serenity-estates', 'serenity-village'];
const GALLERY_KEYS = { 'serenity-villas': 'villas', 'serenity-estates': 'estates', 'serenity-village': 'village' };

const imagesToUpload = [];
for (const dir of PROJECT_DIRS) {
  const dirPath = resolve(IMAGES_ROOT, dir);
  if (!existsSync(dirPath)) {
    console.warn(`  ⚠️  ${dir}/ не найдена.`);
    continue;
  }
  const files = readdirSync(dirPath).filter(f => /\.(webp|jpe?g|png)$/i.test(f));
  console.log(`  ${dir}/: ${files.length} файлов`);
  for (const file of files) {
    imagesToUpload.push({
      localPath: resolve(dirPath, file),
      storagePath: `gallery/${dir}/${file}`,
      project: dir,
      galleryKey: GALLERY_KEYS[dir],
      filename: file,
    });
  }
}
console.log(`  ИТОГО: ${imagesToUpload.length} картинок\n`);

// ─── 3. APPLY: upload + upsert site_content ───
if (!APPLY) {
  console.log('🚧 DRY-RUN — ничего не применено. Запусти с --apply чтобы применить.');
  process.exit(0);
}

console.log('📤 Загрузка картинок в Storage bucket "images":');
const urlMap = {}; // localPath → public URL

let uploaded = 0;
let failed = 0;
for (const img of imagesToUpload) {
  const buf = readFileSync(img.localPath);
  const mime = img.filename.toLowerCase().endsWith('.webp') ? 'image/webp' :
               img.filename.toLowerCase().match(/\.(jpe?g)$/) ? 'image/jpeg' : 'image/png';
  const { error } = await supabase.storage
    .from('images')
    .upload(img.storagePath, buf, { contentType: mime, upsert: true });
  if (error) {
    console.error(`  ❌ ${img.storagePath}: ${error.message}`);
    failed++;
    continue;
  }
  const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(img.storagePath);
  urlMap[`images/${img.project}/${img.filename}`] = publicUrl;
  uploaded++;
  if (uploaded % 10 === 0) console.log(`  ... ${uploaded}/${imagesToUpload.length}`);
}
console.log(`  ✅ ${uploaded} загружено, ${failed} провалено.\n`);

// ─── 4. Подменить пути в gallery на CDN URL ───
console.log('🔗 Подмена локальных путей в gallery на CDN URL:');
if (loaded.gallery) {
  for (const galleryKey of Object.keys(loaded.gallery)) {
    const arr = loaded.gallery[galleryKey];
    if (!Array.isArray(arr)) continue;
    const newArr = arr.map(localPath => {
      const cdnUrl = urlMap[localPath];
      if (!cdnUrl) {
        console.warn(`    ⚠️  ${localPath} не найден в Storage — оставляем как есть.`);
        return localPath;
      }
      return cdnUrl;
    });
    loaded.gallery[galleryKey] = newArr;
    console.log(`  ${galleryKey}: ${newArr.length} URL'ов`);
  }
}

// ─── 5. UPSERT site_content ───
console.log('\n💾 UPSERT site_content (5 row):');
for (const [key, data] of Object.entries(loaded)) {
  if (data === null) continue;
  const { error } = await supabase
    .from('site_content')
    .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) {
    console.error(`  ❌ ${key}: ${error.message}`);
    failed++;
  } else {
    console.log(`  ✅ ${key}`);
  }
}

if (failed > 0) {
  console.error(`\n⚠️  Завершено с ${failed} ошибками.`);
  process.exit(1);
}

console.log('\n🎉 Migration done!');
console.log('   Следующий шаг: npm run build (проверить что генерит идентичные файлы)');
