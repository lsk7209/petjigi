# AdSense 심사 준비 개선 결과 (A01~A05, 2026-10-10)

브랜치 `fix/adsense-a01-claims` (로컬 커밋만, push·배포·운영 DB 쓰기 없음). 자체 점수는 Google 승인 점수가 아니다.

## 상태 요약
| 항목 | 상태 |
|---|---|
| A00 신청 상태 | **계정 확인 대기** — 이 환경에서 AdSense 계정 접근 불가, 심사 사유 미확인. `db_petjigi`의 NOT_IN_CONNECTED_ACCOUNTS는 거절/미신청 근거 아님 |
| A01 주장 정정 | 로컬 수정·검증 완료 / **콘텐츠 검토 대기**(공식 약관·법령·수의학 원문 대조) / 운영 미반영 |
| A02 광고 판정 | 로컬 수정·브라우저 검증 완료 / 운영 미반영 / 계정 설정 확인 대기 |
| A03 추가 가치 | 로컬 구현 완료 / 운영 미반영 |
| A04 고지 정합성 | 로컬 수정 완료 / **운영자 사실 확인 필요** |
| A05 회귀 검증 | 로컬 동등 검증 완료(원격 CI 미실행) |

## A01 변경 (docs/claim-verification/*.md에 주장별 기록)
dog-walk-guide(메타 설명 포함), pet-insurance-guide(30일 면책·10~30%·가입 연령·수명·예시 가정 명시), maine-coon-care-guide(VCA·WSAVA·OFA·ASPCA 귀속 삭제). cat-flutd 응급 안내는 변경 없음. 회귀 테스트: `scripts/seed-summary-consistency.test.ts`.

## A02
`docs/ads-decision-verification.md` 참조. 단일 판정 `decideAdPage`, 장례 상세 경로 누락·마커 누락 수정, 타이머 제거, 브라우저 12 시나리오 통과.

## A03
- 동물병원 질문표(`/guide/animal-hospital-guide`), 동물등록 확인 순서(`/guide/microchip-registration-complete-guide`, 운영 DB에 존재하는 slug), 펫보험 같은 조건 비교표+계산 예시(`/blog/pet-insurance-guide`). 서버 렌더링, 입력 저장·전송 없음. `lib/practical-tools.ts`에 데이터.
- 업체 상세 "이 정보의 범위": 출처·등록 항목·수집일(원본 기준일 미제공 명시)·미제공 항목.
- 홈은 승인 디자인 유지를 위해 변경하지 않음.
- 검색 의도 중복 후보(통합/역할 분리 검토, 이번에 조치 없음): `microchip-registration-complete-guide` · `microchip-animal-registration-guide` · `animal-registration-change-cancel-guide` / `pet-insurance-*` 40여 건(가입 전·비교·자기부담금·면책·갱신 등).

## A04
- /disclosure: 제휴 링크가 코드에 없는데 쿠팡파트너스·비마이펫·라이펫을 "참여 프로그램"으로 나열 → "현재 게재된 제휴 링크 없음 / 도입 시 표시 방침"으로 정정. 내부 링크 CTA(카테고리 3·4)의 "제휴 링크·수익" 라벨 제거.
- 근거 없는 "전문가 추천"·"신뢰할 수 있는" 문구 제거, 신뢰 섹션의 "현장 확인" 문구 삭제.
- /about에 AI·자동화 사용 범위 명시. /privacy에 쿠키 거부 안내·Google 정책 링크 추가.

## A05 검증 (로컬)
- `pnpm test`: 423 tests, pass 423, fail 0, skipped 0.
- `audit:content:gate --base=main`: 12건 검사, blockers 0.
- 격리 production build(`NEXT_DIST_DIR=.next-verify`, 합성 SQLite) + 브라우저: `tests/e2e/ads-decision.mjs` 12/12, `tests/e2e/smoke.mjs` 42/42 (13개 페이지 × 360/768/1440, 가로 넘침·h1·실용 도구 가시성, 360은 JS 비활성, 404, 키보드 첫 포커스, 계산 예시 동작).
- lint / tsc는 사용자 규칙에 따라 직접 실행하지 않음(Stop hook 담당). 원격 CI·Lighthouse·실사용 CWV 미측정.

## 승인/확인 필요
1. **운영 반영**(콘텐츠): body 외에 metaDescription·sources 변경은 `apply-body-update` 확장 또는 별도 CAS 필요. dry-run → 백업 → 승인 후 apply → 사후 비교.
2. **코드 배포**(main push → 자동 배포): 광고 판정, 고지, 실용 도구.
3. **AdSense 계정**: 실제 심사 사유, 자동광고 URL 제외 설정, EEA/영국/스위스 CMP 적용 여부, publisher ID 일치, ads.txt 상태.
4. **운영자 사실**: 쿠팡파트너스 등 제휴 가입·계약 여부(가입했다면 링크 게재 시 고지 갱신), AI 사용 범위 문구 적합성, 문의 메일함 수신 여부(SITE_IDENTITY UNKNOWN), 수의사/전문가 검토 계획(검토 기록 미생성).
5. **콘텐츠 검토**: 동물보호법 제13조·시행규칙, 보험사 약관, 품종 질환 문헌 원문 대조.

## 운영 DB 반영 기록 (2026-10-10, 사용자 승인 후)
- `scripts/apply-content-update.ts`(body·metaDescription·sources CAS, 시드가 정의한 컬럼 중 달라진 것만 변경)로 dog-walk-guide / pet-insurance-guide / maine-coon-care-guide 적용. 격리 DB에서 dry-run·apply·재실행 no-op·restore 검증 후 운영 실행.
- 적용 전 원본은 `.backup-prod/<slug>.<id>.content.json`(gitignore)에 저장. 복구: `--restore --yes <slug>`.
- 사후 재실행 dry-run 3건 모두 noop_identical. status·publishedAt·reviewer 필드 불변.

## 배포 경로 진단 (2026-10-11)
- Vercel 프로젝트는 GitHub 연동(productionBranch=main)이며, main 병합마다 Git 연동이 Production 배포를 만든 것을 확인(#27 acd9229, #28 228d5da = source git, READY). #26(a2e9121) 병합 직후 한 건은 목록에 없었고 이후 수동 `vercel deploy --prod`로 보완했으나, 이후 병합은 자동 배포됨. 프로젝트 설정 변경 불필요.
- GitHub Actions `Deploy — Vercel Production`은 배포 시크릿이 없어 의도대로 skip(Git 연동이 담당). Preview 배포 실패는 기존 알려진 원인(TURSO_*가 Production에만 있음).
