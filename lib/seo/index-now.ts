// IndexNow: Naver + Bing 동시 ping (구글 ping endpoint 2023년 deprecated — 절대 사용 X)
const INDEXNOW_KEY = process.env.INDEXNOW_KEY!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.com";

const INDEXNOW_HOSTS = [
  "searchadvisor.naver.com",
  "www.bing.com",
];

export async function pingIndexNow(urls: string[]): Promise<void> {
  if (!INDEXNOW_KEY || urls.length === 0) return;

  const body = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  await Promise.allSettled(
    INDEXNOW_HOSTS.map((host) =>
      fetch(`https://${host}/IndexNow`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      })
    )
  );
}
