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
    { label: "입양 첫날 준비물", href: "/blog/dog-first-adoption-kit" },
    { label: "마이크로칩 등록 절차", href: "/guide/microchip-registration-complete-guide" },
  ] },
  { category: "nutrition", title: "먹거리를 선택해요", intro: "제조사 정보와 우리 동물의 식사 조건을 함께 확인하세요.", steps: [
    { label: "고양이 사료 원료 표시 읽기", href: "/blog/cat-food-label-guide" },
    { label: "강아지에게 위험한 음식", href: "/blog/dog-toxic-foods" },
    { label: "사료 알레르기 식이 제거 테스트", href: "/blog/dog-food-allergy-elimination-diet-test" },
  ] },
  { category: "health", title: "건강과 진료를 준비해요", intro: "응급 신호가 있으면 기록을 마칠 때까지 기다리지 말고 병원에 연락하세요.", steps: [
    { label: "병원 방문 질문표", href: "/guide/animal-hospital-guide" },
    { label: "고양이 눈곱 원인과 대처", href: "/blog/cat-eye-discharge-guide" },
    { label: "온라인 수의사 상담의 한계", href: "/blog/online-vet-consultation-guide" },
  ] },
  { category: "insurance", title: "보험 조건을 확인해요", intro: "광고 문구보다 가입할 계약의 약관과 특약을 확인하세요.", steps: [
    { label: "같은 조건 비교표 작성", href: "/blog/pet-insurance-comparison-method" },
    { label: "청구 서류와 접수 준비", href: "/blog/pet-insurance-claim-guide" },
    { label: "반려동물 사고의 법적 책임", href: "/blog/pet-bite-liability-guide" },
  ] },
  { category: "care", title: "고양이의 집을 살펴봐요", intro: "안전한 자리와 자원 배치를 우리 집 환경에 맞춰 점검하세요.", steps: [
    { label: "화장실 위치·개수·청소 주기", href: "/blog/cat-litter-box-guide" },
    { label: "고양이와 강아지의 공존", href: "/blog/cat-dog-harmony-guide" },
    { label: "노령·어린 반려동물 합사", href: "/blog/senior-young-pet-introduction" },
  ] },
  { category: "memorial", title: "마지막 돌봄을 준비해요", intro: "필요한 안내부터 천천히 확인하세요. 모든 단계를 한 번에 정하지 않아도 됩니다.", steps: [
    { label: "허가 업체 확인과 장례 준비", href: "/guide/memorial-ceremony" },
    { label: "일상으로 돌아가는 방법", href: "/blog/petloss-return-to-daily-life" },
  ] },
];
