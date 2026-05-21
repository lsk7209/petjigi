import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const INSURERS: Record<
  string,
  { name: string; fullName: string; desc: string }
> = {
  hyundai: {
    name: "현대해상",
    fullName: "현대해상화재보험",
    desc: "현대해상 하이펫보험 상품 정보입니다. 통원·입원·수술 3대 보장을 제공합니다.",
  },
  db: {
    name: "DB손보",
    fullName: "DB손해보험",
    desc: "DB손보 다이렉트 펫보험 상품 정보입니다. 온라인 가입 시 보험료 할인 혜택이 있습니다.",
  },
  kb: {
    name: "KB손보",
    fullName: "KB손해보험",
    desc: "KB손보 펫코노미보험 상품 정보입니다. 실손 방식으로 실제 치료비를 보장합니다.",
  },
  samsung: {
    name: "삼성화재",
    fullName: "삼성화재해상보험",
    desc: "삼성화재 애니펫보험 상품 정보입니다. 업계 최고 수준의 보장한도를 제공합니다.",
  },
  hanwha: {
    name: "한화손보",
    fullName: "한화손해보험",
    desc: "한화손보 레저펫보험 상품 정보입니다. 반려동물 배상책임 특약을 함께 제공합니다.",
  },
  meritz: {
    name: "메리츠화재",
    fullName: "메리츠화재해상보험",
    desc: "메리츠화재 퍼피라이프보험 상품 정보입니다. 노령 반려동물 특화 상품이 있습니다.",
  },
};

export async function generateStaticParams() {
  return Object.keys(INSURERS).map((slug) => ({ insurer: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ insurer: string }>;
}): Promise<Metadata> {
  const { insurer } = await params;
  const data = INSURERS[insurer];
  if (!data) return {};
  return {
    title: `${data.name} 펫보험 | 펫지기`,
    description: data.desc,
    alternates: { canonical: `/insurance/${insurer}` },
    openGraph: { title: `${data.name} 펫보험 | 펫지기`, description: data.desc },
  };
}

export default async function InsurerPage({
  params,
}: {
  params: Promise<{ insurer: string }>;
}) {
  const { insurer } = await params;
  const data = INSURERS[insurer];
  if (!data) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "보험·법률", url: `${SITE_URL}/category/insurance` },
    { name: "펫보험 비교", url: `${SITE_URL}/insurance/compare` },
    { name: data.name, url: `${SITE_URL}/insurance/${insurer}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <main className="max-w-3xl mx-auto px-4 py-12 bg-[var(--brand-bg)]">
      {/* 브레드크럼 */}
      <nav className="text-sm text-[var(--brand-text-secondary)] mb-6 flex gap-2 items-center">
        <Link href="/" className="hover:underline">
          홈
        </Link>
        <span>/</span>
        <Link href="/category/insurance" className="hover:underline">
          보험·법률
        </Link>
        <span>/</span>
        <Link href="/insurance/compare" className="hover:underline">
          펫보험 비교
        </Link>
        <span>/</span>
        <span className="text-[var(--brand-text)]">{data.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-2">
        {data.fullName} 펫보험
      </h1>
      <p className="text-[var(--brand-text-secondary)] mb-8">{data.desc}</p>

      <YmylDisclaimer categoryId={4} />

      {/* 준비 중 안내 */}
      <div className="mt-10 rounded-[var(--radius-card)] border border-[var(--brand-accent)] bg-[var(--brand-border)] px-6 py-8 text-center">
        <p className="text-lg font-semibold text-[var(--brand-text)] mb-2">
          상세 상품 정보 준비 중
        </p>
        <p className="text-sm text-[var(--brand-text-secondary)] mb-6">
          {data.name} 펫보험 상품 비교표·보험료 계산기·실제 보상 사례를
          <br />
          정리하고 있습니다. 조금만 기다려 주세요.
        </p>
        <Link
          href="/insurance/compare"
          className="inline-block border border-[var(--brand-accent)] text-[var(--brand-accent)] font-semibold px-6 py-2.5 rounded-[var(--radius-button)] hover:bg-[var(--brand-accent)] hover:text-white transition-colors text-sm"
        >
          다른 보험사 비교하기
        </Link>
      </div>

      {/* 다른 보험사 */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-[var(--brand-text)] mb-4">
          다른 보험사 보기
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(INSURERS)
            .filter(([slug]) => slug !== insurer)
            .map(([slug, info]) => (
              <Link
                key={slug}
                href={`/insurance/${slug}`}
                className="p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors text-center"
              >
                <span className="text-sm font-semibold text-[var(--brand-text)]">
                  {info.name}
                </span>
              </Link>
            ))}
        </div>
      </section>
    </main>
    </>
  );
}
