import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { regions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const revalidate = 86400;

const SIDO_SLUGS: Record<string, string> = {
  서울: "서울특별시",
  부산: "부산광역시",
  인천: "인천광역시",
  대구: "대구광역시",
  광주: "광주광역시",
  대전: "대전광역시",
  울산: "울산광역시",
  세종: "세종특별자치시",
  경기: "경기도",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sido: string }>;
}): Promise<Metadata> {
  const { sido } = await params;
  const decoded = decodeURIComponent(sido);
  return {
    title: `${decoded} 반려동물 정보 | 펫지기`,
    description: `${decoded} 지역 반려동물 관련 업장, 동물병원, 미용, 장묘 등 정보를 확인하세요.`,
  };
}

const BUSINESS_TYPES = [
  { type: "vet", label: "동물병원", category: 3 },
  { type: "grooming", label: "펫미용", category: 5 },
  { type: "boarding", label: "펫호텔", category: 5 },
  { type: "funeral", label: "장묘", category: 6 },
  { type: "sale", label: "분양", category: 1 },
];

export default async function SidoPage({
  params,
}: {
  params: Promise<{ sido: string }>;
}) {
  const { sido } = await params;
  const decoded = decodeURIComponent(sido);

  const fullSido = SIDO_SLUGS[decoded] ?? decoded;

  const sigunguList = await db
    .select()
    .from(regions)
    .where(eq(regions.sido, fullSido))
    .orderBy(regions.sigungu);

  if (sigunguList.length === 0) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{decoded} 반려동물 정보</h1>
      <p className="text-[var(--brand-text-secondary)] mb-8">
        {decoded} 지역 반려동물 관련 업장을 시군구별로 찾아보세요.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">업종별 검색</h2>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPES.map((bt) => (
            <Link
              key={bt.type}
              href={`/category/${bt.type === "vet" ? "health" : bt.type === "funeral" ? "memorial" : "care"}`}
              className="px-4 py-2 rounded-full border border-[var(--brand-border)] text-sm hover:border-[var(--brand-accent)] transition-colors"
            >
              {bt.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">시군구별 목록</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sigunguList.map((r) => (
            <Link
              key={r.code}
              href={`/${r.sigunguSlug}/vet`}
              className="p-3 rounded-lg border border-[var(--brand-border)] hover:border-[var(--brand-accent)] text-sm transition-colors"
            >
              {r.sigungu}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
