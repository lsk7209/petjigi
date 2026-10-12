/**
 * 내부 링크 감사용 canonical inventory와 링크 수집 (읽기 전용, DB 접근 없음).
 * 시드 AST + app 라우트 파일 + 코드 내 href 리터럴을 사용한다.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { CATEGORIES } from "../lib/category";
import { CONTENT_REDIRECTS } from "../lib/content-redirects";
import { isPubliclyVisibleContent } from "../lib/content-publication";
import { INSURANCE_PRODUCT_EVIDENCE } from "../lib/insurance-products";
import type { LinkInventory } from "../lib/seo/internal-link-resolver";

const ROOT = process.cwd();
const BUSINESS_TYPES = [
  "vet",
  "grooming",
  "boarding",
  "funeral",
  "sale",
  "registration",
  "breeder",
  "transport",
  "exhibition",
];

export interface SeedContent {
  file: string;
  id: string | null;
  slug: string;
  type: string;
  status: string;
  publishedAt: string | null;
  category: number | null;
  ymyl: boolean;
  body: string;
}

const literalText = (node: ts.Expression | undefined): string | null => {
  if (!node) return null;
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isTemplateExpression(node))
    return (
      node.head.text + node.templateSpans.map((s) => s.literal.text).join("")
    );
  return null;
};

const numberLiteral = (node: ts.Expression | undefined): number | null =>
  node && ts.isNumericLiteral(node) ? Number(node.text) : null;

/** 시드 파일에서 slug·type·body가 있는 객체 추출. publishedAt이 리터럴이 아니면 null(공개로 간주) */
export function readSeedContents(): SeedContent[] {
  const dir = path.join(ROOT, "db", "seeds");
  const out: SeedContent[] = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(path.join(dir, file), "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    const visit = (node: ts.Node) => {
      if (ts.isObjectLiteralExpression(node)) {
        const props = new Map(
          node.properties
            .filter(ts.isPropertyAssignment)
            .map((p) => [p.name.getText(source), p.initializer]),
        );
        const slug = literalText(props.get("slug"));
        const type = literalText(props.get("type"));
        const body = literalText(props.get("body"));
        if (slug && type && body !== null) {
          out.push({
            file: `db/seeds/${file}`,
            id: literalText(props.get("id")),
            slug,
            type,
            status: literalText(props.get("status")) ?? "published",
            publishedAt: literalText(props.get("publishedAt")),
            category: numberLiteral(props.get("category")),
            ymyl: props.get("ymyl")?.kind === ts.SyntaxKind.TrueKeyword,
            body,
          });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return out;
}

export function isSeedPublic(c: SeedContent, now: Date): boolean {
  // publishedAt이 코드로 계산되는 시드는 리터럴을 알 수 없으므로 과거 날짜로 간주(운영 날짜 게이트는 라이브 감사가 확인)
  return isPubliclyVisibleContent(
    {
      status: c.status,
      type: c.type,
      publishedAt: c.publishedAt ?? "2000-01-01",
      slug: c.slug,
    },
    now,
  );
}

function routeFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) routeFiles(full, acc);
    else if (entry.name === "page.tsx" || (entry.name === "route.ts" && /\.[a-z]+$/.test(path.basename(dir)))) acc.push(full);
  }
  return acc;
}

/** app/**\/page.tsx 중 동적 세그먼트가 없는 정적 라우트 */
function staticRoutes(): string[] {
  const appDir = path.join(ROOT, "app");
  return routeFiles(appDir)
    .map((f) =>
      path
        .relative(appDir, path.dirname(f))
        .split(path.sep)
        .filter((s) => !/^\(.*\)$/.test(s)),
    )
    .filter((segs) => !segs.some((s) => s.startsWith("[")))
    .map((segs) => "/" + segs.join("/"))
    .map((p) => (p === "/" ? p : p.replace(/\/$/, "")));
}

function regionSlugs(): { sigungu: string[]; sido: string[] } {
  const src = fs.readFileSync(
    path.join(ROOT, "db", "seeds", "regions.ts"),
    "utf8",
  );
  const uniq = (re: RegExp) => [
    ...new Set([...src.matchAll(re)].map((m) => m[1])),
  ];
  return {
    sigungu: uniq(/sigunguSlug:\s*"([^"]+)"/g),
    sido: uniq(/sidoSlug:\s*"([^"]+)"/g),
  };
}

function breedPaths(): string[] {
  const src = fs.readFileSync(
    path.join(ROOT, "db", "seeds", "breeds.ts"),
    "utf8",
  );
  return [...src.matchAll(/species:\s*"(\w+)",\s*slug:\s*"([^"]+)"/g)].flatMap(
    (m) => [`/breed/${m[1]}`, `/breed/${m[1]}/${m[2]}`],
  );
}

export function buildInventory(seeds: SeedContent[], now: Date): LinkInventory {
  const paths = new Set<string>(staticRoutes());
  for (const c of seeds)
    if (isSeedPublic(c, now)) paths.add(`/${c.type}/${c.slug}`);
  for (const cat of Object.values(CATEGORIES))
    paths.add(`/category/${cat.slug}`);
  for (const p of breedPaths()) paths.add(p);
  for (const i of INSURANCE_PRODUCT_EVIDENCE) paths.add(`/insurance/${i.slug}`);
  const regions = regionSlugs();
  for (const s of regions.sido) paths.add(`/sido/${s}`);
  for (const s of regions.sigungu) {
    paths.add(`/shelter/${s}`);
    for (const t of BUSINESS_TYPES) paths.add(`/${s}/${t}`);
  }
  const sigunguSet = new Set(regions.sigungu);
  const businessDetail = (p: string) => {
    const [type, sigungu, slug] = p.split("/").filter(Boolean);
    return Boolean(
      slug && BUSINESS_TYPES.includes(type) && sigunguSet.has(sigungu),
    );
  };
  return {
    paths,
    dynamicMatchers: [businessDetail],
    redirects: new Map(CONTENT_REDIRECTS.map((r) => [r.from, r.to])),
  };
}

/** 코드(app/components/lib)에 정의된 정적 href 리터럴 수집. 템플릿 변수가 있는 값은 건너뛴다. */
export function collectCodeLinks(): { file: string; href: string }[] {
  const out: { file: string; href: string }[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!["node_modules", ".next"].includes(entry.name)) walk(full);
      } else if (/\.tsx?$/.test(entry.name) && !/\.test\./.test(entry.name)) {
        const text = fs.readFileSync(full, "utf8");
        for (const m of text.matchAll(
          /\bhref(?:=|:\s*)["'](\/[^"'$`{}]*)["']/g,
        )) {
          out.push({
            file: path.relative(ROOT, full).split(path.sep).join("/"),
            href: m[1],
          });
        }
      }
    }
  };
  for (const dir of ["app", "components", "lib"]) walk(path.join(ROOT, dir));
  return out;
}
