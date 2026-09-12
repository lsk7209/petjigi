import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

function read(file: string): string {
  return fs.readFileSync(path.join(process.cwd(), file), "utf8");
}

test("public condition surfaces require published status", () => {
  for (const file of [
    "lib/db-queries.ts",
    "app/condition/[slug]/page.tsx",
    "app/condition/[slug]/opengraph-image.tsx",
    "app/sitemap-content.xml/route.ts",
    "app/feed.xml/route.ts",
    "app/api/search/route.ts",
  ]) {
    assert.match(read(file), /eq\(contents\.status, "published"\)/, `${file} must filter publication status`);
  }
});

test("both review approval paths apply the runtime content quality gate", () => {
  const action = read("app/admin/review-queue/actions.ts");
  const api = read("app/api/review-queue/[id]/route.ts");
  assert.match(action, /evaluatePublicationCandidate\(content\)/);
  assert.match(api, /evaluatePublicationCandidate\(approvedContent\)/);
  assert.match(api, /status: 409/);
});

test("review mutations authenticate at the mutation boundary and reject invalid transitions", () => {
  const action = read("app/admin/review-queue/actions.ts");
  const page = read("app/admin/review-queue/page.tsx");
  const api = read("app/api/review-queue/[id]/route.ts");
  assert.match(action, /assertAuthorized\(key\)/);
  assert.match(action, /canResolveReview\(item\.status\)/);
  assert.match(page, /approveContent\.bind\(null, id, adminKey\)/);
  assert.match(page, /rejectContent\.bind\(null, id, adminKey\)/);
  assert.match(api, /isValidAdminSecret/);
  assert.match(api, /canTransitionReview\(existing\.status/);
});

test("admin review and analytics pages both fail closed behind the configured secret", () => {
  const reviewPage = read("app/admin/review-queue/page.tsx");
  const analyticsPage = read("app/admin/analytics/page.tsx");
  assert.match(reviewPage, /isValidAdminSecret\(key\)/);
  assert.match(analyticsPage, /isValidAdminSecret\(key\)/);
  assert.match(reviewPage, /\/admin\/analytics\?key=/);
  assert.match(analyticsPage, /\/admin\/review-queue\?key=/);
});

test("review API builds the published URL from the actual content type", () => {
  const api = read("app/api/review-queue/[id]/route.ts");
  assert.match(api, /content\.type === "blog"/);
  assert.match(api, /content\.type === "condition"/);
  assert.match(api, /\${pathPrefix}\/\${content\.slug}/);
  assert.doesNotMatch(api, /content\.type === "guide"[\s\S]{0,120}: `\${SITE_URL}\/guide\/\${content\.slug}`/);
});
