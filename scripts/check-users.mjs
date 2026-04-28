import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: profiles } = await sb.from('profiles').select('*');
const { data: usersData } = await sb.auth.admin.listUsers();

console.log('PROFILES:');
console.table(profiles);
console.log('\nAUTH USERS (id, email, email_confirmed_at, last_sign_in_at):');
console.table((usersData?.users || []).map(u => ({
  id: u.id,
  email: u.email,
  email_confirmed_at: u.email_confirmed_at,
  last_sign_in_at: u.last_sign_in_at,
  invited_at: u.invited_at,
})));
