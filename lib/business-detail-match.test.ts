import { test } from "node:test";
import assert from "node:assert/strict";
import { pickUniqueBusinessMatch, type BusinessCandidate } from "./business-detail-match";

const VET_A_SEOUL: BusinessCandidate = { id: "biz-1", type: "vet", name: "행복동물병원", addressSigungu: "노원구", status: "active" };
const VET_A_BUSAN: BusinessCandidate = { id: "biz-2", type: "vet", name: "행복동물병원", addressSigungu: "해운대구", status: "active" };

test("unique (type,name) within the requested sigungu resolves to that one business", () => {
  const result = pickUniqueBusinessMatch([VET_A_SEOUL, VET_A_BUSAN], { sigungu: "노원구" });
  assert.equal(result.kind, "resolved");
  if (result.kind === "resolved") assert.equal(result.business.id, "biz-1");
});

test("same name in a different sido must not leak into another region's detail page", () => {
  const result = pickUniqueBusinessMatch([VET_A_BUSAN], { sigungu: "노원구" });
  assert.equal(result.kind, "missing");
});

test("two same-name businesses in the same sigungu are ambiguous, not an arbitrary first row", () => {
  const dup: BusinessCandidate = { id: "biz-4", type: "vet", name: "행복동물병원", addressSigungu: "노원구", status: "active" };
  const result = pickUniqueBusinessMatch([VET_A_SEOUL, dup], { sigungu: "노원구" });
  assert.equal(result.kind, "ambiguous");
});

test("closed businesses are not treated as a valid match", () => {
  const closed: BusinessCandidate = { id: "biz-5", type: "vet", name: "폐업동물병원", addressSigungu: "노원구", status: "closed" };
  const result = pickUniqueBusinessMatch([closed], { sigungu: "노원구" });
  assert.equal(result.kind, "missing");
});

test("this helper only narrows by region/status; name+type filtering is the caller's SQL WHERE", () => {
  // 이미 type+name으로 필터된 후보만 전달받는 것이 계약이다. 여기서는 시군구가 다른
  // 후보가 있어도 그 후보가 요청 시군구와 다르면 무시됨을 확인한다.
  const otherRegionSameName: BusinessCandidate = { id: "biz-6", type: "vet", name: "행복동물병원", addressSigungu: "강남구", status: "active" };
  const result = pickUniqueBusinessMatch([VET_A_SEOUL, otherRegionSameName], { sigungu: "노원구" });
  assert.equal(result.kind, "resolved");
  if (result.kind === "resolved") assert.equal(result.business.id, "biz-1");
});
