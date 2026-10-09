import assert from "node:assert/strict";
import test from "node:test";
import { CONTENT_REDIRECTS } from "../lib/content-redirects";
import { readSeeds } from "./audit-adsense-seeds";

const seeds = readSeeds();

test("리디렉션 대상은 실제 게시 시드 문서이다", () => {
  const live = new Set(seeds.filter((s) => s.status === "published").map((s) => `/blog/${s.slug}`));
  for (const r of CONTENT_REDIRECTS) assert.ok(live.has(r.to), `${r.to} 대상 문서 없음`);
});

test("어떤 본문도 리디렉션된 원본 URL로 내부 링크하지 않는다", () => {
  for (const r of CONTENT_REDIRECTS) {
    const hits = seeds.filter((s) => s.body.includes(`href="${r.from}"`)).map((s) => s.slug);
    assert.deepEqual(hits, [], `${r.from} 를 링크하는 문서: ${hits.join(",")}`);
  }
});
