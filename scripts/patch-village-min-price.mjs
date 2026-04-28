/**
 * One-time patch · Village minimum price 1BR.
 *   • Raise any available 1BR unit price < 132000 → 132000.
 *   • startingPrice 119000 → 132000.
 *   • showcaseDesc / showcaseSubtitle EN+RU: "$119K" → "$132K".
 *
 *   node scripts/patch-village-min-price.mjs              # dry-run
 *   node scripts/patch-village-min-price.mjs --apply
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

console.log(`🛠  Village min-price patch ${APPLY ? '(APPLY)' : '(DRY-RUN)'}\n`);

const MIN = 132000;

const { data: row, error } = await supabase
  .from('site_content').select('key, data').eq('key', 'projects').single();
if (error) { console.error('❌', error.message); process.exit(1); }

const data = JSON.parse(JSON.stringify(row.data));
const v = data['serenity-village'];
if (!v) { console.error('❌ serenity-village not found'); process.exit(1); }

let unitChanges = 0;
for (const u of v.units || []) {
  if (u.type === '1 Bedroom' && typeof u.price === 'number' && u.price < MIN) {
    console.log(`📄 unit id=${u.id} · ${u.price} → ${MIN}`);
    u.price = MIN;
    unitChanges++;
  }
}

let copyChanges = 0;
if (v.startingPrice && v.startingPrice < MIN) {
  console.log(`📄 startingPrice · ${v.startingPrice} → ${MIN}`);
  v.startingPrice = MIN;
  copyChanges++;
}

const STRING_PATCHES = [['$119K', '$132K'], ['$119,000', '$132,000']];
function patchStr(s) {
  if (typeof s !== 'string') return s;
  let out = s, hit = false;
  for (const [a, b] of STRING_PATCHES) {
    if (out.includes(a)) { out = out.split(a).join(b); hit = true; }
  }
  if (hit) copyChanges++;
  return out;
}
for (const field of ['showcaseDesc', 'showcaseSubtitle']) {
  if (v[field]) {
    for (const lang of Object.keys(v[field])) {
      const before = v[field][lang];
      const after = patchStr(before);
      if (before !== after) console.log(`📄 ${field}.${lang} · patched`);
      v[field][lang] = after;
    }
  }
}

console.log(`\n${unitChanges} unit price change(s), ${copyChanges} copy change(s)`);

if (!APPLY) { console.log('\n⚠️  DRY-RUN'); process.exit(0); }
if (unitChanges + copyChanges === 0) { console.log('nothing to do'); process.exit(0); }

const { error: upErr } = await supabase
  .from('site_content')
  .update({ data, updated_at: new Date().toISOString() })
  .eq('key', 'projects');
if (upErr) { console.error('❌', upErr.message); process.exit(1); }
console.log('✅ Updated.');
