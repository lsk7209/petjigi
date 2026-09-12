import assert from "node:assert/strict";
import test from "node:test";
import { sitemapUnavailableResponse } from "./sitemap-response";

test("a sitemap data failure is not represented as an empty successful sitemap", async () => {
  const response = sitemapUnavailableResponse();

  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("retry-after"), "300");
  assert.doesNotMatch(await response.text(), /<urlset/);
});
