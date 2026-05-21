import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const revalidate = 3600;

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "보험·법률", url: `${SITE_URL}/category/insurance` },
  { name: "펫보험", url: `${SITE_URL}/insurance` },
]);

const FAQ = faqSchema([
  {
    question: "펫보험은 꼭 필요한가요?",
    answer: "반려동물 의료비는 예측이 어렵고, 수술 한 건에 100만~500만원 이상이 발생하기도 합니다. 건강할 때, 특히 1~2세 이전에 가입하면 보험료가 낮고 보장 범위가 넓어 경제적 리스크를 줄일 수 있습니다.",
    url: `${SITE_URL}/insurance`,
  },
  {
    question: "펫보험은 어떤 회사 제품이 있나요?",
    answer: "국내 주요 펫보험은 현대해상(하이펫), DB손보(다이렉트펫), KB손보(KB금쪽같은펫보험), 삼성화재(마이펫), 한화손보(한화펫보험), 메리츠화재(메리츠펫보험) 등이 있습니다.",
    url: `${SITE_URL}/insurance/compare`,
  },
  {
    question: "펫보험 가입 전 꼭 확인해야 할 사항은?",
    answer: "보장 범위(통원·입원·수술), 자기부담금, 연간 보상 한도, 면책 기간(통상 30일), 선천성·유전성 질환 면책 여부, 갱신 시 보험료 인상 조건, 가입 가능 최대 연령을 반드시 확인하세요.",
    url: `${SITE_URL}/insurance/compare`,
  },
  {
    question: "펫보험 보험료는 얼마 정도인가요?",
    answer: "품종, 나이, 보장 범위에 따라 다르지만, 소형견 기준 월 2~5만원, 대형견은 월 5~10만원 수준이 일반적입니다. 고양이는 품종에 따라 월 2~6만원 수준입니다.",
    url: `${SITE_URL}/insurance/compare`,
  },
  {
    question: "반려동물 관련 법적 분쟁이 생기면 어디에 문의하나요?",
    answer: "동물보호법 위반은 시군구 동물보호팀 또는 농림축산식품부 민원센터(1588-9060)에 신고하세요. 진료 과실 분쟁은 한국소비자원(1372) 또는 대한수의사회에 상담할 수 있습니다.",
    url: `${SITE_URL}/category/insurance`,
  },
]);

export const metadata: Metadata = {
  title: "펫보험 안내 — 비교·선택 가이드 | 펫지기",
  description:
    "국내 주요 6대 손보사 펫보험 비교, 보장범위·보험료·자기부담금 안내. 반려동물 보험 선택 전 꼭 알아야 할 핵심 정보를 수의사·금융 전문가 검토를 거쳐 제공합니다.",
  alternates: { canonical: "/insurance" },
  openGraph: {
    title: "펫보험 안내 — 비교·선택 가이드 | 펫지기",
    description: "6대 손보사 펫보험 비교 및 선택 가이드. 보장범위·보험료·자기부담금 핵심 체크리스트.",
  },
};

const INSURERS = [
  { slug: "hyundai", name: "현대해상", product: "하이펫보험", point: "점유율 1위" },
  { slug: "db", name: "DB손보", product: "다이렉트 펫", point: "보험료 절감" },
  { slug: "kb", name: "KB손보", product: "KB금쪽같은펫보험", point: "보장 폭 넓음" },
  { slug: "samsung", name: "삼성화재", product: "마이펫보험", point: "브랜드 신뢰" },
  { slug: "hanwha", name: "한화손보", product: "한화펫보험", point: "중소형 특화" },
  { slug: "meritz", name: "메리츠화재", product: "메리츠펫보험", point: "고령 친화" },
];

const CHECKLIST = [
  { icon: "✅", title: "보장 범위 확인", desc: "통원·입원·수술 포함 여부, 치과·피부·안과 특약 유무" },
  { icon: "💰", title: "자기부담금·한도 비교", desc: "1회당 자기부담금(정액/정률), 연간 보상 한도 반드시 비교" },
  { icon: "🔄", title: "갱신 조건 파악", desc: "갱신형 보험료 인상률, 갱신 거절 사유 확인" },
  { icon: "⏳", title: "면책 기간 확인", desc: "가입 후 통상 30일(수술 90일) 보장 제외" },
  { icon: "🐾", title: "품종·나이 제한", desc: "가입 가능 연령(보통 만 8~10세까지), 품종별 제한 여부" },
  { icon: "📱", title: "청구 편의성", desc: "앱 간편 청구 여부, 제휴병원 수, 지급 소요 기간" },
];

export default function InsurancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href="/category/insurance" className="hover:text-[var(--brand-accent)] transition-colors">보험·법률</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">펫보험</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-3">펫보험 안내</h1>
          <p className="text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl">
            국내 6대 손보사 펫보험을 비교하고, 반려동물에게 맞는 보험을 선택하는 데 필요한 핵심 정보를 안내합니다.
          </p>
        </div>

        <YmylDisclaimer categoryId={4} />

        {/* 펫보험 비교 바로가기 */}
        <section className="mb-10" aria-label="펫보험 비교">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--cat-4-soft)] to-white border border-[var(--brand-border)]">
            <h2 className="text-xl font-bold text-[var(--brand-text)] mb-2">6대 손보사 펫보험 한눈에 비교</h2>
            <p className="text-sm text-[var(--brand-text-secondary)] mb-4 leading-relaxed">
              현대해상·DB손보·KB손보·삼성화재·한화손보·메리츠화재 주요 상품을 보장범위·보험료·자기부담금 기준으로 비교합니다.
            </p>
            <Link
              href="/insurance/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              📋 펫보험 비교표 보기 →
            </Link>
          </div>
        </section>

        {/* 보험사별 상세 */}
        <section className="mb-10" aria-label="보험사별 상세">
          <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">보험사별 상품 상세</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INSURERS.map((ins) => (
              <Link
                key={ins.slug}
                href={`/insurance/${ins.slug}`}
                className="group p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors">
                    {ins.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--cat-4-soft)] text-[var(--cat-4)] font-semibold">
                    {ins.point}
                  </span>
                </div>
                <p className="text-xs text-[var(--brand-text-secondary)]">{ins.product}</p>
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
              { q: "펫보험은 꼭 필요한가요?", a: "반려동물 의료비는 예측이 어렵고, 수술 한 건에 100만~500만원 이상이 발생하기도 합니다. 건강할 때, 특히 1~2세 이전에 가입하면 보험료가 낮고 보장 범위가 넓어 경제적 리스크를 줄일 수 있습니다." },
              { q: "펫보험은 어떤 회사 제품이 있나요?", a: "국내 주요 펫보험은 현대해상(하이펫), DB손보(다이렉트펫), KB손보(KB금쪽같은펫보험), 삼성화재(마이펫), 한화손보(한화펫보험), 메리츠화재(메리츠펫보험) 등이 있습니다." },
              { q: "펫보험 가입 전 꼭 확인해야 할 사항은?", a: "보장 범위(통원·입원·수술), 자기부담금, 연간 보상 한도, 면책 기간(통상 30일), 선천성·유전성 질환 면책 여부, 갱신 시 보험료 인상 조건, 가입 가능 최대 연령을 반드시 확인하세요." },
              { q: "펫보험 보험료는 얼마 정도인가요?", a: "품종, 나이, 보장 범위에 따라 다르지만, 소형견 기준 월 2~5만원, 대형견은 월 5~10만원 수준이 일반적입니다. 고양이는 품종에 따라 월 2~6만원 수준입니다." },
              { q: "반려동물 관련 법적 분쟁이 생기면 어디에 문의하나요?", a: "동물보호법 위반은 시군구 동물보호팀 또는 농림축산식품부 민원센터(1588-9060)에 신고하세요. 진료 과실 분쟁은 한국소비자원(1372) 또는 대한수의사회에 상담할 수 있습니다." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4">
                <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">Q. {item.q}</dt>
                <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

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
    </>
  );
}
