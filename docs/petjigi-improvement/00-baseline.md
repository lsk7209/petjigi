# Petjigi improvement baseline

- Timestamp: 2026-09-12 Asia/Seoul
- User goal: improve `petjigi.kr` readiness for AdSense review while preserving the brand, working URLs, design, and core public-data/content features.
- Repository: `E:\web\petjigi`
- Branch: `codex/petjigi-adsense-quality`
- Baseline commit: `023ded6` (`origin/main` at inspection time)
- Remote: `https://github.com/lsk7209/petjigi`
- Production evidence: public responses are served by Vercel; `http://petjigi.kr/*` and `https://www.petjigi.kr/*` redirect to `https://petjigi.kr/*` while preserving paths.
- Stack: Next.js 16.2.6 App Router, React 19.2.4, TypeScript 5.9.3, pnpm lockfile, Drizzle ORM 0.45.2, libSQL/Turso client.
- Content/data: Drizzle schemas and TypeScript seed files; public business listings read the `businesses` table; editorial content reads the `contents` table.
- Deployment boundary: local edits/tests/docs only. No production DB write, migration, push, deployment, DNS/account mutation, paid API call, or real email send is authorized.

## Existing work preserved

The starting worktree was already dirty. These changes predate this improvement run and must not be overwritten:

- `app/[sigungu]/[type]/page.tsx`
- `app/advertising/page.tsx`
- `app/page.tsx`
- `components/content/adsense-trust-section.tsx` (untracked at baseline)

## Current public checks

| Check | Result | Scope |
|---|---|---|
| `/hwaseong/boarding` | 200; visible list and summary both report 50 | Public sample; does not prove total count |
| `/bucheon/sale` | 200; visible list includes addresses outside Bucheon | Public sample; underlying source/administrative cause not yet determined |
| `robots.txt` | 200 via direct curl | Retrieval only |
| `sitemap.xml` | 200 via direct curl | Retrieval only; entry validation pending |
| `sitemap-content.xml` | 200 via direct curl | Retrieval only; entry validation pending |
| `ads.txt` | 200 via direct curl | Retrieval only; AdSense account binding remains unverified |
| `www` host | 307 to apex, path preserved | Representative URL |
| HTTP host | one redirect to HTTPS apex, path preserved | Representative URL |

## Baseline limitations

- The live DB has not been queried directly and will not be written.
- GSC and AdSense account state are not available in the current workspace evidence.
- A public 200 response is not proof of indexing, AdSense crawler access, or policy approval.
- Content machine inventory and claim/source semantic verification are separate workstreams.
