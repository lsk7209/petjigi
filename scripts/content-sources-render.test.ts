import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const PAGES = ["app/blog/[slug]/page.tsx", "app/guide/[slug]/page.tsx", "app/condition/[slug]/page.tsx"];

test("콘텐츠 상세 페이지는 출처를 정규화해서 렌더링한다(이중 인코딩 대응)", () => {
  for (const page of PAGES) {
    const src = fs.readFileSync(page, "utf8");
    assert.match(src, /parseStoredSources\(content\.sources\)/, page);
    assert.equal(/Array\.isArray\(content\.sources\)/.test(src), false, `${page}: 원본 배열 검사 금지`);
  }
});
