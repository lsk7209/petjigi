import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const audit = fs.readFileSync("scripts/audit-quality.ts", "utf8");

test("source audit includes every sourced review-queue condition", () => {
  for (const slug of [
    "dog-patellar-luxation-stages", "dog-patellar-luxation", "dog-heartworm-disease",
    "cat-vomiting-causes", "dog-skin-allergy-guide", "cat-kidney-disease-guide",
    "dog-separation-anxiety-disorder", "cat-urinary-tract-disease", "dog-obesity-management",
    "dog-joint-arthritis", "cat-dental-disease",
  ]) {
    assert.match(audit, new RegExp(`\\["${slug}"`));
  }
});

test("source audit separates semantic checks from automatic URL presence", () => {
  assert.match(audit, /checkedRows: checkedRows\.length/);
  assert.match(audit, /staticRows: staticRows\.length/);
  assert.match(audit, /statusCounts/);
  assert.match(audit, /URL presence is not claim support/);
});

test("source claim CSV uses the master-spec claim-level schema", () => {
  for (const field of [
    "claimId", "contentId", "exactClaim", "claimType", "sourceId", "sourceTitle", "publisher", "url",
    "publishedDate", "accessedAt", "sourceVersion", "applicableContext", "evidenceLocation", "supportStatus",
    "verificationMethod", "checkedBy", "checkedAt", "contentVersion", "notes",
  ]) {
    assert.match(audit, new RegExp(`"${field}"`));
  }
  assert.match(audit, /createHash\("sha256"\)/);
  assert.match(audit, /URL presence is not claim support/);
  assert.match(audit, /row\[13\] === status/);
  assert.doesNotMatch(audit, /row\[8\] === status/);
  assert.match(audit, /const recordKey = record\.id \?\? record\.slug/);
  assert.match(audit, /row\.length !== headers\.length/);
  assert.equal((audit.match(/NEEDS_EXPERT_REVIEW", "official_(?:page|consensus|guideline)_read/g) ?? []).length, 11);
});
