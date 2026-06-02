/**
 * 기존 블로그 글(subtitle=NULL) 일괄 subtitle 업데이트
 * - 제목에 "—"가 있으면: "—" 뒤 텍스트를 subtitle로
 * - 없으면: metaDescription 앞 80자를 subtitle로
 */
import { db } from "../db/client";
import { contents } from "../db/schema";
import { and, eq, isNull } from "drizzle-orm";

async function updateSubtitles() {
  const rows = await db
    .select({
      id: contents.id,
      title: contents.title,
      metaDescription: contents.metaDescription,
    })
    .from(contents)
    .where(
      and(
        eq(contents.type, "blog"),
        eq(contents.status, "published"),
        isNull(contents.subtitle)
      )
    );

  console.log(`subtitle 없는 블로그 글: ${rows.length}개`);

  let updated = 0;
  for (const row of rows) {
    const dashIdx = row.title.indexOf("—");
    let subtitle: string | null = null;

    if (dashIdx !== -1) {
      const after = row.title.slice(dashIdx + 1).trim();
      if (after.length > 5) subtitle = after;
    }

    if (!subtitle && row.metaDescription) {
      subtitle = row.metaDescription.slice(0, 80).trim();
      if (subtitle.length < 10) subtitle = null;
    }

    if (!subtitle) continue;

    await db
      .update(contents)
      .set({ subtitle })
      .where(eq(contents.id, row.id));

    updated++;
    if (updated % 20 === 0) console.log(`  ${updated}/${rows.length} 처리 중...`);
  }

  console.log(`\n✅ 완료: ${updated}개 업데이트`);
  process.exit(0);
}

updateSubtitles().catch((e) => { console.error(e); process.exit(1); });
