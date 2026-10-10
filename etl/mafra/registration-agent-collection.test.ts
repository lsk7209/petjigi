import assert from "node:assert/strict";
import test from "node:test";
import {
  assessCollection,
  expectedRowsOnPage,
  fingerprintPage,
  parseRegistrationAgentPage,
  type PageSnapshot,
} from "./registration-agent-collection";

const page = (pageNo: number, rawCount: number, total: number, seed = String(pageNo)): PageSnapshot => ({
  pageNo, reportedTotal: total, rawCount, fingerprint: fingerprintPage([seed]),
});
const stats = (raw: number, unique = raw, skipped = 0) => ({ rawRows: raw, convertedRows: raw - skipped, skippedRows: skipped, uniqueIds: unique });

test("페이지별 기대 행 수: 마지막 페이지만 나머지", () => {
  assert.equal(expectedRowsOnPage(1, 2500, 1000), 1000);
  assert.equal(expectedRowsOnPage(3, 2500, 1000), 500);
  assert.equal(expectedRowsOnPage(1, 0, 1000), 0);
});

test("총계와 모든 페이지가 일치하면 완전 수집, 누락 기관 처리 허용", () => {
  const result = assessCollection(2500, 1000, [page(1, 1000, 2500), page(2, 1000, 2500), page(3, 500, 2500)], stats(2500));
  assert.deepEqual(result, { complete: true, reasons: [], mayMarkUnseen: true });
});

test("총계는 맞아도 페이지 하나가 비어 있으면 불완전", () => {
  const result = assessCollection(2000, 1000, [page(1, 1000, 2000), page(2, 0, 2000)], stats(1000));
  assert.equal(result.complete, false);
  assert.equal(result.mayMarkUnseen, false);
});

test("무효한 총계(NaN·음수·소수)는 불완전", () => {
  for (const total of [Number.NaN, -1, 1.5]) {
    assert.equal(assessCollection(total, 1000, [], stats(0)).complete, false);
  }
});

test("응답 구조 검증: 0건 응답은 통과, 총계 누락·오류 코드·구조 이상은 throw", () => {
  const ok = (body: unknown) => ({ response: { header: { resultCode: "00" }, body } });
  assert.deepEqual(parseRegistrationAgentPage(ok({ totalCount: 0, items: "" })), { total: 0, items: [] });
  assert.deepEqual(parseRegistrationAgentPage(ok({ totalCount: "2", items: { item: { orgNm: "a" } } })), { total: 2, items: [{ orgNm: "a" }] });
  assert.throws(() => parseRegistrationAgentPage(ok({ items: "" })), /총계/);
  assert.throws(() => parseRegistrationAgentPage(ok({ totalCount: "x" })), /총계/);
  assert.throws(() => parseRegistrationAgentPage({ response: { header: { resultCode: "30", resultMsg: "KEY" } } }), /KEY/);
  assert.throws(() => parseRegistrationAgentPage({}), /구조/);
  assert.throws(() => parseRegistrationAgentPage(ok({ totalCount: 1, items: 7 })), /items/);
});
