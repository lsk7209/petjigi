import type { Metadata } from "next";
import Link from "next/link";
import { getCachedAllBlogPosts } from "@/lib/db-queries";
import { breadcrumbSchema, itemListSchema, collectionPageSchema, definedTermSetSchema } from "@/lib/seo/structured-data";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import type { CategoryId } from "@/lib/category";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";
const PAGE_SIZE = 24;

const CATEGORY_EMOJI: Record<number, string> = {
  1: "🐾", 2: "🥗", 3: "💊", 4: "📋", 5: "✂️", 6: "🕊️",
};

const CATEGORY_LABEL: Record<number, string> = {
  1: "입양·등록", 2: "사료·영양", 3: "건강·의료",
  4: "보험·법률", 5: "케어·라이프", 6: "장례·추모",
};


export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; page?: string }>;
}): Promise<Metadata> {
  const { cat, page } = await searchParams;
  const catId = cat ? parseInt(cat, 10) : null;
  const currentPage = page ? Math.max(1, parseInt(page, 10)) : 1;
  const catName = catId && CATEGORY_LABEL[catId] ? ` · ${CATEGORY_LABEL[catId]}` : "";

  function buildCanonical(c: number | null, p: number) {
    const params = new URLSearchParams();
    if (c) params.set("cat", String(c));
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ""}`;
  }

  const canonical = buildCanonical(catId, currentPage);

  return {
    title: `반려동물 블로그${catName}${currentPage > 1 ? ` — ${currentPage}페이지` : " — 집사 생활의 모든 것"} | 펫지기`,
    description:
      "강아지·고양이와 함께하는 일상 팁부터 건강·사료·보험까지. 펫지기 집사 에디터가 직접 경험하고 조사한 반려동물 정보를 공유합니다.",
    alternates: {
      canonical,
    },
    openGraph: {
      title: "반려동물 블로그 | 펫지기",
      description: "집사 에디터가 쓰는 반려동물 생활 정보 블로그.",
    },
  };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; page?: string }>;
}) {
  const { cat, page: pageParam } = await searchParams;
  const catId = cat ? parseInt(cat, 10) : null;
  const currentPage = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;

  const allPosts = await getCachedAllBlogPosts();
  const filtered = catId && !isNaN(catId) && CATEGORY_LABEL[catId]
    ? allPosts.filter((p) => p.category === catId)
    : allPosts;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const posts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const BREADCRUMB = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "블로그", url: `${SITE_URL}/blog` },
  ]);

  const COLLECTION_PAGE = collectionPageSchema(
    "펫지기 블로그",
    `${SITE_URL}/blog`,
    "강아지·고양이와 함께하는 집사 생활 정보 블로그. 입양·건강·사료·보험·케어 분야."
  );

  const POST_LIST = itemListSchema(
    filtered.slice(0, 100).map((p, i) => ({
      position: i + 1,
      name: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      description: p.metaDescription ?? undefined,
    }))
  );

  const BLOG_TERMS = definedTermSetSchema("반려동물 생활 용어", [
    { name: "반려동물 등록", description: "지방자치단체에 반려견을 등록하는 의무 절차. 내장형 마이크로칩 또는 외장형 인식표 방식으로 등록합니다." },
    { name: "입양 전 준비", description: "반려동물 입양 전 생활 공간·비용·시간 등 여건을 점검하는 과정. 충동 입양은 유기 동물 증가의 주요 원인입니다." },
    { name: "펫 에티켓", description: "다른 사람과 동물을 배려하는 반려동물 보호자의 매너. 목줄 착용, 배변 처리, 공공장소 출입 규칙 준수 등이 포함됩니다." },
    { name: "유기동물", description: "보호자 없이 배회하다 구조된 동물. 전국 동물보호센터에서 입양 신청이 가능합니다." },
  ]);

  function buildHref(newCat: number | null, newPage: number) {
    const params = new URLSearchParams();
    if (newCat) params.set("cat", String(newCat));
    if (newPage > 1) params.set("page", String(newPage));
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ""}`;
  }

  return (
    <AdPolicyProvider category={(catId as CategoryId) ?? 1}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_TERMS) }} />
      {filtered.length > 0 && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_PAGE) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(POST_LIST) }} />
        </>
      )}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          {catId && CATEGORY_LABEL[catId] ? (
            <>
              <Link href="/blog" className="hover:text-[var(--brand-accent)] transition-colors">블로그</Link>
              <span aria-hidden="true">›</span>
              <span className="text-[var(--brand-text)]" aria-current="page">{CATEGORY_LABEL[catId]}</span>
            </>
          ) : (
            <span className="text-[var(--brand-text)]" aria-current="page">블로그</span>
          )}
        </nav>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-2 sm:mb-3 tracking-tight" style={{ wordBreak: "keep-all" }} data-speakable>
            {catId && CATEGORY_LABEL[catId]
              ? `${CATEGORY_EMOJI[catId]} ${CATEGORY_LABEL[catId]} 블로그`
              : "펫지기 블로그"}
          </h1>
          <p className="text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl text-sm sm:text-base">
            강아지·고양이와 함께하는 집사 생활의 모든 것.<br />
            입양·건강·사료·보험·케어까지, 직접 경험하고 조사한 정보를 나눕니다.
          </p>
        </div>

        {/* 카테고리 필터 칩 */}
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="카테고리 필터">
          <Link
            href="/blog"
            aria-current={!catId ? "page" : undefined}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              !catId
                ? "bg-[var(--brand-accent)] text-white"
                : "border border-[var(--brand-border)] text-[var(--brand-text-secondary)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
            }`}
          >
            전체 {!catId && `(${allPosts.length})`}
          </Link>
          {([1, 2, 3, 4, 5, 6] as const).map((id) => (
            <Link
              key={id}
              href={buildHref(id, 1)}
              aria-current={catId === id ? "page" : undefined}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                catId === id
                  ? "bg-[var(--brand-accent)] text-white"
                  : "border border-[var(--brand-border)] text-[var(--brand-text-secondary)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
              }`}
            >
              {CATEGORY_EMOJI[id]} {CATEGORY_LABEL[id]}
              {catId === id && ` (${filtered.length})`}
            </Link>
          ))}
        </div>

        <AdSlot adType="adsense" format="horizontal" className="mb-6" />

        {/* 결과 수 */}
        {filtered.length > 0 && (
          <p className="text-xs text-[var(--brand-text-secondary)] mb-4">
            {catId && CATEGORY_LABEL[catId] ? `${CATEGORY_LABEL[catId]} ` : "전체 "}
            {filtered.length}개 글
            {totalPages > 1 && ` · ${currentPage}/${totalPages} 페이지`}
          </p>
        )}

        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4">🐾</p>
            <p className="text-[var(--brand-text-secondary)] text-sm">
              {catId ? "해당 카테고리에 글이 없습니다." : "첫 번째 글을 준비 중입니다."}
            </p>
            {catId && (
              <Link href="/blog" className="mt-4 inline-block text-sm text-[var(--brand-accent)] hover:underline">
                전체 글 보기 →
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => {
              const catId = post.category ?? 1;
              // metaDescription 기준 추정 (본문은 통상 설명의 15~20배)
              const readingTime = Math.max(3, Math.ceil(((post.metaDescription?.length ?? 80) * 18) / 500));
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:shadow-md transition-all overflow-hidden"
                  style={{ '--card-cat': `var(--cat-${catId})`, '--card-cat-soft': `var(--cat-${catId}-soft)` } as React.CSSProperties}
                >
                  {/* 카테고리 색 상단 바 */}
                  <div className="h-1.5 transition-opacity" style={{ background: `var(--cat-${catId})` }} />
                  <div className="flex flex-col p-5 flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: `var(--cat-${catId}-soft)`, color: `var(--cat-${catId})` }}
                      >
                        {CATEGORY_EMOJI[catId]} {CATEGORY_LABEL[catId]}
                      </span>
                      {post.ymyl && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                          전문가 검토
                        </span>
                      )}
                    </div>
                    <h2
                      className="font-bold text-sm sm:text-base text-[var(--brand-text)] transition-colors leading-snug mb-2 line-clamp-2"
                      style={{ wordBreak: "keep-all", ['--tw-prose-headings' as string]: `var(--cat-${catId})` }}
                    >
                      <span className="group-hover:text-[var(--card-cat,var(--brand-accent))] transition-colors">
                        {post.title}
                      </span>
                    </h2>
                    {post.metaDescription && (
                      <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed line-clamp-2 flex-1 mb-3">
                        {post.metaDescription}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-auto text-xs text-[var(--brand-text-secondary)] flex-wrap">
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt}>{post.publishedAt.slice(0, 10)}</time>
                      )}
                      <span aria-hidden="true">·</span>
                      <span>⏱ {readingTime}분</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-2 mt-10" aria-label="페이지 탐색">
            {currentPage > 1 && (
              <Link
                href={buildHref(catId, currentPage - 1)}
                className="px-4 min-h-[44px] rounded-lg border border-[var(--brand-border)] text-sm hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors flex items-center"
                aria-label="이전 페이지"
              >
                ← 이전
              </Link>
            )}
            <div className="flex items-center gap-1">
              {(() => {
                const pages: (number | "...")[] = [];
                for (let p = 1; p <= totalPages; p++) {
                  if (p === 1 || p === totalPages || (p >= currentPage - 2 && p <= currentPage + 2)) {
                    pages.push(p);
                  } else if (pages[pages.length - 1] !== "...") {
                    pages.push("...");
                  }
                }
                return pages.map((p, i) =>
                  p === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-[var(--brand-text-secondary)] text-sm">…</span>
                  ) : (
                    <Link
                      key={p}
                      href={buildHref(catId, p)}
                      aria-current={p === currentPage ? "page" : undefined}
                      className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === currentPage
                          ? "bg-[var(--brand-accent)] text-white"
                          : "border border-[var(--brand-border)] text-[var(--brand-text-secondary)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
                      }`}
                    >
                      {p}
                    </Link>
                  )
                );
              })()}
            </div>
            {currentPage < totalPages && (
              <Link
                href={buildHref(catId, currentPage + 1)}
                className="px-4 min-h-[44px] rounded-lg border border-[var(--brand-border)] text-sm hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors flex items-center"
                aria-label="다음 페이지"
              >
                다음 →
              </Link>
            )}
          </nav>
        )}

        {/* 가이드 연결 섹션 */}
        <section className="mt-12 pt-8 border-t border-[var(--brand-border)]">
          <h2 className="text-base font-semibold text-[var(--brand-text)] mb-4">전문가 검토 가이드도 읽어보세요</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guide" className="text-sm text-[var(--brand-accent)] hover:underline">
              📚 수의사 검토 가이드 →
            </Link>
            <Link href="/condition" className="text-sm text-[var(--brand-accent)] hover:underline">
              💊 질병·증상 정보 →
            </Link>
            <Link href="/insurance/compare" className="text-sm text-[var(--brand-accent)] hover:underline">
              📋 펫보험 비교 →
            </Link>
          </div>
        </section>
      </main>
    </AdPolicyProvider>
  );
}
