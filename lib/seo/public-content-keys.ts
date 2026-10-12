import { unstable_cache } from "next/cache";
import { and } from "drizzle-orm";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { publicContentCondition } from "@/lib/content-publication-sql";

/** 지금 공개 중인 guide·blog·condition의 "type/slug" 목록 (본문 내부 링크 판정용, 1시간 캐시) */
export const getCachedPublicContentKeys = unstable_cache(
  async () => {
    const rows = await db
      .select({ type: contents.type, slug: contents.slug })
      .from(contents)
      .where(and(publicContentCondition()));
    return rows.map((row) => `${row.type}/${row.slug}`);
  },
  ["contents", "public-keys"],
  { revalidate: 3600, tags: ["guides"] },
);
