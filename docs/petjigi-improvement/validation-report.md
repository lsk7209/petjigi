# Validation report

Checked: 2026-09-13 Asia/Seoul. This report distinguishes local code proof from production/account proof.

| Check | Result | Evidence |
| --- | --- | --- |
| Master specification | PASS | File read; SHA-256 `29EE9E04BA4AA05896E8322C3F12F350EBECBC1DDDB3CE8EF97D36D641ECF0C8` |
| Repository/service identity | PASS | GitHub remote names petjigi; config defaults and live host use `petjigi.kr`; Vercel headers observed |
| Public sample routes | PASS | `/hwaseong/boarding` and `/bucheon/sale` returned 200 before local changes |
| Redirect host/path sample | PASS | HTTP and www samples reached HTTPS apex with the path preserved and no sampled loop |
| robots/sitemaps/ads.txt response | PASS | Direct curl returned 200 for `robots.txt`, `sitemap.xml`, `sitemap-content.xml`, and `ads.txt` |
| Unit/regression tests | PASS | `pnpm test`: 103/103; additional Node suites: 58/58 and 5/5. Coverage includes regional funeral Auto ads exclusions, single-owner robots/sitemap caching, review publication integrity, crawler-policy separation, and content claims. |
| Rescue freshness tracking | PASS_LOCAL | migration `0005_fat_ken_ellis.sql` adds separate run-level attempt/success state; success advances only after every fetched page is processed, and the page displays both timestamps separately |
| Metadata title audit | PASS | `pnpm audit:seo` reports 0 unsafe child document-title suffixes; suffix-bearing child titles use `title.absolute` |
| Incremental high-risk gate | PASS | `pnpm audit:content:gate`: 37 changed records, 0 blockers; unchanged legacy gaps remain audit-only |
| TypeScript | PASS | `pnpm exec tsc --noEmit`: exit 0 before build and again after isolating the failed-build `.next` cache |
| Changed-file lint | PASS | Targeted ESLint over changed implementation files: exit 0 |
| Full lint | PASS | `pnpm lint`: 0 errors, 0 warnings |
| Production compile | PASS_LOCAL | `pnpm build` requires `TURSO_DATABASE_URL`. With the schema-complete disposable local URL set explicitly, Next.js compiled, TypeScript completed, generated 72 pages, and next-sitemap completed. Running without the required DB URL is an environment-prerequisite failure, not a deployable build configuration. |
| Full build/page-data collection | PASS_LOCAL | A schema-complete disposable local libSQL database received the real migrations; Next.js 16.3.5 compiled, generated 72 pages, and completed `next-sitemap`. The ignored `.tmp-validation-next/validation.db` fixture remains because deletion was denied by execution policy. |
| Public canonical deployment | FAIL_PRODUCTION / PASS_LOCAL | Fresh public checks found page-2 business listings canonicalizing to page 1 and `/category/memorial` canonicalizing to the site root. Local code has self-canonical pagination/category metadata with regression coverage; production was not deployed. |
| Robots/noindex and static sitemap policy | PASS_LOCAL | Rescue pages remain HTML `noindex` and excluded from sitemaps but are no longer robots-blocked locally. OpenGraph image, icon, apple-icon, and manifest routes are excluded; regenerated `sitemap-0.xml` contains none of them. |
| Sitemap outage behavior | PASS_LOCAL | DB failure helper returns HTTP 503, `Cache-Control: no-store`, and `Retry-After: 300`; it does not emit an empty successful `<urlset>` |
| Package content seed boundary | PASS_LOCAL | More than 100 `db:seed:contents`, `db:seed:blog*`, and `db:seed:breeds` package commands run `audit:content:gate` before the DB-writing command |
| Audit commands | PASS | `audit:content`, `audit:sources`, `audit:data`, `audit:seo`, `audit:ads` completed in read-only/dry-run mode |
| Auto ads route policy | PASS_LOCAL | `audit:ads` reports all 51 published category-6 inventory paths, 2 static memorial paths, and `/{sigungu}/funeral` listing/detail route families covered with 0 uncovered; admin/search/contact/trust-policy routes excluded. Account-level exclusions remain `UNKNOWN`. |
| Source audit contract | PASS | 130 rows, exactly 19 fields per row, 130 unique claim IDs; semantic and source-presence rows separated; 11 `NEEDS_EXPERT_REVIEW` |
| Content inventory contract | PASS | 864 rows, 864 deterministic SHA-256 content hashes, 0 fabricated GSC zero values; machine-only classifications require human approval |
| Duplicate inventory | PASS_AUDIT_ONLY | 24 duplicate public-URL groups, 0 cross-URL normalized-title groups, 0 exact-content-hash groups; no automatic merge/index/redirect action |
| Local production HTTP smoke | PASS_LOCAL | `next start` on port 4317: home/about/listing/memorial 200, missing detail 404, empty-result page 2 redirected 307; no production deployment |
| Real newsletter delivery | SKIPPED | No production DB write or real email authorized |
| Newsletter bot resistance | PASS_LOCAL | Form/API honeypot, exact JSON media type, 8 KiB actual streamed-body cap, normalized 254-character email limit, DB-unique atomic first signup, and single-winner reactivation are covered. No real recipient or mail provider was used; durable distributed rate limiting remains a deployment-infrastructure decision. |
| Production dependency audit | PASS | Next.js 16.2.6 baseline had 2 critical, 28 high, 32 moderate and 4 low findings. Next.js 16.3.5, development-only `shadcn`, and same-major patched transitive constraints produce 0 findings at every severity. |
| Next.js 16.3.5 build | PASS_LOCAL | Schema-complete disposable local database, TypeScript phase, warning-free 72-page generation and next-sitemap completed. Production was not deployed. |
| Image metadata Node migration | PASS_LOCAL | Removed deprecated Edge runtime declarations from 19 image metadata routes while retaining force-dynamic on 8 DB-backed routes. Local HTTP returned image/png 200 for root OG, icon, region OG, and a DB-backed blog fallback. |
| AdSense/GSC/CMP account verification | BLOCKED | No authorized account evidence; code presence is not treated as approval/account proof |
| Legal entity and contact mailbox | UNKNOWN | Repository evidence does not establish the exact legal entity or whether `contact@petjigi.kr` is monitored. A read-only DNS observation is not mailbox proof; no email was sent and no DNS change was made. |
| Public identity drift guard | PASS_LOCAL | Shared identity constants are used by footer, about, contact, privacy, disclosure, advertising, and terms pages; `audit:ads` preserves both evidence states as `UNKNOWN` pending operator proof. |
| Initial-render and post-commit 404 Auto ads policy | PASS_LOCAL | `app/not-found.tsx` emits a blocking marker; the client loader defaults closed and observes DOM policy-marker changes after navigation |
| Client navigation into excluded ad path | PASS_LOCAL | Playwright moved from the eligible home page to `/category/memorial`; the enforced clean document navigation completed with no `#adsense-auto` script in the destination DOM |
| Responsive browser checks | PASS_LOCAL | Playwright checked home at 360/390/768/1440px, insurance comparison at 390px, and search at 360px; no document-level horizontal overflow was observed, and the search input now has a programmatic label |
| Expert content sign-off | BLOCKED | Machine inventory and limited official-source checks are not veterinary/legal/insurance review |

Independent verification initially saw `.next/types/validator.ts` reference a missing generated `routes.js` after the blocked build. The generated cache was isolated and a clean TypeScript run passed, confirming this was failed-build residue rather than a source type error. The ignored `.next` cache may be regenerated or cleared before the next build attempt.

## Continuation verification

- All prior repository lint errors and warnings were resolved without adding dependencies: quote escaping, internal `Link` usage, search reset behavior, mobile table-of-contents initialization, and unused code cleanup.
- Eight DB-backed generated OpenGraph routes are explicitly request-time dynamic and covered by a static regression test.
- Their database client import is deferred until the request handler executes, preventing Edge bundle evaluation from opening the database during page-data collection.
- Next.js 16's conflicting root dynamic trees (`[sigungu]` and `[type]`) were reproduced as an all-route runtime 500. The detail route now shares `app/[sigungu]/[type]` while preserving the public `/:type/:sigungu/:slug` URL through explicit parameter interpretation.
- The listing route is explicitly dynamic, preventing `DYNAMIC_SERVER_USAGE` at runtime when pagination search parameters are read.
- A no-DB production response was deliberately not made to emit fake empty feeds, regions, or counts. The disposable database was used only as a local validation fixture and was removed after the smoke test.
- Public Bucheon sale samples confirmed address-region conflicts for Paju, Suwon, Hwaseong, and Gimpo. The UI now flags clear conflicts without guessing licensing jurisdiction or mutating records.
- Official AVMA, AAFCO, Red Cross, BSAVA, and PubMed records were used to correct three candidate articles. The claim audit records `SUPPORTED`, `PARTIAL`, and `CONTRADICTED` separately; bibliographic availability is not treated as semantic support.
- Official insurer pages were checked on 2026-09-12. Stale product names and unsupported rank, price, coverage-superiority and situation-based recommendations were removed; current official status not proven for Hanwha remains `UNVERIFIED`.
- The 2026 Ministry of Agriculture registration notice and enforcement-decree penalty table now support the revised animal-registration guidance. Registration and change-report penalties are kept distinct.
- Post-change full build passed with a disposable local schema database. The generated sitemap was restored and the disposable database removed after validation.
- Public route source is covered by a regression test that rejects unverified `전문가 검토`/`수의사 검토` claims. A presentation-boundary regression test also proves every legacy seed phrase form is removed before metadata, cards, structured data, related links, or RSS output. The emergency-preparation article has a separate category/source regression test.
- Source inventory now supports both direct arrays and `JSON.stringify([...])`, matching the actual seed storage forms. The parser correction reduced the false count from 344 to 29; scoped sources added after semantic review reduced the current parsed-source-missing count to 0. The 11 review-queue medical drafts remain unpublished and explicitly require expert review despite having source links.
- Review approval now authenticates at the server action/API mutation boundary, fails closed when `CRON_SECRET` is absent, and rejects attempts to reopen or re-approve resolved items. The analytics page uses the same guard.
- All 11 previously source-missing review-queue condition records now contain traceable authoritative sources. Sampled unsupported prevalence, success, recurrence, emergency-delay and fixed schedule claims were removed; the records remain unpublished because machine checks do not replace veterinary semantic review.

## Audit output interpretation

- `content-inventory.csv` contains 864 statically discovered seed records. It is a machine inventory, not proof that every record is currently deployed or semantically verified.
- `source-claim-audit.csv` uses the required 19-field claim schema and separates official-source observations from automatic source-presence checks. HTTP availability alone is not marked as support; 11 medical drafts remain `NEEDS_EXPERT_REVIEW`.
- `duplicate-clusters.csv`, `redirect-plan.csv`, and `index-policy-dry-run.csv` are dry-run artifacts. No bulk index or redirect change was applied.

## Operations

- Production deployment: **not performed**.
- Git push: **not performed**.
- Production DB/DNS/AdSense/GSC/CMP mutation: **not performed**.
- Paid API call or real email: **not performed**.
