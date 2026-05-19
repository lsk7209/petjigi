import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { regions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 86400;

const BUSINESS_TYPES = [
  { type: "vet", label: "동물병원" },
  { type: "grooming", label: "펫미용" },
  { type: "boarding", label: "펫호텔" },
  { type: "funeral", label: "장묘" },
  { type: "sale", label: "분양" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sido: string }>;
}): Promise<Metadata> {
  const { sido } = await params;
  const first = await db
    .select({ sido: regions.sido })
    .from(regions)
    .where(eq(regions.sidoSlug, sido))
    .get();

  if (!first) return {};
  return {
    title: `${first.sido} 반려동물 정보 | 펫지기`,
    description: `${first.sido} 지역 동물병원·미용·장묘 정보를 시군구별로 확인하세요.`,
  };
}

export default async function SidoPage({
  params,
}: {
  params: Promise<{ sido: string }>;
}) {
  const { sido } = await params;

  const sigunguList = await db
    .select()
    .from(regions)
    .where(eq(regions.sidoSlug, sido))
    .orderBy(regions.sigungu);

  if (sigunguList.length === 0) notFound();

  const sidoName = sigunguList[0].sido;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <nav className="text-xs text-[var(--brand-text-secondary)] mb-6">
        <Link href="/" className="hover:text-[var(--brand-accent)]">홈</Link>
        {" › "}
        <span>{sidoName}</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-2">
        {sidoName} 반려동물 정보
      </h1>
      <p className="text-[var(--brand-text-secondary)] mb-8">
        {sidoName} 지역 반려동물 관련 업장을 시군구별로 찾아보세요.
      </p>

      {/* 업종별 카드 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[var(--brand-text)] mb-4">업종별 찾기</h2>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPES.map((bt) => (
            <Link
              key={bt.type}
              href={`/${sigunguList[0].sigunguSlug}/${bt.type}`}
              className="px-4 py-2 rounded-full border border-[var(--brand-border)] text-sm text-[var(--brand-text)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors"
            >
              {bt.label}
            </Link>
          ))}
        </div>
      </section>

      {/* 시군구 목록 */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--brand-text)] mb-4">
          시군구 ({sigunguList.length}개)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sigunguList.map((r) => (
            <Link
              key={r.code}
              href={`/${r.sigunguSlug}/vet`}
              className="p-3 rounded-lg border border-[var(--brand-border)] hover:border-[var(--brand-accent)] text-sm text-[var(--brand-text)] hover:text-[var(--brand-accent)] transition-colors"
            >
              {r.sigungu}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
