/**
 * 지역(시군구) 식별 계약.
 *
 * 현재 db/schema/regions.ts의 sigunguSlug는 UNIQUE가 아니며, 서울/부산 강서구처럼
 * 여러 시도가 같은 시군구 이름·slug를 공유한다(db/seeds/regions.ts 참고). slug만으로
 * 조회하면 여러 행이 나올 수 있고, 호출자가 그중 첫 행을 암묵적으로 정답처럼 쓰면
 * 다른 시도의 데이터가 섞일 위험이 있다.
 *
 * 이 모듈은 스키마·seed·URL 구조를 바꾸지 않는다(그 변경은 별도 승인 대상). 대신
 * "조회 결과가 모호하면 이를 명시적으로 드러낸다"는 계약만 추가한다.
 */

export interface RegionCandidate {
  code: string;
  sido: string;
  sidoSlug: string;
  sigungu: string;
  sigunguSlug: string;
  fullName: string;
}

export type RegionResolution =
  | { kind: "resolved"; region: RegionCandidate }
  | { kind: "ambiguous"; candidates: RegionCandidate[] }
  | { kind: "missing" };

/**
 * slug로 조회한 지역 후보 목록을 받아 resolved/ambiguous/missing으로 분류한다.
 * 후보가 여럿이면 첫 행을 임의로 선택하지 않고 ambiguous로 반환한다 — 호출자가
 * 시도 정보 등 추가 컨텍스트로 좁히거나, 사용자에게 명시적 선택을 요구해야 한다.
 */
export function resolveRegionIdentity(candidates: RegionCandidate[]): RegionResolution {
  if (candidates.length === 0) return { kind: "missing" };
  if (candidates.length === 1) return { kind: "resolved", region: candidates[0] };
  return { kind: "ambiguous", candidates };
}
