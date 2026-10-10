/**
 * 등록대행기관 API 수집 완전성 판정 (순수 함수 — 외부 호출·DB 없음).
 * HTTP 200 / resultCode "00"만으로는 "전체를 받았다"고 말할 수 없으므로,
 * 총계·페이지별 행 수·페이지 중복을 대조해 입증된 경우에만 complete로 판정한다.
 */

import { createHash } from "node:crypto";

export const DEFAULT_PAGE_SIZE = 1000;

export interface ParsedPage {
  total: number;
  items: unknown[];
}

export interface PageSnapshot {
  pageNo: number;
  /** 해당 응답이 보고한 totalCount (수집 중 변동 감지용) */
  reportedTotal: number;
  rawCount: number;
  /** 페이지 원문 행들의 해시 (같은 페이지 반복 수신 감지용) */
  fingerprint: string;
}

export interface RowStats {
  rawRows: number;
  convertedRows: number;
  skippedRows: number;
  uniqueIds: number;
}

export interface CollectionAssessment {
  complete: boolean;
  /** 완전 수집이 입증되지 않은 이유. complete면 비어 있다. */
  reasons: string[];
  /** 누락 기관의 상태 변경을 허용할지. 완전 수집 + 변환 제외 0건 + 변환된 기관 1건 이상일 때만 true */
  mayMarkUnseen: boolean;
  /** complete이지만 상태 변경을 보류하는 이유 */
  unseenBlockedReason?: string;
}

const isNonNegativeInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= 0;

/** data.go.kr JSON 응답 본문을 검증해 총계와 행 배열로 변환한다. 구조가 다르면 throw. */
export function parseRegistrationAgentPage(json: unknown): ParsedPage {
  const response = (
    json as {
      response?: {
        header?: { resultCode?: string; resultMsg?: string };
        body?: unknown;
      };
    }
  )?.response;
  if (!response || typeof response !== "object")
    throw new Error("등록대행 API 응답 구조 오류: response 없음");
  if (response.header?.resultCode !== "00")
    throw new Error(
      `등록대행 API 오류: ${response.header?.resultMsg ?? "resultCode 없음"}`,
    );
  const body = response.body as
    { totalCount?: unknown; items?: unknown } | undefined;
  if (!body || typeof body !== "object")
    throw new Error("등록대행 API 응답 구조 오류: body 없음");
  const total = Number(body.totalCount);
  if (
    body.totalCount === undefined ||
    body.totalCount === "" ||
    !isNonNegativeInteger(total)
  ) {
    throw new Error(`등록대행 API 총계 무효: ${String(body.totalCount)}`);
  }
  return { total, items: extractItems(body.items) };
}

function extractItems(items: unknown): unknown[] {
  // 0건이면 data.go.kr은 items를 빈 문자열로 준다
  if (items === undefined || items === null || items === "") return [];
  if (typeof items !== "object")
    throw new Error("등록대행 API 응답 구조 오류: items 형식");
  const item = (items as { item?: unknown }).item;
  if (item === undefined || item === null) return [];
  return Array.isArray(item) ? item : [item];
}

export function fingerprintPage(items: unknown[]): string {
  return createHash("sha256").update(JSON.stringify(items)).digest("hex");
}

export function expectedRowsOnPage(
  pageNo: number,
  total: number,
  pageSize: number,
): number {
  return Math.max(0, Math.min(pageSize, total - (pageNo - 1) * pageSize));
}

export function assessCollection(
  total: number,
  pageSize: number,
  pages: PageSnapshot[],
  stats: RowStats,
): CollectionAssessment {
  const reasons: string[] = [];
  if (!isNonNegativeInteger(total)) {
    reasons.push(`원본 총계가 유효하지 않음(${String(total)})`);
    return { complete: false, reasons, mayMarkUnseen: false };
  }

  const expectedPages = Math.ceil(total / pageSize);
  const pageNos = pages.map((p) => p.pageNo).sort((a, b) => a - b);
  if (
    pageNos.length !== expectedPages ||
    pageNos.some((no, i) => no !== i + 1)
  ) {
    reasons.push(`수신 페이지 ${pageNos.length}개 ≠ 기대 ${expectedPages}개`);
  }
  for (const page of pages) {
    if (page.reportedTotal !== total)
      reasons.push(
        `페이지 ${page.pageNo}: 수집 중 총계 변동(${total}→${page.reportedTotal})`,
      );
    const expected = expectedRowsOnPage(page.pageNo, total, pageSize);
    if (page.rawCount !== expected)
      reasons.push(
        `페이지 ${page.pageNo}: 수신 ${page.rawCount}행 ≠ 기대 ${expected}행`,
      );
  }
  if (new Set(pages.map((p) => p.fingerprint)).size !== pages.length)
    reasons.push("같은 내용의 페이지가 반복 수신됨");
  if (stats.rawRows !== total)
    reasons.push(`수신 원본 ${stats.rawRows}행 ≠ 원본 총계 ${total}건`);
  if (stats.convertedRows + stats.skippedRows !== stats.rawRows)
    reasons.push("변환 성공·제외 합계가 수신 행 수와 불일치");

  const complete = reasons.length === 0;
  if (!complete) return { complete, reasons, mayMarkUnseen: false };
  // 변환 제외 행이 있으면 어떤 기존 기관이 그 행에 해당하는지 알 수 없다
  if (stats.skippedRows > 0) {
    return { complete, reasons, mayMarkUnseen: false, unseenBlockedReason: `변환 제외 ${stats.skippedRows}행 — 누락 기관 판정 불가` };
  }
  // 정상적으로 0건을 받았어도 기존 기관을 자동으로 정리하지 않는다
  if (stats.uniqueIds === 0) return { complete, reasons, mayMarkUnseen: false, unseenBlockedReason: "변환된 기관 0건" };
  return { complete, reasons, mayMarkUnseen: true };
}
