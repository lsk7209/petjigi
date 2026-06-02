import { db } from "../db/client";
import { contents } from "../db/schema";
import { eq, isNull, or } from "drizzle-orm";

async function run() {
  const r = await db.select({ slug: contents.slug, body: contents.body, publishedAt: contents.publishedAt }).from(contents).where(eq(contents.slug, "cat-fip-guide")).get();
  console.log("=== cat-fip-guide ===");
  console.log("publishedAt:", r?.publishedAt);
  console.log("body_len:", r?.body?.length ?? "NULL");
  console.log("body_start:", r?.body?.slice(0, 80) ?? "EMPTY");

  const empty = await db.select({ slug: contents.slug, publishedAt: contents.publishedAt }).from(contents).where(or(isNull(contents.body), eq(contents.body, "")));
  console.log("\n=== body 비어있는 글 ===");
  console.log(`총 ${empty.length}개`);
  empty.forEach(r => console.log(" -", r.slug, r.publishedAt));
}

run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
