export type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: GtagFn;
    dataLayer: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  (window.gtag ?? ((...a) => window.dataLayer!.push(a)))(...args);
}

export const track = {
  /** 업체 상세 페이지 조회 */
  businessView(params: { type: string; name: string; sigungu: string }) {
    gtag("event", "view_business", { business_type: params.type, business_name: params.name, region: params.sigungu });
  },
  /** 지도 링크 클릭 (카카오/네이버) */
  mapClick(params: { provider: "kakao" | "naver"; businessName: string }) {
    gtag("event", "map_click", { map_provider: params.provider, business_name: params.businessName });
  },
  /** 전화번호 클릭 */
  phoneClick(params: { businessName: string; type: string }) {
    gtag("event", "phone_click", { business_name: params.businessName, business_type: params.type });
  },
  /** 가이드 조회 */
  guideView(params: { slug: string; title: string; category: number }) {
    gtag("event", "view_guide", { guide_slug: params.slug, guide_title: params.title, category_id: params.category });
  },
  /** 뉴스레터 구독 */
  subscribe(params: { source: string }) {
    gtag("event", "newsletter_subscribe", { subscribe_source: params.source });
  },
  /** 구조동물 조회 */
  rescueView(params: { animalId: string }) {
    gtag("event", "view_rescue_animal", { animal_id: params.animalId });
  },
  /** CTA 클릭 (보험 비교, 동물병원 찾기 등) */
  ctaClick(params: { label: string; destination: string; location: string }) {
    gtag("event", "cta_click", { cta_label: params.label, cta_destination: params.destination, cta_location: params.location });
  },
  /** 검색 실행 */
  search(params: { query: string; resultsCount?: number }) {
    gtag("event", "search", { search_term: params.query, results_count: params.resultsCount });
  },
  /** 목차(ToC) 클릭 */
  tocClick(params: { headingText: string; guideSlug: string }) {
    gtag("event", "toc_click", { heading: params.headingText, guide_slug: params.guideSlug });
  },
  /** 외부 링크 클릭 (카카오맵, 보험사 등) */
  externalLink(params: { url: string; label?: string }) {
    gtag("event", "click", { event_category: "Outbound Link", event_label: params.label ?? params.url, transport_type: "beacon" });
  },
  /** 카테고리 페이지 조회 */
  categoryView(params: { categorySlug: string; categoryName: string }) {
    gtag("event", "view_category", { category_slug: params.categorySlug, category_name: params.categoryName });
  },
  /** 펫보험 비교 페이지 진입 */
  insuranceCompareView() {
    gtag("event", "view_insurance_compare", { event_category: "Insurance" });
  },
  /** 견종·묘종 상세 조회 */
  breedView(params: { slug: string; nameKo: string; species: string }) {
    gtag("event", "view_breed", { breed_slug: params.slug, breed_name: params.nameKo, species: params.species });
  },
  /** 질병·증상 상세 조회 */
  conditionView(params: { slug: string; title: string }) {
    gtag("event", "view_condition", { condition_slug: params.slug, condition_title: params.title });
  },
  /** 시도·시군구 지역 허브 조회 */
  regionView(params: { sido: string; sigungu?: string; type?: string }) {
    gtag("event", "view_region", { sido: params.sido, sigungu: params.sigungu, business_type: params.type });
  },
  /** 보호센터 페이지 조회 */
  shelterView(params: { sigungu: string; count: number }) {
    gtag("event", "view_shelter", { sigungu: params.sigungu, shelter_count: params.count });
  },
};
