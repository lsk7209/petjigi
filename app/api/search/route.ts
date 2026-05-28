import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { businesses, contents, regions } from "@/db/schema";
import { like, or, and, eq, inArray } from "drizzle-orm";

// 모듈 레벨 인메모리 캐시 (동일 쿼리 60초 내 중복 스캔 방지)
interface CacheEntry { data: unknown; expires: number }
const SEARCH_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60_000;

// GET /api/search?q=검색어&type=business|guide
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = (searchParams.get("q") ?? "").trim();
  const type = searchParams.get("type"); // 'business' | 'guide' | null (전체)

  if (!q || q.length < 2) {
    return NextResponse.json(
      { error: "검색어는 2자 이상 입력해주세요." },
      {
        status: 400,
        headers: { "X-Robots-Tag": "noindex" },
      }
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

  const pattern = `%${q}%`;
  const results: {
    type: "business" | "guide";
    slug: string | null;
    name: string;
    category: number | null;
    address?: string;
    bizType?: string;
    sigunguSlug?: string;
  }[] = [];

  // ── 사업장(businesses) 검색 ──────────────────────────────────────────────
  if (!type || type === "business") {
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
          or(
            like(businesses.name, pattern),
            like(businesses.address, pattern)
          )
        )
      )
      .limit(type === "business" ? 20 : 10);

    const sigunguNames = [...new Set(bizRows.map((r) => r.addressSigungu).filter(Boolean))] as string[];
    const regionMap = new Map<string, string>();
    if (sigunguNames.length > 0) {
      const regionRows = await db
        .select({ sigungu: regions.sigungu, sigunguSlug: regions.sigunguSlug })
        .from(regions)
        .where(inArray(regions.sigungu, sigunguNames));
      for (const r of regionRows) regionMap.set(r.sigungu, r.sigunguSlug);
    }

    for (const row of bizRows) {
      results.push({
        type: "business",
        slug: encodeURIComponent(row.name),
        name: row.name,
        category: row.category,
        address: row.address,
        bizType: row.type,
        sigunguSlug: row.addressSigungu ? regionMap.get(row.addressSigungu) : undefined,
      });
    }
  }

  // ── 가이드(contents) 검색 ─────────────────────────────────────────────────
  if (!type || type === "guide") {
    const guideRows = await db
      .select({
        slug: contents.slug,
        title: contents.title,
        category: contents.category,
      })
      .from(contents)
      .where(
        and(
          eq(contents.status, "published"),
          like(contents.title, pattern)
        )
      )
      .limit(type === "guide" ? 20 : 10);

    for (const row of guideRows) {
      results.push({
        type: "guide",
        slug: row.slug,
        name: row.title,
        category: row.category,
      });
    }
  }

  // 총 최대 20개 트리밍
  const trimmed = results.slice(0, 20);
  const responseData = { q, total: trimmed.length, results: trimmed };

  // 캐시 저장 (오래된 엔트리 주기적 정리)
  if (SEARCH_CACHE.size > 500) {
    const now = Date.now();
    for (const [k, v] of SEARCH_CACHE) {
      if (v.expires < now) SEARCH_CACHE.delete(k);
    }
  }
  SEARCH_CACHE.set(cacheKey, { data: responseData, expires: Date.now() + CACHE_TTL_MS });

  return NextResponse.json(responseData, {
    status: 200,
    headers: {
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store",
    },
  });
}
