# 배포·롤백 점검표 (fix/adsense-remediation-20261010)

## 배포 전 (로컬, 완료)
- [x] pnpm test 229 통과
- [x] 합성 DB 브라우저 6/6, 308 리디렉션 2건
- [ ] PR 리뷰, Vercel Preview는 TURSO_DATABASE_URL 없어 빌드 실패(알려진 사항) → 병합 전 로컬 `next build` 필요(격리 DB)

## 배포 순서 (각 단계 별도 승인)
1. PR 병합 → Production 배포
2. 확인: /blog/pet-photo-tips-guide, /blog/cat-treats-guide 308, 사이트맵에 두 URL 없음, lastmod ≥ 발행일
3. (운영 쓰기 승인 후) 시드 본문/출처 수정을 운영 DB에 CAS 반영: 변경된 contents 행 약 90건(`git diff --name-only 596031b -- db/seeds`로 파일 확인, 행 단위는 `scripts/audit-adsense-seeds.ts` 산출 slug와 diff 대조). 반영 전 각 행 본문 백업, `scripts/apply-body-update.ts` 사용
4. 지역 페이지 3상태 표시 확인(정상 0건 / 수집 미확인 noindex)
5. 사이트맵: 커밋된 public/sitemap-0.xml(470 loc, 모호 지역 제외, lastmod 없음)이 서빙됨. 배포 후 /dong/transport 등이 사라졌는지 확인

## 롤백
- 코드: PR revert(리디렉션 즉시 해제)
- DB 본문: 반영 전 본문 백업으로 복원
- 원본 행(blog-374, blog-cat-treats-guide)은 삭제하지 않음

## 운영 반영 기록 (2026-10-10, 사용자 승인: 병합·배포·운영 DB 본문 갱신)
- PR #9(AdSense 개선), #10(메인 리디자인), #11·#12(홈 링크 색 대비 회귀 수정) 병합·배포. Vercel Preview 실패는 Preview 환경에 TURSO_* 가 없기 때문(Production 환경에서는 성공).
- 운영 DB: 시드 본문이 이번 브랜치에서 바뀐 152건만 `apply-body-update.ts --apply`(CAS)로 갱신. 갱신 전 운영 본문 152건이 이전 시드와 동일함을 확인(운영 단독 수정 덮어쓰기 없음), reviewed_at 비어 있음 152/152. 백업은 `.backup-prod/`(gitignore), 결과 `apply-result-20261010.jsonl`, 재 dry-run 152건 모두 noop_identical. 되돌리기: `--restore --yes <slug...>`.
- 시드와 운영 본문이 다르지만 이번 브랜치가 바꾸지 않은 1건은 건드리지 않음.
- 배포 후 확인: 주요 URL 15개 200, 308 리디렉션 2건, sitemap-0 470 URL·lastmod 없음, sitemap-content에 통합 slug 없음·lastmod 있음, 홈 h1 1개·뉴스레터 없음·"(주)" 표기 없음, 갱신 본문 12/12 운영 화면 반영.
- 운영 홈 Lighthouse(모바일): 접근성 100, SEO 100, 모범사례 77(광고 서드파티 쿠키, 기존), LCP 272ms, CLS 0.00. CrUX 현장 데이터는 없음.
- 알려진 사항: `/api/search`는 라우트 코드가 `no-store`를 지정해 vercel.json 캐시 규칙이 적용되지 않음(동작 변경 없음).
- 아직 남음: 수의사 검토, 일부 수치 원문 대조(AKC·FDA DCM·AAFCO 30%), 히어로 사진 교체, AdSense 재심사 신청(사용자).
