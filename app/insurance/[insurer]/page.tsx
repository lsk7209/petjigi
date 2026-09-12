import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { ShareButtons } from "@/components/content/share-buttons";
import { getInsuranceProductEvidence, INSURANCE_INFORMATION_CHECKED_AT, INSURANCE_PRODUCT_EVIDENCE } from "@/lib/insurance-products";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export function generateStaticParams() {
  return INSURANCE_PRODUCT_EVIDENCE.map(({ slug }) => ({ insurer: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ insurer: string }> }): Promise<Metadata> {
  const { insurer } = await params;
  const data = getInsuranceProductEvidence(insurer);
  if (!data) return {};
  return {
    title: { absolute: `${data.insurer} 펫보험 공식 정보 확인 | 펫지기` },
    description: `${data.insurer} 펫보험의 공식 확인 경로와 비교 전 확인할 조건을 안내합니다.`,
    alternates: { canonical: `/insurance/${insurer}` },
  };
}

export default async function InsurerPage({ params }: { params: Promise<{ insurer: string }> }) {
  const { insurer } = await params;
  const data = getInsuranceProductEvidence(insurer);
  if (!data) notFound();
  const pageUrl = `${SITE_URL}/insurance/${insurer}`;
  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "보험·법률", url: `${SITE_URL}/category/insurance` },
    { name: "펫보험 확인 가이드", url: `${SITE_URL}/insurance/compare` },
    { name: data.insurer, url: pageUrl },
  ]);

  return (
    <AdPolicyProvider category={4}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 bg-[var(--brand-bg)]">
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
          <Link href="/">홈</Link><span aria-hidden="true">›</span><Link href="/insurance/compare">펫보험 확인 가이드</Link><span aria-hidden="true">›</span><span aria-current="page">{data.insurer}</span>
        </nav>
        <header className="mb-7">
          <p className="text-xs font-semibold tracking-widest text-[var(--cat-4)] uppercase mb-2">펫보험 · {data.insurer}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-3">{data.product ?? `${data.insurer} 펫보험 판매 상태 확인 필요`}</h1>
          <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">공식 공개 페이지에서 확인할 수 있는 최소 정보만 제공합니다. 상품 추천, 예상 보험료 또는 보험금 지급 가능성을 판단하는 페이지가 아닙니다.</p>
        </header>
        <YmylDisclaimer categoryId={4} />

        <section className="mt-8 mb-8 rounded-[var(--r-card)] border border-[var(--brand-border)] p-5">
          <div className="flex flex-wrap justify-between gap-2"><h2 className="text-xl font-semibold text-[var(--brand-text)]">확인 결과</h2><span className="text-xs text-[var(--brand-text-secondary)]">확인일: {INSURANCE_INFORMATION_CHECKED_AT}</span></div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div><dt className="font-semibold text-[var(--brand-text)]">판매 채널</dt><dd className="text-[var(--brand-text-secondary)] mt-1">{data.channel}</dd></div>
            <div><dt className="font-semibold text-[var(--brand-text)]">판정</dt><dd className="text-[var(--brand-text-secondary)] mt-1">{data.status === "confirmed" ? "공식 공개 페이지에서 상품 정보를 확인함" : "현재 공식 판매 상품을 확인하지 못함"}</dd></div>
          </dl>
          {data.confirmedFacts.length > 0 && <ul className="mt-4 space-y-2 text-sm text-[var(--brand-text-secondary)] list-disc pl-5">{data.confirmedFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}
          <p className="mt-4 text-sm text-[var(--brand-text-secondary)]">{data.note}</p>
          {data.officialUrl && <a href={data.officialUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-block mt-4 text-sm font-semibold text-[var(--cat-4)] hover:underline">{data.insurer} 공식 페이지에서 현재 조건 확인 ↗</a>}
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-4">가입 전 직접 확인할 항목</h2>
          <ul className="space-y-2 text-sm text-[var(--brand-text-secondary)] list-disc pl-5">
            <li>상품명, 판매 채널, 상품요약서와 약관의 작성·개정일</li><li>반려동물 종류·품종·나이와 과거 병력에 따른 가입 가능 여부</li><li>보장비율, 자기부담금, 회당·연간 한도와 대기기간</li><li>기존 질환 및 항목별 면책, 갱신과 보험료 변경 조건</li>
          </ul>
        </section>
        <div className="mb-8 p-5 rounded-[var(--r-card)] bg-[var(--brand-surface-2)] text-sm text-[var(--brand-text-secondary)]">판매 상태와 약관은 확인일 이후 바뀔 수 있습니다. 최종 판단은 보험사가 제공하는 현재 상품설명서와 약관을 기준으로 하세요.</div>
        <div className="mb-8"><Link href="/insurance/compare" className="text-sm font-semibold text-[var(--cat-4)] hover:underline">전체 공식 확인 현황 보기 →</Link></div>
        <ShareButtons url={pageUrl} title={`${data.insurer} 펫보험 공식 정보 확인 | 펫지기`} />
      </main>
    </AdPolicyProvider>
  );
}
