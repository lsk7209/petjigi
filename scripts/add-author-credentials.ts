/**
 * Batch 1-24 authorCredential 일괄 추가 (E-E-A-T 향상)
 * 카테고리별 credential을 authorCredential IS NULL인 blog 글에 설정
 */
import { db } from "../db/client";
import { contents } from "../db/schema";
import { and, eq, isNull } from "drizzle-orm";

const CREDENTIALS: Record<number, string> = {
  1: "반려동물 생활 정보 큐레이터",
  2: "반려동물 영양 정보 큐레이터",
  3: "반려동물 건강 정보 큐레이터",
  4: "반려동물 법률·금융 정보 큐레이터",
  5: "반려동물 케어 정보 큐레이터",
  6: "반려동물 생활 정보 큐레이터",
};

async function run() {
  const rows = await db
    .select({ id: contents.id, category: contents.category })
    .from(contents)
    .where(and(eq(contents.type, "blog"), eq(contents.status, "published"), isNull(contents.authorCredential)));

  console.log(`authorCredential 없는 글: ${rows.length}개`);
  let updated = 0;

  for (const row of rows) {
    const credential = CREDENTIALS[row.category ?? 5] ?? "반려동물 생활 정보 큐레이터";
    await db.update(contents).set({ authorCredential: credential }).where(eq(contents.id, row.id));
    updated++;
  }

  console.log(`✅ 완료: ${updated}개 업데이트`);
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
