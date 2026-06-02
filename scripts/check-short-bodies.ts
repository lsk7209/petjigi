import { db } from "../db/client";
import { contents } from "../db/schema";
import { eq } from "drizzle-orm";

async function run() {
  const all = await db.select({ slug: contents.slug, bodyLen: contents.body }).from(contents).where(eq(contents.type, "blog"));
  const short = all.filter(r => (r.bodyLen?.length ?? 0) < 2000).map(r => ({ slug: r.slug, len: r.bodyLen?.length ?? 0 })).sort((a, b) => a.len - b.len);
  console.log(`body < 2000자인 글: ${short.length}개`);
  short.forEach(r => console.log(`  ${r.slug}: ${r.len}자`));
}
run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
