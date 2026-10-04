import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("app/layout.tsx relies on policy-checked AdsenseLoader rather than raw head scripts", () => {
  const layout = fs.readFileSync("app/layout.tsx", "utf8");
  assert.equal(
    layout.includes('src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'),
    false,
    "Raw adsbygoogle.js script must not be placed directly in head to prevent bypassing memorial/404 ad blocks"
  );
  assert.ok(
    layout.includes("AdsenseLoader"),
    "AdsenseLoader must be retained for route-checked ad loading"
  );
});

test("app/rescue/page.tsx links to verified existing adoption guides and shelter hub", () => {
  const rescuePage = fs.readFileSync("app/rescue/page.tsx", "utf8");
  assert.equal(rescuePage.includes("/guide/rescue-dog-adoption-guide"), false);
  assert.equal(rescuePage.includes("/shelter/seoul"), false);
  assert.ok(rescuePage.includes("/guide/dog-adoption-checklist"));
  assert.ok(rescuePage.includes("/shelter"));
});

test("app/category/[slug]/page.tsx links to dog-patellar-luxation as a guide, not a non-existent condition", () => {
  const categoryPage = fs.readFileSync("app/category/[slug]/page.tsx", "utf8");
  assert.equal(categoryPage.includes("/condition/dog-patellar-luxation"), false);
  assert.ok(categoryPage.includes("/guide/dog-patellar-luxation"));
});

test("app/breed/[species]/page.tsx guards ads when breed inventory is empty", () => {
  const breedSpeciesPage = fs.readFileSync("app/breed/[species]/page.tsx", "utf8");
  assert.ok(breedSpeciesPage.includes('data-ads-policy="block"'));
  assert.ok(breedSpeciesPage.includes("breedList.length > 0 &&"));
});

test("app/sitemap-content.xml/route.ts queries only published breeds", () => {
  const sitemapRoute = fs.readFileSync("app/sitemap-content.xml/route.ts", "utf8");
  assert.ok(sitemapRoute.includes('eq(breeds.status, "published")'));
});
