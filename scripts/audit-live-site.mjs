// 공개 사이트 읽기 전용 감사: sitemap 인덱스 → 하위 sitemap → 각 URL의 HTTP 상태·canonical·robots·title·description.
// 사용: node scripts/audit-live-site.mjs [--base=https://petjigi.kr] [--limit=200] [--out=reports/live-site-audit.json]
// --base=http://localhost:3000 으로 로컬 production 빌드(next start)도 같은 기준으로 검사할 수 있다.
// GET 요청만 사용하며 광고 클릭·양식 제출은 하지 않는다. 동시성 5 이하, 실패 시 최대 2회 재시도.
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));
const BASE = (args.base ?? 'https://petjigi.kr').replace(/\/$/, '');
const LIMIT = Number(args.limit ?? 200);
const OUT = args.out ?? 'reports/live-site-audit.json';
const CONCURRENCY = Math.min(Number(args.concurrency ?? 3), 5);
const MAX_RETRIES = 2;
const BRAND_REPEATED = /펫지기\s*[|·\-–—:]\s*펫지기/; // 예: '강남구 동물병원 | 펫지기 | 펫지기'
const UA = 'Mozilla/5.0 (compatible; PetjigiAudit/1.0; read-only)';

async function get(url) {
  let last;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) });
      return { status: res.status, headers: res.headers, text: await res.text() };
    } catch (error) {
      last = error;
      await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  return { status: 0, headers: new Headers(), text: '', error: String(last) };
}

const locs = xml => [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(m => m[1]);

async function sitemapUrls() {
  const index = await get(`${BASE}/sitemap.xml`);
  if (index.status !== 200) throw new Error(`sitemap.xml HTTP ${index.status}`);
  const children = /<sitemapindex/.test(index.text) ? locs(index.text) : [`${BASE}/sitemap.xml`];
  const found = [];
  for (const child of children) {
    const res = await get(child);
    if (res.status !== 200) found.push({ sitemap: child, error: `HTTP ${res.status}` });
    else found.push(...locs(res.text).map(url => ({ sitemap: child, url })));
  }
  return found;
}

function inspect(html, headers) {
  const attr = re => html.match(re)?.[1]?.trim() ?? null;
  const robotsMeta = attr(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i);
  return {
    canonical: attr(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i),
    robots: [robotsMeta, headers.get('x-robots-tag')].filter(Boolean).join(' | ') || null,
    title: attr(/<title[^>]*>([^<]*)<\/title>/i),
    description: attr(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i),
    h1Count: (html.match(/<h1[\s>]/gi) ?? []).length,
  };
}

function issuesFor(url, status, info, location) {
  const issues = [];
  if (status !== 200) issues.push(status >= 300 && status < 400 ? `redirect ${status} -> ${location}` : `HTTP ${status}`);
  if (status === 200) {
    if (info.robots && /noindex/i.test(info.robots)) issues.push('sitemap+noindex');
    if (!info.canonical) issues.push('canonical 없음');
    else if (new URL(info.canonical, BASE).href.replace(/\/$/, '') !== url.replace(/\/$/, '')) issues.push(`canonical 불일치: ${info.canonical}`);
    if (!info.title) issues.push('title 없음');
    if (!info.description) issues.push('description 없음');
    if (info.h1Count !== 1) issues.push(`h1 ${info.h1Count}개`);
    if (info.title && BRAND_REPEATED.test(info.title)) issues.push(`title 브랜드 중복: ${info.title}`);
  }
  return issues;
}

async function pool(items, worker) {
  const results = [];
  let next = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i]);
    }
  }));
  return results;
}

const entries = await sitemapUrls();
const sitemapErrors = entries.filter(e => e.error);
const urls = [...new Set(entries.filter(e => e.url).map(e => e.url))].slice(0, LIMIT);
const pages = await pool(urls, async url => {
  const res = await get(url);
  const info = inspect(res.text, res.headers);
  return { url, status: res.status, ...info, issues: issuesFor(url, res.status, info, res.headers.get('location')) };
});

const failing = pages.filter(p => p.issues.length > 0);

// 같은 title·description을 쓰는 서로 다른 URL(중복 메타데이터) 묶음. 정보 제공용이며 종료 코드에는 반영하지 않는다.
function duplicateGroups(field) {
  const groups = new Map();
  for (const p of pages) {
    if (p.status !== 200 || !p[field]) continue;
    groups.set(p[field], [...(groups.get(p[field]) ?? []), p.url]);
  }
  return [...groups].filter(([, list]) => list.length > 1).map(([value, list]) => ({ value, count: list.length, urls: list.slice(0, 5) }));
}
const duplicateTitles = duplicateGroups('title');
const duplicateDescriptions = duplicateGroups('description');
const report = { generatedAt: new Date().toISOString(), base: BASE, sitemapUrlCount: entries.filter(e => e.url).length, checked: pages.length, sitemapErrors, failing, duplicateTitles, duplicateDescriptions, pages };
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
console.log(`checked=${pages.length} failing=${failing.length} sitemapErrors=${sitemapErrors.length} duplicateTitles=${duplicateTitles.length} duplicateDescriptions=${duplicateDescriptions.length} -> ${OUT}`);
if (failing.length > 0 || sitemapErrors.length > 0) process.exitCode = 1;
