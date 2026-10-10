// 기존 블로그 글에 붙이는 실용 도구 데이터. 가격·진료 가능 종·24시간 진료 여부 등
// 개별 사실은 만들지 않고, 사용자가 직접 확인할 항목만 제공한다.

export interface ToolLink {
  name: string;
  href: string;
}

export interface ChecklistGroup {
  heading: string;
  items: readonly string[];
}

export interface ChecklistTool {
  kind: "checklist";
  title: string;
  intro: string;
  groups: readonly ChecklistGroup[];
  /** 후보를 같은 항목으로 나란히 적는 비교표(빈칸). */
  compareRows?: readonly string[];
  links: readonly ToolLink[];
  note: string;
}

export interface InsuranceSheetTool {
  kind: "insurance-sheet";
  title: string;
  intro: string;
  rows: readonly { item: string; where: string }[];
  links: readonly ToolLink[];
  note: string;
}

export type PracticalToolData = ChecklistTool | InsuranceSheetTool;

export const PRACTICAL_TOOLS: Readonly<Record<string, PracticalToolData>> = {
  "animal-hospital-guide": {
    kind: "checklist",
    title: "동물병원 방문 전 질문표",
    intro:
      "후보 병원에 전화나 문의로 확인할 항목과 방문 준비물입니다. 병원을 평가하거나 순위를 매기는 표가 아니며, 답은 각 병원에 직접 확인해야 합니다.",
    groups: [
      {
        heading: "병원에 물어볼 것",
        items: [
          "우리 아이 종(개·고양이·기타)을 진료하는지",
          "진료 시간, 휴진일, 예약 필요 여부와 접수 방식",
          "야간·응급 진료를 하는지, 하지 않는다면 연계 병원이 있는지",
          "초진에 필요한 서류나 이전 진료 기록이 있는지",
          "검사·처치 전에 예상 비용 안내를 받을 수 있는지",
          "주차 가능 여부와 이동 방법",
        ],
      },
      {
        heading: "방문 전에 챙길 것",
        items: [
          "증상이 시작된 시점과 횟수를 적은 메모, 가능하면 사진·영상",
          "먹고 있는 사료·간식·약·영양제 목록",
          "예방접종 및 이전 진료 기록",
          "이동장 또는 목줄, 배변 봉투",
          "금식 등 검사 전 지켜야 할 사항은 병원에 먼저 문의",
        ],
      },
    ],
    compareRows: [
      "병원 이름",
      "대상 동물 종",
      "진료 시간·휴진일",
      "응급·야간 대응",
      "예약 방식",
      "예상 비용 안내 방식",
      "이동 시간",
    ],
    links: [
      { name: "국가동물보호정보시스템", href: "https://www.animal.go.kr/" },
    ],
    note: "병원 정보는 변경될 수 있어 방문 전 병원에 직접 확인하세요. 이 표는 진단이나 치료 판단을 대신하지 않으며, 증상이 급하면 바로 가까운 동물병원에 연락하세요.",
  },
  "animal-registration-chip-guide": {
    kind: "checklist",
    title: "동물등록 확인 순서와 준비물",
    intro:
      "등록 대상·기한·과태료 같은 제도 내용은 바뀔 수 있어 공식 기관에서 현재 기준을 확인하는 순서로 정리했습니다. 등록대행기관과 동물 판매업체는 서로 다른 곳입니다.",
    groups: [
      {
        heading: "확인 순서",
        items: [
          "동물보호법에 따른 등록 대상·시기·과태료는 국가동물보호정보시스템과 농림축산식품부 안내에서 현재 기준으로 확인",
          "등록 방식(내장형·외장형 등)과 비용은 가까운 등록대행기관에 문의 — 비용은 기관마다 다를 수 있음",
          "방문할 곳이 지자체가 지정한 등록대행기관인지 확인 (동물 판매업체·펫숍과는 별개)",
          "등록 후 등록번호와 등록 정보가 맞는지 확인",
          "이사·연락처 변경·소유자 변경 때 정보 변경 신고 방법 확인",
        ],
      },
      {
        heading: "준비물",
        items: [
          "반려동물 정보: 이름, 성별, 출생(또는 입양) 시기, 품종, 털색",
          "소유자 본인 확인 수단과 연락처",
          "이미 등록된 동물이라면 기존 등록번호",
        ],
      },
    ],
    links: [
      { name: "국가동물보호정보시스템", href: "https://www.animal.go.kr/" },
      { name: "농림축산식품부", href: "https://www.mafra.go.kr/" },
    ],
    note: "법적 의무와 신청 조건은 위 공식 기관의 현재 안내가 우선합니다. 펫지기는 등록 업무를 대행하지 않습니다.",
  },
  "pet-insurance-guide": {
    kind: "insurance-sheet",
    title: "펫보험 같은 조건 비교표",
    intro:
      "상품마다 용어와 산식이 달라 같은 항목으로 나란히 적어 보면 차이가 보입니다. 값은 각 보험사의 상품설명서·약관에서 직접 옮겨 적어 주세요. 이 표는 순위나 추천이 아닙니다.",
    rows: [
      { item: "보험사·상품명", where: "보험사 상품 페이지" },
      { item: "약관 버전·기준일", where: "약관 첫 장·시행일" },
      { item: "가입 가능 연령·갱신 조건", where: "상품설명서" },
      { item: "보장 비율", where: "보장 내용 표" },
      { item: "자기부담금 (정액/정률, 최소 금액)", where: "보장 내용 표" },
      {
        item: "연간 한도와 항목별 한도 (통원·입원·수술)",
        where: "보장 내용 표",
      },
      { item: "면책 기간", where: "보장 개시일 조항" },
      { item: "보장 제외 항목·기존 질환 처리", where: "보장하지 않는 사항" },
      { item: "청구 방식", where: "보험금 청구 안내" },
      {
        item: "보험료 (견적 일자·반려동물 조건 함께 기록)",
        where: "보험사 견적",
      },
    ],
    links: [
      { name: "펫지기 펫보험 비교", href: "/insurance/compare" },
      { name: "금융감독원", href: "https://www.fss.or.kr/" },
    ],
    note: "펫지기는 보험 중개·모집을 하지 않으며 보험료 예측이나 가입 보장을 제공하지 않습니다. 정확한 내용은 보험사 약관을 확인하세요.",
  },
};
