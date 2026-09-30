/**
 * F01 반영 후 사후 검증 — SELECT-only.
 * published_at이 보존됐는지, status가 여전히 published인지, reviewed_at/reviewer_name이
 * 새로 생기지 않았는지 확인한다. 아무것도 쓰지 않는다.
 */
import { createClient } from "@libsql/client";

const SLUGS = [
  "dog-disc-disease","cat-grooming-basics-guide","pet-food-rotation-guide","puppy-first-week-guide",
  "pet-first-aid-guide","pet-registration-guide","pet-emergency-vet-preparation","pet-emergency-kit-guide",
  "pet-toxic-plants-dog-guide","pet-toxic-plants-cat-guide","dog-flea-tick-guide","cat-flea-tick-prevention",
  "dog-heartworm-treatment-guide","dog-dental-scaling-guide","cat-anal-gland-guide","dog-anal-gland-express-guide",
  "cat-summer-safety-guide","dog-eye-care-guide","dog-summer-paw-protection","dog-skin-care-guide",
  "pet-vet-visit-guide","online-vet-consultation-guide","pet-allergy-season-guide","pet-human-allergy-guide",
];

async function main() {
  const client = createClient({ url: process.env.TURSO_DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN });
  let allGood = true;
  for (const slug of SLUGS) {
    const result = await client.execute({
      sql: "SELECT status, published_at, reviewed_at, reviewer_name, updated_at FROM contents WHERE slug = ? LIMIT 1",
      args: [slug],
    });
    const row = result.rows[0] as unknown as { status: string; published_at: string | null; reviewed_at: string | null; reviewer_name: string | null; updated_at: string } | undefined;
    if (!row) { console.log(`${slug}: MISSING`); allGood = false; continue; }
    const problems: string[] = [];
    if (row.status !== "published") problems.push(`status=${row.status}`);
    if (!row.published_at) problems.push("published_at is empty");
    if (row.reviewed_at || row.reviewer_name) problems.push(`unexpected review fields: reviewed_at=${row.reviewed_at}, reviewer_name=${row.reviewer_name}`);
    if (problems.length > 0) {
      console.log(`${slug}: PROBLEM - ${problems.join("; ")}`);
      allGood = false;
    } else {
      console.log(`${slug}: OK (status=published, published_at=${row.published_at}, updated_at=${row.updated_at})`);
    }
  }
  client.close();
  console.log(allGood ? "\nALL 24 RECORDS PASS POST-APPLY SAFETY CHECK" : "\nSOME RECORDS FAILED SAFETY CHECK — SEE ABOVE");
}
main().catch((e) => { console.error(e); process.exit(1); });
