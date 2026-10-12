import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { before } from "node:test";
import { createClient } from "@libsql/client";
import { NextRequest } from "next/server";

// 합성 SQLite fixture만 사용한다. 운영 DB·Resend·GA4는 호출하지 않는다(키 미설정 → 발송 skipped).
const dbFile = join(
  mkdtempSync(join(tmpdir(), "newsletter-flow-")),
  "fixture.sqlite",
);
process.env.TURSO_DATABASE_URL = `file:${dbFile.replaceAll("\\", "/")}`;
process.env.TURSO_AUTH_TOKEN = "";
delete process.env.RESEND_API_KEY;
delete process.env.RESEND_FROM_EMAIL;
delete process.env.GA4_API_SECRET;

let subscribe: (req: Request) => Promise<Response>;
let unsubscribe: (req: NextRequest) => Promise<Response>;
const BASE = "http://localhost";

const post = (body: unknown) =>
  new Request(`${BASE}/api/subscribe`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

const valid = {
  email: "Reader@Example.com",
  consentRequired: true,
  consentMarketing: false,
  ageConfirmed: true,
  source: "home_newsletter",
};

before(async () => {
  const client = createClient({ url: process.env.TURSO_DATABASE_URL! });
  await client.execute(
    "CREATE TABLE email_subscribers (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, persona TEXT, source TEXT, consent_marketing TEXT, subscribed_at TEXT NOT NULL, unsubscribed_at TEXT)",
  );
  subscribe = (await import("../app/api/subscribe/route")).POST as never;
  unsubscribe = (await import("../app/api/unsubscribe/route")).GET as never;
});

async function rowFor(email: string) {
  const client = createClient({ url: process.env.TURSO_DATABASE_URL! });
  const res = await client.execute({
    sql: "SELECT * FROM email_subscribers WHERE email = ?",
    args: [email],
  });
  return res.rows[0] as unknown as
    | { id: string; consent_marketing: string; unsubscribed_at: string | null }
    | undefined;
}

test("필수 동의·만 14세 확인이 없으면 거절되고 저장되지 않는다", async () => {
  const noConsent = await subscribe(post({ ...valid, consentRequired: false }));
  assert.equal(noConsent.status, 400);
  const noAge = await subscribe(post({ ...valid, ageConfirmed: false }));
  assert.equal(noAge.status, 400);
  assert.equal(await rowFor("reader@example.com"), undefined);
});

test("신규 구독: 이메일 정규화·마케팅 동의 분리 저장, Resend 미설정이면 메일 발송 완료로 표시하지 않는다", async () => {
  const res = await subscribe(post(valid));
  assert.equal(res.status, 201);
  const body = (await res.json()) as { message: string; welcomeEmail: string };
  assert.equal(body.welcomeEmail, "skipped");
  assert.doesNotMatch(body.message, /메일을 보냈습니다/);
  const row = await rowFor("reader@example.com");
  assert.equal(row?.consent_marketing, "no");
});

test("중복 구독은 새 행을 만들지 않는다", async () => {
  const res = await subscribe(post({ ...valid, email: "reader@example.com" }));
  assert.equal(res.status, 200);
  assert.match(
    ((await res.json()) as { message: string }).message,
    /이미 구독 중/,
  );
});

test("잘못된 토큰으로는 구독이 취소되지 않는다", async () => {
  const bad = await unsubscribe(
    new NextRequest(
      `${BASE}/api/unsubscribe?email=reader@example.com&token=wrong`,
    ) as never,
  );
  assert.match(bad.headers.get("location") ?? "", /unsubscribe=not_found/);
  assert.equal((await rowFor("reader@example.com"))?.unsubscribed_at, null);
});

test("올바른 토큰으로 구독 취소 → 재구독 시 마케팅 동의를 새로 반영", async () => {
  const row = await rowFor("reader@example.com");
  const ok = await unsubscribe(
    new NextRequest(
      `${BASE}/api/unsubscribe?email=reader@example.com&token=${row?.id}`,
    ) as never,
  );
  assert.match(ok.headers.get("location") ?? "", /unsubscribe=ok/);
  assert.ok((await rowFor("reader@example.com"))?.unsubscribed_at);

  const again = await unsubscribe(
    new NextRequest(
      `${BASE}/api/unsubscribe?email=reader@example.com&token=${row?.id}`,
    ) as never,
  );
  assert.match(again.headers.get("location") ?? "", /unsubscribe=already/);

  const resub = await subscribe(post({ ...valid, consentMarketing: true }));
  assert.equal(resub.status, 200);
  assert.match(
    ((await resub.json()) as { message: string }).message,
    /재활성화/,
  );
  const after = await rowFor("reader@example.com");
  assert.equal(after?.unsubscribed_at, null);
  assert.equal(after?.consent_marketing, "yes");
});

test("허니팟이 채워진 요청은 거절", async () => {
  const res = await subscribe(
    post({ ...valid, email: "bot@example.com", website: "http://spam" }),
  );
  assert.equal(res.status, 400);
  assert.equal(await rowFor("bot@example.com"), undefined);
});
