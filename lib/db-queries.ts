import { unstable_cache } from "next/cache";
import { db } from "@/db/client";
import { businesses, contents, shelters, rescuedAnimals, regions, etlSyncState } from "@/db/schema";
import { eq, and, asc, desc, count, ne, lte } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { DEFAULT_BUSINESS_PAGE_SIZE, getPageWindow } from "@/lib/business-listing";
import { describeRegionSlug, resolveRegionIdentity } from "@/lib/region-identity";

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
        reviewerName: contents.reviewerName,
        reviewedAt: contents.reviewedAt,
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
  async (sigunguName: string, type: string, requestedPage = 1) => {
    const where = and(
      eq(businesses.type, type),
      eq(businesses.addressSigungu, sigunguName),
      eq(businesses.status, "active")
    );
    const totalRow = await db
      .select({
        count: count(),
        sourceAsOf: sql<string | null>`max(${businesses.lastSyncedAt})`,
      })
      .from(businesses)
      .where(where)
      .get();
    const totalCount = totalRow?.count ?? 0;
    const pageWindow = getPageWindow(totalCount, requestedPage, DEFAULT_BUSINESS_PAGE_SIZE);
    const items = await db
      .select()
      .from(businesses)
      .where(where)
      .orderBy(
        sql`CASE WHEN ${businesses.lat} IS NOT NULL THEN 0 ELSE 1 END`,
        asc(businesses.name),
        asc(businesses.id)
      )
      .limit(pageWindow.pageSize)
      .offset(pageWindow.offset);

    return { items, totalCount, sourceAsOf: totalRow?.sourceAsOf ?? null, ...pageWindow };
  },
  ["businesses", "listing"],
  { revalidate: 86400, tags: ["businesses"] }
);

// ── 업종 전체의 가장 최근 업체 정보 갱신일 (지역 0건이 수집 전인지 판별) ────────
export const getCachedTypeSourceAsOf = unstable_cache(
  async (type: string) => {
    const row = await db
      .select({ asOf: sql<string | null>`max(${businesses.lastSyncedAt})` })
      .from(businesses)
      .where(and(eq(businesses.type, type), eq(businesses.status, "active")))
      .get();
    return row?.asOf ?? null;
  },
  ["businesses", "type-as-of"],
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
// sigunguSlug는 UNIQUE가 아니다 (서울/부산 강서구 등 여러 시도가 같은 slug를 공유할 수
// 있음 — db/seeds/regions.ts 참고). 임의로 첫 행만 반환하면 다른 시도의 데이터가 섞일
// 수 있으므로, 모든 후보를 반환하고 호출자가 lib/region-identity.ts의
// resolveRegionIdentity로 resolved/ambiguous/missing을 구분하게 한다.
export const getCachedRegionCandidatesBySlug = unstable_cache(
  async (sigunguSlug: string) =>
    db.select().from(regions).where(eq(regions.sigunguSlug, sigunguSlug)),
  ["regions", "sigungu-slug-candidates"],
  { revalidate: 86400, tags: ["regions"] }
);

/** @deprecated 모호한 slug에서 첫 행만 반환한다. 새 호출부는 getCachedRegionCandidatesBySlug + resolveRegionIdentity를 사용할 것. */
export const getCachedRegionBySlug = unstable_cache(
  async (sigunguSlug: string) =>
    db.select().from(regions).where(eq(regions.sigunguSlug, sigunguSlug)).get(),
  ["regions", "sigungu-slug"],
  { revalidate: 86400, tags: ["regions"] }
);

/**
 * slug가 여러 시도에 걸쳐 모호하면(서울/부산 강서구 등) undefined를 반환해 호출자가
 * 이미 갖고 있는 안전한 폴백(예: `region?.sigungu ?? sigunguSlug`)으로 흘러가게 한다.
 * 이는 URL 구조를 바꾸지 않는 최소 통합이다 — 시도 접두 slug 등으로 충돌을 실제
 * 구분하는 것은 별도 승인 대상(docs 8.2)이므로 여기서 다루지 않는다.
 */
export async function getCachedRegionSlugView(sigunguSlug: string) {
  return describeRegionSlug(resolveRegionIdentity(await getCachedRegionCandidatesBySlug(sigunguSlug)));
}

export async function getCachedResolvedRegion(sigunguSlug: string) {
  const candidates = await getCachedRegionCandidatesBySlug(sigunguSlug);
  const resolution = resolveRegionIdentity(candidates);
  return resolution.kind === "resolved" ? resolution.region : undefined;
}

// ── 시도 지역 목록 (sidoSlug) ─────────────────────────────────────────────────
export const getCachedRegionsBySido = unstable_cache(
  async (sidoSlug: string) =>
    db.select().from(regions).where(eq(regions.sidoSlug, sidoSlug)),
  ["regions", "sido-slug"],
  { revalidate: 86400, tags: ["regions"] }
);

// ── 구조동물 목록 (최근 50건) ─────────────────────────────────────────────────
export const getCachedRescuedAnimals = unstable_cache(
  async () => {
    const [items, freshness] = await Promise.all([
      db
      .select()
      .from(rescuedAnimals)
      .orderBy(desc(rescuedAnimals.noticeSdt))
      .limit(50),
      db
        .select({
          lastAttemptAt: etlSyncState.lastAttemptAt,
          lastSuccessfulAt: etlSyncState.lastSuccessfulAt,
        })
        .from(etlSyncState)
        .where(eq(etlSyncState.jobName, "rescued-animals"))
        .get(),
    ]);
    return {
      items,
      lastAttemptAt: freshness?.lastAttemptAt ?? null,
      lastSuccessfulAt: freshness?.lastSuccessfulAt ?? null,
    };
  },
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

// ── 카테고리별 블로그 (카테고리 허브용, 4건) ─────────────────────────────────
export const getCachedCategoryBlogPosts = unstable_cache(
  async (categoryId: number) =>
    db
      .select({ slug: contents.slug, title: contents.title, subtitle: contents.subtitle, publishedAt: contents.publishedAt })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "blog"), eq(contents.category, categoryId), lte(contents.publishedAt, new Date().toISOString())))
      .orderBy(desc(contents.publishedAt))
      .limit(4),
  ["category-blog"],
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
        reviewerName: contents.reviewerName,
        reviewedAt: contents.reviewedAt,
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
        reviewerName: contents.reviewerName,
        reviewedAt: contents.reviewedAt,
      })
      .from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "condition"), lte(contents.publishedAt, new Date().toISOString())))
      .orderBy(desc(contents.publishedAt)),
  ["conditions", "all"],
  { revalidate: 3600, tags: ["guides"] }
);
