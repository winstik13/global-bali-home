/**
 * One-time patch · Village heroStats: replace 3rd tile "$119K+ / From"
 * with "12–15% / Yield" to match villas & estates format.
 *
 *   node scripts/patch-village-yield.mjs              # dry-run
 *   node scripts/patch-village-yield.mjs --apply
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

console.log(`🛠  Patch Village heroStats ${APPLY ? '(APPLY)' : '(DRY-RUN)'} · ${SUPABASE_URL}\n`);

const { data: row, error } = await supabase
  .from('site_content')
  .select('key, data')
  .eq('key', 'projects')
  .single();
if (error) { console.error('❌ SELECT failed:', error.message); process.exit(1); }

const data = JSON.parse(JSON.stringify(row.data));
const village = data['serenity-village'];
if (!village || !village.heroStats) {
  console.error('❌ serenity-village.heroStats не найден');
  process.exit(1);
}

const before = JSON.stringify(village.heroStats);

const setTile = (lang, label, number) => {
  const arr = village.heroStats[lang];
  if (!Array.isArray(arr) || arr.length < 3) return;
  arr[2] = { label, number };
};
setTile('en', 'Yield', '12–15%');
setTile('ru', 'Доходность', '12–15%');

const after = JSON.stringify(village.heroStats);
const changed = before !== after;

console.log(`📄 serenity-village.heroStats · ${changed ? 'changed' : 'no change'}`);
console.log('   before:', before);
console.log('   after: ', after);

if (!APPLY) {
  console.log('\n⚠️  DRY-RUN — ничего не записано. Запусти с --apply.');
  process.exit(0);
}

if (changed) {
  const { error: upErr } = await supabase
    .from('site_content')
    .update({ data, updated_at: new Date().toISOString() })
    .eq('key', 'projects');
  if (upErr) { console.error(`   ❌ UPDATE failed: ${upErr.message}`); process.exit(1); }
  console.log('   ✅ Updated.\n\n✅ Done. Push любой коммит — Vercel пересоберёт data/projects-data.js из Supabase.');
}
