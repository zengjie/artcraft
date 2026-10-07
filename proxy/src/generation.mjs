import { token, hash, fail, upstream } from './common.mjs';
import { buildInput } from './models.mjs';

export class Generation {
  constructor(store, media, config, fetchImpl) {
    this.store = store; this.media = media; this.config = config; this.fetch = fetchImpl;
    this.polling = new Map();
  }
  async submit(owner, modality, request) {
    const built = buildInput(modality, request, (id, kind) => this.media.resolve(owner, id, kind));
    if (!this.config.falKey) fail(503, 'Proxy 尚未配置 FAL_KEY');
    const key = request.idempotency_token || request.uuid_idempotency_token;
    if (typeof key !== 'string' || !key.length || key.length > 200) fail(400, 'Missing idempotency token');
    const idem = hash(`${owner}:${key}`), fingerprint = hash(JSON.stringify(built));
    const existing = this.store.get('idempotency', idem);
    if (existing) {
      if (existing.fingerprint !== fingerprint) fail(409, 'Idempotency token was used for different input');
      const job = this.store.get('job', existing.jobId);
      if (job.state === 'submitting') fail(409, 'Submission is pending or uncertain; do not submit again with a new token');
      return { success: true, inference_job_token: existing.jobId, all_job_tokens: [existing.jobId] };
    }
    const active = this.store.list('job').filter(j => j.owner === owner && !['complete_success', 'complete_failure'].includes(j.state));
    if (active.length >= this.config.maxActiveJobs) fail(429, 'Too many active jobs');
    const today = new Date().toISOString().slice(0, 10);
    const daily = this.store.list('job').filter(j => j.owner === owner && j.created.startsWith(today));
    if (daily.length >= (this.config.maxDailyJobs ?? 100)) fail(429, 'Daily generation limit reached');
    const jobId = `job_${token()}`;
    const job = { owner, modality, model: built.model.model, state: 'submitting', created: new Date().toISOString(), fingerprint, endpoint: built.endpoint };
    this.store.put('job', jobId, job);
    this.store.put('idempotency', idem, { fingerprint, jobId });
    try {
      const response = await this.call(`https://queue.fal.run/${built.endpoint}`, 'POST', built.input);
      if (typeof response.request_id !== 'string') fail(502, 'fal returned no request ID');
      for (const field of ['status_url', 'response_url']) this.validateUrl(response[field]);
      this.store.put('job', jobId, { ...job, state: 'pending', falId: response.request_id, statusUrl: response.status_url, responseUrl: response.response_url });
    } catch (error) {
      // A timeout may mean fal accepted the request. Never automatically resubmit.
      if ([422, 429].includes(error.status)) this.store.put('job', jobId, { ...job, state: 'complete_failure', error: error.message });
      throw error;
    }
    return { success: true, inference_job_token: jobId, all_job_tokens: [jobId] };
  }
  async poll(id) {
    if (this.polling.has(id)) return this.polling.get(id);
    const promise = this.update(id).finally(() => this.polling.delete(id));
    this.polling.set(id, promise);
    return promise;
  }
  async update(id) {
    const job = this.store.get('job', id);
    if (!job || !['pending', 'started'].includes(job.state)) return;
    if (job.lastPoll && Date.now() - job.lastPoll < 3000) return;
    job.lastPoll = Date.now();
    this.store.put('job', id, job);
    try {
      const status = await this.call(job.statusUrl);
      if (status.status === 'IN_PROGRESS') job.state = 'started';
      if (status.status === 'COMPLETED') {
        if (status.error) { job.state = 'complete_failure'; job.error = 'fal generation failed'; }
        else {
          const result = await this.call(job.responseUrl);
          if (job.modality === 'text') {
            if (typeof result.prompt !== 'string' || !result.prompt.trim()) { job.state = 'complete_failure'; job.error = 'fal returned no prompt'; }
            else { job.text = result.prompt; job.state = 'complete_success'; }
            this.store.put('job', id, job);
            return;
          }
          const files = result.images || [result.image || result.video || result.audio_file || result.audio || result.model_glb_pbr || result.model_glb || result.model_mesh || result.world_file].filter(Boolean);
          if (!files.length || files.some(f => typeof f?.url !== 'string')) { job.state = 'complete_failure'; job.error = 'fal returned no supported output'; }
          else {
            const batch = `batch_${token()}`;
            job.outputs = files.map(f => this.media.add(job.owner, job.modality, f, { maybe_batch_token: batch, maybe_model_type: job.model, origin_category: 'inference' }).token);
            job.batch = batch;
            job.state = 'complete_success';
          }
        }
      }
      this.store.put('job', id, job);
    } catch (error) {
      if (error.status === 422) this.store.put('job', id, { ...job, state: 'complete_failure', error: 'fal rejected this generation' });
      // Transport and rate-limit failures are retried by the next desktop poll.
    }
  }
  async list(owner) {
    const jobs = this.store.list('job').filter(j => j.owner === owner).slice(0, 100);
    await Promise.all(jobs.map(j => this.poll(j.id)));
    return jobs.map(j => this.view(j.id));
  }
  view(id) {
    const job = this.store.get('job', id);
    const output = job.outputs?.[0] && this.store.get('media', job.outputs[0])?.item;
    return {
      job_token: id, created_at: job.created, updated_at: new Date(job.lastPoll || job.created).toISOString(),
      request: { inference_category: ({ image: 'image_generation', video: 'video_generation', audio: 'audio_generation', mesh: 'object_generation', splat: 'splat_generation', world: 'world_generation', text: 'prompt_generation' })[job.modality], maybe_model_type: job.model },
      status: { status: job.state === 'submitting' ? 'pending' : job.state, attempt_count: 1, requires_keepalive: false, progress_percentage: job.state === 'complete_success' ? 100 : 0, maybe_failure_message: job.error || (job.state === 'submitting' ? 'Submission pending or uncertain. Check the fal dashboard before retrying.' : null) },
      maybe_result: job.text ? { entity_type: 'text', text: job.text } : output ? { entity_type: 'media_file', entity_token: output.token, maybe_batch_token: job.batch, media_links: output.media_links, maybe_successfully_completed_at: output.created_at } : null,
    };
  }
  validateUrl(value) {
    let url;
    try { url = new URL(value); } catch { fail(502, 'Invalid fal queue URL'); }
    if (url.origin !== 'https://queue.fal.run' || url.username || url.password || url.hash) fail(502, 'Invalid fal queue URL');
    return url.href;
  }
  call(url, method = 'GET', input) {
    return upstream(this.fetch, this.validateUrl(url), { method, headers: { Authorization: `Key ${this.config.falKey}`, 'Content-Type': 'application/json' }, ...(input ? { body: JSON.stringify(input) } : {}) });
  }
}
