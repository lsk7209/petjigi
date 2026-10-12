import { type ListingStatus } from "@/lib/listing-state";

/**
 * 색인·사이트맵·광고·구조화 데이터 공통 판정.
 * 페이지별 metadata, JSON-LD, 광고 마커는 이 결과만 따른다(조건 재구현 금지).
 */

export type IndexabilityReason =
  | "INDEXABLE"
  | "AMBIGUOUS_REGION"
  | "NOT_COLLECTED"
  | "EMPTY_CONFIRMED"
  | "INSUFFICIENT_UNIQUE_DATA"
  | "OPERATIONAL_PAGE"
  | "CONTENT_NOT_PUBLIC"
  | "REDIRECTED"
  | "MEMORIAL_ADS_BLOCKED";

export interface PageEligibility {
  indexable: boolean;
  sitemapEligible: boolean;
  adEligible: boolean;
  structuredDataEligible: boolean;
  reasons: IndexabilityReason[];
}

const MEMORIAL_CATEGORY_ID = 6;

const NOT_ELIGIBLE = {
  indexable: false,
  sitemapEligible: false,
  adEligible: false,
  structuredDataEligible: false,
} as const;

function blocked(...reasons: IndexabilityReason[]): PageEligibility {
  return { ...NOT_ELIGIBLE, reasons };
}

function indexable(categoryId: number | null): PageEligibility {
  const memorial = categoryId === MEMORIAL_CATEGORY_ID;
  return {
    indexable: true,
    sitemapEligible: true,
    adEligible: !memorial,
    structuredDataEligible: true,
    reasons: memorial ? ["INDEXABLE", "MEMORIAL_ADS_BLOCKED"] : ["INDEXABLE"],
  };
}

/** 지역×업종 목록. 업체 0건(수집 이력 유무 무관)과 모호한 지역은 색인·광고·JSON-LD 모두 제외 */
export function evaluateListingEligibility(input: {
  ambiguousRegion: boolean;
  status: Pick<ListingStatus, "state">;
  categoryId: number;
}): PageEligibility {
  if (input.ambiguousRegion) return blocked("AMBIGUOUS_REGION");
  if (input.status.state === "not_collected") return blocked("NOT_COLLECTED");
  if (input.status.state === "empty_confirmed") return blocked("EMPTY_CONFIRMED");
  return indexable(input.categoryId);
}

export interface BusinessUniqueFields {
  address?: string | null;
  phone?: string | null;
  lat?: number | null;
  lng?: number | null;
  licenseDate?: string | null;
}

const hasText = (v: string | null | undefined) => Boolean(v && v.trim());
const hasCoord = (v: number | null | undefined) => typeof v === "number" && Number.isFinite(v);

/** 이름 외 고유 정보(주소·전화·좌표·허가일)가 하나라도 있는가 */
export function hasUniqueBusinessData(b: BusinessUniqueFields): boolean {
  return hasText(b.address) || hasText(b.phone) || hasCoord(b.lat) || hasCoord(b.lng) || hasText(b.licenseDate);
}

/** 업체 상세. 모호한 지역·동명 업체, 고유 정보가 전혀 없는 상세는 제외 */
export function evaluateBusinessDetailEligibility(input: {
  ambiguous: boolean;
  business: BusinessUniqueFields;
  categoryId: number;
}): PageEligibility {
  if (input.ambiguous) return blocked("AMBIGUOUS_REGION");
  if (!hasUniqueBusinessData(input.business)) return blocked("INSUFFICIENT_UNIQUE_DATA");
  return indexable(input.categoryId);
}

/** blog/guide/condition 등 편집 콘텐츠 */
export function evaluateContentEligibility(input: {
  isPublic: boolean;
  redirected: boolean;
  memorial?: boolean;
}): PageEligibility {
  if (input.redirected) return blocked("REDIRECTED");
  if (!input.isPublic) return blocked("CONTENT_NOT_PUBLIC");
  return indexable(input.memorial ? MEMORIAL_CATEGORY_ID : null);
}

/** 정책·문의·검색·관리 등 운영 페이지 (색인 여부는 별도 metadata가 결정, 광고·JSON-LD 제외) */
export function evaluateOperationalEligibility(): PageEligibility {
  return blocked("OPERATIONAL_PAGE");
}

/** 보호센터 지역 페이지. 센터 수가 부족하면 고유 정보 부족으로 제외 */
export function evaluateShelterRegionEligibility(input: { thin: boolean }): PageEligibility {
  return input.thin ? blocked("INSUFFICIENT_UNIQUE_DATA") : indexable(1);
}
