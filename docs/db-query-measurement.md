# R06: local database query measurement

Run `pnpm measure:db` sequentially with other e2e runs. It recreates only the repository's synthetic SQLite fixture, builds `.seo-cache/measure-build`, starts a loopback production server on 4318, and requests blog detail, business list, business detail and search API twice each. No production credentials or database are used. The script stops its server and restores only the build-generated tsconfig include paths.

Measurement is opt-in through `DB_QUERY_METRICS=1`; leave it unset in normal production. The disabled client is the original libSQL object, and the disabled page/API wrapper reads no request headers. No dependencies or schema changes are required.

## Output and interpretation

- Report: `.seo-cache/db-measure/report.json`; commit, relevant source hash, fixture hash and method are included. A source change during measurement fails the run.
- A generated hex header correlates metadata/page scopes. AsyncLocalStorage isolates concurrent scopes. The consumer aggregates hashes across both phases before counting request-wide repeated SQL signatures.
- Only SQL hashes, counts, execution durations, returned-row counts and failure counts are logged. SQL text, argument values, raw search terms, request URLs and error messages are never emitted by the metrics layer.
- `returnedRows` means rows returned by the driver. `rowsRead: null` means **unmeasured**, not zero. Batch/transaction/executeMultiple/migrate calls are marked as unmeasured operations; any nonzero value makes the query accounting incomplete.
- A repeated hash means the same normalized SQL **shape**. Parameters may differ, so it is not proof of a redundant query. No parameter values or hashes are retained to claim equivalence.
- Scope durations overlap and must not be summed as HTTP latency. `requestMs` measures response consumption separately. These are local synthetic timings and cannot establish production latency or improvement percentages.
- “First” is the first HTTP request in this process, not a guaranteed cold cache: builds and earlier local runs may warm data caches. Repeat requests share a process. Normal route-cache effects are not measured: enabling headers makes business-detail dynamic despite its normal 86400-second revalidation. Shared layout/component work outside the wrapped page/metadata functions is excluded.

## Verification and decision

Tests exercise the real in-memory libSQL/Drizzle path, concurrent scope isolation, failure counts, redaction, unsupported operations, disabled-wrapper behavior and nonfatal logging. The production-build probe proves the Next bundle shares the execution instrumentation and correlates scope IDs.

No cache TTL, publication rule, index or data change is part of this task. Optimize only after a measured signature is shown to repeat the same logical query; current signature-only evidence is insufficient. Production account/content/data-source checks remain separate in PROJECT_STATE.md.

Local storage note: because D: is nearly full, this workspace's measurement output is a junction to `C:/Users/dlatj/AppData/Local/Temp/petjigi-work-20261016/measure-build`. This is local scratch storage, not hosting configuration.
