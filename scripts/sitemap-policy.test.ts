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

test("지역×업종 목록은 업체 수 하한 이상일 때만 사이트맵에 들어간다", () => {
  assert.match(config, /LISTING_MIN_SITEMAP = 3;/);
  // 업체 수 조회 SQL은 목록 페이지와 공유하는 lib/listing-identity.js에서 온다(중복 제거 포함)
  const identity = fs.readFileSync("lib/listing-identity.js", "utf8");
  assert.match(identity, /HAVING COUNT\(DISTINCT b\.id\) >= \?/);
  assert.match(identity, /notDuplicateListingSql\("b"\)/);
});

test("regions 시드의 시군구 slug는 같은 이름끼리만 공유한다(다른 이름이 같은 slug를 쓰면 목록이 섞인다)", () => {
  const src = fs.readFileSync("db/seeds/regions.ts", "utf8");
  const bySlug = new Map<string, Set<string>>();
  for (const m of src.matchAll(/sigungu: "([^"]+)", sigunguSlug: "([^"]+)"/g)) {
    bySlug.set(m[2], (bySlug.get(m[2]) ?? new Set()).add(m[1]));
  }
  const mixed = [...bySlug].filter(([, names]) => names.size > 1).map(([slug]) => slug);
  assert.deepEqual(mixed, []);
});

test("DB 환경변수가 없으면 사이트맵 생성이 실패한다(명시적 fixture 빌드만 예외)", () => {
  assert.match(config, /SITEMAP_ALLOW_NO_DB === "1"/);
  assert.match(config, /throw new Error\("TURSO_DATABASE_URL 누락/);
});
