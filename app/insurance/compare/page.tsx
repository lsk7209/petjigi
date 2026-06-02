import type { Metadata } from "next";
import Link from "next/link";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { ShareButtons } from "@/components/content/share-buttons";
import { breadcrumbSchema, faqSchema, howToSchema } from "@/lib/seo/structured-data";
import { getCachedCategoryGuides, getCachedCategoryBlogPosts } from "@/lib/db-queries";
import { InsuranceCompareTracker } from "@/components/analytics/insurance-compare-tracker";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "보험·법률", url: `${SITE_URL}/category/insurance` },
  { name: "펫보험 비교", url: `${SITE_URL}/insurance/compare` },
]);

const HOW_TO = howToSchema("펫보험 선택 방법", [
  { name: "보장 범위 확인", text: "입원·통원·수술 여부, 치과·안과·피부 질환 포함 여부, 선천성·유전성 질환 면책 조건을 확인하세요." },
  { name: "자기부담금 & 보상 한도 비교", text: "방문 1회당 자기부담금(정액/정률), 연간·항목별 보상 한도를 반드시 비교하세요." },
  { name: "갱신형 vs 비갱신형 선택", text: "갱신형은 보험료가 오를 수 있습니다. 만 3세 이후 보험료 인상 조건과 갱신 거절 사유를 확인하세요." },
  { name: "면책 기간 파악", text: "가입 후 통상 30일(수술 90일)은 보장이 되지 않습니다. 기존 질환이 있다면 고지의무 위반에 주의하세요." },
  { name: "청구 절차 비교", text: "앱 간편 청구 여부, 서류 제출 방식, 평균 지급 소요일을 비교하면 실사용 편의성을 파악할 수 있습니다." },
  { name: "나이 제한 확인", text: "가입 가능 연령(보통 만 8~10세까지)과 갱신 상한 나이를 꼭 체크하세요. 노령견·노령묘일수록 조건이 까다롭습니다." },
]);

const FAQ = faqSchema([
  { question: "펫보험은 언제 가입하는 것이 유리한가요?", answer: "어릴 때 건강할수록 보험료가 낮고 면책 조건이 적습니다. 대부분 만 8~10세부터 신규 가입이 제한되므로, 어린 나이에 가입하는 것이 유리합니다.", url: `${SITE_URL}/insurance/compare` },
  { question: "펫보험 자기부담금이란 무엇인가요?", answer: "자기부담금은 보험금 청구 시 본인이 부담하는 금액입니다. 정액(예: 1만원)과 정률(예: 20%) 방식이 있으며, 낮을수록 보험료는 높아집니다.", url: `${SITE_URL}/insurance/compare` },
  { question: "선천성·유전성 질환도 보장되나요?", answer: "대부분의 펫보험은 선천성·유전성 질환을 면책 처리합니다. 상품마다 다르므로 약관의 면책 조항을 반드시 확인하세요.", url: `${SITE_URL}/insurance/compare` },
  { question: "펫보험 보험료는 어떻게 결정되나요?", answer: "품종, 나이, 성별, 보장 범위, 자기부담금 수준에 따라 달라집니다. 대형견·고령·특정 고위험 품종은 보험료가 높거나 가입이 제한될 수 있습니다.", url: `${SITE_URL}/insurance/compare` },
  { question: "갱신형과 비갱신형 중 어떤 것이 좋나요?", answer: "갱신형은 초기 보험료가 낮지만 갱신 시 인상 위험이 있습니다. 비갱신형은 보험료가 고정되지만 초기 납입액이 높습니다. 장기 보유 계획이라면 갱신 조건을 꼼꼼히 따져보세요.", url: `${SITE_URL}/insurance/compare` },
]);

export const metadata: Metadata = {
  title: "펫보험 비교 — 6대 손보사 한눈에 비교 | 펫지기",
  description:
    "현대해상·DB손보·KB손보·삼성화재·한화손보·메리츠화재 주요 펫보험 상품을 한눈에 비교하세요. 보장범위·보험료·자기부담금·가입 연령 핵심 체크리스트를 제공합니다.",
  alternates: { canonical: "/insurance/compare" },
  openGraph: {
    title: "펫보험 비교 — 6대 손보사 한눈에 비교 | 펫지기",
    description: "보장범위·보험료·자기부담금·가입 연령 기준으로 6대 손보사 펫보험을 비교합니다.",
  },
};

const COMPARE_TABLE = [
  {
    slug: "hyundai",
    name: "현대해상",
    product: "하이펫보험",
    point: "점유율 1위",
    joinAge: "만 8세",
    renewAge: "만 10세",
    coverage: "통원·입원·수술",
    strength: "제휴병원 네트워크",
    digital: "앱 청구 ✓",
  },
  {
    slug: "db",
    name: "DB손보",
    product: "다이렉트 펫",
    point: "보험료 절감",
    joinAge: "만 8세",
    renewAge: "만 10세",
    coverage: "통원·입원·수술",
    strength: "온라인 다이렉트",
    digital: "앱 청구 ✓",
  },
  {
    slug: "kb",
    name: "KB손보",
    product: "펫코노미",
    point: "실손 방식",
    joinAge: "만 8세",
    renewAge: "만 10세",
    coverage: "통원·입원·수술",
    strength: "고액치료비 유리",
    digital: "앱 청구 ✓",
  },
  {
    slug: "samsung",
    name: "삼성화재",
    product: "애니펫",
    point: "최고 보장 한도",
    joinAge: "만 8세",
    renewAge: "만 10세",
    coverage: "통원·입원·수술+특약",
    strength: "보장 한도 업계 최고",
    digital: "앱 청구 ✓",
  },
  {
    slug: "hanwha",
    name: "한화손보",
    product: "레저펫",
    point: "배상책임 포함",
    joinAge: "만 8세",
    renewAge: "만 10세",
    coverage: "통원·입원·수술+배상",
    strength: "배상책임 특약",
    digital: "앱 청구 ✓",
  },
  {
    slug: "meritz",
    name: "메리츠화재",
    product: "퍼피라이프",
    point: "노령 특화",
    joinAge: "만 10세",
    renewAge: "만 12세",
    coverage: "통원·입원·수술",
    strength: "고령 가입 가능",
    digital: "앱 청구 ✓",
  },
];

const CHECK_ITEMS = [
  { title: "보장 범위", desc: "입원·통원·수술 여부, 치과·안과·피부 질환 포함 여부, 선천성·유전성 질환 면책 조건을 확인하세요." },
  { title: "자기부담금 & 보상 한도", desc: "방문 1회당 자기부담금(정액/정률), 연간·항목별 보상 한도를 반드시 비교하세요." },
  { title: "갱신형 vs 비갱신형", desc: "갱신형은 보험료가 오를 수 있습니다. 만 3세 이후 보험료 인상 조건과 갱신 거절 사유를 확인하세요." },
  { title: "면책 기간", desc: "가입 후 통상 30일(수술 90일)은 보장이 되지 않습니다. 기존 질환이 있다면 고지의무 위반에 주의하세요." },
  { title: "청구 절차", desc: "앱 간편 청구 여부, 서류 제출 방식, 평균 지급 소요일을 비교하면 실사용 편의성을 파악할 수 있습니다." },
  { title: "나이 제한", desc: "가입 가능 연령(보통 만 8~10세까지)과 갱신 상한 나이를 꼭 체크하세요. 노령견·노령묘일수록 조건이 까다롭습니다." },
];

export default async function InsuranceComparePage() {
  const [insuranceGuides, insuranceBlogs] = await Promise.all([
    getCachedCategoryGuides(4),
    getCachedCategoryBlogPosts(4),
  ]);

  return (
    <AdPolicyProvider category={4}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOW_TO) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }} />
      <InsuranceCompareTracker />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 bg-[var(--brand-bg)]">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href="/category/insurance" className="hover:text-[var(--brand-accent)] transition-colors">보험·법률</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">펫보험 비교</span>
        </nav>

        <header className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold tracking-widest text-[var(--cat-4)] uppercase mb-2">
            보험·법률 · 펫보험
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-2 tracking-tight" style={{ wordBreak: "keep-all" }} data-speakable>펫보험 비교</h1>
          <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed" style={{ wordBreak: "keep-all" }}>
            6대 손보사 주요 펫보험 상품의 특징을 한눈에 비교하고, 우리 아이에게 맞는 상품을 선택하세요.
          </p>
        </header>

        <YmylDisclaimer categoryId={4} />

        {/* 비교 테이블 */}
        <section className="mt-8 mb-12">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-4">6대 손보사 상품 비교</h2>
          <div className="overflow-x-auto rounded-[var(--r-card)] border border-[var(--brand-border)]">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-[var(--brand-surface-2)] text-[var(--brand-text)]">
                  <th className="text-left px-4 py-3 font-semibold">보험사</th>
                  <th className="text-left px-4 py-3 font-semibold">상품명</th>
                  <th className="text-left px-4 py-3 font-semibold">핵심 강점</th>
                  <th className="text-left px-4 py-3 font-semibold">보장</th>
                  <th className="text-left px-4 py-3 font-semibold">신규 가입 연령</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_TABLE.map((row, i) => (
                  <tr key={row.slug} className={i % 2 === 0 ? "bg-[var(--brand-bg)]" : "bg-[var(--brand-surface)]"}>
                    <td className="px-4 py-3">
                      <Link
                        href={`/insurance/${row.slug}`}
                        className="font-semibold text-[var(--cat-4)] hover:underline"
                      >
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[var(--brand-text)]">{row.product}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-[var(--cat-4-soft)] text-[var(--cat-4)] text-xs font-semibold px-2 py-0.5 rounded-full">
                        {row.point}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--brand-text-secondary)] text-xs">{row.coverage}</td>
                    <td className="px-4 py-3 text-[var(--brand-text-secondary)]">{row.joinAge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-2">
            * 위 정보는 참고용이며, 실제 상품 조건은 각 보험사 공식 채널에서 확인하세요.
          </p>
        </section>

        {/* 상황별 추천 */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-4">상황별 추천</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "처음 가입하는 어린 반려동물", rec: "현대해상 하이펫보험", reason: "제휴병원이 많고 검증된 운용 실적" },
              { title: "보험료를 아끼고 싶을 때", rec: "DB손보 다이렉트", reason: "온라인 직접 가입으로 수수료 절감" },
              { title: "대형 수술 대비가 목적", rec: "KB손보 펫코노미 / 삼성화재 애니펫", reason: "실손 방식 또는 높은 수술 한도" },
              { title: "산책 중 사고 걱정이 있을 때", rec: "한화손보 레저펫", reason: "배상책임 특약으로 타인 피해 대비" },
              { title: "이미 나이 든 반려동물", rec: "메리츠화재 퍼피라이프", reason: "만 10세까지 신규 가입 가능" },
              { title: "보장 범위를 최대화하고 싶을 때", rec: "삼성화재 애니펫", reason: "업계 최고 수준 보장 한도 + 다양한 특약" },
            ].map((item, i) => (
              <div key={i} className="rounded-[var(--r-card)] border border-[var(--brand-border)] p-4">
                <p className="text-xs text-[var(--brand-text-secondary)] mb-1">{item.title}</p>
                <p className="font-semibold text-[var(--cat-4)] text-sm mb-0.5">{item.rec}</p>
                <p className="text-xs text-[var(--brand-text-secondary)]">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 선택 체크리스트 */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-5">가입 전 확인 체크리스트 6가지</h2>
          <ol className="space-y-4">
            {CHECK_ITEMS.map((item, i) => (
              <li key={i} className="flex gap-4 p-5 rounded-[var(--r-card)] border border-[var(--brand-border)]">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--cat-4)] text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-[var(--brand-text)] mb-1">{item.title}</p>
                  <p className="text-sm text-[var(--brand-text-secondary)]">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-4">펫보험 자주 묻는 질문</h2>
          <div className="space-y-3">
            {[
              { q: "펫보험은 언제 가입하는 것이 유리한가요?", a: "어릴 때 건강할수록 보험료가 낮고 면책 조건이 적습니다. 대부분 만 8~10세부터 신규 가입이 제한되므로, 어린 나이에 가입하는 것이 유리합니다." },
              { q: "자기부담금이란 무엇인가요?", a: "자기부담금은 보험금 청구 시 본인이 부담하는 금액입니다. 정액(예: 1만원)과 정률(예: 20%) 방식이 있으며, 낮을수록 보험료는 높아집니다." },
              { q: "선천성·유전성 질환도 보장되나요?", a: "대부분의 펫보험은 선천성·유전성 질환을 면책 처리합니다. 상품마다 다르므로 약관의 면책 조항을 반드시 확인하세요." },
              { q: "펫보험 보험료는 어떻게 결정되나요?", a: "품종, 나이, 성별, 보장 범위, 자기부담금 수준에 따라 달라집니다. 대형견·고령·특정 고위험 품종은 보험료가 높거나 가입이 제한될 수 있습니다." },
              { q: "갱신형과 비갱신형 중 어떤 것이 좋나요?", a: "갱신형은 초기 보험료가 낮지만 갱신 시 인상 위험이 있습니다. 비갱신형은 보험료가 고정되지만 초기 납입액이 높습니다. 장기 보유 계획이라면 갱신 조건을 꼼꼼히 따져보세요." },
            ].map(({ q, a }, i) => (
              <details key={i} className="group rounded-xl border border-[var(--brand-border)] overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer text-sm font-medium text-[var(--brand-text)] select-none list-none">
                  {q}
                  <span className="shrink-0 text-[var(--brand-text-secondary)] transition-transform group-open:rotate-180 ml-3">▾</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-[var(--brand-text-secondary)] leading-relaxed border-t border-[var(--brand-border)] pt-3">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 보험사별 링크 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-5">보험사별 상세 안내</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {COMPARE_TABLE.map((ins) => (
              <Link
                key={ins.slug}
                href={`/insurance/${ins.slug}`}
                className="p-4 rounded-[var(--r-card)] border border-[var(--brand-border)] hover:border-[var(--cat-4)] transition-colors"
              >
                <span className="block font-semibold text-[var(--brand-text)] text-sm">{ins.name}</span>
                <span className="block text-xs text-[var(--brand-text-secondary)] mt-0.5">{ins.product}</span>
                <span className="block text-xs text-[var(--cat-4)] mt-1">{ins.point} →</span>
              </Link>
            ))}
          </div>
        </section>

        <AdSlot adType="adsense" format="horizontal" className="my-8" />

        {/* 보험·법률 가이드 */}
        {insuranceGuides.length > 0 && (
          <aside className="mb-8 pt-6 border-t border-[var(--brand-border)]" aria-label="보험·법률 가이드">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">📚 보험·법률 가이드</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {insuranceGuides.slice(0, 4).map((g) => (
                <Link
                  key={g.slug}
                  href={`/guide/${g.slug}`}
                  className="group flex items-center gap-2 p-3 rounded-lg border border-[var(--brand-border)] hover:border-[var(--cat-4)] transition-colors"
                >
                  <span className="text-[var(--cat-4)] shrink-0">📖</span>
                  <p className="text-sm font-medium text-[var(--brand-text)] group-hover:text-[var(--cat-4)] transition-colors leading-snug" style={{ wordBreak: "keep-all" }}>
                    {g.title}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* 보험·법률 블로그 */}
        {insuranceBlogs.length > 0 && (
          <aside className="mb-8" aria-label="보험·법률 블로그">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">✍️ 관련 블로그</h2>
            <div className="flex flex-col gap-2">
              {insuranceBlogs.slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex items-start gap-2 p-3 rounded-lg hover:bg-[var(--brand-surface-2)] transition-colors"
                >
                  <span className="mt-0.5 text-[var(--cat-4)] shrink-0">→</span>
                  <p className="text-sm font-medium text-[var(--brand-text)] group-hover:text-[var(--cat-4)] transition-colors leading-snug" style={{ wordBreak: "keep-all" }}>
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        <div className="pt-6 border-t border-[var(--brand-border)]">
          <ShareButtons url={`${SITE_URL}/insurance/compare`} title="펫보험 비교 — 6대 손보사 한눈에 비교 | 펫지기" />
        </div>
      </main>
    </AdPolicyProvider>
  );
}
