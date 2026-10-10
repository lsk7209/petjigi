/**
 * 업체 상태 표현의 단일 출처. 목록·상세·FAQ가 같은 기관을 같은 의미로 안내하도록 한다.
 * DB status='active'는 업종마다 증거 수준이 다르다 — 등록대행기관 원본(검역본부)은 영업 상태 필드가 없고
 * "등록되어 있다"만 알려 주므로 '영업 중'으로 읽으면 안 된다.
 */

export type StatusBasis =
  | "operating_confirmed" // 원본이 활성 영업 상태를 제공하고 active로 확인됨
  | "registered_only" // 원본에는 등록 사실만 있음
  | "not_in_source" // 최근 수집 원본에서 확인되지 않음 (폐업 여부는 알 수 없음)
  | "status_unverified"; // 상태 확인 필요

/** 원본에 영업 상태 정보가 없어 '영업 중'으로 안내할 수 없는 업종 */
const STATUS_NOT_PROVIDED_TYPES = new Set(["registration"]);

export function statusBasis(type: string, status: string): StatusBasis {
  if (STATUS_NOT_PROVIDED_TYPES.has(type)) return status === "active" ? "registered_only" : "not_in_source";
  return status === "active" ? "operating_confirmed" : "status_unverified";
}

export function listingScopeWording(type: string): string {
  return STATUS_NOT_PROVIDED_TYPES.has(type)
    ? "공공데이터에 등록된 업체(영업 여부는 원본에 없어 확인되지 않음)"
    : "공공데이터 기준 영업 중인 업체";
}

/** 상세 페이지 '지역 현황' 한 문장 */
export function regionCountSentence(type: string, location: string, typeLabel: string, count: number): string {
  return STATUS_NOT_PROVIDED_TYPES.has(type)
    ? `${location}에는 공공데이터에 등록된 ${typeLabel}가 ${count}개 있습니다. 영업 여부는 원본에 없어 확인되지 않습니다.`
    : `${location} 지역에는 현재 ${count}개의 ${typeLabel}가 운영 중입니다.`;
}

/** 지역 목록 FAQ '몇 곳이나 있나요' 답변 */
export function faqCountAnswer(type: string, location: string, typeLabel: string, count: number): string {
  if (count === 0) {
    return `공공데이터에서 ${location}의 ${typeLabel}은 확인되지 않았습니다. 실제 영업 여부와 다를 수 있으니 관할 시·군·구청이나 인근 지역에서 확인해 주세요.`;
  }
  return STATUS_NOT_PROVIDED_TYPES.has(type)
    ? `공공데이터 기준으로 ${location}에는 ${typeLabel} ${count}곳이 등록되어 있습니다. 영업 여부는 원본에 없으므로 방문 전 확인이 필요합니다.`
    : `공공데이터 기준으로 ${location}에는 현재 영업 중인 ${typeLabel} ${count}곳이 등록되어 있습니다.`;
}

/** 이 기관 자체의 상태 안내(상세 상단). 근거가 약한 경우에만 문구를 반환한다. */
export function businessStatusNotice(type: string, status: string): string | null {
  switch (statusBasis(type, status)) {
    case "registered_only":
      return "공공데이터에 등록된 기관입니다. 영업 여부는 원본에 없어 확인되지 않으니 방문 전 확인해 주세요.";
    case "not_in_source":
      return "최근 공공데이터 수집에서 확인되지 않은 기관입니다. 폐업 여부는 확인되지 않았으니 방문 전 확인해 주세요.";
    case "status_unverified":
      return "현재 상태 확인이 필요한 업체입니다. 방문 전 확인해 주세요.";
    case "operating_confirmed":
      return null;
  }
}
