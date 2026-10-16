# Evidence — 2026-10-16

- Base: clean main 73e25ba fast-forwarded to fetched origin/main 73767e3 (169 commits). No prior local source changes.
- `pnpm install --frozen-lockfile`: PASS; matched upstream Next.js 16.3.8 and playwright-core 1.64.0. No dependency/lockfile edits.
- `pnpm test`: PASS 564/564, 0 failed (81.4s).
- `pnpm lint`: PASS before search source fixes.
- Read-only Luna/max review: historical TODOs superseded by current Git history; new browser assertions reveal likely stale-response invalidation, persistent error and missing accessible-description issues. Actual browser evidence pending.

## Environment recovery (not product defects)

1. Initial isolated build failed with Windows error 112 (D: full). Next's interrupted write left tsconfig.json empty; restored exact HEAD bytes while preserving all source changes.
2. This session's generated `.next-verify` moved to `C:/Users/dlatj/AppData/Local/Temp/petjigi-verify-20261016`, linked back through a junction. The cross-volume move followed generated dependency links, emptying local libSQL and Prettier package contents; restored libSQL from moved artifacts and exact lockfile Prettier 3.8.3 from its package archive. No source deletion.
3. Junction output requires process-local `NODE_PATH=D:/web/petjigi/node_modules` for generated CSS worker dependency resolution. Build compiles successfully with this setting.
4. Historical September `.next/types` referenced removed `app/(default)/layout`; preserved by renaming that generated directory to `.next/types-before-20261016`. No source or original generated file deleted.

No production credentials or production DB used. Production runtime is unverified.

## Final verification and review

- Output storage subsequently nested under `C:/Users/dlatj/AppData/Local/Temp/petjigi-work-20261016/.next-verify`, with parent node_modules junction to the project's dependencies, because ESM external imports do not use NODE_PATH. Final build succeeds. These local generated paths are ignored; no hosting changes.
- Baseline full runner: production build PASS (124 generated pages); ads-decision 12/12, smoke 55/55, content-claims 5/5, core-guides 29/29, site-value 25/25. Search deliberately exposed 4 failures: clear/edit stale responses, uncleared error, dangling aria-describedby. Expanded baseline search 6/10 (including unmount/mobile cases); full runner correctly exited nonzero.
- Repair: increment request generation synchronously on input and search execution; check aborted signal on response/error/finally; clear previous error/loading on edit; keep help paragraph mounted. No API, publication, URL, analytics payload or ads-policy changes.
- Final focused verification: rebuilt production output from repaired source, then `node tests/e2e/search.mjs`: PASS 10/10, exit 0. New cases cover clear, edit during debounce, reverse completion, error recovery, Enter submission, accessible description, unmount with no late telemetry, and long-result/menu checks at 360/390/768/1440. Screenshots captured and 390px result screenshot visually inspected.
- `pnpm test`: 564/564, no failures (82.8s on repeated run). Full `pnpm lint` exit 0 with no warnings; `pnpm exec tsc --noEmit` exit 0. `git diff --check` passes. `tsconfig.json` has no final diff; no listeners remain on test ports 3194–3199.
- Full six-suite runner was not rerun after the final search-only source repair. Existing 126 checks are pre-fix-build evidence; final 10 search checks and production build are post-fix evidence. No live/production verification inferred.
- Read-only Luna/max reviewer identified the four issues and noted absent unmount/result-layout proof; those cases were added. Main agent owns implementation and command evidence. One intermediate cleanup-ref implementation produced a lint warning; replaced with aborted-signal checks and cleanly reverified. Model cost/tokens unmeasured.
- Raw logs and four screenshots: `output/playwright/resume-20261016/`. Changes are uncommitted; no push/deploy.

## Further user-authorized continuation (supersedes focused-only status above)

- Complete runner after search repair PASS 136/136.
- R06 implemented per CODEX_HANDOFF section D. Initial unit run found four SSR fixture failures from eager Node imports in the disabled wrapper; lazy imports behind the opt-in flag fixed the cause without weakening tests. Full unit rerun PASS 567/567 (76.7s); clean full lint and final typecheck exit 0.
- `pnpm measure:db` PASS: synthetic SQLite, production build/start, eight first/repeat samples, correlated metadata/page reports, no unsupported operations. Final source hash: be44e43d66821d25769446bb020c18c8dd3a91ab824cc7d4a6af21edfc145d41. Warm-cache query counts: blog 5/5, list 0/0, detail 4/4, search 3/0. Normal detail route caching, rows_read and production performance remain unmeasured. No index/cache TTL or optimization change.
- A preliminary measurement ran during source refinement and is not used for conclusions. Final rerun has a stable-source guard. Sanitized report: docs/db-query-measurement-20261016.json.
- Default production build and all six browser suites after R06 PASS 136/136 (12+55+5+29+25+10), exit 0 in r06-full-e2e.log. Final seed-only text corrections afterward were separately gated/linted; browser fixture bodies were not rebuilt again.
- Primary ASPCA/ACVS pages checked live; two narrow local seed corrections written directly in this session. Initial --base=HEAD gate saw zero committed records and is not counted. Local gate found an untracked time claim after toxic-food YMYL classification was fixed; removed unsafe delay/unsupported onset wording instead of weakening the gate. Final content gate: 2 records, 0 blockers. Status/publication/reviewer evidence preserved; no live application.
- Final read-only Luna/max instrumentation review: no substantiated BLOCKER/HIGH. Scope/cache/timing/privacy limits documented. Broader medical/legal review is incomplete.
- Delivery target: codex/search-db-metrics-20261016; GitHub push only, no main merge/hosting mutation. Raw delivery output retained locally after execution.

## GitHub delivery

- Code/docs commit faa169157a7028c59ade2216aef103fc1bed1770 pushed to origin/codex/search-db-metrics-20261016; git ls-remote returned the same SHA. Tracked working tree clean afterward; only output/playwright remained untracked (local logs/screenshots).
- Existing default-branch security alerts from GitHub API: #100 braces high <=3.0.3, no patched version listed; #101 postcss-selector-parser medium <7.1.6; #1 esbuild development-only medium <=0.24.2. `pnpm why --prod` resolves braces via next-sitemap/fast-glob/micromatch and selector-parser via typography. These preexisting dependency alerts were not introduced/resolved by this change; no unsupported exploitability assessment is made.
- Prior generated gate CSV preserved at its HEAD version; this session's two-record result saved separately as docs/audits/content-gate-20261016.csv.
- Final typecheck and staged diff check passed; local test ports have no listeners. Documentation-only delivery checkpoint follows the code commit on the same branch.
