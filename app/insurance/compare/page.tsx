import type { Metadata } from "next";
import Link from "next/link";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { InsuranceCompareTracker } from "@/components/analytics/insurance-compare-tracker";
import { INSURANCE_INFORMATION_CHECKED_AT, INSURANCE_PRODUCT_EVIDENCE } from "@/lib/insurance-products";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const metadata: Metadata = {
  title: { absolute: "펫보험 확인 가이드 — 공식 상품·약관 비교 | 펫지기" },
  description: "보험사 공식 채널에서 확인된 펫보험 상품과 비교 전에 확인할 계약 조건을 안내합니다.",
  alternates: { canonical: "/insurance/compare" },
};

const CHECK_ITEMS = [
  ["상품과 판매 채널", "같은 보험사도 다이렉트·설계사·재가입용 상품의 이름과 조건이 다를 수 있습니다."],
  ["약관 버전과 기준일", "가입 시점의 상품요약서와 약관을 열어 보장·면책·갱신 조건을 확인하세요."],
  ["실제 보험료", "품종, 나이, 보장비율, 자기부담금, 특약과 인수 심사 결과를 넣은 동일 조건의 설계 금액을 비교하세요."],
  ["보장과 제외 항목", "통원·입원·수술 한도뿐 아니라 기존 질환, 대기기간, 치과·피부·슬개골 등 제외 조건을 함께 확인하세요."],
  ["갱신 조건", "갱신 주기, 보험료 변동 가능성, 최대 보장 연령과 계약 종료 조건을 확인하세요."],
  ["청구 절차", "필요 서류, 청구 채널, 자기부담금과 지급 제한을 약관 및 공식 안내에서 확인하세요."],
] as const;

export default function InsuranceComparePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "보험·법률", url: `${SITE_URL}/category/insurance` },
    { name: "펫보험 확인 가이드", url: `${SITE_URL}/insurance/compare` },
  ]);

  return (
    <AdPolicyProvider category={4}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <InsuranceCompareTracker />
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 bg-[var(--brand-bg)]">
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
          <Link href="/">홈</Link><span aria-hidden="true">›</span><Link href="/category/insurance">보험·법률</Link><span aria-hidden="true">›</span><span aria-current="page">펫보험 확인 가이드</span>
        </nav>
        <header className="mb-7">
          <p className="text-xs font-semibold tracking-widest text-[var(--cat-4)] uppercase mb-2">보험·법률 · 펫보험</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-3">펫보험 공식 정보 확인 가이드</h1>
          <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed">특정 상품의 순위나 최저가를 정하지 않습니다. 같은 조건으로 공식 설계를 받은 뒤 약관을 비교할 수 있도록 확인 경로와 기준을 제공합니다.</p>
        </header>
        <YmylDisclaimer categoryId={4} />

        <section className="mt-8 mb-12" aria-labelledby="verified-products">
          <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
            <h2 id="verified-products" className="text-xl font-semibold text-[var(--brand-text)]">공식 채널 확인 현황</h2>
            <p className="text-xs text-[var(--brand-text-secondary)]">확인일: {INSURANCE_INFORMATION_CHECKED_AT}</p>
          </div>
          <div className="space-y-3">
            {INSURANCE_PRODUCT_EVIDENCE.map((item) => (
              <article key={item.slug} className="rounded-[var(--r-card)] border border-[var(--brand-border)] p-5">
                <div className="flex flex-wrap justify-between gap-2">
                  <div><h3 className="font-semibold text-[var(--brand-text)]">{item.insurer}</h3><p className="text-sm text-[var(--brand-text-secondary)] mt-1">{item.product ?? "현재 공식 판매 상품 미확인"} · {item.channel}</p></div>
                  <span className="text-xs font-semibold text-[var(--cat-4)]">{item.status === "confirmed" ? "공식 페이지 확인" : "추가 확인 필요"}</span>
                </div>
                {item.confirmedFacts.length > 0 && <ul className="mt-3 space-y-1 text-sm text-[var(--brand-text-secondary)] list-disc pl-5">{item.confirmedFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}
                <p className="text-xs text-[var(--brand-text-secondary)] mt-3">{item.note}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <Link href={`/insurance/${item.slug}`} className="text-[var(--cat-4)] hover:underline">확인 내용 보기</Link>
                  {item.officialUrl && <a href={item.officialUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-[var(--cat-4)] hover:underline">보험사 공식 페이지 ↗</a>}
                </div>
              </article>
            ))}
          </div>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-3">판매 상태와 약관은 확인일 이후 변경될 수 있습니다. 펫지기는 보험을 판매·중개하지 않으며 가입 가능 여부나 보험금 지급을 보장하지 않습니다.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-5">동일 조건 비교 체크리스트</h2>
          <ol className="space-y-3">{CHECK_ITEMS.map(([title, desc], index) => <li key={title} className="flex gap-4 p-5 rounded-[var(--r-card)] border border-[var(--brand-border)]"><span className="shrink-0 w-8 h-8 rounded-full bg-[var(--cat-4)] text-white flex items-center justify-center text-sm font-bold">{index + 1}</span><div><h3 className="font-semibold text-[var(--brand-text)]">{title}</h3><p className="text-sm text-[var(--brand-text-secondary)] mt-1">{desc}</p></div></li>)}</ol>
        </section>
      </main>
    </AdPolicyProvider>
  );
}
