import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { eq, and, desc, lte } from "drizzle-orm";
import { CATEGORIES } from "@/lib/category";
import type { CategoryId } from "@/lib/category";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "블로그", url: `${SITE_URL}/blog` },
]);

export const metadata: Metadata = {
  title: "반려동물 블로그 — 집사 생활의 모든 것 | 펫지기",
  description:
    "강아지·고양이와 함께하는 일상 팁부터 건강·사료·보험까지. 펫지기 집사 에디터가 직접 경험하고 조사한 반려동물 정보를 공유합니다.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "반려동물 블로그 | 펫지기",
    description: "집사 에디터가 쓰는 반려동물 생활 정보 블로그.",
  },
};

const CATEGORY_EMOJI: Record<number, string> = {
  1: "🐾", 2: "🥗", 3: "💊", 4: "📋", 5: "✂️", 6: "🕊️",
};

const CATEGORY_LABEL: Record<number, string> = {
  1: "입양·등록", 2: "사료·영양", 3: "건강·의료",
  4: "보험·법률", 5: "케어·라이프", 6: "장례·추모",
};

async function getAllPosts() {
  return db
    .select({
      slug: contents.slug,
      title: contents.title,
      category: contents.category,
      publishedAt: contents.publishedAt,
      metaDescription: contents.metaDescription,
      ymyl: contents.ymyl,
      authorName: contents.authorName,
    })
    .from(contents)
    .where(and(
      eq(contents.status, "published"),
      eq(contents.type, "blog"),
      lte(contents.publishedAt, new Date().toISOString())
    ))
    .orderBy(desc(contents.publishedAt));
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">블로그</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-3">펫지기 블로그</h1>
          <p className="text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl">
            강아지·고양이와 함께하는 집사 생활의 모든 것.<br />
            입양·건강·사료·보험·케어까지, 직접 경험하고 조사한 정보를 나눕니다.
          </p>
        </div>

        {/* 카테고리 필터 칩 */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-accent)] text-white"
          >
            전체
          </Link>
          {[1, 2, 3, 4, 5].map((catId) => (
            <Link
              key={catId}
              href={`/blog?cat=${catId}`}
              className="px-3 py-1 rounded-full text-xs font-semibold border border-[var(--brand-border)] text-[var(--brand-text-secondary)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors"
            >
              {CATEGORY_EMOJI[catId]} {CATEGORY_LABEL[catId]}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4">🐾</p>
            <p className="text-[var(--brand-text-secondary)] text-sm">첫 번째 글을 준비 중입니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col p-5 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--brand-border)] text-[var(--brand-text-secondary)] font-medium">
                    {CATEGORY_EMOJI[post.category ?? 1]} {CATEGORY_LABEL[post.category ?? 1]}
                  </span>
                  {post.ymyl && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--cat-3-soft)] text-[var(--cat-3)] font-semibold">
                      전문가 검토
                    </span>
                  )}
                </div>
                <h2 className="font-bold text-sm text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug mb-2" style={{ wordBreak: "keep-all" }}>
                  {post.title}
                </h2>
                {post.metaDescription && (
                  <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed line-clamp-2 flex-1">
                    {post.metaDescription}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-3 text-xs text-[var(--brand-text-secondary)]">
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt}>{post.publishedAt.slice(0, 10)}</time>
                  )}
                  {post.authorName && <span>{post.authorName}</span>}
                </div>
              </Link>
            ))}
          </div>
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
    </>
  );
}
