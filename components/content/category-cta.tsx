import type { CategoryId } from "@/lib/category";

interface CtaConfig {
  emoji: string;
  heading: string;
  body: string;
  label: string;
  href: string;
  notice: string;
  bg: string;
  border: string;
}

const CTA_MAP: Partial<Record<CategoryId, CtaConfig>> = {
  1: {
    emoji: "🐾",
    heading: "유기동물 입양을 고려해보세요",
    body: "전국 보호센터 구조동물 현황을 확인하거나, 강아지·고양이 품종 정보를 찾아보세요.",
    label: "구조동물 보기",
    href: "/rescue",
    notice: "",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800",
  },
  2: {
    emoji: "🍖",
    heading: "우리 아이 맞춤 사료 찾기",
    body: "품종·나이·건강 상태별 최적 사료를 전문가 추천으로 비교해 보세요.",
    label: "사료 가이드 보기",
    href: "/category/nutrition",
    notice: "",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
  },
  3: {
    emoji: "🛡️",
    heading: "펫보험 무료 비교견적",
    body: "동물병원비 부담을 줄이는 펫보험, 5분 만에 주요 상품을 한눈에 비교하세요.",
    label: "펫보험 비교하기",
    href: "/insurance/compare",
    notice: "이 링크는 제휴(어필리에이트) 링크입니다. 가입 시 소정의 수수료가 펫지기에 지급됩니다.",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
  },
  4: {
    emoji: "🛡️",
    heading: "내 아이에게 맞는 펫보험은?",
    body: "품종·나이·보장 범위별 펫보험 상품을 한눈에 비교하고 최적 플랜을 찾아보세요.",
    label: "펫보험 비교하기",
    href: "/insurance/compare",
    notice: "이 링크는 제휴(어필리에이트) 링크입니다. 가입 시 소정의 수수료가 펫지기에 지급됩니다.",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
  },
  5: {
    emoji: "✂️",
    heading: "내 지역 반려동물 서비스 찾기",
    body: "펫미용·펫호텔·훈련소 등 신뢰할 수 있는 반려동물 서비스를 지역별로 찾아보세요.",
    label: "서비스 찾기",
    href: "/sido/seoul",
    notice: "",
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-200 dark:border-green-800",
  },
  6: {
    emoji: "🕊️",
    heading: "소중한 추억을 영원히",
    body: "반려동물 장례·화장·수목장·납골 서비스를 비교하고, 추모 용품을 만나보세요.",
    label: "장례 정보 보기",
    href: "/category/memorial",
    notice: "",
    bg: "bg-gray-50 dark:bg-gray-900/40",
    border: "border-gray-200 dark:border-gray-700",
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
      className={`rounded-2xl border p-5 ${cfg.bg} ${cfg.border} ${className}`}
      aria-label="관련 서비스"
    >
      {cfg.notice && (
        <p className="text-[10px] text-[var(--brand-text-secondary)] mb-3 leading-snug">
          📢 {cfg.notice}
        </p>
      )}
      <p className="text-lg font-bold text-[var(--brand-text)] mb-1">
        {cfg.emoji} {cfg.heading}
      </p>
      <p className="text-sm text-[var(--brand-text-secondary)] mb-4 leading-relaxed" style={{ wordBreak: "keep-all" }}>
        {cfg.body}
      </p>
      <a
        href={cfg.href}
        rel={cfg.notice ? "sponsored nofollow noopener" : "noopener noreferrer"}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--brand-accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        {cfg.label} →
      </a>
    </aside>
  );
}
