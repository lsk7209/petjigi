import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const revalidate = 86400;

const TYPE_META: Record<string, { label: string; categorySlug: string }> = {
  vet: { label: "동물병원", categorySlug: "health" },
  grooming: { label: "펫미용", categorySlug: "care" },
  boarding: { label: "펫호텔", categorySlug: "care" },
  funeral: { label: "장묘업체", categorySlug: "memorial" },
  sale: { label: "분양업체", categorySlug: "adoption" },
  breeder: { label: "브리더", categorySlug: "adoption" },
  transport: { label: "반려동물 운송", categorySlug: "care" },
  exhibition: { label: "체험전시", categorySlug: "care" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sigungu: string; type: string }>;
}): Promise<Metadata> {
  const { sigungu, type } = await params;
  const meta = TYPE_META[type];
  if (!meta) return {};
  return {
    title: `${decodeURIComponent(sigungu)} ${meta.label} | 펫지기`,
    description: `${decodeURIComponent(sigungu)} 지역 ${meta.label} 목록을 확인하세요. 공공데이터 기반 정확한 정보.`,
  };
}

export default async function SigunguTypePage({
  params,
}: {
  params: Promise<{ sigungu: string; type: string }>;
}) {
  const { sigungu, type } = await params;
  const meta = TYPE_META[type];
  if (!meta) notFound();

  const region = await db
    .select()
    .from(regions)
    .where(eq(regions.sigunguSlug, sigungu))
    .get();

  const businessList = await db
    .select()
    .from(businesses)
    .where(
      and(
        eq(businesses.type, type),
        eq(businesses.addressSigungu, region?.sigungu ?? sigungu),
        eq(businesses.status, "active")
      )
    )
    .limit(50);

  const sigunguName = region?.sigungu ?? decodeURIComponent(sigungu);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <nav className="text-sm text-[var(--brand-text-secondary)] mb-4">
        <Link href="/">홈</Link> /{" "}
        {region && (
          <><Link href={`/sido/${region.sidoSlug}`}>{region.sido}</Link> / </>
        )}
        <span>{sigunguName} {meta.label}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">
        {sigunguName} {meta.label}
      </h1>
      <p className="text-[var(--brand-text-secondary)] mb-8">
        {sigunguName} 지역 {meta.label} {businessList.length}개 정보입니다.
      </p>

      {/* 지역 인사이트 (unique signal 1) */}
      <div className="bg-[var(--brand-border)] rounded-lg p-4 mb-8 text-sm">
        <p className="font-medium mb-1">지역 현황</p>
        <p className="text-[var(--brand-text-secondary)]">
          {sigunguName} 지역에 등록된 {meta.label}는 총{" "}
          <strong>{businessList.length}곳</strong>입니다.
          (공공데이터 기준, 영업 중인 업체만)
        </p>
      </div>

      {businessList.length === 0 ? (
        <p className="text-[var(--brand-text-secondary)]">
          현재 등록된 {meta.label} 정보가 없습니다. ETL 동기화 후 업데이트됩니다.
        </p>
      ) : (
        <ul className="space-y-3">
          {businessList.map((b) => (
            <li key={b.id}>
              <Link
                href={`/${b.type}/${sigungu}/${encodeURIComponent(b.name)}`}
                className="block p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors"
              >
                <div className="font-medium">{b.name}</div>
                <div className="text-sm text-[var(--brand-text-secondary)] mt-1">
                  {b.address}
                </div>
                {b.phone && (
                  <div className="text-sm text-[var(--brand-accent)] mt-1">
                    {b.phone}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
