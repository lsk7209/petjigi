# ACCEPTANCE

## Feature Criteria

| Criteria | Status | Evidence |
|---|---|---|
| Count/list filters match and total differs from page size | PASS | `lib/db-queries.ts`, 0/1/49/50/51/133 tests |
| Pagination is stable, crawlable, and self-canonical | PASS | route + `lib/business-listing.test.ts` |
| Unsupported expert badges are not inferred from YMYL | PASS | `lib/content-review.ts` and tests |
| Memorial ad exclusion covers slots and root Auto ads loader | PASS_LOCAL | `lib/ads-policy.ts`, tests, audit:ads |
| Bulk redirect/index changes remain dry-run | PASS | CSV artifacts; no external mutation |

## User Flow Criteria

| Criteria | Status | Evidence |
|---|---|---|
| Empty/invalid/out-of-range listing pages are safe | PASS | unit fixtures and redirect contract |
| Newsletter does not promise an absent PDF | PASS | form and pet-loss page copy |
| Post-change local production HTTP flow | PASS_LOCAL | disposable schema DB plus `next start` HTTP smoke |
| Post-change deployed browser flow | BLOCKED | deployment not authorized |

## Stability And Error Handling

- ETL failure-retention and license-record identity receive static regression checks.
- Full build configuration gap is explicit and no fake secret was introduced.

## Documentation Criteria

- All user-requested files exist under `docs/petjigi-improvement/`.
- Missing account/expert evidence is marked UNKNOWN/BLOCKED rather than fabricated.

## Final Report Requirements

- implementation summary
- changed files
- validation level
- commands run
- acceptance status
- known limitations
- how to run
