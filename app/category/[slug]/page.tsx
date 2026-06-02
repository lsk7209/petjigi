import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, CATEGORIES } from "@/lib/category";
import { getCachedCategoryGuides, getCachedCategoryBlogPosts } from "@/lib/db-queries";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { CategoryProvider } from "@/components/providers/category-provider";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { ThemeMode } from "@/components/providers/theme-mode";
import { breadcrumbSchema, faqSchema, definedTermSetSchema, itemListSchema, collectionPageSchema } from "@/lib/seo/structured-data";

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
    nutrition: "강아지·고양이 사료 비교, 생애주기별 영양 요구량, 금지 음식 목록. 수의사 검토 반려동물 사료·영양 정보.",
    health: "강아지·고양이 증상 체크, 동물병원 찾기, 예방접종 스케줄. 공공데이터 기반 반려동물 건강·의료 정보.",
    insurance: "펫보험 비교, 보장범위 설명, 보험금 청구 가이드. 반려동물 보험·법률 전문 정보.",
    care: "반려동물 미용·훈련·호텔·동반시설 정보. 케어·라이프스타일 실용 가이드.",
    memorial: "반려동물 장례 절차, 펫로스 회복, 추모 방법. 조용하고 따뜻한 장례·추모 안내.",
  };
  const title = `${cat.name} 정보 | 펫지기`;
  const description = CATEGORY_META_DESC[slug] ?? `반려동물 ${cat.name} 관련 가이드·정보를 모아보세요. 공공데이터 기반 신뢰할 수 있는 정보.`;

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
      { question: "강아지 입양 전 무엇을 준비해야 하나요?", answer: "생활공간 정비, 기본 용품(밥그릇·물그릇·침대·목줄·배변패드) 준비, 근처 동물병원 사전 확인이 필요합니다. 입양 후 2주 이내 초기 건강검진을 받는 것을 권장합니다.", url: `${SITE_URL}/category/adoption` },
      { question: "동물등록은 어디서, 언제 해야 하나요?", answer: "2개월령 이상 반려견은 의무 등록 대상입니다. 동물병원, 동물보호센터, 등록대행업체에서 신청할 수 있으며 미등록 시 최대 100만원 과태료가 부과됩니다.", url: `${SITE_URL}/category/adoption` },
      { question: "유기동물 입양 절차는 어떻게 되나요?", answer: "지역 보호센터를 방문해 분양 신청서를 작성하고, 사전 상담 후 입양이 이루어집니다. 입양 시 중성화 수술·동물등록이 완료되어 있는 경우가 많습니다.", url: `${SITE_URL}/rescue` },
    ],
    nutrition: [
      { question: "강아지 사료는 어떻게 선택하나요?", answer: "AAFCO(미국사료협회) 또는 FEDIAF(유럽사료협회) 기준 충족 여부, 주 원료 단백질 출처, 생애주기(퍼피·어덜트·시니어) 적합성을 확인하세요.", url: `${SITE_URL}/category/nutrition` },
      { question: "반려동물이 먹으면 안 되는 음식은?", answer: "포도·건포도, 양파·마늘, 초콜릿, 자일리톨(껌 등), 아보카도, 생 마카다미아 너트는 반려동물에게 독성이 있습니다. 섭취 시 즉시 동물병원에 연락하세요.", url: `${SITE_URL}/category/nutrition` },
      { question: "고양이 습식사료와 건식사료 차이는?", answer: "습식사료는 수분 함량이 70% 이상으로 수분 섭취에 유리하고 신장 건강에 도움이 됩니다. 건식사료는 치아 관리에 유리하고 보관이 편리합니다. 혼합 급여를 권장하는 수의사가 많습니다.", url: `${SITE_URL}/category/nutrition` },
    ],
    health: [
      { question: "강아지 필수 예방접종은 무엇인가요?", answer: "종합백신(DHPPL) 5차, 코로나장염 2차, 켄넬코프 2차, 인플루엔자 2차, 광견병 1차(연 1회)가 기본입니다. 퍼피는 6주령부터 시작해 16주까지 완료해야 합니다.", url: `${SITE_URL}/category/health` },
      { question: "동물병원은 어떻게 선택하나요?", answer: "집과 가까운 24시간 응급 가능 병원을 미리 파악해두고, 정기 검진은 전문 진료과목이 있는 병원을 이용하세요. 반려동물의 품종 전문 진료 경험도 확인하면 좋습니다.", url: `${SITE_URL}/sido/seoul` },
      { question: "반려동물 응급 상황 시 어떻게 해야 하나요?", answer: "경련·실신·심한 출혈·호흡 곤란·독성물질 섭취 등 응급 증상은 즉시 24시간 동물병원을 방문하세요. 이동 전 전화로 증상을 알리면 도착 전 준비를 도와줄 수 있습니다.", url: `${SITE_URL}/category/health` },
    ],
    insurance: [
      { question: "펫보험은 어떤 것을 보장하나요?", answer: "상품에 따라 다르지만 일반적으로 수술비, 입원비, 통원치료비를 보장합니다. 선천성 질환, 치과 치료, 미용 비용 등은 대부분 보장 제외입니다.", url: `${SITE_URL}/insurance/compare` },
      { question: "펫보험은 언제 가입하는 것이 좋나요?", answer: "건강할 때, 특히 어릴 때 가입할수록 보험료가 낮고 면책 기간 적용 없이 보장받기 유리합니다. 기존 질병은 가입 후에도 보장에서 제외될 수 있습니다.", url: `${SITE_URL}/insurance/compare` },
      { question: "반려동물 관련 분쟁이 생기면 어떻게 하나요?", answer: "동물보호법 위반은 지자체 동물보호팀에 신고하고, 진료 과실은 한국수의학회 또는 소비자원에 상담을 요청할 수 있습니다.", url: `${SITE_URL}/category/insurance` },
    ],
    care: [
      { question: "강아지 목욕은 얼마나 자주 해야 하나요?", answer: "일반적으로 2~4주에 한 번이 권장됩니다. 단, 피부 상태와 생활 환경에 따라 달라질 수 있으므로 수의사나 전문 그루머에게 개별 상담을 받는 것이 좋습니다.", url: `${SITE_URL}/category/care` },
      { question: "펫호텔 이용 시 주의사항은?", answer: "맡기기 전 예방접종 이력을 확인하고, 시설 방문 및 케이지·환기 상태를 사전 점검하세요. 사회화가 잘 된 동물인지, 공동 생활 가능 여부도 미리 확인합니다.", url: `${SITE_URL}/category/care` },
    ],
    memorial: [
      { question: "반려동물 장례 절차는 어떻게 되나요?", answer: "반려동물 사망 후 동물장묘업체에 연락해 수거·안치·장례식·화장·납골 순서로 진행됩니다. 비용은 체중·서비스 종류에 따라 다르며 사전 상담을 권장합니다.", url: `${SITE_URL}/category/memorial` },
      { question: "펫로스 증후군이란 무엇인가요?", answer: "반려동물을 잃은 후 경험하는 슬픔·상실감·죄책감 등의 복합적 감정입니다. 이는 자연스러운 반응으로, 충분한 애도 시간이 필요하며 필요 시 심리 상담을 받을 수 있습니다.", url: `${SITE_URL}/guide/pet-loss-care` },
    ],
  };

  const faqItems = CATEGORY_FAQS[slug] ?? [
    { question: `${cat.name} 정보는 어떻게 제공되나요?`, answer: `펫지기는 공공데이터포털에서 주기적으로 동기화한 데이터와 전문가 검수 가이드를 제공합니다.`, url: `${SITE_URL}/category/${slug}` },
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
                  강아지·고양이에게 흔한 질환의 증상, 원인, 치료 방법을 수의사 검토를 거쳐 안내합니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/condition"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--cat-3)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    💊 질병·증상 정보 보기 →
                  </Link>
                  <Link
                    href="/condition/dog-patellar-luxation"
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
