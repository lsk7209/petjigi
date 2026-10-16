# Tests

- pnpm test
- pnpm exec tsc --noEmit
- pnpm lint
- pnpm test:e2e (synthetic SQLite, .next-verify, local Chrome; no production credentials)
- New search cases: delayed responses after query change/clear, reverse response order, error recovery, Enter submit, accessible description, mobile menu Escape/focus, viewport overflow/screenshots.

Continuation results: full unit 567/567; full browser 136/136 after R06; clean lint/typecheck; `pnpm measure:db` eight synthetic samples; final content gate 2/0 and seed lint. Metrics tests exercise actual ORM calls, concurrent scopes, redaction, unsupported batch, disabled wrapper and sink failure. Final seed-only wording is separately gated/linted; no extra unrelated browser rebuild.
