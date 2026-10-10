import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (p: string) => fs.readFileSync(p, "utf8");

test("not-found·error 화면은 DOM 차단 마커를 선언한다", () => {
  assert.match(read("app/not-found.tsx"), /data-ads-policy="block"/);
  assert.match(read("app/error.tsx"), /data-ads-policy="block"/);
});

test("판정 훅은 DOM 마커와 문서 렌더 완료를 구독하고 서버 스냅샷은 보류다", () => {
  const hook = read("components/ads/use-page-ad-decision.ts");
  assert.match(hook, /useSyncExternalStore/);
  assert.match(hook, /new MutationObserver\(onStoreChange\)/);
  assert.match(hook, /attributeFilter: \["data-ads-policy"\]/);
  assert.match(hook, /observer\.disconnect\(\)/);
  assert.match(hook, /document\.readyState === "complete"/);
  assert.match(hook, /\(\) => "unsettled"/);
  assert.match(hook, /decideAdPage\(/);
});

test("로더·슬롯은 같은 판정 훅을 쓰고 타이머로 allow 전환하지 않는다", () => {
  const loader = read("components/ads/adsense-loader.tsx");
  const slot = read("components/ads/ad-slot.tsx");
  assert.match(loader, /usePageAdDecision\(\)/);
  assert.match(slot, /usePageAdDecision\(\)/);
  assert.doesNotMatch(loader, /setTimeout|POLICY_SETTLE_MS/);
  assert.match(loader, /decision === "block" && document\.getElementById\("adsense-auto"\)/);
  assert.match(loader, /window\.location\.replace\(window\.location\.href\)/);
  assert.match(loader, /decision !== "allow"\) return null/);
});
