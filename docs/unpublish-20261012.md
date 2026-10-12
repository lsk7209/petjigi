# 우수 콘텐츠 30건만 공개 (나머지 guide/blog/condition 비공개) — 2026-10-12

애드센스 승인 전까지 얇은 글을 노출하지 않기 위한 조치. 승인 후 보강해 다시 공개한다. 영업장·보호센터·견종·도구 페이지는 대상 아님.

## 공개 유지 목록
`docs/keep-30-selection.json` (선정: `pnpm tsx scripts/select-keep-contents.ts`, 읽기 전용).
기준: 본문(공백 제외) 1,300자 이상, 미검증 위험 주장 0~1건(YMYL 0), YMYL은 출처 2개+면책, 카테고리 분산, 실용 도구가 붙은 가이드 3건(dog-adoption-checklist·animal-hospital-guide·pet-insurance-comparison-method)은 강제 포함.

## 동작
- 비공개 = DB `contents.status='draft'` (본문·publishedAt 불변). 상세는 404, 사이트맵(`/sitemap-content.xml`)·피드·검색·OG는 공개 게이트(`publicContentCondition`)로 자동 제외.
- 공개 글이 없는 `/condition` 허브는 `/category/health`로 리디렉션하고 사이트맵에서 제외(`next-sitemap.config.js`, `public/sitemap-0.xml`). 질환 글을 다시 공개하면 자동 복귀하므로 사이트맵 항목도 복원할 것.
- 본문 속 내부 링크 중 비공개 문서를 가리키는 것은 렌더 시 링크를 풀고 텍스트만 남김(`lib/seo/unlink-unpublished.ts`, `lib/seo/public-content-keys.ts`, 1시간 캐시). 재공개하면 링크가 자동으로 살아남.
- 하드코딩 링크 정리: `lib/owner-journeys.ts`(여정당 2~3개), `app/category/[slug]/page.tsx`, `app/(memorial)/category/memorial/page.tsx`, `app/insurance/page.tsx`.
- `lib/content-redirects.ts`: 대상이 비공개인 항목은 308 → 404가 됨(알려진 한계. 재공개 시 복구).

## 운영 적용 (승인 후 순서 고정)
1. 코드 PR 병합·배포 (링크 정리가 먼저)
2. `TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... tsx scripts/unpublish-contents.ts` — dry-run 결과(전환 건수·타입별) 확인
3. `... --apply` — `.backup-prod/unpublish-contents/snapshot.json` 저장 후 일괄 전환 (CAS: id·status='published')
4. 배포 후 `pnpm audit:live`, 홈·/guide·/blog·카테고리 허브 확인, GSC에서 사이트맵 재제출
- 복구: `... --restore` (dry) → `--restore --yes` (스냅샷 행을 published로, 스냅샷은 `.restored-*.json`으로 이름 변경)

## 재공개 계획
승인 후 보강한 글부터 `status='published'`로 되돌린다(복구 스크립트는 전체 일괄 복원용). 부분 재공개는 SQL로 slug 지정.
