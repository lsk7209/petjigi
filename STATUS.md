# Status | 마지막: 2026-10-13
## 현재 작업
(000) 애드센스 재점검: PR #71 병합, 운영 DB 22건 반영 완료(10-13, 시드=운영 30/30, 백업 .backup-prod). petjigi.kr은 OVH VPS(ssh -F ~/.ssh/ovh1_config ovh1, Coolify 컨테이너)가 서빙(Vercel 아님). 10-13 de35b5b 이미지(ovh-petjigi-production:de35b5b-20261013-v1)로 교체 완료, 사이트맵 453건 라이브. 롤백: /data/coolify/services/zlpoefjoahqbwf0dswhrvc7w/docker-compose.yml.before-de35b5b 복원 후 compose up -d web. 빌드는 가용메모리 5GiB 필요(NODE_OPTIONS 힙 2GiB). 이전 메모: 사이트맵 지역/센터 398건 누락 수정, 시드 22건 보강(운영 반영 승인 대기), deploy.yml 상태검증. 보고서 docs/audits/petjigi-adsense-remediation-20261013.md. 결정 대기: 운영 DB 반영, push/배포, Consent 기본값, 얇은 지역 53건.
(00) 애드센스 승인 전 콘텐츠 축소: PR #68~#70 병합·배포 완료. 2026-10-12 운영 --apply 완료(652건 draft: blog 557·guide 64·condition 31, 공개 30건). 스냅샷 .backup-prod/unpublish-contents/snapshot.json, 복구 --restore --yes. 다음: ISR 캐시 만료 후 /condition→/category/health·사이트맵 확인, audit:live, GSC 사이트맵 재제출. docs/unpublish-20261012.md
(0) 애드센스 최종 보강: fix/adsense-readiness-final-20261012 로컬 완료(미push·미배포). 상세 docs/adsense-final-remediation-20261012.md. 남음: 운영 DB 본문 16건 반영 승인, 계정 측 수동 확인(UNKNOWN 11).
(1) 후속 안정화 R01~R06: R01~R04 구현·단위/통합 테스트 완료 → PR #23 병합·운영 배포 완료(main 7f300b4). R05(e2e·CI)·R06(DB 계측) 미착수.
(2) 홈 시안: fix/stabilize-r01-r04에서 홈·헤더 코드 적용+로컬 브라우저 검증 완료(미커밋·미배포). 승인 시안 PNG 원본 미확인 → CODEX_HANDOFF §B 명세 기준 구현. 스크린샷: docs/design/home-verify/. 이미지 기록: docs/home-assets.md.
## 최근 변경
- 10-13: 사이트 재설계 1~4 배포(OVH 6c9be00): 지역 데이터 요약 블록, /tools 허브+지역 비교표, regions 146행 추가(사이트맵 453→1,034, 업체 3곳 이상만), 지역 목록 내부 링크. GSC sitemap.xml 재제출
- 10-13: PR #72~74 병합. ETL 실패 은폐 제거, 지역 목록 중복 제거(OVH 586db12 배포), 동물병원 ETL 전체수집(1,100→10,648건)·운영 반영·주간 워크플로. 나머지 7업종은 LOCALDATA 불통으로 5월 스냅샷
- 10-13: 운영 sitemap-0가 65건으로 재생성되는 결함 재현·수정(additionalPaths), 30건 중 22건 시드 보강, audit-keep30-drift 추가
- 10-12: 운영 unpublish --apply 652건(공개 30건만). PR #68~70 병합, 감사 문서 docs/audits/petjigi-adsense-readiness-2026-10-12.md
- 10-12: Consent Mode v2·운영 호스트 광고/GA4 제한·색인정책 공통화·JSON-LD 정합·내부링크 게이트·claim manifest·readiness 감사 추가(브랜치, 미배포)
- 10-11: 얇은 글 배치 b15~b16(법·제도·이동 6 + 케어·안전 6 = 12건, PR #61~62), 중복 4건 308(사망 말소·크레이트·바닷물·카페 매너). 법·세제는 검증 불가 수치 제외하고 면책 추가. 잔여 blog 약 305
- 10-11: 얇은 글 배치 b13~b14(영양·식이 7 + 입양 8 = 15건, PR #58~59). 간편 알레르기 검사 신뢰성·잡종강세 오해·분양 사기 신호 등 출처 부착. 잔여 blog 약 320 — 다음: 여행·법제도(c4)·케어(c5)·condition/guide
- 10-11: 얇은 글 배치 b10~b12(희귀 건강 16 + 케어·생활 7 = 23건, PR #54~56), 중복 2건 308(비장 종괴·하이킹). 라이신 허피스 근거 부족·FeLV·고혈압 등 출처 부착. 잔여 blog 약 335(가장 얇은 순 계속: 입양·여행·법제도·영양)
- 10-11: 얇은 글 배치 b6~b9(장례·추모 7, 유기·교상 2, 생활·영양·야외 7, 희귀 건강 8 = 24건 보강, PR #49~52). 자택 매장 가능 표기·주사 부위 육종 2-2-2 오기 정정, 면책 보강, 중복 3건 308. 잔여(본문 900자 미만, 공백 제외): blog 약 350·condition 31·guide 33 — 가장 얇은 순(400자대)부터 계속
- 10-11: 얇은 글 배치 b1~b5(소화·영양·훈련·계절·입양 44건 보강, PR #43~47): 출처 부착·운영 CAS 반영, 여름 더위 blog는 열사병 guide로 308. 남은 후보: 펫로스·추모, 법률(과태료·책임), 용품·생활 계열
- 10-11: 시드↔운영 드리프트 22건 운영 반영, 남은 '최대 100만 원'·3개월 표기 정정, 얇은 생활·행동 글 8건 보강(AKC/VCA/HSUS/PMC). 1,000자 미만 비-건강 글 약 300건은 후속(우선순위: 근거 확보 쉬운 영양·행동·실종)
- 10-11: 리디렉션을 guide까지 확장(isRedirectedContent): 동물등록 guide 2건·펫보험 면책 guide를 대표 문서로 308 통합(구 '최대 100만 원' guide 제거), 면책 blog에 거절 사례 병합
- 10-11: 동일 검색 의도 blog 4건 308 통합(펫보험 비교·자기부담금·노령 갱신, 동물등록 구 과태료 글) + 청약철회 기간(생활법령정보 근거) 반영. guide 간 동물등록 3건·exclusions(guide vs blog) 통합은 guide 리디렉션 미지원이라 보류
- 10-11: 펫로스 2·펫보험 2 보강 운영 반영(AVMA·데일리벳 보도·금감원 파인 근거, 미확인 일수·연령 수치 제거). 얇은 글 19건 처리 완료
- 10-11: 천식·비만세포종·임신 케어 보강 운영 반영(apply-content-update가 중복 시드는 운영 id 일치분만 사용). 남은 얇은 글: 펫로스 2·보험 2(공식 근거 필요)
- 10-11: 건강 글 5건 추가 보강(FIV/FeLV·피부 혹·고양이 음식알레르기·간질환·참치) 운영 반영. 남은 얇은 글: 천식(시드 중복)·비만세포종(시드 중복)·임신·펫로스 2·보험 2
- 10-11: 건강 글 7건 보강(운영 DB 반영, 백업 .backup-prod)·shelter 센터 1곳 지역 noindex — 남은 얇은 글 12건은 후속
- 10-11: 4차 감사 — 이중 인코딩 sources 렌더 정규화(blog 326건 출처 미노출 해소), 사이트맵 shelter 404 6건·feed/sitemap 자기등재 제거 — docs/adsense-audit-4th-20261011.md
- 10-11: B01~B04 병합·배포(PR #31 7cace26), 동물등록 가이드 운영 DB 반영 완료(백업 .backup-prod, 복구 --restore). 라이브 고지 페이지 확인은 봇 챌린지로 미완(수동 확인 필요): 동물등록 과태료 정정(20/40/60·변경 10/20/40), 고지 공통 문구, pnpm test:e2e+CI 단계, 체크리스트→지역 선택 링크 — docs/adsense-readiness-20261010.md
- 10-10: AdSense A01~A05 로컬 완료(fix/adsense-a01-claims, 미push·미배포): 주장 정정 3건, 광고 단일 판정, 실용 도구 3종+업체 데이터 범위, 제휴 고지 정정 — docs/adsense-readiness-20261010.md
- 10-10: A01 dog-walk-guide 미확인 수치(43%·552만·AVMA 시간 등) 제거, 요약·표 단위 모순 해소(시드만, 운영 미반영) — docs/claim-verification
- 10-10: 홈 재구성(components/home/*, lib/home-guides.ts)+공통 헤더(8메뉴·GET 검색·1100px 모바일 메뉴 Esc 포커스 복귀). hero-illustration 삭제, 헤더·홈 테스트 갱신
- 10-10: R01 등록대행 ETL 완전 수집 판정+실행 락+재시도. 원본 미확인 행은 폐업 확정 없이 paused(재등장 시 active). 불완전 수집은 exit 1
- 10-10: R02 상세가 지역 판별(resolved/ambiguous/missing) 유지, 동명 업체는 주소·전화·지도 선택 안내(noindex), 주변 시설 시도 한정
- 10-10: R03 등록대행 '운영 중' 제거(lib/business-status-wording.ts), R04 목차 빈 id·엔티티 id 처리
## TODO
- [x] regions 146행 추가(운영 DB 10-13, 롤백: delete from regions where code like 'x-%'): 8개 도+인천 신설구+군위. 사이트맵은 업체 3곳 이상 지역×업종만. 세종 도로명·붙여쓴 구(수원시권선구 등)·legacy 명칭은 제외
- [ ] 사용자 작업: data.go.kr에서 1741000 계열 API(판매업·위탁관리업·생산업·운송업·전시업·수입업) 활용신청 → 나머지 7업종 갱신(LOCALDATA 불통). 미용·장묘업 API명 미확인
- [ ] 카카오 REST 키 403 → 교체 후 신규 동물병원 538곳 지오코딩
- [ ] 10-20경 GSC URL 검사로 색인 재확인(0이면 추가 조사), 애드센스 재신청은 색인·데이터 신선도 개선 후
- [ ] 출처 3건 원문 대조(ACVS, WSAVA 2016, Mueller 2016), deploy.yml(Vercel 기준) 정리
- [ ] 재공개 시 sitemap-0.xml·next-sitemap.config.js /condition 복원; 미추적 .goal-harness/host-process-20260913/ 처리 결정
- [ ] 결정: 얇은 YMYL blog 19건 증보 여부, 센터 1곳 shelter noindex 여부 (4차 감사 문서)
- [ ] law.go.kr 과태료 조문·별표 원문 대조("최대 100만 원" 상한 표현 여러 글), AdSense 계정 심사 상태 확인, www 리디렉션 307→308
- [x] 홈 AI 이미지 10종 생성·WebP 준비(내장 image_gen, 별도 API 키 미사용)
- [x] 홈 구현·로컬 브라우저 검증(문서 명세 기준)
- [ ] 홈: 승인 시안 원본 확보 시 비교, 커밋·운영 반영은 승인 후
- [ ] R05: tests/e2e(격리 SQLite 픽스처+next build/start+playwright-core)·CI job. next.config distDir env 필요
- [ ] R06: 요청별 쿼리 수 계측(db 클라이언트 계층), 근거 있는 최소 최적화
- [ ] 운영 반영 전 승인: R01 코드 배포(paused 의미 변경), 기존 closed 4,873건 처리 방침
## 결정사항
- 승인 전 공개 콘텐츠는 30건만: 얇은 글(약 1,300자 미만·출처 부족)이 "가치 없는 콘텐츠" 거절 위험. 삭제 아닌 draft 전환이라 복구 가능
- 원본 미확인 등록대행 행: closed 대신 paused (스키마 변경 없이 폐업 단정 회피). 별도 source 상태 컬럼은 승인 후 migration
- 검색 slug 맵: 동명 시군구도 같은 slug면 포함(상세가 저장된 시군구명으로 확정)
- 전역 푸터는 유지(정책 링크 이미 존재), 헤더만 시안 반영 예정
## 주의
- 자동배포(2026-10-14): 서버 `petjigi-auto-deploy.timer`(5분)가 main을 읽기전용 deploy key(GitHub key 166413866)로 fetch→OVH 오버레이→빌드→compose 교체(실패 시 롤백). 문서만 바뀐 커밋은 건너뜀. 스크립트 E:\server-ovhcloud\deployuto-deploy\petjigi_updater.py. 끄기: `systemctl disable --now petjigi-auto-deploy.timer`. 실제 빌드·교체 경로는 첫 런타임 변경 병합 때 검증 필요
- 가드 테스트 2건 수정(og-runtime, region-page-integration): 공통 resolver 지연 import 허용, 의도 유지
- Gemini 키 2종 모두 사용 불가(AQ. 토큰 401, AIzaSy 만료)
- Turso 토큰(turso2.txt) 폐기 필요(기존). 키파일 일부가 이번 세션 화면에 출력됨 → Anthropic·바이낸스 키 교체 권장
