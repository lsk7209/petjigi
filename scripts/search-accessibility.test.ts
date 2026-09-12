import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("search input has a programmatic label and announced status/error states", () => {
  const source = fs.readFileSync("app/search/search-client.tsx", "utf8");

  assert.match(source, /<label htmlFor="site-search"/);
  assert.match(source, /id="site-search"/);
  assert.match(source, /aria-describedby="site-search-help"/);
  assert.match(source, /role="status"/);
  assert.match(source, /role="alert"/);
});
