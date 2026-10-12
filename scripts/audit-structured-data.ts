/**
 * 구조화 데이터 정합성 감사 (읽기 전용).
 *   pnpm audit:structured-data -- --base=https://petjigi.kr /blog/slug /guide/slug ...
 * 각 URL의 JSON-LD를 파싱해 canonical 일치, null 값, 날짜, 자기 권위 주장, noindex 페이지 JSON-LD를 검사한다.
 * 광고 클릭·양식 제출 없이 GET만 사용한다.
 */
export interface JsonLdIssue {
  url: string;
  rule: string;
  detail: string;
}

const FORBIDDEN_TYPES = ["Patient", "MedicalWebPage", "MedicalAudience"];
const SITE_LEVEL_TYPES = ["WebSite", "Organization"];
const ORGANIZATION_NAME_PATTERN = /팀|편집|에디터|펫지기/;

export function extractJsonLd(html: string): unknown[] {
  const out: unknown[] = [];
  for (const m of html.matchAll(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    out.push(JSON.parse(m[1]));
  }
  return out;
}

function walk(node: unknown, visit: (key: string, value: unknown) => void) {
  if (Array.isArray(node)) {
    node.forEach((n) => walk(n, visit));
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      visit(k, v);
      walk(v, visit);
    }
  }
}

function auditBlock(
  b: Record<string, unknown>,
  ctx: { canonical: string | null; now: number },
  add: (rule: string, detail: string) => void,
) {
  const type = String(b["@type"]);
  if (
    typeof b.url === "string" &&
    ctx.canonical &&
    !SITE_LEVEL_TYPES.includes(type) &&
    b.url !== ctx.canonical
  ) {
    add("url-canonical", `${type} url=${b.url} canonical=${ctx.canonical}`);
  }
  walk(b, (key, value) => {
    if (value === null || value === undefined) add("null-value", key);
    if (
      key === "@type" &&
      typeof value === "string" &&
      FORBIDDEN_TYPES.includes(value)
    )
      add("forbidden-type", value);
    if (key === "recognizingAuthority" || key === "legalStatus")
      add("self-authority", key);
    if (
      (key === "datePublished" || key === "dateModified") &&
      typeof value === "string" &&
      Date.parse(value) > ctx.now
    ) {
      add("future-date", `${key}=${value}`);
    }
    if (
      key === "sameAs" &&
      Array.isArray(value) &&
      value.some((u) => String(u).startsWith("https://petjigi.kr"))
    ) {
      add("self-sameas", "자기 URL sameAs");
    }
  });
  if (
    b.datePublished &&
    b.dateModified &&
    Date.parse(String(b.dateModified)) < Date.parse(String(b.datePublished))
  ) {
    add("date-order", "dateModified < datePublished");
  }
  const author = b.author as { "@type"?: string; name?: string } | undefined;
  if (
    author?.["@type"] === "Person" &&
    ORGANIZATION_NAME_PATTERN.test(author.name ?? "")
  ) {
    add("author-type", `조직명 ${author.name}을 Person으로 표시`);
  }
  if (
    type === "ItemList" &&
    Array.isArray(b.itemListElement) &&
    b.itemListElement.length === 0
  ) {
    add("empty-itemlist", "항목 0개");
  }
}

export function auditPage(input: {
  url: string;
  canonical: string | null;
  noindex: boolean;
  html: string;
  now?: Date;
}): JsonLdIssue[] {
  const issues: JsonLdIssue[] = [];
  const add = (rule: string, detail: string) =>
    issues.push({ url: input.url, rule, detail });
  let blocks: unknown[];
  try {
    blocks = extractJsonLd(input.html);
  } catch (e) {
    return [{ url: input.url, rule: "parse", detail: String(e) }];
  }
  // 사이트 공통(WebSite·Organization) 스키마는 layout에서 항상 출력되므로 페이지용 JSON-LD로 세지 않는다
  const pageBlocks = blocks.filter(
    (b) =>
      !SITE_LEVEL_TYPES.includes(String((b as { "@type"?: string })["@type"])),
  );
  if (input.noindex && pageBlocks.length > 0)
    add("noindex-jsonld", `noindex 페이지에 JSON-LD ${pageBlocks.length}개`);
  const ctx = {
    canonical: input.canonical,
    now: (input.now ?? new Date()).getTime(),
  };
  for (const block of blocks)
    auditBlock(block as Record<string, unknown>, ctx, add);
  return issues;
}

async function main() {
  const args = process.argv.slice(2);
  const base = (
    args.find((a) => a.startsWith("--base="))?.slice(7) ?? "https://petjigi.kr"
  ).replace(/\/$/, "");
  const paths = args.filter((a) => a.startsWith("/"));
  const all: JsonLdIssue[] = [];
  for (const path of paths) {
    const res = await fetch(base + path, { redirect: "manual" });
    const html = await res.text();
    const canonical =
      html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
    const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
    all.push(...auditPage({ url: base + path, canonical, noindex, html }));
  }
  console.log(JSON.stringify({ checked: paths.length, issues: all }, null, 2));
  if (all.length > 0) process.exitCode = 1;
}

if (process.argv[1]?.endsWith("audit-structured-data.ts")) void main();
