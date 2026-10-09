import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

// 운영은 커밋된 public/sitemap-0.xml을 그대로 서빙하므로, next-sitemap.config.js의 exclude와 어긋나면 안 된다.
test("committed sitemap-0.xml omits every sido page that the sitemap config excludes", () => {
  const config = fs.readFileSync("next-sitemap.config.js", "utf8");
  const xml = fs.readFileSync("public/sitemap-0.xml", "utf8");
  const excludedSido = [...config.matchAll(/"\/sido\/([a-z]+)"/g)].map((m) => m[1]);
  assert.ok(excludedSido.length > 0);
  for (const slug of excludedSido) {
    assert.equal(xml.includes(`<loc>https://petjigi.kr/sido/${slug}</loc>`), false, slug);
  }
});
