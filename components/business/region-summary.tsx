import type { RegionSummary } from "@/lib/region-summary";

type Props = {
  summary: RegionSummary;
  location: string;
  typeLabel: string;
  sidoName: string | null;
  asOfDate: string | null;
};

// 공공데이터 집계 수치와 표만 보여준다(영업 품질 평가·권유는 하지 않는다)
export function RegionSummaryBlock({
  summary,
  location,
  typeLabel,
  sidoName,
  asOfDate,
}: Props) {
  const hasYears = summary.yearCounts.some((y) => y.count > 0);
  return (
    <section
      className="mb-8"
      aria-label={`${location} ${typeLabel} 데이터 요약`}
    >
      <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">
        {location} {typeLabel} 데이터 요약
      </h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl border border-[var(--brand-border)] p-3">
          <dt className="text-xs text-[var(--brand-text-secondary)]">
            등록 업체
          </dt>
          <dd className="font-bold text-[var(--brand-text)]">
            {summary.total}곳
          </dd>
        </div>
        <div className="rounded-xl border border-[var(--brand-border)] p-3">
          <dt className="text-xs text-[var(--brand-text-secondary)]">
            전화번호 기재
          </dt>
          <dd className="font-bold text-[var(--brand-text)]">
            {summary.phoneCount}곳 ({summary.phonePercent}%)
          </dd>
        </div>
        {summary.sido && sidoName && (
          <div className="rounded-xl border border-[var(--brand-border)] p-3 col-span-2 sm:col-span-1">
            <dt className="text-xs text-[var(--brand-text-secondary)]">
              {sidoName} 내 업체 수 순위
            </dt>
            <dd className="font-bold text-[var(--brand-text)]">
              {summary.sido.of}개 시·군·구 중 {summary.sido.rank}위
              <span className="block text-xs font-normal text-[var(--brand-text-secondary)]">
                시·군·구 평균 {summary.sido.average}곳
              </span>
            </dd>
          </div>
        )}
      </dl>

      {hasYears && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <caption className="text-left text-xs text-[var(--brand-text-secondary)] mb-1">
              인허가·등록 연도별 업체 수 (현재 영업 중으로 표시된 업체 기준)
            </caption>
            <thead>
              <tr className="text-left text-xs text-[var(--brand-text-secondary)]">
                {summary.yearCounts.map((y) => (
                  <th
                    key={y.year}
                    scope="col"
                    className="py-1 pr-4 font-medium"
                  >
                    {y.year}년
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="font-semibold text-[var(--brand-text)]">
                {summary.yearCounts.map((y) => (
                  <td key={y.year} className="py-1 pr-4">
                    {y.count}곳
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {summary.topDongs.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-[var(--brand-text-secondary)] mb-1">
            업체가 많은 읍·면·동
          </h3>
          <ol className="flex flex-wrap gap-2 text-sm">
            {summary.topDongs.map((d) => (
              <li
                key={d.name}
                className="rounded-full border border-[var(--brand-border)] px-3 py-1"
              >
                {d.name} <strong>{d.count}곳</strong>
              </li>
            ))}
          </ol>
        </div>
      )}

      <p className="mt-3 text-xs text-[var(--brand-text-secondary)]">
        공공데이터{asOfDate ? ` ${asOfDate} 기준` : ""} 집계입니다. 최근 연도는
        기준일까지만 반영되고, 인허가·폐업 정보가 늦게 반영될 수 있어 실제와
        다를 수 있습니다.
      </p>
    </section>
  );
}
