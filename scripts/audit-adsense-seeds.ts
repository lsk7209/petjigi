// 읽기 전용 감사: db/seeds를 AST로만 읽어 URL 목록·검증 후보·유사 콘텐츠 후보를 reports/에 쓴다. 네트워크·DB 접근 없음.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const SEED_DIR = path.join(ROOT, "db", "seeds");
const OUT_DIR = path.join(ROOT, "reports");
const SIMILARITY_THRESHOLD = 0.3;
const SHINGLE = 4;
const TITLE_THRESHOLD = 0.6;
const STAT_PATTERN =
  /[^.<>。]{0,40}(?:따르면|조사|통계|보고서|자료)[^.<>。]{0,60}\d[\d,.]*\s?(?:%|배|만 ?건|만 ?명|kg|cm|년)/g;
const CAT_HINT = /고양이|묘|캣|메인쿤|페르시안/;

export interface SeedRecord {
  file: string;
  id: string;
  slug: string;
  type: string;
  status: string;
  title: string;
  publishedAt: string;
  body: string;
  sources: string;
}

function text(e: ts.Expression | undefined): string {
  if (!e) return "";
  if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e))
    return e.text;
  if (ts.isArrayLiteralExpression(e))
    return e.elements.map((x) => text(x as ts.Expression)).join(" | ");
  if (ts.isCallExpression(e))
    return e.arguments.map((a) => text(a)).join(" | ");
  return "";
}

export function readSeeds(dir = SEED_DIR): SeedRecord[] {
  const out: SeedRecord[] = [];
  for (const f of fs
    .readdirSync(dir)
    .filter((x) => x.endsWith(".ts"))
    .sort()) {
    const src = ts.createSourceFile(
      f,
      fs.readFileSync(path.join(dir, f), "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    const visit = (n: ts.Node) => {
      if (ts.isObjectLiteralExpression(n)) {
        const m = new Map<string, ts.Expression>();
        for (const p of n.properties)
          if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name))
            m.set(p.name.text, p.initializer);
        if (m.has("slug") && m.has("id") && m.has("body")) {
          out.push({
            file: f,
            id: text(m.get("id")),
            slug: text(m.get("slug")),
            type: text(m.get("type")),
            status: text(m.get("status")),
            title: text(m.get("title")),
            publishedAt: text(m.get("publishedAt")),
            body: text(m.get("body")),
            sources: text(m.get("sources")),
          });
        }
      }
      ts.forEachChild(n, visit);
    };
    visit(src);
  }
  return out;
}

const plain = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const urlOf = (r: SeedRecord) =>
  `/${r.type === "blog" ? "blog" : r.type === "condition" ? "condition" : "guide"}/${r.slug}`;
const csv = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

function shingles(s: string, n = SHINGLE): Set<string> {
  const set = new Set<string>();
  for (let i = 0; i + n <= s.length; i++) set.add(s.slice(i, i + n));
  return set;
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter === 0 ? 0 : inter / (a.size + b.size - inter);
}

function main() {
  const seen = new Set<string>();
  const records = readSeeds().filter((r) =>
    seen.has(r.slug) ? false : (seen.add(r.slug), true),
  );
  records.sort((a, b) => urlOf(a).localeCompare(urlOf(b)));
  const rows = [
    "url,type,status,published_at,title,source_count,stat_candidates,cat_akc_flag,seed_file",
  ];
  for (const r of records) {
    const body = plain(r.body);
    const stats = (body.match(STAT_PATTERN) ?? []).length;
    const catAkc =
      CAT_HINT.test(r.title + r.slug) && /AKC/.test(r.body) ? "YES" : "";
    rows.push(
      [
        urlOf(r),
        r.type,
        r.status,
        r.publishedAt.slice(0, 10),
        csv(r.title),
        r.sources ? r.sources.split(" | ").length : 0,
        stats,
        catAkc,
        r.file,
      ].join(","),
    );
  }
  const claims = ["url,snippet,status"];
  for (const r of records) {
    for (const m of plain(r.body).matchAll(STAT_PATTERN)) {
      claims.push(
        [
          urlOf(r),
          csv(m[0].trim()),
          "원문 또는 정확한 문헌 미확인(자동 추출 후보, 사람 검증 대기)",
        ].join(","),
      );
    }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(OUT_DIR, "content-claims-candidates.csv"),
    claims.join("\n") + "\n",
  );
  const blogs = records.filter((r) => r.type === "blog");
  const sh = blogs.map((r) => shingles(plain(r.body).slice(0, 2500)));
  const dup = ["url_a,url_b,similarity,title_a,title_b"];
  for (let i = 0; i < blogs.length; i++) {
    for (let j = i + 1; j < blogs.length; j++) {
      const sim = jaccard(sh[i], sh[j]);
      if (sim >= SIMILARITY_THRESHOLD)
        dup.push(
          [
            urlOf(blogs[i]),
            urlOf(blogs[j]),
            sim.toFixed(2),
            csv(blogs[i].title),
            csv(blogs[j].title),
          ].join(","),
        );
    }
  }
  const bigram = (t: string) => shingles(t.replace(/\s/g, ""), 2);
  const tg = blogs.map((r) => bigram(r.title));
  for (let i = 0; i < blogs.length; i++) {
    for (let j = i + 1; j < blogs.length; j++) {
      const sim = jaccard(tg[i], tg[j]);
      if (sim >= TITLE_THRESHOLD)
        dup.push(
          [
            urlOf(blogs[i]),
            urlOf(blogs[j]),
            `title:${sim.toFixed(2)}`,
            csv(blogs[i].title),
            csv(blogs[j].title),
          ].join(","),
        );
    }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(OUT_DIR, "adsense-url-audit.csv"),
    rows.join("\n") + "\n",
  );
  fs.writeFileSync(
    path.join(OUT_DIR, "duplicate-candidates.csv"),
    dup.join("\n") + "\n",
  );
  console.log(
    `seed 문서 ${records.length}건, 통계 후보 포함 ${rows.filter((x) => !x.includes(",0,")).length - 1}, 유사 후보 ${dup.length - 1}쌍`,
  );
}

if (process.argv[1]?.endsWith("audit-adsense-seeds.ts")) main();
