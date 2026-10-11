/** 중복 콘텐츠를 대표 문서로 통합한 영구 리디렉션 (원본 행은 DB/시드에 보존) */
export interface ContentRedirect {
  from: string;
  to: string;
  reason: string;
}

export const CONTENT_REDIRECTS: readonly ContentRedirect[] = [
  {
    from: "/blog/pet-photo-tips-guide",
    to: "/blog/pet-photo-tips",
    reason: "동일 검색 의도(스마트폰 반려동물 촬영). 고유 팁을 대표 문서에 병합",
  },
  {
    from: "/blog/cat-treats-guide",
    to: "/blog/cat-snack-selection-guide",
    reason: "동일 검색 의도(고양이 간식 선택). 더 짧은 문서이며 훈련 활용 섹션을 대표 문서에 병합",
  },
  {
    from: "/blog/dog-summer-heat-care-guide",
    to: "/guide/pet-heatstroke-prevention-complete-guide",
    reason: "동일 검색 의도(여름 더위·열사병). 대표 가이드가 응급 처치·예방을 모두 다룸",
  },
  {
    from: "/blog/pet-damage-neighbor-dispute",
    to: "/blog/pet-bite-liability-guide",
    reason: "동일 검색 의도(반려동물 피해 배상·교상 책임). 대표 문서가 이웃 피해 분쟁 절차까지 포함",
  },
  {
    from: "/blog/pet-hotel-boarding-checklist",
    to: "/blog/dog-daycare-hotel-guide",
    reason: "동일 검색 의도(반려동물 위탁 시설 선택). 대표 문서가 등록 확인·방문 점검 항목을 모두 포함",
  },
  {
    from: "/blog/microchip-info-update-guide",
    to: "/blog/animal-registration-change-cancel-guide",
    reason: "동일 검색 의도(동물등록 정보 변경·말소). 대표 문서가 절차·서류·기한을 모두 다룸",
  },
  {
    from: "/blog/dog-spleen-mass-benign-vs-malignant",
    to: "/blog/dog-splenic-hemangiosarcoma-guide",
    reason: "동일 검색 의도(비장 종괴의 양성·악성 구분). 대표 문서가 비장 종괴 감별·진단·치료를 모두 다룸",
  },
  {
    from: "/blog/pet-insurance-comparison-guide",
    to: "/blog/pet-insurance-comparison-method",
    reason: "동일 검색 의도(펫보험 비교 기준). 더 짧은 문서이며 비교 기준·한도·갱신 항목은 대표 문서가 모두 다룸",
  },
  {
    from: "/blog/pet-insurance-deductible-fixed-vs-rate",
    to: "/blog/pet-insurance-deductible-guide",
    reason: "동일 검색 의도(자기부담금 정액 vs 정률). 대표 문서가 실수령액 계산 비교를 포함",
  },
  {
    from: "/blog/pet-insurance-age-renewal-guide",
    to: "/blog/senior-pet-insurance-guide",
    reason: "동일 검색 의도(노령 펫보험 나이 제한·갱신). 더 짧은 문서이며 확인되지 않은 출처 귀속 문장 포함",
  },
  {
    from: "/blog/microchip-animal-registration-guide",
    to: "/blog/pet-registration-guide",
    reason: "동일 검색 의도(동물등록 방법). 구 과태료 상한 표현이 남은 문서이며 대표 문서가 정정된 기준을 사용",
  },
  {
    from: "/guide/pet-registration-guide-korea",
    to: "/guide/microchip-registration-complete-guide",
    reason: "동일 검색 의도(동물등록 방법). 구 과태료 상한 표현이 남은 문서이며 대표 문서가 지자체 안내로 확인한 부과 기준을 사용",
  },
  {
    from: "/guide/pet-microchip-registration-guide",
    to: "/guide/microchip-registration-complete-guide",
    reason: "동일 검색 의도(마이크로칩 등록 절차). 더 짧은 문서이며 절차·조회·무료 등록은 대표 문서가 모두 다룸",
  },
  {
    from: "/guide/pet-insurance-exclusions",
    to: "/blog/pet-insurance-exclusions-guide",
    reason: "동일 검색 의도(펫보험 면책). 확인되지 않은 면책 일수·출처가 많은 문서이며 거절 사례는 대표 문서에 병합",
  },
];

/** 리디렉션된 원본 문서의 "type/slug" 집합 (사이트맵 등에서 제외) */
export const REDIRECTED_CONTENT_KEYS: ReadonlySet<string> = new Set(
  CONTENT_REDIRECTS.map((r) => r.from.replace(/^\//, "")),
);

export function isRedirectedContent(type: string, slug: string): boolean {
  return REDIRECTED_CONTENT_KEYS.has(`${type}/${slug}`);
}
