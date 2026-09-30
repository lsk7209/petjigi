/**
 * 여러 페이지로 나뉜 ETL 수집 실행의 전체 결과를 complete/partial/failed로 분류한다.
 *
 * 기존 코드는 total=0이면 곧바로 recordSuccessfulRun을 호출했고, 중간 페이지가
 * 짧아 break한 뒤에도 같은 성공 경로로 진행했다(F11). "완전 성공"은 예상 페이지
 * 수만큼 모두 ok로 끝난 경우에만 성립해야 하며, lastSuccessfulAt은 그 경우에만
 * 갱신해야 한다.
 */

export type PageOutcome =
  | { kind: "ok"; itemCount: number }
  | { kind: "failed"; reason: string };

export type EtlRunOutcome = "complete" | "partial" | "failed";

export interface EtlRunClassification {
  outcome: EtlRunOutcome;
  totalItems: number;
  pagesProcessed: number;
}

export interface ClassifyOptions {
  /** 첫 페이지 응답의 totalCount로부터 계산한 예상 페이지 수. */
  expectedPages: number;
}

/**
 * 페이지별 결과를 순서대로 검사한다.
 * - 페이지가 하나도 없으면 failed.
 * - 어떤 페이지든 kind:'failed'면 전체가 failed.
 * - 처리한 페이지 수가 expectedPages보다 적으면(중간에 예상보다 적은 아이템으로 끝난
 *   페이지가 있어 조기 종료됐다는 뜻) partial.
 * - 그 외(모든 페이지가 ok이고 예상 페이지 수만큼 처리됨)는 complete.
 */
export function classifyEtlRun(
  pages: PageOutcome[],
  options: ClassifyOptions
): EtlRunClassification {
  if (pages.length === 0) {
    return { outcome: "failed", totalItems: 0, pagesProcessed: 0 };
  }

  let totalItems = 0;
  for (const page of pages) {
    if (page.kind === "failed") {
      return { outcome: "failed", totalItems, pagesProcessed: pages.length };
    }
    totalItems += page.itemCount;
  }

  const outcome: EtlRunOutcome =
    pages.length >= options.expectedPages ? "complete" : "partial";

  return { outcome, totalItems, pagesProcessed: pages.length };
}
