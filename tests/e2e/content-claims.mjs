// B01~B04 사용자 흐름 검증: 정정된 과태료 본문, 제휴·광고 고지 일치, 비공개 콘텐츠 보호, 체크리스트→지역 시설 찾기.
import assert from 'node:assert/strict';
import { launch, startServer } from './server.mjs';

const results = [];
const check = async (name, fn) => {
  try { await fn(); results.push({ name, ok: true }); } catch (e) { results.push({ name, ok: false, error: String(e.message).slice(0, 300) }); }
};
const { base, server } = await startServer(3197);
try {
  const browser = await launch();
  const open = async (path, opts = {}) => {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    const res = await page.goto(base + path);
    return { ctx, page, res };
  };

  await check('B01 동물등록 가이드: 위반 유형별 과태료 표와 도구', async () => {
    const { ctx, page, res } = await open('/guide/microchip-registration-complete-guide');
    assert.equal(res.status(), 200);
    const rows = await page.$$eval('article table tr, main table tr', (trs) => trs.map((tr) => tr.innerText.replace(/\s+/g, ' ').trim()));
    assert.ok(rows.some((r) => /등록대상동물 미등록 20만 원 40만 원 60만 원/.test(r)), JSON.stringify(rows));
    assert.ok(rows.some((r) => /등록 변경사항 미신고 10만 원 20만 원 40만 원/.test(r)), JSON.stringify(rows));
    const text = await page.locator('body').innerText();
    for (const bad of ['1차 40만', '3차 이상 100만', '10만~50만']) assert.equal(text.includes(bad), false, bad);
    assert.ok(text.includes('부과 기준과 법정 한도는 다릅니다'));
    assert.ok(await page.locator('#practical-tool').isVisible());
    assert.ok(text.includes('등록대행기관과 동물 판매업체는 서로 다른 곳입니다'));
    await ctx.close();
  });

  await check('B02 제휴 고지와 광고 정책의 운영 상태 일치', async () => {
    const texts = {};
    for (const path of ['/disclosure', '/advertising']) {
      const { ctx, page, res } = await open(path);
      assert.equal(res.status(), 200);
      texts[path] = await page.locator('main').innerText();
      texts[`${path}#desc`] = await page.locator('meta[name=description]').getAttribute('content');
      await ctx.close();
    }
    for (const path of ['/disclosure', '/advertising']) {
      assert.match(texts[path], /제휴\(수수료\) 링크는 없습니다/, path);
      assert.match(texts[path], /자체 정책/, path);
      assert.match(texts[path], /최종 업데이트: 2026-10-11/, path);
      assert.equal(/어필리에이트만 노출|굿즈 어필리에이트/.test(texts[path] + texts[`${path}#desc`]), false, path);
    }
    assert.match(texts['/disclosure#desc'], /현재 제휴 링크는 없으며/);
  });

  await check('비공개 보호: 검토 대기·미래 발행 콘텐츠는 404이고 목록·사이트맵에 없다', async () => {
    for (const slug of ['fixture-draft', 'fixture-future']) {
      const { ctx, res } = await open(`/guide/${slug}`);
      assert.equal(res.status(), 404, slug);
      await ctx.close();
      for (const listing of ['/guide', '/sitemap-content.xml']) {
        const body = await (await fetch(base + listing)).text();
        assert.equal(body.includes(slug), false, `${listing} 에 ${slug}`);
      }
    }
  });

  for (const [label, opts, useKeyboard] of [
    ['데스크톱 마우스', { viewport: { width: 1280, height: 900 } }, false],
    ['모바일 360 키보드', { viewport: { width: 360, height: 800 } }, true],
  ]) {
    await check(`B04 체크리스트 → 지역 선택 → 시도 목록 (${label})`, async () => {
      const { ctx, page } = await open('/guide/microchip-registration-complete-guide', opts);
      const link = page.locator('#practical-tool').getByRole('link', { name: '내 지역에서 시설 찾기' });
      if (useKeyboard) { await link.focus(); await page.keyboard.press('Enter'); } else await link.click();
      await page.waitForURL('**/#hm-local');
      await page.locator('#hm-sido-select').selectOption('gyeonggi');
      await page.getByRole('button', { name: '시설 찾기' }).click();
      await page.waitForURL('**/sido/gyeonggi');
      assert.ok(await page.locator('a[href="/hwaseong/vet"]').first().isVisible());
      await ctx.close();
    });
  }
  await browser.close();
} finally {
  server.kill();
}
console.table(results);
process.exit(results.every((r) => r.ok) ? 0 : 1);
