import type { Metadata } from "next";
import Link from "next/link";
import { COMPARE_TYPES } from "@/lib/business-types";

const description =
  "펫지기가 공공데이터로 만든 지역 비교표와 글에 붙은 실용 도구(입양 예산표, 병원 방문 질문표, 보험 비교표)를 모았습니다.";

export const metadata: Metadata = {
  title: "반려동물 도구",
  description,
  alternates: { canonical: "/tools" },
  openGraph: { title: "반려동물 도구 | 펫지기", description, url: "/tools" },
};

const GUIDE_TOOLS = [
  {
    name: "입양 준비 예산표",
    href: "/guide/dog-adoption-checklist",
    desc: "초기 비용·매달 지출·비상 예비비를 직접 적어 합계를 확인합니다.",
  },
  {
    name: "동물병원 방문 전 질문표",
    href: "/guide/animal-hospital-guide",
    desc: "병원에 확인할 질문과 방문 준비물 체크리스트입니다.",
  },
  {
    name: "펫보험 같은 조건 비교표",
    href: "/insurance/compare",
    desc: "상품을 같은 항목으로 나란히 적어 비교합니다.",
  },
] as const;

export default function ToolsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-xl sm:text-3xl font-extrabold text-[var(--brand-text)] tracking-tight">
          반려동물 도구
        </h1>
        <p
          className="mt-2 text-sm text-[var(--brand-text-secondary)] leading-relaxed"
          style={{ wordBreak: "keep-all" }}
        >
          {description} 모든 도구는 순위나 추천이 아니라 공개된 수치와 직접
          확인할 항목만 제공합니다.
        </p>
      </header>

      <section className="mb-10" aria-label="지역 비교표">
        <h2 className="text-base font-bold mb-1">지역별 업체 수 비교표</h2>
        <p className="text-sm text-[var(--brand-text-secondary)] mb-3">
          시도·시군구별 등록 업체 수와 전화번호 기재율을 업종별로 비교합니다.
        </p>
        <ul className="flex flex-wrap gap-2 text-sm">
          {COMPARE_TYPES.map((t) => (
            <li key={t.type}>
              <Link
                href={`/tools/region-compare/${t.type}`}
                className="rounded-full border border-[var(--brand-border)] px-3 py-1 hover:border-[var(--brand-accent)]"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="글에 붙은 실용 도구">
        <h2 className="text-base font-bold mb-3">직접 적어 보는 도구</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {GUIDE_TOOLS.map((t) => (
            <li
              key={t.href}
              className="rounded-2xl border border-[var(--brand-border)] p-4"
            >
              <Link
                href={t.href}
                className="font-semibold hover:text-[var(--brand-accent)]"
              >
                {t.name}
              </Link>
              <p className="mt-1 text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                {t.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
