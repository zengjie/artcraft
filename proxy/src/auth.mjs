import { token, hash, fail, cookies, jsonBody, body, json, html, escapeHtml, upstream } from './common.mjs';

const CHALLENGE_MS = 10 * 60_000;
const SESSION_MS = 7 * 24 * 60 * 60_000;

export class Auth {
  constructor(store, config, fetchImpl) {
    this.store = store;
    this.config = config;
    this.fetch = fetchImpl;
  }
  session(req) {
    const value = cookies(req).session || req.headers.session;
    const session = typeof value === 'string' && this.store.get('session', hash(value));
    if (!session || session.expires <= Date.now()) return null;
    return session;
  }
  require(req) {
    return this.session(req) || fail(401, '请先使用飞书登录');
  }
  cookie(name, value, maxAge) {
    return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${this.config.origin.startsWith('https:') ? '; Secure' : ''}`;
  }
  async route(req, res, url) {
    const path = url.pathname;
    if (path === '/v1/session' && req.method === 'GET') {
      const session = this.session(req);
      json(res, { success: true, logged_in: !!session, user: session?.user ?? null });
    } else if (path === '/v1/logout' && req.method === 'POST') {
      const value = cookies(req).session || req.headers.session;
      if (typeof value === 'string') this.store.remove('session', hash(value));
      res.setHeader('Set-Cookie', this.cookie('session', '', 0));
      json(res, { success: true });
    } else if (path === '/v1/login_challenges/create' && req.method === 'POST') {
      await jsonBody(req);
      if (!this.config.feishuAppId || !this.config.feishuAppSecret) fail(503, 'Proxy 尚未配置飞书应用');
      const device = token(), approval = token();
      const code = token().slice(0, 8).toUpperCase();
      const challenge = { approvalHash: hash(approval), code, expires: Date.now() + CHALLENGE_MS, status: 'pending' };
      this.store.put('challenge', hash(device), challenge);
      this.store.put('approval', hash(approval), { deviceHash: hash(device), expires: challenge.expires });
      json(res, { success: true, device_token: device, verification_url: `${this.config.origin}/login/desktop#approval_token=${approval}`, confirmation_code: code, expires_at: new Date(challenge.expires).toISOString(), poll_interval_seconds: 5 });
    } else if (path === '/v1/login_challenges/poll' && req.method === 'POST') {
      const { device_token: device } = await jsonBody(req);
      if (typeof device !== 'string') fail(400, 'Missing device token');
      const challenge = this.store.get('challenge', hash(device));
      if (!challenge || challenge.expires <= Date.now()) return json(res, { success: true, status: 'failed', maybe_failure_type: 'expired' });
      if (challenge.session) res.setHeader('Set-Cookie', this.cookie('session', challenge.session, SESSION_MS / 1000));
      json(res, { success: true, status: challenge.status, maybe_failure_type: null, ...(challenge.session ? { maybe_signed_session: challenge.session } : {}) });
    } else if (path === '/login/desktop' && req.method === 'GET') {
      html(res, '<p>请确认这是你发起的桌面登录请求。</p><button id="login">继续使用飞书</button><p id="error" role="alert"></p>', `
        const approval = new URLSearchParams(location.hash.slice(1)).get('approval_token');
        history.replaceState(null, '', location.pathname);
        document.getElementById('login').onclick = async () => {
          try {
            const r = await fetch('/auth/feishu/start', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({approval_token:approval})});
            const d = await r.json(); if (!r.ok) throw new Error(d.message);
            location.assign(d.url);
          } catch(e) { document.getElementById('error').textContent = e.message; }
        };`);
    } else if (path === '/auth/feishu/start' && req.method === 'POST') {
      const { approval_token: approval } = await jsonBody(req);
      if (typeof approval !== 'string') fail(400, 'Invalid approval token');
      const record = this.store.get('approval', hash(approval));
      if (!record || record.expires <= Date.now()) fail(400, '登录请求已过期');
      const challenge = this.store.get('challenge', record.deviceHash);
      if (challenge.status !== 'pending') fail(409, '登录请求已经完成');
      const state = token(), browser = token();
      this.store.put('oauth', hash(state), { deviceHash: record.deviceHash, browserHash: hash(browser), expires: record.expires });
      res.setHeader('Set-Cookie', this.cookie('feishu_oauth', browser, 600));
      const target = new URL('https://accounts.feishu.cn/open-apis/authen/v1/authorize');
      target.search = new URLSearchParams({ client_id: this.config.feishuAppId, response_type: 'code', redirect_uri: `${this.config.origin}/auth/feishu/callback`, state }).toString();
      json(res, { url: target.href });
    } else if (path === '/auth/feishu/callback' && req.method === 'GET') {
      const state = url.searchParams.get('state');
      const browser = cookies(req).feishu_oauth;
      const oauth = state && this.store.get('oauth', hash(state));
      if (!oauth || oauth.expires <= Date.now() || !browser || oauth.browserHash !== hash(browser)) fail(400, 'Invalid OAuth state');
      this.store.remove('oauth', hash(state)); // Authorization codes and state are single-use.
      const code = url.searchParams.get('code');
      if (!code || url.searchParams.has('error')) fail(400, '飞书授权已取消');
      const grant = await upstream(this.fetch, 'https://open.feishu.cn/open-apis/authen/v2/oauth/token', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ grant_type: 'authorization_code', client_id: this.config.feishuAppId, client_secret: this.config.feishuAppSecret, code, redirect_uri: `${this.config.origin}/auth/feishu/callback` }),
      });
      if (grant.code !== 0 || typeof grant.access_token !== 'string') fail(502, '飞书授权失败');
      const profile = await upstream(this.fetch, 'https://open.feishu.cn/open-apis/authen/v1/user_info', { headers: { Authorization: `Bearer ${grant.access_token}` } });
      if (profile.code !== 0 || !profile.data?.open_id || !profile.data?.tenant_key) fail(502, '无法获取飞书用户身份');
      if (this.config.allowedTenants.length && !this.config.allowedTenants.includes(profile.data.tenant_key)) fail(403, '此飞书租户未获授权');
      const user = userInfo(profile.data);
      const confirm = token();
      this.store.put('confirmation', hash(confirm), { ...oauth, user });
      const challenge = this.store.get('challenge', oauth.deviceHash);
      html(res, `<p>正在以 <strong>${escapeHtml(user.display_name)}</strong> 登录。</p><p>请核对桌面端显示的确认码：</p><p><code>${escapeHtml(challenge.code.slice(0, 4))}-${escapeHtml(challenge.code.slice(4))}</code></p><p>仅在你自己发起此请求且确认码一致时继续。</p><form method="post" action="/auth/feishu/confirm"><input type="hidden" name="confirmation" value="${confirm}"><button>确认登录此设备</button></form>`);
    } else if (path === '/auth/feishu/confirm' && req.method === 'POST') {
      const form = new URLSearchParams((await body(req, 4096)).toString());
      const value = form.get('confirmation'), browser = cookies(req).feishu_oauth;
      const confirm = value && this.store.get('confirmation', hash(value));
      if (!confirm || confirm.expires <= Date.now() || !browser || confirm.browserHash !== hash(browser)) fail(400, '登录确认已过期');
      this.store.remove('confirmation', hash(value));
      const challenge = this.store.get('challenge', confirm.deviceHash);
      if (!challenge || challenge.status !== 'pending' || challenge.expires <= Date.now()) fail(409, '登录请求已失效');
      const session = token();
      this.store.put('session', hash(session), { user: confirm.user, expires: Date.now() + SESSION_MS });
      this.store.put('challenge', confirm.deviceHash, { ...challenge, status: 'redeemed', session });
      res.setHeader('Set-Cookie', this.cookie('feishu_oauth', '', 0));
      html(res, '<p>登录成功，请返回 ArtCraft。此窗口可以关闭。</p>');
    } else return false;
    return true;
  }
}

function userInfo(profile) {
  const user_token = `user_${hash(`${profile.tenant_key}:${profile.open_id}`).slice(0, 32)}`;
  const username = `feishu_${user_token.slice(5, 17)}`;
  const display_name = profile.name || username;
  return {
    core_info: { user_token, username, display_name, gravatar_hash: '', default_avatar: { image_index: 0, color_index: 0 } },
    user_token, username, display_name, email_gravatar_hash: '',
    onboarding: { email_not_set: false, email_not_confirmed: false, password_not_set: false, username_not_customized: false },
    can_access_studio: true, maybe_feature_flags: ['studio'], fakeyou_plan: 'free', storyteller_stream_plan: 'free',
    ...Object.fromEntries(['use_tts','use_w2l','delete_own_tts_results','delete_own_w2l_results','delete_own_account','upload_tts_models','upload_w2l_templates','delete_own_tts_models','delete_own_w2l_templates','approve_w2l_templates','edit_other_users_profiles','edit_other_users_tts_models','edit_other_users_w2l_templates','delete_other_users_tts_models','delete_other_users_tts_results','delete_other_users_w2l_templates','delete_other_users_w2l_results','ban_users','delete_users'].map(key => [`can_${key}`, false])),
  };
}
