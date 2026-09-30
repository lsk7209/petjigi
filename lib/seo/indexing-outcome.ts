/**
 * Google Indexing API 배치 전송 결과를 accepted/failed로 정확히 구분한다.
 *
 * 기존 notifyGoogleBatch는 fetch가 예외 없이 resolve되면(즉 401/429/500이어도)
 * sent++를 했다(F13). HTTP 성공(2xx)만 accepted로 세고, 그 외 상태 코드나
 * 네트워크 오류는 failed로 센다.
 */

export interface IndexingResponseLike {
  url: string;
  status: number | null;
  error?: string;
}

export interface IndexingOutcomeSummary {
  accepted: number;
  failed: number;
  failedUrls: string[];
}

export function classifyIndexingResponses(
  responses: IndexingResponseLike[]
): IndexingOutcomeSummary {
  let accepted = 0;
  let failed = 0;
  const failedUrls: string[] = [];

  for (const r of responses) {
    const isHttpSuccess = typeof r.status === "number" && r.status >= 200 && r.status < 300;
    if (isHttpSuccess) {
      accepted++;
    } else {
      failed++;
      failedUrls.push(r.url);
    }
  }

  return { accepted, failed, failedUrls };
}
