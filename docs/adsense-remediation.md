# AdSense 품질 개선 결과 (2026-10-10, 브랜치 fix/adsense-remediation-20261010)

로컬 수정 단계. **푸시·운영 DB 반영·배포·재심사 신청은 하지 않았다.** 승인 여부는 알 수 없다.
이전 작업(PR #2~#8, `docs/petjigi-improvement/2026-10-09-claude/`)에서 해결된 항목은 재수정하지 않았다
(광고 마커, 펫로스, 모호 시군구, 404/canonical, 사이트맵 noindex 시도 제거, heartworm 내부 링크 없음 확인).

## 이번 수정
| 항목 | 변경 전 → 후 | 파일 |
|---|---|---|
| 펫보험 가이드 통계 | 85만 건·+32%·36% → 제거(대체 수치 미삽입), 출처 목록 정정 | db/seeds/blog-posts-2.ts |
| 고양이 품종 AKC 인용 | 메인쿤·브리티시숏헤어·페르시안 AKC 근거 → 제거 | db/seeds/blog-posts-19.ts |
| 사진 가이드 Instagram 2.3배 | 제거, 촬영 설명 유지 | db/seeds/blog-posts-18.ts |
| 강아지 당뇨 출처 | 미확인 WSAVA·대한수의사회 제거, AAHA 2018 추가, 2~3배·2~4주 수치 제거 | db/seeds/contents.ts |
| 사진 가이드 중복 | /blog/pet-photo-tips-guide → 308 → /blog/pet-photo-tips, 고유 팁 병합, 사이트맵 제외 | lib/content-redirects.ts, next.config.ts, app/sitemap-content.xml/route.ts |
| sitemap lastmod | 수정일<발행일 모순 → 둘 중 늦은 날짜 | lib/seo/lastmod.ts |
| 지역 0건 표시 | “ETL 동기화 후 업데이트” → 정상 0건(기준일)/수집 이력 미확인 구분, 대체 경로, 미확인은 noindex | lib/listing-state.ts, lib/db-queries.ts, app/[sigungu]/[type]/page.tsx, app/rescue/page.tsx |
| 중복 통합 2 | /blog/cat-treats-guide → 308 → /blog/cat-snack-selection-guide(더 짧은 문서, 훈련 활용 섹션 병합, 내부 링크 1곳 교체) | lib/content-redirects.ts, db/seeds/blog-posts-28.ts, blog-posts-8.ts |
| AKC 잔여 | 고양이 외출 글 AKC 출처 행, 합사 글 AKC 귀속 제거 | blog-posts-24.ts, blog-posts-4.ts |
| 운영 문서 | 광고·개인정보: "광고를 게재합니다" → "표시할 수 있습니다(승인·정책에 따라 없을 수 있음)", 구독 이메일 보관·해지 경로·접속기록 안내, 소개 "모든 가이드 공인 출처" 과장 완화 | app/advertising, privacy, about |
| 감사 스크립트 | 시드 AST 읽기 전용: URL·통계후보·고양이 AKC·유사 후보 CSV(재실행 동일 확인) | scripts/audit-adsense-seeds.ts → reports/adsense-url-audit.csv, duplicate-candidates.csv |
| 브라우저 검증 | 로컬 file DB 합성 fixture + mock 광고: 3상태 × 390/1440px 6/6 통과(가로 넘침 0, 콘솔 오류 0, 제외 상태 광고 요청 0), 308 리디렉션 2건 확인 | scripts/browser-verify/region-state-check.mjs |
| 근거 보고 | 주장별 상태 CSV | reports/content-claims-audit.csv |

## 운영 공개 사이트 읽기 전용 확인 (2026-10-10, 요청 21건, 429/403 없음 — 로컬 수정 전 상태)
- 정상: /, /blog, /guide/pet-loss-care, /about, /privacy, /advertising, /insurance/compare 200·canonical 자기참조·index. 없는 질환 404+noindex. robots.txt에 Mediapartners-Google 허용, ads.txt `pub-3050601904412736`과 홈 `google-adsense-account` 일치.
- 사이트맵: sitemap-0 514 loc, sitemap-content 577 loc(과거 기준값과 동일).
- **발견·수정**: sitemap-0에 noindex인 모호 지역(`/dong/transport` 등 buk·dong·gangseo·jung·nam·seo 44건)이 포함, lastmod가 빌드 시각(2026-06-02) 3값으로 일괄. → 설정에서 제외 + autoLastmod 끔 + 커밋 산출물 514→470 반영, 회귀 테스트 추가.
- 두 통합 URL은 운영에서 아직 200(배포 전이므로 정상).

## 추가 검증 (프로덕션 빌드, 로컬 합성 DB)
- 타입 검사: 품질 게이트 훅(`quality-gate.sh`)을 변경 파일이 있는 상태로 실행 → `error TS` 없음(exit 0). ESLint(변경 파일): 통과(`next-sitemap.config.js`의 require 규칙 예외 1건 처리).
- `next build` 성공(격리 DB). `next-sitemap` postbuild는 커밋된 사이트맵을 덮어쓰므로 실행하지 않음.
- 프로덕션 서버(`next start`) 브라우저 샘플: 14경로(홈·블로그 목록/글 4·질환·지역 2상태·소개·개인정보·광고·보험 비교·404) × 390/1440px = 28/28 통과(H1 1개, canonical 자기참조, 404는 canonical 없음, 가로·표 넘침 0, 모바일 메뉴 열림, 콘솔 오류 0).
- 308: /blog/pet-photo-tips-guide, /blog/cat-treats-guide 확인. 로컬 sitemap-content.xml에 두 URL 없음.
- Lighthouse(모바일, /blog/pet-insurance-guide, 로컬 http): 접근성 94→96, SEO 92→100(푸터 링크 문구·제목 위계·공유 버튼 접근 이름 수정). 색 대비: 보조 텍스트 토큰 #8c6a4f→#7a5a42(같은 색상계, 대비 4.7↑)로 조정. 남은 항목: 브랜드 강조색(#c97d5b 텍스트, #9caf88 배경+흰 글자)의 대비 부족 — 브랜드 색 변경이라 미변경(제안: #a65f3e / 어두운 글자색), 서드파티 쿠키·inspector issues(광고/분석 스크립트 로드 영향), CLS 0.96. 성능 점수·Core Web Vitals는 운영 환경 측정 필요(미측정).

## 테스트
`pnpm test`: 230 통과 / 0 실패(신규: lastmod, listing-state, content-redirects, redirect-links, unverified-stats-removed).
브라우저(dev 모드, 합성 데이터): 6/6 통과. 운영 반영 후 재검증(HTTP·Lighthouse 성능): 미실행.

## 주의: 시드 수정 ≠ 운영 반영
운영 본문은 DB에 있다. 위 콘텐츠 수정은 시드에만 반영됐고 운영 DB에는 `scripts/apply-body-update.ts`(CAS) 등으로 별도 반영해야 한다(운영 쓰기 승인 필요).
리디렉션·페이지 로직은 배포해야 적용된다. 통합 원본(blog-374)은 DB/시드에 보존.

## 미해결 / 확인 필요
- /gangnam/funeral·/dong/transport: 수집 이력 테이블(etl_sync_state)은 구조동물 ETL만 기록. 영업장 ETL의 마지막 성공/시도 기록은 없어 “행 갱신일”로 대체 표시. 영업장 ETL에 기록 추가는 후속.
- 동구·서구 등 동명 지역: 기존 안내문+noindex 유지(이전 PR). 시도 코드 기반 분리는 URL 이전이라 별도 승인.
- 다른 시드의 같은 유형(출처 미확인 통계·AKC/WSAVA 인용)은 전수 검증 못함: 고양이 AKC 3건·당뇨·보험·사진만 처리. `pnpm audit:sources` 확대 필요.
- 수의사·보험 전문가 검토, (주)펫지기 법인 여부는 운영자 확인 필요. 보험 CTA는 소스상 본문 뒤 1회뿐이며 글 상단 반복 배너는 코드에서 확인되지 않아(운영 DB 본문 내 삽입 가능성은 미확인) 변경하지 않음. 문의 페이지에는 데이터 오류 신고 경로가 이미 있음.
- 문서(법률) 적합성은 코드 대조만 했고 법률 검토 완료가 아님.
- **출처 귀속 통계 일괄 정리(이번 추가)**: 자동 추출한 통계 후보 143문장과 추가 패턴 46문장(총 약 190문장, 약 80개 문서)을 문장 단위로 다시 써서, 원문을 확인하지 못한 기관 귀속·구체 수치를 제거하고 정성적 설명으로 바꿨다(의미 있는 안내·주의 문구는 유지). 재작성 목록: `scripts/data/claim-rewrites-1~7.json`. 검증 못 한 수치를 '검증됨'으로 바꾼 것이 아니라 **제거**한 것이다. 예외(ALLOW): AKC 견종 표준(개 품종 체중·수명), AAFCO 고양이 단백질 기준, FDA DCM 조사 언급 — 이들도 개별 수치는 원문 대조 전이다. 회귀 테스트 `scripts/seed-attributed-stats.test.ts`가 기관 귀속+구체 수치 문장의 재유입을 막는다.
- 이전 설명(참고): 통계 후보 81개 문서(143문장)는 `reports/content-claims-candidates.csv`에 자동 추출, 당시 **전부 원문 미확인 상태**. 이번에 원문 확인을 시도해 수치를 제거한 것은 보험·반려묘 가구/코숏·사진·당뇨·노령묘 40%·AKC 고양이 등 `reports/content-claims-audit.csv` 행. 나머지는 사람 검증 대기(예: ISFM 58% 등).
- 중복 후보 분류(reports/duplicate-candidates.csv, 제목/본문 유사도):
  - 통합 완료: cat-treats-guide → cat-snack-selection-guide
  - 차별화 수정 완료: pet-moving-guide(이사 전 준비·당일) vs pet-moving-new-home-adaptation(도착 후 적응; 제목·메타·도입 재작성, 중복 단계 제거, 상호 링크), cat-senior-diet-transition(전환 방법) vs senior-cat-food-guide(선택 기준; 제목 변경, 상호 링크)
  - 유지: cat-flea-tick-prevention vs dog-flea-tick-guide, senior-cat-adoption vs senior-dog-adoption(종이 다름)
  - 보험 비교·수분·치아·품종 주제는 이 유사도 기준(≥0.3 본문, ≥0.6 제목)에서 후보 없음. 의도 겹침은 사람이 판단.

## 배포·롤백
배포: 리뷰 → PR 병합 → Vercel 배포 → (별도 승인) 운영 DB 본문 CAS 반영 → sitemap 재생성 확인.
롤백: 커밋 revert(리디렉션 즉시 해제). DB 본문은 apply-body-update의 이전 본문 백업으로 복원.

## 재심사 판단
**준비 완료라 할 수 없음**: 운영 미반영, 전문가 검토 대기, 전수 출처 검증 미완.
