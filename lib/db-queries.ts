import { unstable_cache } from "next/cache";
import { db } from "@/db/client";
import { businesses, contents, shelters, rescuedAnimals, regions } from "@/db/schema";
import { eq, and, desc, count, ne, lte } from "drizzle-orm";
import { sql } from "drizzle-orm";

// ── 홈 통계 카운트 ──────────────────────────────────────────────────────────
export const getCachedStats = unstable_cache(
  async () => {
    const [bizCount, shelterCount, rescuedCount] = await Promise.all([
      db.select({ count: count() }).from(businesses).where(eq(businesses.status, "active")).get(),
      db.select({ count: count() }).from(shelters).get(),
      db.select({ count: count() }).from(rescuedAnimals).get(),
    ]);
    return {
      businesses: bizCount?.count ?? 0,
      shelters: shelterCount?.count ?? 0,
      rescued: rescuedCount?.count ?? 0,
    };
  },
  ["stats"],
  { revalidate: 3600, tags: ["stats", "businesses", "rescue"] }
);

// ── 홈 최근 가이드 (6건) ─────────────────────────────────────────────────────
export const getCachedRecentGuides = unstable_cache(
  async () =>
    db
      .select({
        slug: contents.slug,
        title: contents.title,
        category: contents.category,
        publishedAt: contents.publishedAt,
      })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "guide"), lte(contents.publishedAt, new Date().toISOString())))
      .orderBy(desc(contents.publishedAt))
      .limit(6),
  ["guides", "recent"],
  { revalidate: 3600, tags: ["guides"] }
);

// ── 가이드 전체 목록 ──────────────────────────────────────────────────────────
export const getCachedAllGuides = unstable_cache(
  async () =>
    db
      .select({
        slug: contents.slug,
        title: contents.title,
        category: contents.category,
        publishedAt: contents.publishedAt,
        metaDescription: contents.metaDescription,
        ymyl: contents.ymyl,
      })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "guide"), lte(contents.publishedAt, new Date().toISOString())))
      .orderBy(desc(contents.publishedAt)),
  ["guides", "all"],
  { revalidate: 3600, tags: ["guides"] }
);

// ── 지역×업종 영업장 목록 ──────────────────────────────────────────────────────
// unstable_cache는 args를 자동으로 키에 포함시킴
export const getCachedBusinessListing = unstable_cache(
  async (sigunguName: string, type: string) =>
    db
      .select()
      .from(businesses)
      .where(
        and(
          eq(businesses.type, type),
          eq(businesses.addressSigungu, sigunguName),
          eq(businesses.status, "active")
        )
      )
      .orderBy(sql`CASE WHEN lat IS NOT NULL THEN 0 ELSE 1 END`)
      .limit(50),
  ["businesses", "listing"],
  { revalidate: 86400, tags: ["businesses"] }
);

// ── 영업장 상세 (type + name) ─────────────────────────────────────────────────
export const getCachedBusinessDetail = unstable_cache(
  async (type: string, name: string) =>
    db
      .select()
      .from(businesses)
      .where(
        and(
          eq(businesses.type, type),
          eq(businesses.name, name),
          ne(businesses.status, "closed")
        )
      )
      .get(),
  ["businesses", "detail"],
  { revalidate: 86400, tags: ["businesses"] }
);

// ── 지역 룩업 (sigunguSlug) ───────────────────────────────────────────────────
export const getCachedRegionBySlug = unstable_cache(
  async (sigunguSlug: string) =>
    db.select().from(regions).where(eq(regions.sigunguSlug, sigunguSlug)).get(),
  ["regions", "sigungu-slug"],
  { revalidate: 86400, tags: ["regions"] }
);

// ── 시도 지역 목록 (sidoSlug) ─────────────────────────────────────────────────
export const getCachedRegionsBySido = unstable_cache(
  async (sidoSlug: string) =>
    db.select().from(regions).where(eq(regions.sidoSlug, sidoSlug)),
  ["regions", "sido-slug"],
  { revalidate: 86400, tags: ["regions"] }
);

// ── 구조동물 목록 (최근 50건) ─────────────────────────────────────────────────
export const getCachedRescuedAnimals = unstable_cache(
  async () =>
    db
      .select()
      .from(rescuedAnimals)
      .orderBy(desc(rescuedAnimals.noticeSdt))
      .limit(50),
  ["rescue", "recent-list"],
  { revalidate: 3600, tags: ["rescue"] }
);

// ── 구조동물 상세 ─────────────────────────────────────────────────────────────
export const getCachedRescuedAnimal = unstable_cache(
  async (id: string) =>
    db.select().from(rescuedAnimals).where(eq(rescuedAnimals.id, id)).get(),
  ["rescue", "detail"],
  { revalidate: 3600, tags: ["rescue"] }
);

// ── 카테고리별 가이드 (최근 6건) ──────────────────────────────────────────────
export const getCachedCategoryGuides = unstable_cache(
  async (categoryId: number) =>
    db
      .select({ slug: contents.slug, title: contents.title, publishedAt: contents.publishedAt })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "guide"), eq(contents.category, categoryId), lte(contents.publishedAt, new Date().toISOString())))
      .orderBy(desc(contents.publishedAt))
      .limit(6),
  ["category-guides"],
  { revalidate: 3600, tags: ["guides"] }
);

// ── 최근 블로그 (홈용, 6건) ───────────────────────────────────────────────────
export const getCachedRecentBlogPosts = unstable_cache(
  async () =>
    db
      .select({
        slug: contents.slug,
        title: contents.title,
        subtitle: contents.subtitle,
        category: contents.category,
        publishedAt: contents.publishedAt,
      })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "blog"), lte(contents.publishedAt, new Date().toISOString())))
      .orderBy(desc(contents.publishedAt))
      .limit(6),
  ["blog", "recent-posts"],
  { revalidate: 3600, tags: ["guides"] }
);

// ── 블로그 전체 목록 ─────────────────────────────────────────────────────────
export const getCachedAllBlogPosts = unstable_cache(
  async () =>
    db
      .select({
        slug: contents.slug,
        title: contents.title,
        subtitle: contents.subtitle,
        category: contents.category,
        publishedAt: contents.publishedAt,
        metaDescription: contents.metaDescription,
        ymyl: contents.ymyl,
        authorName: contents.authorName,
      })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "blog"), lte(contents.publishedAt, new Date().toISOString())))
      .orderBy(desc(contents.publishedAt)),
  ["blog", "all-posts"],
  { revalidate: 3600, tags: ["guides"] }
);

// ── 보호센터 목록 (시군구별) ──────────────────────────────────────────────────
export const getCachedSheltersBySigungu = unstable_cache(
  async (sigunguName: string) =>
    db
      .select()
      .from(shelters)
      .where(eq(shelters.sigungu, sigunguName))
      .orderBy(shelters.name),
  ["shelters", "sigungu"],
  { revalidate: 86400, tags: ["shelters"] }
);

// ── 질병·증상 전체 목록 ──────────────────────────────────────────────────────
export const getCachedAllConditions = unstable_cache(
  async () =>
    db
      .select({
        slug: contents.slug,
        title: contents.title,
        category: contents.category,
        publishedAt: contents.publishedAt,
        metaDescription: contents.metaDescription,
      })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "condition"), lte(contents.publishedAt, new Date().toISOString())))
      .orderBy(desc(contents.publishedAt)),
  ["conditions", "all"],
  { revalidate: 3600, tags: ["guides"] }
);
