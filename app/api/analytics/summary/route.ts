import { NextResponse } from "next/server";

/**
 * GA4 Data API 요약 — 최근 7일 핵심 지표
 * GOOGLE_SA_JSON + GA4_PROPERTY_ID 설정 시 활성화
 *
 * GA4 Property ID 확인: GA4 → 관리 → 속성 → 속성 설정 → 속성 ID
 */

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const GA4_API = "https://analyticsdata.googleapis.com/v1beta";

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

async function getToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };

  const encode = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const signingInput = `${encode(header)}.${encode({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  })}`;

  const pemBody = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");

  const key = await crypto.subtle.importKey(
    "pkcs8",
    Buffer.from(pemBody, "base64"),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, Buffer.from(signingInput));
  const jwt = `${signingInput}.${Buffer.from(sig).toString("base64url")}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json() as { access_token?: string };
  if (!data.access_token) throw new Error("token fail");
  return data.access_token;
}

export async function GET() {
  const saJson = process.env.GOOGLE_SA_JSON;
  if (!saJson || !GA4_PROPERTY_ID) {
    return NextResponse.json({
      ok: false,
      reason: "GOOGLE_SA_JSON 또는 GA4_PROPERTY_ID 미설정",
      setup: "1. GCP 서비스계정 생성 → 2. GA4 Data API 활성화 → 3. GA4 속성에 서비스계정 뷰어 추가",
    });
  }

  try {
    const sa = JSON.parse(saJson) as ServiceAccount;
    const token = await getToken(sa);

    const report = await fetch(
      `${GA4_API}/properties/${GA4_PROPERTY_ID}:runReport`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
          dimensions: [{ name: "pagePath" }],
          metrics: [
            { name: "sessions" },
            { name: "screenPageViews" },
            { name: "bounceRate" },
            { name: "averageSessionDuration" },
          ],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 20,
        }),
      },
    ).then((r) => r.json());

    return NextResponse.json({ ok: true, report });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
