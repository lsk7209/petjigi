import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { isThinShelterRegion } from "./shelter-index-policy";

test("센터 2곳 미만 지역은 얇은 페이지로 판정", () => {
  assert.equal(isThinShelterRegion(0), true);
  assert.equal(isThinShelterRegion(1), true);
  assert.equal(isThinShelterRegion(2), false);
});

test("지역 페이지가 정책을 사용하고 커밋 사이트맵에 센터 1곳 지역이 없다", () => {
  const page = fs.readFileSync("app/shelter/[sigungu]/page.tsx", "utf8");
  assert.match(page, /isThinShelterRegion\(shelterList\.length\)/);
  const xml = fs.readFileSync("public/sitemap-0.xml", "utf8");
  for (const slug of ["anseong", "guro", "hwaseong", "nowon", "pyeongtaek", "seocho", "seodaemun", "yeonje"]) {
    assert.equal(xml.includes(`/shelter/${slug}</loc>`), false, slug);
  }
});
