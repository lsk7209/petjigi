// 시도·시군구별 업체 수 비교표용 집계(수치만 계산, 평가·순위 문구는 만들지 않는다)
export type CompareRow = {
  sido: string;
  sigungu: string;
  /** 시군구 목록 페이지 slug(regions에 없으면 null → 링크 없음) */
  sigunguSlug: string | null;
  count: number;
  phoneCount: number;
};

export type SidoGroup = {
  sido: string;
  total: number;
  phonePercent: number;
  sigungus: CompareRow[];
};

export function groupBySido(rows: CompareRow[]): SidoGroup[] {
  const map = new Map<string, SidoGroup & { phoneSum: number }>();
  for (const row of rows) {
    const group = map.get(row.sido) ?? {
      sido: row.sido,
      total: 0,
      phonePercent: 0,
      phoneSum: 0,
      sigungus: [],
    };
    group.total += row.count;
    group.phoneSum += row.phoneCount;
    group.sigungus.push(row);
    map.set(row.sido, group);
  }
  return [...map.values()]
    .map(({ phoneSum, ...group }) => ({
      ...group,
      phonePercent: group.total
        ? Math.round((phoneSum / group.total) * 100)
        : 0,
      sigungus: [...group.sigungus].sort(
        (a, b) => b.count - a.count || a.sigungu.localeCompare(b.sigungu, "ko"),
      ),
    }))
    .sort((a, b) => b.total - a.total || a.sido.localeCompare(b.sido, "ko"));
}
