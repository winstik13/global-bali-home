/**
 * Shared utilities for admin API endpoints (Vercel serverless functions).
 *
 * Auth-flow:
 *   • Клиент передаёт Authorization: Bearer <access_token> от Supabase auth
 *   • Мы валидируем токен через supabase.auth.getUser(token)
 *   • Затем service_role клиентом читаем profiles.role
 *   • Если роль не super_admin → 403
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PUBLISHABLE = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE || !PUBLISHABLE) {
  throw new Error('Missing Supabase env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_PUBLISHABLE_KEY');
}

// Admin-клиент: bypass RLS, может всё.
export const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Anon-клиент (для верификации user-токена). Используем только getUser.
const supabaseAnon = createClient(SUPABASE_URL, PUBLISHABLE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json').send(JSON.stringify(body));
}

export function setCors(res, origin = '*') {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

/**
 * Проверяет Bearer token и роль пользователя.
 * Возвращает { user, profile } если всё ОК, иначе пишет ошибку в res и возвращает null.
 *
 * @param {string[]} allowedRoles — например ['super_admin'] или ['super_admin', 'admin']
 */
export async function requireRole(req, res, allowedRoles = ['super_admin']) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) {
    json(res, 401, { error: 'Missing Bearer token' });
    return null;
  }

  // Верифицируем токен — getUser сам делает запрос к auth-серверу.
  const { data: userData, error: userErr } = await supabaseAnon.auth.getUser(token);
  if (userErr || !userData?.user) {
    json(res, 401, { error: 'Invalid or expired token' });
    return null;
  }

  // Читаем профиль и роль через service_role (минуя RLS).
  const { data: profile, error: profErr } = await supabaseAdmin
    .from('profiles')
    .select('id, email, full_name, role, is_active')
    .eq('id', userData.user.id)
    .single();

  if (profErr || !profile) {
    json(res, 403, { error: 'No profile found for user' });
    return null;
  }
  if (!profile.is_active) {
    json(res, 403, { error: 'User is deactivated' });
    return null;
  }
  if (!allowedRoles.includes(profile.role)) {
    json(res, 403, { error: `Forbidden: requires one of ${allowedRoles.join(', ')}` });
    return null;
  }

  return { user: userData.user, profile };
}

/**
 * Запись в audit_log (от лица super_admin'а через service_role,
 * поэтому триггер audit_log_set_user не сработает — выставляем поля сами).
 */
export async function auditLog({ userId, userEmail, action, target, changes }) {
  await supabaseAdmin.from('audit_log').insert({
    user_id: userId,
    user_email: userEmail,
    action,
    target,
    changes: changes || null,
  });
}

export const ROLES = ['super_admin', 'admin', 'editor'];
