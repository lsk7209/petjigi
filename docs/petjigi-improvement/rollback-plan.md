# Rollback plan

- Scope: local branch `codex/petjigi-adsense-quality`; production was not changed.
- Preserve the pre-existing dirty paths recorded in `00-baseline.md`; do not reset or overwrite them.
- Revert this work by reverting only the files listed in `validation-report.md` after first saving the current dirty diff.
- Data migration rollback: migration `0005_fat_ken_ellis.sql` was exercised only on a disposable local database and was not applied to production. Apply it before the application release. If application rollback is required, the additive `etl_sync_state` table may remain safely unused; drop it only in a separately approved maintenance window after confirming no deployed code reads it.
- External rollback: not applicable; no push, deployment, DNS, AdSense/GSC change, paid API call, or real email was performed.
- Dependency rollback: restore `package.json` and `pnpm-lock.yaml` together. Do not deploy the former Next.js 16.2.6 lock state because the captured production audit included two critical findings; use rollback only to diagnose compatibility locally while preparing a patched replacement.
- If pagination causes a runtime regression, restore the prior listing function and route together; they form one contract.
- If route-aware Auto ads loading regresses, remove `AdsenseLoader` and restore the root loader only after separately deciding the memorial exclusion policy.
