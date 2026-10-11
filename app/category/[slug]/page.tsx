import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, CATEGORIES } from "@/lib/category";
import { getCachedCategoryGuides, getCachedCategoryBlogPosts } from "@/lib/db-queries";
import { OwnerJourneys } from "@/components/content/owner-journeys";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { CategoryProvider } from "@/components/providers/category-provider";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { ThemeMode } from "@/components/providers/theme-mode";
import { breadcrumbSchema, faqSchema, itemListSchema, collectionPageSchema } from "@/lib/seo/structured-data";

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

  const CATEGORY_META_DESC: Record<string, string> = {
    adoption: "강아지·고양이 입양 방법, 동물등록 절차, 품종별 특성 가이드. 유기동물 입양부터 동물등록까지 단계별 안내.",
    nutrition: "강아지·고양이 사료 비교, 생애주기별 영양 요구량, 금지 음식 목록과 출처를 확인하는 반려동물 사료·영양 정보.",
    health: "강아지·고양이 증상 체크, 동물병원 찾기, 예방접종 스케줄. 공공데이터 기반 반려동물 건강·의료 정보.",
    insurance: "펫보험 비교, 보장범위 설명, 보험금 청구 가이드. 반려동물 보험·법률 전문 정보.",
    care: "반려동물 미용·훈련·호텔·동반시설 정보. 케어·라이프스타일 실용 가이드.",
    memorial: "반려동물 장례 절차, 펫로스 회복, 추모 방법. 조용하고 따뜻한 장례·추모 안내.",
  };
  const title = `${cat.name} 정보 | 펫지기`;
  const description = CATEGORY_META_DESC[slug] ?? `반려동물 ${cat.name} 관련 가이드·정보를 모아보세요. 공공데이터 기반 신뢰할 수 있는 정보.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/category/${slug}` },
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/category/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/category/${slug}/opengraph-image`],
    },
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
  { label: "서울", slug: "seoul", active: true },
  { label: "경기", slug: "gyeonggi", active: true },
  { label: "부산", slug: "busan", active: true },
  { label: "인천", slug: "incheon", active: true },
  { label: "대구", slug: "daegu", active: true },
  { label: "광주", slug: "gwangju", active: true },
  { label: "대전", slug: "daejeon", active: true },
  { label: "울산", slug: "ulsan", active: true },
  { label: "세종", slug: "sejong", active: true },
  { label: "강원", slug: "gangwon", active: false },
  { label: "충북", slug: "chungbuk", active: false },
  { label: "충남", slug: "chungnam", active: false },
  { label: "전북", slug: "jeonbuk", active: false },
  { label: "전남", slug: "jeonnam", active: false },
  { label: "경북", slug: "gyeongbuk", active: false },
  { label: "경남", slug: "gyeongnam", active: false },
  { label: "제주", slug: "jeju", active: false },
];


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const [guides, recentBlogPosts] = await Promise.all([
    getCachedCategoryGuides(cat.id),
    getCachedCategoryBlogPosts(cat.id),
  ]);
  const desc = CATEGORY_DESCRIPTIONS[slug];
  const emoji = CATEGORY_EMOJI[slug] ?? "📌";

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: cat.name, url: `${SITE_URL}/category/${slug}` },
  ]);

  const CATEGORY_FAQS: Record<string, { question: string; answer: string; url?: string }[]> = {
    adoption: [
      { question: "입양 전 무엇을 준비하나요?", answer: "가족의 돌봄 역할, 실제 견적을 기록하는 예산, 인계받을 건강 기록과 첫날 공간을 준비합니다. 병원 방문 시기는 동물의 상태와 인계 기록을 보고 수의사와 정하세요.", url: SITE_URL + "/guide/dog-adoption-checklist" },
      { question: "동물등록 조건은 어디서 확인하나요?", answer: "등록 대상과 절차는 동물보호법 및 공식 안내를 확인합니다. 미등록과 변경 신고 누락은 서로 다른 사항이므로 해당 안내를 구분해 읽으세요.", url: SITE_URL + "/guide/microchip-registration-complete-guide" },
    ],
    nutrition: [
      { question: "사료의 무엇을 비교하나요?", answer: "대상 동물과 생활 단계, 표시 정보, 제조사 영양 관리와 문의 창구를 확인합니다. 성분 나열 순서만으로 품질이나 질환에 대한 적합성을 단정하지 않습니다.", url: SITE_URL + "/guide/dog-food-label-guide" },
      { question: "건식과 습식 중 어떤 것이 맞나요?", answer: "수분 함량 외에도 전체 식사 구성과 개별 건강 상태를 고려합니다. 사료 형태만으로 치아나 신장 건강 효과를 보장하지 말고 필요하면 수의사와 상담하세요.", url: SITE_URL + "/guide/cat-food-guide" },
    ],
    health: [
      { question: "예방접종과 검진 일정은 어떻게 정하나요?", answer: "종·생활 단계·기존 접종 기록·건강 상태와 노출 위험에 맞춰 수의사와 정합니다. 모든 동물에게 같은 접종 횟수나 검사 묶음을 적용하지 않습니다.", url: SITE_URL + "/guide/pet-health-checkup-guide" },
      { question: "병원 방문 전에 무엇을 확인하나요?", answer: "진료 가능한 동물 종과 증상, 오늘 접수 가능 여부, 준비할 기록과 검사 전 주의사항을 전화로 확인합니다.", url: SITE_URL + "/guide/animal-hospital-guide" },
      { question: "응급 신호가 있으면 어떻게 하나요?", answer: "호흡곤란·의식 저하·심한 출혈·독성물질 섭취 등이 의심되면 기록을 마칠 때까지 기다리지 말고 응급병원에 연락하며 이동을 준비하세요.", url: SITE_URL + "/guide/pet-first-aid-guide" },
    ],
    insurance: [
      { question: "보장 범위와 면책 기간이 모두 같나요?", answer: "상품·특약·가입 시점의 약관에 따라 다릅니다. 치과·피부·기존 질환의 취급과 질병·상해별 보장 개시 조건을 따로 확인하세요.", url: SITE_URL + "/blog/pet-insurance-exclusions-guide" },
      { question: "보험 비교는 어디서 시작하나요?", answer: "같은 동물 조건과 견적 날짜로 약관 버전, 보상 비율, 자기부담금, 한도, 제외 조건을 나란히 기록합니다. 나이가 어리다고 대기 기간이 없어지는 것은 아닙니다.", url: SITE_URL + "/blog/pet-insurance-comparison-method" },
      { question: "보험금 청구 전에 무엇을 준비하나요?", answer: "보험사의 공식 청구 안내에서 담보별 서류와 접수 경로를 확인하고 접수번호를 보관합니다. 지급 여부와 기간을 임의로 예상하지 않습니다.", url: SITE_URL + "/blog/pet-insurance-claim-guide" },
    ],
    care: [
      { question: "고양이 생활 공간을 어떻게 살펴보나요?", answer: "안전한 휴식 자리, 분리된 생활 자원, 놀이와 관찰을 우리 동물의 행동과 이동 능력에 맞춰 점검합니다.", url: SITE_URL + "/guide/indoor-cat-enrichment-guide" },
      { question: "미용·위탁 시설에 무엇을 물어보나요?", answer: "대상 동물, 건강 상태에 따른 이용 조건, 관리 방식, 포함 비용과 응급 연락 절차를 직접 확인하세요.", url: SITE_URL + "/category/care" },
    ],
  };

  const faqItems = CATEGORY_FAQS[slug] ?? [
    { question: `${cat.name} 정보는 어떻게 제공되나요?`, answer: `펫지기는 공공데이터포털에서 주기적으로 동기화한 데이터와 공인된 출처 기반 가이드를 제공합니다.`, url: `${SITE_URL}/category/${slug}` },
    { question: `${cat.name} 관련 업체를 찾으려면?`, answer: `지역별 검색에서 시도를 선택하면 가까운 업체를 찾을 수 있습니다.`, url: `${SITE_URL}/sido/seoul` },
    ...(desc?.detail ? [{ question: `${cat.name}에 대해 더 알고 싶어요.`, answer: desc.detail }] : []),
  ];

  const faq = faqSchema(faqItems);

  const categoryDesc = CATEGORY_DESCRIPTIONS[slug];
  const collectionPage = collectionPageSchema(
    `${cat.name} | 펫지기`,
    `${SITE_URL}/category/${slug}`,
    categoryDesc?.short
  );

  const guideItemList = guides.length > 0
    ? itemListSchema(guides.map((g, i) => ({
        position: i + 1,
        name: g.title,
        url: `${SITE_URL}/guide/${g.slug}`,
      })))
    : null;

  return (
    <CategoryProvider category={cat.id}>
      <ThemeMode mode={cat.mode}>
        <AdPolicyProvider category={cat.id}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }} />
          {guideItemList && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideItemList) }} />
          )}
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
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-text)] tracking-tight" data-speakable>
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
            <OwnerJourneys category={slug} />

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
                        <p className="text-sm sm:text-base font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug word-break-keep">
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
                {SIDO_LIST.map(({ label, slug: sidoSlug, active }) => (
                  <Link
                    key={sidoSlug}
                    href={`/sido/${sidoSlug}`}
                    className={`p-2.5 rounded-xl border text-sm text-center transition-colors font-medium ${
                      active
                        ? "border-[var(--brand-border)] hover:border-[var(--brand-accent)] text-[var(--brand-text)] hover:text-[var(--brand-accent)]"
                        : "border-[var(--brand-border)]/60 text-[var(--brand-text-secondary)] opacity-75 hover:border-[var(--brand-border)]"
                    }`}
                  >
                    <span>{label}</span>
                    {!active && (
                      <span className="block text-[10px] text-[var(--brand-text-secondary)]">
                        준비중
                      </span>
                    )}
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
                    href="/breed"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--brand-border)] text-sm hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors font-medium"
                  >
                    📚 견종·묘종 도감
                  </Link>
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

            {/* 건강·의료: 질병·증상 허브 링크 */}
            {cat.slug === "health" && (
              <section className="mb-8" aria-label="질병·증상 정보">
                <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">질병·증상 정보</h2>
                <p className="text-sm text-[var(--brand-text-secondary)] mb-4">
                  강아지·고양이에게 흔한 질환의 증상과 진료가 필요한 신호를 일반 정보로 안내합니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/condition"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--cat-3)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    💊 질병·증상 정보 보기 →
                  </Link>
                  <Link
                    href="/guide/dog-patellar-luxation"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--brand-border)] text-sm hover:border-[var(--cat-3)] hover:text-[var(--cat-3)] transition-colors"
                  >
                    🦴 슬개골 탈구
                  </Link>
                  <Link
                    href="/condition/cat-flutd"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--brand-border)] text-sm hover:border-[var(--cat-3)] hover:text-[var(--cat-3)] transition-colors"
                  >
                    🚽 고양이 FLUTD
                  </Link>
                  <Link
                    href="/condition/dog-heartworm"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--brand-border)] text-sm hover:border-[var(--cat-3)] hover:text-[var(--cat-3)] transition-colors"
                  >
                    🦟 심장사상충
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

            {/* 카테고리 블로그 포스트 */}
            {recentBlogPosts.length > 0 && (
              <section className="mb-8" aria-label={`${cat.name} 블로그`}>
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-xl font-bold text-[var(--brand-text)]">
                    ✍️ {cat.name} 블로그
                  </h2>
                  <Link href={`/blog?cat=${cat.id}`} className="text-sm text-[var(--brand-accent)] hover:underline font-semibold">
                    전체 보기 →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recentBlogPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group p-4 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-all"
                    >
                      <p className="text-sm font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug" style={{ wordBreak: "keep-all" }}>
                        {post.title}
                      </p>
                      {post.subtitle && (
                        <p className="text-xs text-[var(--brand-text-secondary)] mt-1 line-clamp-2">{post.subtitle}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ 섹션 (AEO — 카테고리별 실질적 Q&A) */}
            <section className="mt-4 mb-8 pt-8 border-t border-[var(--brand-border)]" aria-label="자주 묻는 질문">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--brand-text)] mb-4">
                {cat.name} 자주 묻는 질문
              </h2>
              <dl className="space-y-3">
                {faqItems.map((item, i) => (
                  <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4 sm:p-5 bg-white/30">
                    <dt className="font-semibold text-sm text-[var(--brand-text)] mb-2" style={{ wordBreak: "keep-all" }}>
                      Q. {item.question}
                    </dt>
                    <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed" style={{ wordBreak: "keep-all" }}>
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </main>
        </AdPolicyProvider>
      </ThemeMode>
    </CategoryProvider>
  );
}
