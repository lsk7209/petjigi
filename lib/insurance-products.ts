export const INSURANCE_INFORMATION_CHECKED_AT = "2026-09-12";

export type InsuranceProductEvidence = {
  slug: string;
  insurer: string;
  product: string | null;
  channel: string;
  status: "confirmed" | "unverified";
  confirmedFacts: string[];
  officialUrl: string | null;
  note: string;
};

/**
 * 보험 상품은 개정·판매 중단·채널별 차이가 잦다. 이 목록에는 공식 페이지에서
 * 확인한 최소 사실만 기록하고, 보험료나 우열·추천 결과는 저장하지 않는다.
 */
export const INSURANCE_PRODUCT_EVIDENCE: InsuranceProductEvidence[] = [
  {
    slug: "hyundai",
    insurer: "현대해상",
    product: "굿앤굿우리펫보험",
    channel: "공식 온라인 상품 페이지",
    status: "confirmed",
    confirmedFacts: ["반려견 가입 연령: 생후 61일~만 8세", "과거 질병·상해 이력 등에 따라 가입이 제한될 수 있음"],
    officialUrl: "https://platform.hi.co.kr/service.do?m=78ee531539&petType=D",
    note: "보장과 보험료는 가입 시점의 설계 결과와 약관을 확인해야 합니다.",
  },
  {
    slug: "db",
    insurer: "DB손해보험",
    product: "펫블리 반려동물 의료비보험",
    channel: "TM·CM 등 채널별 공시",
    status: "confirmed",
    confirmedFacts: ["반려견·반려묘 및 판매 채널에 따라 공시 상품명이 다름"],
    officialUrl: "https://www.idbins.com/pc/bizxpress/pb/ppb/app/FWMAIV1544.shtm",
    note: "현재 판매 상품과 세부 조건은 공식 상품공시에서 다시 선택해 확인해야 합니다.",
  },
  {
    slug: "kb",
    insurer: "KB손해보험",
    product: "KB 금쪽같은 펫보험",
    channel: "공식 상품공시",
    status: "confirmed",
    confirmedFacts: ["반려견·반려묘 및 다이렉트·재가입용 등 채널과 계약 유형별 상품이 구분됨"],
    officialUrl: "https://www.kbinsure.co.kr/CG803000012.ec",
    note: "가입 가능 여부와 보험료는 인수 심사와 가입 조건에 따라 달라집니다.",
  },
  {
    slug: "samsung",
    insurer: "삼성화재",
    product: "애니펫",
    channel: "공식 상품 페이지",
    status: "confirmed",
    confirmedFacts: ["공식 페이지에 자기부담금·보상비율·대기기간·가입 연령 조건이 명시됨"],
    officialUrl: "https://www.samsungfire.com/product/P_P02_09_01_124.html",
    note: "조건은 반려동물 종류와 선택 계약에 따라 달라질 수 있으므로 원문을 확인해야 합니다.",
  },
  {
    slug: "hanwha",
    insurer: "한화손해보험",
    product: null,
    channel: "현재 공식 판매 페이지 미확인",
    status: "unverified",
    confirmedFacts: [],
    officialUrl: null,
    note: "현재 판매 중인 펫보험 상품을 공식 채널에서 확인하지 못해 상품명·보장·추천 정보를 제공하지 않습니다.",
  },
  {
    slug: "meritz",
    insurer: "메리츠화재",
    product: "펫퍼민트",
    channel: "공식 다이렉트 상품 페이지",
    status: "confirmed",
    confirmedFacts: ["상품 개정과 선택 조건에 따라 보장 내용이 달라짐", "다이렉트 채널 할인 표현에는 적용 조건이 있음"],
    officialUrl: "https://store.meritzfire.com/pet/product.do",
    note: "할인율과 보험료는 계약 조건별로 달라지므로 실제 설계 결과를 확인해야 합니다.",
  },
];

export function getInsuranceProductEvidence(slug: string) {
  return INSURANCE_PRODUCT_EVIDENCE.find((item) => item.slug === slug);
}
