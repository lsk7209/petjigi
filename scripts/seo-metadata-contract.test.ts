import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { findUnsafeMetadataTitleSuffixes } from "../lib/seo/metadata-audit";

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(target);
    return entry.isFile() && entry.name === "page.tsx" ? [target] : [];
  });
}

test("child metadata titles do not duplicate the root site-name template", () => {
  const findings = walk("app").flatMap((file) =>
    findUnsafeMetadataTitleSuffixes(fs.readFileSync(file, "utf8"), file)
      .map((line) => `${file}:${line}`));

  assert.deepEqual(findings, []);
});
