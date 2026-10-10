import { MEMORIAL_AUTO_ADS_EXCLUDED_PATHS } from "./memorial-auto-ads-paths";

const MEMORIAL_CATEGORY_ID = 6;

const AUTO_ADS_EXCLUDED_PREFIXES = ["/category/memorial"] as const;

const AUTO_ADS_EXCLUDED_EXACT_PATHS = new Set([
  "/advertising",
  "/contact",
  "/disclosure",
  "/privacy",
  "/search",
  "/terms",
]);

// 구조동물(/rescue)은 noindex 목록이라 게시자 콘텐츠로 보기 어렵다.
const AUTO_ADS_EXCLUDED_OPERATIONAL_PREFIXES = ["/admin", "/rescue"] as const;

const FUNERAL_TYPE_SEGMENT = "funeral";

/**
 * 장례 업체 경로: 목록은 /{지역}/funeral, 상세는 /funeral/{지역}/{업체}(canonical).
 * 두 순서 모두 차단한다(추모 광고 제한은 펫지기 자체 정책).
 */
function isFuneralBusinessPath(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2 || segments.length > 3) return false;
  return segments[0] === FUNERAL_TYPE_SEGMENT || segments[1] === FUNERAL_TYPE_SEGMENT;
}

export function isAutoAdsEligiblePath(pathname: string, pageBlocksAds = false): boolean {
  if (pageBlocksAds) return false;
  if (AUTO_ADS_EXCLUDED_EXACT_PATHS.has(pathname)) return false;
  if (MEMORIAL_AUTO_ADS_EXCLUDED_PATHS.has(pathname)) return false;
  if (isFuneralBusinessPath(pathname)) return false;
  if (AUTO_ADS_EXCLUDED_OPERATIONAL_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )) return false;

  return !AUTO_ADS_EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/** 카테고리 6(장례·추모) 페이지는 정적 경로 목록과 무관하게 마커로 자동 광고를 차단한다. */
export function adsPolicyAttrs(categoryId: number): { "data-ads-policy"?: "block" } {
  return categoryId === MEMORIAL_CATEGORY_ID ? { "data-ads-policy": "block" } : {};
}

/** 페이지 DOM이 선언하는 광고 마커. block=광고 금지, pending=아직 최종 화면이 아님. */
export type PageAdMarker = "block" | "pending";

/** allow=광고 허용, block=금지, pending=판정 보류(타이머로 allow 전환하지 않는다). */
export type AdDecision = "allow" | "block" | "pending";

/**
 * 자동광고·수동 슬롯이 공유하는 단일 판정.
 * 정적 경로·마커 차단이 우선이고, 문서 렌더가 끝나지 않았거나 pending 마커가 있으면 보류한다.
 */
export function decideAdPage(input: {
  pathname: string;
  marker: PageAdMarker | null;
  renderComplete: boolean;
}): AdDecision {
  if (!isAutoAdsEligiblePath(input.pathname, input.marker === "block")) return "block";
  if (!input.renderComplete || input.marker === "pending") return "pending";
  return "allow";
}
