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
- 환경변수: **`RESEND_FROM_EMAIL`이 Vercel에 설정돼 있어야 환영 메일이 발송된다.** 미설정이면 저장만 되고 메일은 스킵(이전엔 petjigi.com 기본값으로 시도). 인증된 발신 도메인 확인 필요(운영자).
- `public/sitemap-0.xml`(추적 파일)은 낡음: 준비 중 시도 8곳 포함. 빌드(`postbuild next-sitemap`)가 재생성하므로 손으로 고치지 않음.
- 열사병 수의사 검토, 펫로스 "동물행동심리 전문가 검토" 표기 증빙, 109/1588-9191 공식 페이지 확인.
- 중복 slug 65건 처리 방침과 운영 DB 실제 보유 행 확인(읽기 전용 쿼리는 duplicate-slug-findings.md).
- 미착수: 주소 불일치(/bucheon/sale) 레코드 단위 분석(운영 데이터 필요), 보호센터 갱신 표기 대조, 페이지네이션 133 fixture(이미 0/1/49/50/51/133 테스트 존재 — lib/business-listing.test.ts), EEA 동의/CMP.
- 법인(주)펫지기 표기·연락처 운영 여부는 사용자 사실 확인 필요.

## 롤백
커밋 단위: `git revert <sha>` (f02b0d1, 92af6fd, 891af15, ebb17ce, 및 이 보고 커밋). 콘텐츠 DB 변경 없음.
