import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (p: string) => fs.readFileSync(p, "utf8");

test("펫보험 가이드는 출처 미확인 가입 건수·분쟁 비율 수치를 싣지 않는다", () => {
  const src = read("db/seeds/blog-posts-2.ts");
  const start = src.indexOf('slug: "pet-insurance-guide"');
  const body = src.slice(start, src.indexOf('slug: ', start + 20));
  for (const banned of ["85만 건", "32% 증가", "약 36%"]) {
    assert.ok(!body.includes(banned), `${banned} 재삽입 금지(원문 확인 전)`);
  }
});

test("반려동물 사진 가이드는 출처 미확인 Instagram 통계를 싣지 않는다", () => {
  assert.ok(!read("db/seeds/blog-posts-18.ts").includes("Instagram 2023 Pet Content Report"));
});

test("고양이 품종 글은 개 품종 단체(AKC)를 근거로 인용하지 않는다", () => {
  const src = read("db/seeds/blog-posts-19.ts");
  const cats = ["british-shorthair", "maine-coon-care-guide", "persian"];
  for (const key of cats) {
    const i = src.indexOf(`slug: "${key}`);
    if (i < 0) continue;
    const seg = src.slice(i, src.indexOf('slug: "', i + 20) > 0 ? src.indexOf('slug: "', i + 20) : undefined);
    assert.ok(!seg.includes("AKC"), `${key}: AKC 인용 금지`);
  }
});

test("강아지 당뇨 조건 글은 실재 확인 안 된 WSAVA 당뇨 지침을 인용하지 않는다", () => {
  assert.ok(!read("db/seeds/contents.ts").includes("WSAVA Diabetes Mellitus Management Guidelines"));
});

test("중복 통합 리디렉션이 next.config에 연결돼 있다", () => {
  assert.match(read("next.config.ts"), /CONTENT_REDIRECTS/);
  assert.match(read("next.config.ts"), /permanent:\s*true/);
});
