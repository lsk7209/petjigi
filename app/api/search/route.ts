import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { businesses, contents, regions } from "@/db/schema";
import { like, or, and, eq, inArray } from "drizzle-orm";

// GET /api/search?q=검색어&type=business|guide
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = (searchParams.get("q") ?? "").trim();
  const type = searchParams.get("type"); // 'business' | 'guide' | null (전체)

  if (!q || q.length < 1) {
    return NextResponse.json(
      { error: "q 파라미터가 필요합니다." },
      {
        status: 400,
        headers: { "X-Robots-Tag": "noindex" },
      }
    );
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
          or(
            like(contents.title, pattern),
            like(contents.body, pattern)
          )
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

  return NextResponse.json(
    { q, total: trimmed.length, results: trimmed },
    {
      status: 200,
      headers: {
        "X-Robots-Tag": "noindex",
        "Cache-Control": "no-store",
      },
    }
  );
}
