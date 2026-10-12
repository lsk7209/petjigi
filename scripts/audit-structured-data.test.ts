import assert from "node:assert/strict";
import test from "node:test";
import { auditPage, extractJsonLd } from "./audit-structured-data";

const ld = (o: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const NOW = new Date("2026-10-12T00:00:00Z");

test("정상 Article은 이슈 없음, JSON-LD 파싱 성공", () => {
  const html = ld({
    "@type": "Article",
    url: "https://petjigi.kr/blog/a",
    datePublished: "2026-09-01",
    dateModified: "2026-10-01",
    author: { "@type": "Organization", name: "펫지기" },
  });
  assert.equal(extractJsonLd(html).length, 1);
  assert.deepEqual(
    auditPage({
      url: "u",
      canonical: "https://petjigi.kr/blog/a",
      noindex: false,
      html,
      now: NOW,
    }),
    [],
  );
});

test("canonical 불일치·null·미래 날짜·자기 권위·조직 Person·noindex 탐지", () => {
  const html = ld({
    "@type": "Article",
    url: "https://petjigi.kr/other",
    dateModified: "2027-01-01",
    telephone: null,
    recognizingAuthority: {},
    author: { "@type": "Person", name: "펫지기 에디터팀" },
  });
  const rules = auditPage({
    url: "u",
    canonical: "https://petjigi.kr/blog/a",
    noindex: true,
    html,
    now: NOW,
  }).map((i) => i.rule);
  for (const r of [
    "url-canonical",
    "null-value",
    "future-date",
    "self-authority",
    "author-type",
    "noindex-jsonld",
  ]) {
    assert.ok(rules.includes(r), r);
  }
});

test("깨진 JSON-LD는 parse 이슈", () => {
  const html = '<script type="application/ld+json">{bad</script>';
  const issues = auditPage({ url: "u", canonical: null, noindex: false, html });
  assert.equal(issues[0].rule, "parse");
});
