/**
 * One-time patch · Village available units Q1 2027 → Q3 2027 (sold кепаются)
 *
 * Запуск:
 *   node scripts/patch-village-q3.mjs              # dry-run
 *   node scripts/patch-village-q3.mjs --apply      # write to Supabase
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

console.log(`🛠  Patch Village ${APPLY ? '(APPLY)' : '(DRY-RUN)'} · ${SUPABASE_URL}\n`);

const { data: rows, error } = await supabase
  .from('site_content')
  .select('key, data')
  .eq('key', 'projects')
  .single();
if (error) { console.error('❌ SELECT failed:', error.message); process.exit(1); }

const data = JSON.parse(JSON.stringify(rows.data));
const village = data['serenity-village'];
if (!village || !Array.isArray(village.units)) {
  console.error('❌ serenity-village.units не найдены');
  process.exit(1);
}

let changed = 0;
const updated = village.units.map(u => {
  if (u && u.status === 'available' && u.badge === 'Q1 2027') {
    changed++;
    console.log(`  unit #${u.id} (${u.type}, ${u.status}) · Q1 2027 → Q3 2027`);
    return { ...u, badge: 'Q3 2027' };
  }
  return u;
});
village.units = updated;

console.log(`\n📊 ${changed} unit(s) will be patched.`);

if (!APPLY) {
  console.log('\n⚠️  DRY-RUN — ничего не записано. Запусти с --apply.');
  process.exit(0);
}

const { error: upErr } = await supabase
  .from('site_content')
  .update({ data, updated_at: new Date().toISOString() })
  .eq('key', 'projects');
if (upErr) { console.error('❌ UPDATE failed:', upErr.message); process.exit(1); }

console.log('\n✅ Updated. Run `npm run build` + git push to regenerate data files.');
