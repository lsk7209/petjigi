import { test } from "node:test";
import assert from "node:assert/strict";
import { buildContentHref, buildBusinessHref } from "./search-contract";

test("guide content builds /guide/<slug>", () => {
  assert.equal(buildContentHref("guide", "dog-food-guide"), "/guide/dog-food-guide");
});

test("blog content builds /blog/<slug>", () => {
  assert.equal(buildContentHref("blog", "pet-death-legal-guide"), "/blog/pet-death-legal-guide");
});

test("condition content builds /condition/<slug>", () => {
  assert.equal(buildContentHref("condition", "cat-diabetes"), "/condition/cat-diabetes");
});

test("unknown content type returns null instead of defaulting to guide", () => {
  assert.equal(buildContentHref("business_overlay", "some-slug"), null);
  assert.equal(buildContentHref("breed", "some-slug"), null);
});

test("missing slug returns null", () => {
  assert.equal(buildContentHref("guide", null), null);
  assert.equal(buildContentHref("guide", ""), null);
});

test("slug segment is encoded exactly once, even with special characters", () => {
  const href = buildContentHref("guide", "고양이/당뇨 100%");
  assert.equal(href, `/guide/${encodeURIComponent("고양이/당뇨 100%")}`);
  // 다시 디코딩했을 때 원래 slug와 같아야 함 (이중 인코딩 방지 확인)
  const [, , slugPart] = href!.split("/");
  assert.equal(decodeURIComponent(slugPart), "고양이/당뇨 100%");
});

test("business href requires bizType, region slug, and name to be resolved", () => {
  const href = buildBusinessHref({ bizType: "vet", sigunguSlug: "nowon", name: "행복동물병원" });
  assert.equal(href, `/vet/nowon/${encodeURIComponent("행복동물병원")}`);
});

test("business href returns null when region is unresolved instead of a dead link", () => {
  const href = buildBusinessHref({ bizType: "vet", sigunguSlug: undefined, name: "행복동물병원" });
  assert.equal(href, null);
});

test("business href returns null when bizType or name missing", () => {
  assert.equal(buildBusinessHref({ bizType: undefined, sigunguSlug: "nowon", name: "행복동물병원" }), null);
  assert.equal(buildBusinessHref({ bizType: "vet", sigunguSlug: "nowon", name: "" }), null);
});

test("동명 시군구(서울/부산 강서구)가 같은 slug를 쓰면 그 slug로 연결된다 — 상세가 저장된 시군구명으로 확정하므로 404가 아님", async () => {
  const { buildUniqueRegionSlugMap } = await import("./search-contract");
  const map = buildUniqueRegionSlugMap([
    { sigungu: "강서구", sigunguSlug: "gangseo" },
    { sigungu: "강서구", sigunguSlug: "gangseo" },
    { sigungu: "강남구", sigunguSlug: "gangnam" },
  ]);
  assert.equal(map.get("강서구"), "gangseo");
  assert.equal(map.get("강남구"), "gangnam");
});

test("같은 시군구명에 서로 다른 slug가 섞여 있으면 임의 선택하지 않고 제외한다", async () => {
  const { buildUniqueRegionSlugMap } = await import("./search-contract");
  const map = buildUniqueRegionSlugMap([
    { sigungu: "중구", sigunguSlug: "jung" },
    { sigungu: "중구", sigunguSlug: "jung-gu" },
    { sigungu: "강남구", sigunguSlug: "gangnam" },
  ]);
  assert.equal(map.has("중구"), false);
  assert.equal(map.get("강남구"), "gangnam");
});
