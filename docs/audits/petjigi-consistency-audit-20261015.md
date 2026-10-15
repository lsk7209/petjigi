# petjigi 애드센스 재심사 대비 최종 감사 — 2026-10-16 갱신

판정: **수정 코드 LOCAL_READY / 운영 미반영 / 재신청 NOT_READY**. 승인·확률·Google 점수를 제시하지 않는다. 아래 10-15 원문은 이력이며 현재 TODO로 재사용하지 않는다.

## 1. 기준선과 실행 경계

| 계층 | 이번 확인 | 상태 |
|---|---|---|
| Git 프로그램 | 2.56.0.windows.2 | 확인 |
| 원본 로컬 | D:/web/petjigi, clean main 73e25ba; 원본 수정 없음 | 확인 |
| GitHub main | 73767e3b110352bf2f7ee55d724a1c6a82c4994c, 시작·후속 ls-remote 일치 | 확인 |
| 변경 이력 | 48cf954 이후 #87 중복/정책/ETL, #88 캐시 키, #89 타입 import 수정 병합 | ALREADY_FIXED |
| 작업공간 | D:/web/petjigi-audit-20261016, audit/adsense-final-20261016 | 격리 로컬 |
| 의존성 | 최신 lockfile의 Next 16.3.8, frozen install; lockfile 수정 없음 | 확인 |
| 운영 서버 | 직접 HTTP 200, X-Petjigi-Hosting: ovh | 확인; 배포 commit/image는 UNKNOWN |
| OVH 오버레이·서버 env | 기록된 SSH 설정이 현재 환경에 없음 | BLOCKED; 과거 이미지 이름으로 현재 상태 추정 안 함 |
| 브라우저 공개 번들 | 12개 chunk 확인, explicit production, 게시자 태그·ads.txt 일치 | 확인; 서버 env와 동일하다고 추정 안 함 |
| 운영 DB | 프로젝트 env/DB 자격증명 없음 | BLOCKED; 원본/중복/충돌/미분류 건수 및 draft652 현재 상태 미집계 |
| SSR·브라우저 | 공개 SSR 샘플과 격리 build/start/브라우저 검증을 분리 | 아래 증거 참조 |
| 추출 도구 캐시 | 외부 검색 추출과 직접 fetch 구분 | 직접 HTTP 증거를 우선 |

원격 push·PR 생성/병합·배포·운영 DB 쓰기·ETL 실행·계정/스케줄/DNS 변경·메일 전송 없음. main 자동배포 타이머를 건드리지 않았다. 공개 GET은 순차 요청이며 429/5xx 중단 조건을 적용했다. 404 한 건을 전체 장애로 판단하지 않았다.

## 2. 새 확인 문제와 실제 로컬 수정

각 행의 코드 기준은 위 main에서 출발한 로컬 diff, 운영 사실은 JSON에 개별 UTC 시각이 있다. Google 정책 위반 원인으로 단정한 항목은 없다.

| ID/우선순위 | 분류·상태 | 현재 원인·영향·재현 | 수정·검증 | 운영 |
|---|---|---|---|---|
| B3 / P1 | 기술·데이터 / CONFIRMED→로컬 수정 | 지역 목록/요약/업종수/상세 후보는 이름만으로 타 시도 강서구·중구 등을 포함 가능; 사이트맵 join도 이름만 비교 | businessRegionCondition + businessSidoMatchSql 공유; 서울/부산 강서구, 경기 광주시, 강원 개명 SQL fixture | 미반영, 영향 건수 BLOCKED |
| B4 / P1 | 기술·데이터 / CONFIRMED→로컬 수정 | 비교표는 NULL 지역 행을 집계 전 제외; 말미가 시·군·구인 미확인 문자열을 정상 지역으로 취급 | NULL을 미분류에 포함, regions 대응 없는 행 제외 수치 표시; 기존 URL·정책 유지 | 미반영 |
| B5 / P1 | 기술 / CONFIRMED→로컬 수정 | 모호 slug에 한 시도 행의 수로 비교 링크를 만들면 합산 목록의 수와 다름; DB에만 추가된 모호 slug 사이트맵 노출 가능 | 비교 링크는 DB 지역 후보 1개일 때만; 사이트맵 DB 모호성 제외; 3곳 기준 불변 | 미반영 |
| B6 / P1 | 데이터 / CONFIRMED→로컬 수정 | 통합 시도 최신 대표 행을 기존 시도 필터에서 누락시키는 회귀를 교차 검토에서 재현 | 같은 업체의 기존 시도·시군구·종류·이름·정규화 전체주소 원본 행이 있는 경우에만 기존 URL에 대응. 근거 없는 통합 행은 미분류. 비교는 검증된 regions 시도로 표시. 합성2매핑+1미매핑은 사이트맵 제외,3매핑 포함 | 미반영; 임의 행정구역 배분 없음 |
| B7 / P1 | 데이터 / CONFIRMED→로컬 수정 | 원본 시도별 GROUP BY에서 대응된3행과 미분류1행을 함께 집계해 비교4/목록3 불일치. 추가 브라우저 회귀로 확인 | 대응 시도를 집계키에 포함해 분리. 실제라우트 재빌드 후 회귀 확인 | 미반영 |
| A5 / P1 | 데이터 / CONFIRMED→로컬 수정 | 출처 active/closed 충돌은 active만 대표에 남아 현재 상태 불확실성이 숨음 | 식별 가능한 동일 업체의 충돌을 상세에 명시; 현재 영업 여부 미확인 안내. 행 삭제·폐업 추정·추가 noindex 없음 | 미반영; 충돌 빈도 BLOCKED |
| D3 / P1 | 운영·데이터 / CONFIRMED→로컬 수정 | APMS 잘못된 totalCount를0으로 처리; 보호센터 일부 수집은 exit0, 구조동물은 페이지 수만으로 완전성 판정 | total 엄격 검증, 실제0 구분, 총수/각페이지/총수변동/원본ID반복 확인 후 원본반영. 실패 전파·완전 처리 뒤 성공일. timeout/401/403/429/500/누락/반복 fixture | 수집기 코드만, 실행 없음 |
| D4 / P1 | 데이터 / CONFIRMED→로컬 수정 | 주소 변경 후 이전 좌표 유지; lat만 있는 반쪽 좌표 누락; LOCALDATA 지번 fallback 주소를 hash에서 빠뜨려 변경 행 자체 스킵 | 동일 주소의 유효 좌표쌍만 재사용, 반쪽쌍 재처리, 좌표 유한/세계범위·timeout·HTTP 실패 검사, 실제 hashRow fallback 회귀 | 실행 없음; 기존 운영 좌표는 그대로 |
| D6 / P1 | 운영·데이터 / CONFIRMED→로컬 수정 | LOCALDATA 응답 items 누락을 정상 빈 배열로 바꾸는 경로 | 실제 fetchLocaldataPage를 격리 transpile/mocked fetch로 재현; 누락·잘못된형식은 실패, 명시적빈배열만 유지. HTTP401/403/429/500회귀 | 수집 실행 없음 |
| D5 / P2 | 측정·데이터 / CONFIRMED→로컬 수정 | MAX(lastSyncedAt) 하나로 전체 목록 최신성처럼 표시 | 선택행 MIN으로 보수적 지연 표시; 업종 완전성 기록/가장 오래된 행 기록 의미 설명. 원본 기준일·현재 영업 확인일과 구분 | 미반영; hash 동일 행은 마지막 읽기가 아닌 마지막 변경 기록에 가까운 한계 |
| E1 / P2 | 개인정보·기술 / CONFIRMED→로컬 수정 | layout 외부 preconnect/dns-prefetch는 runtime/페이지 차단과 무관 | 불필요한 Google/Kakao 연결 힌트 제거; 실제 태그 게이트·denied 동의 그대로 유지 | 미반영 |
| F2 / P2 | 접근성·콘텐츠 코드 / CONFIRMED→로컬 수정 | 출처의 기존 URL도 span 텍스트로 렌더 | 저장된 HTTP(S)만 안전한 링크로 표시. 자격증명 URL·위험 scheme 거부; React escaping. 새 출처 추정 없음. 실제 SSR 렌더 테스트 | 본문·시드 변경 없이 미반영 |
| G1 / P2 | 도구 / CONFIRMED→로컬 수정 | 보험 계산이 원 단위 소수/unsafe integer를 받아 반올림 결과로 숨음 | 금액은 안전한 0이상 정수만,0/소수 비율 유지; invalid/큰값 fixture | 미반영 |

원본 식별 검토: MOIS `MNG_NO`→`mois-vet-*`, CSV `ld-vet-*`의 twin 관계, LOCALDATA `mgtNo`→업종 prefix ID가 존재한다. 모든 출처의 관리번호가 별도 공통 컬럼에 보존되는 것은 아니며 rawData는 hash 중심이다. 이번에는 이름만으로 합치지 않고 기존 종류·이름·식별가능 전체주소 정책을 유지했다. `last_synced_at`은 원본 기준일이 아니므로 최신 원본/출처 우선순위가 보장된다는 결론은 내리지 않는다. 승인 없는 스키마/물리 병합 없음.

## 3. 이미 해결돼 다시 수정하지 않은 항목

- A1~A4: 목록/사이트맵 중복 조건 공유, 작은 ID 대신 최신 저장 기록 우선, NULL/빈/마스킹 주소 비병합, 상세 동명 후보 축소·검색/홈/주변 동일 조건은 #87/#88에 이미 존재. 새 수정은 시도 범위/충돌 안내에 한정.
- B1/C1/C2: 시도 요약 순위의 기본 시도 조건, evaluateDetailTarget을 통한 metadata/본문/광고/페이지 JSON-LD 단일 판정, DB URL 누락 사이트맵 빌드 실패는 이미 구현.
- 공개 keep30은 현재 콘텐츠 사이트맵과 정확 일치, 30/30 HTTP200·canonical·h1 확인. 이를 운영 draft652 보존 증명으로 확대하지 않음.
- 초안/미래글·리디렉션 차단, 페이지네이션/self canonical, 장례/센터/모호지역/미수집/빈결과 제한 유지. 본문·공개 상태·URL 리디렉션 추가 없음.
- NOT_REPRODUCED: OVH라는 이유만으로 광고가 꺼짐. 현재 공개 JS 명시 production 및 게시자/ads.txt 일치. 실제 노출이나 계정 인식을 증명하지 않음.
- ALREADY_FIXED: 온라인 수의사 상담 출처0 기록은 오래됨. 현재 본문 참고자료2개(법령·AVMA)가 렌더되며, 이번에는 URL 클릭 처리만 개선.

## 4. 운영 읽기 증거와 남은 중대 사항

### 공개 응답·검색/광고 정책

`final-live-20261016.json`, `final-keep30-live-20261016.json`, `final-public-sample-20261016.json`, `final-runtime-20261016.json` 참조.
- 정적 사이트맵1,032 URL, 콘텐츠60 URL(편집30+품종30). 커밋된453은 과거 산출물, 목표값 아님. 전체1,092 URL의 전수 live 검증은 NOT_RUN; 공개30+대표18개 등 샘플만 확인.
- 실제 /gangseo/vet:200/noindex/사이트맵없음. /sejong/vet:200/noindex/사이트맵없음. 미존재 URL:404/noindex, 홈 강제 redirect 없음. robots/정책6/홈 정상 응답.
- 대표5개 공개 JSON-LD 검사 issues0. 처음 인자 없이 실행된 structured-data 감사 checked0은 검증으로 세지 않음.
- 광고 허용 판단은 noindex와 내부 계약을 공유하지만 noindex 자체를 Google 광고 위반으로 취급하지 않음. 슬롯/로더/내비게이션/늦은404는 mock 브라우저에서 검증. 실제 광고 노출은 NOT_RUN.
- GSC URL 검사·심사 계정·정책센터·ads.txt 계정 인식·인증 CMP는 BLOCKED/UNKNOWN. 연결 도구에는 해당 계정 읽기 capability 없음. 과거 계정 GETTING_READY나 indexed0 기록을 현재로 제시하지 않음.
- Consent 네 항목 denied 및 업데이트 호출 부재는 코드 CONFIRMED. GA4는 광고 페이지 판정에도 결합되어 차단 페이지 흐름 일부가 미측정될 수 있음. 트래픽 개선을 위한 granted 전환·추적 확대 없음. deny 상태를 측정0으로 단정하지 않음.
- [Google CMP 요건](https://support.google.com/adsense/answer/13554116?hl=ko): EEA/영국/스위스 개인맞춤 광고와 인증 CMP/TCF 요건을 실제 트래픽·계정 설정과 대조해야 함. 자체 로직을 인증 CMP라 주장하지 않음.

### 업종 갱신 현황

`final-source-status-20261016.json`은 실제 표시 날짜만 수집한다. 모든 업종의 원본 기준일·마지막 시도·마지막 완전 성공은 DB 접근 부재로 UNKNOWN/BLOCKED. 날짜 하나가 전국 완전성 증거는 아니다.

| 업종 | 기존 원본/제공 경로 | 현재 공개 표시 수집일 | 마지막 시도/완전성·범위·오류 |
|---|---|---|---|
| 동물병원 | MOIS/data.go.kr 15045050 코드, MNG_NO | 2026-10-13 | 확대 기록은 이력; 현재 DB/원본 범위 미검증 |
| 미용 | LOCALDATA 업종04 | 2026-05-21 | 아래 GitHub 실패 증거. 정확한 업종별 마지막 성공 미확인 |
| 위탁관리 | LOCALDATA 업종03 | 2026-05-21 | 동일 |
| 장묘 | LOCALDATA 업종02 | 2026-05-21 | 동일; 광고 제한 보존 |
| 판매 | LOCALDATA 업종01 | 2026-05-21 | 동일 |
| 생산 | LOCALDATA 업종07 | 2026-05-21 | 동일 |
| 운송 | LOCALDATA 업종05 | 2026-05-21 | 동일 |
| 전시 | LOCALDATA 업종06 | 2026-05-21 | 동일 |

현재 GitHub API 반환: main의 verify 성공, sync 실패. [LOCALDATA 실행38805150471](https://github.com/lsk7209/petjigi/actions/runs/38805150471), schedule, createdAt2026-10-15T20:50:15Z, ConnectTimeoutError/UND_ERR_CONNECT_TIMEOUT 토큰만 확인. 원시 로그는 저장/출력하지 않았다. 전체 코드검사 성공을 ETL 정상으로 읽지 않는다.

공식 대체 자료 확인:
- [15121110 공식 자료](https://www.data.go.kr/data/15121110/fileData.do): 검역본부 영업장 XLS/기관 자체 다운로드 링크, 일간·무료·이용제한없음, metadata 수정2026-09-28. 제목20230829를 모든 행 기준일로 확정하지 않으며 다운로드/내용 검증 안 함. 새 API service ID를 만들지 않았다.
- [농식품 포털 동일 자료](https://data.mafra.go.kr/opendata/data/indexOpenDataDetail.do?data_id=20240701000000002501)는 비영리·변경금지 표기로 위의 라이선스와 차이가 있어 상업 재사용 허가를 일괄 단정하지 않는다.
- [장묘업 CSV15073587](https://www.data.go.kr/data/15073587/fileData.do)는 연간 지역/시설 집계이며 업체별 전국 대체목록으로 바로 쓸 수 없음. [양산 자료](https://www.data.go.kr/data/15074051/fileData.do)는 지역 한정·과거 통계라 전국 자료로 취급하지 않음.
- [보호센터 표준15025454](https://www.data.go.kr/data/15025454/standard.do) 존재 확인. 현재 수집기는 유기동물 API에서 관찰된 careRegNo를 추출하므로 원본 페이지 완전 수집과 전국 모든 보호센터 포괄은 다름. 대체 수집기 전환은 미실행.

중요 잔여: LOCALDATA의 total/중복페이지 및 완전성 heartbeat, MOIS 반복페이지·원본일 검증, 날짜/인코딩·행정구역 전수검증은 이번 로컬 diff로 모두 해결되지 않았다. APMS/좌표에서 개선 가능한 부분은 완료했으며 모든 업종 복구를 주장하지 않는다. APMS 자료 수집 전 검증은 보장하지만 적용은 행별 upsert다. 이후 지오코딩/DB 오류 시 앞선 행은 남고 성공일은 갱신되지 않는다. 트랜잭션 원자성/전체스냅샷 rollback을 주장하지 않는다.

### 콘텐츠·신뢰 정보

- `content-review-keep30-20261016.csv`:현재30개 본문/질문/목차/주장 후보/렌더된 참고자료82개/교정 상태. 전수 SSR 스크리닝과 외부 원문 전체 대조·전문가 검토를 구분. 원문 전수 검증은 미완료.
- P1 CONFIRMED: 공개 슬개골 글의 수술성공90%는 [ACVS 원문](https://www.acvs.org/small-animal/patellar-luxations/)의 보호자 경과 만족도와 다름. ASPCA 귀속 kg당 수치는 [인용 안내](https://www.aspca.org/pet-care/aspca-poison-control/people-foods-avoid-feeding-your-pets)에 없음. 주장 자체가 모든 다른 자료에서도 틀리다는 결론은 아님.
- `content-corrections-20261016.diff`:원문·근거·교정문·영향2건 제안. **적용하지 않음**. 의학적 용량/성공 보장 오인을 먼저 해소할 필요가 있음.
- WSAVA2016 판본/16주 이후 핵심 접종 권고 존재는 [공식 PDF](https://wsava.org/wp-content/uploads/2020/01/WSAVA-Vaccination-Guidelines-2015.pdf)에서 확인. 파일명2015와 출판2016 구분; 새2024판이 있다는 이유로 기존 인용 삭제 안 함. 개별 본문 적용 전체 대조는 미완료.
- 제한식이8주 기간 근거 [Olivry 등2015](https://pubmed.ncbi.nlm.nih.gov/26310322/)와 Mueller2016 알레르겐 종류 연구를 구분해야 함. 원문 접근 도구 일부는 CAPTCHA라 특정 본문을 verified로 올리지 않음.
- /privacy의 Vercel 미국 호스팅 설명은 현재 OVH 응답과 불일치(CONFIRMED). 실제 계약주체/국가/로그 보관 확인 후 교정 필요. 국가·사업자·검수자를 만들어 넣지 않음.
- 문의메일 공통 설정·제휴 없음 고지는 이미 구현. 실제 cs@ 수신은 UNKNOWN(전송/DNS/메일 설정 없음), 정상 수신이라고 표시하지 않음.
- 법령·보험조건·AAFCO 의무 표현·화장실 통계 등은 검수표의 원문확인 필요 항목. regex 검사·문자수·출처수로 전문가 검수나 Google 승인 기준을 대신하지 않음.

## 5. 검증과 실패 기록

상세: `.goal-harness/` 로그. 최종 집계는 하네스 EVIDENCE와 아래 부록에 기록했다.
- 기존 2곳/4행·3곳·동명다른주소·미식별주소·오래된작은ID·SQL/JS 동치 fixture 유지.
- 추가 지역/병합원본근거/미매핑/사이트맵/activeclosed 충돌/지번주소hash/소수·큰금액/API 실패 fixture.
- `audit-consistency-fixture.ts`:13개 합성 SQLite 조합에서 indexable/sitemap 판정 불일치0. 운영 영향 건수 null, 원본일 UNKNOWN. 실제 운영 DB 검증 아님.
- 격리 production build/start 및 기존 광고/도구/초안·미래/리디렉션 검증,360/390/768/1440 크기. 최종 원본관할 비교회귀를 추가해 목록3·비교3·상세3·미분류1을 실제 라우트에서 확인한다.
- 초기 junction 빌드는 Turbopack 외부루트 제한 실패. offline install은 Next16.3.8 cache 부재로 실패. frozen 설치 후 복구. 의존성/lockfile 변경 없음.
- SourceReference 추가 후 SSR fixture loader8건 실패→실제 컴포넌트 로딩 지원 및 안전링크 SSR2건 추가→관련10건 PASS. 실패를 숨기거나 assertion을 지우지 않음.
- 추가 HIGH2건(지번hash, 통합원본지역회귀)은 실패 fixture 후 수정, 읽기전용 Luna 검토로 재확인. 비용·토큰·전체경과 미측정. 주 모델 유지, subagent2개는 읽기전용 gpt-6-luna/max.
- Lighthouse/CWV는 NOT_RUN; 점수 없음. 캡처에서 광고 mock 미응답 예약공간을 운영 실제 no-fill로 단정하지 않음. 선택4개 스크린샷 `screens-20261016/`.


### 최종 검증 결과

| 검사 | 결과·범위 |
|---|---|
| pnpm test | 608/608 PASS. 마지막 비교 집계 수정은 아래 최신 build/browser로 추가 검증 |
| lint / tsc --noEmit | 최종 diff PASS |
| 격리 Next16.3.8 production build | 마지막 비교 수정 포함 PASS. fixture DB / .next-verify |
| 기존 E2E 5묶음 | 137검사 PASS: 광고12 / smoke42 / 콘텐츠5 / 핵심가이드29 / site-value49(4폭) |
| 추가 지역 E2E | 최초 FAIL(비교4/목록3) → 수정 후 재빌드·영향 흐름 PASS: 목록3/비교3/상세3/미분류1. 후속 재개에서 최종 코드로 전체6묶음 재실행 모두 PASS (.goal-harness/e2e-complete-20261016.log) |
| next-sitemap | PASS. 최신 fixture/.seo-cache/final-sitemap에만 출력, public 변경0 |
| 합성 일관성 | 13fixtures/판정 불일치0. 운영 건수 null/BLOCKED |
| 내부 링크 | failing0, seeds864/inventory2966/예약7. 운영 전체 링크검사와 구분 |
| 공개 JSON-LD 표본 | 5URL/issues0. 인자 없는 checked0은 제외 |
| claims | manifestIssues0. risky260/untracked256/review4는 전체시드 대상이며 공개30 원문검증 완료가 아님 |
| readiness | PASS13/UNKNOWN11은 기존 구조 검사. P1/운영/계정 미확인을 덮지 않음 |

원본 작업공간 clean, 원격 push·운영쓰기0, 시드본문·public sitemap·의존성·lockfile 변경0. 로컬 미커밋 diff로 검토 가능하다.

## 6. 운영 반영과 재신청

[운영 반영 준비서](production-plan-20261016.md)에 코드 파일·영향 URL·예상 변경행0(코드만)·추가ETL영향UNKNOWN·승인·백업·롤백·배포 후 검사·자동배포 관계를 명시했다.

- LOCAL_READY는 수정 코드 회귀 확인 범위에 한정한다. 운영 데이터 완전 복구/콘텐츠 원문 전수 검토 완료와 같지 않다.
- PRODUCTION_VERIFIED: 아님. 원격 반영/운영 이미지·오버레이·DB·실제 광고/계정 확인 없음.
- REVIEW_CANDIDATE: **NOT_READY**. 중요한 공개 의료 주장 오귀속과 호스팅 고지, 오래된7업종 및 운영 정합성 검증이 남음. 사소한 UNKNOWN 전부 해소를 요구하지 않으며, 방문자수/글자수/날짜를 공식 승인 기준으로 쓰지 않는다.10월20일은 재점검 예정일일 뿐.

---

# 2026-10-15 이력 (아래 상태·커밋·미완료는 당시 기록)

# petjigi 일관성 감사 (2026-10-15)

기준: 로컬 main = origin/main = 48cf954. 작업 브랜치 `fix/consistency-audit-20261015` (미push·미배포). 운영 DB는 접근 자격이 없어 읽지 않음(BLOCKED), 운영 영향 건수는 미집계.

## 확인된 문제와 로컬 수정
| ID | 분류 | 상태 | 내용 | 수정 | 검증 |
|---|---|---|---|---|---|
| A1 | 기술 | CONFIRMED→수정 | 사이트맵은 중복 제거 없이 업체 수 계산(실제 2곳/4행 → 사이트맵 포함, 목록은 2곳 noindex) | `lib/listing-identity.js` 공통 SQL, 사이트맵·목록 공유 | 합성 SQLite 재현(구 SQL 1행 포함 → 신 SQL 제외) |
| A2 | 기술 | CONFIRMED→수정 | 대표 행이 id 순서뿐 → 오래된 행이 최신 행 대신 노출 | 최신 `last_synced_at`, 동률 시 작은 id | 단위 테스트 |
| A3 | 기술 | CONFIRMED→수정 | 빈 주소('')·`*` 마스킹 주소가 같은 이름이면 서로 다른 업체가 합쳐짐 | 식별 가능한 주소일 때만 중복 판정 | 단위 테스트 |
| A4 | 기술 | CONFIRMED→수정 | 상세: 출처 중복 2행이 '동명 업체 안내(noindex)'로 처리됨. 검색 API·주변 시설·같은 업종 수·홈 통계는 중복 미제거 | 상세 후보를 대표 1건으로 축소, 나머지 쿼리에 동일 조건 | 정적/단위 테스트 |
| B1 | 정확성 | CONFIRMED→수정 | 지역 요약 시도 순위가 시군구 이름만으로 집계(타 시도 중구가 합산) | 업체 원본 시도도 조건(개명 전후 표기 허용) | 코드 경로 + 변형 테스트(DB 통합 테스트 미작성) |
| B2 | 정확성 | CONFIRMED→수정 | 비교표: 세종 도로명(`ETL parts[1]`)이 시·군·구 열에 노출, 강원도/강원특별자치도 분리 표시 | 미분류 분리(제외 건수 표기), 개명 표기 병합, 수집일·전화 기재 의미·중복 처리 문구 | 단위 테스트 |
| C1 | 정책 일관성 | CONFIRMED→수정 | 상세 metadata는 모호 지역이면 noindex, 본문·광고·JSON-LD는 `ambiguous:false` | `evaluateDetailTarget` 단일 판정 | 단위 테스트 3건 |
| C2 | 운영 | CONFIRMED→수정 | `TURSO_DATABASE_URL` 누락 시 사이트맵 지역 URL이 조용히 사라짐 | 빌드 실패(`SITEMAP_ALLOW_NO_DB=1`로만 예외) | 정적 테스트 |
| D1 | 데이터 | CONFIRMED→수정 | 동물병원 ETL: totalCount 불일치·중간 빈 페이지·페이지 오류에도 성공 종료, 성공 시각 미기록 | `classifyEtlRun(expectedItems)`, 완전 수집일 때만 `etl_sync_state.lastSuccessfulAt` | 단위 테스트(실행은 NOT_RUN) |
| D2 | 데이터 | CONFIRMED(미수정) | 해시 동일 행은 `last_synced_at` 미갱신 → 지역 기준일(max)은 '마지막 변경'. 대표 선택도 같은 의미 | 업종 기준일은 job 성공 시각을 우선(vet). 행 단위 갱신은 쓰기량 때문에 보류 | — |
| F1 | 콘텐츠 | CONFIRMED(미수정) | 공개 30건 중 출처 불일치·내부 메모 노출 | 제안만: `content-review-keep30-20261015.csv` | 원문 조회 2건 |

핵심 콘텐츠 사실(2026-10-15 조회): ACVS 슬개골 페이지의 "90%"는 *보호자 만족도*이지 수술 성공률이 아님(본문은 성공률로 서술). ASPCA 페이지에는 초콜릿·마카데미아의 kg당 수치가 없음(본문은 ASPCA로 귀속). 공개 30건은 본문 1,200~2,400자로 얇은 편이라 "가치 낮은 콘텐츠" 사유가 남을 수 있음.

## 이미 해결·미재현
- ALREADY_FIXED: 사이트맵 additionalPaths, 30건 공개/652 draft(콘텐츠 사이트맵은 `publicContentCondition`+리디렉션 제외), 허가 연도 표는 '현재 영업 중 업체 기준' 문구, 문의 이메일 공통 설정.
- NOT_REPRODUCED: OVH 광고 차단 — 라이브 번들에 `explicit:"production"` 인라인, 홈 200, `ads.txt` 200(pub-3050601904412736), `google-adsense-account` 메타 존재.
- 커밋된 `public/sitemap-0.xml`(453건)은 빌드마다 재생성되는 과거 산출물. 목표값 아님.

## 실행한 테스트
`pnpm test` 562건 전부 통과. `audit:adsense:readiness` PASS13/BLOCKED0/UNKNOWN11, `audit:internal-links` failing=0. 모두 로컬(운영 쓰기 없음). 리포트 파일 변경분은 되돌림.

## 수행하지 못함(NOT_RUN/BLOCKED)
운영 DB 집계(중복 행 수·미분류 수·구신 이중 계수), 브라우저 360/390/768/1440 UX, 도구 입력 검증(G), Lighthouse, GSC/AdSense 계정 조회(H, E-9), 카카오 지오코딩, LOCALDATA 대체 API 문서 확인, 개인정보처리방침 호스팅 문구(Vercel↔OVH) 대조, `next build`·`audit:live` 전수.
의심(SUSPECTED): 주소 문자열이 개명 전후로 달라 중복 제거가 안 되는 이중 계수 — 운영 읽기 집계 필요.

## 운영 반영 준비
- 범위: 코드만(스키마·데이터 변경 없음). 캐시 키 갱신(`region-summary v4`, `region-type-counts v2`, `stats v2`, `type-as-of v2`).
- 영향: 사이트맵에서 얇은 지역(중복 포함 3곳 → 실제 2곳 이하) 제거 가능, 목록·검색의 대표 행 변경 가능(URL 불변), 비교표 미분류 분리.
- 자동배포: main 병합 시 5분 내 자동 반영. 병합 승인 = 배포 승인. 롤백은 STATUS.md의 compose 복원 절차.
- 배포 후 확인: sitemap-0 건수 변화, 대표 지역 목록 건수=카드 수, /tools/region-compare/vet 미분류 문구, 동물병원 ETL 수동 실행 후 `etl_sync_state`(승인 필요).
- 필요한 승인: 병합·배포, 콘텐츠 교정 반영, ETL 실행.

## 재신청 판단
LOCAL_READY(코드). PRODUCTION_VERIFIED 아님. REVIEW_CANDIDATE는 **NOT_READY**: 콘텐츠 정정(F1)·계정 UNKNOWN 11건·10-20 GSC 색인 확인이 남음.
