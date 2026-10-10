import assert from "node:assert/strict";
import test from "node:test";
import { escapeXml, sitemapLoc } from "./sitemap-xml";

test("XML 특수문자를 이스케이프한다", () => {
  assert.equal(escapeXml(`a&b<c>"d"'e'`), "a&amp;b&lt;c&gt;&quot;d&quot;&apos;e&apos;");
});

test("slug의 &, 공백, 한글은 URL 인코딩된 뒤 안전한 <loc>이 된다", () => {
  assert.equal(sitemapLoc("https://petjigi.kr", "blog", "a&b c"), "https://petjigi.kr/blog/a%26b%20c");
  assert.equal(sitemapLoc("https://petjigi.kr", "guide", "고양이"), "https://petjigi.kr/guide/%EA%B3%A0%EC%96%91%EC%9D%B4");
});

test("일반 ASCII slug는 그대로 유지된다", () => {
  assert.equal(sitemapLoc("https://petjigi.kr", "guide", "dog-nail-trimming-guide"), "https://petjigi.kr/guide/dog-nail-trimming-guide");
});
