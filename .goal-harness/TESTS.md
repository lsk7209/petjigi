# TESTS

## Required Checks

- Run/start: `pnpm start` with disposable local DB on port 4317.
- Lint: `pnpm lint`.
- Typecheck: `pnpm exec tsc --noEmit` after the final build refresh.
- Unit tests: `pnpm test`.
- Build: `pnpm build` with a schema-complete disposable libSQL DB.
- Smoke test: HTTP status and ad-domain resource-link checks for home/about/listing/memorial/missing detail.
- Domain-specific validation: five read-only audit commands and paging/ad-policy fixtures.

## Error And Edge Cases

- Missing production credentials remain fail-closed.
- Empty listing is 200; out-of-range page redirects; missing detail is 404.
- Listing and detail dynamic segment names do not conflict in Next.js 16.

## User Scenario Tests

- Open the preserved `/hwaseong/boarding` listing URL.
- Open the preserved `/:type/:sigungu/:slug` detail shape.
- Open the memorial guide without creating an AdSense preconnect.

## Completion Checklist

- [x] Available checks have been run or marked N/A with reasons.
- [x] Failed checks have been fixed or documented as blocked.
- [x] Acceptance criteria have matching evidence.
