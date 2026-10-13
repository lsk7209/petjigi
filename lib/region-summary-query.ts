import { unstable_cache } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { businesses } from "@/db/schema";
import { notDuplicateListing } from "@/lib/db-queries";
import { summarizeRegion } from "@/lib/region-summary";

// 시도 안의 시군구별 업체 수는 시도가 하나로 확정될 때(동명 시군구가 아닐 때)만 비교한다
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
          .where(and(base, eq(businesses.addressSido, sidoName)))
          .groupBy(businesses.addressSigungu)
      : [];
    return summarizeRegion(rows, sidoCounts, sigunguName, nowYear);
  },
  ["businesses", "region-summary", "v2"],
  { revalidate: 86400, tags: ["businesses"] },
);
