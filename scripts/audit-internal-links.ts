/**
 * 내부 링크 무결성 감사 (읽기 전용). 시드 본문과 코드 href를 canonical inventory와 대조한다.
 *   pnpm audit:internal-links
 * 산출물: reports/internal-link-audit.{json,csv}, reports/internal-link-remediation.json
 * broken 또는 redirect-source 링크가 있으면 종료 코드 1.
 * 운영 DB 본문은 읽지 않는다 — 운영 적용 필요 여부는 remediation의 productionApplyRequired로만 표시한다.
 */
import fs from "node:fs";
import path from "node:path";
import {
  type LinkVerdict,
  extractAnchorHrefs,
  normalizeHref,
  resolveInternalPath,
} from "../lib/seo/internal-link-resolver";
import {
  buildInventory,
  collectCodeLinks,
  isSeedPublic,
  readSeedContents,
} from "./internal-link-inventory";

const SITE_URL = "https://petjigi.kr";

export interface Finding {
  source: string;
  sourceKind: "seed" | "code";
  public: boolean;
  target: string;
  /** scheduled: 시드에는 있으나 아직 비공개인 문서로 가는 비공개 문서의 링크 (발행 순서 확인용, 실패 아님) */
  status: "broken" | "redirect" | "scheduled";
  occurrences: number;
  suggestedTarget: string | null;
  confidence: "high" | "none";
}

function toFinding(
  source: string,
  sourceKind: Finding["sourceKind"],
  isPublic: boolean,
  verdict: LinkVerdict,
  scheduledPaths: ReadonlySet<string> = new Set(),
): Omit<Finding, "occurrences"> | null {
  if (verdict.status === "ok") return null;
  if (verdict.status === "broken" && !isPublic && scheduledPaths.has(verdict.path)) {
    return { source, sourceKind, public: isPublic, target: verdict.path, status: "scheduled", suggestedTarget: null, confidence: "none" };
  }
  const suggested =
    verdict.status === "redirect"
      ? verdict.target
      : (verdict.suggestion?.target ?? null);
  return {
    source,
    sourceKind,
    public: isPublic,
    target: verdict.path,
    status: verdict.status,
    suggestedTarget: suggested,
    confidence: suggested ? "high" : "none",
  };
}

export function collectFindings(now: Date = new Date()): { findings: Finding[]; seeds: number; inventory: number } {
  const seeds = readSeedContents();
  const inventory = buildInventory(seeds, now);
  const scheduledPaths = new Set(seeds.filter((c) => !isSeedPublic(c, now)).map((c) => `/${c.type}/${c.slug}`));
  const counts = new Map<string, Finding>();
  const record = (f: Omit<Finding, "occurrences"> | null) => {
    if (!f) return;
    const key = `${f.source}|${f.target}`;
    const existing = counts.get(key);
    if (existing) existing.occurrences += 1;
    else counts.set(key, { ...f, occurrences: 1 });
  };

  for (const seed of seeds) {
    const source = `${seed.type}/${seed.slug} (${seed.file})`;
    for (const href of extractAnchorHrefs(seed.body)) {
      const n = normalizeHref(href, SITE_URL);
      if (n.kind === "internal")
        record(
          toFinding(
            source,
            "seed",
            isSeedPublic(seed, now),
            resolveInternalPath(n.path, inventory),
            scheduledPaths,
          ),
        );
    }
  }
  for (const link of collectCodeLinks()) {
    const n = normalizeHref(link.href, SITE_URL);
    if (n.kind === "internal")
      record(
        toFinding(
          link.file,
          "code",
          true,
          resolveInternalPath(n.path, inventory),
        ),
      );
  }

  const findings = [...counts.values()].sort((a, b) =>
    a.target.localeCompare(b.target),
  );
  return { findings, seeds: seeds.length, inventory: inventory.paths.size };
}

function run() {
  const { findings, seeds, inventory } = collectFindings();
  writeReports(findings, { seeds, inventory });
  const failing = findings.filter((f) => f.status !== "scheduled");
  console.log(`seeds=${seeds} inventory=${inventory} failing=${failing.length} scheduled=${findings.length - failing.length}`);
  if (failing.length > 0) process.exitCode = 1;
}

function writeReports(
  findings: Finding[],
  meta: { seeds: number; inventory: number },
) {
  const dir = path.join(process.cwd(), "reports");
  fs.mkdirSync(dir, { recursive: true });
  const generatedAt = new Date().toISOString();
  fs.writeFileSync(
    path.join(dir, "internal-link-audit.json"),
    JSON.stringify({ generatedAt, ...meta, findings }, null, 2),
  );
  const header =
    "source,sourceKind,public,target,status,occurrences,suggestedTarget,confidence";
  const rows = findings.map((f) =>
    [
      f.source,
      f.sourceKind,
      f.public,
      f.target,
      f.status,
      f.occurrences,
      f.suggestedTarget ?? "",
      f.confidence,
    ]
      .map((v) => `"${String(v).replaceAll('"', '""')}"`)
      .join(","),
  );
  fs.writeFileSync(
    path.join(dir, "internal-link-audit.csv"),
    [header, ...rows].join("\n") + "\n",
  );
  const remediation = findings.map((f) => ({
    source: f.source,
    target: f.target,
    action: f.suggestedTarget
      ? "replace"
      : f.sourceKind === "seed"
        ? "remove-link-or-use-category-hub"
        : "fix-code",
    replacement: f.suggestedTarget,
    autoApplicable: f.confidence === "high",
    productionApplyRequired:
      f.sourceKind === "seed" && f.public
        ? "dry-run manifest 필요 (apply-content-update.ts, 운영 DB 쓰기는 별도 승인)"
        : false,
  }));
  fs.writeFileSync(
    path.join(dir, "internal-link-remediation.json"),
    JSON.stringify({ generatedAt, remediation }, null, 2),
  );
}

if (process.argv[1]?.endsWith("audit-internal-links.ts")) run();
