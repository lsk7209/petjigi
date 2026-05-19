import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { breeds } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const revalidate = 604800;

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

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-sm text-[var(--brand-text-secondary)] mb-2">
        {SPECIES_LABEL[species] ?? species} 품종
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

      <p className="text-xs text-[var(--brand-text-secondary)] mt-8">
        출처: 위키피디아·공공데이터 기반 (CC BY-SA)
      </p>
    </main>
  );
}
