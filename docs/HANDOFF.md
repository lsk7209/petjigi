# Current handoff

- Timestamp: 2026-09-13 Asia/Seoul (post-main reconciliation)
- User goal: improve `petjigi.kr` quality for an AdSense review using the supplied master specification, with real local implementation and verification.
- Branch/base: `main`; PR #1 merged as `9b09ac8` and Vercel production deployment `dpl_8HQzzBkS3iSBzsYNvWhwoZLmH9tV` is Ready.
- Exact state: the scoped production `etl_sync_state` schema was applied and verified by GitHub Actions run `34705612529`; the application build for merge SHA `9b09ac8` generated 1,127 pages and is live on `petjigi.kr`. AdSense/GSC account state remains unchanged and unverified.
- Completed: shared listing COUNT/pagination/freshness behavior; self-canonical pagination; review-evidence and publication gates; title/common-copy repair; evidence-based sitemap dates; crawler-readable rescue `noindex`; metadata-route sitemap exclusions; Auto ads exclusions; newsletter contract repair and request hardening; five read-only audit commands; all required reports and dry-runs; scoped high-risk claim corrections.
- Pre-existing dirty paths at task start: `app/[sigungu]/[type]/page.tsx`, `app/advertising/page.tsx`, `app/page.tsx`, `components/content/adsense-trust-section.tsx`. They were preserved; this task intentionally also edited the listing and home files.
- Fresh validation: `pnpm test` 103/103 PASS; additional Node suites 58/58 and 5/5 PASS; `pnpm exec tsc --noEmit`, `pnpm lint`, all five quality audits, `pnpm exec drizzle-kit check`, `pnpm audit --prod`, and both staged/unstaged diff checks PASS. A schema-complete disposable local libSQL build generated 72 pages and sitemap output. Claude-assisted SEO/AdSense review found and the code now fixes Auto ads coverage for `/{sigungu}/funeral` listing/detail routes and removes duplicate robots/sitemap cache ownership.
- Evidence boundary: 864 inventory rows have deterministic hashes; unavailable GSC values remain blank. The changed-content gate passes for 37 records with 0 blockers. The source audit contains 130 unique claim rows; 11 unpublished medical drafts remain `NEEDS_EXPERT_REVIEW`. Legal entity, mailbox, and publisher/account behavior remain `UNKNOWN`.
- External side effects: pushed migration-preflight commits and merged PR #1 to main; GitHub Actions created/verified only the additive `etl_sync_state` table; Vercel Git integration deployed merge SHA `9b09ac8`. No production ETL, broad seed, email, DNS, paid API, or AdSense/GSC/CMP mutation occurred.
- Rollback: `docs/petjigi-improvement/rollback-plan.md`.
- Blockers/risks: the 26 changed published seed records still require a separate scoped atomic production update rather than broad seed execution; 11 review-queue records need qualified semantic review; Bucheon mismatched records need original jurisdiction/history review; account and operator identity evidence is unavailable.
- Deliberately not run/sent: production ETL, broad seed commands, real newsletter delivery, bulk redirect/noindex/delete, DNS or account mutations. The ignored `.tmp-validation-next/validation.db` fixture contains only disposable local validation data and is not tracked.
- Single next step: prepare the scoped rollback-backed 26-record content updater; keep the 11 review-queue records unpublished.

Detailed continuation state: `docs/petjigi-improvement/progress.md`.
