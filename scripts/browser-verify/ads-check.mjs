// 로컬 격리 서버 전용 브라우저 검증. 광고·분석 요청은 가로채서 기록만 하고 외부로 보내지 않는다(mock).
// 실행: BASE_URL=http://localhost:3100 node scripts/browser-verify/ads-check.mjs
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
if (!/^http:\/\/localhost:\d+$/.test(BASE)) throw new Error("BASE_URL must be a localhost origin");
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const AD_HOST = /googlesyndication\.com|doubleclick\.net|googletagmanager\.com|google-analytics\.com/;
const results = [];
const check = (id, ok, detail) => { results.push({ id, ok, detail }); console.log(`${ok ? "PASS" : "FAIL"} ${id} ${detail ?? ""}`); };

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

async function newPage(viewport = { width: 1440, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  const adRequests = [];
  await ctx.route(AD_HOST, (route) => {
    adRequests.push({ t: Date.now(), url: route.request().url() });
    return route.fulfill({ status: 200, contentType: "application/javascript", body: "/* mocked */" });
  });
  const page = await ctx.newPage();
  let navs = 0;
  page.on("framenavigated", (f) => { if (f === page.mainFrame()) navs += 1; });
  return { ctx, page, adRequests, navCount: () => navs };
}
const adsenseCount = (reqs) => reqs.filter((r) => r.url.includes("adsbygoogle.js")).length;

// A01/A03/A05/A06: 직접 접속 시 raw HTML / 최종 DOM / 요청
const direct = [
  ["normal blog (allowed)", "/blog/synthetic-normal-post", 1],
  ["memorial blog cat6 not in static list", "/blog/synthetic-memorial-post", 0],
  ["pet-loss guide", "/guide/pet-loss-care", 0],
  ["404 page", "/definitely-not-a-page", 0],
  ["missing condition", "/condition/zzz-not-real", 0],
  ["pending sido (no regions)", "/sido/gangwon", 0],
  ["contact", "/contact", 0],
];
for (const [name, path, expected] of direct) {
  const { ctx, page, adRequests } = await newPage();
  const resp = await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const raw = await (await ctx.request.get(BASE + path)).text();
  const rawScripts = (raw.match(/adsbygoogle\.js/g) ?? []).length;
  const domScripts = await page.locator('script[src*="adsbygoogle.js"]').count();
  const got = adsenseCount(adRequests);
  check(`A-direct ${name}`, got === expected && domScripts <= 1 && (expected === 1 || rawScripts === 0),
    `status=${resp?.status()} adRequests=${got}/${expected} rawHtmlScripts=${rawScripts} domScripts=${domScripts}`);
  await ctx.close();
}

// A04: SPA 왕복 (허용 -> 제외 -> 뒤로 -> 앞으로), 새로고침 루프 없음
{
  const { ctx, page, adRequests, navCount } = await newPage();
  await page.goto(BASE + "/blog/synthetic-normal-post", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const before = adsenseCount(adRequests);
  const navBefore = navCount();
  await page.evaluate(() => window.next?.router?.push("/guide/pet-loss-care"));
  await page.waitForTimeout(4000);
  const hasScriptOnExcluded = await page.locator('script[src*="adsbygoogle.js"]').count();
  const navAfter = navCount();
  const urlOk = page.url().endsWith("/guide/pet-loss-care");
  await page.goBack(); await page.waitForTimeout(2500);
  await page.goForward(); await page.waitForTimeout(2500);
  await page.waitForTimeout(3000);
  const navEnd = navCount();
  await page.waitForTimeout(6000);
  const navLater = navCount();
  check("A04 allowed->excluded SPA", before === 1 && urlOk && hasScriptOnExcluded === 0,
    `adBefore=${before} url=${page.url()} adScriptsOnExcluded=${hasScriptOnExcluded} mainFrameNavs=${navBefore}->${navAfter}->${navEnd} totalAdRequests=${adsenseCount(adRequests)}`);
  check("A04 no reload loop (navigation count stable for 6s after back/forward)", navLater === navEnd, `navEnd=${navEnd} navLater=${navLater}`);
  await ctx.close();
}

// D04/D05: 모호한 강서구
{
  const { ctx, page } = await newPage();
  const resp = await page.goto(BASE + "/gangseo/vet", { waitUntil: "networkidle" });
  const body = await page.locator("main").innerText();
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  check("D04 ambiguous gangseo", resp?.status() === 200 && body.includes("서울특별시·부산광역시") && body.includes("합성병원1") && body.includes("합성병원2") && /noindex/.test(robots ?? ""),
    `status=${resp?.status()} robots=${robots} noticeShown=${body.includes("서울특별시·부산광역시")}`);
  await ctx.close();
}

// E05/E06: 없는 질환 404 + canonical 상속 없음
{
  const { ctx, page } = await newPage();
  const resp = await page.goto(BASE + "/condition/zzz-not-real", { waitUntil: "networkidle" });
  const canon = await page.locator('link[rel="canonical"]').count();
  check("E05/E06 missing condition", resp?.status() === 404 && canon === 0, `status=${resp?.status()} canonicalTags=${canon}`);
  await ctx.close();
}

// U01/U02: 실제 innerWidth 와 가로 overflow
for (const width of [360, 390, 768, 1440]) {
  for (const path of ["/", "/blog/synthetic-normal-post", "/gangseo/vet", "/guide/pet-loss-care"]) {
    const { ctx, page } = await newPage({ width, height: 900 });
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    const m = await page.evaluate(() => ({ iw: window.innerWidth, sw: document.documentElement.scrollWidth }));
    check(`U ${width}px ${path}`, m.iw === width && m.sw <= m.iw + 1, `innerWidth=${m.iw} scrollWidth=${m.sw}`);
    await ctx.close();
  }
}

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
