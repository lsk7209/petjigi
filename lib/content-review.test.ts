import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";
import {
  hasDisplayableEditorialReview,
  withoutUnverifiedReviewClaim,
} from "./content-review";

test("editorial review display requires both reviewer and date", () => {
  assert.equal(hasDisplayableEditorialReview({}), false);
  assert.equal(hasDisplayableEditorialReview({ reviewedAt: "2026-01-01" }), false);
  assert.equal(hasDisplayableEditorialReview({ reviewerName: "편집팀" }), false);
  assert.equal(
    hasDisplayableEditorialReview({ reviewedAt: "2026-01-01", reviewerName: "편집팀" }),
    true
  );
});

test("legacy metadata cannot expose unsupported expert-review claims", () => {
  assert.equal(
    withoutUnverifiedReviewClaim("강아지 외이염 | 수의사 검토 | 펫지기"),
    "강아지 외이염 | 펫지기"
  );
  assert.equal(
    withoutUnverifiedReviewClaim("증상과 치료를 수의사 검토를 거쳐 안내합니다."),
    "증상과 치료를 안내합니다."
  );
  assert.equal(
    withoutUnverifiedReviewClaim("관리법을 전문가 검토 자료를 바탕으로 안내합니다."),
    "관리법을 안내합니다."
  );
  assert.equal(withoutUnverifiedReviewClaim(null), undefined);
});

function collectTypeScriptFiles(root: string): string[] {
  const files: string[] = [];
  const visit = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const target = path.join(dir, entry.name);
      if (entry.isDirectory()) visit(target);
      else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) files.push(target);
    }
  };
  visit(root);
  return files;
}

test("public route source does not claim unverified expert or veterinary review", () => {
  const files = collectTypeScriptFiles(path.join(process.cwd(), "app"));
  const source = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");
  assert.equal(/전문가 검토|수의사 검토|의료진 검토/.test(source), false);
});

test("every legacy seed review phrase is handled by the presentation sanitizer", () => {
  const files = collectTypeScriptFiles(path.join(process.cwd(), "db", "seeds"));
  const claimLines = files.flatMap((file) =>
    fs
      .readFileSync(file, "utf8")
      .split(/\r?\n/)
      .filter((line) => /전문가 검토|수의사 검토|의료진 검토/.test(line))
  );

  assert.ok(claimLines.length > 0, "fixture should exercise legacy review claims");
  for (const line of claimLines) {
    assert.equal(
      /전문가 검토|수의사 검토|의료진 검토/.test(withoutUnverifiedReviewClaim(line) ?? ""),
      false,
      line
    );
  }
});

test("blog cards and RSS sanitize subtitle before falling back to metadata", () => {
  const blog = fs.readFileSync(path.join(process.cwd(), "app", "blog", "page.tsx"), "utf8");
  const feed = fs.readFileSync(path.join(process.cwd(), "app", "feed.xml", "route.ts"), "utf8");

  assert.match(blog, /withoutUnverifiedReviewClaim\(post\.subtitle \?\? post\.metaDescription\)/);
  assert.match(feed, /withoutUnverifiedReviewClaim\(p\.subtitle \?\? p\.metaDescription\)/);
  assert.doesNotMatch(blog, /post\.subtitle \|\| withoutUnverifiedReviewClaim/);
  assert.doesNotMatch(feed, /p\.subtitle \?\? withoutUnverifiedReviewClaim/);
});
