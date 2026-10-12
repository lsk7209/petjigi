import assert from "node:assert/strict";
import test from "node:test";
import {
  type ManifestClaim,
  evaluateClaimEvidence,
  extractRiskyClaims,
} from "./claim-evidence";

const NOW = new Date("2026-10-12T00:00:00Z");

const body = `<p>AVMA는 2019년 가이드라인에서 하루 30분 이상 운동을 권고한다고 설명한다.</p>
<p>산책은 즐거운 시간이다.</p>
<p>동물등록을 하지 않으면 과태료 60만 원이 부과될 수 있다.</p>`;

function claim(over: Partial<ManifestClaim>): ManifestClaim {
  return {
    claimId: "claim-001",
    snippet:
      "AVMA는 2019년 가이드라인에서 하루 30분 이상 운동을 권고한다고 설명한다.",
    sourceUrl: "https://www.avma.org/example",
    sourceType: "professional_guideline",
    status: "verified",
    checkedAt: "2026-10-01",
    notes: "원문 3쪽 표현 일치",
    ...over,
  };
}

test("기관+연도+수치, 수치+법·보험 주제 문장만 위험 주장으로 추출", () => {
  const risky = extractRiskyClaims(body);
  assert.equal(risky.length, 2);
  assert.ok(risky.some((s) => s.includes("AVMA")));
  assert.ok(risky.some((s) => s.includes("과태료")));
  assert.ok(!risky.some((s) => s.includes("즐거운")));
});

test("manifest에 없는 위험 주장은 untracked 이슈", () => {
  const result = evaluateClaimEvidence({
    bodyHtml: body,
    entry: undefined,
    now: NOW,
  });
  assert.equal(result.untracked.length, 2);
  assert.ok(result.issues.every((i) => i.code === "UNTRACKED_RISKY_CLAIM"));
});

test("needs_review도 추적된 상태이며 이슈가 아니다 (미확인은 별도 집계)", () => {
  const entry = {
    slug: "x",
    claims: [
      claim({
        status: "needs_review",
        sourceUrl: null,
        sourceType: "unknown",
        checkedAt: null,
        notes: "",
      }),
      claim({
        claimId: "claim-002",
        snippet: "동물등록을 하지 않으면 과태료 60만 원이 부과될 수 있다.",
        status: "needs_review",
        sourceUrl: null,
        sourceType: "unknown",
        checkedAt: null,
        notes: "",
      }),
    ],
  };
  const result = evaluateClaimEvidence({ bodyHtml: body, entry, now: NOW });
  assert.deepEqual(result.issues, []);
  assert.equal(result.byStatus.needs_review, 2);
});

test("verified는 공식/1차 근거 유형·https URL·확인일·메모가 있어야 한다", () => {
  const base = {
    slug: "x",
    claims: [
      claim({}),
      claim({
        claimId: "c2",
        snippet: "동물등록을 하지 않으면 과태료 60만 원이 부과될 수 있다.",
        status: "needs_review",
        sourceType: "unknown",
      }),
    ],
  };
  assert.deepEqual(
    evaluateClaimEvidence({ bodyHtml: body, entry: base, now: NOW }).issues,
    [],
  );
  for (const bad of [
    { sourceType: "secondary" as const },
    { sourceUrl: "http://insecure.example" },
    { sourceUrl: null },
    { checkedAt: "2027-01-01" },
    { notes: "" },
  ]) {
    const entry = { slug: "x", claims: [claim(bad), base.claims[1]] };
    const codes = evaluateClaimEvidence({
      bodyHtml: body,
      entry,
      now: NOW,
    }).issues.map((i) => i.code);
    assert.ok(codes.includes("INVALID_VERIFIED_EVIDENCE"), JSON.stringify(bad));
  }
});

test("본문에서 사라진 verified 주장은 stale, removed 주장이 남아 있으면 위반", () => {
  const stale = {
    slug: "x",
    claims: [claim({ snippet: "본문에 없는 문장입니다 99%" })],
  };
  assert.ok(
    evaluateClaimEvidence({
      bodyHtml: "<p>다른 내용</p>",
      entry: stale,
      now: NOW,
    }).issues.some((i) => i.code === "STALE_CLAIM_SNIPPET"),
  );
  const removedGone = {
    slug: "x",
    claims: [claim({ status: "removed", snippet: "삭제된 주장 50%" })],
  };
  assert.deepEqual(
    evaluateClaimEvidence({
      bodyHtml: "<p>다른 내용</p>",
      entry: removedGone,
      now: NOW,
    }).issues,
    [],
  );
  const removedPresent = {
    slug: "x",
    claims: [claim({ status: "removed", snippet: "산책은 즐거운 시간이다." })],
  };
  assert.ok(
    evaluateClaimEvidence({
      bodyHtml: body,
      entry: removedPresent,
      now: NOW,
    }).issues.some((i) => i.code === "REMOVED_CLAIM_STILL_PRESENT"),
  );
});
