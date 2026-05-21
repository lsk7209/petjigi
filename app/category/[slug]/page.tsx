import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getCategoryBySlug, CATEGORIES } from "@/lib/category";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { CategoryProvider } from "@/components/providers/category-provider";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { ThemeMode } from "@/components/providers/theme-mode";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export async function generateStaticParams() {
  return Object.values(CATEGORIES).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};

  const title = `${cat.name} 정보 | 펫지기`;
  const description = `반려동물 ${cat.name} 관련 가이드·정보를 모아보세요. 공공데이터 기반 신뢰할 수 있는 정보.`;

  return {
    title,
    description,
    alternates: { canonical: `/category/${slug}` },
    openGraph: { title, description },
  };
}

const CATEGORY_DESCRIPTIONS: Record<string, { short: string; detail: string }> = {
  adoption: {
    short: "유기동물 입양, 동물등록제, 품종 가이드 등 반려동물을 처음 맞이하는 분들을 위한 정보입니다.",
    detail: "입양 전 준비사항부터 동물등록 절차, 품종별 특성까지 단계별로 안내합니다.",
  },
  nutrition: {
    short: "반려동물 사료 비교, 영양제, 알러지 대응 등 먹거리 선택을 돕는 정보입니다.",
    detail: "강아지·고양이 생애주기별 영양 요구량과 올바른 먹이 가이드를 제공합니다.",
  },
  health: {
    short: "동물병원 찾기, 예방접종, 증상·질병 정보 등 반려동물 건강 관리 정보입니다.",
    detail: "지역별 동물병원 위치, 예방접종 스케줄, 주요 질병 증상과 응급처치 방법을 안내합니다.",
  },
  insurance: {
    short: "펫보험 비교, 보장범위, 청구 가이드, 동물보호법 분쟁 정보입니다.",
    detail: "주요 펫보험 상품 비교, 보장 범위 설명, 보험금 청구 절차를 꼼꼼하게 정리했습니다.",
  },
  care: {
    short: "반려동물 미용·호텔·훈련·동반시설 등 라이프스타일 정보입니다.",
    detail: "펫미용, 펫호텔, 반려동물 동반 가능 장소, 훈련 방법 등 일상 케어 팁을 모았습니다.",
  },
  memorial: {
    short: "반려동물 장묘 업체, 장례 절차·비용, 펫로스 케어 정보입니다.",
    detail: "사랑하는 반려동물을 위한 마지막 여정 — 장례 절차, 비용, 펫로스 회복을 조용히 안내합니다.",
  },
};

const CATEGORY_EMOJI: Record<string, string> = {
  adoption: "🐾",
  nutrition: "🥗",
  health: "💊",
  insurance: "📋",
  care: "✂️",
  memorial: "🕊️",
};

const SIDO_LIST = [
  { label: "서울", slug: "seoul" },
  { label: "경기", slug: "gyeonggi" },
  { label: "부산", slug: "busan" },
  { label: "인천", slug: "incheon" },
  { label: "대구", slug: "daegu" },
  { label: "광주", slug: "gwangju" },
  { label: "대전", slug: "daejeon" },
  { label: "울산", slug: "ulsan" },
  { label: "강원", slug: "gangwon" },
  { label: "경남", slug: "gyeongnam" },
  { label: "경북", slug: "gyeongbuk" },
  { label: "전남", slug: "jeonnam" },
];

async function getCategoryGuides(categoryId: number) {
  return db
    .select({
      slug: contents.slug,
      title: contents.title,
      publishedAt: contents.publishedAt,
    })
    .from(contents)
    .where(
      and(
        eq(contents.status, "published"),
        eq(contents.type, "guide"),
        eq(contents.category, categoryId)
      )
    )
    .orderBy(desc(contents.publishedAt))
    .limit(6);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const guides = await getCategoryGuides(cat.id);
  const desc = CATEGORY_DESCRIPTIONS[slug];
  const emoji = CATEGORY_EMOJI[slug] ?? "📌";

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: cat.name, url: `${SITE_URL}/category/${slug}` },
  ]);

  const faq = faqSchema([
    {
      question: `${cat.name} 정보는 어떻게 제공되나요?`,
      answer: `펫지기는 농림축산검역본부, 행정안전부 등 공공데이터포털에서 주기적으로 동기화한 데이터와 전문가 검수를 거친 가이드 콘텐츠를 제공합니다.`,
    },
    {
      question: `${cat.name} 관련 업체는 어디서 찾을 수 있나요?`,
      answer: `지역별 검색 섹션에서 시도를 선택하면 가까운 ${cat.name} 관련 업체를 찾을 수 있습니다. 공공데이터 기반으로 전국 30,000개 이상 업체 정보를 제공합니다.`,
    },
    ...(desc?.detail
      ? [{ question: `${cat.name}에 대해 더 자세히 알고 싶어요.`, answer: desc.detail }]
      : []),
  ]);

  return (
    <CategoryProvider category={cat.id}>
      <ThemeMode mode={cat.mode}>
        <AdPolicyProvider category={cat.id}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
          <main className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
            {/* 브레드크럼 */}
            <nav
              className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1.5 flex-wrap"
              aria-label="breadcrumb"
            >
              <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
              <span aria-hidden="true">›</span>
              <span className="text-[var(--brand-text)]" aria-current="page">
                {emoji} {cat.name}
              </span>
            </nav>

            {/* 헤더 */}
            <header className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <span className="text-3xl sm:text-4xl" role="img" aria-label={cat.name}>{emoji}</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-text)] tracking-tight">
                  {cat.name}
                </h1>
              </div>
              <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl" style={{ wordBreak: "keep-all" }}>
                {desc?.short}
              </p>
              {desc?.detail && (
                <p className="mt-2 text-xs sm:text-sm text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl" style={{ wordBreak: "keep-all" }}>
                  {desc.detail}
                </p>
              )}
            </header>

            <YmylDisclaimer categoryId={cat.id} />

            {/* 가이드 목록 */}
            {guides.length > 0 && (
              <section className="mb-10" aria-label="가이드 목록">
                <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">
                  {cat.name} 가이드
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guides.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guide/${g.slug}`}
                      className="group flex items-start gap-3 p-4 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all"
                    >
                      <span className="text-lg shrink-0 mt-0.5">{emoji}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug word-break-keep">
                          {g.title}
                        </p>
                        {g.publishedAt && (
                          <time
                            className="text-xs text-[var(--brand-text-secondary)] mt-1 block"
                            dateTime={g.publishedAt}
                          >
                            {g.publishedAt.slice(0, 10)}
                          </time>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* 지역별 검색 */}
            <section className="mb-8" aria-label="지역별 검색">
              <h2 className="text-xl font-bold text-[var(--brand-text)] mb-2">지역별 검색</h2>
              <p className="text-sm text-[var(--brand-text-secondary)] mb-4">
                가까운 지역의 반려동물 관련 업장을 찾아보세요.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {SIDO_LIST.map(({ label, slug: sidoSlug }) => (
                  <Link
                    key={sidoSlug}
                    href={`/sido/${sidoSlug}`}
                    className="p-2.5 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] text-sm text-center transition-colors font-medium hover:text-[var(--brand-accent)]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </section>

            {/* 입양·등록: 품종 링크 */}
            {cat.slug === "adoption" && (
              <section className="mb-8" aria-label="품종 정보">
                <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">품종 정보</h2>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/breed/dog"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--brand-border)] text-sm hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors font-medium"
                  >
                    🐕 강아지 품종 안내
                  </Link>
                  <Link
                    href="/breed/cat"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--brand-border)] text-sm hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors font-medium"
                  >
                    🐈 고양이 품종 안내
                  </Link>
                  <Link
                    href="/rescue"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--brand-border)] text-sm hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors font-medium"
                  >
                    🏠 유기동물 입양하기
                  </Link>
                </div>
              </section>
            )}

            {/* 보험·법률: 보험 비교 */}
            {cat.slug === "insurance" && (
              <section className="mb-8" aria-label="펫보험 비교">
                <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">펫보험 비교</h2>
                <Link
                  href="/insurance/compare"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--brand-accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                >
                  📋 펫보험 상품 비교하기 →
                </Link>
              </section>
            )}

            {/* 장례·추모: 펫로스 케어 */}
            {cat.slug === "memorial" && (
              <section className="mb-8" aria-label="펫로스 케어">
                <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">펫로스 케어</h2>
                <Link
                  href="/guide/pet-loss-care"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--brand-border)] text-sm hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors font-medium"
                >
                  🕊️ 펫로스 케어 가이드 읽기 →
                </Link>
              </section>
            )}
          </main>
        </AdPolicyProvider>
      </ThemeMode>
    </CategoryProvider>
  );
}
