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
  const helper = read("lib/review-queue.ts");
  assert.match(action, /approveReviewQueueItem\(id\)/);
  assert.match(api, /approveReviewQueueItem\(id,/);
  assert.match(helper, /validateEeat\(/);
  assert.match(helper, /scanProhibitedKeywords\(/);
  assert.match(helper, /ReviewApprovalError\("Review queue item is already resolved", 409\)/);
});

test("review mutations authenticate at the mutation boundary and reject invalid transitions", () => {
  const action = read("app/admin/review-queue/actions.ts");
  const page = read("app/admin/review-queue/page.tsx");
  const api = read("app/api/review-queue/[id]/route.ts");
  assert.match(action, /requireReviewFormKey\(formData\)/);
  assert.match(page, /approveContent\.bind\(null, id\)/);
  assert.match(page, /rejectContent\.bind\(null, id\)/);
  assert.match(api, /isReviewRequestAuthorized\(req\.headers\)/);
  assert.match(read("lib/review-queue.ts"), /\["pending", "in_review"\]\.includes\(item\.status\)/);
});

test("admin review and analytics pages both fail closed behind the configured secret", () => {
  const reviewPage = read("app/admin/review-queue/page.tsx");
  const analyticsPage = read("app/admin/analytics/page.tsx");
  assert.match(reviewPage, /isReviewKeyAuthorized\(key\)/);
  assert.match(analyticsPage, /isValidAdminSecret\(key\)/);
  assert.match(reviewPage, /href="\/admin\/analytics"/);
  assert.match(analyticsPage, /\/admin\/review-queue\?key=/);
});

test("review API builds the published URL from the actual content type", () => {
  const helper = read("lib/review-queue.ts");
  assert.match(helper, /path: `\/\${content\.type}\/\${encodeURIComponent\(content\.slug\)}`/);
  assert.match(helper, /\["guide", "blog", "condition"\]\.includes\(content\.type\)/);
});
