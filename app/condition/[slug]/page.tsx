import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { CategoryId } from "@/lib/category";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const revalidate = 604800;

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }}
      />
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

        {content.reviewedAt && (
          <p className="text-xs text-[var(--brand-text-secondary)] mb-6">
            검토일: {content.reviewedAt.slice(0, 10)}
            {content.reviewerName && ` · 검토: ${content.reviewerName}`}
          </p>
        )}

        <YmylDisclaimer categoryId={categoryId} />

        <article
          className="prose prose-sm max-w-none mt-6"
          dangerouslySetInnerHTML={{ __html: content.body }}
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
      </main>
    </>
  );
}
