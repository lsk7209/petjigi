import { db } from "../db/client";
import { contents } from "../db/schema";
import { eq } from "drizzle-orm";

async function run() {
  const r = await db.select({ slug: contents.slug, body: contents.body }).from(contents).where(eq(contents.slug, "cat-feline-hypertension-symptoms-management")).get();
  console.log("body_len:", r?.body?.length);
  console.log("body (first 200):", r?.body?.slice(0, 200));
  console.log("body (last 200):", r?.body?.slice(-200));
}
run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
