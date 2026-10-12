import assert from "node:assert/strict";
import test from "node:test";
import {
  type LinkInventory,
  extractAnchorHrefs,
  normalizeHref,
  resolveHref,
} from "./internal-link-resolver";

const SITE = "https://petjigi.kr";
const BUSINESS_TYPES = new Set(["vet", "grooming"]);

const inventory: LinkInventory = {
  paths: new Set([
    "/",
    "/blog/real-post",
    "/guide/heat-guide",
    "/blog/한글-글",
    "/privacy",
  ]),
  dynamicMatchers: [
    (p) => {
      const [type, sigungu, slug] = p.split("/").filter(Boolean);
      return Boolean(type && sigungu && slug && BUSINESS_TYPES.has(type));
    },
  ],
  redirects: new Map([["/blog/old-post", "/blog/real-post"]]),
};

test("존재하지 않는 내부 URL은 broken", () => {
  const v = resolveHref("/blog/missing-post", SITE, inventory);
  assert.equal(v?.status, "broken");
});

test("리디렉션 원본 링크는 redirect로 분류되어 새 콘텐츠 재유입을 잡는다", () => {
  const v = resolveHref("/blog/old-post", SITE, inventory);
  assert.deepEqual(v, {
    status: "redirect",
    path: "/blog/old-post",
    target: "/blog/real-post",
  });
});

test("외부 URL·mailto·tel·앵커는 내부 오류로 분류하지 않음", () => {
  for (const href of [
    "https://example.com/blog/missing",
    "mailto:cs@petjigi.kr",
    "tel:02-123",
    "#section",
  ]) {
    assert.equal(resolveHref(href, SITE, inventory), null, href);
  }
});

test("query와 fragment는 정규화 후 판정", () => {
  assert.deepEqual(normalizeHref("/guide/heat-guide?utm=x#top", SITE), {
    kind: "internal",
    path: "/guide/heat-guide",
  });
  assert.equal(
    resolveHref("/guide/heat-guide/?a=1#b", SITE, inventory)?.status,
    "ok",
  );
  assert.equal(
    resolveHref("https://petjigi.kr/privacy#cookie", SITE, inventory)?.status,
    "ok",
  );
  assert.equal(
    resolveHref("https://www.petjigi.kr/privacy", SITE, inventory)?.status,
    "ok",
  );
});

test("한글·공백·percent encoding 경로", () => {
  assert.equal(
    resolveHref("/blog/%ED%95%9C%EA%B8%80-%EA%B8%80", SITE, inventory)?.status,
    "ok",
  );
  assert.equal(resolveHref("/blog/한글-글", SITE, inventory)?.status, "ok");
  assert.equal(
    resolveHref("/blog/%E0%A4%A", SITE, inventory)?.status,
    "broken",
  );
});

test("동적 업체 상세 URL은 오탐하지 않음", () => {
  assert.equal(
    resolveHref(
      "/vet/nowon/%ED%96%89%EB%B3%B5%EB%B3%91%EC%9B%90",
      SITE,
      inventory,
    )?.status,
    "ok",
  );
  assert.equal(
    resolveHref("/unknown/nowon/x", SITE, inventory)?.status,
    "broken",
  );
});

test("같은 slug가 다른 섹션에 정확히 하나만 있을 때만 high confidence 제안", () => {
  const v = resolveHref("/blog/heat-guide", SITE, inventory);
  assert.equal(v?.status, "broken");
  if (v?.status === "broken")
    assert.equal(v.suggestion?.target, "/guide/heat-guide");
  const none = resolveHref("/blog/nothing-similar", SITE, inventory);
  if (none?.status === "broken") assert.equal(none.suggestion, null);
});

test("본문 HTML에서 앵커 href 추출", () => {
  const html = `<p><a href="/blog/a">A</a> <a class="x" href='/guide/b?x=1'>B</a><a name="n">no</a></p>`;
  assert.deepEqual(extractAnchorHrefs(html), ["/blog/a", "/guide/b?x=1"]);
});
