import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { shelters, regions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sigungu: string }>;
}): Promise<Metadata> {
  const { sigungu } = await params;

  const region = await db
    .select({ sigungu: regions.sigungu, sido: regions.sido, sidoSlug: regions.sidoSlug })
    .from(regions)
    .where(eq(regions.sigunguSlug, sigungu))
    .get();

  if (!region) {
    return {
      title: "동물보호센터 | 펫지기",
      robots: { index: false },
    };
  }

  const shelterCount = await db
    .select({ id: shelters.id })
    .from(shelters)
    .where(eq(shelters.sigungu, region.sigungu))
    .all();

  if (shelterCount.length === 0) {
    return {
      title: `${region.sigungu} 동물보호센터 | 펫지기`,
      robots: { index: false },
    };
  }

  return {
    title: `${region.sigungu} 동물보호센터 | 펫지기`,
    description: `${region.sigungu} 지역 동물보호센터 ${shelterCount.length}개소 정보. 유기동물 입양·임시보호 문의처를 확인하세요.`,
    alternates: { canonical: `/shelter/${sigungu}` },
    openGraph: {
      title: `${region.sigungu} 동물보호센터 | 펫지기`,
      description: `${region.sigungu} 동물보호센터 ${shelterCount.length}개소 — 유기동물 입양 문의처`,
    },
  };
}

export default async function ShelterSigunguPage({
  params,
}: {
  params: Promise<{ sigungu: string }>;
}) {
  const { sigungu } = await params;

  const region = await db
    .select({ sigungu: regions.sigungu, sido: regions.sido, sidoSlug: regions.sidoSlug })
    .from(regions)
    .where(eq(regions.sigunguSlug, sigungu))
    .get();

  if (!region) notFound();

  const shelterList = await db
    .select()
    .from(shelters)
    .where(eq(shelters.sigungu, region.sigungu))
    .orderBy(shelters.name);

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: `${region.sido} 반려동물`, url: `${SITE_URL}/sido/${region.sidoSlug}` },
    { name: `${region.sigungu} 동물보호센터`, url: `${SITE_URL}/shelter/${sigungu}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* 브레드크럼 */}
      <nav className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
        <span aria-hidden="true">›</span>
        <Link
          href={`/sido/${region.sidoSlug}`}
          className="hover:text-[var(--brand-accent)] transition-colors"
        >
          {region.sido}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-[var(--brand-text)]">{region.sigungu} 동물보호센터</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-2">
        {region.sigungu} 동물보호센터
      </h1>

      {shelterList.length === 0 ? (
        <>
          <p className="text-[var(--brand-text-secondary)] mb-8">
            {region.sigungu} 지역 동물보호센터 데이터를 준비 중입니다.
          </p>
          <div className="p-8 rounded-xl border border-[var(--brand-border)] text-center">
            <p className="text-[var(--brand-text-secondary)] text-sm mb-1">
              보호센터 정보가 아직 없습니다.
            </p>
            <p className="text-[var(--brand-text-secondary)] text-xs">
              데이터는 매주 자동으로 갱신됩니다.
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="text-[var(--brand-text-secondary)] mb-8">
            {region.sigungu} 지역에서{" "}
            <strong className="text-[var(--brand-text)]">
              {shelterList.length}개
            </strong>{" "}
            보호센터 운영 중
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shelterList.map((shelter) => (
              <div
                key={shelter.id}
                className="p-5 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] flex flex-col gap-2"
              >
                <h2 className="font-semibold text-[var(--brand-text)] text-base leading-snug">
                  {shelter.name}
                </h2>

                {shelter.address && (
                  <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                    {shelter.address}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-1">
                  {shelter.phone && (
                    <a
                      href={`tel:${shelter.phone.replace(/\s/g, "")}`}
                      className="text-xs text-[var(--brand-accent)] hover:underline font-medium"
                    >
                      {shelter.phone}
                    </a>
                  )}

                  {shelter.capacity != null && (
                    <span className="text-xs text-[var(--brand-text-secondary)]">
                      수용 {shelter.capacity}마리
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-[var(--brand-text-secondary)] text-center">
            데이터는 매주 자동으로 갱신됩니다.
          </p>
        </>
      )}
    </main>
    </>
  );
}
