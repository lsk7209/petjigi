/**
 * APMS(동물보호관리시스템) API 응답을 성공/실패/빈결과로 명확히 구분한다.
 *
 * 공공데이터포털 공통 오류 응답 규격에서 resultCode="00"은 정상, 그 외 코드는
 * 업무 오류다. 기존 ETL은 HTTP status만 확인하고 resultCode를 검사하지 않아,
 * HTTP 200이지만 업무 오류인 응답이나 body가 없는 응답을 total=0인 정상 완료로
 * 취급할 수 있었다(F11).
 */

const SUCCESS_RESULT_CODE = "00";

export interface ApmsRawResponse {
  httpOk: boolean;
  httpStatus: number;
  json: unknown;
}

export type ApmsParseResult<T = Record<string, unknown>> =
  | { kind: "ok"; items: T[]; totalCount: number }
  | { kind: "failed"; reason: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * HTTP 결과, JSON 구조, 업무 resultCode, body 존재 여부를 단계적으로 검증한다.
 * 하나라도 실패하면 kind:'failed'를 반환한다 — 호출자는 이를 정상 완료로 기록하면 안 된다.
 * 정상적인 빈 결과(total=0, resultCode="00")는 kind:'ok'로 items:[] 를 반환한다.
 */
export function parseApmsResponse<T = Record<string, unknown>>(
  raw: ApmsRawResponse
): ApmsParseResult<T> {
  if (!raw.httpOk) {
    return { kind: "failed", reason: `HTTP ${raw.httpStatus}` };
  }
  if (!isRecord(raw.json)) {
    return { kind: "failed", reason: "response body is not a JSON object" };
  }

  const response = raw.json.response;
  if (!isRecord(response)) {
    return { kind: "failed", reason: "missing response envelope" };
  }

  const header = response.header;
  const resultCode = isRecord(header) ? header.resultCode : undefined;
  if (resultCode !== SUCCESS_RESULT_CODE) {
    const resultMsg = isRecord(header) ? header.resultMsg : undefined;
    return {
      kind: "failed",
      reason: `resultCode=${String(resultCode ?? "missing")} ${resultMsg ? `(${resultMsg})` : ""}`.trim(),
    };
  }

  const body = response.body;
  if (!isRecord(body)) {
    return { kind: "failed", reason: "resultCode ok but body missing" };
  }

  const totalCount = typeof body.totalCount === "number" ? body.totalCount : 0;
  const itemsContainer = isRecord(body.items) ? body.items.item : body.items;
  const items: T[] =
    itemsContainer === undefined || itemsContainer === null || itemsContainer === ""
      ? []
      : Array.isArray(itemsContainer)
        ? (itemsContainer as T[])
        : [itemsContainer as T];

  return { kind: "ok", items, totalCount };
}
