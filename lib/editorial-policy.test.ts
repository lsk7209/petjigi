import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { AD_INDEPENDENCE_TEXT, AD_PERSONALIZATION_TEXT, AI_USAGE_TEXT, EDITORIAL_TEAM_PRINCIPLES } from "./editorial-policy";

const read = (p: string) => fs.readFileSync(p, "utf8");

test("소개 페이지는 광고 게재 정책과 충돌하는 '광고가 아닌 정보' 문구를 쓰지 않는다", () => {
  const about = read("app/about/page.tsx");
  assert.equal(about.includes("광고가 아닌"), false);
  assert.ok(about.includes("AD_INDEPENDENCE_TEXT"));
  assert.match(AD_INDEPENDENCE_TEXT, /광고와 편집 콘텐츠를 명확히 분리/);
});

test("about·advertising·privacy가 공통 상수를 같이 사용한다", () => {
  assert.ok(read("app/advertising/page.tsx").includes("AD_PERSONALIZATION_TEXT"));
  assert.ok(read("app/privacy/page.tsx").includes("AD_PERSONALIZATION_TEXT"));
  assert.ok(read("app/about/page.tsx").includes("AI_USAGE_TEXT"));
  assert.ok(read("app/about/page.tsx").includes("AFFILIATE_STATUS_TEXT"));
  assert.match(AD_PERSONALIZATION_TEXT, /denied/);
});

test("광고 정책 페이지는 동의 상태와 무관한 개인화를 단정하지 않는다", () => {
  assert.equal(/개인화될 수 있습니다/.test(read("app/advertising/page.tsx")), false);
});

test("편집 책임 섹션은 필수 항목을 모두 포함하고 자격을 지어내지 않는다", () => {
  const titles = EDITORIAL_TEAM_PRINCIPLES.map((p) => p.title);
  for (const t of ["역할", "자료 선정 기준", "사람이 확인하는 항목", "전문가 검토 표시 원칙", "수정 기록", "오류 신고"]) {
    assert.ok(titles.includes(t), t);
  }
  assert.match(AI_USAGE_TEXT, /사람이 .*확인/);
  assert.match(read("app/about/page.tsx"), /id="editorial-team"/);
  for (const p of EDITORIAL_TEAM_PRINCIPLES) assert.equal(/전문의|박사|수의사 \d+년/.test(p.body), false);
});

test("블로그·가이드·질환 글의 조직 저자는 편집 책임 섹션으로 연결된다", () => {
  for (const p of ["app/blog/[slug]/page.tsx", "app/guide/[slug]/page.tsx", "app/condition/[slug]/page.tsx"]) {
    const src = read(p);
    assert.ok(src.includes("EDITORIAL_TEAM_PATH"), p);
    assert.ok(src.includes("isOrganizationAuthor"), p);
  }
});
