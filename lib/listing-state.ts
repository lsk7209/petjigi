/** 지역×업종 목록의 데이터 상태. 조회 실패는 예외로 전파되며 여기서 0건으로 바꾸지 않는다. */
export type ListingState =
  | "available" // 결과 있음
  | "empty_confirmed" // 해당 업종은 수집된 이력이 있으나 이 지역 결과는 0건
  | "not_collected"; // 해당 업종의 수집 이력을 확인할 수 없음

/** 수집 주기(일 단위~월 단위 ETL)보다 충분히 긴 값. 이보다 오래되면 갱신 지연으로 표시 */
export const LISTING_STALE_DAYS = 45;

export interface ListingStatus {
  state: ListingState;
  /** 업종 전체 기준 가장 최근 업체 정보 갱신일(YYYY-MM-DD), 없으면 null */
  asOf: string | null;
  stale: boolean;
}

export function classifyListing(
  totalCount: number,
  typeAsOf: string | null,
  now: Date = new Date(),
): ListingStatus {
  const asOf = typeAsOf ? typeAsOf.slice(0, 10) : null;
  const ts = asOf ? Date.parse(asOf) : Number.NaN;
  const stale = Number.isFinite(ts) && now.getTime() - ts > LISTING_STALE_DAYS * 86_400_000;
  if (totalCount > 0) return { state: "available", asOf, stale };
  if (asOf && Number.isFinite(ts)) return { state: "empty_confirmed", asOf, stale };
  return { state: "not_collected", asOf: null, stale: false };
}
