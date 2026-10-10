import { CATEGORIES, type CategoryId } from "@/lib/category";

export interface HomeContentRow {
  slug: string;
  title: string;
  category: number | null;
  publishedAt: string | null;
}

export interface HomeGuideCard {
  href: string;
  title: string;
  categoryId: CategoryId;
  categoryName: string;
  publishedAt: string | null;
  thumb: string;
}

const HOME_GUIDE_COUNT = 4;
const DEFAULT_CATEGORY: CategoryId = 5;

// 카테고리 id → 주제가 일치하는 썸네일 (public/images/home)
const THUMB_BY_CATEGORY: Record<CategoryId, string> = {
  1: "/images/home/thumb-adoption.webp",
  2: "/images/home/thumb-nutrition.webp",
  3: "/images/home/thumb-health.webp",
  4: "/images/home/thumb-insurance.webp",
  5: "/images/home/thumb-care.webp",
  6: "/images/home/memorial.webp",
};

const toCategoryId = (value: number | null): CategoryId =>
  value && value in CATEGORIES ? (value as CategoryId) : DEFAULT_CATEGORY;

const byNewest = (a: HomeGuideCard, b: HomeGuideCard) =>
  (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");

function toCard(row: HomeContentRow, base: "guide" | "blog"): HomeGuideCard {
  const categoryId = toCategoryId(row.category);
  return {
    href: `/${base}/${row.slug}`,
    title: row.title,
    categoryId,
    categoryName: CATEGORIES[categoryId].name,
    publishedAt: row.publishedAt,
    thumb: THUMB_BY_CATEGORY[categoryId],
  };
}

/** 최신순 후보에서 카테고리가 겹치지 않게 먼저 고르고, 모자라면 최신순으로 채운다. */
export function pickHomeGuides(
  guides: HomeContentRow[],
  posts: HomeContentRow[],
  count = HOME_GUIDE_COUNT,
): HomeGuideCard[] {
  const sorted = [
    ...guides.map((row) => toCard(row, "guide")),
    ...posts.map((row) => toCard(row, "blog")),
  ].sort(byNewest);

  const seen = new Set<CategoryId>();
  const picked = sorted.filter((card) => {
    if (seen.has(card.categoryId)) return false;
    seen.add(card.categoryId);
    return true;
  });
  const rest = sorted.filter((card) => !picked.includes(card));
  return [...picked, ...rest].slice(0, count).sort(byNewest);
}

/** ISO 문자열의 날짜부 (YYYY-MM-DD). 값이 없으면 null. */
export const formatHomeDate = (iso: string | null) =>
  iso ? iso.slice(0, 10) : null;
