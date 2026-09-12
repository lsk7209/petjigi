export const DEFAULT_BUSINESS_PAGE_SIZE = 50;

export interface PageWindow {
  page: number;
  pageSize: number;
  offset: number;
  totalPages: number;
  start: number;
  end: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export type AddressRegionConsistency = "consistent" | "mismatch" | "unknown";

export function getAddressRegionConsistency(
  address: string | null | undefined,
  expectedSigungu: string
): AddressRegionConsistency {
  const normalizedAddress = address?.trim().replace(/\s+/g, " ");
  const normalizedExpected = expectedSigungu.trim().replace(/\s+/g, " ");
  if (!normalizedAddress || !normalizedExpected || normalizedAddress.includes("*")) {
    return "unknown";
  }

  const parts = normalizedAddress.split(" ");
  const startsWithProvince = /(?:도|특별시|광역시|특별자치시|특별자치도)$/.test(parts[0] ?? "");
  const regionStart = startsWithProvince ? 1 : 0;
  const cityOrDistrict = parts[regionStart];
  if (!cityOrDistrict || !/(?:시|군|구)$/.test(cityOrDistrict)) return "unknown";

  const nextPart = parts[regionStart + 1];
  const derivedRegion = cityOrDistrict.endsWith("시") && nextPart?.endsWith("구")
    ? `${cityOrDistrict} ${nextPart}`
    : cityOrDistrict;

  if (
    derivedRegion === normalizedExpected ||
    derivedRegion.startsWith(`${normalizedExpected} `) ||
    normalizedExpected.startsWith(`${derivedRegion} `)
  ) {
    return "consistent";
  }

  return "mismatch";
}

export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined || raw === "") return 1;
  if (!/^\d+$/.test(raw)) return 1;

  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function getPageWindow(
  totalCount: number,
  requestedPage: number,
  pageSize = DEFAULT_BUSINESS_PAGE_SIZE
): PageWindow {
  if (!Number.isSafeInteger(totalCount) || totalCount < 0) {
    throw new RangeError("totalCount must be a non-negative safe integer");
  }
  if (!Number.isSafeInteger(pageSize) || pageSize <= 0) {
    throw new RangeError("pageSize must be a positive safe integer");
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1;
  const offset = (page - 1) * pageSize;
  const displayedCount = Math.min(pageSize, Math.max(0, totalCount - offset));

  return {
    page,
    pageSize,
    offset,
    totalPages,
    start: displayedCount === 0 ? 0 : offset + 1,
    end: offset + displayedCount,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
  };
}

export function businessListingPath(
  sigunguSlug: string,
  type: string,
  page: number
): string {
  const base = `/${sigunguSlug}/${type}`;
  return page > 1 ? `${base}?page=${page}` : base;
}
