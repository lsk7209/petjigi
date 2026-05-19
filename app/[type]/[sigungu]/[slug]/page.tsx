import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { and, eq, ne, sql } from "drizzle-orm";
import { localBusinessSchema } from "@/lib/seo/structured-data";
import type { CategoryId } from "@/lib/category";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";

export const revalidate = 86400;

const TYPE_LABEL: Record<string, string> = {
  vet: "동물병원",
  grooming: "펫미용",
  boarding: "펫호텔",
  funeral: "장묘업체",
  sale: "분양업체",
  breeder: "브리더",
  transport: "반려동물 운송",
  exhibition: "체험전시",
};

const TYPE_CATEGORY: Record<string, CategoryId> = {
  vet: 3,
  grooming: 5,
  boarding: 5,
  funeral: 6,
  sale: 1,
  breeder: 1,
  transport: 5,
  exhibition: 5,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; sigungu: string; slug: string }>;
}): Promise<Metadata> {
  const { type, sigungu, slug } = await params;
  const name = decodeURIComponent(slug);
  const typeLabel = TYPE_LABEL[type] ?? type;
  return {
    title: `${name} ${typeLabel} | 펫지기`,
    description: `${name} ${typeLabel} 정보 — 위치, 연락처, 주변 시설. 공공데이터 기반.`,
  };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ type: string; sigungu: string; slug: string }>;
}) {
  const { type, sigungu, slug } = await params;
  const name = decodeURIComponent(slug);

  const business = await db
    .select()
    .from(businesses)
    .where(
      and(
        eq(businesses.type, type),
        eq(businesses.name, name),
        ne(businesses.status, "closed")
      )
    )
    .get();

  if (!business) notFound();

  const region = await db
    .select()
    .from(regions)
    .where(eq(regions.sigunguSlug, sigungu))
    .get();

  // unique signal 3: 인근 시설 (같은 시군구)
  const nearby = await db
    .select()
    .from(businesses)
    .where(
      and(
        eq(businesses.addressSigungu, business.addressSigungu ?? ""),
        eq(businesses.status, "active"),
        ne(businesses.id, business.id)
      )
    )
    .limit(5);

  // unique signal 2: 같은 시군구 동종 업장 수
  const sameTypeCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(businesses)
    .where(
      and(
        eq(businesses.type, type),
        eq(businesses.addressSigungu, business.addressSigungu ?? ""),
        eq(businesses.status, "active")
      )
    )
    .get();

  const categoryId = TYPE_CATEGORY[type] ?? 1;
  const schema = localBusinessSchema(business);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-[var(--brand-text-secondary)] mb-4">
          <Link href="/">홈</Link> /{" "}
          <Link href={`/${sigungu}/${type}`}>{region?.sigungu ?? sigungu} {TYPE_LABEL[type]}</Link>
        </nav>

        {/* ⛔ 동물병원 페이지에 진료과목/진료 동물 종 자동 생성 절대 금지 */}
        <h1 className="text-3xl font-bold mb-1">{business.name}</h1>
        <p className="text-sm text-[var(--brand-text-secondary)] mb-6">
          {TYPE_LABEL[type]} · {business.addressSigungu}
        </p>

        <YmylDisclaimer categoryId={categoryId} />

        {/* 기본 정보 */}
        <section className="bg-[var(--brand-border)] rounded-[var(--radius-card)] p-6 mb-8">
          <h2 className="font-semibold mb-4">기본 정보</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="text-[var(--brand-text-secondary)] w-20 shrink-0">주소</dt>
              <dd>{business.address}</dd>
            </div>
            {business.phone && (
              <div className="flex gap-3">
                <dt className="text-[var(--brand-text-secondary)] w-20 shrink-0">전화</dt>
                <dd>
                  <a href={`tel:${business.phone}`} className="text-[var(--brand-accent)]">
                    {business.phone}
                  </a>
                </dd>
              </div>
            )}
            {business.licenseDate && (
              <div className="flex gap-3">
                <dt className="text-[var(--brand-text-secondary)] w-20 shrink-0">허가일</dt>
                <dd>{business.licenseDate}</dd>
              </div>
            )}
            <div className="flex gap-3">
              <dt className="text-[var(--brand-text-secondary)] w-20 shrink-0">출처</dt>
              <dd className="text-[var(--brand-text-secondary)]">공공데이터포털 (LOCALDATA)</dd>
            </div>
          </dl>
        </section>

        {/* unique signal 1: 지역 인사이트 */}
        <section className="border border-[var(--brand-border)] rounded-lg p-4 mb-6 text-sm">
          <h2 className="font-medium mb-2">지역 현황</h2>
          <p className="text-[var(--brand-text-secondary)]">
            {business.addressSigungu} 지역에는 현재 {sameTypeCount?.count ?? 0}개의{" "}
            {TYPE_LABEL[type]}가 운영 중입니다.
          </p>
        </section>

        {/* unique signal 3: 인근 시설 */}
        {nearby.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">인근 시설</h2>
            <ul className="space-y-2">
              {nearby.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/${b.type}/${sigungu}/${encodeURIComponent(b.name)}`}
                    className="flex justify-between items-center p-3 rounded-lg border border-[var(--brand-border)] hover:border-[var(--brand-accent)] text-sm transition-colors"
                  >
                    <span>{b.name}</span>
                    <span className="text-[var(--brand-text-secondary)]">
                      {TYPE_LABEL[b.type] ?? b.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-xs text-[var(--brand-text-secondary)]">
          정보 기준일: {business.lastSyncedAt?.slice(0, 10) ?? "공공데이터 최신 기준"}
        </p>
      </main>
    </>
  );
}
