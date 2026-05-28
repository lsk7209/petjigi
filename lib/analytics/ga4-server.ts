/**
 * GA4 Measurement Protocol — 서버사이드 이벤트 전송
 * GA4_API_SECRET + NEXT_PUBLIC_GA_ID 환경변수 필요
 * 없으면 조용히 skip (비치명적)
 */

const GA4_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const API_SECRET = process.env.GA4_API_SECRET;

interface GA4Event {
  name: string;
  params?: Record<string, string | number | boolean>;
}

/**
 * 서버에서 GA4 이벤트 전송 (Measurement Protocol v2)
 * client_id: 브라우저 쿠키를 읽을 수 없으므로 IP+UA 기반 익명 ID 사용
 */
export async function sendServerEvent(
  events: GA4Event | GA4Event[],
  clientId = "server-side",
): Promise<void> {
  if (!MEASUREMENT_ID || !API_SECRET) return;

  const eventsArray = Array.isArray(events) ? events : [events];

  try {
    await fetch(`${GA4_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        non_personalized_ads: false,
        events: eventsArray.map((e) => ({
          name: e.name,
          params: {
            engagement_time_msec: "1",
            session_id: Date.now().toString(),
            ...e.params,
          },
        })),
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // 비치명적 — 분석 실패가 주 기능에 영향 주지 않도록
  }
}

/** 뉴스레터 구독 완료 이벤트 */
export async function trackSubscribe(source: string, isNew: boolean): Promise<void> {
  await sendServerEvent({
    name: "newsletter_subscribe",
    params: { subscribe_source: source, is_new_subscriber: isNew, event_category: "Lead" },
  });
}

/** 구조동물 입양문의 (페이지 조회) */
export async function trackRescueView(animalId: string): Promise<void> {
  await sendServerEvent({ name: "view_rescue_animal", params: { animal_id: animalId } });
}
