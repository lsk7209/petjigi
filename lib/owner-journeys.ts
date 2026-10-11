export interface OwnerJourney {
  category: string;
  title: string;
  intro: string;
  steps: readonly { label: string; href: string }[];
}

/** Editorial routes: public representatives, followed by specific next questions. */
export const OWNER_JOURNEYS: readonly OwnerJourney[] = [
  { category: "adoption", title: "처음 가족을 맞이해요", intro: "돌봄 계획부터 식사와 병원 준비까지 확인하세요.", steps: [
    { label: "입양 준비와 예산표", href: "/guide/dog-adoption-checklist" },
    { label: "사료 표시 읽기", href: "/guide/dog-food-label-guide" },
    { label: "방문할 병원 확인", href: "/guide/animal-hospital-guide" },
  ] },
  { category: "nutrition", title: "먹거리를 선택해요", intro: "제조사 정보와 우리 동물의 식사 조건을 함께 확인하세요.", steps: [
    { label: "사료 표시와 제조사 질문", href: "/guide/dog-food-label-guide" },
    { label: "고양이 사료 선택", href: "/guide/cat-food-guide" },
    { label: "간식 선택과 급여 확인", href: "/guide/pet-treats-guide" },
  ] },
  { category: "health", title: "건강과 진료를 준비해요", intro: "응급 신호가 있으면 기록을 마칠 때까지 기다리지 말고 병원에 연락하세요.", steps: [
    { label: "응급 신호와 병원 연락", href: "/guide/pet-first-aid-guide" },
    { label: "병원 방문 질문표", href: "/guide/animal-hospital-guide" },
    { label: "건강 변화와 검진 상담", href: "/guide/pet-health-checkup-guide" },
  ] },
  { category: "insurance", title: "보험 조건을 확인해요", intro: "광고 문구보다 가입할 계약의 약관과 특약을 확인하세요.", steps: [
    { label: "같은 조건 비교표 작성", href: "/blog/pet-insurance-comparison-method" },
    { label: "보장 제외와 대기 기간", href: "/blog/pet-insurance-exclusions-guide" },
    { label: "청구 서류와 접수 준비", href: "/blog/pet-insurance-claim-guide" },
  ] },
  { category: "care", title: "고양이의 집을 살펴봐요", intro: "안전한 자리와 자원 배치를 우리 집 환경에 맞춰 점검하세요.", steps: [
    { label: "실내 환경 점검", href: "/guide/indoor-cat-enrichment-guide" },
    { label: "화장실 배치와 관리", href: "/guide/cat-litter-guide" },
    { label: "여러 동물의 생활 공간", href: "/guide/multi-pet-household-guide" },
  ] },
  { category: "memorial", title: "마지막 돌봄을 준비해요", intro: "필요한 안내부터 천천히 확인하세요. 모든 단계를 한 번에 정하지 않아도 됩니다.", steps: [
    { label: "허가 업체 확인과 장례 준비", href: "/guide/memorial-ceremony" },
    { label: "장례 견적에서 확인할 항목", href: "/guide/memorial-cost" },
    { label: "슬픔을 돌보는 안내", href: "/guide/petloss-care-guide" },
  ] },
];
