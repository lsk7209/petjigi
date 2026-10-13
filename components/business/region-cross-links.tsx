import Link from "next/link";
import { COMPARE_TYPES } from "@/lib/business-types";

// 사이트맵 하한(next-sitemap.config.js LISTING_MIN_SITEMAP)과 같은 기준으로 링크할 업종을 고른다
const MIN_LINKED_COUNT = 3;

type Props = {
  sigunguSlug: string;
  location: string;
  currentType: string;
  typeLabel: string;
  typeCounts: { type: string; count: number }[];
  compareType: boolean;
};

export function RegionCrossLinks({
  sigunguSlug,
  location,
  currentType,
  typeLabel,
  typeCounts,
  compareType,
}: Props) {
  const others = COMPARE_TYPES.flatMap((t) => {
    const found = typeCounts.find((c) => c.type === t.type);
    return t.type !== currentType && found && found.count >= MIN_LINKED_COUNT
      ? [{ ...t, count: found.count }]
      : [];
  });
  if (others.length === 0 && !compareType) return null;
  return (
    <nav className="mt-10" aria-label={`${location} 관련 페이지`}>
      {others.length > 0 && (
        <>
          <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">{location}의 다른 업종</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {others.map((t) => (
              <li key={t.type}>
                <Link
                  href={`/${sigunguSlug}/${t.type}`}
                  className="rounded-full border border-[var(--brand-border)] px-3 py-1 hover:border-[var(--brand-accent)]"
                >
                  {location} {t.label} <strong>{t.count}곳</strong>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {compareType && (
        <p className="mt-4 text-sm">
          <Link href={`/tools/region-compare/${currentType}`} className="text-[var(--brand-accent)] hover:underline">
            전국 시도·시군구별 {typeLabel} 수 비교표 보기 →
          </Link>
        </p>
      )}
    </nav>
  );
}
