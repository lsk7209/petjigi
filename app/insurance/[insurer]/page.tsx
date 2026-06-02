import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { ShareButtons } from "@/components/content/share-buttons";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";
import { getCachedCategoryGuides, getCachedCategoryBlogPosts } from "@/lib/db-queries";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

type InsurerData = {
  name: string;
  fullName: string;
  product: string;
  tagline: string;
  desc: string;
  coverages: { item: string; detail: string }[];
  features: string[];
  pros: string[];
  cons: string[];
  faqs: { q: string; a: string }[];
  recommended: string;
};

const INSURERS: Record<string, InsurerData> = {
  hyundai: {
    name: "현대해상",
    fullName: "현대해상화재보험",
    product: "하이펫보험",
    tagline: "국내 점유율 1위, 전국 제휴병원 네트워크",
    desc: "현대해상 하이펫보험은 국내 반려동물 보험 시장에서 가장 높은 점유율을 가진 상품입니다. 전국 4,000개 이상의 제휴 동물병원을 보유하고 있어 청구가 간편하며, 통원·입원·수술 3대 보장을 기본 제공합니다. Hi-MyCar 앱을 통한 모바일 간편 청구가 가능합니다.",
    coverages: [
      { item: "통원치료", detail: "1회당 일정 한도 내 실손 보상 (연 최대 50회 한도)" },
      { item: "입원치료", detail: "입원 일당 일정 한도 내 실손 보상" },
      { item: "수술치료", detail: "수술 1건당 일정 한도 내 실손 보상" },
    ],
    features: [
      "국내 펫보험 시장 점유율 1위 브랜드 신뢰도",
      "전국 4,000개 이상 제휴 동물병원 — 앱 청구 가능",
      "Hi-MyCar 앱으로 모바일 간편 청구",
      "갱신형 구조로 장기 유지 가능",
    ],
    pros: [
      "폭넓은 제휴병원 네트워크로 청구 번거로움 최소화",
      "통원 보장 횟수가 넉넉해 잦은 통원 치료에 유리",
      "국내 최대 점유율로 검증된 운용 실적",
    ],
    cons: [
      "갱신형으로 나이 증가 시 보험료 인상 가능",
      "선천성·유전성 질환은 기본 계약 면책",
    ],
    faqs: [
      {
        q: "현대해상 하이펫보험 가입 연령은 어떻게 되나요?",
        a: "강아지·고양이 모두 생후 61일부터 만 8세(갱신 시 만 10세)까지 신규 가입이 가능합니다. 정확한 기준은 가입 시점 약관을 반드시 확인하세요.",
      },
      {
        q: "제휴 동물병원이 아닌 곳에서 치료받으면 청구가 불가능한가요?",
        a: "비제휴 병원에서도 청구할 수 있습니다. 제휴 병원은 앱 간편 청구, 비제휴 병원은 영수증·진단서 등 서류를 제출하는 방식입니다.",
      },
      {
        q: "선천성·유전성 질환은 보장되나요?",
        a: "기본 계약에서는 면책입니다. 일부 상품에는 특약으로 보장되는 경우가 있으므로 가입 전 약관 및 상담을 통해 확인하세요.",
      },
    ],
    recommended: "통원 치료가 잦고 제휴병원 편의를 중시하는 보호자에게 적합합니다.",
  },
  db: {
    name: "DB손보",
    fullName: "DB손해보험",
    product: "다이렉트 펫보험",
    tagline: "온라인 다이렉트 가입으로 보험료 절감",
    desc: "DB손보 다이렉트 펫보험은 보험 설계사 없이 온라인으로 직접 가입하여 중간 수수료를 절감한 상품입니다. 모바일 앱을 통한 빠른 청구와 심사가 장점이며, 다양한 보장 구성을 직접 선택할 수 있습니다.",
    coverages: [
      { item: "통원치료", detail: "1회당 일정 한도 내 실손 보상" },
      { item: "입원치료", detail: "입원 치료비 일정 한도 내 실손 보상" },
      { item: "수술치료", detail: "수술 치료비 일정 한도 내 실손 보상" },
    ],
    features: [
      "온라인 다이렉트 가입 — 설계사 수수료 없이 보험료 절감",
      "DB손보 앱으로 빠른 모바일 청구",
      "보장 범위·자기부담금을 직접 선택",
      "강아지·고양이 통합 가입 가능",
    ],
    pros: [
      "온라인 다이렉트 구조로 보험료 경쟁력 우수",
      "모바일 청구가 간편하고 처리 속도 빠름",
      "원하는 보장 범위를 직접 커스터마이즈 가능",
    ],
    cons: [
      "대면 상담 없이 스스로 상품 구조를 이해해야 함",
      "제휴병원 수가 타사 대비 적을 수 있음",
    ],
    faqs: [
      {
        q: "DB손보 다이렉트 펫보험은 어떻게 가입하나요?",
        a: "DB손보 공식 홈페이지 또는 앱에서 나이·품종·원하는 보장 범위를 선택하면 즉시 보험료를 확인하고 가입할 수 있습니다.",
      },
      {
        q: "온라인 가입이면 보험료가 얼마나 저렴한가요?",
        a: "설계사를 통하지 않아 모집 수수료가 없기 때문에 유사한 보장의 대면 상품 대비 보험료가 낮은 편입니다. 정확한 금액은 견적을 받아 비교하세요.",
      },
      {
        q: "청구는 어떻게 하나요?",
        a: "DB손보 앱에서 영수증·진단서를 촬영하여 업로드하면 됩니다. 접수 후 심사를 거쳐 보험금이 지급됩니다.",
      },
    ],
    recommended: "스스로 상품을 비교하고 보험료를 아끼고 싶은 합리적인 보호자에게 적합합니다.",
  },
  kb: {
    name: "KB손보",
    fullName: "KB손해보험",
    product: "펫코노미보험",
    tagline: "실손 방식으로 실제 치료비를 보장",
    desc: "KB손보 펫코노미보험은 실제 발생한 치료비의 일정 비율을 보상하는 실손 방식을 채택한 상품입니다. 예상치 못한 고액 수술비나 장기 입원 치료가 발생했을 때 실질적인 보상을 받을 수 있어, 중증 질환 대비에 강점이 있습니다.",
    coverages: [
      { item: "통원치료", detail: "실제 치료비의 일정 비율 보상 (자기부담금 공제 후)" },
      { item: "입원치료", detail: "입원 치료비의 일정 비율 실손 보상" },
      { item: "수술치료", detail: "수술 치료비 실손 보상 — 고액 수술 시 유리" },
    ],
    features: [
      "실손 방식으로 고액 치료비에 실질적 보장",
      "KB금융그룹 계열 안정성과 신뢰도",
      "KB스타뱅킹 앱과 연계한 편리한 서비스",
      "강아지·고양이 통합 보장",
    ],
    pros: [
      "고액 수술·장기 입원 시 실질 보상금이 큼",
      "KB금융그룹 계열의 높은 안정성",
      "앱 연계 서비스로 청구 편리",
    ],
    cons: [
      "소액 통원이 잦은 경우 자기부담금 비중이 커 체감 혜택이 적을 수 있음",
      "보험료가 정액형 대비 상대적으로 높을 수 있음",
    ],
    faqs: [
      {
        q: "실손 방식이 정액형보다 항상 유리한가요?",
        a: "고액 치료비(대형 수술, 장기 입원)가 발생할 때는 실손이 유리합니다. 반면 소액 통원이 잦은 경우 자기부담금 때문에 실제 수령액이 예상보다 적을 수 있습니다.",
      },
      {
        q: "자기부담금은 어떻게 정해지나요?",
        a: "상품과 선택 옵션에 따라 정률(치료비의 20~30%)과 정액(건당 일정액) 방식이 있습니다. 낮을수록 보험료가 높아지며, 가입 전 약관 확인이 필요합니다.",
      },
      {
        q: "KB손보 펫코노미보험 가입 나이 제한은?",
        a: "기본적으로 만 8세(갱신 만 10세)까지 신규 가입이 가능하나, 상품별로 다를 수 있으니 가입 시 확인하세요.",
      },
    ],
    recommended: "중증 질환·고액 수술비를 대비하고 싶은 보호자, KB금융 고객에게 적합합니다.",
  },
  samsung: {
    name: "삼성화재",
    fullName: "삼성화재해상보험",
    product: "애니펫보험",
    tagline: "업계 최고 수준 보장 한도 + 다양한 특약",
    desc: "삼성화재 애니펫보험은 업계 최고 수준의 보장 한도와 풍부한 특약 구성이 특징입니다. 치과·안과·피부 질환 등 선택적 특약을 통해 나의 반려동물에 맞는 맞춤형 보장을 구성할 수 있습니다.",
    coverages: [
      { item: "통원치료", detail: "1회당 높은 한도 내 보상" },
      { item: "입원치료", detail: "입원 일당 높은 한도 내 보상" },
      { item: "수술치료", detail: "수술 1건당 업계 최고 수준 한도 보상" },
      { item: "특약 (선택)", detail: "치과·안과·피부·선천성 질환 특약 추가 가능" },
    ],
    features: [
      "업계 최고 수준의 입원·수술 보장 한도",
      "치과·안과·피부 질환 등 선택적 특약 구성",
      "삼성화재 브랜드 신뢰도 및 안정성",
      "다양한 상품 구성으로 맞춤 보장 설계 가능",
    ],
    pros: [
      "높은 보장 한도로 중증 질환·대형 수술 대비에 유리",
      "다양한 특약으로 보장 범위를 넓힐 수 있음",
      "국내 1위 손해보험사의 안정성",
    ],
    cons: [
      "높은 보장 한도·특약 추가 시 보험료 부담 증가",
      "선택 사항이 많아 비교·결정이 복잡할 수 있음",
    ],
    faqs: [
      {
        q: "삼성화재 애니펫보험의 특약 종류는 어떤 것들이 있나요?",
        a: "치과 질환, 안과 질환, 피부 질환, 선천성·유전성 질환 등을 특약으로 추가할 수 있습니다. 각 특약의 보장 내용과 보험료는 가입 시 확인하세요.",
      },
      {
        q: "특약을 많이 추가하면 보험료가 많이 오르나요?",
        a: "네, 특약을 추가할수록 보험료가 올라갑니다. 반려동물의 건강 상태와 품종별 취약 질환을 고려하여 필요한 특약만 선택하는 것이 합리적입니다.",
      },
      {
        q: "보험 가입 전 건강검진이 필요한가요?",
        a: "일반적으로 가입 전 건강검진은 필요하지 않지만, 기존 질환이 있는 경우 고지 의무를 이행해야 합니다. 고지 의무 위반 시 보험금 지급이 거절될 수 있습니다.",
      },
    ],
    recommended: "보장 한도를 최대화하고 싶거나, 품종별 특정 질환 위험에 맞는 특약을 추가하고 싶은 보호자에게 적합합니다.",
  },
  hanwha: {
    name: "한화손보",
    fullName: "한화손해보험",
    product: "레저펫보험",
    tagline: "치료비 보장 + 배상책임 특약 통합",
    desc: "한화손보 레저펫보험은 기본 의료비 보장에 더해, 반려동물로 인한 타인 상해·재산 피해에 대한 배상책임 특약을 제공하는 차별화된 상품입니다. 산책 중 교통사고나 타인 부상 등 예기치 못한 상황을 대비할 수 있습니다.",
    coverages: [
      { item: "통원치료", detail: "1회당 일정 한도 내 실손 보상" },
      { item: "입원치료", detail: "입원 치료비 실손 보상" },
      { item: "수술치료", detail: "수술 치료비 실손 보상" },
      { item: "배상책임 (특약)", detail: "반려동물로 인한 타인 상해·재산 피해 보상 (최대 1억원)" },
    ],
    features: [
      "반려동물 배상책임 특약 — 타인 피해 보상 (최대 1억원)",
      "산책 중 사고, 타인 부상·재산 피해 대비",
      "기본 3대 의료비 보장 + 배상책임 통합 구성",
      "한화손보 안정성",
    ],
    pros: [
      "배상책임 보장으로 산책 중 사고 위험을 종합적으로 대비",
      "타인에게 피해를 줬을 때 고액 배상 책임을 보장받을 수 있음",
      "기본 의료비와 배상책임을 한 상품으로 해결",
    ],
    cons: [
      "배상책임 위주 상품이므로 순수 의료비 보장 경쟁력은 별도 확인 필요",
      "상품 구조가 복잡할 수 있어 보장 내용 숙지가 중요",
    ],
    faqs: [
      {
        q: "배상책임 특약은 어떤 상황에 보장되나요?",
        a: "반려동물이 산책 중 타인을 물거나 긁어서 상해를 입혔을 때, 또는 타인의 재산에 피해를 주었을 때 발생하는 법적 배상 책임을 보장합니다. 최대 1억원까지 보상됩니다.",
      },
      {
        q: "배상책임 특약만 단독으로 가입할 수 있나요?",
        a: "일반적으로 배상책임 특약은 주계약(의료비 보장)에 추가하는 방식입니다. 단독 가입 여부는 가입 시 확인이 필요합니다.",
      },
      {
        q: "우리 강아지가 사람을 물었을 때도 보장되나요?",
        a: "배상책임 특약 범위 내에서 보장됩니다. 단, 고의적 방치나 관리 소홀 등 면책 조항에 해당하는 경우는 보장이 안 될 수 있으므로 약관 확인이 필요합니다.",
      },
    ],
    recommended: "반려동물 산책이 잦고, 타인 피해 사고에 대한 배상 책임까지 함께 대비하고 싶은 보호자에게 적합합니다.",
  },
  meritz: {
    name: "메리츠화재",
    fullName: "메리츠화재해상보험",
    product: "퍼피라이프보험",
    tagline: "노령 반려동물 특화, 만 10세까지 신규 가입",
    desc: "메리츠화재 퍼피라이프보험은 타사 대비 높은 신규 가입 연령(만 10세)을 제공하는 노령 반려동물 특화 상품입니다. 이미 나이가 있는 반려동물도 보험 혜택을 받을 수 있으며, 노령기에 발생하기 쉬운 질환에 대한 보장 옵션을 제공합니다.",
    coverages: [
      { item: "통원치료", detail: "1회당 일정 한도 내 실손 보상" },
      { item: "입원치료", detail: "입원 치료비 실손 보상" },
      { item: "수술치료", detail: "수술 치료비 실손 보상" },
    ],
    features: [
      "신규 가입 연령 만 10세까지 — 타사 대비 높은 가입 상한",
      "노령견·노령묘를 위한 특화 설계",
      "만성 질환 일부 보장 옵션 (상품에 따라)",
      "메리츠화재 안정성",
    ],
    pros: [
      "고령 반려동물도 신규 가입 가능 (업계 최고 수준 가입 연령)",
      "노령기 흔한 질환에 대한 커버 옵션",
      "늦게 보험에 가입하는 보호자에게 실질적 선택지 제공",
    ],
    cons: [
      "나이가 많을수록 보험료가 높아져 실질 비용 부담 증가",
      "만성 질환 보장 범위와 면책 조건을 꼼꼼히 확인해야 함",
    ],
    faqs: [
      {
        q: "만 10세 이상 반려동물도 가입할 수 있나요?",
        a: "퍼피라이프보험은 만 10세까지 신규 가입이 가능합니다. 다만 나이가 많을수록 보험료가 높아지고 보장 조건이 달라지므로, 가입 전 조건을 상세히 확인하세요.",
      },
      {
        q: "만성 질환도 보장이 가능한가요?",
        a: "상품 옵션에 따라 만성 질환 일부를 보장받을 수 있습니다. 구체적인 보장 항목, 면책 기간, 면책 조건은 약관을 반드시 확인하세요.",
      },
      {
        q: "노령 동물의 보험료는 얼마나 되나요?",
        a: "나이, 품종, 보장 범위에 따라 크게 달라집니다. 공식 홈페이지 보험료 조회 기능을 통해 직접 확인하거나 상담을 받으세요.",
      },
    ],
    recommended: "이미 나이가 든 반려동물을 키우고 있어 다른 보험사에서 가입이 거절된 보호자에게 특히 적합합니다.",
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
  const title = `${data.fullName} ${data.product} — ${data.tagline} | 펫지기`;
  return {
    title,
    description: data.desc,
    alternates: { canonical: `/insurance/${insurer}` },
    openGraph: { title, description: data.desc },
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

  const faqJsonLd = faqSchema(
    data.faqs.map((f) => ({ question: f.q, answer: f.a, url: `${SITE_URL}/insurance/${insurer}` }))
  );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${data.fullName} ${data.product}`,
    category: "반려동물보험",
    description: data.desc,
    url: `${SITE_URL}/insurance/${insurer}`,
    provider: {
      "@type": "Organization",
      name: data.fullName,
    },
    isRelatedTo: {
      "@type": "WebPage",
      url: `${SITE_URL}/insurance/compare`,
      name: "펫보험 비교",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
  };

  const otherInsurers = Object.entries(INSURERS).filter(([slug]) => slug !== insurer);
  const [insuranceGuides, insuranceBlogs] = await Promise.all([
    getCachedCategoryGuides(4), // cat4 = 보험·법률
    getCachedCategoryBlogPosts(4),
  ]);

  const pageUrl = `${SITE_URL}/insurance/${insurer}`;

  return (
    <AdPolicyProvider category={4}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 bg-[var(--brand-bg)]">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href="/category/insurance" className="hover:text-[var(--brand-accent)] transition-colors">보험·법률</Link>
          <span aria-hidden="true">›</span>
          <Link href="/insurance/compare" className="hover:text-[var(--brand-accent)] transition-colors">펫보험 비교</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">{data.name}</span>
        </nav>

        {/* 헤더 */}
        <header className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold tracking-widest text-[var(--cat-4)] uppercase mb-2">
            펫보험 · {data.fullName}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] leading-tight mb-2 sm:mb-3 tracking-tight" style={{ wordBreak: "keep-all" }} data-speakable>
            {data.product}
            <span className="block text-lg sm:text-xl font-medium text-[var(--brand-text-secondary)] mt-1" style={{ wordBreak: "keep-all" }}>
              {data.tagline}
            </span>
          </h1>
          <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{data.desc}</p>
        </header>

        <YmylDisclaimer categoryId={4} />

        {/* 보장 항목 */}
        <section className="mt-8 mb-8">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-4">보장 항목</h2>
          <div className="rounded-[var(--r-card)] border border-[var(--brand-border)] overflow-hidden">
            {data.coverages.map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-5 py-4 border-b border-[var(--brand-border)] last:border-0"
              >
                <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--cat-4-soft)] text-[var(--cat-4)] flex items-center justify-center text-xs font-bold mt-0.5">
                  ✓
                </span>
                <div>
                  <p className="font-semibold text-[var(--brand-text)] text-sm mb-0.5">{c.item}</p>
                  <p className="text-xs text-[var(--brand-text-secondary)]">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-2">
            * 보장 한도·자기부담금·면책 조건은 가입 시점 약관 기준이며 변경될 수 있습니다.
          </p>
        </section>

        {/* 주요 특징 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-4">주요 특징</h2>
          <ul className="space-y-2">
            {data.features.map((f, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-[var(--brand-text-secondary)]">
                <span className="shrink-0 text-[var(--cat-4)] mt-0.5">▸</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 장단점 */}
        <section className="mb-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-[var(--r-card)] border border-[var(--brand-border)] p-5">
            <h3 className="font-semibold text-[var(--brand-text)] mb-3 flex items-center gap-2">
              <span className="text-green-600">장점</span>
            </h3>
            <ul className="space-y-2">
              {data.pros.map((p, i) => (
                <li key={i} className="text-sm text-[var(--brand-text-secondary)] flex gap-2">
                  <span className="text-green-500 shrink-0 mt-0.5">+</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--r-card)] border border-[var(--brand-border)] p-5">
            <h3 className="font-semibold text-[var(--brand-text)] mb-3">
              <span className="text-[var(--brand-text-secondary)]">단점·주의사항</span>
            </h3>
            <ul className="space-y-2">
              {data.cons.map((c, i) => (
                <li key={i} className="text-sm text-[var(--brand-text-secondary)] flex gap-2">
                  <span className="shrink-0 mt-0.5">−</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 이런 분께 추천 */}
        <section className="mb-8 rounded-[var(--r-card)] bg-[var(--cat-4-soft)] border border-[color-mix(in_srgb,var(--cat-4)_20%,transparent)] p-5">
          <h3 className="font-semibold text-[var(--cat-4)] mb-2 text-sm">이런 분께 추천</h3>
          <p className="text-sm text-[var(--brand-text)] leading-relaxed">{data.recommended}</p>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[var(--brand-text)] mb-4">
            {data.name} 펫보험 자주 묻는 질문
          </h2>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[var(--brand-border)] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer text-sm font-medium text-[var(--brand-text)] select-none list-none">
                  {faq.q}
                  <span className="shrink-0 text-[var(--brand-text-secondary)] transition-transform group-open:rotate-180 ml-3">▾</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-[var(--brand-text-secondary)] leading-relaxed border-t border-[var(--brand-border)] pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <AdSlot adType="adsense" format="horizontal" className="mb-8" />

        {/* 비교 CTA */}
        <div className="mb-10 p-5 rounded-[var(--r-card)] border border-[var(--brand-border)] bg-[var(--brand-surface-2)] text-center">
          <p className="text-sm font-semibold text-[var(--brand-text)] mb-2">다른 보험사와 비교해보세요</p>
          <p className="text-xs text-[var(--brand-text-secondary)] mb-4">
            6대 손보사 펫보험 체크포인트 — 보장 범위·자기부담금·가입 연령 한눈에 비교
          </p>
          <Link
            href="/insurance/compare"
            className="inline-block bg-[var(--cat-4)] text-white font-semibold px-6 py-2.5 rounded-[var(--r-button)] hover:opacity-90 transition-opacity text-sm"
          >
            펫보험 비교하기 →
          </Link>
        </div>

        {/* 보험·법률 가이드 */}
        {insuranceGuides.length > 0 && (
          <aside className="mb-8 pt-6 border-t border-[var(--brand-border)]" aria-label="보험·법률 가이드">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">📚 보험·법률 가이드</h2>
            <div className="flex flex-col gap-2">
              {insuranceGuides.slice(0, 3).map((g) => (
                <Link
                  key={g.slug}
                  href={`/guide/${g.slug}`}
                  className="group flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--brand-surface-2)] transition-colors"
                >
                  <span className="text-[var(--cat-4)] shrink-0">📖</span>
                  <p className="text-sm font-medium text-[var(--brand-text)] group-hover:text-[var(--cat-4)] transition-colors leading-snug" style={{ wordBreak: "keep-all" }}>
                    {g.title}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* 보험·법률 블로그 */}
        {insuranceBlogs.length > 0 && (
          <aside className="mb-8 pt-4" aria-label="보험·법률 블로그">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">✍️ 관련 블로그</h2>
            <div className="flex flex-col gap-2">
              {insuranceBlogs.slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex items-start gap-2 p-3 rounded-lg hover:bg-[var(--brand-surface-2)] transition-colors"
                >
                  <span className="mt-0.5 text-[var(--cat-4)] shrink-0">→</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--brand-text)] group-hover:text-[var(--cat-4)] transition-colors leading-snug" style={{ wordBreak: "keep-all" }}>
                      {p.title}
                    </p>
                    {p.subtitle && (
                      <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5 line-clamp-1">{p.subtitle}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* 다른 보험사 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--brand-text)] mb-4">다른 보험사 상품 보기</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherInsurers.map(([slug, info]) => (
              <Link
                key={slug}
                href={`/insurance/${slug}`}
                className="p-4 rounded-[var(--r-card)] border border-[var(--brand-border)] hover:border-[var(--cat-4)] transition-colors text-center"
              >
                <span className="block text-sm font-semibold text-[var(--brand-text)]">{info.name}</span>
                <span className="block text-xs text-[var(--brand-text-secondary)] mt-0.5">{info.product}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mb-4">
          <ShareButtons url={pageUrl} title={`${data.fullName} ${data.product} | 펫지기`} />
        </div>
      </main>
    </AdPolicyProvider>
  );
}
