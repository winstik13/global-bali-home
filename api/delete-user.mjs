/**
 * POST /api/delete-user
 * Body: { user_id }
 *
 * Полностью удаляет юзера: auth.admin.deleteUser → каскад на public.profiles
 * (FK on delete cascade).
 *
 * Доступно: super_admin.
 *
 * Защиты:
 *   • Нельзя удалить самого себя
 *   • Нельзя удалить super_admin (даже другого — единичная защита, на случай
 *     если в будущем будет несколько super_admin'ов)
 */

import { supabaseAdmin, requireRole, auditLog, json, setCors } from './_utils.mjs';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const auth = await requireRole(req, res, ['super_admin']);
  if (!auth) return;

  const body = req.body || {};
  const userId = String(body.user_id || '').trim();
  if (!userId) return json(res, 400, { error: 'user_id required' });
  if (userId === auth.profile.id) {
    return json(res, 400, { error: 'Нельзя удалить самого себя' });
  }

  const { data: target, error: getErr } = await supabaseAdmin
    .from('profiles')
    .select('id, email, role')
    .eq('id', userId)
    .single();
  if (getErr || !target) return json(res, 404, { error: 'User not found' });
  if (target.role === 'super_admin') {
    return json(res, 403, { error: 'Нельзя удалить super_admin' });
  }

  // Удаляем из auth.users → каскад на public.profiles
  const { error: delErr } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (delErr) return json(res, 500, { error: delErr.message });

  await auditLog({
    userId: auth.profile.id,
    userEmail: auth.profile.email,
    action: 'user.delete',
    target: target.email,
    changes: { role: target.role },
  });

  return json(res, 200, { ok: true });
}
