/**
 * F01/F17 — 26건 콘텐츠 운영 반영 준비: SELECT-only 비교.
 *
 * 이 스크립트는 운영 DB에 절대 쓰지 않는다. `db.select(...)`만 사용하며, INSERT/UPDATE/DELETE
 * 구문은 이 파일에 존재하지 않는다. 목적은 다음 두 값을 비교해 실제로 반영이 필요한 필드만
 * 식별하는 것이다:
 *   - "코드 값": db/seeds/*.ts에서 TypeScript AST로 파싱한 현재 로컬 값 (scripts/audit-quality.ts의
 *     inventory() 로더를 재사용)
 *   - "운영 값": TURSO_DATABASE_URL/TURSO_AUTH_TOKEN 환경변수로 연결한 실제 운영 DB의 현재 행
 *
 * hash 계산은 scripts/audit-quality.ts의 contentVersion()과 동일한 방식(title+body+sources+
 * updatedAt의 JSON을 sha256)을 사용해 두 스크립트의 판정이 어긋나지 않게 한다.
 *
 * 실행: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npx tsx scripts/compare-content-promotion.ts
 * 출력: docs/petjigi-improvement/content-promotion-manifest.json (승인 검토용, 아직 미반영 상태)
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { createClient } from "@libsql/client";
import ts from "typescript";
import { sourceValues } from "../lib/content-seed-parser";

const ROOT = process.cwd();
const SEED_DIR = path.join(ROOT, "db", "seeds");
const OUT_PATH = path.join(ROOT, "docs", "petjigi-improvement", "content-promotion-manifest.json");

// docs/petjigi-improvement/2026-09-30-f01-content-promotion-manifest.md 2절에서 식별한 26건.
// 이 목록은 여기서만 손으로 유지하며, seed 파일을 다시 스캔해 임의로 추가/삭제하지 않는다.
//
// EXCLUDED_SLUGS: "dog-patellar-luxation"은 db/seeds/contents.ts(guide, published)와
// db/seeds/conditions-batch-2.ts(condition, review_queue) 양쪽에 같은 slug로 서로 다른
// content_id가 정의된 기존 slug 충돌이다(conditions-batch-2.ts 주석에도 "슬러그 충돌"로
//명시됨). 운영 DB에는 review_queue 쪽 행(condition-dog-patellar-luxation)이 이미 존재하며,
// 이 slug를 guide 코드 값으로 UPDATE하면 미검수 의료 초안을 공개 콘텐츠로 뒤바꾸는 것과
// 같은 효과를 낼 수 있다. F01의 26건 반영과 무관한 별도 버그이므로 이번 승인 대상에서
// 제외하고, 별도 조사·결정이 필요한 항목으로 남긴다.
const TARGET_SLUGS = [
  "dog-disc-disease",
  "cat-grooming-basics-guide",
  "pet-food-rotation-guide",
  "puppy-first-week-guide",
  "pet-first-aid-guide",
  "pet-registration-guide",
  "pet-emergency-vet-preparation",
  "pet-emergency-kit-guide",
  "pet-toxic-plants-dog-guide",
  "pet-toxic-plants-cat-guide",
  "dog-flea-tick-guide",
  "cat-flea-tick-prevention",
  "dog-heartworm-treatment-guide",
  "dog-dental-scaling-guide",
  "cat-anal-gland-guide",
  "dog-anal-gland-express-guide",
  "cat-summer-safety-guide",
  "dog-eye-care-guide",
  "dog-summer-paw-protection",
  "dog-skin-care-guide",
  "pet-vet-visit-guide",
  "online-vet-consultation-guide",
  "pet-allergy-season-guide",
  "pet-human-allergy-guide",
] as const;

// 별도 slug 충돌 조사가 끝나기 전까지 승인 대상에 포함하지 않는다.
const EXCLUDED_SLUGS: Record<string, string> = {
  "dog-patellar-luxation":
    "slug is shared by two different content_ids (guide seed-guide-dog-patellar-luxation " +
    "published vs. condition condition-dog-patellar-luxation review_queue); production holds " +
    "the review_queue row, so promoting the guide's code value would effectively publish an " +
    "unreviewed medical draft under this slug. Needs separate investigation, not part of the 26.",
  "dog-paw-care-guide":
    "slug is defined twice in code with completely different content (blog-161 in " +
    "blog-posts-17.ts, category 3 vs. blog-324 in blog-posts-40.ts, category 5, different " +
    "title/body). Production currently holds blog-324's content under this slug. The original " +
    "26-record list (docs/HANDOFF.md) intended blog-161, but promoting blog-161's code value " +
    "would silently replace a different, currently-live article (blog-324) rather than correct " +
    "it. Needs a human decision on which article should own this slug before any write.",
};

interface CodeRecord {
  file: string;
  id: string | null;
  slug: string;
  type: string | null;
  title: string | null;
  status: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  sources: string[];
  body: string | null;
}

// scripts/audit-quality.ts의 walk/propertyMap/stringValue와 동일한 최소 파서. 그 파일을
// import하면 CLI 진입부(process.argv 기반 실행)까지 함께 로드될 위험이 있어, 순수 파싱
// 로직만 이 스크립트에 맞게 다시 작성했다(로직은 동일, 방식만 재사용).
function loadCodeRecords(): CodeRecord[] {
  function walk(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const target = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(target);
      return entry.isFile() && entry.name.endsWith(".ts") ? [target] : [];
    });
  }

  function propertyMap(node: import("typescript").ObjectLiteralExpression) {
    const result = new Map<string, import("typescript").Expression>();
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : null;
      if (name) result.set(name, prop.initializer);
    }
    return result;
  }

  function stringValue(expression: import("typescript").Expression | undefined): string | null {
    if (!expression) return null;
    if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
    return null;
  }

  const wanted = new Set<string>(TARGET_SLUGS);
  const found = new Map<string, CodeRecord>();

  for (const file of walk(SEED_DIR)) {
    const sourceText = fs.readFileSync(file, "utf8");
    const source = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);
    const visit = (node: import("typescript").Node) => {
      if (ts.isObjectLiteralExpression(node)) {
        const props = propertyMap(node);
        const slug = stringValue(props.get("slug"));
        const title = stringValue(props.get("title"));
        if (slug && title && props.has("body") && wanted.has(slug)) {
          found.set(slug, {
            file: path.relative(ROOT, file).replaceAll("\\", "/"),
            id: stringValue(props.get("id")),
            slug,
            type: stringValue(props.get("type")),
            title,
            status: stringValue(props.get("status")),
            publishedAt: stringValue(props.get("publishedAt")),
            updatedAt: stringValue(props.get("updatedAt")),
            sources: sourceValues(props.get("sources")),
            body: stringValue(props.get("body")),
          });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return TARGET_SLUGS.map((slug) => found.get(slug)).filter((r): r is CodeRecord => Boolean(r));
}

function contentVersion(input: { title: string | null; body: string | null; sources: unknown; updatedAt: string | null }): string {
  return `sha256:${createHash("sha256").update(JSON.stringify({
    title: input.title,
    body: input.body,
    sources: input.sources,
    updatedAt: input.updatedAt,
  })).digest("hex")}`;
}

async function main() {
  const dbUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!dbUrl) {
    console.error("TURSO_DATABASE_URL is required. This script performs SELECT-only reads; it never writes.");
    process.exit(1);
  }

  const codeRecords = loadCodeRecords();
  const missingInCode = TARGET_SLUGS.filter((slug) => !codeRecords.some((r) => r.slug === slug));
  if (missingInCode.length > 0) {
    console.error("Slugs listed in TARGET_SLUGS but not found in db/seeds/*.ts:", missingInCode);
  }

  const client = createClient({ url: dbUrl, authToken });

  const manifest: Array<{
    slug: string;
    content_id_code: string | null;
    type: string | null;
    status_code: string | null;
    production_row_found: boolean;
    production_id: string | null;
    production_status: string | null;
    code_hash: string | null;
    production_hash: string | null;
    hashes_match: boolean | null;
    changed_fields: string[];
    seed_file: string;
  }> = [];

  for (const record of codeRecords) {
    // SELECT-only. slug는 schema상 unique이므로 최대 1행.
    const result = await client.execute({
      sql: "SELECT id, type, title, body, sources, status, updated_at FROM contents WHERE slug = ? LIMIT 1",
      args: [record.slug],
    });

    const row = result.rows[0] as unknown as
      | { id: string; type: string; title: string; body: string; sources: string | null; status: string; updated_at: string }
      | undefined;

    const codeHash = contentVersion({ title: record.title, body: record.body, sources: record.sources, updatedAt: record.updatedAt });

    if (!row) {
      manifest.push({
        slug: record.slug,
        content_id_code: record.id,
        type: record.type,
        status_code: record.status,
        production_row_found: false,
        production_id: null,
        production_status: null,
        code_hash: codeHash,
        production_hash: null,
        hashes_match: null,
        changed_fields: ["PRODUCTION_ROW_MISSING"],
        seed_file: record.file,
      });
      continue;
    }

    let prodSources: string[] = [];
    try {
      prodSources = row.sources ? JSON.parse(row.sources) : [];
    } catch {
      prodSources = [];
    }

    const prodHash = contentVersion({ title: row.title, body: row.body, sources: prodSources, updatedAt: row.updated_at });

    const changedFields: string[] = [];
    if (row.title !== record.title) changedFields.push("title");
    if (row.body !== record.body) changedFields.push("body");
    if (JSON.stringify(prodSources) !== JSON.stringify(record.sources)) changedFields.push("sources");

    manifest.push({
      slug: record.slug,
      content_id_code: record.id,
      type: record.type,
      status_code: record.status,
      production_row_found: true,
      production_id: row.id,
      production_status: row.status,
      code_hash: codeHash,
      production_hash: prodHash,
      hashes_match: codeHash === prodHash,
      changed_fields: changedFields,
      seed_file: record.file,
    });
  }

  client.close();

  fs.writeFileSync(OUT_PATH, JSON.stringify({
    generatedAt: new Date().toISOString(),
    note: "SELECT-only comparison. No production write was performed by this script.",
    totalTargeted: TARGET_SLUGS.length,
    totalFoundInCode: codeRecords.length,
    missingInCode,
    excludedSlugs: EXCLUDED_SLUGS,
    records: manifest,
  }, null, 2) + "\n");

  const needsUpdate = manifest.filter((m) => m.production_row_found && !m.hashes_match);
  const missingRows = manifest.filter((m) => !m.production_row_found);

  console.log(`Compared ${manifest.length} records.`);
  console.log(`  Already matching (no change needed): ${manifest.length - needsUpdate.length - missingRows.length}`);
  console.log(`  Differ from production (candidates for update): ${needsUpdate.length}`);
  console.log(`  Missing in production entirely: ${missingRows.length}`);
  console.log(`Manifest written to ${path.relative(ROOT, OUT_PATH)}`);
  if (needsUpdate.length > 0) {
    console.log("\nSlugs needing update:", needsUpdate.map((m) => m.slug).join(", "));
  }
  if (missingRows.length > 0) {
    console.log("Slugs missing in production:", missingRows.map((m) => m.slug).join(", "));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
