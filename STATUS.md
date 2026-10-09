# Status | 마지막: 2026-10-09
## 현재 작업
AdSense 승인 준비 개선: 코드·운영 배포 완료(PR #2~#7 병합). 남은 것은 전문가 검토와 데이터 정리 항목.
## 최근 변경 (최근 5개만)
- 10-09: 운영 DB 4행 body만 CAS 반영(열사병·중성화·관절염·오메가3), 운영 확인. 중복 slug 32개 운영 대조(PR #7)
- 10-09: /bucheon/sale 원인 확인: 등록대행 ETL id 100자 절단 충돌 + upsert가 시군구 미갱신(ETL 수정, 데이터 정정은 미적용)
- 10-09: PR #3 사이트맵에서 noindex 준비 중 시도 8곳 제거(522→514), 운영 확인
- 10-09: PR #2 광고 차단 마커·로더 판단 보류, 펫로스 109, 모호 지역, 404/canonical, CTA·구독 정정
- 10-09: 운영 브라우저 검증(광고 mock) 5경로 통과, 404/없는 질환/준비 중 시도 광고 요청 0
## TODO
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
