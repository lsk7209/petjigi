import { and, eq, sql } from "drizzle-orm";
import { businesses } from "@/db/schema";
import { businessSidoMatchSql } from "@/lib/listing-identity";

export function businessSidoCondition(sido: string) {
  return sql`EXISTS (SELECT 1 FROM (SELECT ${sido} AS sido) scope_region WHERE ${sql.raw(businessSidoMatchSql("businesses", "scope_region.sido"))})`;
}

/** 확정된 시도는 반드시 함께 조회한다. 모호한 URL의 기존 합산 화면은 null로 명시한다. */
export function businessRegionCondition(sigungu: string, sido: string | null = null) {
  return and(
    eq(businesses.addressSigungu, sigungu),
    sido ? businessSidoCondition(sido) : undefined,
  );
}
