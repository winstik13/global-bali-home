/**
 * POST /api/invite-user
 * Body: { email, role, full_name }
 *
 * Создаёт нового юзера через Supabase Admin API:
 *   1. Проверяет что email не зарегистрирован
 *   2. inviteUserByEmail → отправляет email с magic-link на /admin/?invite=1
 *   3. Триггер handle_new_user создаёт row в profiles с дефолтной ролью editor
 *   4. Поднимаем роль до запрошенной (admin / editor) через UPDATE
 *
 * Доступно: super_admin.
 */

import { supabaseAdmin, requireRole, auditLog, json, setCors, ROLES } from './_utils.mjs';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const auth = await requireRole(req, res, ['super_admin']);
  if (!auth) return;

  const body = req.body || {};
  const email = String(body.email || '').trim().toLowerCase();
  const fullName = String(body.full_name || '').trim();
  const role = String(body.role || '').trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(res, 400, { error: 'Invalid email' });
  }
  if (!ROLES.includes(role) || role === 'super_admin') {
    // Запрещаем создавать вторых super_admin'ов через UI — только через SQL.
    return json(res, 400, { error: 'Role must be one of: admin, editor' });
  }

  // 1. Проверка существования
  const { data: existingList } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
  const existing = existingList?.users?.find(u => (u.email || '').toLowerCase() === email);
  if (existing) {
    return json(res, 409, { error: 'User with this email already exists' });
  }

  // 2. Отправляем invite с metadata (full_name) — triggers handle_new_user → profile row
  // redirectTo: куда юзер попадёт после клика по линку — на login админки с параметром
  const siteUrl = req.headers.origin || `https://${req.headers.host}` || 'https://www.globalbalihome.com';
  const { data: invited, error: inviteErr } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
    redirectTo: `${siteUrl}/admin/?invite=1`,
  });
  if (inviteErr) {
    const msg = inviteErr.message || 'Invite failed';
    if (msg.toLowerCase().includes('rate')) {
      return json(res, 429, { error: 'Слишком много приглашений. Подожди минуту.' });
    }
    return json(res, 500, { error: msg });
  }
  if (!invited?.user?.id) {
    return json(res, 500, { error: 'Invite returned no user id' });
  }

  // 3. Поднимаем роль (дефолт editor → запрошенная). Также обновляем full_name
  // на случай если триггер взял дефолт из split_part(email, '@', 1).
  const { error: updErr } = await supabaseAdmin
    .from('profiles')
    .update({ role, full_name: fullName || null })
    .eq('id', invited.user.id);
  if (updErr) {
    return json(res, 500, { error: `Profile update failed: ${updErr.message}` });
  }

  await auditLog({
    userId: auth.profile.id,
    userEmail: auth.profile.email,
    action: 'user.invite',
    target: email,
    changes: { role, full_name: fullName },
  });

  return json(res, 200, {
    ok: true,
    user: { id: invited.user.id, email, full_name: fullName, role },
  });
}
