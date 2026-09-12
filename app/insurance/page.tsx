import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, faqSchema, definedTermSetSchema } from "@/lib/seo/structured-data";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { INSURANCE_INFORMATION_CHECKED_AT, INSURANCE_PRODUCT_EVIDENCE } from "@/lib/insurance-products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const revalidate = 3600;

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "보험·법률", url: `${SITE_URL}/category/insurance` },
  { name: "펫보험", url: `${SITE_URL}/insurance` },
]);

const INSURANCE_TERMS = definedTermSetSchema("펫보험 용어", [
  { name: "자기부담금", description: "보험 사고 발생 시 보험계약자가 직접 부담하는 금액. 정액(예: 1만원)과 정률(예: 20%) 방식이 있습니다." },
  { name: "면책 기간", description: "보험 가입 후 약관에서 정한 일정 기간 동안 일부 보장이 제외되는 기간. 상품과 질환별로 다르므로 약관을 확인해야 합니다." },
  { name: "연간 보상 한도", description: "1년간 지급받을 수 있는 최대 보험금 총액. 한도 초과분은 자비 부담이므로 반드시 확인이 필요합니다." },
  { name: "보장 제외 사항", description: "기존 질환이나 약관에서 정한 진료 항목처럼 보험금을 지급하지 않는 조건. 상품별 약관을 확인해야 합니다." },
]);

const FAQ = faqSchema([
  {
    question: "펫보험은 꼭 필요한가요?",
    answer: "가계 상황, 예상 의료비 부담과 비상자금을 함께 고려할 선택입니다. 보험료·보장·면책 조건을 확인한 뒤 판단하세요.",
    url: `${SITE_URL}/insurance`,
  },
  {
    question: "펫보험은 어떤 회사 제품이 있나요?",
    answer: "판매 상품과 이름은 보험사, 판매 채널과 시점에 따라 바뀝니다. 펫지기 확인 가이드에서 공식 채널 링크와 확인일을 제공하며, 가입 전 공식 상품공시를 다시 확인해야 합니다.",
    url: `${SITE_URL}/insurance/compare`,
  },
  {
    question: "펫보험 가입 전 꼭 확인해야 할 사항은?",
    answer: "상품·채널·약관 버전, 보장 범위, 자기부담금, 보상 한도, 항목별 대기기간과 면책, 갱신 및 가입 연령 조건을 확인하세요.",
    url: `${SITE_URL}/insurance/compare`,
  },
  {
    question: "펫보험 보험료는 얼마 정도인가요?",
    answer: "품종, 나이, 보장 범위, 자기부담금, 특약과 인수 심사에 따라 달라집니다. 동일 조건을 입력한 보험사 공식 설계 결과로 비교하세요.",
    url: `${SITE_URL}/insurance/compare`,
  },
  {
    question: "반려동물 관련 법적 분쟁이 생기면 어디에 문의하나요?",
    answer: "동물보호법 위반은 시군구 동물보호팀 또는 농림축산식품부 민원센터(1588-9060)에 신고하세요. 진료 과실 분쟁은 한국소비자원(1372) 또는 대한수의사회에 상담할 수 있습니다.",
    url: `${SITE_URL}/category/insurance`,
  },
]);

export const metadata: Metadata = {
  title: { absolute: "펫보험 안내 — 비교·선택 가이드 | 펫지기" },
  description:
    "보험사 공식 채널 확인 경로와 펫보험 약관·보장범위·자기부담금 비교 체크리스트를 안내합니다.",
  alternates: { canonical: "/insurance" },
  openGraph: {
    title: "펫보험 안내 — 비교·선택 가이드 | 펫지기",
    description: "보험사 공식 채널과 약관을 기준으로 확인하는 펫보험 선택 체크리스트.",
  },
};

const CHECKLIST = [
  { icon: "✅", title: "보장 범위 확인", desc: "통원·입원·수술 포함 여부, 치과·피부·안과 특약 유무" },
  { icon: "💰", title: "자기부담금·한도 비교", desc: "1회당 자기부담금(정액/정률), 연간 보상 한도 반드시 비교" },
  { icon: "🔄", title: "갱신 조건 파악", desc: "갱신형 보험료 인상률, 갱신 거절 사유 확인" },
  { icon: "⏳", title: "대기·면책 기간 확인", desc: "상품·질환별로 다른 보장 개시일과 제외 조건 확인" },
  { icon: "🐾", title: "품종·나이 제한", desc: "가입 시점의 약관과 공식 설계에서 가입 가능 여부 확인" },
  { icon: "📱", title: "청구 편의성", desc: "앱 간편 청구 여부, 제휴병원 수, 지급 소요 기간" },
];

export default function InsurancePage() {
  return (
    <AdPolicyProvider category={4}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(INSURANCE_TERMS) }} />
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href="/category/insurance" className="hover:text-[var(--brand-accent)] transition-colors">보험·법률</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">펫보험</span>
        </nav>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-2 sm:mb-3 tracking-tight" style={{ wordBreak: "keep-all" }} data-speakable>펫보험 안내</h1>
          <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl" style={{ wordBreak: "keep-all" }}>
            공식 채널과 가입 시점 약관을 기준으로 펫보험을 확인하는 방법을 안내합니다.
          </p>
        </div>

        <YmylDisclaimer categoryId={4} />

        {/* 펫보험 비교 바로가기 */}
        <section className="mb-10" aria-label="펫보험 비교">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--cat-4-soft)] to-white border border-[var(--brand-border)]">
            <h2 className="text-xl font-bold text-[var(--brand-text)] mb-2">공식 상품 정보 확인</h2>
            <p className="text-sm text-[var(--brand-text-secondary)] mb-4 leading-relaxed">
              확인일 {INSURANCE_INFORMATION_CHECKED_AT} 기준 공식 공개 페이지와, 동일 조건으로 비교할 체크포인트를 제공합니다.
            </p>
            <Link
              href="/insurance/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              📋 공식 정보 확인 가이드 →
            </Link>
          </div>
        </section>

        {/* 보험사별 상세 */}
        <section className="mb-10" aria-label="보험사별 상세">
          <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">보험사별 상품 상세</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INSURANCE_PRODUCT_EVIDENCE.map((ins) => (
              <Link
                key={ins.slug}
                href={`/insurance/${ins.slug}`}
                className="group p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors">
                    {ins.insurer}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--cat-4-soft)] text-[var(--cat-4)] font-semibold">
                    {ins.status === "confirmed" ? "공식 확인" : "확인 필요"}
                  </span>
                </div>
                <p className="text-xs text-[var(--brand-text-secondary)]">{ins.product ?? "현재 판매 상품 미확인"}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 가입 전 체크리스트 */}
        <section className="mb-10" aria-label="가입 전 체크리스트">
          <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">펫보험 가입 전 체크리스트</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHECKLIST.map((item) => (
              <div key={item.title} className="p-4 rounded-xl border border-[var(--brand-border)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">{item.icon}</span>
                  <span className="font-semibold text-sm text-[var(--brand-text)]">{item.title}</span>
                </div>
                <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10 pt-8 border-t border-[var(--brand-border)]" aria-label="자주 묻는 질문">
          <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">펫보험 자주 묻는 질문</h2>
          <dl className="space-y-3">
            {[
              { q: "펫보험은 꼭 필요한가요?", a: "가계 상황, 예상 의료비 부담과 비상자금을 함께 고려할 선택입니다. 보험료·보장·면책 조건을 확인한 뒤 판단하세요." },
              { q: "현재 판매 상품은 어떻게 확인하나요?", a: "판매 상품과 이름은 채널과 시점에 따라 바뀝니다. 보험사 공식 상품공시와 가입 화면에서 다시 확인하세요." },
              { q: "가입 전 꼭 확인해야 할 사항은?", a: "상품·채널·약관 버전, 보장 범위, 자기부담금, 보상 한도, 항목별 대기기간과 면책, 갱신 조건을 확인하세요." },
              { q: "보험료는 얼마인가요?", a: "품종, 나이, 보장 범위, 자기부담금, 특약과 인수 심사에 따라 달라집니다. 동일 조건의 공식 설계 결과로 비교하세요." },
              { q: "반려동물 관련 법적 분쟁이 생기면 어디에 문의하나요?", a: "동물보호법 위반은 시군구 동물보호팀 또는 농림축산식품부 민원센터(1588-9060)에 신고하세요. 진료 과실 분쟁은 한국소비자원(1372) 또는 대한수의사회에 상담할 수 있습니다." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4">
                <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">Q. {item.q}</dt>
                <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <AdSlot adType="adsense" format="horizontal" className="mb-10" />

        {/* 관련 가이드 */}
        <section className="mb-8" aria-label="관련 가이드">
          <h2 className="text-lg font-bold text-[var(--brand-text)] mb-4">보험·법률 가이드</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/guide/pet-insurance-before-joining", label: "펫보험 가입 전 꼭 알아야 할 7가지" },
              { href: "/guide/pet-insurance-claim-guide", label: "펫보험 보험금 청구 방법 완전 가이드" },
              { href: "/guide/pet-insurance-exclusions", label: "펫보험 면책 사항 완전 정복" },
              { href: "/guide/animal-protection-law-basics", label: "동물보호법 기초 — 보호자가 알아야 할 규정" },
              { href: "/guide/dog-bite-liability-guide", label: "반려견 사고 손해배상 책임 가이드" },
              { href: "/guide/animal-hospital-guide", label: "동물병원 선택 가이드" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-3 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-all text-sm text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        {/* 관련 링크 */}
        <section className="mt-8 pt-6 border-t border-[var(--brand-border)]">
          <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">함께 보면 좋은 정보</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/insurance/compare" className="text-sm text-[var(--brand-accent)] hover:underline">📋 펫보험 비교표 →</Link>
            <Link href="/category/insurance" className="text-sm text-[var(--brand-accent)] hover:underline">📚 보험·법률 가이드 →</Link>
            <Link href="/condition" className="text-sm text-[var(--brand-accent)] hover:underline">💊 질병·증상 정보 →</Link>
            <Link href="/guide" className="text-sm text-[var(--brand-accent)] hover:underline">📖 반려동물 가이드 →</Link>
          </div>
        </section>
      </main>
    </AdPolicyProvider>
  );
}
