# Status | 마지막: 2026-10-10
## 현재 작업
(1) 후속 안정화 R01~R06: R01~R04 구현·단위/통합 테스트 완료 → 로컬 브랜치 fix/stabilize-r01-r04 커밋 5c80317 (push·배포 안 함). R05(e2e·CI)·R06(DB 계측) 미착수.
(2) 홈 시안 구현: 브랜치 feat/home-approved-design. 코드 미착수, 이미지 생성 스크립트만 준비(scripts/home-assets/generate.py). 이미지 자산 확보가 선행 과제.
## 최근 변경
- 10-10: R01 등록대행 ETL 완전 수집 판정+실행 락+재시도. 원본 미확인 행은 폐업 확정 없이 paused(재등장 시 active). 불완전 수집은 exit 1
- 10-10: R02 상세가 지역 판별(resolved/ambiguous/missing) 유지, 동명 업체는 주소·전화·지도 선택 안내(noindex), 주변 시설 시도 한정
- 10-10: R03 등록대행 '운영 중' 제거(lib/business-status-wording.ts), R04 목차 빈 id·엔티티 id 처리
## TODO
- [ ] 홈 시안: 유효한 GEMINI_API_KEY 또는 사용권 확인된 사진 10종 확보 후 구현(자산 목록은 generate.py ASSETS)
- [ ] R05: tests/e2e(격리 SQLite 픽스처+next build/start+playwright-core)·CI job. next.config distDir env 필요
- [ ] R06: 요청별 쿼리 수 계측(db 클라이언트 계층), 근거 있는 최소 최적화
- [ ] 운영 반영 전 승인: R01 코드 배포(paused 의미 변경), 기존 closed 4,873건 처리 방침
## 결정사항
- 원본 미확인 등록대행 행: closed 대신 paused (스키마 변경 없이 폐업 단정 회피). 별도 source 상태 컬럼은 승인 후 migration
- 검색 slug 맵: 동명 시군구도 같은 slug면 포함(상세가 저장된 시군구명으로 확정)
- 전역 푸터는 유지(정책 링크 이미 존재), 헤더만 시안 반영 예정
## 주의
- 가드 테스트 2건 수정(og-runtime, region-page-integration): 공통 resolver 지연 import 허용, 의도 유지
- Gemini 키 2종 모두 사용 불가(AQ. 토큰 401, AIzaSy 만료)
- Turso 토큰(turso2.txt) 폐기 필요(기존). 키파일 일부가 이번 세션 화면에 출력됨 → Anthropic·바이낸스 키 교체 권장
