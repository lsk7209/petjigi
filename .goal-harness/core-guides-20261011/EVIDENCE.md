# Verification evidence — 2026-10-11

- pnpm test: 450 tests,450 pass,0 fail,0 skipped. .seo-cache/core-guides-test.log
- pnpm test:e2e: isolated production build; ads12,smoke42,claims5,core15 =74/74. .seo-cache/core-guides-e2e.log
- pnpm exec tsc --noEmit: exit0. .seo-cache/core-guides-typecheck.log
- pnpm lint: exit0 after generated .next-verify and .seo-cache exclusions. .seo-cache/core-guides-lint.log
- Targeted ESLint15 modified code files: exit0. .seo-cache/core-guides-targeted-lint.log
- pnpm audit:content:gate:22 changed seed records,0 blockers. .seo-cache/core-guides-gate.log; tracked content-gate-dry-run.csv
- git diff --check: exit0. tsconfig.json has no remaining diff after build.
- Desktop1440 and mobile390:12 screenshot captures inspected in contact sheet; no title/table overflow seen. Automated no-horizontal-overflow and all related destinations200. .seo-cache/core-guides/screens
- SQL regression: retired record excluded before LIMIT while same slug/different type survives.
- Updater:5 focused tests including legacy/stale backups refusing writes, exact complete backup reuse, noop, legacy restore semantics, and protected columns. Test DBs are local only.
- Independent code-reviewer: scoped PASS after fixing two AVMA404 links, fixture date clamp and stale backup reuse. No remaining serious findings.

Manifest: docs/core-guides-update-manifest-20261011.json records22 IDs/files/changed columns/hashes and protected metadata unchanged=true.
Report: docs/core-guides-improvement-20261011.md

Production DB updates, commit/push/deployment and AdSense account/submission: NOT RUN. Expert review: NOT AVAILABLE / NOT CLAIMED. Historical unrelated host-process harness preserved.

Two abandoned initial Windows test temp directories were left intact after automatic approval review rejected cleanup: petjigi-apply-7FT5ae and petjigi-apply-WtXe1h under system Temp. Review gave no detailed reason beyond action rejection. Final redesigned child-process CLI tests pass and do not rely on those artifacts.
