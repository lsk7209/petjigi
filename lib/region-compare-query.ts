import { unstable_cache } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { notDuplicateListing } from "@/lib/db-queries";
import { businessSidoMatchSql } from "@/lib/listing-identity";
import type { CompareRow } from "@/lib/region-compare";

// 업체 데이터 기준 전국 집계. regions 테이블에 없는 시군구도 포함하고, 목록 페이지가 있으면 slug를 붙인다.
export const getCachedRegionCompare = unstable_cache(
  async (type: string): Promise<CompareRow[]> => {
    // 같은 원본 시도 그룹에서도 대응된 행과 미분류 행을 별도로 집계한다.
    const mappedSido = sql<string | null>`case
      when ${regions.sido} in ('강원도', '강원특별자치도') then '강원특별자치도'
      when ${regions.sido} in ('전라북도', '전북특별자치도') then '전북특별자치도'
      else ${regions.sido} end`;
    const rows = await db
      .select({
        sido: sql<string>`coalesce(${mappedSido}, ${businesses.addressSido}, '')`,
        sigungu: sql<string>`coalesce(${businesses.addressSigungu}, '')`,
        sigunguSlug: sql<string | null>`min(${regions.sigunguSlug})`,
        regionCandidates: sql<number>`max((select count(*) from regions r2 where r2.sigungu_slug = regions.sigungu_slug))`,
        count: sql<number>`count(distinct ${businesses.id})`,
        phoneCount: sql<number>`count(distinct case when ${businesses.phone} is not null and trim(${businesses.phone}) != '' then ${businesses.id} end)`,
      })
      .from(businesses)
      .leftJoin(
        regions,
        and(
          sql.raw(businessSidoMatchSql("businesses", "regions.sido")),
          eq(regions.sigungu, businesses.addressSigungu),
        ),
      )
      .where(
        and(
          eq(businesses.type, type),
          eq(businesses.status, "active"),
          notDuplicateListing,
        ),
      )
      .groupBy(businesses.addressSido, businesses.addressSigungu, mappedSido);
    return rows.map(({regionCandidates, ...row}) => ({...row, listingLinkable: regionCandidates === 1}));
  },
  ["businesses", "region-compare", "v3"],
  { revalidate: 86400, tags: ["businesses"] },
);
