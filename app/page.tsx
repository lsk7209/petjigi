import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db/client";
import { contents, businesses, shelters, rescuedAnimals } from "@/db/schema";
import { eq, desc, and, sql, count } from "drizzle-orm";
import { CATEGORIES } from "@/lib/category";
import { faqSchema } from "@/lib/seo/structured-data";

const HOME_FAQ = faqSchema([
  {
    question: "펫지기는 어떤 서비스인가요?",
    answer: "펫지기는 공공데이터포털(농림축산검역본부·행정안전부)을 기반으로 전국 30,000개 이상의 동물병원·펫미용·펫호텔·장묘업체 정보를 제공하는 무료 반려동물 정보 서비스입니다.",
  },
  {
    question: "전국 동물병원을 어떻게 찾나요?",
    answer: "지역별 검색에서 시도를 선택하면 해당 지역 동물병원 목록을 확인할 수 있습니다. 예) 서울 강남구 동물병원, 경기 수원 동물병원 등.",
  },
  {
    question: "유기동물 입양은 어떻게 하나요?",
    answer: "구조동물 메뉴에서 현재 보호 중인 동물을 확인하고, 가까운 보호센터에 직접 연락하시면 됩니다. 전국 보호센터 정보도 함께 제공됩니다.",
  },
  {
    question: "정보는 얼마나 자주 업데이트되나요?",
    answer: "동물병원·펫미용 등 영업장 정보는 매일, 구조동물 현황은 매일, 보호센터 정보는 매주 공공데이터에서 동기화됩니다.",
  },
]);

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "펫지기 — 반려동물 보호자를 위한 정보",
  description:
    "반려동물과 함께하는 모든 결정 — 입양부터 장례까지. 전국 30,000+ 업장 정보, 공공데이터 기반 신뢰할 수 있는 반려동물 가이드.",
  alternates: { canonical: "/" },
};

const CATEGORY_META: Record<number, { emoji: string; desc: string; cta: string }> = {
  1: { emoji: "🐾", desc: "입양 전 준비부터 동물등록까지 단계별 안내", cta: "입양 가이드 보기" },
  2: { emoji: "🥗", desc: "생애주기별 영양 요구량과 안전한 먹이 가이드", cta: "사료 정보 보기" },
  3: { emoji: "💊", desc: "예방접종·건강검진·응급대처 신뢰할 수 있는 정보", cta: "건강 정보 보기" },
  4: { emoji: "📋", desc: "펫보험 비교와 반려동물 관련 법률 핵심 정리", cta: "보험 비교하기" },
  5: { emoji: "✂️", desc: "그루밍·훈련·여행 등 일상 케어 실용 팁", cta: "케어 팁 보기" },
  6: { emoji: "🕊️", desc: "펫로스 회복과 장례·추모 절차 조용히 안내", cta: "추모 가이드 보기" },
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
  { label: "세종", slug: "sejong" },
  { label: "강원", slug: "gangwon" },
  { label: "충북", slug: "chungbuk" },
  { label: "충남", slug: "chungnam" },
  { label: "전북", slug: "jeonbuk" },
  { label: "전남", slug: "jeonnam" },
  { label: "경북", slug: "gyeongbuk" },
  { label: "경남", slug: "gyeongnam" },
  { label: "제주", slug: "jeju" },
];

async function getStats() {
  const [bizCount, shelterCount, rescuedCount] = await Promise.all([
    db.select({ count: count() }).from(businesses).where(eq(businesses.status, "active")).get(),
    db.select({ count: count() }).from(shelters).get(),
    db.select({ count: count() }).from(rescuedAnimals).get(),
  ]);
  return {
    businesses: bizCount?.count ?? 0,
    shelters: shelterCount?.count ?? 0,
    rescued: rescuedCount?.count ?? 0,
  };
}

async function getRecentGuides() {
  return db
    .select({
      slug: contents.slug,
      title: contents.title,
      category: contents.category,
      publishedAt: contents.publishedAt,
    })
    .from(contents)
    .where(and(eq(contents.status, "published"), eq(contents.type, "guide")))
    .orderBy(desc(contents.publishedAt))
    .limit(6);
}

function formatCount(n: number) {
  if (n >= 10000) return `${Math.floor(n / 1000)}천+`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천+`;
  return `${n}+`;
}

export default async function HomePage() {
  const categories = Object.values(CATEGORIES);
  const [recentGuides, stats] = await Promise.all([getRecentGuides(), getStats()]);

  const STATS = [
    { label: "전국 업장 정보", value: formatCount(stats.businesses), sublabel: "동물병원·미용·장묘 등" },
    { label: "보호센터", value: formatCount(stats.shelters), sublabel: "전국 공공 보호소" },
    { label: "구조동물", value: formatCount(stats.rescued), sublabel: "현재 입양 대기 중" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ) }}
      />
    <main className="min-h-screen bg-[var(--brand-bg)]">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-14 text-center" aria-label="사이트 소개">
        <p className="text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-4">
          공공데이터 기반 반려동물 정보
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--brand-text)] mb-5 leading-tight tracking-tight">
          펫지기
        </h1>
        <p className="text-base sm:text-lg text-[var(--brand-text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed word-break-keep">
          입양부터 장례까지 — 반려동물과 함께하는 모든 결정을 공신력 있는 공공데이터로 도와드립니다.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/category/health"
            className="px-6 py-3 rounded-full bg-[var(--brand-accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            건강 정보 보기
          </Link>
          <Link
            href="/sido/seoul"
            className="px-6 py-3 rounded-full border-2 border-[var(--brand-border)] text-[var(--brand-text)] text-sm font-semibold hover:border-[var(--brand-accent)] transition-colors"
          >
            동물병원 찾기
          </Link>
          <Link
            href="/rescue"
            className="px-6 py-3 rounded-full border-2 border-[var(--brand-border)] text-[var(--brand-text)] text-sm font-semibold hover:border-[var(--brand-accent)] transition-colors"
          >
            유기동물 입양
          </Link>
        </div>
      </section>

      {/* 통계 배너 */}
      <section className="bg-[var(--brand-text)] py-8 mb-14" aria-label="서비스 통계">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center text-white">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-accent)] leading-none">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold mt-1 opacity-90">{s.label}</p>
                <p className="text-xs opacity-60 hidden sm:block mt-0.5">{s.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6대 카테고리 카드 */}
      <section className="max-w-5xl mx-auto px-4 pb-16" aria-label="카테고리">
        <h2 className="text-2xl font-bold text-[var(--brand-text)] mb-2">
          어떤 정보가 필요하세요?
        </h2>
        <p className="text-sm text-[var(--brand-text-secondary)] mb-6">
          6가지 주제별로 반려동물 정보를 정리했습니다.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat.id];
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group p-5 rounded-2xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-md transition-all text-left bg-white/40 hover:bg-white/60"
              >
                <span
                  className="text-3xl mb-3 block"
                  role="img"
                  aria-label={cat.name}
                >
                  {meta.emoji}
                </span>
                <h3 className="font-bold text-[var(--brand-text)] mb-1.5 group-hover:text-[var(--brand-accent)] transition-colors text-base">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed mb-3 word-break-keep">
                  {meta.desc}
                </p>
                <span className="text-xs text-[var(--brand-accent)] font-semibold group-hover:underline">
                  {meta.cta} →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 최근 가이드 */}
      {recentGuides.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16" aria-label="최근 가이드">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--brand-text)]">최근 가이드</h2>
              <p className="text-sm text-[var(--brand-text-secondary)] mt-0.5">
                전문가 검토를 거친 신뢰할 수 있는 정보
              </p>
            </div>
            <Link
              href="/category/health"
              className="text-sm text-[var(--brand-accent)] font-semibold hover:underline shrink-0"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recentGuides.map((guide) => {
              const cat = CATEGORIES[guide.category as keyof typeof CATEGORIES];
              const meta = CATEGORY_META[guide.category];
              return (
                <Link
                  key={guide.slug}
                  href={`/guide/${guide.slug}`}
                  className="group flex flex-col p-4 rounded-2xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all bg-white/40"
                >
                  <span className="text-lg mb-2">{meta?.emoji ?? "📄"}</span>
                  <p className="text-xs text-[var(--brand-accent)] font-semibold mb-1">
                    {cat?.name ?? "가이드"}
                  </p>
                  <p className="text-sm font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug word-break-keep flex-1">
                    {guide.title}
                  </p>
                  {guide.publishedAt && (
                    <time
                      className="mt-2 text-xs text-[var(--brand-text-secondary)]"
                      dateTime={guide.publishedAt}
                    >
                      {guide.publishedAt.slice(0, 10)}
                    </time>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 지역별 동물병원 찾기 */}
      <section className="max-w-5xl mx-auto px-4 pb-16" aria-label="지역별 검색">
        <div className="rounded-2xl border border-[var(--brand-border)] p-6 bg-white/40">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" role="img" aria-label="동물병원">🏥</span>
            <h2 className="text-xl font-bold text-[var(--brand-text)]">지역별 동물병원 찾기</h2>
          </div>
          <p className="text-sm text-[var(--brand-text-secondary)] mb-5">
            전국 {formatCount(stats.businesses)}개 업장 정보를 지역별로 검색하세요. 동물병원·펫미용·펫호텔·장묘업체 등
          </p>
          <div className="flex flex-wrap gap-2">
            {SIDO_LIST.map((sido) => (
              <Link
                key={sido.slug}
                href={`/sido/${sido.slug}`}
                className="px-3 py-1.5 rounded-full border border-[var(--brand-border)] text-sm text-[var(--brand-text)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] hover:bg-white/80 transition-all"
              >
                {sido.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 유기동물 입양 CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-16" aria-label="유기동물 입양">
        <Link
          href="/rescue"
          className="group block rounded-2xl border-2 border-[var(--brand-border)] hover:border-[var(--brand-accent)] p-6 bg-white/40 hover:bg-white/60 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--brand-accent)] uppercase tracking-widest mb-1">
                유기동물 입양
              </p>
              <h2 className="text-xl font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors">
                기다리는 아이들을 만나보세요
              </h2>
              <p className="text-sm text-[var(--brand-text-secondary)] mt-1">
                전국 보호센터 {formatCount(stats.rescued)}마리 구조동물 · 공공데이터 실시간 현황
              </p>
            </div>
            <span className="text-4xl shrink-0 ml-4" role="img" aria-label="강아지">🐕</span>
          </div>
        </Link>
      </section>

      {/* 이메일 구독 CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20" aria-label="뉴스레터 구독">
        <div className="rounded-2xl bg-[var(--brand-accent)] text-white p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-2">
            뉴스레터
          </p>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            반려동물 건강 정보를 이메일로 받아보세요
          </h2>
          <p className="text-sm opacity-80 mb-6 max-w-md mx-auto leading-relaxed">
            월 2회, 수의사·전문가 검토를 거친 콘텐츠만 엄선해 보내드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-full bg-white text-[var(--brand-accent)] text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            무료 구독 신청 →
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
