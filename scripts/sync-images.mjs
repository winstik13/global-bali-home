/**
 * Sync images · Supabase Storage → локальная images/ + регенерация gallery-data.js
 *
 * Workflow:
 *   1. Пользователь загружает картинки через админку → они уходят в Supabase Storage
 *      под путями gallery/<project>/<filename>
 *   2. Этот скрипт скачивает их в локальную images/<project>/<filename>
 *   3. Регенерит gallery-data.js — читает images/<project>/ как файлы, генерит
 *      относительные пути (та же логика что в generate-gallery.ps1)
 *   4. Пользователь коммитит и пушит — Vercel деплоит
 *
 * Запуск:
 *   node --env-file=.env.local scripts/sync-images.mjs            # реальный sync
 *   node --env-file=.env.local scripts/sync-images.mjs --dry-run  # посмотреть что скачается
 *
 * Идемпотентен: не качает картинку, если локально уже есть файл такого же размера.
 *
 * Принцип: Supabase Storage — это "стейджинг" для админки. Git — источник
 * правды для сайта. Этот скрипт синкает стейджинг → git.
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('❌ SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY обязательны.');
  console.error('   Запускай: node --env-file=.env.local scripts/sync-images.mjs');
  process.exit(1);
}

const DRY_RUN = process.argv.includes('--dry-run');

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── projects ───
// Маппинг ключ галереи (в gallery-data.js) → slug проекта (папка в images/)
const PROJECTS = [
  { galleryKey: 'villas',  slug: 'serenity-villas'  },
  { galleryKey: 'estates', slug: 'serenity-estates' },
  { galleryKey: 'village', slug: 'serenity-village' },
];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Технические чертежи — НЕ маркетинговые визуализации. Исключаются из gallery.
const EXCLUDE_PATTERNS = ['master-plan', 'masterplan', 'site-plan', 'siteplan', 'floor-plan', 'floorplan'];

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function shouldExcludeFromGallery(filename) {
  const base = basename(filename, extname(filename)).toLowerCase();
  return EXCLUDE_PATTERNS.some(p => base.includes(p));
}

function isImageFile(filename) {
  return IMAGE_EXTENSIONS.includes(extname(filename).toLowerCase());
}

// ─── 1. Скачиваем картинки из Supabase Storage в images/<project>/ ───
async function syncProject(project) {
  const localDir = resolve(ROOT, 'images', project.slug);
  ensureDir(localDir);

  const storagePath = `gallery/${project.slug}`;
  const { data: files, error } = await supabase.storage
    .from('images')
    .list(storagePath, { limit: 1000 });

  if (error) {
    console.error(`  ❌ list(${storagePath}): ${error.message}`);
    return { downloaded: 0, skipped: 0, failed: 0 };
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    if (!isImageFile(file.name)) continue;

    const localPath = resolve(localDir, file.name);
    const remoteSize = file.metadata?.size || 0;

    // Skip if local file exists with same size (idempotent)
    if (existsSync(localPath) && remoteSize > 0) {
      const localSize = statSync(localPath).size;
      if (localSize === remoteSize) {
        skipped++;
        continue;
      }
    }

    if (DRY_RUN) {
      console.log(`  📥 would download: ${file.name} (${(remoteSize / 1024).toFixed(0)} KB)`);
      downloaded++;
      continue;
    }

    try {
      const { data, error: dlError } = await supabase.storage
        .from('images')
        .download(`${storagePath}/${file.name}`);

      if (dlError) throw new Error(dlError.message);

      const buffer = Buffer.from(await data.arrayBuffer());
      writeFileSync(localPath, buffer);
      downloaded++;
    } catch (err) {
      console.error(`    ❌ ${file.name}: ${err.message}`);
      failed++;
    }
  }

  return { downloaded, skipped, failed };
}

// ─── 2. Регенерация gallery-data.js из локальной images/ ───
function regenerateGalleryData() {
  const data = {};

  for (const project of PROJECTS) {
    const dir = resolve(ROOT, 'images', project.slug);
    if (!existsSync(dir)) {
      data[project.galleryKey] = [];
      continue;
    }

    // Case-insensitive ASCII sort — matches PowerShell Sort-Object Name.
    // Locale-aware sorts (localeCompare) treat `.` and `_` differently
    // depending on locale; raw lowercase comparison is portable.
    const files = readdirSync(dir)
      .filter(f => isImageFile(f))
      .filter(f => !shouldExcludeFromGallery(f))
      .sort((a, b) => {
        const la = a.toLowerCase();
        const lb = b.toLowerCase();
        return la < lb ? -1 : la > lb ? 1 : 0;
      });

    data[project.galleryKey] = files.map(f => `images/${project.slug}/${f}`);
  }

  // Та же форма что генерит generate-gallery.ps1
  let js = '/* eslint-disable */\n';
  js += '/* AUTO-GENERATED by scripts/sync-images.mjs · DO NOT EDIT MANUALLY */\n';
  js += '/* Run: npm run sync-images (after uploading via admin) */\n';
  js += 'const GALLERY_DATA = {\n';
  for (const key of ['villas', 'estates', 'village']) {
    const items = data[key] || [];
    if (items.length > 0) {
      const list = items.map(p => `    "${p}"`).join(',\n');
      js += `  ${key}: [\n${list}\n  ],\n`;
    } else {
      js += `  ${key}: [],\n`;
    }
  }
  js += '};\n';

  const outPath = resolve(ROOT, 'gallery-data.js');
  if (DRY_RUN) {
    console.log(`  📝 would write gallery-data.js (${data.villas.length}/${data.estates.length}/${data.village.length} images)`);
    return;
  }
  writeFileSync(outPath, js, 'utf8');
  console.log(`  ✅ gallery-data.js written (${data.villas.length}/${data.estates.length}/${data.village.length} images)`);
}

// ─── main ───
async function main() {
  console.log(`🔄 Sync images${DRY_RUN ? ' (DRY-RUN)' : ''} · ${SUPABASE_URL}`);
  console.log(`   Repo root: ${ROOT}\n`);

  let totalDownloaded = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  for (const project of PROJECTS) {
    console.log(`📦 ${project.slug}:`);
    const result = await syncProject(project);
    console.log(`   ${result.downloaded} downloaded, ${result.skipped} skipped (already local), ${result.failed} failed`);
    totalDownloaded += result.downloaded;
    totalSkipped += result.skipped;
    totalFailed += result.failed;
  }

  console.log(`\n📊 Total: ${totalDownloaded} downloaded, ${totalSkipped} skipped, ${totalFailed} failed`);

  console.log(`\n📝 Regenerating gallery-data.js:`);
  regenerateGalleryData();

  if (DRY_RUN) {
    console.log('\n🚧 DRY-RUN — ничего не записано. Запусти без --dry-run чтобы применить.');
  } else {
    console.log('\n🎉 Sync done. Не забудь: git add images/ gallery-data.js && git commit && git push');
  }
}

main().catch(err => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
