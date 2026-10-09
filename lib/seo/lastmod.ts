/** 사이트맵 lastmod: 수정일이 발행일보다 과거이면 모순이므로 둘 중 늦은 날짜(YYYY-MM-DD). 신뢰할 날짜가 없으면 null */
export function resolveLastmod(updatedAt: string | null, publishedAt: string | null): string | null {
  const times = [updatedAt, publishedAt]
    .map((v) => (v ? Date.parse(v) : Number.NaN))
    .filter((t) => Number.isFinite(t));
  if (times.length === 0) return null;
  return new Date(Math.max(...times)).toISOString().split("T")[0];
}
