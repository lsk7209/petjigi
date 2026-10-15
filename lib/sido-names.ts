// 시도 명칭 변경(강원도→강원특별자치도, 전라북도→전북특별자치도)으로 원본에 구·신 명칭이 함께 있다.
// 같은 시도의 표기 변형만 묶는다 — 분할·통합이 아니므로 안전하다. 새 명칭은 오타로 취급하지 않는다.
const RENAMED_SIDO_GROUPS: readonly (readonly string[])[] = [
  ["강원특별자치도", "강원도"],
  ["전북특별자치도", "전라북도"],
];

/** regions 기준 시도명과 같은 시도로 취급할 원본 표기 목록(자기 자신 포함) */
export function sidoNameVariants(sido: string): string[] {
  const group = RENAMED_SIDO_GROUPS.find((names) => names.includes(sido));
  return group ? [...group] : [sido];
}

/** 개명 전후 표기를 현재 명칭(regions 기준)으로 통일한다. 알 수 없는 값은 그대로 둔다 */
export function canonicalSidoName(sido: string): string {
  return sidoNameVariants(sido)[0];
}
