# Status | 마지막: 2026-10-10
## 현재 작업
(1) 후속 안정화 R01~R06: R01~R04 구현·단위/통합 테스트 완료 → PR #23 병합·운영 배포 완료(main 7f300b4). R05(e2e·CI)·R06(DB 계측) 미착수.
(2) 홈 시안: fix/stabilize-r01-r04홈·헤더 구현 PR #24 병합·운영 배포 완료(main 89c0475). 승인 시안 PNG 원본 미확인 → CODEX_HANDOFF §B 명세 기준 구현. 스크린샷: docs/design/home-verify/. 이미지 기록: docs/home-assets.md.
## 최근 변경
- 10-10: 검색 수정 — 업장 검색이 LIMIT 후 링크불가 행을 버려 '병원' 0건이던 문제를 링크 가능 시군구 SQL 선필터로 해결, 공백 토큰 AND 매칭 추가
- 10-10: 홈 재구성(components/home/*, lib/home-guides.ts)+공통 헤더(8메뉴·GET 검색·1100px 모바일 메뉴 Esc 포커스 복귀). hero-illustration 삭제, 헤더·홈 테스트 갱신
- 10-10: R01 등록대행 ETL 완전 수집 판정+실행 락+재시도. 원본 미확인 행은 폐업 확정 없이 paused(재등장 시 active). 불완전 수집은 exit 1
- 10-10: R02 상세가 지역 판별(resolved/ambiguous/missing) 유지, 동명 업체는 주소·전화·지도 선택 안내(noindex), 주변 시설 시도 한정
- 10-10: R03 등록대행 '운영 중' 제거(lib/business-status-wording.ts), R04 목차 빈 id·엔티티 id 처리
## TODO
- [x] 홈 AI 이미지 10종 생성·WebP 준비(내장 image_gen, 별도 API 키 미사용)
- [x] 홈 구현·로컬 브라우저 검증(문서 명세 기준)
- [ ] 홈: 승인 시안 원본 확보 시 나란히 비교
- [ ] 검색: 시군구 없음/미매핑 업장 수 운영 DB 읽기전용 집계(ETL 정규화 점검)
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
