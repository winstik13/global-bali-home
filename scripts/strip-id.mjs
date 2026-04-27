/**
 * One-time cleanup · удалить ID-переводы и применить отложенные правки в Supabase.
 *
 * Что делает:
 *   1. SELECT всех row из site_content
 *   2. Рекурсивно удаляет ключ "id" в объектах переводов (где соседний ключ "en")
 *   3. Применяет отложенные патчи к row[key=projects]:
 *      - Village handover: Q1/Q2 2027 → Q3 2027 (везде где встречается)
 *      - Village юниты с badge="Q2 2027" → "Q3 2027" (юнит #19 sold с Q1 2027 не трогаем)
 *      - Villas/Estates showcaseDesc: убрать концевую "Handover/Сдача QN YYYY."
 *   4. UPDATE row.data в Supabase
 *
 * Запуск:
 *   node scripts/strip-id.mjs              # dry-run (показать что изменится)
 *   node scripts/strip-id.mjs --apply      # реально записать в Supabase
 *
 * Источник env: .env.local (через dotenv-подобный shim) либо process.env.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..');

// ─── load .env.local ───
const envPath = resolve(ROOT, '.env.local');
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}

const APPLY = process.argv.includes('--apply');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('❌ SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY обязательны (в .env.local или env).');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

console.log(`🧹 Strip-ID ${APPLY ? '(APPLY)' : '(DRY-RUN)'} · ${SUPABASE_URL}\n`);

// ─── helpers ───
let stripCount = 0;

/** Рекурсивно удаляет ключ "id" в объектах, у которых есть ключ "en". */
function stripIdRecursive(node) {
  if (Array.isArray(node)) {
    return node.map(stripIdRecursive);
  }
  if (node && typeof node === 'object') {
    const keys = Object.keys(node);
    const isTranslationGroup = keys.includes('en') && keys.includes('id');
    if (isTranslationGroup) {
      delete node.id;
      stripCount++;
    }
    for (const k of Object.keys(node)) {
      node[k] = stripIdRecursive(node[k]);
    }
    return node;
  }
  return node;
}

/** Удалить концевое предложение про сдачу из showcaseDesc. */
function trimHandoverFromDesc(desc) {
  if (typeof desc !== 'string') return desc;
  return desc
    .replace(/\s*Handover Q[1234][/]?(?:Q[1234])? \d{4}\.\s*$/i, '')
    .replace(/\s*Сдача Q[1234][/]?(?:Q[1234])? \d{4}\.\s*$/i, '');
}

let patchCount = 0;

function applyProjectsPatches(projects) {
  if (!projects || typeof projects !== 'object') return projects;

  // 1. Village: Q1/Q2 2027 → Q3 2027 (рекурсивно по всем строкам)
  function replaceHandover(node) {
    if (typeof node === 'string') {
      const replaced = node.replace(/Q1\/Q2 2027/g, 'Q3 2027');
      if (replaced !== node) patchCount++;
      return replaced;
    }
    if (Array.isArray(node)) return node.map(replaceHandover);
    if (node && typeof node === 'object') {
      const out = {};
      for (const k of Object.keys(node)) out[k] = replaceHandover(node[k]);
      return out;
    }
    return node;
  }

  // 2. Village юниты: badge "Q2 2027" → "Q3 2027" (для available, sold не трогаем)
  function patchVillageUnits(village) {
    if (!village || !Array.isArray(village.units)) return village;
    village.units = village.units.map(u => {
      if (u && u.status !== 'sold' && u.badge === 'Q2 2027') {
        patchCount++;
        return { ...u, badge: 'Q3 2027' };
      }
      return u;
    });
    return village;
  }

  // 3. Villas/Estates showcaseDesc: убрать концевое предложение про сдачу
  function trimShowcaseDesc(proj) {
    if (!proj || !proj.showcaseDesc) return proj;
    const sd = { ...proj.showcaseDesc };
    for (const lang of Object.keys(sd)) {
      const before = sd[lang];
      const after = trimHandoverFromDesc(before);
      if (after !== before) {
        sd[lang] = after;
        patchCount++;
      }
    }
    return { ...proj, showcaseDesc: sd };
  }

  // Применяем
  let out = replaceHandover(projects);
  if (out['serenity-village']) out['serenity-village'] = patchVillageUnits(out['serenity-village']);
  if (out['serenity-villas']) out['serenity-villas'] = trimShowcaseDesc(out['serenity-villas']);
  if (out['serenity-estates']) out['serenity-estates'] = trimShowcaseDesc(out['serenity-estates']);

  return out;
}

// ─── main ───
async function main() {
  const { data: rows, error } = await supabase
    .from('site_content')
    .select('key, data, updated_at');
  if (error) {
    console.error('❌ SELECT failed:', error.message);
    process.exit(1);
  }

  for (const row of rows) {
    stripCount = 0;
    patchCount = 0;

    let data = JSON.parse(JSON.stringify(row.data)); // deep clone
    data = stripIdRecursive(data);
    if (row.key === 'projects') {
      data = applyProjectsPatches(data);
    }

    console.log(`📄 ${row.key}: stripped ${stripCount} "id" key(s), patched ${patchCount} field(s)`);

    if (APPLY && (stripCount > 0 || patchCount > 0)) {
      const { error: upErr } = await supabase
        .from('site_content')
        .update({ data, updated_at: new Date().toISOString() })
        .eq('key', row.key);
      if (upErr) {
        console.error(`   ❌ UPDATE failed: ${upErr.message}`);
        process.exit(1);
      }
      console.log(`   ✅ Updated.`);
    }
  }

  if (!APPLY) {
    console.log('\n⚠️  DRY-RUN — ничего не записано. Запусти с --apply чтобы применить.');
  } else {
    console.log('\n🎉 Готово. Теперь запусти `npm run build` или сделай git push для пересборки локальных data/*.js.');
  }
}

main().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
