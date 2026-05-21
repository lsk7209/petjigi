import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { breeds } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { CategoryCta } from "@/components/content/category-cta";
import { ShareButtons } from "@/components/content/share-buttons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const revalidate = 604800;

export async function generateStaticParams() {
  try {
    const rows = await db.select({ species: breeds.species, slug: breeds.slug }).from(breeds);
    return rows.map((r) => ({ species: r.species, slug: r.slug }));
  } catch {
    return [];
  }
}

const SPECIES_LABEL: Record<string, string> = {
  dog: "강아지",
  cat: "고양이",
  small: "소동물",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ species: string; slug: string }>;
}): Promise<Metadata> {
  const { species, slug } = await params;
  const breed = await db
    .select()
    .from(breeds)
    .where(and(eq(breeds.slug, slug), eq(breeds.species, species)))
    .get();

  if (!breed) return {};
  return {
    title: `${breed.nameKo} 특징·성격·키우기 | 펫지기`,
    description: `${breed.nameKo} 품종 정보: 특징, 성격, 평균 수명, 흔한 질병, 키우는 방법.`,
    alternates: { canonical: `/breed/${species}/${slug}` },
    openGraph: {
      title: `${breed.nameKo} 특징·성격·키우기 | 펫지기`,
      description: `${breed.nameKo} 품종 정보: 특징, 성격, 평균 수명, 흔한 질병, 키우는 방법.`,
    },
  };
}

export default async function BreedPage({
  params,
}: {
  params: Promise<{ species: string; slug: string }>;
}) {
  const { species, slug } = await params;
  const breed = await db
    .select()
    .from(breeds)
    .where(and(eq(breeds.slug, slug), eq(breeds.species, species)))
    .get();

  if (!breed) notFound();

  const speciesLabel = SPECIES_LABEL[species] ?? species;
  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: `${speciesLabel} 품종`, url: `${SITE_URL}/breed/${species}` },
    { name: breed.nameKo, url: `${SITE_URL}/breed/${species}/${slug}` },
  ]);

  const animalSchema = {
    "@context": "https://schema.org",
    "@type": "Animal",
    name: breed.nameKo,
    ...(breed.nameEn ? { alternateName: breed.nameEn } : {}),
    description: `${breed.nameKo} 품종 정보: 특징, 성격, 평균 수명, 흔한 질병, 키우는 방법.`,
    url: `${SITE_URL}/breed/${species}/${slug}`,
    ...(breed.lifespanMin && breed.lifespanMax
      ? { description: `${breed.nameKo} — 평균 수명 ${breed.lifespanMin}~${breed.lifespanMax}년. 특징·성격·건강·키우기 정보.` }
      : {}),
    isPartOf: { "@type": "WebSite", name: "펫지기", url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(animalSchema) }} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href={`/breed/${species}`} className="hover:text-[var(--brand-accent)] transition-colors">
            {speciesLabel} 품종
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">{breed.nameKo}</span>
        </nav>

        <p className="text-sm text-[var(--brand-text-secondary)] mb-2">
          {speciesLabel} 품종
        </p>
        <h1 className="text-3xl font-bold mb-2">{breed.nameKo}</h1>
      {breed.nameEn && (
        <p className="text-[var(--brand-text-secondary)] mb-6">{breed.nameEn}</p>
      )}

      <dl className="grid grid-cols-2 gap-4 mb-8 text-sm">
        {breed.origin && (
          <>
            <dt className="text-[var(--brand-text-secondary)]">원산지</dt>
            <dd>{breed.origin}</dd>
          </>
        )}
        {breed.sizeCategory && (
          <>
            <dt className="text-[var(--brand-text-secondary)]">크기</dt>
            <dd>{breed.sizeCategory}</dd>
          </>
        )}
        {breed.lifespanMin && breed.lifespanMax && (
          <>
            <dt className="text-[var(--brand-text-secondary)]">평균 수명</dt>
            <dd>{breed.lifespanMin}~{breed.lifespanMax}년</dd>
          </>
        )}
      </dl>

      {breed.body && (
        <article
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: breed.body }}
        />
      )}

      <CategoryCta categoryId={3} className="mt-8" />

      <div className="mt-6 pt-6 border-t border-[var(--brand-border)]">
        <ShareButtons url={`${SITE_URL}/breed/${breed.species}/${breed.slug}`} title={`${breed.nameKo} 품종 정보 | 펫지기`} />
      </div>

      <p className="text-xs text-[var(--brand-text-secondary)] mt-6">
        출처: 위키피디아·공공데이터 기반 (CC BY-SA)
      </p>
    </main>
    </>
  );
}
