/** 센터가 이 수 미만인 지역 페이지는 고유 정보가 부족해 색인·광고에서 제외한다. */
export const MIN_INDEXABLE_SHELTERS = 2;

export function isThinShelterRegion(shelterCount: number): boolean {
  return shelterCount < MIN_INDEXABLE_SHELTERS;
}
