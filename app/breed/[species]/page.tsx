import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { breeds } from "@/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 604800;

const SPECIES_CONFIG: Record<string, { label: string; emoji: string; desc: string }> = {
  dog: { label: "강아지 품종", emoji: "🐕", desc: "강아지 품종별 특징, 성격, 평균 수명, 건강 정보를 확인하세요." },
  cat: { label: "고양이 품종", emoji: "🐈", desc: "고양이 품종별 특징, 성격, 평균 수명, 건강 정보를 확인하세요." },
  small: { label: "소동물 품종", emoji: "🐹", desc: "토끼, 기니피그 등 소동물 품종 정보를 확인하세요." },
};

export function generateStaticParams() {
  return [{ species: "dog" }, { species: "cat" }, { species: "small" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ species: string }>;
}): Promise<Metadata> {
  const { species } = await params;
  const config = SPECIES_CONFIG[species];
  if (!config) return {};
  return {
    title: `${config.label} 목록 | 펫지기`,
    description: config.desc,
    alternates: { canonical: `/breed/${species}` },
  };
}

export default async function BreedSpeciesPage({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const { species } = await params;
  const config = SPECIES_CONFIG[species];
  if (!config) notFound();

  const breedList = await db
    .select({
      slug: breeds.slug,
      nameKo: breeds.nameKo,
      nameEn: breeds.nameEn,
      origin: breeds.origin,
      sizeCategory: breeds.sizeCategory,
      lifespanMin: breeds.lifespanMin,
      lifespanMax: breeds.lifespanMax,
    })
    .from(breeds)
    .where(eq(breeds.species, species))
    .orderBy(breeds.nameKo);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <nav className="text-xs text-[var(--brand-text-secondary)] mb-6">
        <Link href="/" className="hover:text-[var(--brand-accent)]">홈</Link>
        {" › "}
        <Link href="/category/adoption" className="hover:text-[var(--brand-accent)]">입양·등록</Link>
        {" › "}
        <span>{config.label}</span>
      </nav>

      <div className="mb-8">
        <p className="text-3xl mb-2">{config.emoji}</p>
        <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-2">{config.label}</h1>
        <p className="text-[var(--brand-text-secondary)]">{config.desc}</p>
      </div>

      {breedList.length === 0 ? (
        <p className="text-[var(--brand-text-secondary)] text-sm">
          품종 정보가 준비 중입니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breedList.map((breed) => (
            <Link
              key={breed.slug}
              href={`/breed/${species}/${breed.slug}`}
              className="p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors">
                    {breed.nameKo}
                  </h2>
                  {breed.nameEn && (
                    <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
                      {breed.nameEn}
                    </p>
                  )}
                </div>
                {breed.sizeCategory && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--brand-border)] text-[var(--brand-text-secondary)] shrink-0">
                    {breed.sizeCategory}
                  </span>
                )}
              </div>
              <div className="mt-2 flex gap-4 text-xs text-[var(--brand-text-secondary)]">
                {breed.origin && <span>원산지: {breed.origin}</span>}
                {breed.lifespanMin && breed.lifespanMax && (
                  <span>수명: {breed.lifespanMin}~{breed.lifespanMax}년</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
