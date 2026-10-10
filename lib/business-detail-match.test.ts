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

// ── R02: 지역 판별 결과(resolved/ambiguous/missing)를 상세 단계까지 유지 ──────────
import { matchBusinessInRegion } from "./business-detail-match";
import type { RegionSlugView } from "./region-identity";

const resolvedNowon: RegionSlugView = { kind: "resolved", sigunguName: "노원구", sidoName: "서울특별시", sidoSlug: "seoul", ambiguousSidoNames: [] };
const ambiguousGangseo: RegionSlugView = { kind: "ambiguous", sigunguName: "강서구", sidoName: "", sidoSlug: null, ambiguousSidoNames: ["서울특별시", "부산광역시"] };
const missingRegion: RegionSlugView = { kind: "missing", sigunguName: null, sidoName: "", sidoSlug: null, ambiguousSidoNames: [] };
const gangseo = (id: string, name: string): BusinessCandidate => ({ id, type: "vet", name, addressSigungu: "강서구", status: "active" });

test("R02 일반 단일 지역은 기존처럼 해당 시군구의 업체로 확정된다", () => {
  const result = matchBusinessInRegion(resolvedNowon, [VET_A_SEOUL, VET_A_BUSAN]);
  assert.equal(result.kind, "resolved");
});

test("R02 동명 지역(서울·부산 강서구)에서 이름이 하나뿐인 업체는 URL slug가 아니라 저장된 시군구명으로 확정된다", () => {
  const result = matchBusinessInRegion(ambiguousGangseo, [gangseo("s1", "서울강서병원")]);
  assert.equal(result.kind, "resolved");
  if (result.kind === "resolved") assert.equal(result.business.id, "s1");
});

test("R02 동명 지역에서 같은 이름의 업체가 둘 이상이면 임의의 첫 행이 아니라 ambiguous", () => {
  const result = matchBusinessInRegion(ambiguousGangseo, [gangseo("s1", "행복동물병원"), gangseo("b1", "행복동물병원")]);
  assert.equal(result.kind, "ambiguous");
  if (result.kind === "ambiguous") assert.deepEqual(result.candidates.map((c) => c.id), ["s1", "b1"]);
});

test("R02 같은 지역·같은 이름의 서로 다른 업체도 ambiguous", () => {
  const result = matchBusinessInRegion(resolvedNowon, [
    { ...VET_A_SEOUL, id: "x1" },
    { ...VET_A_SEOUL, id: "x2" },
  ]);
  assert.equal(result.kind, "ambiguous");
});

test("R02 미등록 지역은 후보가 있어도 missing(404 유지)", () => {
  assert.equal(matchBusinessInRegion(missingRegion, [VET_A_SEOUL]).kind, "missing");
});
