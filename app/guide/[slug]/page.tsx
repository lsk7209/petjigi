import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { CategoryId } from "@/lib/category";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { articleSchema } from "@/lib/seo/structured-data";

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
    .where(and(eq(contents.slug, slug), eq(contents.status, "published")))
    .get();

  if (!content) return {};
  return {
    title: content.metaTitle ?? `${content.title} | 펫지기`,
    description: content.metaDescription ?? undefined,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await db
    .select()
    .from(contents)
    .where(and(eq(contents.slug, slug), eq(contents.status, "published")))
    .get();

  if (!content) notFound();

  const schema = articleSchema({
    title: content.title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/guide/${slug}`,
    authorName: content.authorName,
    authorCredential: content.authorCredential,
    publishedAt: content.publishedAt,
    reviewedAt: content.reviewedAt,
    reviewerName: content.reviewerName,
    isYmyl: content.ymyl,
  });

  const categoryId = content.category as CategoryId;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-12">
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
