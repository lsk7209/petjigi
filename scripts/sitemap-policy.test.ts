import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const config = fs.readFileSync("next-sitemap.config.js", "utf8");

test("noindex rescue pages remain crawlable but are excluded from sitemaps", () => {
  const defaultPolicy = config
    .split(/\r?\n/)
    .find((line) => line.includes('userAgent: "*"'));
  assert.ok(defaultPolicy, "default crawler policy must exist");
  assert.ok(!defaultPolicy.includes("/rescue/"), "default policy must not block rescue pages");
  assert.match(config, /exclude:\s*\[[\s\S]*?["']\/rescue["']/);
  assert.match(config, /exclude:\s*\[[\s\S]*?["']\/rescue\/\*["']/);
});

test("metadata image and manifest endpoints are excluded from sitemaps", () => {
  for (const route of [
    "/opengraph-image",
    "/**/opengraph-image",
    "/icon",
    "/apple-icon",
    "/manifest.webmanifest",
  ]) {
    assert.ok(config.includes(`"${route}"`), `${route} must be excluded`);
  }
});
