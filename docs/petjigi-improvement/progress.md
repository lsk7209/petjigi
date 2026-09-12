# Current progress

- Timestamp: 2026-09-12 Asia/Seoul
- Goal: implement and verify safe AdSense-readiness quality improvements for `petjigi.kr`.
- Branch: `codex/petjigi-adsense-quality`
- Baseline commit: `023ded6`
- Current state: LOCAL_IMPLEMENTATION_VERIFIED_WITH_GAPS

## Completed

- Located and read the supplied master specification (`D:\다운로드\petjigi_codex_improvement_master.md`, SHA-256 `29EE9E04BA4AA05896E8322C3F12F350EBECBC1DDDB3CE8EF97D36D641ECF0C8`).
- Confirmed repository remote, stack, working tree, and representative Vercel/public-domain behavior.
- Preserved four pre-existing dirty paths and moved work onto a dedicated local branch.
- Reproduced page-length-as-total, title duplication, Korean particle error, and visible Bucheon/address mismatch.
- Confirmed robots/sitemap/content-sitemap/ads.txt respond to direct curl; account meaning is still unverified.
- Implemented shared COUNT/list filtering, stable pagination, range wording, self-canonical page URLs, and crawlable previous/next links.
- Added review-evidence gating, title normalization, truthful refresh wording, sitemap lastmod repair, inventory-backed Auto ads exclusions for all 53 memorial paths plus operational/trust screens, and accurate newsletter promises.
- Added five read-only audit commands and all requested inventory/dry-run/rollback/release artifacts.
- Softened selected unsupported high-risk claims without inventing replacement medical facts.
- Fresh verification: 102/102 tests pass, including Vercel robots/cache header boundaries, crawler-readable rescue noindex policy, metadata-route sitemap exclusions, and blog/RSS subtitle review-claim sanitization plus the existing newsletter, data, content, SEO, ad, accessibility, and artifact contracts. `pnpm audit:seo` reports 0 unsafe child document-title suffixes. All 864 inventory rows have deterministic SHA-256 hashes, unavailable GSC metrics remain blank rather than zero, and machine-only classifications require human approval. The full scan reports 24 duplicate public-URL groups, 0 cross-URL normalized-title groups, and 0 exact-content-hash groups. The changed-content gate passes for 37 modified records with 0 blockers, the content audit reports no published or review-queue high-risk records without parsed sources, all five audits, TypeScript, full repository lint and diff checks pass. Next.js 16.3.5 produced a schema-complete warning-free 72-page build and sitemap; representative static and DB-backed OG image routes returned 200 image/png. Fresh public checks confirm redirect/static-file health but show stale page-2 and memorial canonical behavior pending deployment. The ignored `.tmp-validation-next/validation.db` fixture remains because deletion was denied by the execution policy.
- Independent verification identified DB-backed build/runtime, repository lint debt, account evidence, and qualified high-risk content review as gates. The lint debt was subsequently resolved. A transient TypeScript failure was traced to incomplete `.next` output from the blocked build; after isolating that generated cache, clean TypeScript and tests passed again.
- Continuation removed the full lint debt and added request-time fences for all eight DB-backed generated OpenGraph routes. Investigation rejected a fake empty-data build fallback because it would conflate DB failure with valid zero results.
- A production-server smoke then exposed and fixed a Next.js 16 dynamic-route-name conflict that caused all requests to return 500. Existing listing and detail public URL shapes remain unchanged.
- Local HTTP smoke now proves 200 responses for home, about, an empty listing, and the memorial guide; a missing detail returns 404 and an out-of-range page redirects. The disposable DB and local server were removed/stopped afterward.
- Public `/bucheon/sale` still exposes clear Paju, Suwon, Hwaseong, and Gimpo address conflicts. Record jurisdiction/history remains unknown, so no record was moved or deleted; listing and detail pages now disclose clear address-region conflicts for source review.
- Corrected unsupported source attribution in `puppy-first-week-guide`, `pet-food-rotation-guide`, and `pet-first-aid-guide`: removed the AVMA 48-72-hour claim, the unrelated Heinze 2012 rotation claim, and incorrect Red Cross/BSAVA edition labels. Nutrition and emergency wording was narrowed to verified scope.
- Replaced stale insurance product comparisons and unsupported ranking/recommendation claims with a dated official-channel evidence model. Confirmed current names for five insurers, marked Hanwha's current product as unverified, and removed generic premium and payout implications.
- Updated `pet-registration-guide` against the 2026 Ministry of Agriculture notice and current Animal Protection Act Article 15/enforcement decree: two registration methods, distinct non-registration/change-report penalties, and no unsourced fee or recovery-count claims.
- Reclassified `pet-emergency-vet-preparation` from insurance/legal to health, replaced its mismatched author credential and disclaimer, and narrowed arbitrary emergency thresholds to AAHA/AVMA-supported actions.
- Removed unverified expert/veterinary-review marketing language from public route copy and OpenGraph images; blog badges now require a reviewer name and review date and are labelled as an editorial record only.
- Added a shared presentation-boundary sanitizer so legacy database metadata cannot expose unsupported expert/veterinary-review completion claims in page metadata, cards, JSON-LD, related links, or RSS. Regression coverage inventories every legacy seed phrase form without hiding or unpublishing existing content.
- Added `audit:content:gate`: only newly added or substantively touched seed records are checked for high-risk publication requirements, while unchanged legacy gaps remain audit-only. The gate covers tracked diff hunks and entire untracked seed files.
- Fixed the content inventory parser to read both direct source arrays and the repository's prevalent `JSON.stringify([...])` storage form. This corrected the machine-reported high-risk missing-source count from a false 344 to 29; this is a parser correction, not the addition of 315 sources.
- Reviewed the published emergency-kit and dog/cat toxic-plant guides against AVMA, ASPCA, FDA and Merck evidence. Removed unsupported survival, 25 percent, 30-minute and 18-hour claims; narrowed cat lily kidney-risk wording to true `Lilium`/`Hemerocallis`; added scoped official sources and explicit disclaimers. That slice reduced the machine missing-source count to 26.
- Reviewed the dog/cat flea-and-tick and dog heartworm guides against FDA, EPA, CAPC and AHS material. Corrected the reversed permethrin species warning, replaced universal product intervals and contact durations with label-specific instructions, and removed an unsupported 95 percent cure claim and fixed follow-up date. The machine missing-source count is now 23.
- Reviewed dog dental scaling and dog/cat anal-sac guides against AAHA and the 2025-reviewed Merck Veterinary Manual. Removed unsupported prevalence, outcome, price, mortality and fixed-frequency claims; replaced the dog home-expression tutorial with symptoms and professional-evaluation guidance. The machine missing-source count is now 20.
- Reviewed cat summer safety, dog eye care and hot-pavement paw protection against current Merck, AAHA and RSPCA material. Replaced temperature cutoffs and discharge-colour diagnosis with symptom-based escalation; removed fabricated incidence figures and rigid clock rules. The machine missing-source count is now 17.
- Reviewed general paw care, dog skin care and veterinary-visit preparation against AAHA and Merck material. Removed unsupported rankings and exact temperature claims, fixed bathing/product schedules, delayed-care thresholds, universal fasting and next-day triage rules; added scoped official sources and disclaimers. The machine missing-source count is now 14.
- Reviewed the final three published source-missing high-risk posts: online veterinary consultation, seasonal pet allergy and human pet allergy. Removed stale platform listings and market statistics, unsupported prevalence/reduction claims, universal medication schedules and online-care overreach; added current law, AVMA, Merck, NIEHS and AAAAI sources. No published high-risk record now lacks a parsed source; 11 review-queue records remain.
- Verified that review-queue records are excluded from condition detail/list, OpenGraph, search, RSS and content sitemap paths. Added the same high-risk source/disclaimer/review-claim gate to both administrator approval paths, so the 11 legacy drafts cannot be published through the UI or API without remediation. Corrected the API publication URL to preserve blog/condition/guide type.
- Secured both admin pages and mutation boundaries with a fail-closed secret check. Server actions now authenticate inside the action, and resolved queue items cannot be reopened or approved again. Legacy seed commands remain operator-only direct-write tools; they were not run, and changed published high-risk seed records must pass `audit:content:gate` before any authorized seed operation.
- Added claim-scoped ACVS, AHS, Merck, IRIS, iCatCare, AAHA, WSAVA and VOHC sources to all 11 condition drafts that lacked machine-readable evidence. Removed sampled unsupported prevalence/success figures, delay-producing emergency cutoffs and universal recovery/diet/exercise schedules. They remain `review_queue`; source presence is not treated as veterinary semantic approval.
- Rebuilt `source-claim-audit.csv` to the master specification's exact 19-field claim schema. Semantic checks and automatic URL-presence checks are distinct; all 130 claim IDs are unique, and 11 medical drafts are explicitly `NEEDS_EXPERT_REVIEW`.
- Corrected `redirect-plan.csv` to the master specification's exact seven fields and added regression tests for all 14 required artifacts, the content/source/redirect CSV contracts, and explicit template/approval status.
- Replaced placeholder inventory hashes with deterministic SHA-256 content versions and corrected all machine-only `NEEDS_HUMAN_REVIEW` rows to require approval. GSC fields remain blank because no authorized GSC evidence was available.
- Replaced the three-row representative duplicate file with an exhaustive repository scan plus the three curated priority clusters. It found 24 duplicate public-URL groups but no exact-content groups; every automated URL/title candidate remains `NEEDS_HUMAN_REVIEW`, and no merge, redirect, noindex, retirement, or deletion was applied.
- Added explicit content-type predicates to blog and guide detail lookup, and aligned blog/guide/condition OpenGraph lookup with both route type and publication time. This prevents a global-slug seed collision or scheduled record from leaking through the wrong content route or social image.
- Removed undocumented `직접 경험` claims from the blog hub, blog metadata, and detail metadata fallback. Public copy now describes the information neutrally without inventing editorial experience evidence.
- Removed the reachable but nonexistent pet-loss PDF email branch, restricted newsletter `source` to the three implemented entry points, and aligned privacy retention language with newsletter cancellation. No real email was sent.

## In progress

- Qualified semantic review of the 11 sourced review-queue medical drafts. They are not published; machine source presence is not treated as expert approval.

## Blocked or approval-gated

- AdSense and GSC account status: no authorized account evidence located yet.
- The footer legal-entity label and monitored status of `contact@petjigi.kr` require operator evidence; repository text and a read-only DNS observation are insufficient to confirm or contradict either claim.
- Public legal/contact values are centralized in `lib/site-identity.ts`; `audit:ads` reports both verification states as `UNKNOWN`, and regression tests prevent public pages from drifting back to duplicated hard-coded claims.
- Next.js was patched from 16.2.6 to 16.3.5, `eslint-config-next` was aligned, and the runtime-unused `shadcn` CLI was moved to devDependencies. Compatible patched transitive versions are constrained without a framework-major change; the production dependency audit moved from 2 critical, 28 high, 32 moderate and 4 low findings to zero at every severity.
- Production DB correction, deployment, push, DNS/account changes, real email, and paid API use: not authorized.
- Durable distributed newsletter rate limiting still requires a deployment-infrastructure decision; the local route now provides bounded parsing, honeypot screening and DB-backed idempotence without collecting IP addresses.
- Medical/legal semantic sign-off beyond the corrected priority claims still requires suitable primary-source and/or expert review evidence.

## Side effects and rollback

- External systems changed: none. No test email or DNS mutation was performed.
- Production changed: no.
- Local side effects: new branch, Goal Harness files, and improvement documentation.
- Pre-existing dirty files remain preserved and are not claimed as this run's work.

## Single next step

With separate deployment authority, rerun the already-green build against authorized configuration, deploy, and smoke-test real listing counts/details and the memorial ad exclusion. Until then, review the unresolved Bucheon source records and high-risk content evidence locally.
