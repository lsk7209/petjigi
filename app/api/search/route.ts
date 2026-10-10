import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { businesses, contents, regions } from "@/db/schema";
import { or, and, eq, inArray } from "drizzle-orm";
import { likeEscaped } from "@/lib/search-sql";
import { publicContentCondition } from "@/lib/content-publication-sql";
import { isPublicContentType } from "@/lib/content-publication";
import { buildContentHref, buildBusinessHref, buildUniqueRegionSlugMap } from "@/lib/search-contract";
import {
  setBoundedSearchCache,
  isSupportedSearchType,
  isValidSearchQueryLength,
  likeLiteralPattern,
  SEARCH_MAX_QUERY_LENGTH,
  SEARCH_RESULT_LIMIT,
} from "@/lib/search-query";

// 모듈 레벨 인메모리 캐시 (동일 쿼리 60초 내 중복 스캔 방지)
interface CacheEntry { data: unknown; expires: number }
const SEARCH_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60_000;

// GET /api/search?q=검색어&type=business|guide
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = (searchParams.get("q") ?? "").trim();
  const type = searchParams.get("type"); // 'business' | 'guide' | null (전체)

  if (!isSupportedSearchType(type)) {
    return NextResponse.json(
      { error: "지원하지 않는 type 파라미터입니다." },
      { status: 400, headers: { "X-Robots-Tag": "noindex" } }
    );
  }

  if (!isValidSearchQueryLength(q)) {
    return NextResponse.json(
      { error: `검색어는 2자 이상 ${SEARCH_MAX_QUERY_LENGTH}자 이하로 입력해주세요.` },
      { status: 400, headers: { "X-Robots-Tag": "noindex" } }
    );
  }

  // 캐시 히트 확인
  const cacheKey = `${q}::${type ?? "all"}`;
  const cached = SEARCH_CACHE.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json(cached.data, {
      status: 200,
      headers: { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" },
    });
  }

  const pattern = likeLiteralPattern(q);

  const results: {
    type: "business" | "guide" | "blog" | "condition";
    slug: string | null;
    name: string;
    category: number | null;
    href: string;
    address?: string;
  }[] = [];

  let responseData: { q: string; returnedCount: number; hasMore: boolean; results: typeof results };

  try {
    // ── 사업장(businesses) 검색 ────────────────────────────────────────────
    let bizHasMore = false;
    if (!type || type === "business") {
      const bizLimit = type === "business" ? SEARCH_RESULT_LIMIT : Math.ceil(SEARCH_RESULT_LIMIT / 2);
      const bizRows = await db
        .select({
          id: businesses.id,
          name: businesses.name,
          address: businesses.address,
          addressSigungu: businesses.addressSigungu,
          category: businesses.category,
          type: businesses.type,
        })
        .from(businesses)
        .where(
          and(
            eq(businesses.status, "active"),
            or(likeEscaped(businesses.name, pattern), likeEscaped(businesses.address, pattern))
          )
        )
        .orderBy(businesses.name, businesses.id)
        .limit(bizLimit + 1);

      bizHasMore = bizRows.length > bizLimit;
      const bizPage = bizRows.slice(0, bizLimit);

      const sigunguNames = [...new Set(bizPage.map((r) => r.addressSigungu).filter(Boolean))] as string[];
      let regionMap = new Map<string, string>();
      if (sigunguNames.length > 0) {
        const regionRows = await db
          .select({ sigungu: regions.sigungu, sigunguSlug: regions.sigunguSlug })
          .from(regions)
          .where(inArray(regions.sigungu, sigunguNames));
        regionMap = buildUniqueRegionSlugMap(regionRows);
      }

      for (const row of bizPage) {
        const sigunguSlug = row.addressSigungu ? regionMap.get(row.addressSigungu) : undefined;
        const href = buildBusinessHref({ bizType: row.type, sigunguSlug, name: row.name });
        // 지역이 모호하거나 미해결이면 잘못된 상세 URL이나 "#" 링크를 만들지 않고 결과에서 제외한다.
        if (!href) continue;
        results.push({
          type: "business",
          slug: encodeURIComponent(row.name),
          name: row.name,
          category: row.category,
          href,
          address: row.address,
        });
      }
    }

    // ── 콘텐츠(contents: guide/blog/condition) 검색 ───────────────────────
    let contentHasMore = false;
    if (!type || type === "guide") {
      const contentLimit = type === "guide" ? SEARCH_RESULT_LIMIT : Math.ceil(SEARCH_RESULT_LIMIT / 2);
      const contentRows = await db
        .select({
          slug: contents.slug,
          title: contents.title,
          category: contents.category,
          type: contents.type,
          publishedAt: contents.publishedAt,
        })
        .from(contents)
        .where(
          and(publicContentCondition(), likeEscaped(contents.title, pattern))
        )
        .orderBy(contents.publishedAt, contents.id)
        .limit(contentLimit + 1);

      contentHasMore = contentRows.length > contentLimit;
      const contentPage = contentRows.slice(0, contentLimit);

      for (const row of contentPage) {
        // 알려지지 않은 타입은 guide로 임의 연결하지 않고 결과에서 제외한다.
        if (!isPublicContentType(row.type)) continue;
        const href = buildContentHref(row.type, row.slug);
        if (!href) continue;
        results.push({
          type: row.type,
          slug: row.slug,
          name: row.title,
          category: row.category,
          href,
        });
      }
    }

    const trimmed = results.slice(0, SEARCH_RESULT_LIMIT);
    responseData = {
      q,
      returnedCount: trimmed.length,
      hasMore: bizHasMore || contentHasMore || results.length > SEARCH_RESULT_LIMIT,
      results: trimmed,
    };
  } catch (err) {
    console.error("[search] DB 조회 오류:", err);
    return NextResponse.json(
      { error: "검색 처리 중 오류가 발생했습니다." },
      { status: 503, headers: { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" } }
    );
  }

  // 캐시 저장 — 삽입 후에도 hard cap(500)을 넘지 않는다.
  const cachedAt = Date.now();
  setBoundedSearchCache(SEARCH_CACHE, cacheKey, { data: responseData, expires: cachedAt + CACHE_TTL_MS }, cachedAt);

  return NextResponse.json(responseData, {
    status: 200,
    headers: {
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store",
    },
  });
}
