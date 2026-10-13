# 펫지기 애드센스 재심사 대비 종합 점검 (2026-10-13)

> 통보 사유(사용자 제공): **"가치가 별로 없는 콘텐츠"** — 고유 가치의 신뢰 정보·도구, 지속적 큐레이션·유지관리, 실제 사용자 관심. 계정 측 세부 사유는 확인 불가.

## A. 종합 진단

| # | 확인된 문제 | 증거 | 상태 |
|---|---|---|---|
| 1 | **운영 sitemap-0.xml에서 지역 목록 398건 + 보호센터가 빠짐** (453→65 URL) | 라이브 65건 = 로컬 `pnpm build` 결과와 동일(재현). 지역·센터 페이지가 force-dynamic이라 next-sitemap이 못 찾음. 10-11 감사 시 454건 | **수정(로컬)** `next-sitemap.config.js` additionalPaths(DB 기준) + 센터 2곳 미만 제외 |
| 2 | 공개 30건 중 **14건 운영 본문이 시드보다 오래됨** (그레인프리·노령 합사 사례 포함) | `scripts/audit-keep30-drift.ts` (읽기 전용) + `apply-content-update.ts` dry-run: 14건 would_update | 시드 보강 완료, **운영 반영 승인 대기** |
| 3 | 위 14건 외 **8건에 미확인 인용·수치** (농식품부 130만 원, "한국 동물병원 통계", 학회·논문 귀속 등), 칼로리 표 계산 불일치 | 운영 본문 전수 스캔 | **시드 수정(삭제 중심)**, 운영 반영 승인 대기 |
| 4 | Actions `Deploy — Vercel Production`이 success인데 Build/Deploy는 skipped | 런 38262248914: 필수 secret 누락→전 단계 skipped. 실제 배포는 Vercel Git 연동이 수행(커밋 상태 `Vercel: success`) | **수정** deploy.yml이 Vercel 커밋 상태를 조회·기록, 실패 시 잡 실패 |
| 5 | **Consent Mode v2: 4개 항목 영구 denied, 동의 업데이트 호출처 없음** | `lib/privacy/google-consent.ts`, `updateGoogleConsent` 사용처 0건. GA4 참여율 10-12 급락 시점과 동일 날짜 배포 | **미수정 — 결정 필요**(아래) |
| 6 | www 307 | 재검증: 현재 **308** → `https://petjigi.kr/` | 해소 |

## 판단이 필요한 항목
- **Consent**: 한국 대상 사이트이므로 EEA/UK/스위스만 denied, 그 외 `analytics_storage` granted로 두면 GA4 지표가 복구될 것으로 추정(원인 확정 아님: 시간 일치 + 구조적 원인). 기존 테스트가 "전부 denied"를 의도적으로 고정하고 있어 임의 변경하지 않았음.
- **애드센스 사유와의 관계**: 사유는 콘텐츠 가치+사용자 관심. 글 30건 축소만으로는 "고유 가치·사용자 관심" 해소가 보장되지 않음. 이 사이트의 고유 자산은 지역 업체·보호센터 데이터와 도구이므로 재심사 전 해당 페이지가 색인·크롤링되는 상태(항목 1)가 중요.

## B. 변경 내역
- `next-sitemap.config.js`: DB 기반 additionalPaths, 보호센터 ≥2곳(lib/shelter-index-policy와 동일) 필터, 등록대행 목록은 기존 정책대로 제외, DB 조회 실패 시 빌드 실패(무음 누락 방지)
- `public/sitemap-0.xml`: 재생성(453 URL: 기존 452 + `/shelter` 허브)
- `.github/workflows/deploy.yml`: Vercel Git 배포 상태 검증 단계, `statuses: read` 권한
- `scripts/apply-content-update.ts`: dry-run/apply 요약에 변경 전후 SHA-256 해시 추가 (기존: dry-run 기본·백업·CAS·복구 이미 구현됨 → 재사용)
- `scripts/audit-keep30-drift.ts` (신규): 공개 건수·keep 일치·시드↔운영 필드 차이 (SELECT 전용)
- 시드 8파일 수정: `db/seeds/blog-posts.ts`, `blog-posts-2.ts`, `-25.ts`, `-26.ts`; `docs/link-repair-manifest-20261012.json` 해시 2건 갱신
- 테스트: `sitemap-policy.test.ts` 2건, `apply-content-update.test.ts` 1건 추가
- **롤백**: 코드는 git revert. 운영 DB는 `apply-content-update.ts --restore --yes <slug>` (백업 `.backup-prod`)

## C. 콘텐츠 30건 검수표
운영 DB: published 30 (blog 25·guide 5), draft 652(blog 557·guide 64·condition 31), keep 목록과 정확히 일치, 중복 slug 0, 예약글 0. 라이브 30건 모두 HTTP 200·canonical 일치·h1 1·내부링크 59종 전부 200.

| 문서 | 공개/HTTP | 본문 | 조치 |
|---|---|---|---|
| blog/pet-insurance-comparison-method | 공개 200 | 일치 | - |
| guide/dog-adoption-checklist | 공개 200 | 일치 | - |
| guide/animal-hospital-guide | 공개 200 | 일치 | - |
| blog/dog-toxic-foods | 공개 200 | 반영 대기(시드 수정) | "ASPCA… 포도 한 알" 단정 삭제 |
| blog/cat-litter-box-guide | 공개 200 | 반영 대기(시드 수정) | "한국 동물병원 통계" 미확인 통계 삭제→AAFP 일반 서술 |
| blog/cat-food-label-guide | 공개 200 | 일치 | - |
| blog/cat-eye-discharge-guide | 공개 200 | 반영 대기(시드 수정) | "국내 60~70% 보균" 삭제→Cornell 일반 서술 |
| blog/dog-patella-luxation | 공개 200 | 반영 대기(시드 수정) | "한국동물병원협회 1위" 삭제, 존재 불명 출처(WSAVA 근골격 지침 등) 제거 |
| blog/dog-food-allergy-elimination-diet-test | 공개 200 | 반영 대기(시드 수정) | WSAVA/Vet Dermatol 오귀속 제거, 출처 교체, 면책 추가 |
| guide/microchip-registration-complete-guide | 공개 200 | 반영 대기(시드 수정) | meta_title 길이 |
| blog/petloss-return-to-daily-life | 공개 200 | 반영 대기(시드 수정) | 미확인 학회·논문 귀속 및 "연구가 있다" 삭제 (출처 1건만 남음) |
| blog/dog-first-adoption-kit | 공개 200 | 반영 대기(시드 수정) | 농식품부 130만 원·수명·훈련사 규칙 등 미확인 수치 삭제, 접종 주기 표현 정정, 출처 교체 |
| blog/pet-bite-liability-guide | 공개 200 | 일치 | - |
| guide/memorial-ceremony | 공개 200 | 일치 | - |
| blog/online-vet-consultation-guide | 공개 200 | 반영 대기(시드 수정) | 면책 문구 추가 |
| blog/senior-young-pet-introduction | 공개 200 | 반영 대기(시드 수정) | 미확인 JVB(2019)·AAHA 인용 제거, 출처·면책 추가 |
| blog/pet-insurance-claim-guide | 공개 200 | 일치 | - |
| blog/cat-dog-harmony-guide | 공개 200 | 반영 대기(시드 수정) | 미확인 학술 인용 제거, 출처·면책 추가 |
| guide/senior-pet-adoption-complete-guide | 공개 200 | 반영 대기(시드 수정) | 출처·면책 추가 |
| blog/dog-homemade-treats | 공개 200 | 일치 | - |
| blog/cat-obesity-diet-management-guide | 공개 200 | 반영 대기(시드 수정) | 칼로리 표가 공식과 불일치(3kg 180→191 등) 정정, 미확인 출처 제거 |
| blog/dog-walk-guide | 공개 200 | 반영 대기(시드 수정) | 미확인 수치 제거, 출처 보강 |
| blog/newborn-and-pet-guide | 공개 200 | 반영 대기(시드 수정) | AAP/GABRIELA 귀속 정정, 출처·면책 |
| blog/child-pet-relationship-guide | 공개 200 | 반영 대기(시드 수정) | AAP/Lincoln 인용 제거, 출처·면책 |
| blog/dog-grain-free-diet-guide | 공개 200 | 반영 대기(시드 수정) | FDA 2022 정정, 출처·면책 |
| blog/dog-camping-guide | 공개 200 | 반영 대기(시드 수정) | 통계 인용 제거, 출처·면책 |
| blog/maltese-care-guide | 공개 200 | 반영 대기(시드 수정) | 출처·면책 |
| blog/smart-home-pet-guide | 공개 200 | 반영 대기(시드 수정) | 출처·면책 |
| blog/working-from-home-pet-guide | 공개 200 | 반영 대기(시드 수정) | 미확인 통계 제거, 출처·면책 |
| blog/cat-senior-diet-transition | 공개 200 | 반영 대기(시드 수정) | 출처·면책 |

잔여 리스크(원문 대조 필요, 사람 확인): `petloss-return-to-daily-life` 출처 1건뿐 · 신규 부착 출처 `ACVS Patellar Luxation`, `WSAVA Vaccination Guidelines(2016)`, `Mueller 2016 BMC Vet Res`는 웹 원문 확인 없이 기억 기준(웹 조회 미실시) · 법령 조문 번호 원문 대조 대기 표기 유지 · 전문가 검수자(reviewer) 없음 — "수의사 검수" 표시 없음(정상).

## D. 지역 페이지 감사 (사이트맵 기준 417: 목록 398 + 센터 19)
- 417/417 HTTP 200, noindex 0, canonical=자기 URL, h1 1, title·description 중복 0
- `/anseong/breeder`: HTML에 34건 업체 링크·ItemList JSON-LD 포함 → 외부 추출 도구의 한계(오탐)
- 표시 건수 ≠ 고유 링크 수 사례(`/dobong/vet` 50 vs 25): 동명 업체가 같은 상세 URL(/vet/{구}/{이름})을 공유. R02의 동명 안내 페이지(noindex)로 처리되는 기존 설계
- 업체 수 분포: 0~9곳 132페이지, 2곳 이하 **53페이지** → 얇은 페이지 후보. **일괄 noindex/통합은 하지 않음 — 승인 요청 대상**
- `/shelter/bucheon` 4개소 정상. 센터 1곳 지역은 noindex이며 이제 사이트맵에서도 제외

## E. 재심사 체크리스트
| 항목 | 상태 |
|---|---|
| 공개 콘텐츠 30건 = keep 목록 | PASS |
| 비공개 652건 보존(draft) | PASS |
| 사이트맵에 draft 미포함 (content 60: blog25·breed30·guide5) | PASS |
| 지역·센터 URL이 운영 사이트맵에 포함 | FAIL(운영) → 로컬 수정 완료, 배포 필요 |
| 30건 본문 시드=운영 | FAIL(운영) → 승인 후 반영 |
| 미확인 인용 제거(30건) | PASS(시드) / 운영 반영 대기 |
| robots·ads.txt·Mediapartners 허용 | PASS |
| www 308 | PASS |
| 배포 상태 표시 | 수정(배포 필요) |
| GA4/Consent 정상 수집 | FAIL 추정(미확정) |
| GSC 비공개 URL 색인 제거 상태 / AdSense·GA4·GSC 계정 설정 | UNKNOWN(계정 접근 불가) |
| Vercel 배포 기록 직접 조회 | BLOCKED(MCP 403: 팀 스코프 권한) |
| 사용자 관심(트래픽) | UNKNOWN — GSC 노출 21/클릭 0 |

## 승인 요청
1. 운영 DB 반영: 22건(`apply-content-update.ts --apply`, 백업·CAS 자동)
2. 로컬 변경 커밋·push·PR·배포 (사이트맵 수정 포함)
3. Consent 기본값 변경 여부
4. 얇은 지역 페이지(≤2곳 53건) 처리 방침
