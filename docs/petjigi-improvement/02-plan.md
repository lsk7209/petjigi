# Implementation plan

## Phase A — baseline and reproducibility

- Capture Git/deployment/stack/data/content/ad/SEO structure.
- Reproduce priority live issues with bounded public GET/HEAD requests.
- Preserve pre-existing dirty changes and record boundaries.
- Test point: baseline commands and representative public routes recorded.
- Recovery: documentation-only changes are reversible by file removal; no external mutation.

## Phase B — shared data and presentation fixes

- Introduce a shared listing filter and paginated result contract.
- Separate total count from displayed range; validate `page` and add crawlable pagination.
- Make ordering deterministic with an ID tie-breaker.
- Add mismatch/freshness audit behavior without rewriting production data.
- Correct common Korean wording and duplicate metadata suffix.
- Test point: boundary fixtures and filter parity tests.
- Recovery: revert only the new query/presentation modules and tests.

## Phase C — content/source audit foundation

- Inventory accessible content from repository-backed source data.
- Generate claim/source audit rows for named high-risk samples.
- Keep semantic verification states separate from URL reachability.
- Add audit-only checks for review badges, category/disclaimer mapping, high-risk phrases, and missing source metadata.
- Test point: deterministic local audit commands and output schemas.
- Recovery: generated reports/scripts are additive and read-only.

## Phase D — technical SEO, ads, privacy, and UX

- Verify canonical, sitemap, robots, ads.txt, redirect, index-policy, and ad-policy behavior.
- Fix only reproduced low-risk issues; keep bulk redirect/noindex/delete as dry-run.
- Validate memorial ad exclusion, newsletter mock failure/success paths, and key navigation/accessibility.
- Test point: SEO/ad audits, build, and bounded browser/runtime smoke.
- Recovery: route/config changes remain small and individually revertible.

## Phase E — validation and handoff

- Run lint, typecheck, unit/integration, audit commands, safe build, and representative smoke checks.
- Distinguish pre-existing failures, new regressions, skipped account checks, and expert-review gaps.
- Update Goal Harness evidence, this directory, rollback plan, release checklist, and durable handoff.
- Stop condition: local safe branch is verified to the highest practical level; production remains explicitly unchanged.
