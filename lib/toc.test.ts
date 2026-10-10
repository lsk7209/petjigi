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

// ── R04: 빈 ID·HTML 특수문자 ID·따옴표 형태 ─────────────────────────────────────
// 브라우저는 첫 id 속성만 사용하고 속성값의 엔티티를 해석한다. 아래 헬퍼는 그 규칙을 따른다.
const decodeBasic = (v: string): string =>
  v.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
// 브라우저 규칙: 속성을 따옴표 단위로 토큰화하고 첫 id 속성만 사용한다.
const firstIdAttr = (tag: string): string | undefined => {
  const attrs = /^<h[23]([^>]*)>$/i.exec(tag)![1];
  for (const m of attrs.matchAll(/([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    if (m[1].toLowerCase() === "id") return decodeBasic(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return undefined;
};
const domIds = (html: string): (string | undefined)[] => [...html.matchAll(/<h[23][^>]*>/gi)].map((m) => firstIdAttr(m[0]));
const idAttrCount = (tag: string): number =>
  [...tag.slice(3, -1).matchAll(/([^\s"'<>\/=]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g)].filter((m) => m[1].toLowerCase() === "id").length;

test("R04 빈 id 속성은 중복 id 속성 없이 새 id로 교체되고 목차와 일치한다", () => {
  const { headings, html } = buildToc('<h2 id="">제목</h2>');
  const tag = /<h2[^>]*>/.exec(html)![0];
  assert.equal(idAttrCount(tag), 1);
  assert.notEqual(headings[0].id, "");
  assert.deepEqual(domIds(html), headings.map((h) => h.id));
});

test("R04 id의 HTML 엔티티(a&amp;b)는 DOM이 해석한 값(a&b)으로 목차에 저장된다", () => {
  const { headings, html } = buildToc('<h2 id="a&amp;b">제목</h2>');
  assert.equal(headings[0].id, "a&b");
  assert.deepEqual(domIds(html), ["a&b"]);
  assert.ok(html.includes('id="a&amp;b"'), "정상 id 속성 원문은 보존");
});

test("R04 숫자 엔티티·알려진 엔티티를 해석하고, 모르는 엔티티는 신뢰하지 않고 새 id를 만든다", () => {
  const known = buildToc('<h2 id="x&#45;y&lt;z">제목</h2>');
  assert.equal(known.headings[0].id, "x-y<z");
  const unknown = buildToc('<h2 id="a&copy;b">제목</h2>');
  assert.match(unknown.headings[0].id, /^h-0-/);
  assert.deepEqual(domIds(unknown.html), [unknown.headings[0].id]);
});

test("R04 작은따옴표·따옴표 없는 id도 인식하고 새 id를 추가로 붙이지 않는다", () => {
  for (const [src, expected] of [["<h2 id='single'>제목</h2>", "single"], ["<h2 id=bare>제목</h2>", "bare"]]) {
    const { headings, html } = buildToc(src);
    assert.equal(headings[0].id, expected);
    assert.equal(idAttrCount(/<h2[^>]*>/.exec(html)![0]), 1);
  }
});

test("R04 다른 속성 값 안의 id= 문자열을 id 속성으로 오인하지 않는다", () => {
  const { headings, html } = buildToc(`<h2 title="x id='fake'" data-id="d">제목</h2>`);
  assert.notEqual(headings[0].id, "fake");
  assert.deepEqual(domIds(html), [headings[0].id]);
  assert.ok(html.includes(`title="x id='fake'"`));
});

test("R04 공백이 든 id는 쓰지 않고 새 id로 교체한다", () => {
  const { headings, html } = buildToc('<h2 id="a b">제목</h2>');
  assert.match(headings[0].id, /^h-0-/);
  assert.deepEqual(domIds(html), [headings[0].id]);
});

test("R04 제목 텍스트의 HTML 엔티티는 사용자에게 보이는 문자로 풀어서 목차에 쓴다", () => {
  const { headings } = buildToc("<h2>A &amp; B &lt;팁&gt; &quot;따옴표&quot;</h2>");
  assert.equal(headings[0].text, 'A & B <팁> "따옴표"');
});

test("R04 엔티티 id가 중복되면 두 번째는 교체되어 DOM id가 유일하다", () => {
  const { headings, html } = buildToc('<h2 id="a&amp;b">하나</h2><h2 id="a&amp;b">둘</h2>');
  assert.equal(new Set(headings.map((h) => h.id)).size, 2);
  assert.deepEqual(domIds(html), headings.map((h) => h.id));
});
