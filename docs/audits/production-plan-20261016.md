# petjigi 운영 반영 준비서 — 2026-10-16

상태: 작성만 완료. 원격 push·PR·병합·배포·운영 ETL·DB 쓰기·설정 변경 없음.
기준 main: 73767e3b110352bf2f7ee55d724a1c6a82c4994c. 로컬 브랜치 audit/adsense-final-20261016.

## 반영 범위

스키마·콘텐츠 상태·시드 본문·URL 구조·3곳 기준을 변경하지 않는다. 코드 배포와 ETL 실행은 별도 작업이다.
- 조회: 확정 지역에 시도 조건, 개명 허용, 미분류 행 보존, 모호 비교행 링크 제외, 동일 지역·중복 기준 사이트맵, 보수적 수집일.
- 상세: 상태 기록 충돌 안내. 원본 데이터 삭제·물리 병합·임의 폐업 전환 없음.
- 프런트: 기존 URL 출처 링크, 불필요한 외부 연결 힌트 제거, 보험 계산 금액 검증.
- ETL 코드: APMS 총건수·페이지·원본 ID 검증 후 반영; 좌표 주소 일치·쌍/범위 검증; 오류 실패 종료.

### 정확한 코드·테스트 파일

- `app/[sigungu]/[type]/[slug]/page.tsx`
- `app/[sigungu]/[type]/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/condition/[slug]/page.tsx`
- `app/guide/[slug]/page.tsx`
- `app/layout.tsx`
- `app/tools/region-compare/[type]/page.tsx`
- `components/content/source-reference.tsx`
- `etl/apms/rescued-animals.ts`
- `etl/apms/shelters.ts`
- `etl/geocoding/kakao.test.ts`
- `etl/geocoding/kakao.ts`
- `etl/localdata/address-hash.test.ts`
- `etl/localdata/geocode-batch.ts`
- `etl/localdata/response.test.ts`
- `etl/localdata/sync.ts`
- `etl/mois/animal-hospitals.ts`
- `lib/business-detail-resolve.ts`
- `lib/business-region.test.ts`
- `lib/business-region.ts`
- `lib/content-source-links.test.ts`
- `lib/content-sources.ts`
- `lib/db-queries.ts`
- `lib/etl/apms-collection.test.ts`
- `lib/etl/apms-collection.ts`
- `lib/etl/apms-response.test.ts`
- `lib/etl/apms-response.ts`
- `lib/etl/coordinates.test.ts`
- `lib/etl/coordinates.ts`
- `lib/insurance-estimate-edge.test.ts`
- `lib/insurance-estimate.ts`
- `lib/listing-identity.js`
- `lib/listing-identity.test.ts`
- `lib/privacy/connection-hints.test.ts`
- `lib/region-compare-query.ts`
- `lib/region-compare.test.ts`
- `lib/region-compare.ts`
- `lib/region-summary-query.ts`
- `scripts/audit-consistency-fixture.ts`
- `tests/e2e/create-ads-fixture.mjs`
- `tests/e2e/region-consistency.mjs`
- `tests/e2e/run.mjs`
- `tests/e2e/site-value.mjs`
- `tests/review-rendering.test.mjs`

## 영향 URL·예상 데이터 변경

| 범위 | 영향 | 예상 운영 변경 행 |
|---|---|---|
| /{sigungu}/{type} 및 페이지네이션 | 확정 시도만의 카드·합계, 오래된 행 갱신 지연 표시 | 코드 배포만: 0 DB행 |
| /{type}/{sigungu}/{slug} | 확정 시도 후보·주변시설·상태 충돌 고지 | 코드 배포만: 0 DB행; URL 유지 |
| /tools/region-compare/{type} | NULL/미등록 지역을 미분류에 포함, 개명 링크 대응, 모호 slug 링크 없음 | 코드 배포만: 0 DB행 |
| /sitemap-0.xml | 위의 고유 업체/시도/모호성 기준으로 재생성 | 영향 URL 수 UNKNOWN: 운영 SELECT 필요 |
| 공개 글·가이드 | 저장된 HTTP(S) 출처 주소에만 클릭 가능한 링크 | 본문 DB행 0, 공개 keep 30 유지 |
| APMS 수집기 | 완전 검증 전 데이터 반영 중단, 성공일은 완료 후 | 실제 실행 시 건수 UNKNOWN, 실행 별도 승인 |
| 동물병원·LOCALDATA 지오코딩 | 주소 변경 시 좌표 재사용 중단, 반쪽 좌표 재처리 | 실제 실행 시 건수 UNKNOWN, 기존 DB 좌표 즉시 수정하지 않음 |

## 필요한 승인·입력

1. 이 diff의 원격 반영·main 병합·실제 배포 승인. main은 OVH 5분 자동배포 기록이 있으므로 push/병합도 배포 행위로 취급한다. 자동배포 타이머를 바꾸거나 끄지 않는다.
2. petjigi 전용 읽기 권한으로 현재 배포 커밋/이미지/오버레이·DB 집계 확인. 설정 값은 SET/UNSET·일치 여부만 기록한다. 현재 환경의 프로젝트 DB 자격증명과 기록된 SSH 설정은 없음.
3. 콘텐츠 교정은 `content-corrections-20261016.diff`의 URL별 원문·근거·영향을 보고 별도 승인한다. 이번 코드는 시드/본문을 바꾸지 않았다.
4. 원본 국가·처리 주체·접속 로그 범위 확인 후 개인정보처리방침 교정. OVH라는 이름으로 국가를 추정하지 않는다.
5. ETL 실행·API 활용신청·키 교체·CMP 계정 설정·GSC 제출/재신청은 별도 승인. 현재 수행하지 않는다.

## 반영 직전 dry-run

- 최신 main과 diff 재대조 및 자동배포 운영 상태 읽기 확인.
- 운영 DB SELECT만으로 업종별 원본/대표/충돌/미분류 수, 기존·신규 사이트맵 URL 차이, 공개 keep30/draft652/예약/중복 slug 대조. 원본 식별자 MNG_NO/mgtNo의 유지와 source 별 ID 관계 확인. 실제 영향 목록을 승인 자료에 첨부.
- 운영환경을 읽기전용으로 사용한 빌드 결과의 환경 주입·광고 런타임 대조. fixture 산출물을 public/로 복사하지 않는다.

## 백업·롤백

- 코드 배포 전 현재 이미지 태그·digest·compose·오버레이의 복구 가능한 사본을 승인된 운영 절차로 확보한다. 오래된 STATUS의 이미지 이름을 현재 이미지로 가정하지 않는다.
- 코드 롤백은 검증된 직전 이미지/compose로 복원하거나 승인된 revert 배포. 자동배포가 다시 main을 적용하는 관계까지 점검한다. 이번에는 실행하지 않았다.
- DB 변경 없는 코드 배포에는 DB 복구가 필요하지 않다. 후속 ETL/본문 반영은 별도 백업·변경 전 해시·CAS·원본 보존·복구 검증이 필요하다. 기존 .backup-prod를 삭제하지 않는다.

## 배포 후 검증

- strict-TLS 홈/정책6/공개30/지역/비교/상세/모호/noindex/404의 HTTP·canonical·robots·JSON-LD·광고 마커.
- 실제 public 사이트맵을 다운로드해 수정 전후 URL diff, 각 URL 최종 200/indexable/self canonical. 전수 GET은 동시성1~2, 429/반복5xx에서 중단.
- 공개 keep30 정확 일치·draft652 상태 및 RSS/검색/추천/RSC 노출을 별도 확인.
- 같은 지역 목록 총계·실제 카드/페이지 수·비교표·상세지역수 대조. 새로운 업체 상태를 전화 확인 없이 영업 확정이라고 쓰지 않는다.
- JS 번들 runtime/호스트/페이지 결정 확인. 광고 요청 반복은 mock, 실제 광고 클릭 금지. 계정 ads.txt 인식·심사·CMP는 별도 확인.
- ETL은 별도 승인 후 완전 성공일/오류/캐시 무효화 응답을 확인. 공개 자료 기준일과 실행일을 구분한다.

현재 단계는 수정 코드의 LOCAL_READY이며 PRODUCTION_VERIFIED가 아니다. 재신청 후보는 콘텐츠 중대 오귀속과 운영 정합성 검증 전 NOT_READY.
