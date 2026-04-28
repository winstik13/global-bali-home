/**
 * One-time patch · Resync showcaseAvailability with new scarcity-aware logic.
 *   • If ≥70% sold → "Only X of Y units left" / "Осталось всего X из Y" (scarcity)
 *   • Else        → "X of Y units available" / "Доступно X из Y"
 *   • pre-sale    → "Pre-Sale Open" / "Предпродажа открыта"
 *
 *   node scripts/patch-availability-text.mjs --apply
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

console.log(`🛠  Resync showcaseAvailability ${APPLY ? '(APPLY)' : '(DRY-RUN)'}\n`);

const { data: row, error } = await supabase
  .from('site_content').select('key, data').eq('key', 'projects').single();
if (error) { console.error('❌', error.message); process.exit(1); }

const data = JSON.parse(JSON.stringify(row.data));
let changes = 0;

for (const projKey of Object.keys(data)) {
  const p = data[projKey];
  if (!p || !p.availability || typeof p.availability.total !== 'number') continue;
  const total = p.availability.total;
  const sold = p.availability.sold || 0;
  const left = Math.max(0, total - sold);
  const soldPct = total > 0 ? sold / total : 0;

  let next;
  if (p.status === 'pre-sale') {
    next = { en: 'Pre-Sale Open', ru: 'Предпродажа открыта' };
  } else if (soldPct >= 0.7) {
    next = {
      en: 'Only ' + left + ' of ' + total + ' units left',
      ru: 'Осталось всего ' + left + ' из ' + total,
    };
  } else {
    next = {
      en: left + ' of ' + total + ' units available',
      ru: 'Доступно ' + left + ' из ' + total,
    };
  }

  const before = JSON.stringify(p.showcaseAvailability || {});
  const after = JSON.stringify(next);
  if (before !== after) {
    console.log(`📄 ${projKey} (${sold}/${total}, ${Math.round(soldPct * 100)}% sold)`);
    console.log(`   before: ${before}`);
    console.log(`   after:  ${after}`);
    p.showcaseAvailability = next;
    changes++;
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
