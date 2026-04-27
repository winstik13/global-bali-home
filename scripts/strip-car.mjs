/**
 * One-time patch · Replace CAR / Construction All-Risk references with neutral wording
 * across Supabase site_content.
 *
 * Запуск:
 *   node scripts/strip-car.mjs              # dry-run
 *   node scripts/strip-car.mjs --apply      # write to Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..');

const envPath = resolve(ROOT, '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const APPLY = process.argv.includes('--apply');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('❌ SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY обязательны.');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

console.log(`🩹 Strip CAR ${APPLY ? '(APPLY)' : '(DRY-RUN)'} · ${SUPABASE_URL}\n`);

// Order matters: longer patterns first (so we don't half-replace).
const REPLACEMENTS = [
  // EN
  [/\bconstruction all-risk \(CAR\) insurance\b/gi, 'construction insurance'],
  [/\bConstruction All-Risk insurance\b/g, 'construction insurance'],
  [/\bConstruction All-Risk\b/g, 'construction insurance'],
  [/\bCAR insurance\b/g, 'construction insurance'],
  [/\bCAR-Insured Build\b/g, 'Insured Construction'],
  [/\bCAR Insured\b/g, 'Insured Build'],
  // RU
  [/страхование строительных рисков \(CAR\)/g, 'страхование строительных рисков'],
  [/полису Construction All-Risk/g, 'полису страхования строительных рисков'],
  [/Construction All-Risk на период/g, 'страхование строительных рисков на период'],
  [/CAR-страховка/g, 'страхование строительных рисков'],
  [/Полис CAR/g, 'Страховой полис'],
  [/Страхование строительства \(CAR\)/g, 'Страхование строительства'],
  [/Та же CAR-страховка/g, 'То же страхование строительных рисков'],
];

let totalReplacements = 0;

function patchString(s) {
  if (typeof s !== 'string') return s;
  let out = s;
  for (const [pat, rep] of REPLACEMENTS) {
    const before = out;
    out = out.replace(pat, rep);
    if (before !== out) totalReplacements++;
  }
  return out;
}

function patchDeep(node) {
  if (typeof node === 'string') return patchString(node);
  if (Array.isArray(node)) return node.map(patchDeep);
  if (node && typeof node === 'object') {
    const out = {};
    for (const k of Object.keys(node)) out[k] = patchDeep(node[k]);
    return out;
  }
  return node;
}

const { data: rows, error } = await supabase
  .from('site_content')
  .select('key, data');
if (error) { console.error('❌ SELECT failed:', error.message); process.exit(1); }

for (const row of rows) {
  totalReplacements = 0;
  const before = JSON.stringify(row.data);
  const patched = patchDeep(JSON.parse(JSON.stringify(row.data)));
  const after = JSON.stringify(patched);
  const changed = before !== after;

  console.log(`📄 ${row.key}: ${totalReplacements} replacement(s)${changed ? '' : ' — no change'}`);

  if (APPLY && changed) {
    const { error: upErr } = await supabase
      .from('site_content')
      .update({ data: patched, updated_at: new Date().toISOString() })
      .eq('key', row.key);
    if (upErr) { console.error(`   ❌ UPDATE failed: ${upErr.message}`); process.exit(1); }
    console.log(`   ✅ Updated.`);
  }
}

if (!APPLY) {
  console.log('\n⚠️  DRY-RUN — ничего не записано. Запусти с --apply.');
} else {
  console.log('\n✅ Done. Run `npm run build` then git push to regenerate data files.');
}
