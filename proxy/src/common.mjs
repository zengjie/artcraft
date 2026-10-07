import { randomBytes, createHash } from 'node:crypto';

export const token = () => randomBytes(32).toString('base64url');
export const hash = value => createHash('sha256').update(value).digest('hex');
export const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
export const escapeHtml = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export function cookies(req) {
  return Object.fromEntries((req.headers.cookie || '').split(';').map(p => p.trim().split(/=(.*)/s)).filter(p => p[0]).map(([k, v]) => [k, v]));
}
export async function body(req, max = 1024 * 1024) {
  const parts = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > max) fail(413, 'Request body too large');
    parts.push(chunk);
  }
  return Buffer.concat(parts);
}
export async function jsonBody(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) fail(415, 'Expected application/json');
  try {
    const parsed = JSON.parse((await body(req)).toString());
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) fail(400, 'Expected an object');
    return parsed;
  } catch (error) {
    if (error.status) throw error;
    fail(400, 'Invalid JSON');
  }
}
export function json(res, value, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(value));
}
export function html(res, content, script = '') {
  const nonce = token();
  // Native form POSTs send Origin: null under no-referrer. Keep the origin
  // available for CSRF checks without disclosing OAuth query parameters.
  res.setHeader('Referrer-Policy', 'strict-origin');
  res.setHeader('Content-Security-Policy', `default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'`);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>ArtCraft · 飞书登录</title><style>body{font:18px system-ui;background:#18191c;color:#eee;max-width:480px;margin:12vh auto;padding:24px}button{padding:12px 24px;background:#4787ff;color:white;border:0;border-radius:6px;font:inherit;cursor:pointer}code{font-size:28px}p{line-height:1.6}input{padding:12px;font:inherit}</style><h1>ArtCraft</h1>${content}${script ? `<script nonce="${nonce}">${script}</script>` : ''}</html>`);
}
export async function upstream(fetchImpl, url, options = {}) {
  const response = await fetchImpl(url, { ...options, redirect: 'error', signal: AbortSignal.timeout(30_000) });
  let result;
  try { result = await response.json(); } catch { fail(502, 'Upstream returned an invalid response'); }
  if (!response.ok) {
    // Do not echo upstream bodies, which may include signed URLs or credentials.
    fail(response.status === 429 ? 429 : response.status === 422 ? 422 : 502, `Upstream request failed (HTTP ${response.status})`);
  }
  return result;
}
