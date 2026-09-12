import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const config = fs.readFileSync("next.config.ts", "utf8");

test("Next.js owns immutable cache headers for its hashed static assets", () => {
  assert.doesNotMatch(config, /source:\s*["']\/_next\/static/);
});

test("API responses retain the explicit no-store boundary", () => {
  assert.match(config, /source:\s*["']\/api\/\(\.\*\)["'][\s\S]*?Cache-Control[\s\S]*?no-store/);
});
