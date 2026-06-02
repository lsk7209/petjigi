export type CategoryId = 1 | 2 | 3 | 4 | 5 | 6;
export type DesignMode = "default" | "memorial";
export type CategoryTone =
  | "따뜻하게"
  | "정확하게"
  | "정확·꼼꼼하게"
  | "꼼꼼하게"
  | "조용히";

export interface CategoryConfig {
  id: CategoryId;
  name: string;
  slug: string;
  tone: CategoryTone;
  mode: DesignMode;
  ymyl: boolean;
  disclaimer: string | null;
}

export const CATEGORIES: Record<CategoryId, CategoryConfig> = {
  1: {
    id: 1,
    name: "입양·등록",
    slug: "adoption",
    tone: "따뜻하게",
    mode: "default",
    ymyl: false,
    disclaimer: null,
  },
  2: {
    id: 2,
    name: "사료·영양",
    slug: "nutrition",
    tone: "정확하게",
    mode: "default",
    ymyl: false,
    disclaimer: null,
  },
  3: {
    id: 3,
    name: "건강·의료",
    slug: "health",
    tone: "정확·꼼꼼하게",
    mode: "default",
    ymyl: true,
    disclaimer:
      "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 반려동물의 건강 문제는 반드시 수의사와 상담하세요. 응급 상황 시 가까운 동물병원 또는 24시간 동물의료센터를 즉시 방문해 주세요.",
  },
  4: {
    id: 4,
    name: "보험·법률",
    slug: "insurance",
    tone: "꼼꼼하게",
    mode: "default",
    ymyl: true,
    disclaimer:
      "본 콘텐츠는 보험·법률 정보 제공 목적이며, 개별 상황에 따라 적용이 다를 수 있습니다. 본 사이트는 보험 중개·법률 자문 기관이 아닙니다.",
  },
  5: {
    id: 5,
    name: "케어·라이프",
    slug: "care",
    tone: "따뜻하게",
    mode: "default",
    ymyl: false,
    disclaimer: null,
  },
  6: {
    id: 6,
    name: "장례·추모",
    slug: "memorial",
    tone: "조용히",
    mode: "memorial",
    ymyl: true,
    disclaimer:
      "본 콘텐츠는 정보 제공 및 슬픔 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다. 펫로스로 일상이 어렵다면 전문 심리상담사 또는 정신건강복지센터의 도움을 받으세요.",
  },
};

export function getCategoryById(id: CategoryId): CategoryConfig {
  return CATEGORIES[id];
}

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return Object.values(CATEGORIES).find((c) => c.slug === slug);
}

export function isYmyl(categoryId: CategoryId): boolean {
  return CATEGORIES[categoryId].ymyl;
}

export function isMemorialMode(categoryId: CategoryId): boolean {
  return CATEGORIES[categoryId].mode === "memorial";
}

export function getCatColorVar(categoryId: number): string {
  return `var(--cat-${categoryId})`;
}

export function getCatSoftVar(categoryId: number): string {
  return `var(--cat-${categoryId}-soft)`;
}
