# Plan

1. Synchronize clean local main, inspect current audit and existing e2e infrastructure (complete).
2. Add behavioral search/mobile browser checks to existing isolated e2e suite; reproduce and repair any failures.
3. Run unit/type/lint and isolated production build/browser suites. Capture viewport evidence.
4. Review changes and update PROJECT_STATE.md and evidence. Preserve historical records.

## User-authorized continuation

5. Run the complete existing browser suite after search repair.
6. Implement R06 per CODEX_HANDOFF section D: opt-in libSQL execution metrics, request/phase scopes for four targets, private-data-free reports, fixture first/repeat measurement script. Default behavior unchanged. Count unsupported execution modes and mark rows_read unmeasured.
7. Validate metrics concurrency/privacy/error behavior, default build/e2e, and measured production build/start. Optimize only if real evidence warrants it.
8. Review and commit scoped source/docs after checks; push only GitHub, respecting the deployment boundary. Keep production/account gaps explicit.

Rollback: revert only this session's source/test/document diff; fixture data is local and ignored.
