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
  /** asOf의 의미: region=이 지역 업체 행 기준, type=업종 전체 기준(지역 단위 수집 완료를 뜻하지 않음) */
  scope: "region" | "type" | null;
}

export function classifyListing(
  totalCount: number,
  typeAsOf: string | null,
  now: Date = new Date(),
  regionAsOf: string | null = null,
): ListingStatus {
  const evidence = totalCount > 0 && regionAsOf ? regionAsOf : typeAsOf;
  const asOf = evidence ? evidence.slice(0, 10) : null;
  const ts = asOf ? Date.parse(asOf) : Number.NaN;
  const valid = asOf !== null && Number.isFinite(ts);
  const stale = valid && now.getTime() - ts > LISTING_STALE_DAYS * 86_400_000;
  const scope = valid ? (totalCount > 0 && regionAsOf ? "region" : "type") : null;
  if (totalCount > 0) return { state: "available", asOf, stale, scope };
  if (valid) return { state: "empty_confirmed", asOf, stale, scope };
  return { state: "not_collected", asOf: null, stale: false, scope: null };
}
