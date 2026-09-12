# Findings

Allowed states: `CONFIRMED`, `PARTIALLY_CONFIRMED`, `NOT_REPRODUCED`, `UNKNOWN`, `FIXED`, `BLOCKED`.

## DATA-01 — listing count is page length

- priority: P0
- status: FIXED
- affected_urls: `/hwaseong/boarding`, `/bucheon/sale`, other `/{sigungu}/{type}` listings
- affected_files: `lib/db-queries.ts`, `app/[sigungu]/[type]/page.tsx`
- observation: the data query has a hard limit of 50 and the page uses the returned array length in the summary and FAQ.
- reproduction_steps: inspect the query and compare the live 50-row page wording with the implementation.
- root_cause: there is no separate count query or pagination contract; the current-page array is treated as the total.
- evidence: `getCachedBusinessListing(...).limit(50)` and page wording derived from `businessList.length`.
- proposed_fix: one shared filter/query contract returning `items`, `totalCount`, stable pagination fields, and freshness metadata when available.
- regression_test: 0/1/49/50/51/133 fixtures; invalid page; stable ordering; no duplicates/omissions; count/list filter parity.
- approval_needed: no for local code/tests; production rollout remains unapproved.

## DATA-02 — non-Bucheon addresses in Bucheon sale listing

- priority: P0
- status: PARTIALLY_CONFIRMED
- affected_urls: `/bucheon/sale`
- affected_files: `etl/localdata/*`, `db/schema/businesses.ts`, listing query path
- observation: current public output includes Paju, Suwon, Hwaseong, Gimpo, and Yangju addresses.
- reproduction_steps: retrieve the current public page and inspect visible address text.
- root_cause: UNKNOWN. The listing query filters `addressSigungu = '부천시'`, so stored normalized region and visible raw address disagree for sampled rows. Licensing jurisdiction, relocation, source error, or mapping logic still require record-level evidence.
- evidence: current public page plus exact query predicate.
- proposed_fix: add a read-only mismatch audit and keep ambiguous records for review; do not infer or rewrite addresses.
- regression_test: foreign-region fixture, licensing-jurisdiction fixture, relocation fixture, multiple-license fixture.
- approval_needed: production data correction or bulk reclassification requires dry-run review and approval.

## DATA-03 — scheduled rescue sync presented as completed refresh

- priority: P1
- status: FIXED
- affected_urls: `/rescue`
- affected_files: `lib/db-queries.ts`, `app/rescue/page.tsx`, `scripts/rescue-freshness-contract.test.ts`
- observation: the page stated `매일 05:00 갱신`, although repository evidence proves a schedule but not that every run succeeds.
- reproduction_steps: compare the page copy with `vercel.json`, the GitHub Actions schedule, and the ETL's row-by-row `lastSyncedAt` updates; inject a page-2 failure after page 1 writes.
- root_cause: scheduled collection frequency and successful collection state were represented as the same fact, while a row timestamp could advance before the complete paged run succeeded.
- evidence: daily 20:00 UTC schedules exist; the former maximum row timestamp could describe a partial import rather than a completed run.
- proposed_fix: persist run-level attempt and success timestamps separately, advance success only after all fetched pages are processed, and display both timestamps plus per-record notice dates.
- regression_test: `lib/etl/paged-import.test.ts` proves an injected mid-run failure cannot reach success recording; `scripts/rescue-freshness-contract.test.ts` and `pnpm audit:data` cover the storage/display contract.
- approval_needed: production migration `0005_fat_ken_ellis.sql` must be applied before deploying the new query; production job history remains an operator evidence item.

## TEMPLATE-01 — Korean particle errors

- priority: P1
- status: FIXED
- affected_urls: region listing FAQ/summary pages
- affected_files: `app/[sigungu]/[type]/page.tsx`
- observation: live text includes `펫호텔는`; templates also risk `브리더이`-style output.
- reproduction_steps: open `/hwaseong/boarding` and inspect the region summary.
- root_cause: labels are concatenated with fixed particles.
- proposed_fix: shared tested Korean-particle helper or particle-neutral wording.
- regression_test: representative labels with/without final consonants.
- approval_needed: no.

## SEO-01 — duplicate site title

- priority: P1
- status: FIXED
- affected_urls: child routes using an explicit `| 펫지기` document-title suffix
- affected_files: root metadata, static metadata exports, per-page `generateMetadata`, `lib/seo/metadata-audit.ts`
- observation: live title is `화성시 펫호텔 | 펫지기 | 펫지기`.
- reproduction_steps: retrieve live HTML/title.
- root_cause: child titles already contain the site suffix while the root metadata template appends it again.
- proposed_fix: suffix-bearing child document titles use `title.absolute`, while suffix-free child titles continue to use the root template; Open Graph titles remain explicit.
- regression_test: `scripts/seo-metadata-contract.test.ts` scans every page metadata root; `pnpm audit:seo` reports 0 unsafe child suffixes.
- approval_needed: no.

## SEO-02 — generated sitemap lastmod uses build time

- priority: P1
- status: FIXED
- affected_urls: static sitemap entries
- affected_files: `next-sitemap.config.js`
- observation: transform assigns `new Date()` to every route.
- reproduction_steps: inspect sitemap transform.
- root_cause: generated current time is used without content change evidence.
- proposed_fix: omit unsupported `lastmod`; retain DB-backed dates in `sitemap-content.xml`.
- regression_test: audit generated configuration/output.
- approval_needed: no.

## ADS-01 — memorial Auto ads exclusion mismatch

- priority: P0
- status: FIXED
- affected_urls: 51 published category-6 content URLs, `/category/memorial`, `/guide/pet-loss-care`
- affected_files: `lib/ads-policy.ts`, `lib/memorial-auto-ads-paths.ts`, `components/ads/adsense-loader.tsx`, `scripts/memorial-auto-ads-coverage.test.ts`
- observation: local slots are category-blocked, but the global AdSense Auto ads loader is mounted in the root layout for all routes.
- reproduction_steps: inspect layout hierarchy and loader placement.
- root_cause: slot policy and global loader policy are separate but only the slot policy is route-aware.
- proposed_fix: keep ownership verification metadata intact while excluding every inventoried memorial URL and the static memorial routes from the global loader.
- regression_test: `pnpm audit:ads` and inventory-backed coverage test; 53/53 memorial paths covered, 0 uncovered.
- approval_needed: local implementation no; AdSense account Auto ads page exclusions remain MANUAL/UNKNOWN.

## ADS-02 — Auto ads on operational and trust screens

- priority: P1
- status: FIXED
- affected_urls: `/admin/**`, `/search`, `/contact`, `/privacy`, `/terms`, `/disclosure`, `/advertising`
- affected_files: `lib/ads-policy.ts`, `lib/ads-policy.test.ts`
- observation: the root Auto ads loader previously allowed these non-content/action or trust-policy screens.
- reproduction_steps: call `isAutoAdsEligiblePath` with representative paths.
- root_cause: only the memorial category prefix had a global-loader exclusion.
- proposed_fix: exact exclusions for public operational/trust routes and a prefix exclusion for admin routes.
- regression_test: `pnpm test`; representative routes are asserted ineligible.
- approval_needed: no for the initial-render code fix. Client navigation after the AdSense script was already loaded still depends on account/runtime behavior and remains UNKNOWN.

## TECH-01 — canonical host and static files

- priority: P1
- status: PARTIALLY_CONFIRMED
- affected_urls: apex/www/http, robots, sitemaps, ads.txt
- affected_files: Vercel/domain config, `public/*`, sitemap code
- observation: fresh public checks retrieve all named static endpoints and preserve path/query through HTTP and www redirects. The deployed page-2 listing URLs still canonicalize to page 1, and `/category/memorial` canonicalizes to the site root. The deployed robots file also blocks `/rescue/` even though those pages emit HTML `noindex`, while the generated static sitemap listed image-metadata and manifest endpoints as documents.
- root_cause: the public deployment predates the local self-canonical pagination/category metadata fixes; crawler policy also conflated sitemap exclusion with robots blocking, and next-sitemap route discovery included metadata endpoints by default.
- proposed_fix: retain the verified host redirects; deploy the existing local canonical fixes after review. Locally, keep rescue pages out of the sitemap while allowing crawlers to read their `noindex`, and exclude OpenGraph image, icon, apple-icon, and manifest endpoints from document sitemaps.
- regression_test: bounded public HTTP/canonical matrix, `scripts/sitemap-policy.test.ts`, regenerated sitemap inspection, and SEO audit.
- approval_needed: production deployment and any DNS/Vercel mutations are not authorized. Post-deploy canonical/robots/sitemap smoke is required.

## SEO-10 — deployment headers overrode page-level indexing intent

- priority: P0
- status: FIXED
- affected_urls: all pages, especially `/rescue` and `/rescue/*`
- affected_files: `vercel.json`, `scripts/next-config-cache.test.ts`
- observation: the deployment config applied `X-Robots-Tag: index, follow` globally, while rescue pages declare `noindex`; its rescue-specific pattern did not unambiguously cover the root page. The same config also retained a custom immutable cache header for `/_next/static` after framework ownership was restored elsewhere.
- reproduction_steps: inspect the ordered header rules in `vercel.json` and compare them with route metadata and the Next.js cache contract.
- root_cause: deployment-level defaults duplicated and could override route/framework-level policies.
- evidence: the global robots header and custom static cache rule were present in the committed deployment config.
- proposed_fix: keep global security headers only, cover `/rescue` and descendants with one noindex rule, and let Next.js own hashed-static caching.
- regression_test: `scripts/next-config-cache.test.ts` parses the Vercel config and asserts these boundaries.
- approval_needed: no for local configuration; deployment and response-header smoke remain approval-gated.

## CONTENT-01 — review badges without a verifiable review record

- priority: P0
- status: FIXED
- affected_urls: `/guide`, `/guide/*`, `/condition`, `/condition/*`, `/about`
- affected_files: guide/condition routes, `lib/content-review.ts`
- observation: YMYL category membership alone produced expert-review wording and badges.
- reproduction_steps: compare list/detail rendering conditions with nullable reviewer fields.
- root_cause: content risk classification and review evidence were conflated.
- evidence: prior list badges depended on `ymyl`; repository audit found no record with both reviewer name and date among statically scanned seed content.
- proposed_fix: show only neutral editorial-review wording when both stored reviewer and review date exist; do not claim a qualification the schema cannot prove.
- regression_test: `lib/content-review.test.ts`.
- approval_needed: expert credential/version model expansion and substantive sign-off require human review.

## USER-01 — promised PDF asset is absent

- priority: P0
- status: FIXED
- affected_urls: `/guide/pet-loss-care`, generic subscription form
- affected_files: `app/guide/pet-loss-care/page.tsx`, `components/forms/subscribe-form.tsx`, `app/api/subscribe/route.ts`
- observation: the UI promised a 14-page PDF and the email template pointed to `/downloads/pet-loss-care-guide.pdf`, but the asset is absent.
- reproduction_steps: check the public asset path in the repository and trace the subscription source.
- root_cause: placeholder email flow was presented as an available deliverable.
- evidence: `Test-Path public/downloads/pet-loss-care-guide.pdf` returned false.
- proposed_fix: remove the unfulfilled PDF offer from the reachable form and use an accurate newsletter flow; preserve the inactive template for later operator work.
- regression_test: static form/source audit; no real email sent.
- approval_needed: publishing an actual PDF and enabling delivery require content/operator approval.

## SOURCE-01 — named high-risk claims lack claim-level support

- priority: P0
- status: PARTIALLY_CONFIRMED
- affected_urls: named candidates in `source-claim-audit.csv`
- affected_files: selected seed files and source inventory
- observation: source strings often omit URLs/evidence locations; several absolute claims were not supported by the official material located.
- reproduction_steps: compare each exact sentence with the named official source rather than testing only HTTP reachability.
- root_cause: bibliography presence was treated as claim-level verification.
- evidence: Cornell supports regular combing but the cited 50% reduction was not located; WSAVA material discusses CT without establishing a universal “most accurate” rule.
- proposed_fix: remove unsupported absolutes, record claim-level status, and keep unresolved medical/legal/nutrition claims for expert review.
- regression_test: `audit:sources` remains audit-only for existing content.
- approval_needed: professional semantic sign-off remains required.

## INSURANCE-01 — stale products and unsupported comparison outcomes

- priority: P0
- status: FIXED
- affected_urls: `/insurance`, `/insurance/compare`, `/insurance/{insurer}`
- affected_files: `app/insurance/**`, `lib/insurance-products.ts`
- observation: pages presented renamed or no-longer-confirmed products alongside “점유율 1위”, “업계 최고”, generic prices and situation-based recommendations.
- reproduction_steps: compare each displayed product, channel and condition with the insurer's official current product or disclosure page.
- root_cause: volatile product facts and editorial recommendations were stored as timeless UI constants without an evidence date or contract-version dimension.
- evidence: official checks found Hyundai `굿앤굿우리펫보험`, channel-specific DB/KB products, Samsung `애니펫`, and Meritz `펫퍼민트`; a current Hanwha product was not verified.
- proposed_fix: retain URLs but show dated official-channel evidence, mark unverified status, and require same-condition official quotes and current terms for comparison.
- regression_test: `lib/insurance-products.test.ts`; full build.
- approval_needed: no for local correction; insurance professional review and production deployment remain separate.

## LEGAL-01 — animal-registration guide used obsolete structure and unsourced figures

- priority: P0
- status: FIXED
- affected_urls: `/blog/pet-registration-guide`
- affected_files: `db/seeds/blog-posts.ts`
- observation: the guide cited old article numbers, three registration methods, fixed fee ranges and an old aggregate count as current guidance.
- reproduction_steps: compare the article with the 2026-04-29 Ministry notice and current Animal Protection Act Article 15/enforcement decree Schedule 4.
- root_cause: historic research notes were carried forward as a current legal guide without a new claim-level check.
- evidence: the 2026 notice describes internal and external identification methods; current penalty provisions distinguish non-registration from change-report violations.
- proposed_fix: remove unsupported fees/statistics, cite official URLs and dates, separate penalties, and add a legal-information disclaimer.
- regression_test: source audit row plus seed/source static inspection.
- approval_needed: legal professional sign-off remains required for broader legal content.

## CONTENT-02 — emergency article received the wrong risk disclaimer

- priority: P0
- status: FIXED
- affected_urls: `/blog/pet-emergency-vet-preparation`
- affected_files: `db/seeds/blog-posts-66.ts`, `scripts/content-risk-routing.test.ts`
- observation: a medical emergency-preparation article was assigned category 4, so the renderer selected the insurance/legal disclaimer and breadcrumb; its author credential also described legal/institutional curation.
- reproduction_steps: trace the seed category through `app/blog/[slug]/page.tsx` and the explicit category definitions in `lib/category.ts`.
- root_cause: category was assigned by an unrelated sequence rather than the article's subject.
- evidence: the article discusses seizures, urinary obstruction, poisoning and emergency transport; none is principally an insurance or legal topic.
- proposed_fix: use explicit health category 3, neutral editorial authorship, a medical-information disclaimer, and identifiable AAHA/AVMA sources.
- regression_test: `scripts/content-risk-routing.test.ts`.
- approval_needed: veterinary sign-off is still required before claiming expert review.

## CONTENT-03 — public routes advertised unproven expert review

- priority: P0
- status: FIXED
- affected_urls: home, blog index, condition hub/OG, nutrition and health category copy, breed metadata
- affected_files: `app/**`, `lib/content-review.ts`, `lib/content-review.test.ts`, legacy `db/seeds/**` metadata
- observation: static route and OpenGraph copy said content was veterinarian/expert reviewed even though the repository audit could not prove a reviewer qualification, review date and reviewed content version.
- reproduction_steps: search public TSX route sources for `전문가 검토`, `수의사 검토`, and `의료진 검토`.
- root_cause: YMYL classification was conflated with completed professional review.
- evidence: no statically inventoried record proved the complete expert-review chain required by the specification.
- proposed_fix: use neutral source/general-information wording; show only `편집 검토 기록` when both reviewer and review date are stored; sanitize unsupported legacy metadata claims at every public presentation boundary without hiding the underlying content.
- regression_test: `lib/content-review.test.ts` scans all public route TypeScript files and verifies that every legacy seed phrase form is handled by the sanitizer.
- approval_needed: showing a veterinary/expert badge requires real identity, verifiable qualification, review date and reviewed content version.

## CONTENT-04 — source inventory undercounted JSON-stringified source lists

- priority: P0
- status: FIXED
- affected_urls: machine inventory only; no public content was changed by this finding
- affected_files: `scripts/audit-quality.ts`, `lib/content-seed-parser.ts`, `lib/content-seed-parser.test.ts`
- observation: the audit reported 344 high-risk records without sources even though many seeds stored populated source arrays inside `JSON.stringify([...])`.
- reproduction_steps: compare `audit:content` output with a seed such as `pet-emergency-vet-preparation` that uses `sources: JSON.stringify([...])`.
- root_cause: the AST parser accepted direct array literals but not the repository's JSON-stringified array form.
- evidence: after parser repair, the same 864-record inventory reports 29 high-risk records without parsed sources; no source content was fabricated or added to produce the reduction.
- proposed_fix: unwrap only literal `JSON.stringify` calls and parse their first array argument; keep dynamic expressions unverified.
- regression_test: `lib/content-seed-parser.test.ts` covers direct arrays, JSON-stringified arrays, strings, and `{ url }` entries.
- approval_needed: none for the read-only parser repair; semantic source verification remains human/expert work.

## CONTENT-05 — toxic-plant and emergency-kit guides contained unsupported scope and timing claims

- priority: P0
- status: FIXED
- affected_urls: `/blog/pet-emergency-kit-guide`, `/blog/pet-toxic-plants-dog-guide`, `/blog/pet-toxic-plants-cat-guide`
- affected_files: `db/seeds/blog-posts-17.ts`, `db/seeds/blog-posts-20.ts`, `scripts/toxic-emergency-content.test.ts`, `source-claim-audit.csv`
- observation: the articles included an unverified first-aid survival comparison, plant-poisoning share and timing numbers, an overbroad all-lilies category, and a universal 18-hour treatment window.
- reproduction_steps: compare the legacy assertions with AVMA Pet First Aid, ASPCA species-specific plant lists, and Merck's true-lily toxicity section.
- root_cause: source names in editorial comments were treated as support for precise claims that the referenced official material did not establish.
- evidence: ASPCA supports species-specific toxic plant membership; Merck distinguishes true `Lilium`/`Hemerocallis` kidney toxicity from plants merely called lilies; AVMA supports preparation and limited first-aid actions but not the survival comparison.
- proposed_fix: remove unsupported statistics and universal timing, use species and scientific-name scope, avoid home treatment prescriptions, add official URLs and explicit emergency disclaimers.
- regression_test: `scripts/toxic-emergency-content.test.ts` rejects the removed claims and requires the scoped official sources.
- approval_needed: veterinary review is still required before any expert-review status can be displayed.

## CONTENT-06 — parasite guides contained a reversed species warning and universal treatment claims

- priority: P0
- status: FIXED
- affected_urls: `/blog/dog-flea-tick-guide`, `/blog/cat-flea-tick-prevention`, `/blog/dog-heartworm-treatment-guide`
- affected_files: `db/seeds/blog-posts-17.ts`, `scripts/parasite-content.test.ts`, `scripts/audit-quality.ts`, `source-claim-audit.csv`
- observation: the dog article reversed the permethrin species risk; both flea/tick articles presented product-specific intervals as universal; the heartworm article attributed a 95 percent cure rate and fixed follow-up date to AHS without matching support.
- reproduction_steps: compare the seed text with FDA/EPA product-safety guidance, CAPC flea guidance, and the current AHS canine guideline surface.
- root_cause: editorial notes compressed product-label and evolving clinical guidance into fixed rules without a claim-level source check.
- evidence: FDA/EPA require species, life-stage, weight and label matching and separation until topical products dry; EPA warns not to swap dog and cat products; AHS describes veterinarian-directed staged treatment and identifies its guidelines as living documents.
- proposed_fix: correct the species warning, make timing label-specific, remove unsupported outcome percentages and fixed follow-up dates, and add official sources plus explicit disclaimers.
- regression_test: `scripts/parasite-content.test.ts` rejects the old claims and requires the scoped source and risk fields.
- approval_needed: treatment plans and any future expert-review badge still require qualified veterinary review.

## CONTENT-07 — dental and anal-sac guides exposed unsupported fixed rules and a home procedure

- priority: P0
- status: FIXED
- affected_urls: `/blog/dog-dental-scaling-guide`, `/blog/cat-anal-gland-guide`, `/blog/dog-anal-gland-express-guide`
- affected_files: `db/seeds/blog-posts-24.ts`, `scripts/dental-anal-sac-content.test.ts`, `scripts/audit-quality.ts`, `source-claim-audit.csv`
- observation: dental copy contained unsupported prevalence, outcome, anesthesia-mortality, price and fixed-frequency claims; the dog anal-sac article taught a step-by-step home expression technique and universal intervals.
- reproduction_steps: compare the seed claims with AAHA dental guidelines and the 2025-reviewed Merck Veterinary Manual anal-sac entry.
- root_cause: named institutions in a display-only reference box were treated as support for precise claims without traceable source locations.
- evidence: AAHA supports anesthetized comprehensive oral evaluation and individualized planning, not the article's fixed intervals and figures; Merck describes diagnosis and clinician-directed expression, flushing, medication or surgery without a universal home schedule.
- proposed_fix: remove unsupported figures and home-procedure steps, make timing and testing individualized, add structured official sources and explicit disclaimers.
- regression_test: `scripts/dental-anal-sac-content.test.ts` rejects the removed claims and requires source, YMYL and disclaimer fields.
- approval_needed: clinical recommendations and any expert-review representation still require qualified veterinary review.

## CONTENT-08 — summer-safety and eye guides used unsupported thresholds and diagnosis shortcuts

- priority: P0
- status: FIXED
- affected_urls: `/blog/cat-summer-safety-guide`, `/blog/dog-eye-care-guide`, `/blog/dog-summer-paw-protection`
- affected_files: `db/seeds/blog-posts-17.ts`, `db/seeds/blog-posts-20.ts`, `scripts/summer-eye-content.test.ts`, `scripts/audit-quality.ts`
- observation: the articles used unverified heat thresholds, fixed room temperatures, eye-discharge colour diagnosis, a 48-hour wait, fabricated burn incidence and rigid clock rules.
- reproduction_steps: compare the seed claims with current Merck heat and ophthalmology material and AAHA/RSPCA hot-pavement guidance.
- root_cause: simplified editorial heuristics were presented as universal clinical thresholds and attributed to institutions without claim-level URLs.
- evidence: official material supports symptom-based emergency escalation, gradual cooling, prompt evaluation of painful eye signs, checking the actual surface and choosing cooler routes; it does not support the removed statistics and universal thresholds.
- proposed_fix: use symptom and environment-based guidance, remove diagnosis-by-colour and fabricated statistics, and add structured official sources plus explicit disclaimers.
- regression_test: `scripts/summer-eye-content.test.ts` rejects the removed claims and requires source, YMYL and disclaimer fields.
- approval_needed: qualified veterinary review remains necessary for clinical validation or expert-review display.

## CONTENT-09 — paw, skin and veterinary-visit guides used unsupported fixed rules

- priority: P0
- status: FIXED
- affected_urls: `/blog/dog-paw-care-guide`, `/blog/dog-skin-care-guide`, `/blog/pet-vet-visit-guide`
- affected_files: `db/seeds/blog-posts-17.ts`, `scripts/paw-skin-visit-content.test.ts`, `scripts/audit-quality.ts`
- observation: the articles used an exact pavement-temperature narrative, fixed cooling/product/bathing schedules, an unverified top-five and AVMA 38 percent statistic, a delayed-care threshold, universal fasting language and a next-day triage list.
- reproduction_steps: compare the seed claims with current AAHA hot-pavement, visit-preparation, referral and anesthesia guidance and Merck dermatology/topical-agent material.
- root_cause: institution names and simplified editorial heuristics were treated as support for precise universal rules without claim-level URLs or applicability conditions.
- evidence: official material supports checking the actual surface, cool-water rinsing, individualized dermatology care, carrier acclimation and clinic-directed fasting; it does not support the removed universal schedules, statistics or wait rules.
- proposed_fix: use symptom- and patient-specific escalation, defer treatment timing and fasting to the product label or treating team, and add structured official sources plus explicit disclaimers.
- regression_test: `scripts/paw-skin-visit-content.test.ts` rejects the removed claims and requires source, YMYL and disclaimer fields.
- approval_needed: qualified veterinary review remains necessary for clinical validation or expert-review display.

## CONTENT-10 — final published source-missing guides contained unsupported market, prevalence and treatment claims

- priority: P0
- status: FIXED
- affected_urls: `/blog/online-vet-consultation-guide`, `/blog/pet-allergy-season-guide`, `/blog/pet-human-allergy-guide`
- affected_files: `db/seeds/blog-posts-20.ts`, `db/seeds/blog-posts-22.ts`, `db/seeds/blog-posts-24.ts`, `scripts/remaining-published-content.test.ts`, `scripts/audit-quality.ts`
- observation: the posts used unverified adoption and market-growth statistics, stale named service listings, unsupported prevalence and exposure-reduction percentages, rigid medication/treatment timelines and overly broad remote-care statements.
- reproduction_steps: compare the claims with the current Korean Veterinarians Act, AVMA emergency material, Merck dermatology guidance, NIEHS pet-allergen guidance and AAAAI diagnosis/management guidance.
- root_cause: editorial source labels and product snapshots were used without claim-level URLs, dates or applicability conditions.
- evidence: current law supports direct-examination limits for prescription-target veterinary drugs; the clinical sources support individualized diagnosis, emergency escalation and exposure reduction but not the removed universal figures and guarantees.
- proposed_fix: replace market lists with service-selection criteria, keep remote advice subordinate to in-person/emergency care, and scope allergy diagnosis and treatment to clinician-directed evaluation.
- regression_test: `scripts/remaining-published-content.test.ts` requires source, YMYL and disclaimer fields and rejects the removed claims.
- approval_needed: human allergy and veterinary content still needs appropriate professional review before any expert-review badge is displayed.

## CONTENT-11 — review approval paths bypassed the high-risk publication gate

- priority: P0
- status: FIXED
- affected_urls: `/admin/review-queue`, `/api/review-queue/{id}`, future public content URLs
- affected_files: `app/admin/review-queue/actions.ts`, `app/api/review-queue/[id]/route.ts`, `lib/content-risk-gate.ts`, `lib/content-risk-gate.test.ts`, `scripts/review-queue-exposure.test.ts`
- observation: the CLI gate covered changed seed records, but both administrator approval paths could publish high-risk database records without sources or a disclaimer. The API also constructed every published URL under `/guide/`.
- reproduction_steps: follow the approval handlers from review-queue lookup through the unconditional status update; compare their selected fields and calls with `evaluateChangedHighRiskContent`.
- root_cause: publication policy was implemented only as a repository audit command and was not reused at the database mutation boundary.
- evidence: before the fix neither approval handler imported the gate; after the fix both evaluate the complete candidate before changing queue/content status, return or throw on policy issues, and the API maps blog/condition/guide paths explicitly.
- proposed_fix: parse stored source arrays at runtime, reuse the high-risk policy before mutation, fail closed for missing content, and preserve the content type in indexing and revalidation URLs.
- regression_test: `lib/content-risk-gate.test.ts` covers stored source formats and candidate evaluation; `scripts/review-queue-exposure.test.ts` covers public filters, both approval boundaries and URL type mapping.
- approval_needed: none for the local code fix; production deployment remains approval-gated.

## SECURITY-01 — administrator mutation and status-transition boundary was incomplete

- priority: P0
- status: FIXED
- affected_urls: `/admin/review-queue`, `/admin/analytics`, `/api/review-queue/{id}`
- affected_files: `lib/admin-auth.ts`, `lib/review-workflow.ts`, `app/admin/review-queue/actions.ts`, `app/admin/review-queue/page.tsx`, `app/admin/analytics/page.tsx`, `app/api/review-queue/[id]/route.ts`
- observation: the review page checked a query key, but the bound server actions did not authenticate inside the mutation. The API comparison could also accept the literal `Bearer undefined` when the secret was absent, and resolved items had no explicit terminal-state protection.
- reproduction_steps: trace the form action independently from page rendering, inspect the missing-secret header comparison, and request an approved transition from an already rejected or approved item.
- root_cause: access control was attached to page navigation rather than consistently applied at the closest data-mutation boundary; review status was treated as an unconstrained string update.
- evidence: both server actions now validate the configured secret before database reads/writes; missing configuration fails closed; the API shares the same verifier and returns 409 for invalid transitions; both admin pages require the same guard.
- proposed_fix: centralize secret verification, authenticate every mutation, model allowed state transitions explicitly, and keep terminal items terminal.
- regression_test: `lib/review-workflow.test.ts` and `scripts/review-queue-publication.test.ts` cover terminal states, mutation-boundary authentication and protected admin pages.
- approval_needed: none for the local fix; replace query-secret administration with a real authenticated operator session in a separately scoped security change.

## CONTENT-12 — legacy seed commands remain direct publication tools

- priority: P1
- status: FIXED
- affected_urls: future content URLs created by `db:seed:*`
- affected_files: `db/seeds/contents.ts`, `db/seeds/blog-posts*.ts`, `db/seeds/guides-batch-*.ts`, `db/seeds/breeds.ts`, `package.json`
- observation: numerous legacy seed records declare `status: "published"` and seed scripts write directly to the configured database without using the runtime review queue.
- reproduction_steps: statically inspect published status declarations and their insert/upsert calls; do not execute them against production.
- root_cause: seed scripts predate the review workflow and are operational import tools rather than application publication endpoints.
- evidence: the repository scan found direct published declarations across the legacy seed family; no seed command was run in this work. Every package-managed content, blog, and breed seed command now runs `audit:content:gate` first.
- proposed_fix: keep seeds operator-only and make the dry-run changed-content gate a mandatory prefix of every package-managed content seed command. Direct ad-hoc `tsx` execution remains outside the supported operator path.
- regression_test: `scripts/content-seed-command-guard.test.ts` checks more than 100 package seed commands; the changed-content gate scans tracked diff hunks and whole untracked seed files.
- approval_needed: any production seed/import run and any broad migration of legacy seed behavior require an impact list, rollback plan and explicit authority.

## SEO-09 — content sitemap converted DB failure into an empty success response

- priority: P1
- status: FIXED
- affected_urls: `/sitemap-content.xml`
- affected_files: `app/sitemap-content.xml/route.ts`, `lib/seo/sitemap-response.ts`
- observation: the database error branch returned an empty `<urlset>` with HTTP 200.
- reproduction_steps: inspect the route catch branch or invoke the extracted failure response helper.
- root_cause: availability failure and a legitimate zero-content result shared the same successful XML representation.
- evidence: the former catch branch constructed an empty sitemap without a failure status or no-cache directive.
- proposed_fix: return HTTP 503 with `Cache-Control: no-store` and `Retry-After: 300`; do not represent an outage as zero indexed content.
- regression_test: `lib/seo/sitemap-response.test.ts` proves the failure response is 503, non-cacheable, and not an empty urlset.
- approval_needed: none for the local fix; production behavior requires deployment and post-deploy smoke.

## TRUST-03 — corporation label and contact mailbox lack repository-verifiable operating evidence

- priority: P1
- status: UNKNOWN
- affected_urls: sitewide footer, `/about`, `/contact`, `/privacy`, `/terms`, `/advertising`, `/disclosure`
- affected_files: `components/layout/footer.tsx` and trust/contact pages
- observation: the footer displays `(주)펫지기` and several pages publish `contact@petjigi.kr`, but the repository contains no business-registration fields or evidence record.
- reproduction_steps: search the repository and Git history for registration/legal-entity evidence; perform a read-only MX lookup for `petjigi.kr` without sending mail.
- root_cause: UNKNOWN. A legal entity or alternate mail routing may exist outside this repository.
- evidence: the corporation label entered with the footer design commit; no registration number, representative, or legal-entity evidence is stored in scope. The 2026-09-12 DNS lookup returned no MX answer, only the zone SOA; this does not prove that the mailbox is nonexistent.
- proposed_fix: operator verifies the exact legal name and an actually monitored contact channel, then supplies only confirmed public fields. Do not invent, silently remove, or replace identity data from repository evidence alone.
- regression_test: post-deploy contact-channel check without sending unsolicited mail; legal identity checked against operator-held evidence.
- approval_needed: yes; legal identity and mail/DNS configuration are external operator facts.

## CONTENT-13 — review-queue condition set lacked traceable sources and used unsafe fixed claims

- priority: P0
- status: FIXED
- affected_urls: `/condition/cat-dental-disease`, `/condition/cat-kidney-disease-guide`, `/condition/cat-urinary-tract-disease`, `/condition/cat-vomiting-causes`, `/condition/dog-heartworm-disease`, `/condition/dog-joint-arthritis`, `/condition/dog-obesity-management`, `/condition/dog-patellar-luxation`, `/condition/dog-patellar-luxation-stages`, `/condition/dog-separation-anxiety-disorder`, `/condition/dog-skin-allergy-guide`
- affected_files: `db/seeds/conditions-batch-1.ts`, `db/seeds/conditions-batch-2.ts`, `scripts/review-queue-condition-content.test.ts`, `source-claim-audit.csv`, `content-inventory.csv`
- observation: all 11 records were correctly held in `review_queue` but had no machine-readable source. Sampled copy included unsupported prevalence/success/recurrence figures, delay-producing emergency cutoffs and universal recovery, diet or exercise schedules.
- reproduction_steps: inventory the condition seed objects, compare their fixed claims with ACVS, AHS, Merck, IRIS, iCatCare, AAHA, WSAVA and VOHC material, and run `pnpm audit:content`.
- root_cause: the initial condition batch was drafted before the source schema and prepublication gate were applied consistently.
- evidence: every record now includes at least one claim-relevant authoritative source; unsupported sampled figures and rigid protocols were removed or made patient-specific; the content audit reports 0 high-risk records without parsed sources.
- proposed_fix: retain `review_queue`, preserve source publisher/date context, use symptom-based emergency escalation, and leave diagnosis/treatment meaning to qualified review.
- regression_test: `scripts/review-queue-condition-content.test.ts` requires 11 source declarations and rejects the removed high-risk claims; `audit:content:gate` reports 37 changed records and 0 blockers.
- approval_needed: qualified veterinary semantic review is still required before any record is approved or any review badge is displayed.

## CONTENT-14 — source claim audit did not implement the specified claim-level contract

- priority: P1
- status: FIXED
- affected_urls: audit artifact only
- affected_files: `scripts/audit-quality.ts`, `scripts/source-audit-contract.test.ts`, `source-claim-audit.csv`
- observation: the source audit used a shorter legacy row shape, mixed semantic judgments with automatic source-presence rows, and could collide when multiple records shared a slug.
- reproduction_steps: compare the generated header with the master specification, parse every CSV row, and check `claimId` uniqueness.
- root_cause: the initial audit command extended an older source checklist instead of mapping each output to the specified 19-field claim schema.
- evidence: the regenerated artifact has 130 rows, exactly 19 fields per row, and 130 unique claim IDs; semantic rows and machine source-presence rows identify different verification methods and reviewers.
- proposed_fix: keep claim/source IDs stable per content ID, hash the audited content version, and record automatic URL presence as `UNVERIFIED` rather than semantic support.
- regression_test: `scripts/source-audit-contract.test.ts` checks the schema, status column, condition candidates, expert-review classification, and content-ID-based row key.
- approval_needed: none for the local audit repair; qualified semantic review is still external.

## CONTENT-15 — duplicate inventory covered only representative topics

- priority: P1
- status: FIXED
- affected_urls: 24 repository-declared duplicate public URL groups listed in `duplicate-clusters.csv`
- affected_files: `scripts/audit-quality.ts`, `scripts/artifact-contract.test.ts`, `duplicate-clusters.csv`
- observation: the initial artifact contained three curated topic pairs but did not enumerate duplicate public URL declarations across the full repository inventory.
- reproduction_steps: run `pnpm audit:content` and group all 864 records independently by public URL, normalized title, and deterministic content hash.
- root_cause: the first duplicate artifact was a conservative priority sample rather than an exhaustive machine scan.
- evidence: the regenerated artifact contains 24 duplicate public-URL groups, 0 cross-URL normalized-title groups, 0 exact-content-hash groups, and the three curated priority candidates. Cluster IDs are unique.
- proposed_fix: keep URL, title, and exact-content signals separate; require complete record and production-selection review before choosing merge, canonical, redirect, noindex, retirement, or deletion.
- regression_test: `scripts/artifact-contract.test.ts` guards the artifact header and separate URL/title/hash scan logic.
- approval_needed: yes for any content consolidation, redirect, noindex, retirement, deletion, or production database cleanup.

## SEO-08 — detail and OpenGraph queries did not consistently enforce content route boundaries

- priority: P0
- status: FIXED
- affected_urls: `/blog/{slug}`, `/guide/{slug}`, `/condition/{slug}`opengraph-image`
- affected_files: `app/blog/[slug]/page.tsx`, `app/guide/[slug]/page.tsx`, the three content OpenGraph routes, `scripts/content-route-boundary.test.ts`
- observation: blog and guide detail lookup filtered slug/status/date but not content type; blog, guide, and condition OpenGraph lookup omitted the publication-time boundary, and two also omitted type.
- reproduction_steps: compare each route's detail and OpenGraph predicates with the global unique-slug schema and scheduled publication rule.
- root_cause: route-specific predicates were duplicated and had drifted apart.
- evidence: every affected query now checks its explicit content type; every OpenGraph query also requires `publishedAt` not to be in the future.
- proposed_fix: retain consistent slug, type, published status, and publication-time predicates at every public detail/social-image boundary.
- regression_test: `scripts/content-route-boundary.test.ts` checks blog/guide detail type filters and all three OpenGraph type/time filters.
- approval_needed: none for the local code fix; production deployment remains separately gated.

## TRUST-02 — public blog copy claimed undocumented direct experience

- priority: P1
- status: FIXED
- affected_urls: `/blog`, `/blog/{slug}` metadata
- affected_files: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `scripts/public-trust-copy.test.ts`
- observation: the blog hub and detail metadata fallback described content as directly experienced and researched by a pet-owner editor, but no per-article experience record supported that claim.
- reproduction_steps: search public route copy for `직접 경험` and trace the strings into page metadata and visible hub text.
- root_cause: generic brand copy was reused as an authorship/evidence claim without a corresponding editorial record.
- evidence: the public strings now neutrally describe topic-organized information and no longer assert direct experience.
- proposed_fix: expose direct-experience claims only when a content-specific, attributable editorial record exists; otherwise use neutral wording.
- regression_test: `scripts/public-trust-copy.test.ts` rejects the undocumented phrases in public blog routes.
- approval_needed: none for this truthful-copy correction.

## USER-02 — newsletter API retained a reachable missing-PDF promise

- priority: P0
- status: FIXED
- affected_urls: `/api/subscribe`, welcome email, `/privacy`
- affected_files: `app/api/subscribe/route.ts`, `lib/email/templates.tsx`, `app/privacy/page.tsx`, `scripts/newsletter-contract.test.ts`
- observation: public forms no longer promised a PDF, but the API accepted an arbitrary `source`; `pet_loss_care` selected an email subject and body linking to a nonexistent PDF and claimed the link was valid for 30 days.
- reproduction_steps: submit or inspect a request with `source=pet_loss_care`, follow the email template default URL, and verify that `public/downloads/pet-loss-care-guide.pdf` does not exist. No real email was sent.
- root_cause: an obsolete gated-download branch remained after the visible signup copy was corrected, and the client-supplied source field had no allowlist.
- evidence: the API now accepts only `contact_page`, `home_newsletter`, and `pet_loss_newsletter`; the template contains no PDF/download/expiry promise; privacy retention language refers to newsletter cancellation rather than membership deletion.
- proposed_fix: add a downloadable benefit only after the actual versioned asset, delivery behavior, and retention wording are verified together.
- regression_test: `scripts/newsletter-contract.test.ts` guards the source allowlist, absence of the missing-PDF promise, and cancellation wording.
- approval_needed: none for the local correction; production email delivery remains untested and no real recipient was contacted.
