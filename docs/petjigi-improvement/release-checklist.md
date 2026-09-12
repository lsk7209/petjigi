# Release checklist

- [x] Dedicated local work branch used.
- [x] Pre-existing dirty work recorded and preserved.
- [x] Unit tests, typecheck, lint, build attempted and results recorded in `validation-report.md`.
- [x] Full build and local production HTTP smoke pass with a disposable schema-complete database.
- [x] `pnpm audit:content:gate` passes for the release diff; unchanged legacy gaps remain audit-only.
- [x] Count and list use one shared predicate; total and displayed range are distinct.
- [x] Page 2+ has a unique URL, self-canonical metadata, and crawlable links.
- [x] Title suffix normalization and sitemap lastmod policy covered.
- [x] Memorial local slots and global Auto ads loader are both route-blocked in code.
- [x] All 51 unique published category-6 inventory URLs and 2 static memorial paths are covered by the Auto ads exclusion test.
- [x] Admin, search, contact, privacy, terms, disclosure, advertising, and initial-render 404 screens default to no global ad script.
- [x] Rescue ETL stores attempt/success separately and does not record a mid-run failure as success.
- [x] Content sitemap returns a non-cacheable 503 on DB failure instead of an empty successful sitemap.
- [x] Package-managed content seed commands run the changed-content gate before DB writes.
- [x] Newsletter requests enforce bounded JSON parsing, normalized email input, honeypot screening, and atomic duplicate/reactivation handling without collecting IP addresses.
- [x] Next.js 16.3.5 and sharp 0.35.4 remove the two critical findings present in the prior production dependency audit.
- [x] 360/390/768/1440 browser viewport checks found no horizontal document overflow on the home page; 390px insurance and 360px search checks also passed.
- [ ] Review Bucheon mismatched records against original public-data records.
- [ ] Obtain expert review for unresolved high-risk claims.
- [ ] Verify AdSense/GSC/CMP account state with authorized operator access.
- [ ] Verify the footer legal-entity label and that the published contact mailbox is monitored.
- [ ] Run post-deployment HTTP/browser smoke checks after separately approved deployment.
- [ ] Apply `db/migrations/0005_fat_ken_ellis.sql` before deploying code that reads rescue run state.
- [ ] Confirm no production-only environment mismatch before reapplication.
- [x] `pnpm audit --prod` reports 0 findings after compatible patch constraints; no framework-major upgrade was applied.
- [x] Next.js owns `/_next/static` cache headers; API `no-store` remains explicit and covered by regression tests.
- [x] Image metadata routes use the supported Node.js default; all 8 DB-backed OG routes remain request-time dynamic and representative image responses pass local HTTP smoke.
- [x] Rescue `noindex` pages are crawlable but excluded from sitemaps; generated robots.txt does not block `/rescue`.
- [x] OpenGraph image, icon, apple-icon, and manifest endpoints are excluded from the generated document sitemap.
- [x] Blog cards and RSS sanitize legacy review-completion language from subtitles as well as metadata descriptions.
- [ ] Verify the deployed page-2 listing and `/category/memorial` canonicals after deployment; the current public deployment is stale.
- [x] Rescue `noindex` pages are crawlable but excluded from sitemaps; generated robots.txt does not block `/rescue`.
- [x] OpenGraph image, icon, apple-icon, and manifest endpoints are excluded from the generated document sitemap.
- [ ] Verify the deployed page-2 listing and `/category/memorial` canonicals after deployment; the current public deployment is stale.

## Completion boundary

- `LOCAL_COMPLETE`: repository fixes, read-only audits, required artifacts, tests, typecheck, lint, disposable-DB build, and local HTTP smoke.
- `NEEDS_HUMAN_REVIEW`: 11 unpublished medical review-queue records; sources exist, but qualified semantic review is not complete.
- `NEEDS_OPERATOR_EVIDENCE`: AdSense/GSC/CMP account state, account-level Auto ads exclusions, and client navigation behavior after the third-party script is already loaded.
- `NEEDS_PRODUCTION_AUTHORITY`: deployment, production DB correction, post-deploy browser/data smoke, push, DNS/account mutation, and any real email.

This checklist does not predict or guarantee AdSense approval.
