import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const reportDir = path.join("docs", "petjigi-improvement");

const requiredArtifacts = [
  "00-baseline.md",
  "01-findings.md",
  "02-plan.md",
  "progress.md",
  "content-inventory.csv",
  "source-claim-audit.csv",
  "data-quality-findings.csv",
  "duplicate-clusters.csv",
  "redirect-plan.csv",
  "index-policy-dry-run.csv",
  "validation-report.md",
  "rollback-plan.md",
  "operator-decisions.md",
  "release-checklist.md",
];

function header(filename: string): string {
  return fs.readFileSync(path.join(reportDir, filename), "utf8").split(/\r?\n/, 1)[0];
}

test("all master-spec improvement artifacts exist", () => {
  for (const filename of requiredArtifacts) {
    assert.equal(fs.existsSync(path.join(reportDir, filename)), true, filename);
  }
});

test("master-spec CSV contracts remain stable", () => {
  assert.equal(
    header("content-inventory.csv"),
    "content_id,url,type,title,category,status,published_at,updated_at,content_hash,source_count,review_state,primary_intent,gsc_clicks,gsc_impressions,gsc_window,gsc_available,proposed_action,reason,evidence,approval_needed",
  );
  assert.equal(
    header("source-claim-audit.csv"),
    "claimId,contentId,exactClaim,claimType,sourceId,sourceTitle,publisher,url,publishedDate,accessedAt,sourceVersion,applicableContext,evidenceLocation,supportStatus,verificationMethod,checkedBy,checkedAt,contentVersion,notes",
  );
  assert.equal(
    header("redirect-plan.csv"),
    "old_url,new_url,reason,unique_content_preserved,evidence,approval_status,rollback",
  );
  assert.equal(
    header("duplicate-clusters.csv"),
    "cluster_id,topic,urls,classification,reason,evidence_status,recommended_action,approval_required",
  );
});

test("empty redirect plan is explicitly approval-gated template data", () => {
  const plan = fs.readFileSync(path.join(reportDir, "redirect-plan.csv"), "utf8");
  assert.match(plan, /TEMPLATE_ONLY/);
  assert.match(plan, /NEEDS_APPROVAL/);
});

test("content inventory records a reproducible hash and requires human approval", () => {
  const audit = fs.readFileSync(path.join("scripts", "audit-quality.ts"), "utf8");
  assert.match(audit, /`sha256:\$\{createHash\("sha256"\)/);
  assert.doesNotMatch(audit, /"not_computed", r\.sourceCount/);
  assert.match(audit, /r\.file, true/);
});

test("duplicate audit scans URL, normalized title, and exact content hash separately", () => {
  const audit = fs.readFileSync(path.join("scripts", "audit-quality.ts"), "utf8");
  assert.match(audit, /const duplicateUrlRows = groups\(publicUrl\)/);
  assert.match(audit, /const duplicateTitleRows = groups/);
  assert.match(audit, /const exactContentRows = groups\(contentVersion\)/);
  assert.match(audit, /title equality does not prove equivalent content or intent/);
});
