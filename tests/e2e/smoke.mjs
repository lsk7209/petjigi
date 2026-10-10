// 접근성·반응형 smoke. ads-decision.mjs와 같은 격리 빌드·fixture를 쓴다.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const PORT = 3198;
const BASE = `http://127.0.0.1:${PORT}`;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const VIEWPORTS = [[360, 800], [768, 1024], [1440, 900]];
const PAGES = [
  ['/', 'h1'], ['/guide', 'h1'], ['/guide/fixture-guide', 'h1'], ['/guide/animal-hospital-guide', '#practical-tool'],
  ['/blog/pet-insurance-guide', '#practical-tool'], ['/blog/animal-registration-chip-guide', '#practical-tool'],
  ['/hwaseong/vet', 'h1'], [`/vet/hwaseong/${encodeURIComponent('합성병원')}`, 'section[aria-label="데이터 범위"]'],
  ['/about', 'h1'], ['/contact', 'h1'], ['/privacy', 'h1'], ['/disclosure', 'h1'], ['/advertising', 'h1'],
];
const results = [];
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
  env: process.env, stdio: 'ignore',
});
for (let i = 0; i < 60; i++) {
  try { if ((await fetch(`${BASE}/about`)).status < 500) break; } catch {}
  await new Promise(r => setTimeout(r, 1000));
}
const check = async (name, fn) => {
  try { await fn(); results.push({ name, ok: true }); } catch (e) { results.push({ name, ok: false, error: String(e.message).slice(0, 250) }); }
};
try {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  for (const [path, selector] of PAGES) {
    for (const [w, h] of VIEWPORTS) {
      await check(`${path} @${w}`, async () => {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: w !== 360 });
        const page = await ctx.newPage();
        const res = await page.goto(BASE + path);
        assert.equal(res.status(), 200);
        assert.ok(await page.locator(selector).first().isVisible(), `${selector} 보이지 않음`);
        assert.equal(await page.locator('h1').count() <= 1, true, 'h1 중복');
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        assert.ok(overflow <= 1, `가로 넘침 ${overflow}px`);
        await ctx.close();
      });
    }
  }
  await check('잘못된 URL은 404', async () => {
    const page = await (await browser.newContext()).newPage();
    assert.equal((await page.goto(BASE + '/blog/no-such-post-xyz')).status(), 404);
  });
  await check('키보드 Tab으로 첫 포커스가 보이는 요소에 간다', async () => {
    const page = await (await browser.newContext()).newPage();
    await page.goto(BASE + '/');
    await page.keyboard.press('Tab');
    const ok = await page.evaluate(() => { const e = document.activeElement; return !!e && e !== document.body && e.getBoundingClientRect().width > 0; });
    assert.ok(ok);
  });
  await check('펫보험 계산 예시: 입력하면 결과 표시', async () => {
    const page = await (await browser.newContext()).newPage();
    await page.goto(BASE + '/blog/pet-insurance-guide');
    const inputs = page.locator('#practical-tool input[type=number]');
    for (const [i, v] of ['500000', '70', '0', '1000000'].entries()) await inputs.nth(i).fill(v);
    await page.waitForSelector('text=예시 계산값: 350,000원');
  });
  await browser.close();
} finally {
  server.kill();
}
console.table(results.filter(r => !r.ok));
console.log(`passed ${results.filter(r => r.ok).length} / ${results.length}`);
process.exit(results.every(r => r.ok) ? 0 : 1);
