import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const config = fs.readFileSync("next.config.ts", "utf8");
const vercelConfig = fs.readFileSync("vercel.json", "utf8");

test("Next.js owns immutable cache headers for its hashed static assets", () => {
  assert.doesNotMatch(config, /source:\s*["']\/_next\/static/);
  assert.doesNotMatch(vercelConfig, /"source"\s*:\s*"\/_next\/static/);
});

test("API responses retain the explicit no-store boundary", () => {
  assert.match(config, /source:\s*["']\/api\/\(\.\*\)["'][\s\S]*?Cache-Control[\s\S]*?no-store/);
});

test("Vercel headers do not override page-level robots metadata", () => {
  const parsed = JSON.parse(vercelConfig) as {
    headers: Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
  };
  const globalRule = parsed.headers.find((rule) => rule.source === "/(.*)");
  const rescueRule = parsed.headers.find((rule) => rule.source === "/rescue(.*)");

  assert.ok(globalRule, "global security-header rule must remain");
  assert.ok(!globalRule.headers.some((header) => header.key === "X-Robots-Tag"));
  assert.ok(rescueRule, "rescue root and detail pages must share the noindex header rule");
  assert.ok(
    rescueRule.headers.some(
      (header) => header.key === "X-Robots-Tag" && header.value === "noindex, nofollow"
    )
  );
});
