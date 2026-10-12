# 애드센스 최종 보강 — 2026-10-12

브랜치 `fix/adsense-readiness-final-20261012` (미push·미병합·미배포). 점수·승인 확률은 만들지 않는다.

## 변경 요약
| 영역 | 변경 | 롤백 |
|---|---|---|
| Consent Mode v2 | `lib/privacy/google-consent.ts`, `components/privacy/google-consent-defaults.tsx`(beforeInteractive, 4값 denied, ads_data_redaction), GA4 개인화 신호 제거 | 해당 커밋 revert |
| 운영 호스트 제한 | `lib/privacy/third-party-runtime.ts`, `use-third-party-allowed.ts`. production+`petjigi.kr`+광고 허용 페이지에서만 광고·GA4 로드. 게시자 ID는 production 런타임에서만 사용 | revert |
| 색인·광고·JSON-LD 공통 정책 | `lib/seo/indexability-policy.ts`를 목록·상세·보호센터가 사용. 0건/미수집/모호 지역/고유정보 없는 상세는 noindex·광고 차단·JSON-LD 제외. stale 문구는 "기준일 당시 기록" | revert |
| 구조화 데이터 | localBusiness canonicalUrl 주입·null 생략, Article `dateModified=updatedAt`(미래/역전 방지), 조직 저자는 Organization(+편집 책임 URL), `recognizingAuthority`·`legalStatus`·MedicalCondition·About `sameAs` 제거, 건강 글도 Article | revert |
| 내부 링크 | `internal-link-resolver`, `audit-internal-links`, `audit-live-site.mjs`. 시드 본문 깨진 링크 16건 정리(정확 slug 일치 9건 교체, 나머지는 허브 교체/문구 정리) | revert |
| Indexing API | 일반 콘텐츠 호출 2곳 제거, 함수에 `pageKind` 가드(job_posting/broadcast_event만) | revert |
| 문구 정합 | `lib/editorial-policy.ts` 단일 출처, `/about#editorial-team`, "광고가 아닌 정보" 문구 정정, 개인화 문구 | revert |
| 주장 증거 | `lib/claim-evidence.ts`, `docs/claim-verification/manifest.json`, 게이트 연동. pet-wearable-guide의 미확인 AAHA/APPA 문장 삭제, puppy-first-week-guide AKC 문구 한정 | revert |
| 감사 | `pnpm audit:adsense:readiness`, `audit:internal-links`, `audit:structured-data`, `audit:claims`, `audit:live`, 수동 전용 workflow | — |

## 발견 사항
- 시드 본문에 실제 운영 404 링크 16건(운영 페이지에서 동일 링크 확인, 대상 404 확인). 심각도 중. 시드 수정 완료, **운영 DB 반영은 미실행**.
- petjigi.kr의 MX·SPF·DMARC 조회 결과 없음(읽기 전용 DNS). 문의 메일 수신 불가 가능성 — 운영자 보류 상태, 미수정.
- 고위험 시드에 원문 대조 전 위험 주장 약 260건(`reports/claim-evidence-audit.json`). 대량 재작성하지 않고 needs_review/untracked로 분리.
- 동일 유형의 미확인 기관 권고 문장이 다른 글에도 존재(예: blog-posts-22). 변경 시에만 게이트가 차단.

## 검증 (실제 실행)
- `pnpm test`: 519/519 통과
- `pnpm test:e2e`(격리 production build 포함, next 타입 검사 통과): smoke 42/42, core-guides 29/29, site-value 25/25, ads-decision·content-claims 통과, "E2E 전체 통과"
- `pnpm audit:content:gate -- --base=origin/main`: 변경 17건, 차단 0
- `pnpm audit:adsense:readiness`: PASS 13 · BLOCKED 0 · UNKNOWN 11
- `pnpm audit:internal-links`: 실패 0, scheduled 7(예약 글끼리의 링크)
- tsc(`--noEmit`): 종료 코드 0
- eslint(`pnpm lint`): 종료 코드 0 (초기 오류 1건[렌더 중 Date.now]·경고 1건[beforeInteractive 위치] 수정 후)
- 전체 빌드(next build + next-sitemap): 종료 코드 0. 합성 SQLite fixture DB 사용, 생성된 public/ 산출물은 되돌림
- 브라우저(production start, 합성 fixture): 390/768/1440px + print 에뮬레이션 × 9개 경로(홈·guide·정상/0건 목록·업체 상세·about·privacy·advertising·404) 36건 — 가로 넘침 0, H1 중복 0, JSON-LD 파싱 오류 0, Google/GA 외부 요청 0, consent 기본 4개 denied, 0건 목록·404는 noindex + 광고 차단 마커 + 페이지 JSON-LD 없음
- NOT_RUN: `audit:live`(배포 후)
- 외부 상태(읽기 전용 AdSense API 관측, 2026-10-12): petjigi.kr = GETTING_READY(승인 아님), policyIssues 없음, 계정 경고 SEVERE ads-txt-issues. `www.petjigi.kr/ads.txt`가 307 리디렉션

## 운영 적용 준비 (미실행)
- 코드 후보: 브랜치 HEAD
- 운영 DB **dry-run 실행 완료(읽기 전용, 쓰기 없음)**: 17행 `would_update`, 충돌 0. 결과 `docs/final-production-dryrun-20261012.json`, 허용 컬럼 manifest `docs/final-production-manifest-20261012.json`(본문 17행 + YMYL 5행의 누락 고지문), 변경 전 스냅샷 `.backup-prod/final-20261012/expected-snapshot.json`(gitignore). 시드↔운영 drift인 meta_title 변경 2건은 manifest 밖이라 적용되지 않음.
- 적용(승인 후): `tsx scripts/apply-content-update.ts --apply --expected-snapshot .backup-prod/final-20261012/expected-snapshot.json --manifest docs/final-production-manifest-20261012.json <slug 17개>` (적용 전 `.backup-prod/`에 자동 백업)
- 복구: 같은 인자로 `--restore --yes`
- 예상 변경 행: 17 (body 17, disclaimer 5)
- 배포 후: `pnpm audit:live`, `pnpm audit:structured-data -- --base=https://petjigi.kr /blog/... `

## 미실행
push, merge, deploy, 운영 DB apply, DNS 변경, 메일 발송, AdSense 설정, CMP 계정 설정, 재심사 신청.
UNKNOWN 11건은 `docs/adsense-account-manual-checklist.md` 참조. 재심사 준비 완료로 선언하지 않는다.


## 운영 반영 결과 (2026-10-12, 사용자 승인 후)
- 운영 DB: 17행 `--apply` 완료(14 + 백업 충돌로 건너뛴 3행은 별도 백업 폴더로 재적용), 재 dry-run `noop_identical` 17/17. 백업 `.backup-prod/final-20261012/`(gitignore).
- 병합: PR #64(본 작업), #65(next-sitemap 0건 필터), #66(sitemap-0.xml에서 `/dongjak/sale` 제거). 운영 배포 READY 확인.
- 배포 후 `audit:live`: 1,016개 sitemap URL 전수 문제 0건(HTTP/canonical/noindex/title/description/H1). 첫 실행에서 `/dongjak/sale`(sitemap+noindex) 1건이 발견되어 #66으로 해소.
- 배포 후 `audit:structured-data` 8개 페이지(글·가이드·질환·목록·about·0건 목록·privacy) 이슈 0건. 삭제한 AAHA/APPA 문장이 운영 페이지에서 사라진 것, `/about#editorial-team` 노출 확인.
- 참고: 운영 sitemap은 저장소의 `public/sitemap-0.xml`이 그대로 제공됨(빌드 산출물이 아님). 목록 페이지가 추가·삭제되면 이 파일을 갱신해야 함.
- UNKNOWN 11건(AdSense 승인·CMP·메일·전문가 검토·색인)은 외부 확인 대상으로 남음.
