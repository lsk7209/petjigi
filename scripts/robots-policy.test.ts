import { test } from "node:test";
import assert from "node:assert/strict";
import config from "../next-sitemap.config.js";

interface RobotsPolicy {
  userAgent: string;
  allow?: string | string[];
  disallow?: string | string[];
}

function policies(): RobotsPolicy[] {
  const options = config.robotsTxtOptions;
  if (!options) throw new Error("robotsTxtOptions is not configured");
  return options.policies as RobotsPolicy[];
}

function disallowsOf(policy: RobotsPolicy): string[] {
  if (!policy.disallow) return [];
  return Array.isArray(policy.disallow) ? policy.disallow : [policy.disallow];
}

test("every declared bot group shares the /admin/ disallow (Google does not merge groups)", () => {
  const all = policies();
  assert.ok(all.length > 1, "expected multiple bot-specific groups to check");
  for (const p of all) {
    const disallows = disallowsOf(p);
    assert.ok(
      disallows.some((d) => d.startsWith("/admin")),
      `user-agent "${p.userAgent}" does not disallow /admin/ — admin routes must not rely on robots alone, but every group must still declare it`
    );
  }
});

test("every declared bot group shares the /api/ disallow", () => {
  const all = policies();
  for (const p of all) {
    const disallows = disallowsOf(p);
    assert.ok(
      disallows.some((d) => d.startsWith("/api")),
      `user-agent "${p.userAgent}" does not disallow /api/`
    );
  }
});

test("/search is crawlable (not disallowed) for every bot group so the HTML noindex can be read", () => {
  const all = policies();
  for (const p of all) {
    const disallows = disallowsOf(p);
    assert.ok(
      !disallows.some((d) => d.startsWith("/search")),
      `user-agent "${p.userAgent}" disallows /search, which conflicts with relying on HTML noindex for that page`
    );
  }
});

test("wildcard group and named bot groups do not silently diverge in scope", () => {
  const all = policies();
  const wildcard = all.find((p) => p.userAgent === "*");
  assert.ok(wildcard, "expected a '*' policy group to exist");
  const wildcardDisallows = new Set(disallowsOf(wildcard!));
  for (const p of all) {
    if (p.userAgent === "*") continue;
    const disallows = new Set(disallowsOf(p));
    for (const d of wildcardDisallows) {
      assert.ok(
        disallows.has(d),
        `user-agent "${p.userAgent}" is missing shared restriction "${d}" that the '*' group declares`
      );
    }
  }
});
