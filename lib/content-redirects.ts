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
];

export const REDIRECTED_BLOG_SLUGS: ReadonlySet<string> = new Set(
  CONTENT_REDIRECTS.filter((r) => r.from.startsWith("/blog/")).map((r) => r.from.slice("/blog/".length)),
);
