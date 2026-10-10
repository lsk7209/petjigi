// IndexNow: Naver + Bing 동시 ping (구글 ping endpoint 2023년 deprecated — 절대 사용 X)
// 키 파일은 public/6e5c7ca8b3db3d40d56c959549c1c7e0.txt에 이미 배포됨 (공개값, 비밀 아님)
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "6e5c7ca8b3db3d40d56c959549c1c7e0";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

// Naver IndexNow: 최대 1,000 URLs / Bing: 최대 10,000 URLs
const INDEXNOW_HOSTS: { host: string; limit: number }[] = [
  { host: "searchadvisor.naver.com", limit: 1000 },
  { host: "www.bing.com", limit: 10000 },
];

import { outcomeFromError, outcomeFromHttp, type NotifyOutcome } from "./notification-outcome";

/** ok는 최소 한 곳이 2xx로 수락했을 때만 true. 서비스별 결과는 outcomes. */
export async function pingIndexNow(urls: string[]): Promise<{ ok: boolean; results: string[]; outcomes: NotifyOutcome[] }> {
  if (!INDEXNOW_KEY) return { ok: false, results: [], outcomes: [{ service: "IndexNow", status: "not_configured" }] };
  if (urls.length === 0) return { ok: false, results: [], outcomes: [{ service: "IndexNow", status: "no_targets" }] };

  const hostname = new URL(SITE_URL).hostname;

  const results = await Promise.allSettled(
    INDEXNOW_HOSTS.map(({ host, limit }) => {
      const body = {
        host: hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, limit),
      };
      return fetch(`https://${host}/IndexNow`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      }).then((r) => ({ host, status: r.status }));
    })
  );

  const outcomes = results.map((r, i) =>
    r.status === "fulfilled"
      ? outcomeFromHttp(`IndexNow ${r.value.host}`, r.value.status)
      : outcomeFromError(`IndexNow ${INDEXNOW_HOSTS[i].host}`, r.reason)
  );
  const logs = outcomes.map((o) => `${o.service}: ${o.detail}`);

  console.log("[IndexNow]", logs.join(" | "));
  return { ok: outcomes.some((o) => o.status === "success"), results: logs, outcomes };
}

/** 가이드 슬러그 → 전체 URL 변환 후 핑 */
export async function pingGuide(slug: string) {
  return pingIndexNow([`${SITE_URL}/guide/${slug}`, SITE_URL]);
}

/** 업장 상세 → 핑 */
export async function pingBusiness(type: string, sigunguSlug: string, name: string) {
  return pingIndexNow([
    `${SITE_URL}/${type}/${sigunguSlug}/${encodeURIComponent(name)}`,
    `${SITE_URL}/${sigunguSlug}/${type}`,
  ]);
}
