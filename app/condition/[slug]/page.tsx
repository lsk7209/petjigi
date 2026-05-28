import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cache } from "react";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { and, eq, ne, desc, lte } from "drizzle-orm";
import type { CategoryId } from "@/lib/category";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { articleSchema, breadcrumbSchema, faqSchema, medicalConditionSchema } from "@/lib/seo/structured-data";
import { TableOfContents, type TocHeading } from "@/components/content/table-of-contents";
import { ReadingProgress } from "@/components/content/reading-progress";
import { ShareButtons } from "@/components/content/share-buttons";
import { CategoryCta } from "@/components/content/category-cta";
import { ScrollDepthTracker } from "@/components/analytics/scroll-depth-tracker";
import { OutboundLinkTracker } from "@/components/analytics/outbound-link-tracker";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { ConditionViewTracker } from "@/components/analytics/condition-view-tracker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const revalidate = 604800;

function extractHeadings(html: string): TocHeading[] {
  const re = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  const headings: TocHeading[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(html)) !== null) {
    const text = m[3].replace(/<[^>]+>/g, "").trim();
    const id = `h-${i++}-${text.toLowerCase().replace(/[^a-z0-9가-힣]/g, "-").slice(0, 40)}`;
    headings.push({ id, text, level: Number(m[1]) as 2 | 3 });
  }
  return headings;
}

function injectHeadingIds(html: string, headings: TocHeading[]): string {
  let counter = 0;
  return html.replace(/<h([23])([^>]*)>/gi, (_, lvl) => {
    const id = headings[counter++]?.id ?? `h-${counter}`;
    return `<h${lvl} id="${id}">`;
  });
}

function extractFaq(html: string) {
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  const items: { question: string; answer: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null && items.length < 8) {
    const q = m[1].replace(/<[^>]+>/g, "").trim();
    if (!q.endsWith("?") && !q.endsWith("？")) continue;
    const a = m[2].replace(/<[^>]+>/g, "").trim().slice(0, 300);
    if (a) items.push({ question: q, answer: a });
  }
  return items;
}

const getConditionContent = cache(async (slug: string) =>
  db
    .select()
    .from(contents)
    .where(
      and(
        eq(contents.slug, slug),
        eq(contents.status, "published"),
        eq(contents.type, "condition"),
        lte(contents.publishedAt, new Date().toISOString()),
      ),
    )
    .get()
);

async function getRelatedConditions(slug: string, category: number) {
  return db
    .select({ slug: contents.slug, title: contents.title })
    .from(contents)
    .where(
      and(
        eq(contents.status, "published"),
        eq(contents.type, "condition"),
        eq(contents.category, category),
        ne(contents.slug, slug),
      ),
    )
    .orderBy(desc(contents.publishedAt))
    .limit(4);
}

export async function generateStaticParams() {
  try {
    const rows = await db
      .select({ slug: contents.slug })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "condition"), lte(contents.publishedAt, new Date().toISOString())));
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
  const content = await getConditionContent(slug);

  if (!content) {
    return { robots: { index: false, follow: false } };
  }

  return {
    title: `${content.title} — 증상·원인·치료 | 펫지기`,
    description: content.metaDescription ?? `${content.title} 증상·원인·진단·치료 방법을 전문가 검토를 거쳐 안내합니다.`,
    alternates: { canonical: `/condition/${slug}` },
    openGraph: {
      title: `${content.title} — 증상·원인·치료 | 펫지기`,
      description: content.metaDescription ?? undefined,
      type: "article",
    },
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getConditionContent(slug);

  if (!content) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-[var(--brand-text-secondary)] text-sm">
          해당 질환·증상 정보를 찾을 수 없습니다.
        </p>
      </main>
    );
  }

  const headings = extractHeadings(content.body);
  const bodyWithIds = injectHeadingIds(content.body, headings);
  const faqItems = extractFaq(content.body);
  const relatedConditions = await getRelatedConditions(slug, content.category ?? 3);

  const plainText = content.body.replace(/<[^>]+>/g, "");
  const wordCount = Math.max(1, Math.round(plainText.replace(/\s+/g, "").length / 2));
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const schema = articleSchema({
    title: content.title,
    url: `${SITE_URL}/condition/${slug}`,
    authorName: content.authorName,
    authorCredential: content.authorCredential,
    publishedAt: content.publishedAt,
    reviewedAt: content.reviewedAt,
    reviewerName: content.reviewerName,
    isYmyl: content.ymyl,
  });

  const conditionEntity = medicalConditionSchema({
    name: content.title,
    url: `${SITE_URL}/condition/${slug}`,
    description: content.metaDescription,
  });

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "건강·의료", url: `${SITE_URL}/category/health` },
    { name: content.title, url: `${SITE_URL}/condition/${slug}` },
  ]);

  const categoryId = (content.category as CategoryId) ?? 3;
  const pageUrl = `${SITE_URL}/condition/${slug}`;

  return (
    <AdPolicyProvider category={categoryId}>
      <ReadingProgress />
      <ScrollDepthTracker />
      <ConditionViewTracker slug={slug} title={content.title} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionEntity) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems.map((f) => ({ ...f, url: pageUrl })))) }}
        />
      )}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1 sm:gap-1.5 flex-wrap"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href="/category/health" className="hover:text-[var(--brand-accent)] transition-colors">
            💊 건강·의료
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)] truncate max-w-[150px] sm:max-w-[280px]" aria-current="page">
            {content.title}
          </span>
        </nav>

        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-border)] text-xs font-semibold text-[var(--brand-text-secondary)]">
              💊 건강·의료
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
            {content.reviewedAt && (
              <span className="flex items-center gap-1">
                <span aria-hidden="true">✅</span>
                {content.reviewedAt.slice(0, 10)}{content.reviewerName && ` · ${content.reviewerName}`} 검토
              </span>
            )}
            {content.authorName && (
              <span className="flex items-center gap-1">
                <span aria-hidden="true">✍️</span>
                {content.authorName}
                {content.authorCredential && ` (${content.authorCredential})`}
              </span>
            )}
            <span className="flex items-center gap-1">
              <span aria-hidden="true">⏱</span>
              약 {readingTime}분 읽기
            </span>
          </div>
        </header>

        <YmylDisclaimer categoryId={categoryId} />

        {headings.length >= 3 && <TableOfContents headings={headings} slug={slug} />}

        <article
          id="article-body"
          className="prose prose-sm sm:prose-base max-w-none mt-5 sm:mt-6"
          dangerouslySetInnerHTML={{ __html: bodyWithIds }}
        />
        <OutboundLinkTracker />

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
          <div className="mt-6 p-4 bg-[var(--brand-border)] rounded-xl text-xs text-[var(--brand-text-secondary)] leading-relaxed">
            {content.disclaimer}
          </div>
        )}

        <AdSlot adType="adsense" format="rectangle" className="my-6" />
        <CategoryCta categoryId={categoryId} className="my-6" />

        <div className="mt-6 pt-6 border-t border-[var(--brand-border)]">
          <ShareButtons url={pageUrl} title={content.title} />
        </div>

        {relatedConditions.length > 0 && (
          <aside className="mt-10 pt-8 border-t border-[var(--brand-border)]" aria-label="관련 질환·증상">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-4">💊 관련 질환·증상</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedConditions.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/condition/${c.slug}`}
                    className="block p-3 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors text-sm font-medium"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <section className="mt-8 pt-6 border-t border-[var(--brand-border)]">
          <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">함께 보면 좋은 정보</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/condition" className="text-sm text-[var(--brand-accent)] hover:underline">
              ← 질환·증상 목록
            </Link>
            <Link href="/guide" className="text-sm text-[var(--brand-accent)] hover:underline">
              📚 반려동물 가이드 →
            </Link>
            <Link href="/insurance/compare" className="text-sm text-[var(--brand-accent)] hover:underline">
              📋 펫보험 비교 →
            </Link>
            <Link href="/sido/seoul" className="text-sm text-[var(--brand-accent)] hover:underline">
              🏥 동물병원 찾기 →
            </Link>
          </div>
        </section>
      </main>
    </AdPolicyProvider>
  );
}
