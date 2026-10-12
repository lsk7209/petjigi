import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import test from "node:test";
import ts from "typescript";

const manifest = JSON.parse(fs.readFileSync("docs/link-repair-manifest-20261012.json", "utf8"));
const hash = (text: string) => createHash("sha256").update(text).digest("hex");
const text = (node: ts.Expression | undefined) => node && ts.isStringLiteralLike(node) ? node.text : null;
const records: { file: string; id: string | null; slug: string | null; body: string }[] = [];
for (const file of fs.readdirSync("db/seeds").filter(name => name.endsWith(".ts"))) {
  const source = ts.createSourceFile(file, fs.readFileSync(path.join("db/seeds", file), "utf8"), ts.ScriptTarget.Latest, true);
  const visit = (node: ts.Node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map(prop => [prop.name.getText(source), prop.initializer]));
      const body = text(props.get("body"));
      if (body && text(props.get("slug"))) records.push({ file: `db/seeds/${file}`, id: text(props.get("id")), slug: text(props.get("slug")), body });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}

test("all 46 retired broken targets stay absent from every seeded body anchor", () => {
  assert.equal(manifest.mappings.length, 46);
  const bad = new Set(manifest.mappings.map((mapping: { from: string }) => mapping.from));
  for (const record of records) {
    for (const match of record.body.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi)) {
      const target = new URL(match[2], "https://petjigi.kr");
      if (target.hostname === "petjigi.kr") assert.ok(!bad.has(target.pathname), `${record.id}: ${target.pathname}`);
    }
  }
});

test("reviewed link edits retain anchor text and restrict editable fields", () => {
  let replacements = 0;
  for (const entry of manifest.entries) {
    assert.ok(entry.changedFields.includes("body"));
    assert.ok(entry.changedFields.every((field: string) => ["body", "disclaimer"].includes(field)));
    const matches = records.filter(record => record.file === entry.file && record.id === entry.id && record.slug === entry.slug);
    assert.equal(matches.length, 1, entry.id);
    assert.equal(hash(matches[0].body), entry.bodyAfterSha256, entry.id);
    assert.equal(hash(matches[0].body.replace(/<a\b[^>]*>|<\/a>/gi, "")), entry.bodyTextSha256, entry.id);
    for (const replacement of entry.replacements) {
      const mapping = manifest.mappings.find((item: { from: string }) => item.from === replacement.from);
      assert.ok(mapping, replacement.from);
      assert.ok(replacement.linkText);
      if (replacement.to === null) {
        assert.equal(replacement.action, "unlink");
        assert.ok(replacement.reason);
      } else {
        assert.ok(mapping.destinations.includes(replacement.to), replacement.to);
        assert.ok(!manifest.mappings.some((item: { from: string }) => item.from === replacement.to));
        assert.ok(replacement.publishedTitle);
      }
      replacements++;
    }
  }
  assert.equal(replacements, manifest.repairedAnchorCount);
});
