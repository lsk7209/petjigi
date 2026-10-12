// Source-backed fixture; no production DB or form submissions.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { launch, startServer } from './server.mjs';

const { base, server } = await startServer(3195);
const results = [];
const screenshots = resolve('.seo-cache/site-value/screens');
mkdirSync(screenshots, { recursive: true });
const check = async (name, run) => {
  try { await run(); results.push({ name, ok: true }); }
  catch (error) { results.push({ name, ok: false, error: error.message }); }
};
const noOverflow = async (page) => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'viewport overflow');
const contexts = [];
try {
  const browser = await launch();
  try {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      contexts.push(context);
      const page = await context.newPage();
      await page.route((url) => url.origin !== base, route => route.fulfill({ status: 200, contentType: 'text/javascript', body: '' }));
      for (const path of ['/', ...['adoption', 'nutrition', 'health', 'insurance', 'care', 'memorial'].map(slug => `/category/${slug}`)]) {
        await check(`${width} reader path ${path}`, async () => {
          assert.equal((await page.goto(base + path)).status(), 200);
          const section = page.locator('[data-owner-journeys]');
          assert.ok(await section.isVisible());
          assert.equal(await section.locator('article').count(), path === '/' ? 6 : 1);
          const hrefs = await section.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href')));
          assert.equal(hrefs.length, path === '/' ? 17 : path === '/category/memorial' ? 2 : 3);
          for (const href of new Set(hrefs)) assert.equal((await fetch(base + href)).status, 200, href);
          const first = section.locator('a').first();
          await first.focus();
          await page.keyboard.press('Enter');
          await page.waitForURL(base + hrefs[0]);
          assert.ok(await page.locator('#article-body').isVisible(), 'keyboard path reaches article');
          await page.goto(base + path);
          await noOverflow(page);
          await page.screenshot({ path: resolve(screenshots, `${width}-${path.replaceAll('/', '_') || 'home'}.png`), fullPage: true });
        });
      }
      for (const [slug, type] of [['dog-adoption-checklist', 'guide'], ['animal-hospital-guide', 'guide'], ['pet-insurance-comparison-method', 'blog']]) {
        await check(`${width} edit, print and reload ${slug}`, async () => {
          await page.emulateMedia({ media: 'screen' });
          await page.goto(`${base}/${type}/${slug}`);
          const tool = page.locator('#practical-tool');
          await tool.scrollIntoViewIfNeeded();
          await tool.locator('input, textarea').first().waitFor();
          const storageBefore = await page.evaluate(() => [JSON.stringify(localStorage), JSON.stringify(sessionStorage)]);
          const requests = [];
          const listener = request => requests.push({ url: request.url(), body: request.postData(), method: request.method() });
          page.on('request', listener);
          let sample;
          if (slug === 'dog-adoption-checklist') {
            const group = tool.locator('fieldset').first();
            await group.locator('input').nth(0).fill('12000');
            await group.locator('input').nth(1).fill('3000');
            await group.getByText(/합계: 15,000원/).waitFor();
            await group.locator('input').nth(1).fill('-1');
            await group.getByText(/0 이상의 정수 금액/).waitFor();
            await group.locator('input').nth(1).fill('3000');
            sample = '12000';
          } else {
            sample = '질문기록-PRIVATE-123\n긴 답변이 잘리지 않고 인쇄되는지 확인합니다. '.repeat(4);
            const field = tool.locator('textarea').first();
            await field.focus();
            await field.fill(sample);
            assert.equal(await field.inputValue(), sample);
            if (slug === 'animal-hospital-guide') {
              await tool.locator('input[type=checkbox]').first().check();
              assert.ok(await tool.locator('input[type=checkbox]').first().isChecked());
            }
          }
          await noOverflow(page);
          await page.screenshot({ path: resolve(screenshots, `${width}-${slug}-edited.png`), fullPage: true });
          await page.evaluate(() => { window.__printCalls = 0; window.print = () => { window.__printCalls++; }; });
          await tool.getByRole('button', { name: /인쇄/ }).click();
          assert.equal(await page.evaluate(() => window.__printCalls), 1);
          await page.emulateMedia({ media: 'print' });
          assert.ok(await tool.isVisible());
          assert.equal(await tool.locator('input, textarea').first().isVisible(), false, 'editable widgets hidden in print');
          const visibleValues = await tool.locator('span').evaluateAll((spans, value) => spans.filter(span => span.textContent === value && getComputedStyle(span).display !== 'none' && span.getBoundingClientRect().height > 0).length, sample);
          assert.ok(visibleValues > 0, 'entered full text preserved in a visible print field');
          if (slug === 'animal-hospital-guide') assert.ok(await tool.getByText('☑', { exact: true }).first().isVisible());
          assert.equal(await page.locator('h1').isVisible(), false, 'print only worksheet');
          await page.pdf({ path: resolve(screenshots, `${width}-${slug}.pdf`), format: 'A4', printBackground: true });
          await page.screenshot({ path: resolve(screenshots, `${width}-${slug}-print.png`), fullPage: true });
          await page.emulateMedia({ media: 'screen' });
          page.off('request', listener);
          assert.equal(requests.some(request => request.body?.includes('PRIVATE-123')), false, 'input data transmitted');
          assert.equal(requests.some(request => request.method !== 'GET'), false, 'unexpected write request');
          assert.deepEqual(await page.evaluate(() => [JSON.stringify(localStorage), JSON.stringify(sessionStorage)]), storageBefore, 'inputs persisted');
          await page.reload();
          assert.equal(await tool.locator('input, textarea').first().inputValue(), slug === 'animal-hospital-guide' ? 'on' : '');
          if (slug === 'animal-hospital-guide') {
            assert.equal(await tool.locator('input[type=checkbox]').first().isChecked(), false);
            assert.equal(await tool.locator('textarea').first().inputValue(), '');
          }
        });
      }
      for (const path of ['/hwaseong/vet', `/vet/hwaseong/${encodeURIComponent('합성병원')}`]) {
        await check(`${width} local previsit ${path}`, async () => {
          assert.equal((await page.goto(base + path)).status(), 200);
          const section = page.locator('[data-visit-questions]');
          assert.ok(await section.isVisible());
          assert.match(await section.innerText(), /공공데이터의 수집일은 업체의 현재 영업 상태를 확인한 날짜가 아닙니다/);
          if (path.startsWith('/vet/')) assert.match(await page.locator('section[aria-label="데이터 범위"]').innerText(), /2026-08-01/);
          await noOverflow(page);
          await page.screenshot({ path: resolve(screenshots, `${width}-${path.startsWith('/vet/') ? 'detail' : 'listing'}.png`), fullPage: true });
        });
      }
      await context.close();
    }
    await check('mismatched address and unknown collection date remain explicit', async () => {
      const context = await browser.newContext();
      contexts.push(context);
      const page = await context.newPage();
      await page.goto(base + '/hwaseong/sale');
      assert.match(await page.locator('main').innerText(), /표시 주소.*지역.*다/);
      await page.goto(`${base}/sale/hwaseong/${encodeURIComponent('합성주소확인')}`);
      assert.match(await page.locator('section[aria-label="데이터 범위"]').innerText(), /확인되지 않음/);
      assert.match(await page.locator('[data-visit-questions]').innerText(), /실제 상담 장소/);
      await context.close();
    });
  } finally { await Promise.all(contexts.map(context => context.close().catch(() => {}))); await browser.close(); }
} finally { server.kill(); }
console.table(results.filter(result => !result.ok));
console.log(`passed ${results.filter(result => result.ok).length} / ${results.length}`);
process.exitCode = results.every(result => result.ok) ? 0 : 1;
