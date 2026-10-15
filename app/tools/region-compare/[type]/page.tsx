import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARE_TYPES, findCompareType } from "@/lib/business-types";
import { getCachedRegionCompare } from "@/lib/region-compare-query";
import { groupBySido, splitUnclassified } from "@/lib/region-compare";
import { getCachedTypeSourceAsOf } from "@/lib/db-queries";
import { LISTING_MIN_INDEXABLE } from "@/lib/seo/indexability-policy";

export const revalidate = 86400;

export function generateStaticParams() {
  return COMPARE_TYPES.map((t) => ({ type: t.type }));
}

type Props = { params: Promise<{ type: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = findCompareType((await params).type);
  if (!meta) return {};
  const title = `시도·시군구별 ${meta.label} 수 비교`;
  const description = `전국 시도·시군구별 ${meta.label} 등록 수와 전화번호 기재율을 공공데이터로 비교한 표입니다.`;
  const canonical = `/tools/region-compare/${meta.type}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title: `${title} | 펫지기`, description, url: canonical },
  };
}

export default async function RegionComparePage({ params }: Props) {
  const meta = findCompareType((await params).type);
  if (!meta) notFound();

  const [rows, collectedAt] = await Promise.all([
    getCachedRegionCompare(meta.type),
    getCachedTypeSourceAsOf(meta.type),
  ]);
  const { classified, unclassified } = splitUnclassified(rows);
  const groups = groupBySido(classified);
  const nationalTotal = groups.reduce((sum, g) => sum + g.total, 0);
  const collectedDate = collectedAt?.slice(0, 10) ?? null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <nav
        className="text-xs text-[var(--brand-text-secondary)] mb-6"
        aria-label="breadcrumb"
      >
        <Link href="/" className="hover:text-[var(--brand-accent)]">
          홈
        </Link>
        <span aria-hidden="true"> › </span>
        <Link href="/tools" className="hover:text-[var(--brand-accent)]">
          도구
        </Link>
        <span aria-hidden="true"> › </span>
        <span aria-current="page">{meta.label} 지역 비교</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold text-[var(--brand-text)] tracking-tight">
          시도·시군구별 {meta.label} 수 비교
        </h1>
        <p
          className="mt-2 text-sm text-[var(--brand-text-secondary)] leading-relaxed"
          style={{ wordBreak: "keep-all" }}
        >
          펫지기가 수집한 공공데이터 범위에서 영업 중으로 기록된 {meta.label}을
          시도·시군구별로 집계했습니다. 시·군·구를 확인할 수 있는 업체{" "}
          {nationalTotal.toLocaleString("ko-KR")}곳이 표에 포함되며, 업체의
          품질이나 추천 순위가 아니라 등록 현황 수치입니다.
        </p>
        <ul
          className="mt-4 flex flex-wrap gap-2 text-sm"
          aria-label="업종 선택"
        >
          {COMPARE_TYPES.map((t) => (
            <li key={t.type}>
              <Link
                href={`/tools/region-compare/${t.type}`}
                aria-current={t.type === meta.type ? "page" : undefined}
                className={`rounded-full border px-3 py-1 ${
                  t.type === meta.type
                    ? "border-[var(--brand-accent)] font-semibold text-[var(--brand-accent)]"
                    : "border-[var(--brand-border)]"
                }`}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <section aria-label="시도별 합계" className="mb-10 overflow-x-auto">
        <h2 className="text-base font-bold text-[var(--brand-text)] mb-2">
          시도별 합계
        </h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-xs text-[var(--brand-text-secondary)] border-b border-[var(--brand-border)]">
              <th scope="col" className="py-2 pr-4 font-medium">
                시도
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                업체 수
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                전화번호 기재율
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g, i) => (
              <tr
                key={g.sido}
                className="border-b border-[var(--brand-border)]"
              >
                <th scope="row" className="py-2 pr-4 text-left font-medium">
                  <a
                    href={`#sido-${i}`}
                    className="hover:text-[var(--brand-accent)]"
                  >
                    {g.sido}
                  </a>
                </th>
                <td className="py-2 pr-4">
                  {g.total.toLocaleString("ko-KR")}곳
                </td>
                <td className="py-2 pr-4">{g.phonePercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {groups.map((g, i) => (
        <section
          key={g.sido}
          id={`sido-${i}`}
          className="mb-10 overflow-x-auto"
          aria-label={`${g.sido} 시군구별`}
        >
          <h2 className="text-base font-bold text-[var(--brand-text)] mb-2">
            {g.sido}{" "}
            <span className="font-normal text-[var(--brand-text-secondary)]">
              ({g.total.toLocaleString("ko-KR")}곳)
            </span>
          </h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs text-[var(--brand-text-secondary)] border-b border-[var(--brand-border)]">
                <th scope="col" className="py-2 pr-4 font-medium">
                  시·군·구
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  업체 수
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  전화번호 기재
                </th>
              </tr>
            </thead>
            <tbody>
              {g.sigungus.map((s) => (
                <tr
                  key={s.sigungu}
                  className="border-b border-[var(--brand-border)]"
                >
                  <th scope="row" className="py-2 pr-4 text-left font-medium">
                    {s.sigunguSlug && s.count >= LISTING_MIN_INDEXABLE ? (
                      <Link
                        href={`/${s.sigunguSlug}/${meta.type}`}
                        className="hover:text-[var(--brand-accent)]"
                      >
                        {s.sigungu}
                      </Link>
                    ) : (
                      s.sigungu
                    )}
                  </th>
                  <td className="py-2 pr-4">{s.count}곳</td>
                  <td className="py-2 pr-4">{s.phoneCount}곳</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      <p className="text-xs text-[var(--brand-text-secondary)]">
        출처: 공공데이터포털 등 공공 인허가·등록 데이터. 이 업종의 마지막 수집일은{" "}
        {collectedDate ?? "확인 불가"}이며, 원본 갱신 시점은 업종마다 달라 실제 영업
        여부와 차이가 있을 수 있으니 방문 전 확인이 필요합니다. 종류·이름·주소가
        같은 업체가 출처 두 곳에 있으면 한 곳으로 세고, 주소가 비어 있거나 가려진
        업체는 같은 업체로 합치지 않습니다. 전화번호 기재는 공공데이터에 번호가
        적혀 있다는 뜻이며 실제 연락 가능 여부를 확인한 것은 아닙니다.
        {unclassified.count > 0
          ? ` 주소에서 시·군·구를 확인할 수 없어 표에서 제외한 업체가 ${unclassified.count.toLocaleString("ko-KR")}곳 있습니다.`
          : ""}
      </p>
    </main>
  );
}
