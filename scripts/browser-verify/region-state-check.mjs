// 로컬 격리 서버 전용: 지역 목록 3상태(결과/정상 0건/수집 미확인) 렌더, 가로 넘침, 콘솔 오류 확인. 광고·분석은 mock.
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
if (!/^http:\/\/localhost:\d+$/.test(BASE)) throw new Error("BASE_URL must be a localhost origin");
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const AD_HOST = /googlesyndication\.com|doubleclick\.net|googletagmanager\.com|google-analytics\.com/;
const CASES = [
  ["/gangnam/vet", /1곳|합성v1/, 1],
  ["/gangnam/funeral", /업체가 확인되지 않았습니다/, 0],
  ["/gangnam/exhibition", /확인하지 못했습니다/, 0],
];
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
let failed = 0;
for (const width of [390, 1440]) {
  for (const [path, expected, ads] of CASES) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    let adReq = 0;
    await ctx.route(AD_HOST, (r) => { if (r.request().url().includes("adsbygoogle.js")) adReq++; return r.fulfill({ status: 200, body: "" }); });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const body = await page.locator("main").innerText();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const ok = expected.test(body) && !overflow && !/ETL/.test(body) && (ads === 1 ? adReq <= 1 : adReq === 0) && errors.length === 0;
    if (!ok) failed++;
    console.log(`${ok ? "PASS" : "FAIL"} ${width}px ${path} overflow=${overflow} adReq=${adReq} consoleErrors=${errors.length}`);
    await ctx.close();
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
