/**
 * One-time patch · Rename heroStats yield label
 *   EN: "Yield" → "Annual Yield"
 *   RU: "Доходность" → "Годовая доходность"
 * Applied to all projects in site_content[projects].
 *
 *   node scripts/patch-yield-label.mjs              # dry-run
 *   node scripts/patch-yield-label.mjs --apply
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

console.log(`🛠  Patch yield label ${APPLY ? '(APPLY)' : '(DRY-RUN)'} · ${SUPABASE_URL}\n`);

const { data: row, error } = await supabase
  .from('site_content')
  .select('key, data')
  .eq('key', 'projects')
  .single();
if (error) { console.error('❌ SELECT failed:', error.message); process.exit(1); }

const data = JSON.parse(JSON.stringify(row.data));
let total = 0;

for (const projKey of Object.keys(data)) {
  const proj = data[projKey];
  if (!proj || !proj.heroStats) continue;
  for (const lang of ['en', 'ru']) {
    const arr = proj.heroStats[lang];
    if (!Array.isArray(arr)) continue;
    for (const tile of arr) {
      if (lang === 'en' && tile.label === 'Yield') {
        tile.label = 'Annual Yield';
        console.log(`📄 ${projKey} · en · "Yield" → "Annual Yield"`);
        total++;
      }
      if (lang === 'ru' && tile.label === 'Доходность') {
        tile.label = 'Годовая доходность';
        console.log(`📄 ${projKey} · ru · "Доходность" → "Годовая доходность"`);
        total++;
      }
    }
  }
}

console.log(`\n${total} replacement(s)`);

if (!APPLY) {
  console.log('\n⚠️  DRY-RUN — ничего не записано. Запусти с --apply.');
  process.exit(0);
}

if (total > 0) {
  const { error: upErr } = await supabase
    .from('site_content')
    .update({ data, updated_at: new Date().toISOString() })
    .eq('key', 'projects');
  if (upErr) { console.error(`   ❌ UPDATE failed: ${upErr.message}`); process.exit(1); }
  console.log('   ✅ Updated.\n\n✅ Done.');
}
