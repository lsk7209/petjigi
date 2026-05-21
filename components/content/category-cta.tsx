import type { CategoryId } from "@/lib/category";

interface CtaConfig {
  heading: string;
  body: string;
  label: string;
  href: string;
  affiliate: boolean;
  catVar: string;
  catSoftVar: string;
}

const CTA_MAP: Partial<Record<CategoryId, CtaConfig>> = {
  1: {
    heading: "유기동물 입양을 고려해보세요",
    body: "전국 보호센터 구조동물 현황을 확인하거나, 강아지·고양이 품종 정보를 찾아보세요.",
    label: "구조동물 보기",
    href: "/rescue",
    affiliate: false,
    catVar: "var(--cat-1)",
    catSoftVar: "var(--cat-1-soft)",
  },
  2: {
    heading: "우리 아이 맞춤 사료 찾기",
    body: "품종·나이·건강 상태별 최적 사료를 전문가 추천으로 비교해 보세요.",
    label: "사료 가이드 보기",
    href: "/category/nutrition",
    affiliate: false,
    catVar: "var(--cat-2)",
    catSoftVar: "var(--cat-2-soft)",
  },
  3: {
    heading: "펫보험 무료 비교견적",
    body: "동물병원비 부담을 줄이는 펫보험, 5분 만에 주요 상품을 한눈에 비교하세요.",
    label: "펫보험 비교하기",
    href: "/insurance/compare",
    affiliate: true,
    catVar: "var(--cat-3)",
    catSoftVar: "var(--cat-3-soft)",
  },
  4: {
    heading: "내 아이에게 맞는 펫보험은?",
    body: "품종·나이·보장 범위별 펫보험 상품을 한눈에 비교하고 최적 플랜을 찾아보세요.",
    label: "펫보험 비교하기",
    href: "/insurance/compare",
    affiliate: true,
    catVar: "var(--cat-4)",
    catSoftVar: "var(--cat-4-soft)",
  },
  5: {
    heading: "내 지역 반려동물 서비스 찾기",
    body: "펫미용·펫호텔·훈련소 등 신뢰할 수 있는 반려동물 서비스를 지역별로 찾아보세요.",
    label: "서비스 찾기",
    href: "/sido/seoul",
    affiliate: false,
    catVar: "var(--cat-5)",
    catSoftVar: "var(--cat-5-soft)",
  },
  6: {
    heading: "소중한 추억을 영원히",
    body: "반려동물 장례·화장·수목장·납골 서비스를 비교하고, 추모 용품을 만나보세요.",
    label: "장례 정보 보기",
    href: "/category/memorial",
    affiliate: false,
    catVar: "var(--cat-6)",
    catSoftVar: "var(--cat-6-soft)",
  },
};

interface CategoryCtaProps {
  categoryId: CategoryId;
  className?: string;
}

export function CategoryCta({ categoryId, className = "" }: CategoryCtaProps) {
  const cfg = CTA_MAP[categoryId];
  if (!cfg) return null;

  return (
    <aside
      className={className}
      style={{
        background: cfg.catSoftVar,
        border: `1px solid color-mix(in srgb, ${cfg.catVar} 30%, transparent)`,
        borderRadius: "var(--r-card, 16px)",
        padding: "20px 22px",
      }}
      aria-label="관련 서비스"
    >
      {cfg.affiliate && (
        <p className="pj-affiliate-disclosure" style={{ marginBottom: 10 }}>
          ⊙ 제휴 링크 · 가입 시 펫지기가 일정 수익을 받습니다.
        </p>
      )}
      <p
        className="font-bold"
        style={{ fontSize: 17, color: "var(--brand-text)", marginBottom: 6 }}
      >
        {cfg.heading}
      </p>
      <p
        className="pj-tiny"
        style={{ lineHeight: 1.7, marginBottom: 16 }}
      >
        {cfg.body}
      </p>
      <a
        href={cfg.href}
        rel={cfg.affiliate ? "sponsored nofollow noopener" : "noopener noreferrer"}
        className="pj-btn pj-btn-sm"
        style={{
          background: cfg.catVar,
          color: "#fff",
          borderColor: "transparent",
        }}
      >
        {cfg.label}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
        </svg>
      </a>
    </aside>
  );
}
