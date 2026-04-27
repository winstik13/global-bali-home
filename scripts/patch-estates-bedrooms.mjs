/**
 * One-time patch · Estates: replace "4.5 Bedroom(s)" / "2–4.5" with "5"-based labels.
 *
 * Запуск:
 *   node scripts/patch-estates-bedrooms.mjs              # dry-run
 *   node scripts/patch-estates-bedrooms.mjs --apply      # write to Supabase
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

console.log(`🛏  Patch Estates bedrooms ${APPLY ? '(APPLY)' : '(DRY-RUN)'} · ${SUPABASE_URL}\n`);

const REPLACEMENTS = [
  [/4\.5 Bedrooms/g, '5 Bedrooms'],
  [/4\.5 Bedroom\b/g, '5 Bedroom'],
  [/2[–-]4\.5/g, '2–5'],
  [/4,5 спальни/g, '5 спален'],
  [/2[–-]4,5/g, '2–5'],
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

const { data: row, error } = await supabase
  .from('site_content')
  .select('key, data')
  .eq('key', 'projects')
  .single();
if (error) { console.error('❌ SELECT failed:', error.message); process.exit(1); }

const before = JSON.stringify(row.data);
const patched = patchDeep(JSON.parse(JSON.stringify(row.data)));
const after = JSON.stringify(patched);
const changed = before !== after;

console.log(`📄 projects: ${totalReplacements} replacement(s)${changed ? '' : ' — no change'}`);

if (!APPLY) {
  console.log('\n⚠️  DRY-RUN — ничего не записано. Запусти с --apply.');
  process.exit(0);
}

if (changed) {
  const { error: upErr } = await supabase
    .from('site_content')
    .update({ data: patched, updated_at: new Date().toISOString() })
    .eq('key', 'projects');
  if (upErr) { console.error(`   ❌ UPDATE failed: ${upErr.message}`); process.exit(1); }
  console.log('   ✅ Updated.\n\n✅ Done. Run `npm run build` to regenerate data files.');
}
