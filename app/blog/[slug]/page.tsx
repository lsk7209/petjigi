import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { and, eq, ne, desc } from "drizzle-orm";
import type { CategoryId } from "@/lib/category";
import { CATEGORIES } from "@/lib/category";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";
import { TableOfContents } from "@/components/content/table-of-contents";
import { ReadingProgress } from "@/components/content/reading-progress";
import { ShareButtons } from "@/components/content/share-buttons";
import { CategoryCta } from "@/components/content/category-cta";
import { ScrollDepthTracker } from "@/components/analytics/scroll-depth-tracker";
import { OutboundLinkTracker } from "@/components/analytics/outbound-link-tracker";
import { GuideViewTracker } from "@/components/analytics/guide-view-tracker";
import type { TocHeading } from "@/components/content/table-of-contents";

export const revalidate = 604800;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const getBlogContent = cache(async (slug: string) =>
  db
    .select()
    .from(contents)
    .where(and(eq(contents.slug, slug), eq(contents.status, "published")))
    .get()
);

export async function generateStaticParams() {
  try {
    const rows = await db
      .select({ slug: contents.slug })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "blog")));
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getBlogContent(slug);

  if (!content) return {};

  const title = content.metaTitle ?? `${content.title} | 펫지기`;
  const catName = CATEGORIES[content.category as CategoryId]?.name ?? "반려동물";
  const description =
    content.metaDescription ??
    `${content.title} — 반려동물 ${catName} 정보. 집사 에디터가 직접 경험하고 조사한 블로그. | 펫지기`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: content.publishedAt ?? undefined,
      modifiedTime: content.updatedAt,
      authors: content.authorName ? [content.authorName] : undefined,
      section: CATEGORIES[content.category as CategoryId]?.name,
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `/blog/${slug}` },
  };
}

async function getRelatedPosts(slug: string, category: number) {
  return db
    .select({
      slug: contents.slug,
      title: contents.title,
      category: contents.category,
      metaDescription: contents.metaDescription,
    })
    .from(contents)
    .where(
      and(
        eq(contents.status, "published"),
        eq(contents.type, "blog"),
        eq(contents.category, category),
        ne(contents.slug, slug)
      )
    )
    .orderBy(desc(contents.publishedAt))
    .limit(4);
}

function extractHeadings(html: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const re = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    const level = parseInt(match[1]) as 2 | 3;
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    if (!text) continue;
    const id = `h-${headings.length}-${text.slice(0, 30).replace(/[^\w가-힣]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")}`;
    headings.push({ id, level, text });
  }
  return headings;
}

function injectHeadingIds(html: string, headings: TocHeading[]): string {
  let idx = 0;
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_, level, attrs, inner) => {
    const h = headings[idx++];
    if (!h) return _;
    if (attrs.includes("id=")) return _;
    return `<h${level}${attrs} id="${h.id}">${inner}</h${level}>`;
  });
}

const CATEGORY_EMOJI: Record<number, string> = {
  1: "🐾", 2: "🥗", 3: "💊", 4: "📋", 5: "✂️", 6: "🕊️",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getBlogContent(slug);

  if (!content) notFound();

  const categoryId = content.category as CategoryId;
  const cat = CATEGORIES[categoryId];
  const relatedPosts = await getRelatedPosts(slug, content.category);

  const headings = extractHeadings(content.body ?? "");
  const bodyWithIds = injectHeadingIds(content.body ?? "", headings);

  const plainText = (content.body ?? "").replace(/<[^>]+>/g, "");
  const wordCount = plainText.trim().length > 0
    ? Math.max(1, Math.round(plainText.replace(/\s+/g, "").length / 2))
    : undefined;

  const faqItems = (() => {
    const items: { question: string; answer: string }[] = [];
    const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
    let m;
    while ((m = re.exec(content.body ?? "")) !== null) {
      const q = m[1].replace(/<[^>]+>/g, "").trim();
      const a = m[2].replace(/<[^>]+>/g, "").trim();
      if (q.endsWith("?") && a.length > 20 && q.length < 200) {
        items.push({ question: q, answer: a.slice(0, 300) });
      }
    }
    return items.slice(0, 8);
  })();

  const article = articleSchema({
    title: content.title,
    description: content.metaDescription ?? undefined,
    url: `${SITE_URL}/blog/${slug}`,
    authorName: content.authorName,
    authorCredential: content.authorCredential,
    publishedAt: content.publishedAt,
    reviewedAt: content.reviewedAt,
    reviewerName: content.reviewerName,
    isYmyl: content.ymyl,
    wordCount,
  });

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "블로그", url: `${SITE_URL}/blog` },
    { name: cat?.name ?? "반려동물", url: `${SITE_URL}/category/${cat?.slug ?? "care"}` },
    { name: content.title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  const readingTime = Math.ceil((content.body?.length ?? 0) / 500);

  return (
    <>
      <ReadingProgress />
      <ScrollDepthTracker />
      <GuideViewTracker slug={slug} title={content.title} category={content.category} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqItems.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }} />
      )}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1 sm:gap-1.5 flex-wrap"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href="/blog" className="hover:text-[var(--brand-accent)] transition-colors">블로그</Link>
          <span aria-hidden="true">›</span>
          <Link
            href={`/category/${cat?.slug ?? "care"}`}
            className="hover:text-[var(--brand-accent)] transition-colors"
          >
            {CATEGORY_EMOJI[categoryId]} {cat?.name ?? "케어·라이프"}
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)] truncate max-w-[150px] sm:max-w-[280px]" aria-current="page">
            {content.title}
          </span>
        </nav>

        {/* 포스트 헤더 */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-border)] text-xs font-semibold text-[var(--brand-text-secondary)]">
              {CATEGORY_EMOJI[categoryId]} {cat?.name ?? "케어·라이프"}
            </span>
            {content.ymyl && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-xs font-semibold text-amber-700 border border-amber-200">
                전문가 검토
              </span>
            )}
          </div>

          <h1
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--brand-text)] leading-tight mb-3 sm:mb-4 tracking-tight"
            style={{ wordBreak: "keep-all" }}
            data-speakable
          >
            {content.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-3 text-xs text-[var(--brand-text-secondary)]">
            {content.publishedAt && (
              <time dateTime={content.publishedAt} className="flex items-center gap-1">
                <span aria-hidden="true">📅</span>
                {content.publishedAt.slice(0, 10)} 발행
              </time>
            )}
            {content.authorName && (
              <span className="flex items-center gap-1">
                <span aria-hidden="true">✍️</span>
                {content.authorName}
                {content.authorCredential && ` (${content.authorCredential})`}
              </span>
            )}
            {readingTime > 0 && (
              <span className="flex items-center gap-1">
                <span aria-hidden="true">⏱</span>
                약 {readingTime}분 읽기
              </span>
            )}
          </div>
        </header>

        <YmylDisclaimer categoryId={categoryId} />
        <TableOfContents headings={headings} slug={slug} />

        <AdPolicyProvider category={categoryId}>
          <AdSlot adType="adsense" format="horizontal" className="my-4" />
        </AdPolicyProvider>

        <article
          id="article-body"
          className="prose prose-sm sm:prose-base max-w-none mt-5 sm:mt-6"
          dangerouslySetInnerHTML={{ __html: bodyWithIds }}
        />
        <OutboundLinkTracker />

        <AdPolicyProvider category={categoryId}>
          <AdSlot adType="adsense" format="rectangle" className="my-6" />
        </AdPolicyProvider>

        <CategoryCta categoryId={categoryId} className="my-6" />

        <div className="mt-6 pt-5 border-t border-[var(--brand-border)]">
          <ShareButtons url={`${SITE_URL}/blog/${slug}`} title={content.title} />
        </div>

        {Array.isArray(content.sources) && content.sources.length > 0 && (
          <section className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[var(--brand-border)]" aria-label="참고 자료">
            <h2 className="text-sm font-bold text-[var(--brand-text)] mb-3">📚 참고 자료</h2>
            <ul className="space-y-1.5">
              {(content.sources as string[]).map((s, i) => (
                <li key={i} className="text-xs sm:text-sm text-[var(--brand-text-secondary)] flex gap-2">
                  <span className="shrink-0 text-[var(--brand-accent)]">·</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {content.disclaimer && (
          <div
            className="mt-6 p-4 sm:p-5 bg-[var(--brand-border)] rounded-xl text-xs sm:text-sm text-[var(--brand-text-secondary)] leading-relaxed"
            role="note"
          >
            {content.disclaimer}
          </div>
        )}

        {/* 관련 포스트 */}
        {relatedPosts.length > 0 && (
          <aside className="mt-12 pt-8 border-t border-[var(--brand-border)]" aria-label="관련 글">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-4">
              {CATEGORY_EMOJI[categoryId]} 같은 주제 글
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group p-4 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-all"
                >
                  <p className="text-sm font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug" style={{ wordBreak: "keep-all" }}>
                    {p.title}
                  </p>
                  {p.metaDescription && (
                    <p className="text-xs text-[var(--brand-text-secondary)] mt-1 line-clamp-2">{p.metaDescription}</p>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/blog" className="text-sm text-[var(--brand-accent)] font-semibold hover:underline">
                ← 블로그 전체 보기
              </Link>
            </div>
          </aside>
        )}

        {relatedPosts.length === 0 && (
          <div className="mt-10 pt-8 border-t border-[var(--brand-border)] flex flex-wrap gap-3">
            <Link href="/blog" className="text-sm text-[var(--brand-accent)] hover:underline">← 블로그</Link>
            <Link href="/guide" className="text-sm text-[var(--brand-accent)] hover:underline">📚 전문 가이드 →</Link>
          </div>
        )}
      </main>
    </>
  );
}
