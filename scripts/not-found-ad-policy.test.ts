import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("not-found screen declares a DOM-level Auto ads block before the loader becomes eligible", () => {
  const notFound = fs.readFileSync("app/not-found.tsx", "utf8");
  const loader = fs.readFileSync("components/ads/adsense-loader.tsx", "utf8");

  assert.match(notFound, /data-ads-policy="block"/);
  assert.match(loader, /useSyncExternalStore/);
  assert.match(loader, /new MutationObserver\(onStoreChange\)/);
  assert.match(loader, /attributeFilter: \["data-ads-policy"\]/);
  assert.match(loader, /observer\.disconnect\(\)/);
  assert.match(loader, /!eligible && document\.getElementById\("adsense-auto"\)/);
  assert.match(loader, /window\.location\.replace\(window\.location\.href\)/);
  assert.match(loader, /\(\) => false/);
  assert.match(loader, /document\.querySelector\('\[data-ads-policy="block"\]'\)/);
  assert.match(loader, /isAutoAdsEligiblePath\(pathname, pageBlocksAds\)/);
});
