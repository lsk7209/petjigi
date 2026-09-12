# EVIDENCE

## Validation Level

Level: 2 (local tests/type/lint plus production compile; runtime/account proof incomplete)

## Commands Run

| Command | Result | Notes |
|---|---|---|
| harness-init.py | PASS | size=large, domain=adsense-audit, created=2026-09-12T17:17:10+09:00 |
| pnpm test | PASS | 102 passed, 0 failed; includes Vercel robots/cache header boundaries, crawler-readable rescue noindex policy, metadata-route sitemap exclusions, and blog/RSS subtitle review-claim sanitization plus the existing contracts |
| pnpm audit --prod --json | PASS | Next.js 16.2.6 baseline: 2 critical, 28 high, 32 moderate, 4 low. After Next.js 16.3.5, development-only classification for the unused-at-runtime `shadcn` CLI, and same-major patched transitive overrides: 0 critical, 0 high, 0 moderate, 0 low. |
| pnpm build | PASS | Next.js 16.3.5, disposable schema-complete local database, 72 generated pages, no deprecated Edge runtime or custom hashed-static-cache warning, next-sitemap complete; no deployment. |
| pnpm audit:seo | PASS | 0 unsafe child document-title suffixes; sitemap build-time lastmod disabled |
| pnpm audit:content | PASS | 864 records; 864 valid SHA-256 content hashes; no fabricated GSC zeros; 24 duplicate public-URL groups; 0 exact-content groups; 406 high-risk; 0 published or review-queue records without parsed sources |
| pnpm audit:sources | PASS | 36 candidate slugs; 38 matched records; 55 semantic rows and 75 static source-presence rows; 11 NEEDS_EXPERT_REVIEW |
| pnpm audit:content:gate | PASS | base HEAD; 37 changed records; 0 blockers; unchanged legacy records are audit-only |
| pnpm exec tsc --noEmit | PASS | exit 0 |
| targeted eslint | PASS | changed implementation files, exit 0 |
| pnpm lint | PASS | 0 errors, 0 warnings |
| git diff --check | PASS | no whitespace errors |
| pnpm build | PASS_LOCAL | fresh 2026-09-12 disposable local libSQL DB with real migrations; compile, TypeScript, 72-page generation and next-sitemap completed; ignored validation DB remains because deletion was denied by execution policy |
| OG image HTTP smoke | PASS_LOCAL | root OG, icon, region OG and DB-backed missing-blog fallback all returned 200 image/png after Node.js runtime migration |
| pnpm start + HTTP smoke | PASS_LOCAL | 200 home/about/listing/memorial; 307 out-of-range page; 404 missing detail |
| audit:content/sources/data/seo/ads | PASS | read-only/dry-run outputs generated |
| pnpm audit:ads | PASS | 51 unique inventory memorial URLs plus the memorial hub and static loss-care guide covered; initial-render 404 marker enforced; 0 uncovered paths; local browser transition into an excluded path unloads the script through a clean document navigation; account state remains UNKNOWN |

## Test Results

| Test | Result | Notes |
|---|---|---|

## Failed Checks

- Real production-data runtime proof remains blocked by absent authority/configuration.

## Fixes Applied

- Listing total/pagination, copy/title/review truthfulness, sitemap dates, memorial Auto ads path policy, newsletter promise, audit commands, full lint cleanup, DB-backed OpenGraph request-time fences, lazy DB loading, dynamic-route conflict repair, official-channel insurance evidence, current animal-registration guidance, legacy review-claim sanitization, authenticated review mutations with terminal-state protection, and an incremental prepublication high-risk content gate.

## Completion Evidence

- `docs/petjigi-improvement/validation-report.md`
- `docs/HANDOFF.md`
