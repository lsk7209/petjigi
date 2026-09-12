import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { MEMORIAL_AUTO_ADS_EXCLUDED_PATHS } from "../lib/memorial-auto-ads-paths";

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const character = line[i];
    if (character === '"') {
      if (quoted && line[i + 1] === '"') {
        value += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value);
  return values;
}

test("published memorial inventory paths remain excluded from Auto ads", () => {
  const inventoryPath = path.join("docs", "petjigi-improvement", "content-inventory.csv");
  const [headerLine, ...lines] = fs.readFileSync(inventoryPath, "utf8").trim().split(/\r?\n/);
  const headers = parseCsvLine(headerLine);
  const urlIndex = headers.indexOf("url");
  const categoryIndex = headers.indexOf("category");
  const statusIndex = headers.indexOf("status");

  assert.notEqual(urlIndex, -1);
  assert.notEqual(categoryIndex, -1);
  assert.notEqual(statusIndex, -1);

  const memorialUrls = lines
    .map(parseCsvLine)
    .filter((row) => row[categoryIndex] === "6" && row[statusIndex] === "published")
    .map((row) => row[urlIndex]);

  assert.ok(memorialUrls.length > 0, "published memorial inventory must not be empty");
  for (const url of memorialUrls) {
    assert.equal(MEMORIAL_AUTO_ADS_EXCLUDED_PATHS.has(url), true, url);
  }

  assert.equal(MEMORIAL_AUTO_ADS_EXCLUDED_PATHS.has("/category/memorial"), true);
  assert.equal(MEMORIAL_AUTO_ADS_EXCLUDED_PATHS.has("/guide/pet-loss-care"), true);
});
