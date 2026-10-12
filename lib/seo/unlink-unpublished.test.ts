import assert from "node:assert/strict";
import { test } from "node:test";
import { unlinkUnpublishedContentLinks } from "./unlink-unpublished";

const PUBLIC = new Set(["blog/a", "guide/b"]);

test("공개 문서 링크는 유지하고 비공개 문서 링크는 텍스트만 남긴다", () => {
  const html = '<p><a href="/blog/a">A</a> <a class="x" href="/blog/gone">없는 글</a> <a href="/guide/b/">B</a></p>';
  assert.equal(
    unlinkUnpublishedContentLinks(html, PUBLIC),
    '<p><a href="/blog/a">A</a> 없는 글 <a href="/guide/b/">B</a></p>',
  );
});

test("외부 링크·콘텐츠 외 경로·앵커는 건드리지 않는다", () => {
  const html = '<a href="https://example.com/blog/gone">x</a><a href="/category/health">y</a><a href="#top">z</a>';
  assert.equal(unlinkUnpublishedContentLinks(html, PUBLIC), html);
});

test("절대 URL 링크도 판정하고, 공개 문서로 리디렉션되는 원본은 유지한다", () => {
  const html = '<a href="https://petjigi.kr/blog/gone">g</a><a href="/blog/pet-photo-tips-guide">r</a>';
  assert.equal(
    unlinkUnpublishedContentLinks(html, new Set(["blog/pet-photo-tips"])),
    'g<a href="/blog/pet-photo-tips-guide">r</a>',
  );
});
