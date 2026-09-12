import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getReviewEvidence, hasValidReviewDate } from "../lib/ymyl";
import { articleSchema } from "../lib/seo/structured-data";

const validReview = {
  reviewerName: "홍길동 수의사",
  reviewedAt: "2026-09-08T00:00:00.000Z",
};

test("review evidence requires a non-placeholder reviewer and valid review date", () => {
  for (const fields of [
    {},
    { reviewerName: "홍길동 수의사" },
    { reviewedAt: validReview.reviewedAt },
    { reviewerName: "   ", reviewedAt: validReview.reviewedAt },
    { reviewerName: "  검수\t대기  ", reviewedAt: validReview.reviewedAt },
    { reviewerName: "검수대기", reviewedAt: validReview.reviewedAt },
    { reviewerName: "검토 대기", reviewedAt: validReview.reviewedAt },
    { reviewerName: "PENDING", reviewedAt: validReview.reviewedAt },
    { reviewerName: "rejected", reviewedAt: validReview.reviewedAt },
    { reviewerName: validReview.reviewerName, reviewedAt: "2026-02-30" },
  ]) {
    assert.equal(getReviewEvidence(fields), null);
  }

  assert.deepEqual(getReviewEvidence(validReview), validReview);
  assert.equal(hasValidReviewDate("2026-02-30"), false);
  assert.equal(hasValidReviewDate(validReview.reviewedAt), true);
  assert.equal(hasValidReviewDate("2026-09-08T01:00:00+09:00"), true);
});

test("structured data only emits reviewedBy for complete review evidence", () => {
  const incomplete = articleSchema({
    title: "테스트",
    url: "https://petjigi.kr/guide/test",
    publishedAt: "2026-09-01T00:00:00.000Z",
    reviewerName: "검수 대기",
    reviewedAt: "2026-09-02T00:00:00.000Z",
  });
  assert.equal("reviewedBy" in incomplete, false);
  assert.equal(incomplete.dateModified, "2026-09-02T00:00:00.000Z");

  const complete = articleSchema({
    title: "테스트",
    url: "https://petjigi.kr/guide/test",
    publishedAt: "2026-09-01T00:00:00.000Z",
    ...validReview,
  });
  assert.deepEqual(complete.reviewedBy, { "@type": "Person", name: validReview.reviewerName });
  const offsetDate = "2026-09-08T01:00:00+09:00";
  const offsetReview = articleSchema({
    title: "Offset timestamp fixture",
    url: "https://petjigi.kr/guide/test-offset",
    reviewerName: validReview.reviewerName,
    reviewedAt: offsetDate,
  });
  assert.equal(offsetReview.dateModified, offsetDate);
  assert.deepEqual(offsetReview.reviewedBy, { "@type": "Person", name: validReview.reviewerName });
});

test("guide and blog share the neutral YMYL label and evidence-gated review row", () => {
  for (const path of ["app/guide/[slug]/page.tsx", "app/blog/[slug]/page.tsx"]) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /getReviewEvidence/);
    assert.match(source, /주의가 필요한 정보/);
    assert.match(source, /reviewEvidence &&/);
  }
});
