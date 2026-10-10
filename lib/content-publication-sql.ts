import { and, eq, inArray, sql, type SQL } from "drizzle-orm";
import { contents } from "@/db/schema";
import { PUBLIC_CONTENT_TYPES, type PublicContentType } from "./content-publication";

/**
 * isPubliclyVisibleContent의 SQL 버전 — 모든 노출 경로가 같은 조건을 LIMIT 이전에 적용한다.
 * publishedAt은 julianday로 해석해 형식이 달라도(오프셋 포함) 시각 비교가 정확하고,
 * 파싱 불가·NULL 값은 비공개로 취급한다.
 */
export function publicContentCondition(type?: PublicContentType, now: Date = new Date()): SQL {
  const nowIso = now.toISOString();
  const typeCondition = type
    ? eq(contents.type, type)
    : inArray(contents.type, [...PUBLIC_CONTENT_TYPES]);
  return and(
    eq(contents.status, "published"),
    typeCondition,
    sql`julianday(${contents.publishedAt}) IS NOT NULL AND julianday(${contents.publishedAt}) <= julianday(${nowIso})`,
  ) as SQL;
}
