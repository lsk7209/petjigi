import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { INSURANCE_PRODUCT_EVIDENCE } from "./insurance-products";

test("보험 근거 목록은 순위·가격·지급 보장을 저장하지 않는다", () => {
  const serialized = JSON.stringify(INSURANCE_PRODUCT_EVIDENCE);
  for (const prohibited of ["1위", "최저", "업계 최고", "보험금 지급 보장"])
    assert.equal(serialized.includes(prohibited), false, `금지 표현 발견: ${prohibited}`);
});

test("확인된 보험 상품에는 공식 HTTPS 근거가 있다", () => {
  for (const item of INSURANCE_PRODUCT_EVIDENCE) {
    if (item.status === "confirmed") {
      assert.ok(item.officialUrl?.startsWith("https://"), `${item.insurer} 공식 URL 누락`);
      assert.ok(item.product, `${item.insurer} 상품명 누락`);
    }
  }
});

test("보험 페이지와 OG 이미지는 근거 없는 전문가 검토·순위 표현을 노출하지 않는다", () => {
  const files = [
    "app/insurance/page.tsx",
    "app/insurance/opengraph-image.tsx",
    "app/insurance/compare/page.tsx",
    "app/insurance/compare/opengraph-image.tsx",
    "app/insurance/[insurer]/page.tsx",
    "app/insurance/[insurer]/opengraph-image.tsx",
  ];
  const source = files.map((file) => fs.readFileSync(path.join(process.cwd(), file), "utf8")).join("\n");
  assert.equal(source.includes("전문가 검토"), false);
  assert.equal(source.includes("점유율 1위"), false);
  assert.equal(source.includes("업계 최고"), false);
});
