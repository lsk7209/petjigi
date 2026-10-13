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

test("sido pages without registered regions are noindex and kept out of the sitemap", () => {
  const page = fs.readFileSync("app/sido/[sido]/page.tsx", "utf8");
  assert.match(page, /rows\.length === 0 \? \{ robots: \{ index: false, follow: true \} \}/);
  for (const slug of ["gangwon", "chungbuk", "jeju"]) {
    assert.ok(config.includes(`"/sido/${slug}"`), `${slug} must be excluded while data is pending`);
  }
});

test("a pending noindex page is not also blocked by robots.txt Disallow", () => {
  assert.equal(/disallow:\s*\[[^\]]*\/sido/.test(config), false);
});

test("force-dynamic 지역 목록·보호센터는 DB 기준 additionalPaths로 사이트맵에 넣고, 조회 실패를 삼키지 않는다", () => {
  assert.match(config, /additionalPaths:\s*async/);
  assert.match(config, /HAVING COUNT\(DISTINCT s\.id\) >= \?/);
  assert.match(config, /SHELTER_PATH\.exec\(path\)/);
  assert.equal(/catch\s*\{\s*return null/.test(config), false, "DB 오류를 null로 삼키면 색인 URL이 조용히 사라진다");
});

test("보호센터 사이트맵 최소 센터 수가 색인 정책과 같다", () => {
  const policy = fs.readFileSync("lib/shelter-index-policy.ts", "utf8");
  const min = /MIN_INDEXABLE_SHELTERS = (\d+)/.exec(policy)?.[1];
  assert.ok(min);
  assert.match(config, new RegExp(`SHELTER_MIN_INDEXABLE = ${min};`));
});
