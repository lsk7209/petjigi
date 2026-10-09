import assert from "node:assert/strict";
import test from "node:test";
import { sendWelcomeEmail, subscribeMessage, type WelcomeEmailDeps } from "./send-welcome";

function deps(over: Partial<WelcomeEmailDeps> = {}) {
  const sent: unknown[] = [];
  const d: WelcomeEmailDeps = {
    apiKey: "test-key",
    from: "hello@example.test",
    render: async () => "<p>hi</p>",
    send: async (m) => { sent.push(m); },
    ...over,
  };
  return { d, sent };
}

test("missing API key skips without calling the sender", async () => {
  const { d, sent } = deps({ apiKey: undefined });
  assert.equal(await sendWelcomeEmail("a@b.test", d), "skipped");
  assert.equal(sent.length, 0);
});

test("missing verified from-address skips instead of guessing a domain", async () => {
  const { d, sent } = deps({ from: undefined });
  assert.equal(await sendWelcomeEmail("a@b.test", d), "skipped");
  assert.equal(sent.length, 0);
});

test("sender failure is reported as failed and never throws", async () => {
  const { d } = deps({ send: async () => { throw new Error("boom"); } });
  assert.equal(await sendWelcomeEmail("a@b.test", d), "failed");
});

test("successful send reports sent exactly once", async () => {
  const { d, sent } = deps();
  assert.equal(await sendWelcomeEmail("a@b.test", d), "sent");
  assert.equal(sent.length, 1);
});

test("response text claims a mail only when one was sent", () => {
  assert.ok(subscribeMessage("구독이 완료되었습니다.", "sent").includes("환영 메일을 보냈습니다"));
  assert.equal(subscribeMessage("구독이 완료되었습니다.", "skipped"), "구독이 완료되었습니다.");
  assert.equal(subscribeMessage("구독이 완료되었습니다.", "failed"), "구독이 완료되었습니다.");
});
