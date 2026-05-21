// IndexNow: Naver + Bing 동시 ping (구글 ping endpoint 2023년 deprecated — 절대 사용 X)
const INDEXNOW_KEY = process.env.INDEXNOW_KEY!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const INDEXNOW_HOSTS = [
  "searchadvisor.naver.com",
  "www.bing.com",
];

export async function pingIndexNow(urls: string[]): Promise<{ ok: boolean; results: string[] }> {
  if (!INDEXNOW_KEY || urls.length === 0) return { ok: false, results: [] };

  const body = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 10000), // IndexNow 최대 10,000 URLs
  };

  const results = await Promise.allSettled(
    INDEXNOW_HOSTS.map((host) =>
      fetch(`https://${host}/IndexNow`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      }).then((r) => `${host}: ${r.status}`)
    )
  );

  const logs = results.map((r) =>
    r.status === "fulfilled" ? r.value : `error: ${r.reason}`
  );

  console.log("[IndexNow]", logs.join(" | "));
  return { ok: true, results: logs };
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
