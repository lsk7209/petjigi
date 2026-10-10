import assert from "node:assert/strict";
import test from "node:test";
import { buildToc } from "./toc";

const idsInHtml = (html: string): string[] =>
  [...html.matchAll(/<h[23][^>]*\sid="([^"]*)"/g)].map((m) => m[1]);

test("기존 id가 없으면 생성하고 목차와 DOM id가 일치한다", () => {
  const { headings, html } = buildToc(
    "<h2>시작하기</h2><p>x</p><h3>두 번째</h3>",
  );
  assert.deepEqual(
    headings.map((h) => h.id),
    idsInHtml(html),
  );
  assert.equal(headings.length, 2);
});

test("기존 id가 있으면 목차가 같은 id를 쓰고 속성을 보존한다", () => {
  const { headings, html } = buildToc('<h2 class="a" id="intro">소개</h2>');
  assert.equal(headings[0].id, "intro");
  assert.ok(html.includes('class="a" id="intro"'));
});

test("중복 제목은 서로 다른 id를 갖는다", () => {
  const { headings, html } = buildToc("<h2>같은 제목</h2><h2>같은 제목</h2>");
  assert.notEqual(headings[0].id, headings[1].id);
  assert.deepEqual(
    idsInHtml(html),
    headings.map((h) => h.id),
  );
});

test("중복된 기존 id는 두 번째가 교체되어 DOM에 중복 id가 남지 않는다", () => {
  const { headings, html } = buildToc('<h2 id="a">하나</h2><h2 id="a">둘</h2>');
  assert.equal(new Set(idsInHtml(html)).size, 2);
  assert.deepEqual(
    idsInHtml(html),
    headings.map((h) => h.id),
  );
});

test("빈 제목은 목차에서 빠지고 이후 제목의 id가 어긋나지 않는다", () => {
  const { headings, html } = buildToc(
    "<h2>  </h2><h2>다음</h2><h3><span></span></h3><h3>끝</h3>",
  );
  assert.deepEqual(
    headings.map((h) => h.text),
    ["다음", "끝"],
  );
  assert.deepEqual(
    idsInHtml(html),
    headings.map((h) => h.id),
  );
});

test("인라인 태그가 있는 제목은 텍스트만 목차에 쓴다", () => {
  const { headings } = buildToc("<h2><strong>굵은</strong> 제목</h2>");
  assert.equal(headings[0].text, "굵은 제목");
});

test("한글 제목과 모든 목차 링크 대상이 DOM에 존재한다", () => {
  const { headings, html } = buildToc(
    '<h2>고양이 사료 고르기</h2><h3 id="x">세부</h3><h2>마무리</h2>',
  );
  const ids = new Set(idsInHtml(html));
  for (const h of headings) assert.ok(ids.has(h.id), h.id);
});
