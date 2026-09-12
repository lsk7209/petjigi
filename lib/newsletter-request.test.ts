import assert from "node:assert/strict";
import test from "node:test";
import {
  NEWSLETTER_MAX_BODY_BYTES,
  NewsletterRequestError,
  readNewsletterJson,
} from "./newsletter-request";

test("newsletter parser accepts a small JSON request", async () => {
  const request = new Request("https://petjigi.kr/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "reader@example.com" }),
  });

  assert.deepEqual(await readNewsletterJson(request), { email: "reader@example.com" });
});

test("newsletter parser rejects unsupported content types before parsing", async () => {
  const request = new Request("https://petjigi.kr/api/subscribe", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: "{}",
  });

  await assert.rejects(readNewsletterJson(request), (error: unknown) =>
    error instanceof NewsletterRequestError && error.status === 415);
});

test("newsletter parser rejects lookalike JSON media types", async () => {
  const request = new Request("https://petjigi.kr/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json-malicious" },
    body: "{}",
  });

  await assert.rejects(readNewsletterJson(request), (error: unknown) =>
    error instanceof NewsletterRequestError && error.status === 415);
});

test("newsletter parser accepts a JSON charset parameter", async () => {
  const request = new Request("https://petjigi.kr/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: "{}",
  });

  assert.deepEqual(await readNewsletterJson(request), {});
});

test("newsletter parser enforces the actual streamed body size without trusting content-length", async () => {
  const request = new Request("https://petjigi.kr/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ payload: "x".repeat(NEWSLETTER_MAX_BODY_BYTES) }),
  });

  await assert.rejects(readNewsletterJson(request), (error: unknown) =>
    error instanceof NewsletterRequestError && error.status === 413);
});

test("newsletter parser rejects malformed JSON", async () => {
  const request = new Request("https://petjigi.kr/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{",
  });

  await assert.rejects(readNewsletterJson(request), (error: unknown) =>
    error instanceof NewsletterRequestError && error.status === 400);
});
