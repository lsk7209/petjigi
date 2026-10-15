/**
 * 업체 상세 페이지·메타데이터·OG 이미지가 공유하는 서버 측 식별 지점.
 * 지역 판별(resolved/ambiguous/missing)과 업체 후보 선택을 한 곳에서 수행해
 * 목록·상세·주변 시설·breadcrumb이 서로 다른 업체나 지역을 가리키지 않게 한다.
 */
import { cache } from "react";
import { and, eq, type SQL } from "drizzle-orm";
import { db } from "@/db/client";
import { businesses } from "@/db/schema";
import { getCachedRegionSlugView } from "@/lib/db-queries";
import { businessRegionCondition } from "@/lib/business-region";
import { collapseListingDuplicates, hasListingStatusConflict } from "@/lib/listing-identity";
import { matchBusinessInRegion, type BusinessMatchResult } from "@/lib/business-detail-match";
import type { RegionSlugView } from "@/lib/region-identity";

type BusinessRow = typeof businesses.$inferSelect;

export interface BusinessDetailTarget {
  statusConflict?: boolean;
  region: RegionSlugView;
  match: BusinessMatchResult<BusinessRow>;
}

export const resolveBusinessDetail = cache(
  async (type: string, sigunguSlug: string, name: string): Promise<BusinessDetailTarget> => {
    const region = await getCachedRegionSlugView(sigunguSlug);
    if (region.kind === "missing" || !region.sigunguName) return { region, match: { kind: "missing" } };
    const candidates = await db
      .select()
      .from(businesses)
      .where(and(eq(businesses.type, type), eq(businesses.name, name), businessRegionCondition(region.sigunguName, region.sidoName || null)));
    // 출처 두 곳에 중복 적재된 같은 업체는 목록처럼 대표 1건으로 본다(동명 안내는 서로 다른 업체에만)
    const match = matchBusinessInRegion(region, collapseListingDuplicates(candidates));
    return { region, match, statusConflict: match.kind === "resolved" && hasListingStatusConflict(candidates, match.business) };
  }
);

/**
 * 확정된 업체와 같은 지역의 시설만 고르는 조건. 동명 시군구(서울·부산 강서구)가 섞이지 않도록
 * 업체 자신의 원본 시도 값이 있으면 함께 비교한다(주소를 추측해 보정하지 않는다).
 */
export function sameRegionCondition(business: Pick<BusinessRow, "addressSigungu" | "addressSido">, sidoName: string | null = business.addressSido): SQL | undefined {
  return and(
    businessRegionCondition(business.addressSigungu ?? "", sidoName)
  );
}
