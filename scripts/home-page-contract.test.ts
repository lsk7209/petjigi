import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const home = fs.readFileSync("app/page.tsx", "utf8");
const footer = fs.readFileSync("components/layout/footer.tsx", "utf8");

test("home page has no newsletter or signup form", () => {
  assert.doesNotMatch(home, /SubscribeForm|home_newsletter|뉴스레터/);
  assert.doesNotMatch(home, /<form|type="email"/);
});

test("home page and footer carry no unverified counts", () => {
  assert.doesNotMatch(home, /\d[\d,]*\+/);
  assert.doesNotMatch(footer, /\d[\d,]*\+\s*(동물병원|업장|업체)/);
});

test("home page keeps canonical and links only existing top-level routes", () => {
  assert.match(home, /canonical: "\/"/);
  for (const href of home.match(/href: "\/[a-z/]+"/g) ?? []) {
    const route = href.slice(7, -1).split("/")[1];
    assert.ok(fs.existsSync(`app/${route}`), `missing route app/${route}`);
  }
});

test("home css does not override utility text colors on links", () => {
  const css = fs.readFileSync("app/home.css", "utf8");
  assert.doesNotMatch(css, /^\.hm a \{[^}]*color:\s*inherit/m);
  assert.match(css, /\.hm a:not\(\[class\*="text-"\]\)\s*\{\s*color:\s*inherit/);
});
