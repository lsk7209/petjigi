// 업체 상세의 '데이터 범위' 안내. 공공데이터에 값이 있는지만 말하고,
// 전화·방문 확인을 하지 않은 항목을 검증된 것처럼 표현하지 않는다.

export interface CoverageInput {
  source: string;
  address: string | null;
  phone: string | null;
  lat: number | null;
  lng: number | null;
  licenseDate: string | null;
}

export interface DataCoverage {
  provider: string;
  registered: string[];
  notProvided: string[];
}

const MOIS_SOURCE_PREFIX = "mois_";
const LOCALDATA_SOURCE_PREFIX = "localdata";

/** 공개 데이터에 없거나 펫지기가 확인하지 않은 항목 — 이용 전 업체에 직접 문의가 필요하다. */
const NOT_PROVIDED = [
  "현재 영업 여부와 영업시간",
  "진료·서비스 가능 범위와 비용",
  "전화번호·주소의 실제 일치 여부(펫지기는 전화·방문 확인을 하지 않았습니다)",
];

export function sourceProvider(source: string): string {
  if (source.startsWith(MOIS_SOURCE_PREFIX))
    return "행정안전부 공공데이터(공공데이터포털 제공)";
  if (source.startsWith(LOCALDATA_SOURCE_PREFIX))
    return "지방행정 인허가 데이터(LOCALDATA, 공공데이터포털 제공)";
  return "공공데이터포털에서 수집한 공공데이터";
}

export function describeDataCoverage(b: CoverageInput): DataCoverage {
  const registered: string[] = [];
  if (b.address) registered.push("주소");
  if (b.phone) registered.push("전화번호");
  if (b.lat !== null && b.lng !== null) registered.push("좌표(지도 위치)");
  if (b.licenseDate) registered.push("허가일");
  return {
    provider: sourceProvider(b.source),
    registered,
    notProvided: NOT_PROVIDED,
  };
}
