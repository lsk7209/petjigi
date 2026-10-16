// Controlled browser fetches deliberately ignore abort to exercise stale-response guards.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { launch, startServer } from './server.mjs';

const { base, server } = await startServer(3194);
const results = [];
const check = async (name, run) => {
  try { await run(); results.push({ name, ok: true }); }
  catch (error) { results.push({ name, ok: false, error: error.message }); }
};
let browser;
try {
  browser = await launch();
  const context = await browser.newContext();
  await context.route(url => url.origin !== base, route => route.fulfill({ body: '' }));
  await context.addInitScript(() => {
    const originalFetch = window.fetch.bind(window);
    window.searchRequests = [];
    window.searchEvents = [];
    window.gtag = (...args) => {
      if (args[0] === 'event' && args[1] === 'search') window.searchEvents.push(args);
    };
    window.fetch = (input, options) => {
      const url = new URL(String(input), location.href);
      if (url.pathname !== '/api/search') return originalFetch(input, options);
      return new Promise(resolve => window.searchRequests.push({ q: url.searchParams.get('q'), resolve }));
    };
    window.finishSearch = (q, status = 200) => {
      const pending = window.searchRequests.find(request => request.q === q && !request.done);
      if (!pending) throw new Error(`No pending query: ${q}`);
      pending.done = true;
      pending.resolve(new Response(JSON.stringify({ q, returnedCount: 1, hasMore: false,
        results: [{ type: 'guide', slug: 'fixture-guide',
          name: q.startsWith('mobile-') ? `긴 검색 결과 제목 ${'반려생활 안내 '.repeat(12)}` : `Result ${q}`,
          category: 5, href: '/guide/fixture-guide' }],
      }), { status, headers: { 'Content-Type': 'application/json' } }));
    };
  });
  const page = await context.newPage();
  const open = async () => {
    await page.goto(base + '/search');
    await page.locator('#site-search').waitFor();
  };
  const request = async q => {
    await page.locator('#site-search').fill(q);
    await page.waitForFunction(q => window.searchRequests.some(request => request.q === q), q);
  };
  const finish = async (q, status = 200) => {
    await page.evaluate(([q, status]) => window.finishSearch(q, status), [q, status]);
    // Flush the response and the React commit, rather than relying on arbitrary delays.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  };
  await check('cleared query rejects late response', async () => {
    await open();
    await request('old-clear');
    await page.locator('#site-search').fill('');
    await finish('old-clear');
    assert.equal(await page.locator('main li').count(), 0);
    assert.equal(await page.locator('main [role=status]').count(), 0);
  });
  await check('query edit rejects response during debounce', async () => {
    await open();
    await request('old-edit');
    await page.locator('#site-search').fill('new-edit');
    await finish('old-edit');
    assert.equal(await page.getByText('Result old-edit', { exact: true }).count(), 0);
  });
  await check('newest response survives reverse completion', async () => {
    await open();
    await request('older');
    await request('newer');
    await finish('newer');
    await page.getByText('Result newer', { exact: true }).waitFor();
    await finish('older');
    assert.equal(await page.getByText('Result older', { exact: true }).count(), 0);
    assert.ok(await page.getByText('Result newer', { exact: true }).isVisible());
  });
  await check('error clears when query becomes too short; next search recovers', async () => {
    await open();
    await request('failure');
    await finish('failure', 500);
    await page.locator('main').getByRole('alert').waitFor();
    await page.locator('#site-search').fill('a');
    assert.equal(await page.locator('main').getByRole('alert').count(), 0);
    await request('recovered');
    await finish('recovered');
    await page.getByText('Result recovered', { exact: true }).waitFor();
  });
  await check('Enter submits and search description resolves after typing', async () => {
    await open();
    await page.locator('#site-search').fill('enter-query');
    await page.locator('#site-search').press('Enter');
    await page.waitForFunction(() => window.searchRequests.some(request => request.q === 'enter-query'));
    assert.equal(await page.locator('#site-search-help').count(), 1);
    await finish('enter-query');
    await page.getByText('Result enter-query', { exact: true }).waitFor();
  });
  await check('unmounted search rejects late response and telemetry', async () => {
    await open();
    await request('unmounted');
    await page.locator('header').getByRole('link', { name: '가이드', exact: true }).click();
    await page.waitForURL(base + '/guide');
    const before = await page.evaluate(() => window.searchEvents.length);
    await finish('unmounted');
    assert.equal(await page.evaluate(() => window.searchEvents.length), before);
  });
  mkdirSync('output/playwright/resume-20261016', { recursive: true });
  for (const width of [360, 390, 768, 1440]) {
    await check(`search and menu @${width}`, async () => {
      await page.setViewportSize({ width, height: 900 });
      await open();
      assert.ok(await page.locator('#site-search').isVisible());
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      if (width < 1100) {
        const trigger = page.getByRole('button', { name: '메뉴 열기' });
        await trigger.click();
        await page.getByRole('button', { name: '메뉴 닫기' }).waitFor();
        await page.keyboard.press('Escape');
        assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
        assert.ok(await trigger.evaluate(element => element === document.activeElement));
      }
      await request(`mobile-${width}`);
      await finish(`mobile-${width}`);
      await page.locator('main li').waitFor();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.screenshot({ path: `output/playwright/resume-20261016/search-${width}.png`, fullPage: true });
    });
  }
  await context.close();
} finally {
  await browser?.close();
  server.kill();
}
console.log(JSON.stringify(results, null, 2));
console.log(`search passed ${results.filter(result => result.ok).length}/${results.length}`);
process.exitCode = results.every(result => result.ok) ? 0 : 1;
