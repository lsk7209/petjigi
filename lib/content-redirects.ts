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
];

export const REDIRECTED_BLOG_SLUGS: ReadonlySet<string> = new Set(
  CONTENT_REDIRECTS.filter((r) => r.from.startsWith("/blog/")).map((r) => r.from.slice("/blog/".length)),
);
