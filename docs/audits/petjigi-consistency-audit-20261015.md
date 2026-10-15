# petjigi 일관성 감사 (2026-10-15)

기준: 로컬 main = origin/main = 48cf954. 작업 브랜치 `fix/consistency-audit-20261015` (미push·미배포). 운영 DB는 접근 자격이 없어 읽지 않음(BLOCKED), 운영 영향 건수는 미집계.

## 확인된 문제와 로컬 수정
| ID | 분류 | 상태 | 내용 | 수정 | 검증 |
|---|---|---|---|---|---|
| A1 | 기술 | CONFIRMED→수정 | 사이트맵은 중복 제거 없이 업체 수 계산(실제 2곳/4행 → 사이트맵 포함, 목록은 2곳 noindex) | `lib/listing-identity.js` 공통 SQL, 사이트맵·목록 공유 | 합성 SQLite 재현(구 SQL 1행 포함 → 신 SQL 제외) |
| A2 | 기술 | CONFIRMED→수정 | 대표 행이 id 순서뿐 → 오래된 행이 최신 행 대신 노출 | 최신 `last_synced_at`, 동률 시 작은 id | 단위 테스트 |
| A3 | 기술 | CONFIRMED→수정 | 빈 주소('')·`*` 마스킹 주소가 같은 이름이면 서로 다른 업체가 합쳐짐 | 식별 가능한 주소일 때만 중복 판정 | 단위 테스트 |
| A4 | 기술 | CONFIRMED→수정 | 상세: 출처 중복 2행이 '동명 업체 안내(noindex)'로 처리됨. 검색 API·주변 시설·같은 업종 수·홈 통계는 중복 미제거 | 상세 후보를 대표 1건으로 축소, 나머지 쿼리에 동일 조건 | 정적/단위 테스트 |
| B1 | 정확성 | CONFIRMED→수정 | 지역 요약 시도 순위가 시군구 이름만으로 집계(타 시도 중구가 합산) | 업체 원본 시도도 조건(개명 전후 표기 허용) | 코드 경로 + 변형 테스트(DB 통합 테스트 미작성) |
| B2 | 정확성 | CONFIRMED→수정 | 비교표: 세종 도로명(`ETL parts[1]`)이 시·군·구 열에 노출, 강원도/강원특별자치도 분리 표시 | 미분류 분리(제외 건수 표기), 개명 표기 병합, 수집일·전화 기재 의미·중복 처리 문구 | 단위 테스트 |
| C1 | 정책 일관성 | CONFIRMED→수정 | 상세 metadata는 모호 지역이면 noindex, 본문·광고·JSON-LD는 `ambiguous:false` | `evaluateDetailTarget` 단일 판정 | 단위 테스트 3건 |
| C2 | 운영 | CONFIRMED→수정 | `TURSO_DATABASE_URL` 누락 시 사이트맵 지역 URL이 조용히 사라짐 | 빌드 실패(`SITEMAP_ALLOW_NO_DB=1`로만 예외) | 정적 테스트 |
| D1 | 데이터 | CONFIRMED→수정 | 동물병원 ETL: totalCount 불일치·중간 빈 페이지·페이지 오류에도 성공 종료, 성공 시각 미기록 | `classifyEtlRun(expectedItems)`, 완전 수집일 때만 `etl_sync_state.lastSuccessfulAt` | 단위 테스트(실행은 NOT_RUN) |
| D2 | 데이터 | CONFIRMED(미수정) | 해시 동일 행은 `last_synced_at` 미갱신 → 지역 기준일(max)은 '마지막 변경'. 대표 선택도 같은 의미 | 업종 기준일은 job 성공 시각을 우선(vet). 행 단위 갱신은 쓰기량 때문에 보류 | — |
| F1 | 콘텐츠 | CONFIRMED(미수정) | 공개 30건 중 출처 불일치·내부 메모 노출 | 제안만: `content-review-keep30-20261015.csv` | 원문 조회 2건 |

핵심 콘텐츠 사실(2026-10-15 조회): ACVS 슬개골 페이지의 "90%"는 *보호자 만족도*이지 수술 성공률이 아님(본문은 성공률로 서술). ASPCA 페이지에는 초콜릿·마카데미아의 kg당 수치가 없음(본문은 ASPCA로 귀속). 공개 30건은 본문 1,200~2,400자로 얇은 편이라 "가치 낮은 콘텐츠" 사유가 남을 수 있음.

## 이미 해결·미재현
- ALREADY_FIXED: 사이트맵 additionalPaths, 30건 공개/652 draft(콘텐츠 사이트맵은 `publicContentCondition`+리디렉션 제외), 허가 연도 표는 '현재 영업 중 업체 기준' 문구, 문의 이메일 공통 설정.
- NOT_REPRODUCED: OVH 광고 차단 — 라이브 번들에 `explicit:"production"` 인라인, 홈 200, `ads.txt` 200(pub-3050601904412736), `google-adsense-account` 메타 존재.
- 커밋된 `public/sitemap-0.xml`(453건)은 빌드마다 재생성되는 과거 산출물. 목표값 아님.

## 실행한 테스트
`pnpm test` 562건 전부 통과. `audit:adsense:readiness` PASS13/BLOCKED0/UNKNOWN11, `audit:internal-links` failing=0. 모두 로컬(운영 쓰기 없음). 리포트 파일 변경분은 되돌림.

## 수행하지 못함(NOT_RUN/BLOCKED)
운영 DB 집계(중복 행 수·미분류 수·구신 이중 계수), 브라우저 360/390/768/1440 UX, 도구 입력 검증(G), Lighthouse, GSC/AdSense 계정 조회(H, E-9), 카카오 지오코딩, LOCALDATA 대체 API 문서 확인, 개인정보처리방침 호스팅 문구(Vercel↔OVH) 대조, `next build`·`audit:live` 전수.
의심(SUSPECTED): 주소 문자열이 개명 전후로 달라 중복 제거가 안 되는 이중 계수 — 운영 읽기 집계 필요.

## 운영 반영 준비
- 범위: 코드만(스키마·데이터 변경 없음). 캐시 키 갱신(`region-summary v4`, `region-type-counts v2`, `stats v2`, `type-as-of v2`).
- 영향: 사이트맵에서 얇은 지역(중복 포함 3곳 → 실제 2곳 이하) 제거 가능, 목록·검색의 대표 행 변경 가능(URL 불변), 비교표 미분류 분리.
- 자동배포: main 병합 시 5분 내 자동 반영. 병합 승인 = 배포 승인. 롤백은 STATUS.md의 compose 복원 절차.
- 배포 후 확인: sitemap-0 건수 변화, 대표 지역 목록 건수=카드 수, /tools/region-compare/vet 미분류 문구, 동물병원 ETL 수동 실행 후 `etl_sync_state`(승인 필요).
- 필요한 승인: 병합·배포, 콘텐츠 교정 반영, ETL 실행.

## 재신청 판단
LOCAL_READY(코드). PRODUCTION_VERIFIED 아님. REVIEW_CANDIDATE는 **NOT_READY**: 콘텐츠 정정(F1)·계정 UNKNOWN 11건·10-20 GSC 색인 확인이 남음.
