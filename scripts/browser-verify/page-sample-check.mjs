// 로컬 격리 서버 전용: 대표 페이지 유형의 상태·canonical·H1·가로 넘침·표 넘침·모바일 메뉴·콘솔 오류 확인. 광고·분석은 mock.
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3101";
if (!/^http:\/\/localhost:\d+$/.test(BASE)) throw new Error("BASE_URL must be a localhost origin");
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const EXTERNAL = /googlesyndication\.com|doubleclick\.net|googletagmanager\.com|google-analytics\.com|clarity\.ms/;
const PAGES = [
  ["/", 200], ["/blog", 200], ["/blog/pet-insurance-guide", 200], ["/blog/pet-photo-tips", 200],
  ["/blog/cat-snack-selection-guide", 200], ["/blog/maine-coon-care-guide", 200], ["/condition/dog-diabetes", 200],
  ["/gangnam/vet", 200], ["/gangnam/funeral", 200], ["/about", 200], ["/privacy", 200], ["/advertising", 200],
  ["/insurance/compare", 200], ["/definitely-missing", 404],
];
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
let failed = 0;
for (const width of [390, 1440]) {
  for (const [path, status] of PAGES) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    await ctx.route(EXTERNAL, (r) => r.fulfill({ status: 200, body: "" }));
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 120)); });
    const resp = await page.goto(BASE + path, { waitUntil: "networkidle" });
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      h1: document.querySelectorAll("h1").length,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
      wideTables: [...document.querySelectorAll("table")].filter((t) => t.getBoundingClientRect().right > window.innerWidth + 1 && getComputedStyle(t.parentElement).overflowX === "visible").length,
    }));
    let menu = "n/a";
    if (width === 390 && path === "/") {
      const btn = page.getByRole("button", { name: "메뉴 열기" });
      if (await btn.count()) { await btn.click(); menu = (await page.getByRole("button", { name: "메뉴 닫기" }).count()) ? "ok" : "fail"; }
      else menu = "no-button";
    }
    const bad404 = status === 404 && info.canonical !== null;
    const ok = resp?.status() === status && !info.overflow && info.wideTables === 0 && (status === 404 || errors.length === 0) && menu !== "fail" && menu !== "no-button" && !bad404 && (status === 404 || info.h1 === 1);
    if (!ok) failed++;
    console.log(`${ok ? "PASS" : "FAIL"} ${width}px ${path} http=${resp?.status()} h1=${info.h1} canonical=${info.canonical} overflow=${info.overflow} wideTables=${info.wideTables} menu=${menu} errors=${errors.length}`);
    if (errors.length) console.log("   ", errors[0]);
    await ctx.close();
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
