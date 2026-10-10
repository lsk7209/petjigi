/**
 * 외부 알림(GSC 사이트맵·IndexNow)의 실제 성공 여부를 서비스별로 구분한다.
 * 'Promise.allSettled가 끝났다'나 'fetch가 resolve됐다'를 성공으로 취급하지 않는다.
 * 알림 실패는 배포 실패와 별개이며(이미 배포된 뒤의 부가 작업) 호출 워크플로가 따로 표시한다.
 */
export type NotifyStatus =
  "success" | "failed" | "not_configured" | "no_targets";

export interface NotifyOutcome {
  service: string;
  status: NotifyStatus;
  detail?: string;
}

export function outcomeFromHttp(
  service: string,
  httpStatus: number,
): NotifyOutcome {
  const ok = httpStatus >= 200 && httpStatus < 300;
  return {
    service,
    status: ok ? "success" : "failed",
    detail: `HTTP ${httpStatus}`,
  };
}

export function outcomeFromError(
  service: string,
  error: unknown,
): NotifyOutcome {
  return {
    service,
    status: "failed",
    detail: error instanceof Error ? error.message : String(error),
  };
}

export interface NotifySummary {
  overall: NotifyStatus;
  failed: number;
  lines: string[];
  exitCode: 0 | 1;
}

export function summarizeOutcomes(outcomes: NotifyOutcome[]): NotifySummary {
  const failed = outcomes.filter((o) => o.status === "failed").length;
  const any = (s: NotifyStatus) => outcomes.some((o) => o.status === s);
  const overall: NotifyStatus =
    failed > 0
      ? "failed"
      : any("success")
        ? "success"
        : any("not_configured")
          ? "not_configured"
          : "no_targets";
  return {
    overall,
    failed,
    lines: outcomes.map(
      (o) => `${o.service}: ${o.status}${o.detail ? ` (${o.detail})` : ""}`,
    ),
    exitCode: failed > 0 ? 1 : 0,
  };
}
