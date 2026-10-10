# Status | 마지막: 2026-10-10
## 현재 작업
심층 개선 F01~F09 로컬 완료(브랜치 fix/deep-improve-20261010, 미푸시·미배포·운영 미반영). 상세: docs/petjigi-improvement/2026-10-10-deep-improve.md. 다음: 승인 후 push/PR, 운영 본문·등록대행 정정.
## 최근 변경
- 10-10: 심층 개선 F01~F09(FLUTD 응급 안내, 미등록 지역 404, 공통 공개 SQL, 검색 ESCAPE, 등록대행 분리, 게이트 CI, 알림 결과 구분, 목차 id) 테스트 287 통과
- 10-10: AKC·FDA 원문 대조로 본문 정정 16건(FDA DCM, AKC 발톱·귀·크레이트·리콜·운동량·견종 체중·수명·영구치·사과·어질리티 등) PR #15~#20, 운영 DB 반영(백업 .backup-prod). 근거 기록 reports/content-claims-audit.csv
- 10-10: PR #9~#12 병합·배포, 운영 DB 본문 152건 CAS 갱신(백업 .backup-prod), 홈 리디자인(뉴스레터 제거·임시 SVG 히어로), 운영 Lighthouse 접근성 100/SEO 100, LCP 272ms
- 10-09: 운영 DB 4행 body만 CAS 반영(열사병·중성화·관절염·오메가3), 운영 확인. 중복 slug 32개 운영 대조(PR #7)
- 10-09: /bucheon/sale 원인 확인: 등록대행 ETL id 100자 절단 충돌 + upsert가 시군구 미갱신(ETL 수정, 데이터 정정은 미적용)
## TODO
- [ ] 승인 후: push/PR, 운영 cat-flutd·구토 글 본문/메타·블로그35 정정(CAS), 등록대행 정정 dry-run→apply→ETL, 사이트맵 재생성
- [ ] tests/home-readiness.test.mjs 복구(기준 커밋부터 깨짐)
- [ ] 열사병 가이드 수의사 검토 후 수정(content-claims-review.md의 patch)
- [ ] 펫로스 가이드 "동물행동심리 전문가 검토" 표기 증빙 확인 또는 제거
- [ ] 109/1588-9191 공식 페이지 확인
- [ ] 밀려난 중복 slug 원고 33건 처리 방침(duplicate-slug-prod-comparison.md). dog-patellar-luxation은 review_queue라 404
- [ ] 등록대행 업체(mafra_registration_agent) 주소·시군구 불일치 208건 정정: ETL 재실행 필요(운영 쓰기 승인). id 100자 절단 충돌은 id 체계 변경이라 별도 판단
- [ ] Vercel Preview 환경에 TURSO_DATABASE_URL 없음 → 프리뷰 빌드 실패(Production은 정상)
- [ ] AdSense 계정 설정(자동광고 URL 제외·CMP) 확인 후 재심사 신청
## 결정사항
- 열사병 등 본문 4건은 운영 DB 직접 반영됨(status·publishedAt 유지)
- 이메일 발송은 운영하지 않음: 환영 메일은 스킵(구독 저장은 정상)
- 모호 시군구(강서구): URL 구조 변경 없이 안내문+noindex
- 사이트맵은 커밋된 public/sitemap-0.xml이 그대로 서빙됨(재생성 후 커밋 필요)
## 주의
- Turso 토큰(turso2.txt)은 화면 노출 1회 → 폐기 필요
- 로컬 main은 origin/main과 갈라짐(미푸시 56098ed는 squash에 포함됨). 정리는 사용자 판단
