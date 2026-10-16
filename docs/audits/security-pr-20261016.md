# Dependency security and PR review, 2026-10-16

## Scope and findings

Local code and dependency review only. No production database writes, seeding, hosting operations, or main merge. Existing review branch was synchronized at `2bec3a2`; the user completed that push.

Initial `pnpm audit --json`: 1 high, 2 moderate. Scoped overrides replace typography's selector parser 6.0.10 with 7.1.6 and esbuild-kit's esbuild 0.18.20 with 0.25.12. The lockfile removes the obsolete esbuild platform packages; no broad package update was requested. Both overrides cross upstream dependency ranges, so build and tool compatibility are explicitly checked. Rollback: revert these package/lockfile changes together.

| Advisory | Assessment |
|---|---|
| [PostCSS parser GHSA-rj75-hqrm-r3gf](https://github.com/postcss/postcss-selector-parser/security/advisories/GHSA-rj75-hqrm-r3gf) | Fixed dependency version 7.1.6. Used by the typography build plugin in app/globals.css. |
| [esbuild GHSA-67mh-4wv8-2f99](https://github.com/evanw/esbuild/security/advisories/GHSA-67mh-4wv8-2f99) | Fixed dependency version 0.25.12. Old copy was under development-only drizzle-kit/esbuild-kit; no esbuild serve entry point found in project code. |
| [braces GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) | Remains high in package audit. No patched version listed as of this check. Paths: next-sitemap/fast-glob/micromatch, Next ESLint, and shadcn. No app/lib request-handler imports found. next-sitemap's manifest parser invokes fast-glob for static export only, using a configured build directory; this project does not set output=export. This is a bounded source review, not proof of all production reachability. Do not dismiss the advisory or claim zero vulnerabilities. Reassess if adding untrusted glob patterns or updating these tools. |

GitHub API at review time showed open alerts #100 (braces) and #101 (selector parser); the earlier push banner reported three default-branch findings. Local audit results and default-branch alert state are separate. Fixes on a review branch do not establish default-branch resolution.

## Regression repair and evidence clarification

The first full unit run passed 566/567; `scripts/link-repair-contract.test.ts` failed because the source correction in cea9e71 changed blog-245's prose without refreshing its link manifest hashes. Both repaired links still point to the expected grain-free and skin-care guides. Updated only that entry's current body/text hashes and preserved both prior hashes with a source-followup reference. The historical production manifest is unchanged. Focused link contracts then passed 2/2.

The query measurement artifact recorded HEAD before the instrumentation was committed. Added an explicit commitContext; recomputing the eight-file source hash still returns `be44e43d66821d25769446bb020c18c8dd3a91ab824cc7d4a6af21edfc145d41`. No timings were rerun or relabeled as production measurements.

## Validation

Raw local logs: `.seo-cache/security-pr-20261016/` (ignored). Final outcomes are in `.goal-harness/security-pr-20261016/STATUS.md`.

Remaining operational gates: qualified medical/legal review, approved production reconciliation, AdSense/operator verification and production runtime proof. Preserved seed publication fields do not authorize executing a production seed command.
