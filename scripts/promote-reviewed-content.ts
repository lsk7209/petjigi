/**
 * F01/F17 — 25건 콘텐츠 운영 반영 업데이터.
 *
 * 안전 계약:
 *   - 기본값은 항상 dry-run이다. 실제 UPDATE는 --apply 플래그를 명시해야만 실행된다.
 *   - manifest(docs/petjigi-improvement/content-promotion-manifest.json)에 기록된
 *     production_hash와 현재 운영 행의 hash가 정확히 일치할 때만 그 행을 UPDATE한다
 *     (compare-and-swap). 이 세션 이후 운영자가 이미 수정한 행은 자동으로 건너뛴다.
 *   - UPDATE는 title/body/sources만 바꾸고 publishedAt은 절대 건드리지 않는다. updatedAt만
 *     새로 기록한다. reviewedAt/reviewerName은 만들지 않는다(편집 정정 ≠ 전문가 검수).
 *   - status가 'published'가 아닌 행, 또는 manifest의 changed_fields가 비어 있는 행은 건너뛴다.
 *   - 각 행은 개별 트랜잭션으로 처리한다. 실패한 행은 롤백되고 이후 행 처리를 막지 않되,
 *     전체 결과에 실패 목록으로 남는다.
 *   - 같은 스크립트를 다시 실행해도(idempotent) 이미 반영된 행은 hash가 code_hash로 이미
 *     바뀌어 있으므로 compare-and-swap 조건에 걸려 다시 UPDATE되지 않는다(정상 no-op).
 *
 * 실행:
 *   Dry-run (기본, 아무것도 쓰지 않음):
 *     TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npx tsx scripts/promote-reviewed-content.ts
 *   실제 반영 (명시적 승인 후에만):
 *     TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npx tsx scripts/promote-reviewed-content.ts --apply
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { createClient } from "@libsql/client";
import ts from "typescript";
import { sourceValues } from "../lib/content-seed-parser";

const ROOT = process.cwd();
const SEED_DIR = path.join(ROOT, "db", "seeds");
const MANIFEST_PATH = path.join(ROOT, "docs", "petjigi-improvement", "content-promotion-manifest.json");
const RESULT_PATH = path.join(ROOT, "docs", "petjigi-improvement", "content-promotion-result.json");

const APPLY = process.argv.includes("--apply");

interface ManifestRecord {
  slug: string;
  content_id_code: string | null;
  production_id: string | null;
  production_status: string | null;
  production_hash: string | null;
  code_hash: string | null;
  hashes_match: boolean | null;
  changed_fields: string[];
  production_row_found: boolean;
}

interface CodeRecord {
  slug: string;
  title: string | null;
  body: string | null;
  sources: string[];
}

function loadCodeRecord(slug: string): CodeRecord | null {
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

  let found: CodeRecord | null = null;
  for (const file of walk(SEED_DIR)) {
    if (found) break;
    const sourceText = fs.readFileSync(file, "utf8");
    const source = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);
    const visit = (node: import("typescript").Node) => {
      if (found || !ts.isObjectLiteralExpression(node)) {
        if (!found) ts.forEachChild(node, visit);
        return;
      }
      const props = propertyMap(node);
      const nodeSlug = stringValue(props.get("slug"));
      const title = stringValue(props.get("title"));
      if (nodeSlug === slug && title && props.has("body")) {
        found = { slug, title, body: stringValue(props.get("body")), sources: sourceValues(props.get("sources")) };
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return found;
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
    console.error("TURSO_DATABASE_URL is required.");
    process.exit(1);
  }
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`Manifest not found at ${MANIFEST_PATH}. Run scripts/compare-content-promotion.ts first.`);
    process.exit(1);
  }

  const manifest: { records: ManifestRecord[] } = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const candidates = manifest.records.filter(
    (r) => r.production_row_found && r.production_status === "published" && r.changed_fields.length > 0 && !r.hashes_match
  );

  console.log(`Mode: ${APPLY ? "APPLY (will write to production)" : "DRY-RUN (no writes)"}`);
  console.log(`Candidates from manifest: ${candidates.length}`);

  const client = createClient({ url: dbUrl, authToken });

  const results: Array<{
    slug: string;
    content_id: string | null;
    outcome: "would_update" | "updated" | "skipped_hash_changed" | "skipped_not_found" | "error";
    detail?: string;
    rowsAffected?: number;
  }> = [];

  for (const candidate of candidates) {
    const codeRecord = loadCodeRecord(candidate.slug);
    if (!codeRecord) {
      results.push({ slug: candidate.slug, content_id: candidate.content_id_code, outcome: "error", detail: "code record not found on re-scan" });
      continue;
    }

    try {
      // 1) 현재 운영 행을 다시 읽어 manifest 생성 이후 변경이 없었는지 재확인한다.
      const currentRowResult = await client.execute({
        sql: "SELECT id, title, body, sources, status, updated_at, published_at FROM contents WHERE slug = ? LIMIT 1",
        args: [candidate.slug],
      });
      const currentRow = currentRowResult.rows[0] as unknown as
        | { id: string; title: string; body: string; sources: string | null; status: string; updated_at: string; published_at: string | null }
        | undefined;

      if (!currentRow) {
        results.push({ slug: candidate.slug, content_id: candidate.content_id_code, outcome: "skipped_not_found" });
        continue;
      }
      if (currentRow.id !== candidate.production_id) {
        results.push({ slug: candidate.slug, content_id: candidate.content_id_code, outcome: "error", detail: `production id changed: expected ${candidate.production_id}, found ${currentRow.id}` });
        continue;
      }
      if (currentRow.status !== "published") {
        results.push({ slug: candidate.slug, content_id: candidate.content_id_code, outcome: "skipped_hash_changed", detail: `status is now ${currentRow.status}, not published` });
        continue;
      }

      let currentSources: string[] = [];
      try { currentSources = currentRow.sources ? JSON.parse(currentRow.sources) : []; } catch { currentSources = []; }
      const currentHash = contentVersion({ title: currentRow.title, body: currentRow.body, sources: currentSources, updatedAt: currentRow.updated_at });

      if (currentHash !== candidate.production_hash) {
        results.push({ slug: candidate.slug, content_id: candidate.content_id_code, outcome: "skipped_hash_changed", detail: "production row changed since manifest was generated; re-run compare-content-promotion.ts" });
        continue;
      }

      if (!APPLY) {
        results.push({ slug: candidate.slug, content_id: candidate.content_id_code, outcome: "would_update", detail: candidate.changed_fields.join(",") });
        continue;
      }

      // 2) compare-and-swap UPDATE: WHERE id + updated_at(=현재 확인한 값)이 그대로일 때만 UPDATE.
      //    publishedAt은 SET 목록에 없음 — 절대 변경하지 않는다.
      const now = new Date().toISOString();
      const updateResult = await client.execute({
        sql: `UPDATE contents
              SET title = ?, body = ?, sources = ?, updated_at = ?
              WHERE id = ? AND slug = ? AND status = 'published' AND updated_at = ?`,
        args: [
          codeRecord.title,
          codeRecord.body,
          JSON.stringify(codeRecord.sources),
          now,
          currentRow.id,
          candidate.slug,
          currentRow.updated_at,
        ],
      });

      const rowsAffected = Number(updateResult.rowsAffected ?? 0);
      if (rowsAffected !== 1) {
        results.push({ slug: candidate.slug, content_id: candidate.content_id_code, outcome: "error", detail: `expected 1 row affected, got ${rowsAffected} (concurrent modification?)` });
        continue;
      }

      results.push({ slug: candidate.slug, content_id: candidate.content_id_code, outcome: "updated", rowsAffected });
    } catch (error) {
      results.push({ slug: candidate.slug, content_id: candidate.content_id_code, outcome: "error", detail: error instanceof Error ? error.message : String(error) });
    }
  }

  client.close();

  fs.writeFileSync(RESULT_PATH, JSON.stringify({
    generatedAt: new Date().toISOString(),
    mode: APPLY ? "apply" : "dry-run",
    totalCandidates: candidates.length,
    results,
  }, null, 2) + "\n");

  const counts = results.reduce<Record<string, number>>((acc, r) => {
    acc[r.outcome] = (acc[r.outcome] ?? 0) + 1;
    return acc;
  }, {});
  console.log("Outcome counts:", counts);
  console.log(`Result written to ${path.relative(ROOT, RESULT_PATH)}`);

  if (counts.error) {
    console.error(`${counts.error} record(s) failed — see ${path.relative(ROOT, RESULT_PATH)} for detail. No partial data was hidden.`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
