# Status | 마지막: 2026-10-09
## 현재 작업
AdSense 승인 준비 개선 (handoff 2026-10-09). 브랜치 fix/adsense-readiness-20261009 (로컬, push 안 함). 1·2단계 완료, 3~4단계 일부.
## 최근 변경 (최근 5개만)
- 10-09: 카테고리6 광고 차단 마커, 펫로스 연락처 109/6개월 문구 정정
- 10-09: 모호 시군구(강서구) 목록 처리 + noindex, 존재하지 않는 질환 404, 루트 canonical 상속 제거
## TODO
- [ ] 사이트맵 3종 실파싱·운영 HTTP 검사 (예산 100요청 내, 미실행)
- [x] 중복 slug 감사 완료(duplicate-slug-findings.md). 운영 DB 행 확인은 운영자 쿼리 필요
- [x] 보험 CTA 정정, 구독 저장/메일 발송 상태 분리 완료 (RESEND_FROM_EMAIL 필요)
- [ ] 브라우저/viewport 검증 (격리 DB+브라우저 필요, NOT_RUN)
## 결정사항
- 열사병 가이드 본문은 미수정: 수의사 검토 대기, 검토용 patch는 docs/petjigi-improvement/2026-10-09-claude/
- 강서구 등 모호 slug: URL 구조 변경 없이 안내문+noindex
## 주의
- 운영 DB/배포/AdSense 변경 없음. 펫로스 가이드의 "동물행동심리 전문가 검토" 표기는 증빙 확인 필요
