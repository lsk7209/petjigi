# 최종 보고 (2026-10-09) — 상태: LOCAL_VERIFIED(부분) / RELEASE_READY_WITH_BLOCKERS / PRODUCTION_NOT_APPLIED

기준: 브랜치 `fix/adsense-readiness-20261009` (push 안 함), 시작 HEAD `56098ed` + `origin/main 17f4fe4` 로컬 merge.

## 실제 수정
| ID | 원인 | 수정 | 증거 |
|---|---|---|---|
| 광고 P0 | head 직접 삽입은 `56098ed`에서 이미 제거. 남은 허점: 추모 글 차단이 정적 slug 목록에만 의존 | `adsPolicyAttrs()` 마커를 blog/guide/condition `<main>`에 연결 | scripts/ads-policy-marker.test.ts |
| 펫로스 | 1393 폐지(→109), "6개월 이상" 지연 문구 | page.tsx·contents.ts·FAQ JSON-LD 정정 | scripts/pet-loss-contacts.test.ts |
| 열사병 | "차가운 물 역효과" 등 | **미수정(수의사 검토 대기)**. 검토용 patch만 | content-claims-review.md |
| 지역 | 모호 slug(강서구)가 slug 문자열로 조회돼 항상 0건 | slug view + 안내문 + noindex | lib/region-identity.test.ts, region-page-integration |
| 404/canonical | 없는 질환이 200, 루트 canonical 전 페이지 상속 | notFound(), layout canonical 제거 | ads-policy-marker.test.ts |
| 사이트맵 | 빈 시도 페이지가 noindex 아님 | rows 없으면 noindex,follow (사이트맵 exclude와 일치) | sitemap-policy.test.ts |
| CTA | "무료 비교/견적" 약속 vs 공식 정보 안내 기능 | 문구 정정 | public-trust-copy.test.ts |
| 구독 | 메일 발송 성공/스킵/실패 구분 없음, 발신 기본값 petjigi.com 추측 | sent/skipped/failed 분리, from 미설정 시 스킵 | lib/email/send-welcome.test.ts |
| 중복 slug | contents.slug 전역 UNIQUE, 시드 65건/32 slug 충돌 | 읽기 전용 감사 스크립트 + 보고 | duplicate-slug-findings.md |

## 검증
- `pnpm test`: 201 통과 / 0 실패 (tsx --test). lint·tsc·build는 Stop hook 규칙에 따라 직접 실행하지 않음 → **NOT_RUN**.
- **NOT_RUN**: 브라우저 SSR/hydration/SPA 왕복, viewport 360/390/768/1440, Lighthouse/CrUX, 운영 HTTP 검사 0건, 사이트맵 3종 실파싱, 격리 file DB 통합 테스트.
- 광고는 정적/단위 수준 검증이며 실계정 광고 검증이 아님.
- 기존 테스트 2개 갱신: next-config-cache(upstream rescue 헤더 규칙 변경 반영), newsletter-contract(함수명).

## 운영 반영 안 함 / 후속 필요
- 이메일 발송은 운영하지 않음(운영자 확인, 2026-10-09). `RESEND_FROM_EMAIL` 미설정이어도 구독은 저장되고 환영 메일만 스킵된다 → 블로커 아님.
- `public/sitemap-0.xml`(추적 파일)은 낡음: 준비 중 시도 8곳 포함. 빌드(`postbuild next-sitemap`)가 재생성하므로 손으로 고치지 않음.
- 열사병 수의사 검토, 펫로스 "동물행동심리 전문가 검토" 표기 증빙, 109/1588-9191 공식 페이지 확인.
- 중복 slug 65건 처리 방침과 운영 DB 실제 보유 행 확인(읽기 전용 쿼리는 duplicate-slug-findings.md).
- 미착수: 주소 불일치(/bucheon/sale) 레코드 단위 분석(운영 데이터 필요), 보호센터 갱신 표기 대조, 페이지네이션 133 fixture(이미 0/1/49/50/51/133 테스트 존재 — lib/business-listing.test.ts), EEA 동의/CMP.
- 법인(주)펫지기 표기·연락처 운영 여부는 사용자 사실 확인 필요.

## 롤백
커밋 단위: `git revert <sha>` (f02b0d1, 92af6fd, 891af15, ebb17ce, 및 이 보고 커밋). 콘텐츠 DB 변경 없음.

## 추가: 운영 기준선 재현 (공개 GET 7건, 2026-10-09, 예산 100 내, 429/403 없음)
- 사이트맵: /sitemap.xml 2 loc(인덱스), /sitemap-0.xml 522, /sitemap-content.xml 577 → 합집합 1,099 고유 URL, 중복 0. 기준값(522+577)과 동일.
- 운영 /sitemap-0.xml에 `/sido/gangwon` 포함 (로컬 config는 제외 — 운영은 낡은 산출물).
- 운영 raw HTML의 `adsbygoogle.js` 수: /condition/zzz-not-real=1, /sido/gangwon=1, /gangseo/vet=1, /guide/pet-loss-care=1. **운영은 제외 대상 화면(404, 추모)에도 광고 스크립트를 내보냄.** 로컬 `56098ed`(head 삽입 제거)는 origin/main에 없어 아직 미배포 → 이 브랜치가 해소하는 결함의 운영 재현 증거.
- 운영 /condition/zzz-not-real: HTTP 200 + canonical=홈(`https://petjigi.kr`) + noindex → E05/E06 재현. 로컬은 404로 수정.
- 운영 /guide/pet-loss-care: 1393 포함(수정 전) 재현. 로컬은 109로 수정.
- 운영 /gangseo/vet: HTTP 200, index. 업체 건수·혼합 여부는 DB 데이터 확인 필요(미검증).
- 보호센터 "매주 자동 갱신" 표기 vs `etl-shelters.yml` 월 1회(`0 19 1 * *`) → 표기를 월 1회 점검으로 정정, 계약 테스트 추가.
- 이 결과는 운영 현재 상태 관찰이며, 수정 반영/검증이 아니다(PRODUCTION_NOT_APPLIED).

## 추가: 브라우저 검증 (로컬 격리, 2026-10-09)
- 환경: `next dev -p 3100`, `TURSO_DATABASE_URL=file:<scratchpad>/test.db`(폐기 가능한 로컬 DB, 스키마 `drizzle-kit push`, **합성 fixture**: 일반 글·추모(cat6) 글·서울/부산 강서구·합성 병원 2곳), Chrome(설치본) + `playwright-core` 1.64.0(devDependency, 브라우저 다운로드 없음). 스크립트: `scripts/browser-verify/ads-check.mjs` (localhost 외 실행 거부).
- 광고·분석 도메인은 **mock으로 가로채 기록만** 함(실계정 광고 검증 아님). 모든 요청은 로컬/모킹, 외부 전송 0.
- **발견·수정한 실제 결함**: 스트리밍된 404(`force-dynamic` 라우트의 `notFound()`)는 차단 마커가 hydration보다 늦게 도착 → 로더가 먼저 광고 스크립트를 마운트(수정 전 `/condition/zzz-not-real`: 광고 요청 1, 최종 DOM에 마커+스크립트 공존, 새로고침 1회). `AdsenseLoader`에 `POLICY_SETTLE_MS`(1.2s) 보류를 추가 → 수정 후 요청 0. 정적 테스트로는 잡히지 않던 결함.
- 수정 후 결과 27/27 통과:
  - 직접 접속 7경로: 허용(일반 글) 광고 요청 1·DOM 스크립트 1·raw HTML 스크립트 0 / 제외(카테고리6 신규 글, 펫로스, 404, 없는 질환, 준비 중 시도, 문의) 요청 0·DOM 0·raw HTML 0.
  - SPA 허용→제외→뒤로→앞으로: 제외 화면에 광고 스크립트 0, 이후 6초간 네비게이션 수 불변(무한 새로고침 없음). 참고: 허용→제외 이동은 설계상 새로고침 1회로 광고 런타임을 제거함.
  - 강서구 모호 지역: 200, `noindex, follow`, 서울·부산 안내문, 양쪽 합성 병원 표시.
  - 없는 질환: 404, canonical 태그 0.
  - viewport 360/390/768/1440 × 4경로(실제 `window.innerWidth` 확인): 가로 overflow 0.
- 한계: dev 모드 검증(프로덕션 빌드 아님), 합성 데이터, Lighthouse/CrUX 미실행, 표·키보드·폼 상세 검사 미실행.
