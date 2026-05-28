import type { Metadata } from "next";
import Link from "next/link";
import { getCachedAllGuides } from "@/lib/db-queries";
import { CATEGORIES } from "@/lib/category";
import type { CategoryId } from "@/lib/category";
import { breadcrumbSchema, faqSchema, itemListSchema, collectionPageSchema, definedTermSetSchema } from "@/lib/seo/structured-data";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "가이드", url: `${SITE_URL}/guide` },
]);

const FAQ = faqSchema([
  {
    question: "펫지기 가이드는 누가 작성하나요?",
    answer: "수의사·전문가 검토를 거친 가이드만 게재합니다. YMYL(건강·의료·보험·장례) 카테고리 콘텐츠는 자격을 갖춘 전문가 검수 후 발행됩니다.",
    url: `${SITE_URL}/guide`,
  },
  {
    question: "가이드 정보는 얼마나 자주 업데이트되나요?",
    answer: "수의학 가이드라인, 법령 개정, 최신 연구 결과를 반영해 정기적으로 검토합니다. 각 가이드 하단의 '검토일'을 확인하세요.",
    url: `${SITE_URL}/guide`,
  },
  {
    question: "특정 질병이나 증상 정보는 어디서 찾나요?",
    answer: "건강·의료 카테고리 가이드 또는 질병·증상 상세 페이지에서 확인하세요. 응급 상황이면 즉시 가까운 동물병원을 방문하세요.",
    url: `${SITE_URL}/category/health`,
  },
]);

const CATEGORY_EMOJI: Record<number, string> = {
  1: "🐾", 2: "🥗", 3: "💊", 4: "📋", 5: "✂️", 6: "🕊️",
};

export const metadata: Metadata = {
  title: "반려동물 가이드 — 수의사 검토 정보 모음 | 펫지기",
  description:
    "강아지·고양이 입양·건강·사료·보험·케어·장례까지. 수의사·전문가 검토를 거친 반려동물 가이드를 카테고리별로 모아봤습니다.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "반려동물 가이드 | 펫지기",
    description: "수의사 검토 반려동물 가이드 — 입양부터 장례까지 6개 카테고리.",
  },
};

export default async function GuideIndexPage() {
  const guides = await getCachedAllGuides();

  const COLLECTION_PAGE = collectionPageSchema(
    "반려동물 가이드",
    `${SITE_URL}/guide`,
    "수의사·전문가 검토를 거친 반려동물 가이드. 입양·건강·사료·보험·케어·장례 6개 카테고리."
  );

  const GUIDE_TERMS = definedTermSetSchema("반려동물 케어 용어", [
    { name: "동물등록제", description: "생후 2개월 이상 반려견을 지방자치단체에 등록하는 의무 제도. 미등록 시 과태료가 부과됩니다." },
    { name: "YMYL 콘텐츠", description: "건강·의료·금융 등 생명과 재산에 영향을 미칠 수 있는 콘텐츠. 펫지기의 해당 가이드는 수의사 검토를 거쳐 제공됩니다." },
    { name: "중성화 수술", description: "생식기를 제거하여 번식을 막는 수술. 생후 6개월~1세 사이에 권장하며 호르몬 관련 질환 예방 효과가 있습니다." },
    { name: "기초 예방 접종", description: "강아지는 DHPPL, 고양이는 CVRP 등 종별 필수 백신을 정기적으로 접종하여 전염병을 예방합니다." },
  ]);

  const GUIDE_LIST = itemListSchema(
    guides.slice(0, 100).map((g, i) => ({
      position: i + 1,
      name: g.title,
      url: `${SITE_URL}/guide/${g.slug}`,
      description: g.metaDescription ?? undefined,
    }))
  );

  const byCategory = guides.reduce<Record<number, typeof guides>>((acc, g) => {
    const cat = g.category ?? 1;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(g);
    return acc;
  }, {});

  const catOrder = [1, 2, 3, 4, 5, 6];

  return (
    <AdPolicyProvider category={5}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_PAGE) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(GUIDE_TERMS) }} />
      {guides.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(GUIDE_LIST) }} />
      )}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">가이드</span>
        </nav>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-2 sm:mb-3 tracking-tight" style={{ wordBreak: "keep-all" }} data-speakable>반려동물 가이드</h1>
          <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl" style={{ wordBreak: "keep-all" }}>
            수의사·전문가 검토를 거친 반려동물 가이드를 카테고리별로 모아봤습니다.
            입양부터 장례까지 필요한 정보를 찾아보세요.
          </p>
        </div>

        <AdSlot adType="adsense" format="horizontal" className="mb-8" />

        {guides.length === 0 ? (
          <p className="text-[var(--brand-text-secondary)] text-sm">가이드를 준비 중입니다.</p>
        ) : (
          <div className="space-y-12">
            {catOrder.map((catId) => {
              const catGuides = byCategory[catId];
              if (!catGuides || catGuides.length === 0) return null;
              const cat = CATEGORIES[catId as CategoryId];
              if (!cat) return null;
              const emoji = CATEGORY_EMOJI[catId] ?? "📌";
              return (
                <section key={catId} aria-label={`${cat.name} 가이드`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{emoji}</span>
                    <h2 className="text-xl font-bold text-[var(--brand-text)]">{cat.name}</h2>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="ml-auto text-xs text-[var(--brand-accent)] hover:underline"
                    >
                      카테고리 보기 →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {catGuides.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/guide/${g.slug}`}
                        className="group p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all"
                      >
                        {g.ymyl && (
                          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-[var(--cat-3-soft)] text-[var(--cat-3)] font-semibold mb-1.5">
                            전문가 검토
                          </span>
                        )}
                        <h3 className="font-semibold text-sm sm:text-base text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug" style={{ wordBreak: "keep-all" }}>
                          {g.title}
                        </h3>
                        {g.metaDescription && (
                          <p className="text-xs text-[var(--brand-text-secondary)] mt-1.5 leading-relaxed line-clamp-2">
                            {g.metaDescription}
                          </p>
                        )}
                        {g.publishedAt && (
                          <time className="text-xs text-[var(--brand-text-secondary)] mt-2 block" dateTime={g.publishedAt}>
                            {g.publishedAt.slice(0, 10)}
                          </time>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* FAQ */}
        <section className="mt-12 pt-8 border-t border-[var(--brand-border)]" aria-label="자주 묻는 질문">
          <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">가이드 자주 묻는 질문</h2>
          <dl className="space-y-3">
            {[
              { q: "펫지기 가이드는 누가 작성하나요?", a: "수의사·전문가 검토를 거친 가이드만 게재합니다. YMYL(건강·의료·보험·장례) 카테고리 콘텐츠는 자격을 갖춘 전문가 검수 후 발행됩니다." },
              { q: "가이드 정보는 얼마나 자주 업데이트되나요?", a: "수의학 가이드라인, 법령 개정, 최신 연구 결과를 반영해 정기적으로 검토합니다. 각 가이드 하단의 출처와 업데이트 날짜를 확인하세요." },
              { q: "특정 질병이나 증상 정보는 어디서 찾나요?", a: "건강·의료 카테고리 가이드 또는 질병·증상 상세 페이지에서 확인하세요. 응급 상황이면 즉시 가까운 동물병원을 방문하세요." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4">
                <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">Q. {item.q}</dt>
                <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 관련 섹션 링크 */}
        <section className="mt-8 pt-6 border-t border-[var(--brand-border)]">
          <h2 className="text-base font-semibold text-[var(--brand-text)] mb-4">함께 보면 좋은 정보</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/condition" className="text-sm text-[var(--brand-accent)] hover:underline">
              💊 질병·증상 정보 →
            </Link>
            <Link href="/guide/pet-loss-care" className="text-sm text-[var(--brand-accent)] hover:underline">
              🕊️ 펫로스 케어 가이드 →
            </Link>
            <Link href="/insurance/compare" className="text-sm text-[var(--brand-accent)] hover:underline">
              📋 펫보험 비교 →
            </Link>
            <Link href="/breed" className="text-sm text-[var(--brand-accent)] hover:underline">
              🐾 견종·묘종 도감 →
            </Link>
          </div>
        </section>
      </main>
    </AdPolicyProvider>
  );
}
