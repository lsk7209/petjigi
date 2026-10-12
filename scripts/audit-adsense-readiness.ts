/**
 * 애드센스 준비 상태 감사. 출력은 PASS / BLOCKED / UNKNOWN 만 사용한다(점수·승인 확률 없음).
 *   pnpm audit:adsense:readiness
 * 산출물: reports/adsense-readiness.json, reports/adsense-readiness.md
 * BLOCKED가 하나라도 있으면 종료 코드 1. UNKNOWN은 실패로 처리하지도 PASS로 바꾸지도 않는다.
 */
import fs from "node:fs";
import { type Check, runChecks } from "./readiness-checks";

function markdown(checks: Check[], counts: Record<string, number>): string {
  const rows = checks.map(
    (c) => `| ${c.status} | ${c.title} | ${c.detail.replaceAll("|", "\\|")} |`,
  );
  return [
    "# 애드센스 준비 상태 (코드 기준)",
    "",
    `PASS ${counts.PASS} · BLOCKED ${counts.BLOCKED} · UNKNOWN ${counts.UNKNOWN}`,
    "",
    "UNKNOWN은 코드로 확인할 수 없는 외부 상태이며 재심사 준비 완료를 뜻하지 않습니다.",
    "",
    "| 상태 | 항목 | 근거 |",
    "|---|---|---|",
    ...rows,
    "",
  ].join("\n");
}

function run() {
  const checks = runChecks();
  const counts = { PASS: 0, BLOCKED: 0, UNKNOWN: 0 };
  for (const c of checks) counts[c.status] += 1;
  fs.mkdirSync("reports", { recursive: true });
  fs.writeFileSync(
    "reports/adsense-readiness.json",
    JSON.stringify(
      { generatedAt: new Date().toISOString(), counts, checks },
      null,
      2,
    ),
  );
  fs.writeFileSync("reports/adsense-readiness.md", markdown(checks, counts));
  for (const c of checks.filter((x) => x.status === "BLOCKED"))
    console.error(`BLOCKED: ${c.title} — ${c.detail}`);
  console.log(JSON.stringify(counts));
  if (counts.BLOCKED > 0) process.exitCode = 1;
}

if (process.argv[1]?.endsWith("audit-adsense-readiness.ts")) run();
