import { db } from "../db/client";
import { contents } from "../db/schema";
import { eq } from "drizzle-orm";
async function run() {
  const r = await db.select({ body: contents.body }).from(contents).where(eq(contents.slug, "cat-fip-guide")).get();
  console.log("body_len:", r?.body?.length);
  console.log("end:", r?.body?.slice(-100));
}
run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
