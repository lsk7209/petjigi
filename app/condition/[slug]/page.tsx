import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { and, eq, ne, desc } from "drizzle-orm";
import type { CategoryId } from "@/lib/category";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";
import { TableOfContents, type TocHeading } from "@/components/content/table-of-contents";
import { ReadingProgress } from "@/components/content/reading-progress";
import { ShareButtons } from "@/components/content/share-buttons";
import { CategoryCta } from "@/components/content/category-cta";

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
  const rows = await db
    .select({ slug: contents.slug })
    .from(contents)
    .where(and(eq(contents.status, "published"), eq(contents.type, "condition")));
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await db
    .select()
    .from(contents)
    .where(
      and(
        eq(contents.slug, slug),
        eq(contents.status, "published"),
        eq(contents.type, "condition"),
      ),
    )
    .get();

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
  const content = await db
    .select()
    .from(contents)
    .where(
      and(
        eq(contents.slug, slug),
        eq(contents.status, "published"),
        eq(contents.type, "condition"),
      ),
    )
    .get();

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

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "건강·의료", url: `${SITE_URL}/category/health` },
    { name: content.title, url: `${SITE_URL}/condition/${slug}` },
  ]);

  const categoryId = (content.category as CategoryId) ?? 3;
  const pageUrl = `${SITE_URL}/condition/${slug}`;

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems.map((f) => ({ ...f, url: pageUrl })))) }}
        />
      )}
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href="/category/health" className="hover:text-[var(--brand-accent)] transition-colors">
            💊 건강·의료
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)] truncate max-w-[200px]" aria-current="page">
            {content.title}
          </span>
        </nav>

        <p className="text-xs text-[var(--brand-text-secondary)] uppercase tracking-wide mb-2">
          건강·의료
        </p>
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>

        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--brand-text-secondary)] mb-6">
          {content.reviewedAt && (
            <span>검토일: {content.reviewedAt.slice(0, 10)}{content.reviewerName && ` · ${content.reviewerName}`}</span>
          )}
          <span>⏱ 약 {readingTime}분 읽기</span>
        </div>

        <YmylDisclaimer categoryId={categoryId} />

        {headings.length >= 3 && <TableOfContents headings={headings} />}

        <article
          className="prose prose-sm max-w-none mt-6"
          dangerouslySetInnerHTML={{ __html: bodyWithIds }}
        />

        {Array.isArray(content.sources) && content.sources.length > 0 && (
          <section className="mt-8 pt-6 border-t border-[var(--brand-border)]">
            <h2 className="text-sm font-semibold mb-2">참고 자료</h2>
            <ul className="text-xs text-[var(--brand-text-secondary)] space-y-1">
              {(content.sources as string[]).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {content.disclaimer && (
          <div className="mt-6 p-4 bg-[var(--brand-border)] rounded-lg text-xs text-[var(--brand-text-secondary)]">
            {content.disclaimer}
          </div>
        )}

        <CategoryCta categoryId={categoryId} className="mt-8" />

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
      </main>
    </>
  );
}
