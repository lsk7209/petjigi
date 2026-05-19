/**
 * 카카오맵 REST API 지오코딩 (일 30만 건 무료)
 * 결과는 DB에 영구 캐싱 — 재호출 금지 (한도 보존, spec §5 ETL 원칙)
 */

interface KakaoGeoResult {
  lat: number;
  lng: number;
}

export async function geocodeAddress(
  address: string
): Promise<KakaoGeoResult | null> {
  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey) {
    console.warn("[geocoding] KAKAO_REST_API_KEY 미설정, 지오코딩 건너뜀");
    return null;
  }

  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${apiKey}` },
  });

  if (!res.ok) {
    console.error(`[geocoding] API 오류: ${res.status} ${address}`);
    return null;
  }

  const data = await res.json();
  const doc = data.documents?.[0];
  if (!doc) return null;

  return {
    lat: parseFloat(doc.y),
    lng: parseFloat(doc.x),
  };
}
