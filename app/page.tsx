import type { Metadata } from "next";
import Link from "next/link";
import { getCachedStats, getCachedRecentGuides, getCachedRecentBlogPosts } from "@/lib/db-queries";
import { CATEGORIES } from "@/lib/category";
import { SubscribeForm } from "@/components/forms/subscribe-form";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { AdsenseTrustSection } from "@/components/content/adsense-trust-section";

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


function formatCount(n: number) {
  if (n >= 10000) return `${Math.floor(n / 1000)}천+`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천+`;
  return `${n}+`;
}

export default async function HomePage() {
  const categories = Object.values(CATEGORIES);
  const [recentGuides, stats, recentBlogPosts] = await Promise.all([getCachedRecentGuides(), getCachedStats(), getCachedRecentBlogPosts()]);

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
    <AdPolicyProvider category={5}>
      <main>
        {/* ── HERO ── */}
        <section className="py-12 sm:py-16 md:py-20" aria-label="사이트 소개">
          <div className="pj-container-7xl">
            <div className="grid gap-8 md:gap-14 items-center grid-cols-1 md:grid-cols-[1.25fr_1fr]">
              <div>
                <span className="pj-eyebrow">반려가족을 위한 안내서</span>
                <h1 className="pj-display" style={{ fontSize: "clamp(40px,5vw,58px)", marginTop: 16, marginBottom: 24, lineHeight: 1.15 }} data-speakable>
                  동물병원부터<br/>
                  마지막 인사까지<br/>
                  <span style={{ color: "var(--brand-accent-warm)" }}>한 곳에서</span>
                </h1>
                <p style={{ fontSize: 18, color: "var(--brand-text-secondary)", maxWidth: 480, lineHeight: 1.65 }}>
                  공공데이터 기반 전국 {formatCount(stats.businesses)}개 이상의 동물병원·펫미용·펫호텔·장묘업체와
                  출처와 주의사항을 함께 제시한 가이드를 안내합니다.
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
        <section className="py-12 sm:py-16" style={{ background: "var(--brand-surface-2)" }} aria-label="카테고리">
          <div className="pj-container-7xl">
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
        <section className="py-12 sm:py-16 md:py-20" aria-label="지역별 검색">
          <div className="pj-container-7xl">
            <div className="grid gap-8 md:gap-14 items-start grid-cols-1 md:grid-cols-[1fr_2fr]">
              <div className="md:sticky md:top-6">
                <span className="pj-numeral" style={{ fontSize: 14 }}>02</span>
                <h2 className="pj-display" style={{ fontSize: 32, marginTop: 4, marginBottom: 12 }}>우리 동네부터<br/>살펴보세요</h2>
                <p style={{ color: "var(--brand-text-secondary)", fontSize: 15, lineHeight: 1.7 }}>
                  전국 17개 시·도와 서비스에 등록된 시·군·구 단위로 정리했습니다. 데이터 종류별 일정에 따라 공공데이터를 갱신합니다.
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
        <section className="py-10 sm:py-14" style={{ background: "var(--brand-text)", color: "var(--brand-bg)" }}>
          <div className="pj-container-5xl" style={{ textAlign: "center" }}>
            <span className="pj-eyebrow" style={{ color: "var(--brand-accent)" }}>왜 펫지기인가</span>
            <p className="pj-display" style={{ fontSize: "clamp(22px,3vw,30px)", marginTop: 14, lineHeight: 1.5, color: "var(--brand-bg)", maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
              &ldquo;검색 한 번이면 우리 동네 동물병원,<br/>
              우리 강아지 견종 정보, 그리고 마지막 인사까지<br/>
              <span style={{ color: "var(--brand-accent)" }}>제대로 정리된 안내</span>를 받을 수 있어야 한다고 믿습니다.&rdquo;
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16" aria-label="정보 검증 기준">
          <div className="pj-container-7xl">
            <AdsenseTrustSection />
          </div>
        </section>

        <div className="pj-container-7xl py-6">
          <AdSlot adType="adsense" format="horizontal" />
        </div>

        {/* ── 최근 가이드 ── */}
        {recentGuides.length > 0 && (
          <section className="py-12 sm:py-16 md:py-20" aria-label="최근 가이드">
            <div className="pj-container-7xl">
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
                <div>
                  <span className="pj-numeral" style={{ fontSize: 14 }}>03</span>
                  <h2 className="pj-display" style={{ fontSize: 32, marginTop: 4 }}>최근 가이드</h2>
                </div>
                <Link href="/guide" style={{ color: "var(--brand-accent-warm)", fontWeight: 600, textDecoration: "none" }}>전체 가이드 →</Link>
              </div>

              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
                {recentGuides.map((guide) => {
                  const cat = CATEGORIES[guide.category as keyof typeof CATEGORIES];
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

        {/* ── 최근 블로그 ── */}
        {recentBlogPosts.length > 0 && (
          <section className="py-12 sm:py-16" aria-label="최근 블로그">
            <div className="pj-container-7xl">
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
                <div>
                  <span className="pj-numeral" style={{ fontSize: 14 }}>04</span>
                  <h2 className="pj-display" style={{ fontSize: 32, marginTop: 4 }}>집사 에디터 블로그</h2>
                </div>
                <Link href="/blog" style={{ color: "var(--brand-accent-warm)", fontWeight: 600, textDecoration: "none" }}>전체 글 보기 →</Link>
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" }}>
                {recentBlogPosts.map((post) => {
                  const cc = CAT_COLORS[post.category ?? 5] ?? { color: "var(--brand-accent)", soft: "var(--brand-accent-soft)" };
                  const cat = CATEGORIES[post.category as keyof typeof CATEGORIES];
                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="pj-card pj-card-hover"
                      style={{ textDecoration: "none", color: "inherit", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}
                    >
                      <span
                        style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 99, background: cc.soft, color: cc.color, alignSelf: "flex-start" }}
                      >
                        {cat?.name ?? "케어·라이프"}
                      </span>
                      <p style={{ fontSize: 15, fontWeight: 700, color: "var(--brand-text)", lineHeight: 1.5, wordBreak: "keep-all" }}>
                        {post.title}
                      </p>
                      {post.subtitle && (
                        <p style={{ fontSize: 13, color: "var(--brand-text-secondary)", lineHeight: 1.55, wordBreak: "keep-all" }} className="line-clamp-2">
                          {post.subtitle}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── 주요 콘텐츠 허브 ── */}
        <section className="py-12 sm:py-16" style={{ background: "var(--brand-surface-2)" }} aria-label="주요 콘텐츠">
          <div className="pj-container-7xl">
            <div style={{ marginBottom: 32 }}>
              <span className="pj-numeral" style={{ fontSize: 14 }}>05</span>
              <h2 className="pj-display" style={{ fontSize: 32, marginTop: 4 }}>꼭 알아야 할 정보</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  href: "/condition",
                  emoji: "💊",
                  title: "질병·증상 정보",
                  desc: "슬개골 탈구, 심장사상충, 고양이 FLUTD 등 질환 관련 정보를 정리합니다. 출처와 검토 정보는 개별 콘텐츠에서 확인하세요.",
                  cta: "질환 정보 보기",
                  color: "var(--cat-3)",
                  soft: "var(--cat-3-soft)",
                },
                {
                  href: "/breed",
                  emoji: "🐾",
                  title: "견종·묘종 도감",
                  desc: "강아지·고양이·소동물 30종 이상의 품종별 특징, 성격, 평균 수명, 흔한 질병 정보를 확인하세요.",
                  cta: "품종 도감 보기",
                  color: "var(--cat-1)",
                  soft: "var(--cat-1-soft)",
                },
                {
                  href: "/insurance",
                  emoji: "📋",
                  title: "펫보험 안내",
                  desc: "현대해상·DB손보·KB손보 등 6대 손보사 펫보험을 보장범위·보험료·자기부담금 기준으로 비교합니다.",
                  cta: "펫보험 비교",
                  color: "var(--cat-4)",
                  soft: "var(--cat-4-soft)",
                },
              ].map((hub) => (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className="pj-card pj-card-hover"
                  style={{ textDecoration: "none", color: "inherit", padding: 24, display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: hub.soft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 24 }}>{hub.emoji}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--brand-text)" }}>{hub.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--brand-text-secondary)", lineHeight: 1.65, flex: 1 }}>{hub.desc}</p>
                  <span style={{ fontSize: 13, fontWeight: 600, color: hub.color }}>{hub.cta} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 신뢰 섹션 ── */}
        <section className="py-10 sm:py-14" style={{ borderTop: "1px solid var(--brand-border)" }}>
          <div className="pj-container-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: "🛡️", title: "출처와 검토 정보", desc: "건강·의료와 보험·법률 정보는 개인별 판단을 대신하지 않습니다. 참고 자료와 제공된 검토 정보를 확인해 주세요." },
                { icon: "📊", title: "자료별 주기로 수집", desc: "영업장은 월 2회, 구조동물은 매일, 보호센터는 월 1회 수집을 예약합니다. 원본 제공과 수집 성공 여부에 따라 반영이 지연될 수 있습니다." },
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
        <section className="py-10 sm:py-14 pb-16 sm:pb-20" aria-label="뉴스레터 구독">
          <div className="pj-container-5xl">
            <div style={{ background: "var(--brand-accent)", borderRadius: "var(--r-card)", padding: "40px 48px", textAlign: "center" }}>
              <span className="pj-eyebrow" style={{ color: "#1a1f15", marginBottom: 10 }}>뉴스레터</span>
              <h2 className="pj-display" style={{ fontSize: 28, marginTop: 10, marginBottom: 12, color: "#1a1f15" }}>
                반려동물 건강 정보를 이메일로 받아보세요
              </h2>
              <p style={{ fontSize: 15, opacity: 0.8, marginBottom: 24, color: "#1a1f15" }}>
                반려동물 생활 정보와 사이트 소식 수신을 신청할 수 있습니다.
              </p>
              <div style={{ maxWidth: 480, margin: "0 auto" }}>
                <SubscribeForm source="home_newsletter" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </AdPolicyProvider>
  );
}
