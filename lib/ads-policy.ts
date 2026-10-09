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

const AUTO_ADS_EXCLUDED_OPERATIONAL_PREFIXES = ["/admin"] as const;

function isFuneralBusinessPath(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  return (segments.length === 2 || segments.length === 3) && segments[1] === "funeral";
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
