import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db/client";
import { contents, businesses, shelters, rescuedAnimals } from "@/db/schema";
import { eq, desc, and, sql, count } from "drizzle-orm";
import { CATEGORIES } from "@/lib/category";
import { faqSchema, definedTermSetSchema } from "@/lib/seo/structured-data";
import { SubscribeForm } from "@/components/forms/subscribe-form";

const SITE_URL_CONST = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const HOME_FAQ = faqSchema([
  {
    question: "펫지기는 어떤 서비스인가요?",
    answer: "펫지기는 공공데이터포털(농림축산검역본부·행정안전부)을 기반으로 전국 30,000개 이상의 동물병원·펫미용·펫호텔·장묘업체 정보를 제공하는 무료 반려동물 정보 서비스입니다.",
    url: SITE_URL_CONST,
  },
  {
    question: "전국 동물병원을 어떻게 찾나요?",
    answer: "지역별 검색에서 시도를 선택하면 해당 지역 동물병원 목록을 확인할 수 있습니다. 예) 서울 강남구 동물병원, 경기 수원 동물병원 등. 공공데이터 기준 영업 중인 업체만 표시됩니다.",
    url: `${SITE_URL_CONST}/sido/seoul`,
  },
  {
    question: "유기동물 입양은 어떻게 하나요?",
    answer: "구조동물 메뉴에서 현재 보호 중인 동물을 확인하고, 가까운 보호센터에 직접 연락하시면 됩니다. 전국 보호센터 정보도 함께 제공됩니다.",
    url: `${SITE_URL_CONST}/rescue`,
  },
  {
    question: "정보는 얼마나 자주 업데이트되나요?",
    answer: "동물병원·펫미용 등 영업장 정보는 매일, 구조동물 현황은 매일, 보호센터 정보는 매주 공공데이터에서 동기화됩니다.",
    url: SITE_URL_CONST,
  },
  {
    question: "반려동물 보험은 어디서 비교하나요?",
    answer: "펫지기 보험 비교 페이지에서 주요 펫보험 상품을 한눈에 비교할 수 있습니다. 보장 범위·보험료·특약을 정리해 제공합니다.",
    url: `${SITE_URL_CONST}/insurance/compare`,
  },
  {
    question: "동물등록은 어디서 할 수 있나요?",
    answer: "동물등록은 지역 동물병원, 동물보호센터, 등록대행업체에서 가능합니다. 펫지기에서 가까운 동물등록 가능 업체를 찾아보세요.",
    url: `${SITE_URL_CONST}/category/adoption`,
  },
]);

// GEO: AI가 반려동물 용어 정의를 추출할 수 있도록 DefinedTermSet 추가
const HOME_TERMS = definedTermSetSchema("반려동물 기본 용어", [
  { name: "동물등록", description: "반려견을 지방자치단체에 등록하는 제도. 분실 시 소유자 확인에 필수. 2개월령 이상 개는 의무 등록 대상." },
  { name: "유기동물", description: "소유자가 포기하거나 잃어버린 반려동물. 지방자치단체 보호소에서 일정 기간 보호 후 입양·안락사 등 처리." },
  { name: "펫보험", description: "반려동물의 의료비를 보장하는 보험 상품. 수술비·입원비·통원치료비 등을 보장하며 상품마다 보장 범위가 다름." },
  { name: "중성화수술", description: "반려동물의 번식 능력을 제거하는 수술. 호르몬 관련 질환 예방 및 개체 수 조절 효과가 있음." },
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

  const CAT_COLORS: Record<number, { color: string; soft: string }> = {
    1: { color: "var(--cat-1)", soft: "var(--cat-1-soft)" },
    2: { color: "var(--cat-2)", soft: "var(--cat-2-soft)" },
    3: { color: "var(--cat-3)", soft: "var(--cat-3-soft)" },
    4: { color: "var(--cat-4)", soft: "var(--cat-4-soft)" },
    5: { color: "var(--cat-5)", soft: "var(--cat-5-soft)" },
    6: { color: "var(--cat-6)", soft: "var(--cat-6-soft)" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_TERMS) }} />
      <main>
        {/* ── HERO ── */}
        <section style={{ padding: "80px 0 56px" }} aria-label="사이트 소개">
          <div className="pj-container-7xl" style={{ padding: "0 32px" }}>
            <div className="grid gap-14 items-center" style={{ gridTemplateColumns: "1.25fr 1fr" }}>
              <div>
                <span className="pj-eyebrow">반려가족을 위한 안내서</span>
                <h1 className="pj-display" style={{ fontSize: "clamp(40px,5vw,58px)", marginTop: 16, marginBottom: 24, lineHeight: 1.15 }}>
                  동물병원부터<br/>
                  마지막 인사까지<br/>
                  <span style={{ color: "var(--brand-accent-warm)" }}>한 곳에서</span>
                </h1>
                <p style={{ fontSize: 18, color: "var(--brand-text-secondary)", maxWidth: 480, lineHeight: 1.65 }}>
                  공공데이터 기반 전국 {formatCount(stats.businesses)}개 이상의 동물병원·펫미용·펫호텔·장묘업체와
                  수의사 검토를 거친 가이드를 안내합니다.
                </p>

                <div style={{ marginTop: 32, display: "flex", gap: 10 }}>
                  <Link href="/sido/seoul" className="pj-btn pj-btn-accent pj-btn-lg">동물병원 찾기</Link>
                  <Link href="/category/health" className="pj-btn pj-btn-ghost pj-btn-lg">건강 가이드</Link>
                </div>

                <div style={{ display: "flex", gap: 32, marginTop: 36 }}>
                  {STATS.map(s => (
                    <div key={s.label}>
                      <div className="pj-display" style={{ fontSize: 26, fontWeight: 600 }}>{s.value}</div>
                      <div className="pj-tiny" style={{ marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 히어로 사진 자리 */}
              <div className="pj-photo hidden md:flex" style={{ aspectRatio: "3/4" }} data-variant="dog" />
            </div>
          </div>
        </section>

        {/* ── 6대 카테고리 ── */}
        <section style={{ padding: "64px 0", background: "var(--brand-surface-2)" }} aria-label="카테고리">
          <div className="pj-container-7xl" style={{ padding: "0 32px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
              <div>
                <span className="pj-numeral" style={{ fontSize: 14 }}>01</span>
                <h2 className="pj-display" style={{ fontSize: 32, marginTop: 4 }}>여섯 갈래로 정리한 안내서</h2>
              </div>
              <Link href="/category/health" style={{ color: "var(--brand-accent-warm)", fontWeight: 600, textDecoration: "none" }}>전체 보기 →</Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat, i) => {
                const cc = CAT_COLORS[cat.id] ?? { color: "var(--brand-accent)", soft: "var(--brand-accent-soft)" };
                const meta = CATEGORY_META[cat.id];
                const isDark = cat.id === 6;
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="pj-card pj-card-hover"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      background: isDark ? "#2c2c2c" : "var(--brand-surface)",
                      borderColor: isDark ? "#3a3a3a" : "var(--brand-border)",
                      padding: 24,
                      minHeight: 180,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: cc.soft, color: cc.color,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontSize: 22 }}>{meta.emoji}</span>
                      </div>
                      <span className="pj-numeral" style={{ fontSize: 13, color: isDark ? "#8c8780" : undefined }}>0{i + 1}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: isDark ? "#f5f1ea" : "var(--brand-text)", marginBottom: 4 }}>{cat.name}</div>
                      <div className="pj-tiny" style={{ color: isDark ? "#b8b3aa" : undefined }}>{meta.desc}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 14, fontSize: 13, fontWeight: 600, color: cc.color }}>
                        {meta.cta} →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 지역 빠른 검색 ── */}
        <section style={{ padding: "72px 0" }} aria-label="지역별 검색">
          <div className="pj-container-7xl" style={{ padding: "0 32px" }}>
            <div className="grid gap-14 items-start" style={{ gridTemplateColumns: "1fr 2fr" }}>
              <div style={{ position: "sticky", top: 24 }}>
                <span className="pj-numeral" style={{ fontSize: 14 }}>02</span>
                <h2 className="pj-display" style={{ fontSize: 32, marginTop: 4, marginBottom: 12 }}>우리 동네부터<br/>살펴보세요</h2>
                <p style={{ color: "var(--brand-text-secondary)", fontSize: 15, lineHeight: 1.7 }}>
                  전국 17개 시·도, 226개 시·군·구 단위로 정리했습니다. 행정안전부 공공데이터를 매일 동기화합니다.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
                {SIDO_LIST.map((sido) => (
                  <Link
                    key={sido.slug}
                    href={`/sido/${sido.slug}`}
                    className="pj-card pj-card-hover"
                    style={{ padding: "14px 16px", textDecoration: "none", color: "inherit" }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{sido.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 에디토리얼 브레이크 ── */}
        <section style={{ padding: "48px 0", background: "var(--brand-text)", color: "var(--brand-bg)" }}>
          <div className="pj-container-5xl" style={{ padding: "32px 24px", textAlign: "center" }}>
            <span className="pj-eyebrow" style={{ color: "var(--brand-accent)" }}>왜 펫지기인가</span>
            <p className="pj-display" style={{ fontSize: "clamp(22px,3vw,30px)", marginTop: 14, lineHeight: 1.5, color: "var(--brand-bg)", maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
              "검색 한 번이면 우리 동네 동물병원,<br/>
              우리 강아지 견종 정보, 그리고 마지막 인사까지<br/>
              <span style={{ color: "var(--brand-accent)" }}>제대로 정리된 안내</span>를 받을 수 있어야 한다고 믿습니다."
            </p>
          </div>
        </section>

        {/* ── 최근 가이드 ── */}
        {recentGuides.length > 0 && (
          <section style={{ padding: "72px 0" }} aria-label="최근 가이드">
            <div className="pj-container-7xl" style={{ padding: "0 32px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
                <div>
                  <span className="pj-numeral" style={{ fontSize: 14 }}>03</span>
                  <h2 className="pj-display" style={{ fontSize: 32, marginTop: 4 }}>이번 주 가이드</h2>
                </div>
                <Link href="/category/health" style={{ color: "var(--brand-accent-warm)", fontWeight: 600, textDecoration: "none" }}>전체 가이드 →</Link>
              </div>

              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
                {recentGuides.map((guide) => {
                  const cat = CATEGORIES[guide.category as keyof typeof CATEGORIES];
                  const meta = CATEGORY_META[guide.category];
                  const cc = CAT_COLORS[guide.category] ?? { color: "var(--brand-accent)", soft: "var(--brand-accent-soft)" };
                  return (
                    <Link
                      key={guide.slug}
                      href={`/guide/${guide.slug}`}
                      className="pj-card pj-card-hover"
                      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: 12, padding: 18 }}
                    >
                      <div className="pj-photo" data-variant="paw" style={{ aspectRatio: "16/9", background: `linear-gradient(135deg, ${cc.soft}, var(--brand-accent-soft))` }} />
                      <span className="pj-pill" style={{ background: cc.soft, color: cc.color, alignSelf: "flex-start", fontSize: 12 }}>
                        <span className="pj-pill-dot" style={{ background: cc.color }} />
                        {cat?.name ?? "가이드"}
                      </span>
                      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}>{guide.title}</h3>
                      {guide.publishedAt && (
                        <time className="pj-tiny" dateTime={guide.publishedAt} style={{ marginTop: "auto" }}>
                          {guide.publishedAt.slice(0, 10)}
                        </time>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── 신뢰 섹션 ── */}
        <section style={{ padding: "56px 0", borderTop: "1px solid var(--brand-border)" }}>
          <div className="pj-container-7xl" style={{ padding: "0 32px" }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: "🛡️", title: "수의사·변호사 검토", desc: "의료·법률 카테고리는 자격을 가진 전문가가 검토한 콘텐츠만 게재합니다." },
                { icon: "📊", title: "공공데이터 매일 동기화", desc: "행정안전부 데이터포털·국가동물보호정보시스템 자료를 매일 갱신합니다." },
                { icon: "🔍", title: "광고와 정보의 분리", desc: "광고·제휴 링크는 본문과 명확히 구분 표시합니다. 추모 페이지에는 광고를 게재하지 않습니다." },
              ].map(b => (
                <div key={b.title}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{b.icon}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{b.title}</h4>
                  <p className="pj-muted" style={{ fontSize: 14, lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 뉴스레터 ── */}
        <section style={{ padding: "56px 0 72px" }} aria-label="뉴스레터 구독">
          <div className="pj-container-5xl" style={{ padding: "0 24px" }}>
            <div style={{ background: "var(--brand-accent)", borderRadius: "var(--r-card)", padding: "40px 48px", textAlign: "center" }}>
              <span className="pj-eyebrow" style={{ color: "#1a1f15", marginBottom: 10 }}>뉴스레터</span>
              <h2 className="pj-display" style={{ fontSize: 28, marginTop: 10, marginBottom: 12, color: "#1a1f15" }}>
                반려동물 건강 정보를 이메일로 받아보세요
              </h2>
              <p style={{ fontSize: 15, opacity: 0.8, marginBottom: 24, color: "#1a1f15" }}>
                월 2회, 수의사·전문가 검토를 거친 콘텐츠만 엄선해 보내드립니다.
              </p>
              <div style={{ maxWidth: 480, margin: "0 auto" }}>
                <SubscribeForm source="home_newsletter" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
