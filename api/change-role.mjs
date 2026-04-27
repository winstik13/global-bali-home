/**
 * POST /api/change-role
 * Body: { user_id, role }
 *
 * Меняет роль существующего юзера. Доступно: super_admin.
 *
 * Защиты:
 *   • Запрещаем менять роль самому себе (защита от случайного даунгрейда —
 *     если super_admin даунгрейднет себя до admin, потеряет доступ к UI users)
 *   • Запрещаем повышать до super_admin (для безопасности, только через SQL)
 */

import { supabaseAdmin, requireRole, auditLog, json, setCors, ROLES } from './_utils.mjs';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const auth = await requireRole(req, res, ['super_admin']);
  if (!auth) return;

  const body = req.body || {};
  const userId = String(body.user_id || '').trim();
  const role = String(body.role || '').trim();

  if (!userId) return json(res, 400, { error: 'user_id required' });
  if (!ROLES.includes(role) || role === 'super_admin') {
    return json(res, 400, { error: 'Role must be one of: admin, editor' });
  }
  if (userId === auth.profile.id) {
    return json(res, 400, { error: 'Нельзя менять роль самому себе' });
  }

  // Проверяем что таргет — не super_admin (нельзя даунгрейднуть super_admin через UI)
  const { data: target, error: getErr } = await supabaseAdmin
    .from('profiles')
    .select('id, email, role')
    .eq('id', userId)
    .single();
  if (getErr || !target) return json(res, 404, { error: 'User not found' });
  if (target.role === 'super_admin') {
    return json(res, 403, { error: 'Нельзя менять роль super_admin через UI' });
  }

  const { error: updErr } = await supabaseAdmin
    .from('profiles')
    .update({ role })
    .eq('id', userId);
  if (updErr) return json(res, 500, { error: updErr.message });

  await auditLog({
    userId: auth.profile.id,
    userEmail: auth.profile.email,
    action: 'user.change_role',
    target: target.email,
    changes: { from: target.role, to: role },
  });

  return json(res, 200, { ok: true });
}
