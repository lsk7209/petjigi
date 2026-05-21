import type { Metadata } from "next";
import Link from "next/link";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";

export const metadata: Metadata = {
  title: "펫보험 비교 — 6대 손보사 체크리스트 | 펫지기",
  description:
    "현대해상·DB손보·KB손보·삼성화재·한화손보·메리츠화재 주요 펫보험 상품을 한눈에 비교하세요. 보장범위·보험료·자기부담금 핵심 체크리스트를 제공합니다.",
  alternates: { canonical: "/insurance/compare" },
  openGraph: {
    title: "펫보험 비교 — 6대 손보사 체크리스트 | 펫지기",
    description: "보장범위·보험료·자기부담금을 기준으로 6대 손보사 펫보험을 비교합니다.",
  },
};

const CHECK_ITEMS = [
  {
    title: "보장 범위",
    desc: "입원·통원·수술 여부, 치과·안과·피부 질환 포함 여부, 선천성·유전성 질환 면책 조건을 확인하세요.",
  },
  {
    title: "자기부담금 & 보상 한도",
    desc: "방문 1회당 자기부담금(정액/정률), 연간·항목별 보상 한도를 반드시 비교하세요.",
  },
  {
    title: "갱신형 vs 비갱신형",
    desc: "갱신형은 보험료가 오를 수 있습니다. 만 3세 이후 보험료 인상 조건과 갱신 거절 사유를 확인하세요.",
  },
  {
    title: "면책 기간",
    desc: "가입 후 통상 30일(수술 90일)은 보장이 되지 않습니다. 기존 질환이 있다면 고지의무 위반에 주의하세요.",
  },
  {
    title: "청구 절차",
    desc: "앱 간편 청구 여부, 서류 제출 방식, 평균 지급 소요일을 비교하면 실사용 편의성을 파악할 수 있습니다.",
  },
  {
    title: "나이 제한",
    desc: "가입 가능 연령(보통 만 8~10세까지)과 갱신 상한 나이를 꼭 체크하세요. 노령견·노령묘일수록 조건이 까다롭습니다.",
  },
];

const INSURERS = [
  { name: "현대해상", slug: "hyundai" },
  { name: "DB손보", slug: "db" },
  { name: "KB손보", slug: "kb" },
  { name: "삼성화재", slug: "samsung" },
  { name: "한화손보", slug: "hanwha" },
  { name: "메리츠화재", slug: "meritz" },
];

export default function InsuranceComparePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 bg-[var(--brand-bg)]">
      {/* 준비 중 배너 */}
      <div className="mb-10 rounded-[var(--radius-card)] border border-[var(--brand-accent)] bg-[var(--brand-border)] px-6 py-5 text-center">
        <p className="text-lg font-semibold text-[var(--brand-text)] mb-1">
          펫보험 실시간 비교 — 출시 예정
        </p>
        <p className="text-sm text-[var(--brand-text-secondary)]">
          6대 손보사 보험료·보장 조건 자동 비교 기능을 준비하고 있습니다.
          <br />
          아래 체크리스트를 참고해 직접 비교해보세요.
        </p>
      </div>

      <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-2">
        펫보험 비교
      </h1>
      <p className="text-[var(--brand-text-secondary)] mb-8">
        가입 전 반드시 확인해야 할 6가지 체크포인트를 정리했습니다.
      </p>

      <YmylDisclaimer categoryId={4} />

      {/* 체크리스트 */}
      <section className="mt-8 mb-12">
        <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-5">
          펫보험 선택 전 확인 사항
        </h2>
        <ol className="space-y-4">
          {CHECK_ITEMS.map((item, i) => (
            <li
              key={i}
              className="flex gap-4 p-5 rounded-[var(--radius-card)] border border-[var(--brand-border)]"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--brand-accent)] text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-[var(--brand-text)] mb-1">
                  {item.title}
                </p>
                <p className="text-sm text-[var(--brand-text-secondary)]">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 보험사별 링크 */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-5">
          보험사별 상품 안내
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INSURERS.map((ins) => (
            <Link
              key={ins.slug}
              href={`/insurance/${ins.slug}`}
              className="p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors text-center"
            >
              <span className="font-semibold text-[var(--brand-text)] text-sm">
                {ins.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
