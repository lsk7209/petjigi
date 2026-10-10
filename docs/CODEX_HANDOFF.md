# Codex 인수인계 — 펫지기 (2026-10-10 기준)

> 이 문서를 먼저 끝까지 읽고 작업한다. 작업 규칙은 `CLAUDE.md`, `AGENTS.md`, `docs/petjigi-pseo-spec.md`가 우선이며 충돌하면 spec이 우선이다.
> 이 저장소의 Next.js는 학습 데이터와 다르다(`AGENTS.md` 참고). 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 관련 문서를 확인한다.

## 0. 현재 상태 (사실만)

| 항목 | 상태 |
|---|---|
| main | `7f300b4` — PR #23(R01~R04) 병합·운영 배포 완료 |
| 로컬 브랜치 `feat/home-approved-design` | 홈 시안 작업용. **코드 미착수.** 미커밋: `scripts/home-assets/generate.py`(이미지 생성 스크립트), `STATUS.md` 일부 |
| R01~R04 | 완료·운영 반영(아래 §A 참고, 재작업 금지) |
| R05(e2e·CI), R06(DB 계측) | **미착수** |
| 홈 시안 | **로컬 구현·브라우저 검증 완료(미커밋·미배포)**. 승인 시안 원본 미확인 → §B 명세 기준 구현. 스크린샷 `docs/design/home-verify/`. 시안 PNG 확보 시 나란히 비교 필요 |
| 패키지 매니저 | pnpm (`pnpm test`, `pnpm exec tsc --noEmit`, `pnpm lint`) |
| 운영 DB·ETL | 이번 작업에서 건드리지 않는다 |

### 금지 (승인 없이 하지 말 것)
- `git push`, PR 병합, Vercel 배포, 운영 환경변수 변경, 운영 DB 쓰기·마이그레이션·ETL 실행
- 광고·AdSense 설정 변경, 애드센스 신청, 실제 광고 클릭 테스트
- 뉴스레터·이메일 신청폼 추가(홈에서는 제거 상태 유지)
- `reset --hard`, `clean`, 강제 push, 기존 파일 삭제
- `.env*`, 토큰, `E:\env\*` 파일 내용을 로그·문서·Git에 남기기 (키 파일 전체 출력 금지)
- 기존 URL 체계·canonical·robots·사이트맵·소유권 확인 코드·광고 게시자 ID·분석 태그 변경

### 알려진 사항
- Vercel **Preview** 빌드는 항상 실패한다(Preview 환경에 `TURSO_DATABASE_URL` 없음). Production은 정상. CI `verify` 잡이 판정 기준.
- Gemini 키 2종 모두 사용 불가(`~/.claude/.env`는 `AQ.` 토큰 401, `E:\env\키파일.txt`의 AIzaSy는 만료). 이미지는 사용자가 직접 생성해 제공한다.
- 이전 세션에서 키 파일 일부가 화면에 노출됨 → Anthropic·바이낸스 키 교체 권장(사용자에게 상기).

---

## A. 이미 끝난 것 (재수정 금지, 회귀만 감시)

- **R01** `etl/mafra/registration-agents.ts` + `registration-agent-collection.ts` + `registration-agent-lease.ts`
  - 완전 수집 입증(총계·페이지·행 수·중복 페이지·총계 변동) 시에만 누락 기관 처리. 원본 미확인 행은 `closed`가 아니라 `paused`. 재등장 시 `active` 복구.
  - 실행 락은 기존 `etl_sync_state` 재사용. 불완전 수집은 exit 1.
  - 테스트: `etl/mafra/*.test.ts` (실제 모듈 + 인메모리 libSQL + fetch 스텁).
- **R02** `lib/business-detail-match.ts`(`matchBusinessInRegion`), `lib/business-detail-resolve.ts`, `components/business/business-disambiguation.tsx`, 상세 page·OG 이미지, `lib/search-contract.ts`(같은 slug면 동명 시군구도 링크 허용)
- **R03** `lib/business-status-wording.ts` (등록대행기관은 "운영 중" 금지)
- **R04** `lib/toc.ts`, `components/content/table-of-contents.tsx`(href `encodeURIComponent`)
- 수정한 가드 테스트 2건: `scripts/og-runtime.test.ts`, `scripts/region-page-integration.test.ts` (정적 DB import 금지 의도는 유지, 공통 resolver 지연 import 허용)
- 미해결 후속(승인 필요): 기존 `closed` 4,873건의 의미 정리, 별도 `source` 상태 컬럼 migration, 동명 지역의 영구 식별자 URL.

---

## B. 작업 1 — 홈페이지 승인 시안 구현 (최우선)

### B-0. 선행 조건 (없으면 먼저 사용자에게 요청)
1. **시안 이미지 파일**: `docs/design/home-approved.png`(1024×1536)로 저장돼 있어야 한다. 없으면 사용자에게 요청한다. 파일명·설명만 보고 확인했다고 하지 않는다.
2. **사진·일러스트 10종**: 사용자가 생성해 `public/images/home/`에 넣는다(아래 B-5 표). 파일이 없으면 슬롯을 **명시적 임시 표시**로 두고, 최종 보고에 "핵심 비주얼 임시"라고 적는다. 무관한 스톡 이미지·발바닥 아이콘·단색 박스로 대체한 상태를 최종본이라고 하지 않는다.

### B-1. 원칙 (우선순위)
1. 기존 실제 콘텐츠·데이터·URL·기능·안전 조건
2. 승인 시안의 디자인(레이아웃·색감·이미지 연출·개성)
3. 모바일 가독성·접근성·성능을 위한 조정

시안의 **가상 수치(53만+/300개+/3,500개+), 예시 게시일(2025.05.xx), 예시 제목, 생성 이미지의 글자 오류는 복제하지 않는다.** 출처·집계 기준이 없는 통계 행은 제거하고 간격을 재조정한다. 다른 그럴듯한 숫자로 바꾸지 않는다.

하지 말 것: 일반 템플릿으로 대체 / 전체를 한 장의 이미지로 넣고 링크만 덧씌우기 / 글자·버튼이 든 캡처를 배경으로 쓰기 / 새 기술 스택으로 재개발 / 동작하지 않는 검색·탭·지도·버튼을 정상처럼 표시 / `href="#"` 가짜 링크.

### B-2. 현재 코드 사실 (착수 전 재확인할 것)
- 스택: Next.js 16.3.5 App Router, React 19, Tailwind v4, Drizzle + libSQL(Turso). 한국어 UI.
- 홈: `app/page.tsx`(372줄, ISR `revalidate = 3600`), 스타일 `app/home.css`(`.hm-*` 클래스, 토큰은 `.hm` 스코프), 임시 SVG 히어로 `components/home/hero-illustration.tsx`.
- 현재 홈 섹션: 히어로 → 6개 빠른 탐색 → 지역(#hm-local, 시도 칩) → 건강(강아지/고양이 2패널) → 가이드 피드 → 백과 링크 → AdSlot → 장례 → 신뢰 기준(`AdsenseTrustSection`).
- 데이터: `getCachedRecentGuides()`, `getCachedRecentBlogPosts()` (`lib/db-queries.ts`). 카테고리 `lib/category.ts`(1 입양·등록 adoption, 2 사료·영양 nutrition, 3 건강·의료 health, 4 보험·법률 insurance, 5 케어·라이프 care, 6 장례·추모 memorial). 6번은 memorial 디자인·광고 제한 카테고리.
- 공통 헤더 `components/layout/header.tsx`(클라이언트, `.pj-header` 스타일은 `app/globals.css`), 푸터 `components/layout/footer.tsx`(5열, 정책 링크 이미 존재: /about /advertising /disclosure /privacy /terms /contact).
- 폰트: `app/layout.tsx`에 `Noto_Serif_KR`(`--font-noto-serif-kr`, **subsets: ["latin"]만 지정** → 한글 명조가 실제로 로드되는지 렌더링에서 반드시 확인하고, 필요하면 한글 subset/가중치를 조정. 로딩 비용 확인).
- 존재하는 라우트: `/sido/{seoul,gyeonggi,busan,incheon,daegu,gwangju,daejeon,ulsan,sejong}`, `/{sigungu}/{type}`(예 `/nowon/vet`), `/category/{slug}`, `/condition`, `/breed/dog`, `/breed/cat`, `/breed`, `/guide`, `/blog`, `/insurance`, `/insurance/compare`, `/search`(쿼리 `?q=`), `/category/memorial`.
- 광고: 홈에 기존 `AdSlot` 1개와 `AdsenseLoader`가 있다. **새로 활성화하지 말고 기존 동작 유지.** `data-ads-policy="block"` 마커 체계(`lib/ads-policy.ts`)를 건드리지 않는다.
- 홈 관련 기존 테스트: `tests/home-readiness.test.mjs`(H1 정확히 1개, canonical `/`, 필수 href `/sido/seoul` `/category/health` `/guide` `/breed/dog`, `id="hm-local"`, `href="#hm-local"` 2개 이상, "임시 일러스트|교체할 수 있습니다" 금지, 가짜 "수의사 검토" 문구 금지 등). 시안에 맞게 바뀌는 항목은 **의도를 유지한 채** 갱신하고 이유를 기록한다(기대값을 느슨하게 만들어 통과시키지 말 것).
- 기존 개선 유지: 응급 안내 정정, 공통 콘텐츠 공개 조건(미래 발행·검토 대기 비노출), 등록대행 분리, 광고 제한 정책.

### B-3. 디자인 토큰 (시작값, 시안과 비교하며 조정)
```
--color-background: #FAF8F3;  --color-surface: #FFFFFF;
--color-primary: #214B3A;     --color-text: #19372F;
--color-text-muted: #5D6962;  --color-sage: #EDF1E8;
--color-peach: #FAEEE3;       --color-border: #E4E6DD;
--color-accent: #D99158;
```
아이보리·화이트 기본, 세이지·살구·연한 블루는 탐색 타일과 패널에 한정. 전체 주황 필터 금지, 브랜드 그린을 모든 섹션 배경에 반복 금지.
타이포: 본문·메뉴·버튼은 산세리프, H1과 일부 섹션 제목은 부드러운 명조. H1 데스크톱 48~58px / 모바일 32~38px, 섹션 제목 26~34px, 본문 16~18px, 보조 14px, 줄간격 1.55~1.75. 콘텐츠 최대 폭 1,240~1,280px. 카드는 부드러운 모서리·옅은 테두리, 과한 그림자·유리 효과 금지. 손글씨는 사진 빈 공간의 작은 장식에만(웹폰트 추가 최소화, 가능하면 SVG/이미지 장식).

### B-4. 영역별 명세

**A 헤더** (공통 `Header` 수정 — 모든 페이지에 영향. 영향 범위를 확인하고 기존 라우트 깨지지 않게)
- 좌: "펫지기" 로고 + 짧은 설명("반려생활의 모든 순간, 함께."). 로고는 기존 공식 자산 우선(`.pj-logo-mark` 등). 시안 속 로고를 잘라 쓰지 않는다.
- 중앙 메뉴 8개와 연결(권장): 동물병원 → `/#hm-local` / 건강정보 → `/condition` / 사료·영양 → `/category/nutrition` / 생활·케어 → `/category/care` / 입양·등록 → `/category/adoption` / 보험·제도 → `/category/insurance` / 장례·추모 → `/category/memorial` / 가이드 → `/guide`.
- 우: 실제 검색 — `<form action="/search" role="search">` + `<input name="q">`(JS 없이 동작, 접근 가능한 이름). 
- 폭이 부족하면(약 1100px 미만) 모바일 메뉴로 전환(글자를 줄여 한 줄에 억지로 넣지 않는다). 모바일 메뉴: 열기/닫기, Esc, 닫을 때 트리거로 포커스 복귀, 터치 44px 이상.
- 로그인·회원가입·상담신청 버튼 금지. 브랜드명은 정확히 "펫지기".

**B 히어로** (가장 중요)
- 좌: 상단 소개 "반려동물을 위한 믿을 수 있는 정보, 펫지기" / H1 "함께하는 모든 순간,<br>반려가족의 든든한 안내서" / 설명 "동물병원부터 건강·생활 정보, 입양, 보험,<br>그리고 마지막 인사까지.<br>펫지기가 반려생활의 모든 순간을 함께합니다." / 주 버튼 "우리 동네 동물병원 찾기"(`#hm-local`) / 보조 버튼 "반려생활 가이드 보기"(`/guide`).
- 우: 이불 위 강아지+고양이 사진을 **작은 카드가 아니라 큰 배경 비주얼**로, 왼쪽은 아이보리 마스크(그라디언트)로 텍스트 가독성 확보. `next/image` + `priority`(LCP), 비율 예약. 손글씨 장식은 얼굴·본문을 가리지 않는 빈 공간에 작게.
- 통계 행(53만+ 등)은 **제거**(검증 가능한 출처 없음).

**C 7개 빠른 탐색 타일** — 하나의 부드러운 컨테이너. 좌 소개 "지금 어떤 정보가 필요하세요?" + 설명, 우 7개 파스텔 타일(통일된 선형 SVG 아이콘, 이모지 금지):
1 동물병원 찾기(`#hm-local`) / 2 건강·질병 정보(`/condition`) / 3 사료·영양(`/category/nutrition`) / 4 생활·케어(`/category/care`) / 5 입양·등록(`/category/adoption`) / 6 보험·제도(`/category/insurance`) / 7 장례·추모(`/category/memorial`). 시안의 작은 부제는 실제 가능한 범위의 짧은 문구로(글씨를 지나치게 줄이지 않는다). 모바일은 여러 행으로.

**D 지역 패널 + 건강 패널** (데스크톱 나란히, 높이 맞춤, 모바일은 고정 높이로 잘리지 않게)
- 왼쪽 "우리 동네<br>반려시설을 찾아보세요": 지역 선택 + "시설 찾기" 버튼 + 시설 유형 링크(동물병원/미용실/호텔·유치원/장묘시설 — 실제 라우트가 있는 것만) + 따뜻한 지도 **일러스트(장식, 핀은 클릭 불가)** + 하단 강아지 사진(`local-dog`).
  - 지역 선택은 실제 이동으로 연결: 현재는 시도 단위(`/sido/{slug}`)만 확실히 존재. 시도 선택 → 시설 유형 선택 → `/{sigungu}/{type}`로 가려면 시군구 선택이 필요하므로, 최소 구현은 **시도 선택 후 `/sido/{slug}` 이동 + 유형 링크는 시도 허브에서 이어지게** 하거나, 서버에서 가져올 수 있는 시군구 목록(`getCachedRegionsBySido`)으로 2단 선택을 구현한다. 사용자가 고른 지역·유형 조건이 유지되어야 한다. JS 없이도 동작하는 `<form method="get">` 방식을 우선 검토.
  - 현재 위치 권한 자동 요구 금지. 영업 중·24시간·응급 여부 추측 표시 금지.
- 오른쪽 "우리 아이의 건강,<br>차근차근 알아보세요": 강아지/고양이 탭 + 건강 주제 링크 + 사진(`health-dog`).
  - 탭은 **실제로 링크·콘텐츠가 바뀌어야** 한다. 현재 분류 데이터: 강아지 → `/breed/dog`, 고양이 → `/breed/cat`, 공통 `/condition`, `/category/health`. 종별 건강 콘텐츠 분류가 데이터에 없으면 탭 모양만 만들지 말고 각각의 기존 페이지로 가는 링크로 대체한다. 질병 분류 아이콘(피부·눈·귀·소화기·호흡기·관절)은 `/condition` 하위에 실제 대응 페이지가 있는지 먼저 확인하고 없으면 제외.
  - 진단 기능이 아니다. 개별 동물의 건강 상태를 판정하는 표현 금지.

**E 편집형 하단 (2:1 본문/사이드, 일반 전폭 카드 그리드 금지)**
- 왼쪽: **추천 가이드**("지금 알아두면 좋은 반려생활 이야기") 실제 발행 콘텐츠 4개 — 사진/카테고리/제목/**실제 게시일 또는 수정일**. 시안의 예시 제목·날짜 하드코딩 금지. 4개는 가능하면 서로 다른 카테고리에서 선정, 썸네일은 카테고리별 자산(`thumb-*`)으로 주제와 일치시키고 같은 사진 반복 금지. 이어서 **반려생활 백과**(견종 정보 `/breed/dog`, 묘종 정보 `/breed/cat`, 펫보험 가이드 `/insurance/compare`, 등록 제도 `/category/adoption` — 실제 존재하는 것만, 작고 간결한 링크 카드).
- 오른쪽: **장례·추모 안내** 꽃 사진 카드("함께한 시간에<br>감사합니다" / "마지막 인사도,<br>차분히 준비할 수 있도록 안내합니다." / 버튼 "장례·추모 안내 보기" → `/category/memorial`). 검은 배너·압박성 판매 카드 금지. **반려가족 메시지 카드**(세이지 배경 + 일러스트, "작은 생명도<br>세상을 더 따뜻하게 만듭니다.") — 통계·인증·배지·신청폼 금지.
- 모바일 읽기 순서: 추천 가이드 → 반려생활 백과 → 장례·추모 → 메시지 카드. CSS 순서와 DOM(키보드·스크린리더) 순서가 어긋나지 않게(`order` 남용 금지).
- 기존 `AdSlot`은 그대로 유지하되 편집 구성을 깨지 않는 위치(섹션 아래)에 둔다. 새 광고 추가 금지.

**F 신뢰 안내 띠 + 푸터**
- 아이콘+짧은 설명 3개. 문구는 실제 운영 기준과 일치할 것: "신뢰할 수 있는 정보"(공공데이터와 공식 자료 기반), "반려가족과 함께 성장"(이용자 의견 반영 — 근거 없이 단정 금지), "모두를 위한 반려문화". **'수의사 검수', '공식 인증', '실시간 업데이트' 금지**(기존 테스트가 일부 차단). 갱신은 정기 동기화 일정 표현만(매일 동기화 보장 금지).
- 푸터: 기존 5열 푸터 유지 가능(정책 링크가 이미 실제 경로). 시안의 단순 푸터로 바꾸려면 SEO 내부 링크 손실을 영향분석에 적고 승인 받는다. 소셜 아이콘은 실제 공식 계정이 확인될 때만 — 현재 확인된 계정 없음 → 표시하지 않는다.
- 홈의 뉴스레터·이메일 신청 UI는 없는 상태 유지. 구독자 데이터·서버 기능·개인정보처리방침은 삭제하지 않는다.

### B-5. 이미지 자산 (`public/images/home/`)
2026-10-10 사용자 요청으로 Codex 내장 image_gen에서 10종 생성·WebP 배치 완료. 출처·프롬프트·변환·검증: `docs/home-assets.md`. 기존 Gemini 스크립트는 실행하지 않았다.
공통 프롬프트 접두: `Photorealistic, natural soft daylight, warm cream and ivory tones, shallow depth of field, anatomically correct paws, eyes and ears.` / 접미: `No text, no letters, no numbers, no logos, no watermark, no UI elements, no borders.`

| 파일 | 비율/가로 | 용도 | 핵심 요구 |
|---|---|---|---|
| `hero` | 16:9 / 2400 | 히어로 | 골든리트리버+태비 고양이가 크림 니트 이불 위, 동물은 오른쪽 60%, **왼쪽 35%는 단순한 아이보리 배경** |
| `local-dog` | 4:3 / 1200 | 지역 패널 하단 | 웰시코기, **평평한 단색 #FBF1E7 배경**(패널과 이어짐) |
| `health-dog` | 4:3 / 1200 | 건강 패널 | 흰 비숑, 베이지 니트, 연한 세이지 #EAF0E4 단색 배경 |
| `memorial` | 4:3 / 1400 | 장례 카드 | 햇살 속 흰 데이지 들판, 소프트 포커스, 어두운 톤 금지 |
| `message` | 4:3 / 1200 | 메시지 카드 | **일러스트**(사진 아님), 보호자가 작은 크림색 강아지를 안음, 단색 세이지 #6F9A79 배경 |
| `thumb-health` | 4:3 / 800 | 건강·의료 글 | 골든리트리버 진료, 수의사 얼굴 없이 손·청진기만 |
| `thumb-nutrition` | 4:3 / 800 | 사료·영양 글 | 태비 고양이가 흰 그릇의 사료를 먹음 |
| `thumb-care` | 4:3 / 800 | 케어·라이프 글 | 공원 산책 중인 코기 |
| `thumb-adoption` | 4:3 / 800 | 입양·등록 글 | 크림 담요 위에서 자는 치즈 고양이 새끼 |
| `thumb-insurance` | 4:3 / 800 | 보험·법률 글 | 책상 위 빈 서류 더미 옆의 고양이(읽을 수 있는 글자 없음) |

규칙: AI 생성물을 실제 병원·수의사·이용자 사진처럼 설명하지 않는다. 원본은 저장소 밖에 두고 웹용 WebP만 커밋(`scripts/home-assets/generate.py`의 변환 로직 참고: 가로 리사이즈, WebP q≈82). 사용 서비스·조건·임시 여부를 `docs/home-assets.md`에 기록. 모든 `<Image>`는 `width/height`(또는 `fill`+비율 컨테이너), 내용 이미지는 의미 있는 한국어 `alt`, 장식 이미지는 `alt=""`. 히어로만 `priority`, 하단 이미지는 lazy.

### B-6. 반응형·접근성·성능
- 검증 폭: 360 / 390 / 768 / 1024 / 1440px. 모바일은 단순 축소가 아니라 제목·주요 탐색을 먼저, 사진은 크롭·재배치. 패널·가이드·사이드 카드는 한 열로.
- 터치 영역 ≥44px, 충분한 대비, 키보드로 메뉴·검색·탭·버튼 이용, 명확한 포커스, 검색·선택 요소의 접근 가능한 이름, H1은 1개와 논리적 제목 계층, `prefers-reduced-motion` 존중.
- 무거운 지도 SDK·애니메이션 라이브러리·자동 재생·자동 회전 캐러셀·마우스 효과 금지. 홈 조회마다 DB 전체 읽기·중복 쿼리 금지(기존 ISR/캐시 활용, 새 쿼리가 필요하면 기존 캐시 함수 패턴으로).
- 요청하지 않은 라이브러리 설치 금지.

### B-7. SEO·구조 유지
`metadata`(title/description/canonical `/`), 기존 JSON-LD, GA4·AdSense 설정, robots, 사이트맵은 변경하지 않는다. Title/description 글자수 제한(Google 60/120, Naver 40/80 지침은 CLAUDE.md 참고)을 넘기지 않는다.

### B-8. 검증 (완료 전 필수, 실제 실행 결과로만 보고)
1. 격리 DB로 개발 서버 실행 후 홈 렌더링 확인(운영 DB 연결 금지: `TURSO_DATABASE_URL=file:...` 로컬 SQLite + `db/migrations` 적용 + 가상 데이터).
2. 데스크톱 1440, 태블릿 768, 모바일 360/390의 **전체 페이지 스크린샷**을 생성해 시안과 나란히 비교(히어로 사진 크기·위치·배경 연결 / 제목 크기·줄바꿈 / 두 버튼의 상대 강조 / 7개 타일 모양·간격 / 두 패널 균형 / 가이드:사이드 카드 비율 / 꽃·메시지 카드 분위기 / 여백·라운드·색감). "디자인 일치율 N%" 같은 근거 없는 수치 금지. 반응형 때문에 생긴 차이와 재현 부족을 구분해 기록.
3. 기능: 헤더 메뉴, 검색(결과 없음 포함), 지역 선택→시설 이동, 강아지/고양이 탭 또는 링크, 가이드·백과·장례 링크, 푸터 정책 링크, 모바일 메뉴(열기·Esc·포커스 복귀), 이미지 실패/데이터 없음(가이드 0건) 상태.
4. 콘솔 오류, 이미지 404, 가로 넘침, 겹침 점검. 외부 요청(광고·GA4)은 차단하고 검증.
5. `pnpm test`, `pnpm exec tsc --noEmit`, `pnpm lint`, 필요 시 격리 `next build`. 기존 실패와 신규 실패를 구분. 실행 못 한 검증은 "못 했다"고 쓴다.
6. 브라우저: Playwright Chromium이 `~/AppData/Local/ms-playwright`에 설치돼 있고 `playwright-core`가 devDependency에 있다. 없으면 시스템 Chrome(`channel: "chrome"`).

### B-9. 최종 보고 형식
변경 파일·핵심 변경 / 실행 방법 / 데스크톱·모바일 스크린샷 경로 / 실제 연결한 기능과 미연결·제한 / 명령별 실제 결과(exit code·테스트 수) / 이미지 출처·사용 조건·**임시 자산 여부** / 운영 반영 전 확인 사항. 로컬 구현 완료와 운영 배포 완료를 구분하고, push·배포는 승인 후에만.

---

## C. 작업 2 — R05 통합·e2e 테스트와 CI

목표: 단위 테스트가 놓치는 "기능 사이의 연결"을 production build + 실제 브라우저로 검증한다.

### C-1. 설계(이미 정해 둔 방향 — 같은 방식으로 구현)
1. **격리 빌드 경로**: `next.config.ts`에 `distDir: process.env.PETJIGI_DIST_DIR ?? ".next"`를 추가(기본값 `.next`라 운영 영향 없음). `.gitignore`에 `/.next-e2e/`, `/.e2e-tmp/` 추가. e2e는 `next build`(**`next-sitemap` 실행 금지** — `public/sitemap-*.xml` 덮어쓰기 방지)만 실행.
2. **격리 DB 픽스처** `tests/e2e/support/fixture.ts`: 임시 디렉터리의 SQLite 파일에 `db/migrations/*.sql`을 `--> statement-breakpoint` 단위로 적용하고 가상 데이터만 삽입. 앱에는 `TURSO_DATABASE_URL=file:<경로>`, `TURSO_AUTH_TOKEN=""`를 주입하고 **`file:`이 아니면 실행 중단**(운영 DB 보호). 저장소에 `.env*` 파일은 없으므로 프로세스 env가 우선한다.
3. **하네스** `tests/e2e/support/app.ts`: 빈 포트 확보 → `pnpm exec next build` → `next start -p <port> -H 127.0.0.1` → 준비 대기 → 종료 시 프로세스 트리(Windows는 `taskkill /T /F`)와 임시 디렉터리만 정리. `E2E_SKIP_BUILD=1`로 재빌드 생략 가능(BUILD_ID 존재 시).
4. **브라우저** `tests/e2e/support/browser.ts`: `playwright-core`의 chromium. 모든 외부 요청(광고·GA4 등)을 `context.route`로 차단(로컬 origin만 통과). 뷰포트 360/768/1440.
5. **실행 방식**: 파일명 `*.e2e.ts`(기존 `pnpm test` 글롭에 섞이지 않게), 스크립트 `"test:e2e": "tsx --test tests/e2e/*.e2e.ts"`. `pnpm test`는 그대로 유지.
6. **CI**(`.github/workflows/ci.yml`에 별도 job 추가, 기존 단위·타입·lint·콘텐츠 게이트 유지): `pnpm exec playwright-core install --with-deps chromium` → `pnpm test:e2e`. 실패 시 종료 코드 실패. 임의 skip·무조건 재시도·고정 sleep으로 숨기지 않는다. 원격 CI를 돌리지 못했다면 로컬 동등 검증과 구분해 보고.

### C-2. 픽스처 데이터(가상)
- `regions`: 서울 강서구(11500, `gangseo`) / 부산 강서구(21130, `gangseo`) / 서울 노원구(`nowon`) / 경기 부천시(`bucheon`).
- `businesses`(vet): 노원동물병원·노원두번째병원(노원구), 서울강서병원(서울 강서구), 부산강서병원(부산 강서구), **행복동물병원 2곳**(서울·부산 강서구, 같은 이름). (registration): 부천등록대행A·B(active), C(paused). `address_sido`는 "서울"/"부산"/"경기도"처럼 원본 형태로.
- `contents`(guide, category 5, ymyl 0): ① 정상 발행 — 본문에 `<h2 id="">`, `<h2 id="a&amp;b">`, 동일 제목 2개, `<h3>`, `<h2 id='single'>`와 긴 문단(스크롤 확보) ② `published_at` 2999년(미래) ③ `status='review_queue'`. ②③은 404여야 한다.

### C-3. 필수 통합 흐름
1. 정상·동명 지역 목록 → 상세 → 뒤로가기/목록 복귀: `/nowon/vet`에서 실제 링크 클릭 → h1·breadcrumb 확인. `/gangseo/vet`에서 서울강서병원 클릭 → 200 상세. 행복동물병원 클릭 → 선택 안내(주소 2개, noindex, 200). 미등록 지역·미지원 업종·없는 업체 → **HTTP 404와 화면 일치**.
2. 검색 UI(`/search`)에서 검색 → 결과 링크 클릭 → 올바른 상세.
3. 등록대행기관 목록 → 상세 → FAQ·JSON-LD: "운영 중|영업 중인" 없음, "영업 여부는 원본에 없어" 있음. 일반 vet 상세는 기존 "운영 중입니다" 유지.
4. 불완전 API 응답 → ETL 완료 판정 → DB 상태 보존: 픽스처 DB에 `syncRegistrationAgents`를 fetch 스텁(총계 1000/1행)으로 실행 후 `/bucheon/registration`이 여전히 기관을 보여준다(`etl/mafra/registration-agents.sync.test.ts`의 하네스 재사용).
5. 목차: `/guide/<slug>`에서 TOC 링크를 **실제 클릭** → `location.hash` 변경 + 대상 요소가 존재하고 뷰포트 안. 중복 id 없음, `id=""` 없음.
6. 미래 발행·검토 대기 콘텐츠 비노출: 상세 404, `/guide` 목록·`/api/search` 결과·사이트맵 제외.
7. 광고 제한 이동: 빌드 시 `NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-0000000000000000`(가짜 ID, 외부 요청은 차단됨) 주입. 일반 페이지에서 1.2초 이상 대기해 `#adsense-auto`가 생기는 것을 확인 → 푸터 "장례·추모" 링크 클릭 → 전체 재로드되어 `#adsense-auto`가 없고 `[data-ads-policy="block"]`이 있음(`components/ads/adsense-loader.tsx` 동작).

### C-4. 화면 점검(주요 페이지 × 360/768/1440)
가로 넘침(`scrollWidth <= innerWidth`), 키보드 Tab 이동과 포커스 표시, 오류 화면 상태코드, 메타데이터·JSON-LD 일관성.

---

## D. 작업 3 — R06 DB 조회 비용 측정과 최소 최적화

이전 F08(측정 미완료 보류)의 후속. **측정 먼저, 근거 있는 최소 변경만.**

- 대상 요청: 블로그 상세, 지역 목록(`/[sigungu]/[type]`), 업체 상세(`/[type]/[sigungu]/[slug]`, R02 이후 resolver 경유), 검색 API.
- 계측은 실제 DB 클라이언트/ORM 실행 계층(`db/client.ts`의 libSQL client `execute` 래핑 또는 Drizzle logger)에서, **환경변수 플래그로만 활성화**(운영 기본 비활성). 요청별 쿼리 수·중복 쿼리(정규화한 SQL 해시)·소요시간을 기록하고 **파라미터 값·검색어 원문은 남기지 않는다.**
- 반환 행 수와 DB가 읽은 행 수(rows_read)를 구분. rows_read를 알 수 없으면 "미측정"으로 표기(추정 금지).
- 조건: 같은 픽스처·같은 요청·production build/start, **첫 요청 vs 반복 요청 구분**, 변경 전후 코드 버전·방법 기록. 재실행 스크립트(`pnpm measure:db` 등)와 사용법을 남긴다.
- 최적화는 확인된 중복·과다 조회에 한해: 요청 내부 중복 제거(React `cache`)와 요청 간 캐시(`unstable_cache`)를 구분. 인덱스 변경은 실행 계획(`EXPLAIN QUERY PLAN`)과 읽기·쓰기 비용 확인 후에만. 캐시 시간을 무조건 늘리거나 `force-dynamic`을 임의로 제거하지 않는다. 콘텐츠 정정·예약 공개·비공개 전환·ETL 갱신 시 오래된 결과가 남지 않는 무효화 조건을 함께 검증. 개인정보·오류 응답을 공용 캐시에 넣지 않는다. 유료 캐시·모니터링 도입 금지.
- GA4·GSC는 이미 허용된 읽기 경로가 있을 때만 연결 상태를 확인(OAuth 재연결·태그 변경 금지). 성과 데이터 추정 금지.
- 근거가 부족하면 "계측 완료·최적화 보류"로 보고. 절감률·향상률을 만들어 내지 않는다.

---

## E. 공통 작업 규칙

- 각 과제: **재현 → 실패하는 회귀 테스트 → 최소 수정 → 재실행 → 영향 확인**. 테스트는 실제 앱 모듈을 import하고 외부 의존성(fetch·지오코딩·DB)만 주입. 핵심 로직을 테스트 파일에 복사하지 않는다. 기존 테스트를 삭제하거나 기대값을 느슨하게 바꾸지 않는다.
- 한 번에 한 기능. 에러는 3번까지 자동 수정, 안 되면 원인과 함께 보고.
- 변경 전 영향분석: 수정 대상 함수·타입·상수를 Grep으로 참조 확인, 입력→처리→저장→출력 흐름 점검.
- 코드 스타일: TypeScript strict, 한국어 주석·UI, 파일당 200줄 이하 지향, 불필요한 코드·import 금지, `console.log` 디버깅 커밋 금지, 요청 없는 대규모 리팩터링 금지.
- 작업 순서 권장: **홈(자산 준비 시) → R05 → R06**. 자산이 없으면 R05부터 진행하고 홈은 슬롯 구조까지만.
- 커밋은 작업 단위로 분리, push·병합·배포는 사용자 승인 후. 커밋·PR 메시지는 기존 형식을 따른다.
- 세션 종료 시 `STATUS.md`(30줄 이내)와 이 문서의 §0 상태표를 갱신한다.

## F. 참고 파일 지도

| 주제 | 파일 |
|---|---|
| 홈 | `app/page.tsx`, `app/home.css`, `components/home/*`, `tests/home-readiness.test.mjs` |
| 공통 레이아웃 | `app/layout.tsx`, `components/layout/{header,footer}.tsx`, `app/globals.css` |
| 지역·업체 | `app/[sigungu]/[type]/page.tsx`, `app/[sigungu]/[type]/[slug]/{page,opengraph-image}.tsx`, `lib/{region-identity,business-detail-match,business-detail-resolve,business-status-wording,db-queries,search-contract}.ts` |
| 목차 | `lib/toc.ts`, `components/content/table-of-contents.tsx` |
| 광고 정책 | `lib/ads-policy.ts`, `components/ads/{adsense-loader,ad-slot}.tsx`, `components/providers/ad-policy-provider.tsx` |
| ETL | `etl/mafra/*`, `.github/workflows/etl-registration-agents.yml` |
| 스키마·마이그레이션 | `db/schema/*`, `db/migrations/*.sql` |
| 이미지 스크립트 | `scripts/home-assets/generate.py` (키는 환경변수 `GEMINI_API_KEY` 또는 `~/.claude/.env`, 현재 사용 불가) |
| 이전 기록 | `STATUS.md`, `docs/petjigi-improvement/`, `docs/HANDOFF.md` |
