import { unstable_cache } from "next/cache";
import { and, eq, isNotNull, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { notDuplicateListing } from "@/lib/db-queries";
import type { CompareRow } from "@/lib/region-compare";

// 업체 데이터 기준 전국 집계. regions 테이블에 없는 시군구도 포함하고, 목록 페이지가 있으면 slug를 붙인다.
export const getCachedRegionCompare = unstable_cache(
  async (type: string): Promise<CompareRow[]> => {
    const rows = await db
      .select({
        sido: sql<string>`${businesses.addressSido}`,
        sigungu: sql<string>`${businesses.addressSigungu}`,
        sigunguSlug: sql<string | null>`min(${regions.sigunguSlug})`,
        count: sql<number>`count(distinct ${businesses.id})`,
        phoneCount: sql<number>`count(distinct case when ${businesses.phone} is not null and trim(${businesses.phone}) != '' then ${businesses.id} end)`,
      })
      .from(businesses)
      .leftJoin(
        regions,
        and(
          eq(regions.sido, businesses.addressSido),
          eq(regions.sigungu, businesses.addressSigungu),
        ),
      )
      .where(
        and(
          eq(businesses.type, type),
          eq(businesses.status, "active"),
          isNotNull(businesses.addressSido),
          isNotNull(businesses.addressSigungu),
          notDuplicateListing,
        ),
      )
      .groupBy(businesses.addressSido, businesses.addressSigungu);
    return rows;
  },
  ["businesses", "region-compare", "v2"],
  { revalidate: 86400, tags: ["businesses"] },
);
