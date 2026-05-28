/**
 * Google Indexing API — 새 URL을 Google에 직접 전송
 *
 * 설정 방법:
 * 1. Google Cloud Console → IAM → 서비스 계정 생성
 * 2. 서비스 계정에 "Indexing API" 활성화
 * 3. GSC에서 해당 서비스 계정 이메일을 '소유자'로 추가
 * 4. 서비스 계정 JSON 키 다운로드 → GOOGLE_SA_JSON 환경 변수에 저장
 *
 * 주의: Google ping endpoint는 CLAUDE.md §2 6항에 의해 절대 사용 금지
 *       Indexing API는 공식 OAuth2 API이므로 허용
 */

const INDEXING_API = "https://indexing.googleapis.com/v3/urlNotifications:publish";

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

/** RSA-SHA256 JWT 서명 (Web Crypto API 사용, Node.js 런타임) */
async function signJwt(payload: Record<string, unknown>, privateKeyPem: string): Promise<string> {
  const header = { alg: "RS256", typ: "JWT" };

  const encode = (obj: unknown) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const signingInput = `${encode(header)}.${encode(payload)}`;

  // PEM → CryptoKey
  const pemBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");

  const keyData = Buffer.from(pemBody, "base64");

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyData,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(signingInput),
  );

  return `${signingInput}.${Buffer.from(signature).toString("base64url")}`;
}

async function getAccessToken(sa: ServiceAccount, scope = "https://www.googleapis.com/auth/indexing"): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const jwt = await signJwt(
    {
      iss: sa.client_email,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    },
    sa.private_key,
  );

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    signal: AbortSignal.timeout(10000),
  });

  const data = await res.json() as { access_token?: string };
  if (!data.access_token) throw new Error("Google OAuth 토큰 발급 실패");
  return data.access_token;
}

/**
 * Google Indexing API로 URL 전송
 * GOOGLE_SA_JSON 환경 변수가 없으면 조용히 skip
 */
export async function notifyGoogleIndexing(url: string, type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"): Promise<void> {
  const saJson = process.env.GOOGLE_SA_JSON;
  if (!saJson) return; // 서비스 계정 없으면 skip

  try {
    const sa = JSON.parse(saJson) as ServiceAccount;
    const token = await getAccessToken(sa);

    const res = await fetch(INDEXING_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url, type }),
      signal: AbortSignal.timeout(15000),
    });

    const status = res.status;
    console.log(`[Google Indexing] ${url} → ${status}`);
  } catch (err) {
    console.warn("[Google Indexing] 실패 (비치명적):", err);
  }
}

/**
 * 여러 URL 배치 전송 (순차, 150ms 간격)
 * - Google Indexing API 일일 한도: 200건
 * - 토큰 1회 발급 후 재사용
 * - 초과분은 잘라냄 (가장 최근 URL 우선 — 호출자가 최신순 정렬할 것)
 */
export async function notifyGoogleBatch(
  urls: string[],
  maxPerDay = 200,
): Promise<{ sent: number; skipped: number }> {
  const saJson = process.env.GOOGLE_SA_JSON;
  if (!saJson) return { sent: 0, skipped: urls.length };

  const batch = urls.slice(0, maxPerDay);
  const skipped = urls.length - batch.length;

  let token: string;
  try {
    const sa = JSON.parse(saJson) as ServiceAccount;
    token = await getAccessToken(sa);
  } catch (err) {
    console.warn("[Google Indexing] 토큰 발급 실패:", err);
    return { sent: 0, skipped: urls.length };
  }

  let sent = 0;
  for (const url of batch) {
    try {
      const res = await fetch(INDEXING_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url, type: "URL_UPDATED" }),
        signal: AbortSignal.timeout(15000),
      });
      console.log(`[Google Indexing] ${url} → ${res.status}`);
      sent++;
    } catch (err) {
      console.warn(`[Google Indexing] 실패 (${url}):`, err);
    }
    // 150ms 간격 — API 초당 200건 제한 준수
    await new Promise((r) => setTimeout(r, 150));
  }

  if (skipped > 0) console.log(`[Google Indexing] ${skipped}건 한도 초과로 생략 (오늘 재실행 시 전송)`);
  return { sent, skipped };
}

/**
 * Google Search Console에 사이트맵 제출
 * GOOGLE_SA_JSON 없으면 skip. siteUrl은 GSC에 등록된 정확한 값.
 */
export async function submitSitemapToGSC(
  siteUrl: string,
  sitemapUrl: string,
): Promise<void> {
  const saJson = process.env.GOOGLE_SA_JSON;
  if (!saJson) return;

  try {
    const sa = JSON.parse(saJson) as ServiceAccount;
    const token = await getAccessToken(sa, "https://www.googleapis.com/auth/webmasters");

    const encodedSite = encodeURIComponent(siteUrl);
    const encodedSitemap = encodeURIComponent(sitemapUrl);
    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps/${encodedSitemap}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(15000),
      },
    );

    console.log(`[GSC Sitemap] ${sitemapUrl} → ${res.status}`);
  } catch (err) {
    console.warn("[GSC Sitemap] 제출 실패 (비치명적):", err);
  }
}

