// Six edited seed articles in an isolated build and fixture DB; third-party traffic is mocked.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { launch, startServer } from './server.mjs';

const ROUTES = [
  '/guide/dog-adoption-checklist',
  '/guide/dog-food-label-guide',
  '/guide/animal-hospital-guide',
  '/blog/pet-insurance-comparison-method',
  '/guide/indoor-cat-enrichment-guide',
  '/guide/memorial-ceremony',
  '/guide/pet-first-aid-guide',
  '/guide/pet-health-checkup-guide',
  '/blog/pet-insurance-claim-guide',
  '/blog/pet-insurance-exclusions-guide',
  '/blog/dog-liver-disease-early-signs',
  '/blog/dog-skin-lump-guide',
  '/blog/cat-food-allergy-elimination-diet',
];
const results = [];
const screenshots = resolve('.seo-cache/core-guides/screens');
mkdirSync(screenshots, { recursive: true });
const check = async (name, fn) => {
  try { await fn(); results.push({ name, ok: true }); }
  catch (error) { results.push({ name, ok: false, error: String(error.message).slice(0, 350) }); }
};
const { base, server } = await startServer(3196);
try {
  const browser = await launch();
  const linkStatuses = new Map();
  for (const width of [1440, 390]) {
    for (const path of ROUTES) {
      await check(`${width}px ${path}`, async () => {
        const context = await browser.newContext({ viewport: { width, height: 900 } });
        const page = await context.newPage();
        const thirdPartyRequests = [];
        try {
          await page.route((url) => url.origin !== base, (route) => {
            thirdPartyRequests.push(route.request().url());
            return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
          });
          const response = await page.goto(base + path);
          assert.equal(response?.status(), 200, path);
          await page.locator('#article-body').waitFor();
          assert.equal(await page.locator('h1').count(), 1, 'exactly one h1');
          assert.ok(await page.locator('h1').isVisible(), 'h1 visible');
          assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://petjigi.kr${path}`);
          assert.ok(await page.locator('#article-body table, #article-body ul, #article-body ol').first().isVisible(), 'visible table or checklist');
          const sourceText = await page.locator('section[aria-label="참고 자료"]').innerText();
          assert.match(sourceText, /https?:\/\/[^\s]+/, 'concrete source URL displayed');
          const outbound = await page.locator('#article-body a[href^="https://"]').count();
          assert.ok(outbound >= 1, 'source link in article body');
          const localHrefs = await page.locator('#article-body a[href^="/"]').evaluateAll((links) =>
            [...new Set(links.map((link) => link.getAttribute('href')))]);
          assert.ok(localHrefs.length >= 3, `expected three related article links: ${JSON.stringify(localHrefs)}`);
          for (const href of localHrefs) {
            const url = new URL(href, base);
            assert.equal(url.origin, base, `internal href: ${href}`);
            if (!linkStatuses.has(url.pathname)) linkStatuses.set(url.pathname, (await fetch(base + url.pathname)).status);
            assert.equal(linkStatuses.get(url.pathname), 200, `broken related link: ${href}`);
            if (url.hash) assert.ok(await page.locator(`#article-body a[href="${href}"]`).count(), href);
          }
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          assert.ok(overflow <= 1, `${overflow}px horizontal overflow`);
          await page.screenshot({ path: resolve(screenshots, `${width}-${path.split('/').at(-1)}.png`), fullPage: true });
          if (path.endsWith('memorial-ceremony')) {
            assert.equal(await page.locator('main[data-ads-policy="block"]').count(), 1, 'memorial ads policy');
            await page.waitForTimeout(1800);
            assert.equal(await page.locator('ins.adsbygoogle, #adsense-auto').count(), 0, 'memorial ad element');
            assert.equal(thirdPartyRequests.filter((url) => /googlesyndication|doubleclick/.test(url)).length, 0, 'memorial ad request');
          }
        } finally { await context.close(); }
      });
    }
  }
  await check('local finder and health destinations', async () => {
    assert.equal(linkStatuses.get('/'), 200, 'local finder home link');
    assert.equal(linkStatuses.get('/category/health'), 200, 'health category link');
    const home = await fetch(base + '/');
    assert.match(await home.text(), /id="hm-local"/, 'local finder anchor');
  });
  await check('review queue insurance guide stays unpublished', async () => {
    assert.equal((await fetch(base + '/guide/pet-insurance-before-joining')).status, 404);
    for (const path of ['/guide', '/sitemap-content.xml']) {
      assert.equal((await (await fetch(base + path)).text()).includes('pet-insurance-before-joining'), false, path);
    }
  });
  await check('retired guide URLs redirect to the edited guides', async () => {
    for (const [oldPath, newPath] of [
      ['/guide/dog-adoption-complete-guide', '/guide/dog-adoption-checklist'],
      ['/guide/cat-indoor-enrichment-guide', '/guide/indoor-cat-enrichment-guide'],
      ['/guide/pet-insurance-claim-guide', '/blog/pet-insurance-claim-guide'],
    ]) {
      const response = await fetch(base + oldPath, { redirect: 'manual' });
      assert.equal(response.status, 308, oldPath);
      assert.equal(new URL(response.headers.get('location'), base).pathname, newPath, oldPath);
    }
  });
  await browser.close();
} finally { server.kill(); }
console.table(results.filter((result) => !result.ok));
console.log(`passed ${results.filter((result) => result.ok).length} / ${results.length}`);
process.exit(results.every((result) => result.ok) ? 0 : 1);
