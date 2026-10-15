import { unstable_cache } from "next/cache";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { notDuplicateListing } from "@/lib/db-queries";
import { businessRegionCondition, businessSidoCondition } from "@/lib/business-region";
import { summarizeRegion } from "@/lib/region-summary";

// 시도 안의 시군구별 업체 수는 시도가 하나로 확정될 때만 비교한다. 구·신 시도명(강원도/강원특별자치도)이 섞여 있어
// 시도 개명 표기를 허용하되 시군구 이름만으로 타 시도 행을 포함하지 않는다.
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
      .where(and(base, businessRegionCondition(sigunguName, sidoName)));
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
              // 같은 시군구 이름이 다른 시도에도 있으므로(중구·동구 등) 업체 원본의 시도도 함께 확인한다
              businessSidoCondition(sidoName),
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
  ["businesses", "region-summary", "v5"],
  { revalidate: 86400, tags: ["businesses"] },
);

// 같은 시군구에서 업체가 있는 업종과 수(같은 지역의 다른 업종 링크용)
export const getCachedRegionTypeCounts = unstable_cache(
  async (sigunguName: string, sidoName: string | null = null) => {
    const rows = await db
      .select({ type: businesses.type, count: sql<number>`count(*)` })
      .from(businesses)
      .where(
        and(
          businessRegionCondition(sigunguName, sidoName),
          eq(businesses.status, "active"),
          notDuplicateListing,
        ),
      )
      .groupBy(businesses.type);
    return rows;
  },
  ["businesses", "region-type-counts", "v3"],
  { revalidate: 86400, tags: ["businesses"] },
);
