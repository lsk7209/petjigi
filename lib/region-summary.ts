// 지역×업종 목록의 공공데이터 집계(문장 생성 없이 수치만 계산)
export type SummaryRow = {
  dong: string | null;
  licenseDate: string | null;
  phone: string | null;
};

export type SigunguCount = { sigungu: string; count: number };

export type RegionSummary = {
  total: number;
  phoneCount: number;
  phonePercent: number;
  yearCounts: { year: number; count: number }[];
  topDongs: { name: string; count: number }[];
  sido: { rank: number; of: number; average: number } | null;
};

const RECENT_YEARS = 5;
const TOP_DONG_LIMIT = 5;
// 원본 읍면동 칸에 도로명이 섞여 있어 행정구역 단위로 끝나는 값만 집계한다
const ADMIN_UNIT = /[동읍면리가]$/;

function licenseYear(date: string | null): number | null {
  const year = Number(date?.slice(0, 4));
  return Number.isInteger(year) && year >= 1900 ? year : null;
}

function summarizeSido(
  sigunguName: string,
  counts: SigunguCount[],
): RegionSummary["sido"] {
  const own = counts.find((c) => c.sigungu === sigunguName);
  if (!own || counts.length < 2) return null;
  const rank = counts.filter((c) => c.count > own.count).length + 1;
  const sum = counts.reduce((acc, c) => acc + c.count, 0);
  return {
    rank,
    of: counts.length,
    average: Math.round((sum / counts.length) * 10) / 10,
  };
}

export function summarizeRegion(
  rows: SummaryRow[],
  sidoCounts: SigunguCount[],
  sigunguName: string,
  nowYear: number,
): RegionSummary {
  const dongMap = new Map<string, number>();
  const yearMap = new Map<number, number>();
  let phoneCount = 0;
  for (const row of rows) {
    if (row.phone?.trim()) phoneCount++;
    const dong = row.dong?.trim();
    if (dong && ADMIN_UNIT.test(dong)) dongMap.set(dong, (dongMap.get(dong) ?? 0) + 1);
    const year = licenseYear(row.licenseDate);
    if (year) yearMap.set(year, (yearMap.get(year) ?? 0) + 1);
  }
  const yearCounts = Array.from({ length: RECENT_YEARS }, (_, i) => {
    const year = nowYear - RECENT_YEARS + 1 + i;
    return { year, count: yearMap.get(year) ?? 0 };
  });
  const topDongs = [...dongMap.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ko"))
    .slice(0, TOP_DONG_LIMIT)
    .map(([name, count]) => ({ name, count }));
  return {
    total: rows.length,
    phoneCount,
    phonePercent: rows.length
      ? Math.round((phoneCount / rows.length) * 100)
      : 0,
    yearCounts,
    topDongs,
    sido: summarizeSido(sigunguName, sidoCounts),
  };
}
