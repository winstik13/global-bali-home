/**
 * Supabase client for the admin panel.
 *
 * Загружается ПОСЛЕ Supabase JS SDK (UMD bundle с CDN).
 * Экспортирует window.SupabaseAdmin — единственный API через который
 * admin.js общается с Supabase / Vercel API endpoints.
 *
 * Архитектура:
 *   • Auth — supabase-js напрямую (signInWithPassword, signOut)
 *   • Content (5 JSON блоков) — RLS сама проверит роль
 *   • Storage — supabase-js напрямую, RLS на storage.objects + bucket policies
 *   • Users CRUD — через /api/{invite,list,delete,change-role}-user serverless
 *     functions (нужен service_role, не положить в браузер)
 */

(function () {
  'use strict';

  // ─── config ───
  // Эти значения публичные (publishable key безопасен для браузера),
  // hardcoded для упрощения — без бандлера/env injection.
  const SUPABASE_URL = 'https://ttmmremmgrsaazzyikph.supabase.co';
  const PUBLISHABLE_KEY = 'sb_publishable_rQ3PN-mA8jXQagn3tCqR1w_d0ERWOjy';

  if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
    console.error('[SupabaseAdmin] Supabase JS SDK не загружен. Проверь <script src="...supabase-js@2..."></script> в index.html.');
    return;
  }

  const client = window.supabase.createClient(SUPABASE_URL, PUBLISHABLE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: window.localStorage,
      storageKey: 'gbh-admin-auth',
    },
  });

  // ─── content keys (синхронизировать с supabase/migrations/0001_init.sql) ───
  const CONTENT_KEYS = ['site', 'projects', 'gallery', 'faq', 'testimonials'];

  // ─── auth ───
  async function login(email, password) {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
  }

  async function logout() {
    await client.auth.signOut();
  }

  async function getSession() {
    const { data } = await client.auth.getSession();
    return data.session;
  }

  /**
   * Возвращает { user, profile } или null если не залогинен.
   * profile = { id, email, full_name, role, is_active }
   */
  async function getCurrentUser() {
    const session = await getSession();
    if (!session) return null;
    const { data: profile, error } = await client
      .from('profiles')
      .select('id, email, full_name, role, is_active')
      .eq('id', session.user.id)
      .single();
    if (error) {
      console.error('[SupabaseAdmin] не удалось загрузить profile:', error.message);
      return null;
    }
    return { user: session.user, profile };
  }

  function onAuthStateChange(callback) {
    client.auth.onAuthStateChange(callback);
  }

  // ─── content (site_content table) ───
  async function getContent(key) {
    if (!CONTENT_KEYS.includes(key)) throw new Error(`Unknown content key: ${key}`);
    const { data, error } = await client
      .from('site_content')
      .select('data, updated_at, updated_by')
      .eq('key', key)
      .single();
    if (error) throw new Error(`getContent(${key}): ${error.message}`);
    return data;
  }

  async function getAllContent() {
    const { data, error } = await client
      .from('site_content')
      .select('key, data, updated_at');
    if (error) throw new Error(`getAllContent: ${error.message}`);
    const out = {};
    for (const row of data) out[row.key] = row.data;
    return out;
  }

  /**
   * Записывает JSON-блок. RLS-политика can_edit_content проверит роль:
   *   super_admin/admin — любой key
   *   editor — только gallery/faq/testimonials
   */
  async function setContent(key, data) {
    if (!CONTENT_KEYS.includes(key)) throw new Error(`Unknown content key: ${key}`);
    const { error } = await client
      .from('site_content')
      .update({ data })
      .eq('key', key);
    if (error) throw new Error(`setContent(${key}): ${error.message}`);
  }

  // ─── storage (bucket 'images') ───

  /**
   * Загружает картинку в bucket. Path относительно bucket root.
   * Например: 'gallery/serenity-villas/aerial.webp', 'plans/x.webp', 'og/...'
   * upsert=true — перезаписать если есть.
   */
  async function uploadImage(path, fileOrBlob, contentType) {
    const opts = { upsert: true };
    if (contentType) opts.contentType = contentType;
    const { error } = await client.storage.from('images').upload(path, fileOrBlob, opts);
    if (error) throw new Error(`uploadImage(${path}): ${error.message}`);
    return getImageUrl(path);
  }

  function getImageUrl(path) {
    const { data } = client.storage.from('images').getPublicUrl(path);
    return data.publicUrl;
  }

  /**
   * Принимает либо storage path ('gallery/villas/x.webp') либо полный CDN URL —
   * выкусывает path и удаляет.
   */
  async function deleteImage(pathOrUrl) {
    const path = pathOrUrl.includes('/storage/v1/object/public/images/')
      ? pathOrUrl.split('/storage/v1/object/public/images/')[1]
      : pathOrUrl;
    const { error } = await client.storage.from('images').remove([path]);
    if (error) throw new Error(`deleteImage(${path}): ${error.message}`);
  }

  // ─── users management (через Vercel serverless functions) ───
  async function callApi(endpoint, options = {}) {
    const session = await getSession();
    if (!session) throw new Error('Not authenticated');
    const res = await fetch(`/api/${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
    return json;
  }

  function listUsers() {
    return callApi('list-users').then(r => r.users);
  }

  function inviteUser(email, role, fullName) {
    return callApi('invite-user', {
      method: 'POST',
      body: { email, role, full_name: fullName },
    });
  }

  function deleteUser(userId) {
    return callApi('delete-user', {
      method: 'POST',
      body: { user_id: userId },
    });
  }

  function changeUserRole(userId, role) {
    return callApi('change-role', {
      method: 'POST',
      body: { user_id: userId, role },
    });
  }

  // ─── audit log ───
  function logAudit(action, target, changes) {
    // fire-and-forget — не ждём, не блокируем UI на ошибках логирования
    return client.from('audit_log').insert({ action, target, changes }).then(({ error }) => {
      if (error) console.warn('[SupabaseAdmin] audit_log:', error.message);
    });
  }

  // ─── export ───
  window.SupabaseAdmin = {
    client,                      // raw client на случай если нужны экзотические operations
    CONTENT_KEYS,

    // auth
    login,
    logout,
    getSession,
    getCurrentUser,
    onAuthStateChange,

    // content
    getContent,
    getAllContent,
    setContent,

    // storage
    uploadImage,
    getImageUrl,
    deleteImage,

    // users (super_admin only — backend проверяет)
    listUsers,
    inviteUser,
    deleteUser,
    changeUserRole,

    // audit
    logAudit,
  };
})();
