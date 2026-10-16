# Checks

- `pnpm audit --json`: patched findings absent; remaining braces finding explicit.
- `pnpm test`, `pnpm lint`, `pnpm exec tsc --noEmit`.
- `pnpm test:e2e`: synthetic fixture only; build and six browser suites.
- `pnpm exec tsx scripts/audit-quality.ts content-gate --base=origin/main`.
- `pnpm exec drizzle-kit --version` and schema-only `drizzle-kit export --config=drizzle.config.ts` (no connection or database write).
- Frozen offline lockfile check and `git diff --check`.
- Remote branch tip must equal final local commit before claiming delivery.

Results and failed-run repair are in STATUS.md; raw logs are ignored under `.seo-cache/security-pr-20261016/`.
