/**
 * 공개 유지 30건 시드↔운영 DB 드리프트 감사 (SELECT 전용, 운영 DB에 쓰지 않는다).
 *   실행: tsx scripts/audit-keep30-drift.ts [--out <json 경로>]
 *   필요: TURSO_DATABASE_URL / TURSO_AUTH_TOKEN
 * 검사: 공개 건수(type·status), keep 목록과 published 집합 일치, slug 중복, 미래 발행일,
 *       필드별(제목·부제·메타·본문 해시·sources·disclaimer) 시드 대비 차이.
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { createClient } from "@libsql/client";
import { seedRecords } from "./apply-content-update";

const KEEP_FILE = path.join(process.cwd(), "docs", "keep-30-selection.json");
const EXPECTED_PUBLISHED = 30;
const FIELD_MAP = {
  title: "title",
  metaTitle: "meta_title",
  subtitle: "subtitle",
  body: "body",
  metaDescription: "meta_description",
  sources: "sources",
  disclaimer: "disclaimer",
} as const;

const sha = (v: unknown) =>
  v === null || v === undefined
    ? null
    : createHash("sha256").update(String(v)).digest("hex").slice(0, 12);

function sourceCount(raw: unknown): number {
  try {
    const parsed = JSON.parse(String(raw ?? "[]"));
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return -1;
  }
}

async function main() {
  const outIdx = process.argv.indexOf("--out");
  const keep = JSON.parse(fs.readFileSync(KEEP_FILE, "utf8")).keep as {
    slug: string;
    type: string;
  }[];
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? "",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  try {
    const counts = (
      await client.execute(
        "SELECT type, status, COUNT(*) AS n FROM contents GROUP BY type, status",
      )
    ).rows.map((r) => ({
      type: String(r.type),
      status: String(r.status),
      n: Number(r.n),
    }));
    const published = (
      await client.execute(
        "SELECT id, type, slug, status, published_at, updated_at, title, meta_title, subtitle, body, meta_description, sources, disclaimer FROM contents WHERE status = 'published'",
      )
    ).rows;
    const keepKeys = new Set(keep.map((k) => `${k.type}/${k.slug}`));
    const pubKeys = published.map((r) => `${r.type}/${r.slug}`);
    const dupSlugs = pubKeys.filter((k, i) => pubKeys.indexOf(k) !== i);
    const now = Date.now();
    const rows = keep.map((k) => {
      const row = published.find((r) => r.type === k.type && r.slug === k.slug);
      if (!row) return { ...k, published: false };
      const seeds = seedRecords(k.slug).filter((s) => s.id === String(row.id));
      const seed = seeds.length === 1 ? seeds[0] : null;
      const diffs = seed
        ? (Object.keys(FIELD_MAP) as (keyof typeof FIELD_MAP)[])
            .filter(
              (f) => seed[f] !== undefined && seed[f] !== row[FIELD_MAP[f]],
            )
            .map((f) => ({
              field: f,
              seed: sha(seed[f]),
              prod: sha(row[FIELD_MAP[f]]),
            }))
        : null;
      return {
        ...k,
        published: true,
        id: String(row.id),
        seedMatch: seed ? "unique" : `seeds=${seedRecords(k.slug).length}`,
        diffs,
        prodSources: sourceCount(row.sources),
        seedSources: seed?.sources ? sourceCount(seed.sources) : null,
        bodyChars: String(row.body).replace(/\s/g, "").length,
        futurePublishedAt: row.published_at
          ? Date.parse(String(row.published_at)) > now
          : false,
      };
    });
    const report = {
      counts,
      publishedTotal: published.length,
      expectedPublished: EXPECTED_PUBLISHED,
      publishedNotInKeep: pubKeys.filter((k) => !keepKeys.has(k)),
      keepNotPublished: [...keepKeys].filter((k) => !pubKeys.includes(k)),
      duplicatePublishedKeys: dupSlugs,
      rows,
    };
    const text = JSON.stringify(report, null, 1);
    if (outIdx > 0) fs.writeFileSync(process.argv[outIdx + 1], text);
    else console.log(text);
  } finally {
    await client.close();
  }
}

main().catch((e) => {
  process.stderr.write(String(e?.message ?? e) + "\n");
  process.exit(1);
});
