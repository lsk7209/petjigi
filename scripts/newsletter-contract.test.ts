import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const route = fs.readFileSync("app/api/subscribe/route.ts", "utf8");
const template = fs.readFileSync("lib/email/templates.tsx", "utf8");
const privacy = fs.readFileSync("app/privacy/page.tsx", "utf8");
const form = fs.readFileSync("components/forms/subscribe-form.tsx", "utf8");

test("newsletter source accepts only implemented entry points", () => {
  assert.match(route, /z\.enum\(\["contact_page", "home_newsletter", "pet_loss_newsletter"\]\)/);
  assert.doesNotMatch(route, /pet_loss_care/);
});

test("welcome email does not promise a missing PDF", () => {
  for (const source of [route, template]) {
    assert.doesNotMatch(source, /pet-loss-care-guide\.pdf|PDF 다운로드|30일간 유효|가이드 PDF가 도착/);
  }
});

test("privacy retention copy matches newsletter cancellation", () => {
  assert.match(privacy, /뉴스레터 구독 취소 또는 발송 동의 철회/);
  assert.doesNotMatch(privacy, /회원 탈퇴 또는 발송 동의 철회/);
});

test("newsletter form and API share a non-interactive bot honeypot", () => {
  assert.match(form, /register\("website"\)/);
  assert.match(form, /tabIndex=\{-1\}/);
  assert.match(route, /website: z\.string\(\)\.max\(200\)/);
  assert.match(route, /if \(parsed\.data\.website\)/);
});

test("newsletter signup normalizes email and absorbs concurrent duplicate inserts", () => {
  const route = fs.readFileSync("app/api/subscribe/route.ts", "utf8");
  assert.match(route, /\.trim\(\)\.toLowerCase\(\)\.max\(254\)\.email\(/);
  assert.match(route, /\.onConflictDoNothing\(\{ target: emailSubscribers\.email \}\)/);
  assert.match(route, /if \(!inserted\)/);
});

test("newsletter reactivation has one atomic winner before sending email", () => {
  const route = fs.readFileSync("app/api/subscribe/route.ts", "utf8");
  assert.match(route, /isNotNull\(emailSubscribers\.unsubscribedAt\)/);
  assert.match(route, /\.returning\(\{ id: emailSubscribers\.id \}\)/);
  assert.match(route, /if \(!reactivated\)/);
  assert.match(route, /sendWelcomeEmail\(email, reactivated\.id, consentMarketing\)/);
});
