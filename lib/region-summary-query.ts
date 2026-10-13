import { unstable_cache } from "next/cache";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { notDuplicateListing } from "@/lib/db-queries";
import { summarizeRegion } from "@/lib/region-summary";

// 시도 안의 시군구별 업체 수는 시도가 하나로 확정될 때만 비교한다. 구·신 시도명(강원도/강원특별자치도)이 섞여 있어
// 시도명이 아니라 지역 목록의 시군구 이름으로 모은다(목록 페이지와 같은 기준).
export const getCachedRegionSummary = unstable_cache(
  async (
    sigunguName: string,
    type: string,
    sidoName: string | null,
    nowYear: number,
  ) => {
    const base = and(
      eq(businesses.type, type),
      eq(businesses.status, "active"),
      notDuplicateListing,
    );
    const rows = await db
      .select({
        dong: businesses.addressDong,
        licenseDate: businesses.licenseDate,
        phone: businesses.phone,
      })
      .from(businesses)
      .where(and(base, eq(businesses.addressSigungu, sigunguName)));
    const sidoCounts = sidoName
      ? await db
          .select({
            sigungu: sql<string>`${businesses.addressSigungu}`,
            count: sql<number>`count(*)`,
          })
          .from(businesses)
          .where(
            and(
              base,
              inArray(
                businesses.addressSigungu,
                db.select({ name: regions.sigungu }).from(regions).where(eq(regions.sido, sidoName)),
              ),
            ),
          )
          .groupBy(businesses.addressSigungu)
      : [];
    return summarizeRegion(rows, sidoCounts, sigunguName, nowYear);
  },
  ["businesses", "region-summary", "v3"],
  { revalidate: 86400, tags: ["businesses"] },
);

// 같은 시군구에서 업체가 있는 업종과 수(같은 지역의 다른 업종 링크용)
export const getCachedRegionTypeCounts = unstable_cache(
  async (sigunguName: string) => {
    const rows = await db
      .select({ type: businesses.type, count: sql<number>`count(*)` })
      .from(businesses)
      .where(
        and(
          eq(businesses.addressSigungu, sigunguName),
          eq(businesses.status, "active"),
          notDuplicateListing,
        ),
      )
      .groupBy(businesses.type);
    return rows;
  },
  ["businesses", "region-type-counts", "v1"],
  { revalidate: 86400, tags: ["businesses"] },
);
