/**
 * GET /api/list-users
 *
 * Возвращает список всех профилей + email_confirmed_at статус из auth.users.
 * Доступно: super_admin (для UI «Members» в админке).
 */

import { supabaseAdmin, requireRole, json, setCors } from './_utils.mjs';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const auth = await requireRole(req, res, ['super_admin']);
  if (!auth) return;

  // 1. Профили из public.profiles
  const { data: profiles, error: profErr } = await supabaseAdmin
    .from('profiles')
    .select('id, email, full_name, role, is_active, created_at, updated_at')
    .order('created_at', { ascending: true });
  if (profErr) return json(res, 500, { error: profErr.message });

  // 2. auth.users → подтянуть email_confirmed_at, last_sign_in_at
  const { data: usersData, error: usersErr } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (usersErr) return json(res, 500, { error: usersErr.message });

  const authMap = new Map(usersData.users.map(u => [u.id, u]));
  const merged = profiles.map(p => {
    const u = authMap.get(p.id);
    return {
      ...p,
      email_confirmed_at: u?.email_confirmed_at || null,
      last_sign_in_at: u?.last_sign_in_at || null,
      invited_at: u?.invited_at || null,
    };
  });

  return json(res, 200, { users: merged });
}
