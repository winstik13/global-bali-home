/**
 * One-time patch · Rename ALL public "sold/продано" labels to "Not Available/Не доступно".
 * Touches site_content[projects].statusLabels and .availabilityLabels.
 *
 *   node scripts/patch-sold-label.mjs --apply
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
if (!SUPABASE_URL || !SERVICE_ROLE) { console.error('❌ env'); process.exit(1); }
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

console.log(`🛠  Sold→NotAvailable label patch ${APPLY ? '(APPLY)' : '(DRY-RUN)'}\n`);

const { data: row, error } = await supabase
  .from('site_content').select('key, data').eq('key', 'projects').single();
if (error) { console.error('❌', error.message); process.exit(1); }

const data = JSON.parse(JSON.stringify(row.data));
let changes = 0;

const setLabel = (path, target) => {
  const parts = path.split('.');
  let obj = data;
  for (let i = 0; i < parts.length - 1; i++) obj = obj?.[parts[i]];
  const k = parts[parts.length - 1];
  if (!obj || obj[k] === undefined) return;
  if (obj[k] !== target) {
    console.log(`📄 ${path} "${obj[k]}" → "${target}"`);
    obj[k] = target;
    changes++;
  }
};

setLabel('statusLabels.en.sold', 'Not Available');
setLabel('statusLabels.ru.sold', 'Не доступен');
setLabel('availabilityLabels.en.sold', 'not available');
setLabel('availabilityLabels.ru.sold', 'не доступно');
setLabel('availabilityLabels.en.unitsSold', 'units not available');
setLabel('availabilityLabels.ru.unitsSold', 'не доступно');

console.log(`\n${changes} change(s)`);
if (!APPLY) { console.log('\n⚠️  DRY-RUN'); process.exit(0); }
if (changes === 0) { console.log('nothing to do'); process.exit(0); }

const { error: upErr } = await supabase
  .from('site_content')
  .update({ data, updated_at: new Date().toISOString() })
  .eq('key', 'projects');
if (upErr) { console.error('❌', upErr.message); process.exit(1); }
console.log('✅ Updated.');
