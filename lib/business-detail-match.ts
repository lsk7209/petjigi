/**
 * 업체 상세 페이지(/{type}/{sigungu}/{slug})의 후보 선택 계약.
 *
 * 기존 인라인 조회(app/[sigungu]/[type]/[slug]/page.tsx)는 type+name만 비교해
 * 다른 시도의 동명업체나 같은 지역의 동명업체가 있어도 DB가 반환하는 첫 행을
 * 그대로 쓴다. 이 모듈은 호출자가 URL의 sigungu 세그먼트로 후보를 좁히고,
 * 여전히 모호하면 임의로 첫 행을 선택하지 않도록 강제한다.
 *
 * 최종 식별자는 business.id이며, 이 계약은 그 축소 규칙만 담당한다.
 */

import type { RegionSlugView } from "./region-identity";

export interface BusinessCandidate {
  id: string;
  type: string;
  name: string;
  addressSigungu: string | null;
  status: string;
}

export type BusinessMatchResult<T extends BusinessCandidate = BusinessCandidate> =
  | { kind: "resolved"; business: T }
  | { kind: "ambiguous"; candidates: T[] }
  | { kind: "missing" };

export interface BusinessMatchQuery {
  sigungu: string;
}

/**
 * type+name으로 조회된 후보 목록을 URL의 sigungu로 좁히고 폐업(closed)을 제외한다.
 * 좁힌 결과가 정확히 하나면 resolved, 둘 이상이면 ambiguous(첫 행 임의 선택 금지),
 * 없으면 missing을 반환한다.
 */
export function pickUniqueBusinessMatch<T extends BusinessCandidate>(
  candidates: T[],
  query: BusinessMatchQuery
): BusinessMatchResult<T> {
  const scoped = candidates.filter(
    (c) => c.addressSigungu === query.sigungu && c.status !== "closed"
  );
  if (scoped.length === 0) return { kind: "missing" };
  if (scoped.length === 1) return { kind: "resolved", business: scoped[0] };
  return { kind: "ambiguous", candidates: scoped };
}

/**
 * 지역 판별 결과(RegionSlugView)를 상세 단계까지 유지해 후보를 좁힌다.
 * URL의 sigungu는 영문 slug이므로 DB의 한글 시군구명과 직접 비교하면 안 된다 —
 * 항상 지역 판별이 돌려준 실제 시군구명(sigunguName)으로 비교한다. 동명 지역(서울·부산 강서구)은
 * 두 시도가 같은 시군구명을 쓰므로 이름이 하나뿐인 업체는 확정되고, 같은 이름이 둘 이상이면 ambiguous다.
 * 미등록 지역(missing)은 후보와 무관하게 missing이다.
 */
export function matchBusinessInRegion<T extends BusinessCandidate>(
  region: RegionSlugView,
  candidates: T[]
): BusinessMatchResult<T> {
  if (region.kind === "missing" || !region.sigunguName) return { kind: "missing" };
  return pickUniqueBusinessMatch(candidates, { sigungu: region.sigunguName });
}
