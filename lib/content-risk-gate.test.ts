import assert from "node:assert/strict";
import test from "node:test";
import {
  countStoredSources,
  evaluatePublicationCandidate,
  evaluateChangedHighRiskContent,
  includeEntireFiles,
  parseAddedLineRanges,
  rangesOverlap,
  type ContentRiskGateRecord,
} from "./content-risk-gate";

const validHighRisk: ContentRiskGateRecord = {
  slug: "new-health-guide",
  category: 3,
  ymyl: true,
  status: "published",
  sourceCount: 1,
  disclaimer: "정보 제공 목적이며 진료를 대체하지 않습니다.",
  metaTitle: "건강 가이드",
  metaDescription: "건강 정보를 안내합니다.",
  body: "본문",
};

test("changed high-risk publication requires sources and a disclaimer", () => {
  assert.deepEqual(
    evaluateChangedHighRiskContent({ ...validHighRisk, sourceCount: 0, disclaimer: null }),
    ["MISSING_SOURCES", "MISSING_DISCLAIMER"]
  );
});

test("untracked seed files are treated as entirely changed", () => {
  const ranges = includeEntireFiles(new Map(), ["db\\seeds\\new-content.ts"]);
  assert.equal(rangesOverlap(1, 500, ranges.get("db/seeds/new-content.ts") ?? []), true);
});

test("changed high-risk publication rejects unsupported review-completion copy", () => {
  assert.deepEqual(
    evaluateChangedHighRiskContent({
      ...validHighRisk,
      metaDescription: "수의사 검토를 거친 건강 정보입니다.",
    }),
    ["UNVERIFIED_REVIEW_CLAIM"]
  );
});

test("draft and ordinary-risk records are not publication blockers", () => {
  assert.deepEqual(evaluateChangedHighRiskContent({ ...validHighRisk, status: "draft" }), []);
  assert.deepEqual(
    evaluateChangedHighRiskContent({ ...validHighRisk, category: 1, ymyl: false }),
    []
  );
});

test("git diff hunks map only added or modified current-file lines", () => {
  const ranges = parseAddedLineRanges([
    "+++ b/db/seeds/contents.ts",
    "@@ -10,2 +10,4 @@",
    "@@ -30 +32,0 @@",
    "+++ b/db/seeds/new.ts",
    "@@ -0,0 +1,20 @@",
  ].join("\n"));

  assert.deepEqual(ranges.get("db/seeds/contents.ts"), [{ start: 10, end: 13 }]);
  assert.deepEqual(ranges.get("db/seeds/new.ts"), [{ start: 1, end: 20 }]);
  assert.equal(rangesOverlap(8, 11, ranges.get("db/seeds/contents.ts") ?? []), true);
  assert.equal(rangesOverlap(14, 20, ranges.get("db/seeds/contents.ts") ?? []), false);
});

test("runtime publication gate accepts both array and serialized source storage", () => {
  assert.equal(countStoredSources(["https://example.com/source"]), 1);
  assert.equal(countStoredSources(JSON.stringify(["https://example.com/source"])), 1);
  assert.equal(countStoredSources("not-json"), 0);

  const candidate = {
    ...validHighRisk,
    sources: [] as string[],
  };
  const { status: _status, sourceCount: _sourceCount, ...publicationCandidate } = candidate;
  void _status;
  void _sourceCount;
  assert.deepEqual(evaluatePublicationCandidate(publicationCandidate), ["MISSING_SOURCES"]);
  assert.deepEqual(
    evaluatePublicationCandidate({
      ...publicationCandidate,
      sources: JSON.stringify(["https://example.com/source"]),
    }),
    []
  );
});
