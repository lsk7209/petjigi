# CHANGELOG

## Changed Files

| File | Change | Reason |
|---|---|---|
| `lib/content-review.ts` and public content routes | Added legacy review-claim presentation sanitizer | Prevent unsupported expert/veterinary completion claims from leaking from existing DB metadata |
| `lib/content-review.test.ts` | Added route scan and legacy seed phrase coverage | Prevent recurrence without bulk hiding existing content |
| `lib/content-risk-gate.ts`, `scripts/audit-quality.ts`, `package.json` | Added incremental high-risk prepublication gate | Block only changed published high-risk records with missing sources/disclaimer or unsupported review claims |
| `lib/content-seed-parser.ts` | Added support for JSON-stringified source arrays | Correct false missing-source inventory counts |
| `db/seeds/blog-posts-17.ts`, `db/seeds/blog-posts-20.ts` | Corrected emergency-kit and toxic-plant claims with scoped official evidence | Remove unsupported high-risk statistics, timing, taxonomy, and treatment implications |
| `db/seeds/blog-posts-17.ts`, `scripts/parasite-content.test.ts`, `scripts/audit-quality.ts` | Corrected flea/tick and heartworm guidance and recorded claim evidence | Fix reversed permethrin warning and remove universal product timing and unsupported cure claims |
| `db/seeds/blog-posts-24.ts`, `scripts/dental-anal-sac-content.test.ts`, `scripts/audit-quality.ts` | Corrected dental and anal-sac guidance with AAHA/Merck evidence | Remove unsupported statistics, prices, fixed intervals and unsafe home-procedure instructions |
| `db/seeds/blog-posts-17.ts`, `db/seeds/blog-posts-20.ts`, `scripts/summer-eye-content.test.ts` | Corrected cat heat, dog eye and hot-pavement guidance | Remove unsupported thresholds, colour diagnosis, incidence statistics and rigid timing rules |
| `db/seeds/blog-posts-17.ts`, `scripts/paw-skin-visit-content.test.ts`, `scripts/audit-quality.ts` | Corrected paw, skin and veterinary-visit guidance | Remove unsupported statistics, universal schedules, unsafe wait/triage rules and add scoped official evidence |
| `app/admin/review-queue/actions.ts`, `app/api/review-queue/[id]/route.ts`, `lib/content-risk-gate.ts` | Enforced high-risk checks at both review publication boundaries | Prevent review-queue records from bypassing source/disclaimer/review-claim requirements and fix published URL type mapping |
| `lib/admin-auth.ts`, `lib/review-workflow.ts`, admin pages and review mutations | Added fail-closed authentication and review-state transition checks | Prevent direct server-action invocation, missing-secret authentication and re-approval of resolved items |
| `db/seeds/conditions-batch-1.ts`, `db/seeds/conditions-batch-2.ts`, `scripts/review-queue-condition-content.test.ts` | Added authoritative sources and removed sampled unsupported fixed claims from 11 condition drafts | Eliminate machine-readable source gaps while keeping expert semantic approval pending |
| `db/seeds/blog-posts-20.ts`, `db/seeds/blog-posts-22.ts`, `db/seeds/blog-posts-24.ts`, `scripts/remaining-published-content.test.ts` | Corrected the final three published source-missing high-risk guides | Remove stale market claims, unsupported prevalence and efficacy figures, fixed treatment rules and remote-care overreach |
