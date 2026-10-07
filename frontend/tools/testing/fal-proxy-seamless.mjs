import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { installBrowserFixture } from '../performance/browser-fixture.mjs';
import { capabilities } from '../../../proxy/src/capabilities.mjs';
const base = process.argv[2] || 'http://127.0.0.1:5194';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(installBrowserFixture);
  await context.addInitScript(() => { localStorage.setItem('artcraft.generationService', 'fal'); });
  await context.addInitScript(catalog => {
    const original = window.__TAURI_INTERNALS__.invoke;
    window.__PROXY_SUBMISSIONS__ = [];
    window.__COMMANDS__ = [];
    window.__TAURI_INTERNALS__.invoke = async (command, args) => {
      window.__COMMANDS__.push({ command, args });
      if (command === 'storyteller_get_login_session_command') return null;
      if (command === 'generate_image_command') { window.__PROXY_SUBMISSIONS__.push(args.request); return { status: 'success', payload: {} }; }
      if (command !== 'fal_proxy_command') return original(command, args);
      if (args.operation === 'capabilities') return catalog;
      if (args.operation === 'session') return { logged_in: true, user: { display_name: 'Proxy test user', username: 'feishu_test', user_token: 'user_proxy' } };
      if (args.operation === 'read') return { success: true, jobs: [], results: [], media_files: [], pagination: { has_next_page: false } };
      if (args.operation === 'upload') return { media_file_token: 'mf_fpx_reference' };
      throw new Error('Unexpected operation ' + args.operation);
    };
  }, capabilities());
  await context.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
  const page = await context.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(base);
  await page.waitForTimeout(7000);
  await page.getByText('Create Image', { exact: true }).click();
  await page.waitForTimeout(3000);
  // The fal list-price tag replaces the credit readout for the preferred provider.
  await expect(page.getByTestId('fal-cost')).toBeVisible();
  await expect(page.getByTestId('fal-cost')).toContainText(/\$\d/);
  await expect(page.getByText(/^upgrade$/i)).toBeVisible();
  await page.getByPlaceholder('Describe what you want in the image...').fill('A red wooden boat');
  await page.locator('button.rounded-full.bg-primary').click();
  await expect.poll(() => page.evaluate(() => window.__PROXY_SUBMISSIONS__.length)).toBe(1);
  const [submission] = await page.evaluate(() => window.__PROXY_SUBMISSIONS__);
  assert.equal(submission.provider, 'fal_proxy');
  assert.equal(submission.model, 'nano_banana_pro', 'upstream default model, served by fal');
  assert.equal(submission.prompt, 'A red wooden boat');
  assert.ok(submission.resolution === undefined || submission.resolution === 'one_k', String(submission.resolution));
  assert.equal(submission.quality, undefined);
  await page.screenshot({ path: '/tmp/artcraft-seamless-ui.png', fullPage: true });
  assert.equal(await page.locator('.fal-workspace').count(), 0);
  assert.deepEqual(errors, []);
  assert.equal(await page.getByText('按用量计费').count(), 0, 'no stray localized cost copy');
  console.log('PASS: original shell, official upgrade, fal list price tag, preferred fal generation through existing image UI');
} finally { await browser.close(); }
