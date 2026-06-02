/**
 * Batch 1-24 subtitle 재생성 (수정판)
 * 문제: 이전 스크립트가 ID 범위 필터 오류로 100개만 처리
 * 해결: subtitle이 제목에 포함된 경우(제목 단편) → metaDescription으로 교체
 */
import { db } from "../db/client";
import { contents } from "../db/schema";
import { and, eq, isNotNull } from "drizzle-orm";

async function fixSubtitles() {
  // subtitle이 있는 모든 블로그 글 조회 (batch 1-24 + batch 25-30 전부)
  const rows = await db
    .select({
      id: contents.id,
      title: contents.title,
      subtitle: contents.subtitle,
      metaDescription: contents.metaDescription,
    })
    .from(contents)
    .where(
      and(
        eq(contents.type, "blog"),
        eq(contents.status, "published"),
        isNotNull(contents.subtitle)
      )
    );

  console.log(`subtitle 있는 블로그 글: ${rows.length}개`);

  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    if (!row.subtitle) { skipped++; continue; }

    // 제목에 subtitle이 포함되어 있으면 → 중복 (제목 단편)
    const isDuplicated = row.title.includes(row.subtitle) ||
      row.subtitle === row.title.split("—").pop()?.trim();

    if (!isDuplicated) {
      skipped++; // 이미 독립적인 subtitle
      continue;
    }

    // metaDescription으로 교체
    if (!row.metaDescription || row.metaDescription.length < 20) {
      skipped++;
      continue;
    }

    const newSubtitle = row.metaDescription.slice(0, 110).trim();

    await db
      .update(contents)
      .set({ subtitle: newSubtitle })
      .where(eq(contents.id, row.id));

    updated++;
    if (updated % 30 === 0) console.log(`  ${updated}개 재생성...`);
  }

  console.log(`\n✅ 완료: ${updated}개 재생성 (제목 단편 → metaDescription 교체)`);
  console.log(`   스킵: ${skipped}개 (이미 독립적인 subtitle)`);
  process.exit(0);
}

fixSubtitles().catch((e) => { console.error(e); process.exit(1); });
