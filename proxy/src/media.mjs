import { token, fail, body } from './common.mjs';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export class Media {
  constructor(store, config) { this.store = store; this.config = config; }
  add(owner, modality, file, metadata = {}) {
    const id = `mf_fpx_${token()}`;
    const url = new URL(file.url);
    if (!['https:', 'http:'].includes(url.protocol)) fail(502, 'Invalid output URL');
    const type = file.content_type || ({ image: 'image/png', video: 'video/mp4', audio: 'audio/wav', mesh: 'model/gltf-binary', splat: 'application/octet-stream', world: 'application/zip' })[modality];
    const item = {
      token: id, media_class: modality, media_type: modality === 'splat' ? 'ply' : modality === 'world' ? 'zip' : ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'video/mp4': 'mp4', 'audio/wav': 'wav', 'audio/mpeg': 'mp3', 'model/gltf-binary': 'glb', 'application/octet-stream': modality === 'mesh' ? 'glb' : 'bin' })[type] || 'png',
      media_links: { cdn_url: file.url, maybe_thumbnail_template: modality === 'image' ? file.url : null, maybe_video_previews: null },
      cover_image: { maybe_links: null, default_cover: { image_index: 0, color_index: 0 } },
      maybe_engine_category: modality === 'mesh' ? 'object' : null,
      creator_set_visibility: 'unlisted', is_user_upload: false, is_intermediate_system_file: false,
      used_face_detailer: false, used_upscaler: false, is_emulated_media_file: false, is_featured: false,
      stats: { positive_rating_count: 0, bookmark_count: 0 },
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...metadata,
    };
    this.store.put('media', id, { owner, item, contentType: type });
    return item;
  }
  resolve(owner, id, kind) {
    if (typeof id !== 'string') fail(400, 'Missing reference media');
    const record = this.store.get('media', id);
    if (!record || record.owner !== owner || record.item.media_class !== kind) fail(404, 'Reference media not found');
    // Loopback development still works: fal receives bytes, never a localhost URL.
    if (record.localFile) return `data:${record.contentType};base64,${readFileSync(join(this.config.dataDir, 'uploads', record.localFile)).toString('base64')}`;
    return record.item.media_links.cdn_url;
  }
  async upload(req, owner) {
    const bytes = await body(req, 20 * 1024 * 1024);
    let form;
    try { form = await new Request('http://localhost', { method: 'POST', headers: { 'content-type': req.headers['content-type'] || '' }, body: bytes }).formData(); }
    catch { fail(400, 'Invalid multipart upload'); }
    const file = form.get('file') || form.get('video');
    if (!file || typeof file.arrayBuffer !== 'function') fail(400, 'Missing file');
    const supported = { 'image/png': 'image', 'image/jpeg': 'image', 'image/webp': 'image', 'image/gif': 'image', 'video/mp4': 'video', 'audio/wav': 'audio', 'audio/mpeg': 'audio', 'model/gltf-binary': 'mesh' };
    if (!supported[file.type]) fail(415, 'Unsupported media type');
    const localFile = token();
    const dir = join(this.config.dataDir, 'uploads');
    mkdirSync(dir, { recursive: true, mode: 0o700 });
    writeFileSync(join(dir, localFile), Buffer.from(await file.arrayBuffer()), { mode: 0o600 });
    const item = this.add(owner, supported[file.type], { url: `${this.config.origin}/assets/${localFile}`, content_type: file.type }, { origin_category: 'upload', is_user_upload: true, maybe_original_filename: file.name, is_intermediate_system_file: form.get('is_intermediate_system_file') === 'true' });
    this.store.put('media', item.token, { ...this.store.get('media', item.token), localFile });
    this.store.put('asset', localFile, { contentType: file.type });
    return { success: true, media_file_token: item.token };
  }
}
