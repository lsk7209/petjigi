// 광고 판정 브라우저 검증. 격리 빌드(NEXT_DIST_DIR=.next-verify)+fixture DB 위에서 실행한다.
// 외부 광고 서버는 호출하지 않고 googlesyndication 요청을 가로채 계수한다.
// 사용: 빌드 후 `node tests/e2e/ads-decision.mjs` (환경변수는 README 주석 참고: docs/ads-decision-verification.md)
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const PORT = 3199;
const BASE = `http://127.0.0.1:${PORT}`;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const AD_SCRIPT_STUB = 'window.__adScriptLoaded = (window.__adScriptLoaded || 0) + 1;';
const results = [];

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
  env: process.env, stdio: 'ignore',
});
async function waitReady() {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(`${BASE}/about`)).status < 500) return; } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error('server not ready');
}

async function newPage(browser, { userAgent, delayDocMs = 0 } = {}) {
  const ctx = await browser.newContext({ userAgent });
  await ctx.addInitScript(() => { window.adsbygoogle = { pushes: 0, push() { this.pushes++; } }; });
  const page = await ctx.newPage();
  const adRequests = [];
  await page.route(/googlesyndication\.com|doubleclick\.net/, route => {
    adRequests.push(route.request().url());
    route.fulfill({ status: 200, contentType: 'text/javascript', body: AD_SCRIPT_STUB });
  });
  if (delayDocMs) {
    await page.route(u => u.origin === BASE, async route => {
      if (route.request().resourceType() === 'document') await new Promise(r => setTimeout(r, delayDocMs));
      await route.continue();
    });
  }
  return { ctx, page, adRequests };
}

async function snapshot(page, adRequests) {
  await page.waitForLoadState('load');
  await page.waitForTimeout(2500); // lazyOnload·정책 평가 여유
  const s = await page.evaluate(() => ({
    ins: document.querySelectorAll('ins.adsbygoogle').length,
    pushes: window.adsbygoogle?.pushes ?? 0,
    autoScript: !!document.getElementById('adsense-auto'),
    path: location.pathname,
  }));
  return { ...s, adRequests: adRequests.length };
}

const expectNoAds = s => assert.deepEqual([s.ins, s.pushes, s.autoScript, s.adRequests], [0, 0, false, 0], JSON.stringify(s));
const expectAds = s => assert.ok(s.autoScript && s.adRequests >= 1, JSON.stringify(s));

async function check(name, fn) {
  try { await fn(); results.push({ name, ok: true }); } catch (e) { results.push({ name, ok: false, error: String(e.message).slice(0, 300) }); }
}

try {
  await waitReady();
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const blocked = [
    ['404', '/missing-page-xyz'],
    ['장례 업체 상세', `/funeral/hwaseong/${encodeURIComponent('합성추모')}`],
    ['장례 업체 목록', '/hwaseong/funeral'],
    ['업체 0건 목록', '/hwaseong/boarding'],
    ['검색', '/search'],
    ['개인정보', '/privacy'],
  ];
  for (const [name, path] of blocked) {
    await check(`차단: ${name}`, async () => {
      const { ctx, page, adRequests } = await newPage(browser);
      await page.goto(BASE + path);
      expectNoAds(await snapshot(page, adRequests));
      await ctx.close();
    });
  }
  await check('차단: 지연된 404 문서(1200ms 초과)에서도 광고 시작 없음', async () => {
    const { ctx, page, adRequests } = await newPage(browser, { delayDocMs: 2500 });
    await page.goto(BASE + '/missing-page-xyz');
    expectNoAds(await snapshot(page, adRequests));
    await ctx.close();
  });
  for (const [name, path] of [['가이드 상세', '/guide/fixture-guide'], ['병원 목록', '/hwaseong/vet']]) {
    await check(`허용: ${name}`, async () => {
      const { ctx, page, adRequests } = await newPage(browser);
      await page.goto(BASE + path);
      expectAds(await snapshot(page, adRequests));
      await ctx.close();
    });
  }
  await check('크롤러 UA도 일반 방문자와 같은 판정(허용/차단)', async () => {
    const ua = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
    for (const [path, allow] of [['/guide/fixture-guide', true], ['/missing-page-xyz', false]]) {
      const { ctx, page, adRequests } = await newPage(browser, { userAgent: ua });
      await page.goto(BASE + path);
      const s = await snapshot(page, adRequests);
      if (allow) expectAds(s);
      else expectNoAds(s);
      await ctx.close();
    }
  });
  await check('이동: 허용 → 차단(클린 문서로 전환) → 차단 페이지에 새 광고 없음', async () => {
    const { ctx, page, adRequests } = await newPage(browser);
    await page.goto(BASE + '/guide/fixture-guide');
    expectAds(await snapshot(page, adRequests));
    await page.evaluate(() => window.next.router.push('/privacy'));
    await page.waitForURL('**/privacy');
    await page.waitForLoadState('load');
    await page.waitForTimeout(2500);
    const after = await page.evaluate(() => ({
      auto: !!document.getElementById('adsense-auto'), ins: document.querySelectorAll('ins.adsbygoogle').length,
      pushes: window.adsbygoogle?.pushes ?? 0, loaded: window.__adScriptLoaded ?? 0,
    }));
    assert.deepEqual([after.auto, after.ins, after.pushes, after.loaded], [false, 0, 0, 0], JSON.stringify(after));
    await ctx.close();
  });
  await check('이동: 차단 → 허용 시 중복 스크립트 없음', async () => {
    const { ctx, page, adRequests } = await newPage(browser);
    await page.goto(BASE + '/privacy');
    expectNoAds(await snapshot(page, adRequests));
    await page.evaluate(() => window.next.router.push('/guide/fixture-guide'));
    await page.waitForURL('**/guide/fixture-guide');
    await page.waitForTimeout(2500);
    const n = await page.evaluate(() => document.querySelectorAll('script#adsense-auto').length);
    assert.equal(n, 1);
    await ctx.close();
  });
  await browser.close();
} finally {
  server.kill();
}
console.table(results);
process.exit(results.every(r => r.ok) ? 0 : 1);
