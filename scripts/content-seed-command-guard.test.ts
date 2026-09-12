import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("content-bearing package seed commands run the changed-content gate first", () => {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8")) as {
    scripts: Record<string, string>;
  };
  const contentSeedCommands = Object.entries(pkg.scripts).filter(([name]) =>
    name === "db:seed:contents" || name === "db:seed:breeds" || name.startsWith("db:seed:blog"),
  );

  assert.ok(contentSeedCommands.length > 100);
  for (const [name, command] of contentSeedCommands) {
    assert.match(command, /^pnpm audit:content:gate && /, `${name} bypasses the content gate`);
  }
});
