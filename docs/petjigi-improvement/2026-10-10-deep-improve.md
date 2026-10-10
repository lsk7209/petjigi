# 2026-10-10 심층 개선 (F01~F09)

기준: origin/main `79edd7e`. 브랜치 `fix/deep-improve-20261010` (로컬, 미푸시·미배포). 운영 DB·배포·검색엔진 제출은 하지 않음.

상태 범례: ✅로컬 수정·테스트 완료 / 🔶운영 미반영 / ⛔권한 부족 미검증 / 👤전문가·승인 필요

| ID | 우선 | 원인 → 수정 | 검증 | 상태 |
|---|---|---|---|---|
| F01 | 최상 | 공통 배너·`cat-flutd`·구토 글·블로그 35에 "12시간 이상 소변 없음", "수컷에서만", 출처 없는 발생률(55~65% 등) → 시간 기준 제거("힘주는데 거의/전혀 안 나오면 즉시 진료, 기다리지 말 것"), 수컷은 "위험이 더 높음"(Cornell 원문), 수치 삭제, Cornell 출처 추가, 구토 글 메타의 근거 없는 "수의사 검토 자료" 문구 수정. 재발 방지 규칙 `URINARY_WAIT_THRESHOLD`(게이트+전체 소스 스캔 테스트) | 수정 전 테스트 실패 → 후 통과 | ✅ 🔶 👤(수의사 검토는 받지 않음) |
| F02 | 높음 | 미등록 지역을 지역명처럼 렌더 → `RegionSlugView.kind`로 `missing`이면 `notFound()`. 기준일: 결과 있으면 지역 행 기준, 0건이면 "업종 전체 기준"임을 문구·`scope`로 명시(지역 단위 수집 완료를 보증하지 않음). 동명 지역(서울/부산 강서)은 기존 안내·noindex 유지 | 프로덕션 빌드+격리 DB: 미등록 지역 **HTTP 404**, 강서구 noindex+안내, 0건 지역 noindex | ✅ 🔶 |
| F03 | 높음 | 등록대행을 `sale`로 저장·100자 절단 ID·모듈 import 시 즉시 실행 → 전용 업종 `registration`("동물등록 대행기관"), 전체 정규화 입력 SHA-256 ID(절단 없음), 완주 시에만 미갱신 행 `closed`(삭제 없음), 영업상태 단정 문구 제거, 실행 진입점 분리(`run-registration-agents.ts`). 정정 도구 `scripts/correct-registration-agents.ts`: dry-run 기본, `--apply`는 fingerprint 확인+CAS+백업 | 충돌/멱등/분류/CAS 테스트, import 부작용 없음 테스트 | ✅ 🔶(운영 행 미정정) |
| F04 | 높음 | 관련 글·이전/다음·상세·OG·피드·사이트맵·검색 각자 조건 → `publicContentCondition()` 단일 SQL(상태·타입·`julianday` 유효 과거 시각, LIMIT 이전 적용), 동일 시각 `id` 보조 정렬 | 인메모리 SQL 테스트(JS 판정과 전 행 일치), 실서버: future/draft/잘못된 날짜 404, 목록·피드·사이트맵·추천 링크 비노출 | ✅ |
| F05 | 중 | LIKE에 ESCAPE 없음 → `ESCAPE` 바인딩 추가(제거 시 `%`,`_` 테스트 실패 확인), 동명 시군구 Map 덮어쓰기 → 모호하면 링크 제외, 캐시 삽입 후 상한 보정(삽입/갱신/만료/1000회 연속 테스트), 콘텐츠 검색을 LIMIT 이전 공개 조건으로 | 실 libSQL 쿼리 5종, 실서버 검색 응답 | ✅ (호출량 제한은 플랫폼 기존 제한 조사 미실시) |
| F06 | 높음 | 게이트 기본 비교가 HEAD → local/base/manifest 분리(`lib/content-gate-scope.ts`), CI에서 기준 없음·잘못된 ref·얕은 이력은 exit 2, 결과에 `verdict`(검사 0건/차단 0건 구분), `ci.yml` 추가(test·tsc·lint·게이트) | 임시 git 저장소 시나리오(미커밋/untracked/커밋 후 클린/merge/없는 ref/변경 없음/manifest) + 실제 CLI 4모드 | ✅ |
| F07 | 중 | 알림이 `allSettled` 결과 미확인 → 서비스별 success/failed/not_configured/no_targets, 실패는 exit 1이나 deploy 워크플로에서 `continue-on-error`(배포 실패와 분리). deploy.yml: `vercel pull`→`vercel build --prod`→`deploy --prebuilt`(기존 `pnpm build`는 `.vercel/output`을 만들지 않음), Job Summary에 DEPLOY_SKIPPED/DEPLOYED/FAILED | 알림 단위 테스트. **워크플로 실행은 못 함** | ✅ ⛔(실제 배포 주체: Vercel API 403) |
| F08 | 중 | **변경 없음.** 요청당 쿼리 수 실측 시도(프로세스 훅)가 ESM 로딩 때문에 실패. 정적 분석: 블로그 상세 ≥5쿼리(본문1·이전/다음2·관련글1·관련가이드1), `force-dynamic`. 공개 시각 필터가 SQL에 있는 지금 구조에서 근거 없이 캐시 시간을 늘리면 비공개 전환/예약 공개가 지연되므로 보류 | — | ⛔ 실측 미완료 |
| F09 | 중 | 목차: 3개 페이지 복제 로직 → `lib/toc.ts` 단일화(기존 id 사용, 중복 id 교체, 빈 제목 인덱스 어긋남 해결). 홈: 서울 고정 CTA 2곳 → `#hm-local`, "임시 일러스트…" 메모 제거. 사이트맵 `<loc>` XML 이스케이프·URL 인코딩 | toc 7케이스, 실서버 목차 href 대상 전부 존재, 홈 DOM | ✅ (광고 SPA 이동·키보드·모바일 브라우저 검증 미실시, 구독 개인정보 대조 미실시) |

## 검증 실행 기록
- `pnpm test`: 355 tests / 355 pass / 0 fail / 0 skip. 기준 커밋의 스크립트는 `etl/**`·`tests/**`를 포함하지 않아 이번에 포함했다(`tests/`는 기준 커밋 61/62, 내 변경 직후 14건 회귀를 발견해 픽스처 stub 보강으로 해결).
- `tsc --noEmit`: exit 0, `eslint app lib scripts etl`: 0 error 0 warning
- 격리 `next build`(file DB, `.env*` 없음) exit 0 → `next start` 실서버 curl 14개 URL·검색·SEO 헤더 확인. 임시 DB·서버는 삭제/종료.
- `tests/home-readiness.test.mjs`는 기준 커밋부터 깨져 있었음(리디자인 후 stub·낡은 단언) → stub 추가, 사라진 문구(보험 링크·갱신 주기·집계 수) 단언 제거, 지역 CTA 단언 추가로 복구.
- 미실시: Lighthouse·브라우저 렌더 검증, `next-sitemap` 재생성(정적 `public/sitemap-0.xml`에 `registration` 반영하려면 재생성 후 커밋 필요).

## 운영 반영 대기 (승인 필요)
1. 브랜치 push → PR → 병합(= 자동 배포 가능성 있음). CI 신규 `ci.yml` 포함.
2. 운영 DB 본문 정정: `cat-flutd`, `cat-vomiting`(메타), 블로그 35 — `scripts/apply-body-update.ts` 절차(백업→CAS). 메타 설명 갱신 필요 여부는 해당 스크립트가 body만 갱신하므로 별도 CAS 필요.
3. 등록대행 정정: `tsx scripts/correct-registration-agents.ts`(dry-run) 결과 확인 후 `--apply --confirm=<fingerprint>` → ETL 재실행(신규 해시 ID 행 생성, 구 ID 행 closed). **운영 건수는 이번에 조회하지 않음.**
4. 사이트맵 재생성·커밋.
5. GitHub secrets 실제 보유 여부와 Vercel Git 연동 병행 여부 확인 후 `deploy.yml` 이중 배포 여부 결정.

복구: 코드는 브랜치 revert. DB는 `.backup-prod` 백업 + CAS 롤백, 등록대행은 `registration-retype.<fingerprint>.json` 백업으로 type 복원 가능.
