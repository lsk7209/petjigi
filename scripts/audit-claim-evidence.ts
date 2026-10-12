/**
 * 주장-출처 증거 감사 (읽기 전용 기본).
 *   pnpm audit:claims                         전체 고위험 시드 감사 → reports/claim-evidence-audit.json
 *   pnpm audit:claims -- --init=slug1,slug2   manifest에 없는 위험 주장을 needs_review로 등록 (verified 처리 아님)
 * 외부 API는 호출하지 않는다. verified는 사람이 원문과 대조한 뒤 manifest에 직접 기록한다.
 */
import fs from "node:fs";
import path from "node:path";
import {
  type ManifestClaim,
  type ManifestEntry,
  claimIdFor,
  evaluateClaimEvidence,
} from "../lib/claim-evidence";
import { readSeedContents, type SeedContent } from "./internal-link-inventory";

const MANIFEST_PATH = path.join(
  process.cwd(),
  "docs",
  "claim-verification",
  "manifest.json",
);

export interface ClaimManifest {
  version: 1;
  entries: ManifestEntry[];
}

export function loadManifest(file = MANIFEST_PATH): ClaimManifest {
  if (!fs.existsSync(file)) return { version: 1, entries: [] };
  return JSON.parse(fs.readFileSync(file, "utf8")) as ClaimManifest;
}

export function isHighRiskSeed(seed: SeedContent): boolean {
  return seed.ymyl || [3, 4, 6].includes(seed.category ?? -1);
}

function needsReviewClaim(index: number, snippet: string): ManifestClaim {
  return {
    claimId: claimIdFor(index),
    snippet,
    sourceUrl: null,
    sourceType: "unknown",
    status: "needs_review",
    checkedAt: null,
    notes: "원문 대조 전 — 자동 추출 후보",
  };
}

function initEntries(
  manifest: ClaimManifest,
  seeds: SeedContent[],
  slugs: string[],
): number {
  let added = 0;
  for (const slug of slugs) {
    const seed = seeds.find((s) => s.slug === slug);
    if (!seed) continue;
    let entry = manifest.entries.find((e) => e.slug === slug);
    if (!entry) manifest.entries.push((entry = { slug, claims: [] }));
    const { untracked } = evaluateClaimEvidence({ bodyHtml: seed.body, entry });
    for (const snippet of untracked) {
      entry.claims.push(needsReviewClaim(entry.claims.length + 1, snippet));
      added += 1;
    }
  }
  return added;
}

function run() {
  const seeds = readSeedContents();
  const manifest = loadManifest();
  const initArg = process.argv.find((a) => a.startsWith("--init="));
  if (initArg) {
    const added = initEntries(
      manifest,
      seeds,
      initArg.slice(7).split(",").filter(Boolean),
    );
    fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
    console.log(`needs_review 등록 ${added}건`);
    return;
  }

  const rows = seeds
    .filter((s) => s.status === "published" && isHighRiskSeed(s))
    .map((seed) => {
      const entry = manifest.entries.find((e) => e.slug === seed.slug);
      const result = evaluateClaimEvidence({ bodyHtml: seed.body, entry });
      return { slug: seed.slug, type: seed.type, file: seed.file, ...result };
    })
    .filter((r) => r.riskyCount > 0 || r.issues.length > 0);

  const summary = {
    highRiskWithRiskyClaims: rows.length,
    riskyClaims: rows.reduce((n, r) => n + r.riskyCount, 0),
    untracked: rows.reduce((n, r) => n + r.untracked.length, 0),
    verified: rows.reduce((n, r) => n + r.byStatus.verified, 0),
    qualified: rows.reduce((n, r) => n + r.byStatus.qualified, 0),
    needsReview: rows.reduce((n, r) => n + r.byStatus.needs_review, 0),
    manifestIssues: rows.reduce(
      (n, r) =>
        n + r.issues.filter((i) => i.code !== "UNTRACKED_RISKY_CLAIM").length,
      0,
    ),
  };
  fs.mkdirSync("reports", { recursive: true });
  fs.writeFileSync(
    "reports/claim-evidence-audit.json",
    JSON.stringify(
      { generatedAt: new Date().toISOString(), summary, rows },
      null,
      2,
    ),
  );
  console.log(JSON.stringify(summary));
}

if (process.argv[1]?.endsWith("audit-claim-evidence.ts")) run();
