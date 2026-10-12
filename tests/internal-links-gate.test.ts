import assert from "node:assert/strict";
import test from "node:test";
import { collectFindings } from "../scripts/audit-internal-links";

test("로컬 시드·코드 기준 내부 링크 404·리디렉션 원본 재유입이 0건", () => {
  const { findings } = collectFindings();
  const failing = findings.filter((f) => f.status !== "scheduled");
  assert.deepEqual(
    failing.map((f) => `${f.source} -> ${f.target} (${f.status})`),
    [],
  );
});

test("비공개 문서끼리의 예약 링크만 scheduled로 분리된다", () => {
  const { findings } = collectFindings();
  for (const f of findings.filter((x) => x.status === "scheduled")) {
    assert.equal(f.public, false, `${f.source}`);
    assert.equal(f.sourceKind, "seed");
  }
});
