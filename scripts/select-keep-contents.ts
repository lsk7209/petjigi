// 읽기 전용: 시드·감사 리포트만 읽어 애드센스 심사용으로 공개 유지할 콘텐츠 후보를 점수화한다. DB·네트워크 접근 없음.
//   실행: tsx scripts/select-keep-contents.ts   → docs/keep-30-selection.json 기록 + 요약 출력
import fs from "node:fs";
import path from "node:path";
import { readSeeds, type SeedRecord } from "./audit-adsense-seeds";
import { isRedirectedContent } from "../lib/content-redirects";

const ROOT = process.cwd();
const OUT_PATH = path.join(ROOT, "docs", "keep-30-selection.json");
const CLAIM_AUDIT_PATH = path.join(
  ROOT,
  "reports",
  "claim-evidence-audit.json",
);
const LINK_SCAN_DIRS = ["app", "components", "lib"];

const KEEP_COUNT = 30;
const MIN_BODY_CHARS = 1300; // 공백 제외
const MIN_YMYL_SOURCES = 2; // 비-YMYL은 출처가 없어도 후보(점수 가산만)
const MAX_RISKY_CLAIMS = 1; // YMYL은 0건만 허용
const CATEGORY_CAP = 8;
const YMYL_CAP = 8;
const BODY_SCORE_CAP = 6000;
const HARDCODED_LINK_BONUS = 30;
const SOURCE_WEIGHT = 3;
const RISKY_CLAIM_PENALTY = 10;

// 실용 도구(lib/practical-tools.ts)가 붙은 가이드: 점수와 무관하게 공개 유지
const FORCED_KEEP = new Set([
  "guide/dog-adoption-checklist",
  "guide/animal-hospital-guide",
  "blog/pet-insurance-comparison-method",
]);

const PUBLIC_TYPES = new Set(["guide", "blog", "condition"]);
const LINK_PATTERN =
  /["'`]\/(guide|blog|condition)\/([a-z0-9][a-z0-9-]*)["'`]/g;

interface Candidate {
  slug: string;
  type: string;
  category: number;
  ymyl: boolean;
  title: string;
  bodyChars: number;
  sources: number;
  riskyClaims: number;
  hardcodedLink: boolean;
  score: number;
}

const plainChars = (html: string) =>
  html.replace(/<[^>]+>/g, "").replace(/\s+/g, "").length;

function loadRiskyCounts(): Map<string, number> {
  const raw = JSON.parse(fs.readFileSync(CLAIM_AUDIT_PATH, "utf8")) as {
    rows: { slug: string; riskyCount: number; untracked?: string[] }[];
  };
  return new Map(raw.rows.map((r) => [r.slug, r.riskyCount]));
}

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\./.test(e.name))
      out.push(full);
  }
  return out;
}

/** 코드에 하드코딩된 콘텐츠 링크 (type/slug). content-redirects.ts 자체는 제외한다. */
export function hardcodedContentLinks(): Set<string> {
  const keys = new Set<string>();
  for (const dir of LINK_SCAN_DIRS) {
    for (const file of walk(path.join(ROOT, dir))) {
      if (file.endsWith("content-redirects.ts")) continue;
      const src = fs.readFileSync(file, "utf8");
      for (const m of src.matchAll(LINK_PATTERN)) keys.add(`${m[1]}/${m[2]}`);
    }
  }
  return keys;
}

function toCandidate(
  r: SeedRecord,
  risky: Map<string, number>,
  links: Set<string>,
): Candidate {
  const bodyChars = plainChars(r.body);
  const sources = r.sources ? r.sources.split(" | ").length : 0;
  const riskyClaims = risky.get(r.slug) ?? 0;
  const hardcodedLink = links.has(`${r.type}/${r.slug}`);
  const score =
    Math.min(bodyChars, BODY_SCORE_CAP) / 100 +
    sources * SOURCE_WEIGHT -
    riskyClaims * RISKY_CLAIM_PENALTY +
    (hardcodedLink ? HARDCODED_LINK_BONUS : 0);
  return {
    slug: r.slug,
    type: r.type,
    category: Number(r.category) || 0,
    ymyl: r.ymyl === "true",
    title: r.title,
    bodyChars,
    sources,
    riskyClaims,
    hardcodedLink,
    score: Math.round(score * 10) / 10,
  };
}

function isEligible(c: Candidate, r: SeedRecord): boolean {
  if (c.bodyChars < MIN_BODY_CHARS) return false;
  if (c.ymyl && c.sources < MIN_YMYL_SOURCES) return false;
  if (c.riskyClaims > (c.ymyl ? 0 : MAX_RISKY_CLAIMS)) return false;
  return !c.ymyl || r.disclaimer.length > 0;
}

function pick(cands: Candidate[]): Candidate[] {
  const perCategory = new Map<number, number>();
  const picked: Candidate[] = cands.filter((c) => FORCED_KEEP.has(`${c.type}/${c.slug}`));
  let ymyl = picked.filter((c) => c.ymyl).length;
  for (const c of picked) perCategory.set(c.category, (perCategory.get(c.category) ?? 0) + 1);
  for (const c of [...cands].sort((a, b) => b.score - a.score)) {
    if (picked.length >= KEEP_COUNT) break;
    if (picked.includes(c)) continue;
    if ((perCategory.get(c.category) ?? 0) >= CATEGORY_CAP) continue;
    if (c.ymyl && ymyl >= YMYL_CAP) continue;
    picked.push(c);
    perCategory.set(c.category, (perCategory.get(c.category) ?? 0) + 1);
    if (c.ymyl) ymyl++;
  }
  // 카테고리 상한 때문에 모자라면 점수 순으로 상한 없이 채운다(YMYL 상한은 유지).
  for (const c of [...cands].sort((a, b) => b.score - a.score)) {
    if (picked.length >= KEEP_COUNT) break;
    if (picked.includes(c) || (c.ymyl && ymyl >= YMYL_CAP)) continue;
    picked.push(c);
    if (c.ymyl) ymyl++;
  }
  return picked;
}

function main() {
  const seen = new Set<string>();
  const seeds = readSeeds().filter((r) =>
    seen.has(r.slug) ? false : (seen.add(r.slug), true),
  );
  const published = seeds.filter(
    (r) =>
      r.status === "published" &&
      PUBLIC_TYPES.has(r.type) &&
      !isRedirectedContent(r.type, r.slug),
  );
  const risky = loadRiskyCounts();
  const links = hardcodedContentLinks();
  const all = published.map((r) => ({ r, c: toCandidate(r, risky, links) }));
  const eligible = all
    .filter(({ r, c }) => FORCED_KEEP.has(`${c.type}/${c.slug}`) || isEligible(c, r))
    .map(({ c }) => c);
  const keep = pick(eligible);
  const keepKeys = new Set(keep.map((c) => `${c.type}/${c.slug}`));
  const brokenLinks = [...links].filter(
    (k) => !keepKeys.has(k) && seen.has(k.split("/")[1]),
  );

  const result = {
    generatedAt: new Date().toISOString(),
    totals: {
      published: published.length,
      eligible: eligible.length,
      keep: keep.length,
    },
    keep,
    hardcodedLinksOutsideKeep: brokenLinks,
  };
  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result.totals));
  for (const c of keep) {
    console.log(
      `${c.type.padEnd(9)} c${c.category}${c.ymyl ? " YMYL" : "     "} ${String(c.bodyChars).padStart(5)}자 src${c.sources} ${c.hardcodedLink ? "LINK" : "    "} ${c.slug} — ${c.title}`,
    );
  }
  console.log(`\n하드코딩 링크 중 keep 밖: ${brokenLinks.length}건`);
  for (const k of brokenLinks) console.log(`  /${k}`);
}

if (process.argv[1]?.endsWith("select-keep-contents.ts")) main();
