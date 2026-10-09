import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import test from "node:test";

const DIR = "docs/petjigi-improvement/2026-10-09-claude/";

function slugsOf(csv: string): Set<string> {
  return new Set(
    csv.split(/\r?\n/).slice(1).filter(Boolean).map((l) => l.split(",")[4]),
  );
}

// 2026-10-09 기준 알려진 중복 slug 32개. 새 중복이 늘어나면 실패한다(기존 건은 별도 정리).
test("seeds add no new duplicate slugs beyond the audited baseline", () => {
  const current = slugsOf(
    execFileSync("pnpm", ["exec", "tsx", "scripts/audit-slug-conflicts.ts"], {
      encoding: "utf8",
      shell: true,
    }),
  );
  const baseline = slugsOf(fs.readFileSync(`${DIR}slug-conflicts.csv`, "utf8"));
  const added = [...current].filter((s) => !baseline.has(s));
  assert.deepEqual(added, []);
});
