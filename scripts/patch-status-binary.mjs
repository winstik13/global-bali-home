/**
 * One-time patch · Collapse unit statuses to binary available/sold.
 *   booked → sold
 *   resale → sold
 * Recompute project.availability.sold from units.
 *
 *   node scripts/patch-status-binary.mjs              # dry-run
 *   node scripts/patch-status-binary.mjs --apply
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

console.log(`🛠  Status → binary (available/sold) ${APPLY ? '(APPLY)' : '(DRY-RUN)'}\n`);

const { data: row, error } = await supabase
  .from('site_content').select('key, data').eq('key', 'projects').single();
if (error) { console.error('❌', error.message); process.exit(1); }

const data = JSON.parse(JSON.stringify(row.data));
let changes = 0;

if (data.statusLabels) {
  for (const lang of Object.keys(data.statusLabels)) {
    for (const k of ['booked', 'resale']) {
      if (data.statusLabels[lang][k] !== undefined) {
        console.log(`📄 statusLabels.${lang}.${k} · removed`);
        delete data.statusLabels[lang][k];
        changes++;
      }
    }
  }
}

for (const projKey of Object.keys(data)) {
  const proj = data[projKey];
  if (!proj || !Array.isArray(proj.units)) continue;
  for (const u of proj.units) {
    if (u.status === 'booked' || u.status === 'resale') {
      console.log(`📄 ${projKey} · unit id=${u.id} · ${u.status} → sold`);
      u.status = 'sold';
      changes++;
    }
  }
  if (proj.availability && typeof proj.availability.total === 'number') {
    const newSold = proj.units.filter(u => u.status === 'sold').length;
    if (proj.availability.sold !== newSold) {
      console.log(`📄 ${projKey} · availability.sold ${proj.availability.sold} → ${newSold}`);
      proj.availability.sold = newSold;
      changes++;
    }
  }
}

console.log(`\n${changes} change(s)`);

if (!APPLY) { console.log('\n⚠️  DRY-RUN'); process.exit(0); }
if (changes === 0) { console.log('nothing to do'); process.exit(0); }

const { error: upErr } = await supabase
  .from('site_content')
  .update({ data, updated_at: new Date().toISOString() })
  .eq('key', 'projects');
if (upErr) { console.error('❌', upErr.message); process.exit(1); }
console.log('✅ Updated.');
