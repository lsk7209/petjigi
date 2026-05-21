declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
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
};
