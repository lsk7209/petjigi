## 2026-09-30 12:56 (F01 운영 DB 반영, 세션 계속)

### 수행 작업
- 사용자가 제공한 Turso 운영 DB 자격증명(채팅에 노출된 토큰, 회전은 사용자가 직접 처리하기로 함)으로
  F01(26건 콘텐츠 운영 반영)을 SELECT-only 비교 → dry-run → 실제 반영 순서로 진행.
- [scripts/compare-content-promotion.ts] 신규 — SELECT-only. db/seeds/*.ts의 코드 값과 운영 DB
  현재 값을 title+body+sources+updatedAt sha256 hash로 비교, `content-promotion-manifest.json` 생성.
- [scripts/promote-reviewed-content.ts] 신규 — 기본 dry-run, `--apply` 명시 시에만 실제 UPDATE.
  compare-and-swap(UPDATE 직전 재조회 후 hash/id/status 재확인) + 개별 트랜잭션 처리.
  publishedAt은 SET 목록에서 제외해 절대 변경하지 않음. reviewedAt/reviewerName 미생성.
- [scripts/verify-content-promotion-safety.ts] 신규 — 반영 후 SELECT-only 사후 검증
  (status=published 유지, published_at 보존, review 필드 미생성 확인).
- **발견 및 제외한 2건의 slug 충돌** (원래 26건 → 24건 반영):
  - `dog-patellar-luxation`: guide(published)와 condition(review_queue)이 같은 slug로 중복
    정의. 운영은 review_queue 쪽을 점유 중 — 그대로 반영하면 미검수 의료 초안을 공개하는
    효과가 나서 제외.
  - `dog-paw-care-guide`: blog-161과 blog-324가 같은 slug로 완전히 다른 글을 정의. 운영은
    blog-324를 점유 중 — blog-161 코드값으로 덮으면 다른 글로 바꿔치기하는 결과라 제외.
  - 두 건 모두 `docs/petjigi-improvement/2026-09-30-f01-content-promotion-manifest.md` 6절에
    기록, 별도 사용자 결정 필요.
- **24건 실제 UPDATE 실행 완료** (`--apply`). 결과: 24건 모두 `updated`, `rowsAffected: 1`, 에러 0건.
- 반영 후 재검증: 24건 모두 title/body/sources가 코드와 정확히 일치(`changed_fields: []`),
  `status=published` 유지, `published_at` 원본 보존, `reviewed_at`/`reviewer_name` 미생성 확인.
- [docs/petjigi-improvement/2026-09-30-f01-content-promotion-manifest.md] 위 전체 과정과 결과로 갱신.

### 설정 변경
- 없음. 운영 자격증명은 세션 중 셸 환경변수로만 사용, 파일로 저장하지 않았고 세션 종료 후 삭제.

### 보안 참고
- 사용자가 채팅에 Turso 인증 토큰을 평문으로 붙여넣었다(이 대화 로그에 남음). 토큰 회전은
  사용자가 직접 처리하기로 함 — 아직 회전 여부 확인되지 않음.

### 미결 사항
- Turso 토큰 회전 여부 확인 필요(사용자 처리 예정이라고 함).
- `dog-patellar-luxation`, `dog-paw-care-guide` 2건의 slug 충돌 처리 방향 미결정 — 사용자 결정 후
  별도 승인·반영 필요.
- F16(Vercel Git Integration 확인), T03/T19(브라우저 통합 테스트) 등 이전 미결 사항 유지.
- 현재 로컬 커밋(`fb13e98`)은 origin/main에 push 완료 상태 확인 필요 — 이번 F01 반영분(신규
  스크립트 3개, manifest/result json, 문서 갱신)은 아직 커밋되지 않음.

---

## 2026-09-30 12:24 (세션 시작 시간)

### 수행 작업
- 이전 세션(petjigi_codex_improvement_2026-09-30.md 기반) 인수인계 확인: `.goal-harness/STATUS.md`,
  `docs/HANDOFF.md`, `docs/petjigi-improvement/progress.md`, `docs/petjigi-improvement/2026-09-30-review.md`
  를 읽고 F03~F15 코드 수정(174/174 테스트 PASS)이 이미 작업 트리에 커밋되지 않은 상태로 남아있음을 확인.
- **F07 페이지 통합 완료** (이전 세션에 NOT_RUN으로 남았던 부분):
  - [lib/db-queries.ts] `getCachedResolvedRegion(sigunguSlug)` 신설 — `getCachedRegionCandidatesBySlug` +
    `resolveRegionIdentity`를 사용해 slug가 여러 시도에 걸쳐 모호하면(서울/부산 강서구 등) 임의의
    첫 행 대신 `undefined`를 반환.
  - [app/shelter/[sigungu]/page.tsx] [app/[sigungu]/[type]/page.tsx] [app/[sigungu]/[type]/[slug]/page.tsx]
    deprecated `getCachedRegionBySlug` 호출을 `getCachedResolvedRegion`으로 교체. 기존 `region?.xxx ?? slug`
    폴백 패턴을 그대로 활용해 URL 구조는 변경하지 않음.
  - [scripts/region-page-integration.test.ts] 신규 — 3개 페이지가 안전한 헬퍼를 쓰는지 정적 검증.
- [docs/petjigi-improvement/2026-09-30-review.md] F07 페이지 통합 세션 기록 추가.

### 설정 변경
- 없음 (임시 `.env.local`과 `.tmp-validation-next/` 격리 DB는 격리 빌드 검증 후 즉시 삭제, 저장소에
  남기지 않음).

### 검증
- `pnpm test`: 178/178 PASS (기존 174 + 신규 4)
- `pnpm exec tsc --noEmit`: 오류 없음
- `pnpm lint`: 오류 없음
- `pnpm exec drizzle-kit push --force` (격리 로컬 파일 DB): 성공
- `pnpm build` (격리 DB, fixture 데이터 없음): 경고 없이 성공, 대상 3개 라우트 정상 생성
- 빌드로 오염된 `public/sitemap-0.xml`은 `git checkout`으로 즉시 복원 (운영 사이트맵 보존)

### 미결 사항
- F01/F17 (26건 콘텐츠 운영 반영): 운영 DB SELECT-only 접근 승인 필요, `PREPARED_NOT_APPLIED`.
- F16 (Vercel Git Integration 활성 여부): 계정 읽기 접근 필요, `VERIFY_LIVE`.
- T03 (검색 race condition 브라우저 통합 테스트), T19 (모바일/접근성 실제 캡처): 미실행.
- 현재 작업 트리에 F03~F16 전체 변경분이 커밋되지 않은 상태(git status 상 M/?? 다수). 사용자가
  커밋/push를 명시적으로 요청하면 진행 (전역 지침: GitHub push까지만 허용, 배포는 금지).
- `dog-paw-care-guide` slug 중복(blog-161/blog-324) 처리 방향 미결정.

---
