/**
 * One-time patch · FAQ copy cleanup in Supabase site_content[faq].
 *
 *   1. order=10 · Rental income · drop "Management fee / Комиссия управления" sentence.
 *   2. order=6  · Buying process · simplify milestone payment line.
 *
 * Запуск:
 *   node scripts/patch-faq-cleanup.mjs              # dry-run
 *   node scripts/patch-faq-cleanup.mjs --apply      # write to Supabase
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

console.log(`🩹  Patch FAQ ${APPLY ? '(APPLY)' : '(DRY-RUN)'} · ${SUPABASE_URL}\n`);

const STRING_PATCHES = [
  // FAQ #10 · rental income · remove fee disclosure
  [' Management fee is 25–30% of gross rental income — the rest goes to you.', ''],
  [' Комиссия управления — 25–30% от валовой арендной выручки, остальное идёт вам.', ''],
  // FAQ #6 · buying process · simplify milestone line
  [
    'Payments follow a construction milestone schedule (e.g., 30% at foundation, 30% at structure, 30% at finishing, 10% at handover).',
    'Payments are tied to construction milestones.',
  ],
  [
    'Платежи следуют графику строительных этапов (например, 30% на фундаменте, 30% на каркасе, 30% на отделке, 10% при сдаче).',
    'Платежи привязаны к строительным этапам.',
  ],
];

let totalReplacements = 0;
function patchString(s) {
  if (typeof s !== 'string') return s;
  let out = s;
  for (const [needle, rep] of STRING_PATCHES) {
    if (out.includes(needle)) {
      out = out.split(needle).join(rep);
      totalReplacements++;
    }
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
  .eq('key', 'faq')
  .single();
if (error) { console.error('❌ SELECT failed:', error.message); process.exit(1); }

const before = JSON.stringify(row.data);
const patched = patchDeep(JSON.parse(JSON.stringify(row.data)));
const after = JSON.stringify(patched);
const changed = before !== after;

console.log(`📄 faq: ${totalReplacements} replacement(s)${changed ? '' : ' — no change'}`);

if (!APPLY) {
  console.log('\n⚠️  DRY-RUN — ничего не записано. Запусти с --apply.');
  process.exit(0);
}

if (changed) {
  const { error: upErr } = await supabase
    .from('site_content')
    .update({ data: patched, updated_at: new Date().toISOString() })
    .eq('key', 'faq');
  if (upErr) { console.error(`   ❌ UPDATE failed: ${upErr.message}`); process.exit(1); }
  console.log('   ✅ Updated.\n\n✅ Done. Push любой коммит — Vercel пересоберёт data/faq-data.js из Supabase.');
}
