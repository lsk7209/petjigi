import assert from "node:assert/strict";
import test from "node:test";
import ts from "typescript";
import { sourceValues } from "./content-seed-parser";

function initializer(sourceText: string): ts.Expression {
  const source = ts.createSourceFile("fixture.ts", sourceText, ts.ScriptTarget.Latest, true);
  const statement = source.statements[0];
  assert.ok(ts.isVariableStatement(statement));
  const value = statement.declarationList.declarations[0].initializer;
  assert.ok(value);
  return value;
}

test("source parser supports direct and JSON-stringified seed arrays", () => {
  assert.deepEqual(sourceValues(initializer('const value = ["https://example.com/a"]')), [
    "https://example.com/a",
  ]);
  assert.deepEqual(
    sourceValues(initializer('const value = JSON.stringify(["https://example.com/b", { url: "https://example.com/c" }])')),
    ["https://example.com/b", "https://example.com/c"]
  );
});
