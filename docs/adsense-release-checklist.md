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
