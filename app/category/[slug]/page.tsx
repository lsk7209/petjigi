import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, CATEGORIES } from "@/lib/category";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { CategoryProvider } from "@/components/providers/category-provider";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { ThemeMode } from "@/components/providers/theme-mode";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.values(CATEGORIES).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} 정보 | 펫지기`,
    description: `반려동물 ${cat.name} 관련 정보를 모아보세요. 공공데이터 기반 신뢰할 수 있는 정보.`,
  };
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  adoption: "유기동물 입양, 동물등록제, 품종 가이드 등 반려동물을 처음 맞이하는 분들을 위한 정보입니다.",
  nutrition: "반려동물 사료 비교, 영양제, 알러지 대응 등 먹거리 선택을 돕는 정보입니다.",
  health: "동물병원 찾기, 예방접종, 증상·질병 정보 등 반려동물 건강 관리 정보입니다.",
  insurance: "펫보험 비교, 보장범위, 청구 가이드, 동물보호법 분쟁 정보입니다.",
  care: "반려동물 미용·호텔·훈련·동반시설 등 라이프스타일 정보입니다.",
  memorial: "반려동물 장묘 업체, 장례 절차·비용, 펫로스 케어 정보입니다.",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  return (
    <CategoryProvider category={cat.id}>
      <ThemeMode mode={cat.mode}>
        <AdPolicyProvider category={cat.id}>
          <main className="max-w-5xl mx-auto px-4 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-2">
                {cat.name}
              </h1>
              <p className="text-[var(--brand-text-secondary)]">
                {CATEGORY_DESCRIPTIONS[cat.slug]}
              </p>
            </div>

            <YmylDisclaimer categoryId={cat.id} />

            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">지역별 검색</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["서울", "부산", "인천", "대구", "광주", "대전", "울산", "경기"].map((sido) => (
                  <Link
                    key={sido}
                    href={`/sido/${encodeURIComponent(sido)}`}
                    className="p-3 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] text-sm text-center transition-colors"
                  >
                    {sido}
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </AdPolicyProvider>
      </ThemeMode>
    </CategoryProvider>
  );
}
