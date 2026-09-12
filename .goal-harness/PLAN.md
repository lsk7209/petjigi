# PLAN

## Classification

- Size: large
- Domain Profile: adsense-audit

## Phase 1

- Objective: Separate environment absence from source/build defects.
- Tasks: Create a disposable local libSQL DB, apply the real schema, run the full build.
- Expected Files: No persistent fixture DB; validation documents only.
- Completion Criteria: Full build result is attributable to code rather than missing credentials.
- Test Point: `drizzle-kit push`, `pnpm build`.
- Rollback/Recovery: Remove the disposable DB and restore generated sitemap output.

## Phase 2

- Objective: Repair runtime-only Next.js 16 failures while preserving public URLs.
- Tasks: Defer Edge OG DB imports, merge conflicting dynamic route trees, mark listing runtime dynamic.
- Expected Files: Dynamic OG routes, listing/detail route tree, regression test.
- Completion Criteria: Full build and local server start without route conflict or listing 500.
- Test Point: Unit tests, typecheck, lint, production HTTP smoke.
- Rollback/Recovery: Revert the route-tree move and request-time import changes as one local diff.

## Phase 3

- Objective: Reconcile evidence and leave no running or generated test artifacts.
- Tasks: Restore generated sitemap, stop the server, delete the disposable DB, update handoff.
- Expected Files: Harness and improvement reports.
- Completion Criteria: No listener/temp DB remains; repository checks are green.
- Test Point: Git status/diff check and process/temp-path checks.
- Rollback/Recovery: Documentation-only rollback if evidence changes.
