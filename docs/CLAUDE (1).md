# CLAUDE.md — 펫지기 (PetJigi) 프로젝트 가이드

> **너에게 (Claude Code)**: 이 파일은 항상 컨텍스트에 있어야 한다. 작업 시작 전 이 파일과 `PROJECT_SPEC.md`를 먼저 읽어라. 의심스러우면 spec을 다시 확인하고, 본 파일과 spec이 충돌하면 spec이 우선이다.

---

## 1. 프로젝트 정체성

- **이름**: 펫지기 (PetJigi)
- **시리즈**: 지기 (법률지기 → 금리지기 → **펫지기**)
- **컨셉**: 반려동물과 함께하는 모든 결정 — 입양부터 장례까지
- **수익 모델**: AdSense + 어필리에이트 4종 (펫보험·펫푸드·펫서비스·메모리얼) + 이메일 리스트
- **카테고리**: 6대 (입양·등록 / 사료·영양 / 건강·의료 / 보험·법률 / 케어·라이프 / 장례·추모)

**현재 Phase**: Phase 0 — Foundation

---

## 2. 절대 금기 항목 (이 규칙 어기면 사이트 통째로 위험)

1. ⛔ **동물병원 페이지에 진료과목/진료 가능 동물 종 자동 생성 금지**
   - LOCALDATA 공식 답변상 해당 데이터 미보유. 자동 생성 시 명백한 허위 정보 → YMYL 위반 + 평판 파괴
   - 동물병원 페이지는 위치·연락처·등록 기본 정보까지만

2. ⛔ **본문 자동 리라이팅·패러프레이징 금지**
   - Google Scaled Content Abuse 정책 직격타
   - 콘텐츠는 1회 자동 생성 → 검수 → 발행 → 정기 검토만. 재생성·재작성 X

3. ⛔ **카테고리 6(장례·추모)에 펫보험·펫푸드·펫서비스 광고/CTA 노출 금지**
   - 윤리적 부적절 + 즉각 사용자 분노 유발
   - 메모리얼 굿즈 어필리에이트만 허용. DOM 레벨에서 차단

4. ⛔ **약물 용량·투여 지침, 특정 질병 "확실한 진단"·"치료 보장" 표현 금지**
   - 모든 약물 정보는 "수의사 처방" 명시
   - 의료 면책문 카테고리 3 전 페이지 자동 삽입

5. ⛔ **YMYL 카테고리(3·4·6) 콘텐츠를 reviewer 검수 큐 우회 발행 금지**
   - 검수 큐 통과 → 발행
   - 면책문 / 검토일자 / 인용 출처 / reviewer 이름 모두 필수 필드

6. ⛔ **Google 사이트맵 ping endpoint 사용 금지**
   - 2023년 deprecated. IndexNow(Naver+Bing) + GSC API만 사용

7. ⛔ **약사법·동물의료법 금지어 사용 금지**
   - "치료한다" / "효능" / "면역력 강화" / "○○병이 낫는다" / "예방한다" 등은 의약품 효능 효과 표시로 해석되어 약사법 위반 위험
   - 콘텐츠 생성 후 정규식 자동 스캔 → 매칭 발견 시 reviewer 검수 큐 강제 라우팅
   - 전체 금지어·권장 대체 표현은 `LEGAL_CONTENT_GUIDE.md` §1 참조

8. ⛔ **어필리에이트 표시 의무 누락 금지**
   - 표시광고법·공정거래위원회 추천보증 심사지침 의무
   - 모든 어필리에이트 페이지: 상단 + 링크 근처 + 푸터 3중 표시
   - 모든 링크 `rel="sponsored nofollow"` 속성
   - 표준 문구 + 적용 표는 `LEGAL_CONTENT_GUIDE.md` §2 참조

---

## 3. 기술 스택 (확정)

| 레이어 | 기술 | 비고 |
|--------|------|------|
| Framework | Next.js 15 (App Router) | Server Components 활용 |
| Runtime | Vercel Pro | Hobby tier 가정 X |
| DB | Turso (libSQL) | 글로벌 엣지 |
| ORM | Drizzle | 닥터맵·법률지기·금리지기와 동일 |
| Styling | Tailwind CSS + shadcn/ui | 카테고리별 디자인 모드 분기 |
| Forms | react-hook-form + zod | |
| 패키지 매니저 | **pnpm** (모노레포) | |
| Cron | GitHub Actions + Vercel Cron | ETL 분리 |
| 지오코딩 | **카카오맵 REST API** | 일 30만 건 무료 |
| 이메일 발송 | **Resend** + React Email | 도메인 인증 필수 |
| Analytics | GSC + GA4 + AdSense + Naver Search Advisor | |
| Sitemap/SEO | next-sitemap + next-seo | lastmod 정확성 |
| IndexNow | Naver + Bing 동시 ping | 변경된 URL만 |

### 패키지 설치 명령 패턴
```bash
pnpm add <package>           # 의존성
pnpm add -D <package>        # 개발 의존성
pnpm dlx <command>           # 일회성 실행
```

### 캐시·revalidate 페이지별 정책 (Turso row reads 한도 보존)
- 영업장 상세 페이지: ISR `revalidate: 86400` (일 1회, ETL 갱신 주기와 일치)
- 시군구·시도 허브: ISR `revalidate: 86400`
- 가이드 콘텐츠: ISR `revalidate: 604800` (주 1회, 콘텐츠 정기 검토 주기)
- 견종·묘종: ISR `revalidate: 604800`
- 홈·카테고리 허브: ISR `revalidate: 3600` (시간당)
- 구조동물 (noindex): SSR (휘발 정보)

### 디렉토리 구조 (제안)
```
/
├── app/                          # Next.js App Router
│   ├── (default)/               # 일반 카테고리 (1~5)
│   ├── (memorial)/              # 카테고리 6 전용 layout
│   └── api/
├── components/
│   ├── ui/                      # shadcn/ui
│   ├── ads/                     # AdSlot, MemorialAd
│   └── content/                 # 콘텐츠 렌더링
├── db/
│   ├── schema/                  # Drizzle 스키마 (8개 테이블)
│   ├── migrations/
│   └── client.ts
├── etl/                         # ETL 파이프라인
│   ├── localdata/               # LOCALDATA 동물 18종
│   ├── mafra/                   # 검역본부 통합 데이터셋
│   ├── apms/                    # 보호센터·구조동물
│   └── geocoding/               # 카카오맵 좌표 변환
├── lib/
│   ├── category.ts              # 카테고리 정의·분기
│   ├── ad-policy.ts             # 광고 정책 분기
│   ├── ymyl.ts                  # YMYL 면책문·E-E-A-T
│   └── seo/                     # 사이트맵·IndexNow·구조화 데이터
├── content/                     # 정적 가이드 콘텐츠 (MDX)
├── public/
├── PROJECT_SPEC.md              # 본 스펙 (긴 버전)
├── CLAUDE.md                    # 이 파일
└── .env.example
```

---

## 4. 카테고리 시스템

### 카테고리 분기 매트릭스

| ID | 이름 | 톤 | 디자인 모드 | 광고 정책 | YMYL |
|----|------|----|-----------|----------|------|
| 1 | 입양·등록 | 따뜻하게 | default | 일반 | X |
| 2 | 사료·영양 | 정확하게 | default | 펫푸드 ★★★ | X |
| 3 | 건강·의료 | 정확·꼼꼼하게 | default | 펫보험 ★★★ | **✓** |
| 4 | 보험·법률 | 꼼꼼하게 | default | 펫보험 ★★★ | **✓** |
| 5 | 케어·라이프 | 따뜻하게 | default | 펫서비스 ★★★ | X |
| 6 | 장례·추모 | 조용히 | **memorial** | 메모리얼만 | **✓** |

### CategoryProvider 패턴
```typescript
// app/(memorial)/layout.tsx
<CategoryProvider category={6}>
  <ThemeMode mode="memorial">
    <AdPolicyProvider category={6}>
      {children}
    </AdPolicyProvider>
  </ThemeMode>
</CategoryProvider>
```

### 카테고리 6 자동 적용 항목
- 컬러 모드: dark gray(#2C2C2C) + warm white(#F5F1EA) + musk gold(#B89968)
- AdSense 슬롯: 비활성화 or 메모리얼 굿즈로 대체
- 펫보험·펫푸드 CTA: DOM 차단
- 헤더 톤: "정보로 곁에서"
- 면책문: 펫로스 면책 자동 삽입

---

## 5. 데이터 소스 (검증 완료)

| ID | 데이터셋 | 카테고리 | 형식 | Cron |
|----|---------|---------|------|------|
| 15121110 | 검역본부_반려동물 영업장 (7업종 통합) | 1, 5, 6 | XLS | 일 1회 03:00 |
| 15045050 | 행정안전부_동물병원 | 3 | XLS | 일 1회 03:30 |
| 15025454 | 전국동물보호센터정보표준데이터 | 1 | REST API | 주 1회 일요일 04:00 |
| 15098931 | APMS 구조동물 (noindex 페이지) | 1 | REST API | 일 1회 05:00 |
| LOCALDATA | 동물 18종 인허가 | 1, 3, 5, 6 | XLS/XML | 일 1회 |
| 검역본부 | 반려동물 등록대행업체 | 1 | API | 월 1회 |

### ETL 원칙
- diff 기반 upsert (해시 비교)
- 폐업/휴업 → status='closed' + 페이지 410 응답 + canonical 상위로
- 변경된 URL만 IndexNow ping
- 실패 시 Slack/이메일 알림 + 재시도 3회
- **소스 stale 검출** — 소스 데이터가 N일 이상 갱신 없으면 알림 (보통 LOCALDATA는 매일 갱신)
- **LOCALDATA diff fuzzy match** — 인허가 갱신으로 새 ID 발급 케이스 처리. name + 정규화 주소 fuzzy match로 동일성 검증, 동일하면 ID 변경만 적용 (페이지 단절 방지)
- **데이터 quality check** — 좌표 null 비율, 폐업 비율 변화, 카테고리별 영업장 수 추이 등 메트릭 일일 측정 + 임계치 초과 시 알림
- **지오코딩 영구 캐싱** — 카카오맵 호출 결과는 DB 영구 저장. 좌표 재호출 금지 (한도 보존)

### Drizzle 스키마 (8개 테이블)
1. `businesses` — 영업장 통합 (vet/grooming/funeral/boarding/sale/breeder/transport/exhibition)
2. `shelters` — 보호센터
3. `contents` — 가이드·견종·질병 콘텐츠
4. `breeds` — 견종·묘종
5. `regions` — 시도/시군구 (통계청 행정구역)
6. `review_queue` — YMYL 검수 큐
7. `ad_policies` — 카테고리 × 광고 타입
8. `email_subscribers` — 이메일 리스트

상세 스키마는 `PROJECT_SPEC.md` §4.3 참조.

---

## 6. URL 구조 & Canonical

```
/                                       # 홈
/category/{slug}                        # 카테고리 허브 (6개)
/{type}/{sigungu}/{slug}                # 영업장 상세
/{sigungu}/{type}                       # 지역 × 업종 허브
/sido/{sido}                            # 시도 허브
/guide/{slug}                           # 카테고리 가이드
/breed/{species}/{slug}                 # 견종/묘종
/condition/{slug}                       # 질병/증상 (Phase 2+)
/insurance/compare, /insurance/{insurer}
/tools/{slug}                           # 도구 (Phase 3+)
```

### Indexable 규칙
- ✓ 홈 / 카테고리 허브 / 시도·시군구 허브 / 영업장 상세 / 가이드 / 견종 / 질병
- ✗ 동 단위 페이지 → 시군구로 canonical
- ✗ 구조동물 → noindex (휘발)
- ✗ 검색 결과·페이지네이션 → noindex
- 410 (폐업): status='closed' 영업장

---

## 7. 콘텐츠 거버넌스

### 페이지당 unique signal 3종 (영업장 매트릭스 필수)
1. **지역 인사이트** (해당 시군구 통계: 영업장 수·평균·등록률)
2. **유형/규모 데이터** (영업장 면적·운영 기간·비교 그룹 평균)
3. **인근 시설 추천** (5km 반경, 카테고리 친화 큐레이션)

### YMYL E-E-A-T 의무 필드 (카테고리 3·4·6)
```yaml
- author_name, author_credential
- reviewed_at, reviewer_name
- sources: 최소 2건
- disclaimer: 카테고리별 면책문
- schema.org: Article 또는 MedicalWebPage
```

### 카테고리별 면책문
- **카테고리 3**: "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 반려동물의 건강 문제는 반드시 수의사와 상담하세요. 응급 상황 시 가까운 동물병원 또는 24시간 동물의료센터를 즉시 방문해 주세요."
- **카테고리 4**: "본 콘텐츠는 보험·법률 정보 제공 목적이며, 개별 상황에 따라 적용이 다를 수 있습니다. 본 사이트는 보험 중개·법률 자문 기관이 아닙니다."
- **카테고리 6**: "본 콘텐츠는 정보 제공 및 슬픔 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다. 펫로스로 일상이 어렵다면 전문 심리상담사 또는 정신건강복지센터의 도움을 받으세요."

---

## 8. 광고·어필리에이트 정책

### 어필리에이트 4종
- **펫보험**: 비마이펫 + 라이펫 듀얼 (트래픽 1,000+ 도달 후 직접 제휴 컨택, 그 전엔 일반 링크)
- **펫푸드**: 쿠팡파트너스 (펫 카테고리)
- **펫서비스 (호텔·미용·훈련)**: Phase 3 진입 후 직접 제휴 (와요·펫플래닛·도그메이트·펫홀 후보)
- **메모리얼 굿즈**: 쿠팡파트너스 + 자체 큐레이션 하이브리드

### 어필리에이트 링크 규칙
- 모든 어필리에이트 링크: `rel="sponsored nofollow"` (의무)
- 명확한 라벨: "제휴 링크" 또는 ※ 아이콘
- 가격·조건 정확성 분기 1회 재검증

### 어필리에이트 의무 표시 (표시광고법)
- **페이지 상단** (스크롤 없이 보이는 영역): 어필리에이트 활동 사실 명시
- **링크 직전·직후**: "제휴 링크" 라벨
- **페이지 푸터**: 전체 표시 문구
- **/disclosure 페이지**: 전체 어필리에이트 정책

표준 문구 (어필리에이트별):
- 쿠팡파트너스: "이 페이지는 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다."
- 펫보험·기타: "이 페이지에는 제휴 링크가 포함되어 있으며, 사용자가 링크를 통해 가입 또는 구매 시 펫지기가 일정 수수료를 받을 수 있습니다."

전체 가이드: `LEGAL_CONTENT_GUIDE.md` §2

---

## 9. SEO/AEO/GEO

### 사이트맵
- next-sitemap, lastmod = ETL 동기화 시점
- 동 단위 페이지 sitemap 제외

### Core Web Vitals 목표 (Naver 모바일 검색 비중 85%+ 대응)
- **LCP < 2.5s** (Largest Contentful Paint)
- **INP < 200ms** (Interaction to Next Paint)
- **CLS < 0.1** (Cumulative Layout Shift)
- 페이지별 측정: Vercel Speed Insights + GA4 Web Vitals
- 임계치 초과 페이지는 Phase별 우선순위로 최적화

### 카카오톡 공유 메타 (한국 트래픽 재유입 핵심)
- OG 태그 (og:title, og:description, og:image) — 모든 페이지 필수
- 카카오톡 미리보기 image: 1200x630 또는 800x400, 4MB 미만
- 시리즈 표준 일관성 (법률지기·금리지기와 통일)

### IndexNow
- Naver + Bing 동시 ping (변경된 URL만)
- 일 ping 최대 한도 준수

### Naver 대응
- RSS feed `/feed.xml` 필수
- Yeti bot 명시 허용
- Naver Search Advisor 등록
- Naver Place 우위 영역(동물병원·미용업 단순 검색)은 long-tail 우회 (예: "24시", "선택 방법", "리스트")

### AI 크롤러 (robots.txt 명시 허용)
```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
```

### AEO/GEO 콘텐츠 패턴 (AI 검색 인용 최적화)
- 50~150 단어 구조화 chunk
- H2 = 직접 질문 (예: "강아지 슬개골 탈구는 어떤 증상이 있나요?")
- **첫 단락 = 핵심 답변 우선 배치** (역피라미드, 30~80 단어)
- 정의 박스 / 통계 박스 / 비교 표 → 인용 가능한 fact 구조
- FAQPage schema.org 마크업
- 시간 표현 자제 ("최근", "올해" 등) → 인용 시 stale 안 되게

---

## 10. 시리즈 일관성

법률지기·금리지기·닥터맵과의 운영 표준 공유:
- "-지기" 시리즈 브랜드
- Next.js 15 + Vercel Pro + Turso + Drizzle 스택 동일
- pSEO 매트릭스 + 공공데이터 ETL 패턴 동일
- IndexNow + Naver Search Advisor 듀얼 SEO
- AdSense Optimizer 스킬(에센최적화) 정기 진단
- 시리즈 푸터에 다른 지기 사이트 cross-link (Phase 2+)

**시리즈 일관성 체크**: 법률지기·금리지기에서 다른 선택을 한 영역이 있다면, 펫지기도 통일 검토. Limo가 알려주는 항목 우선 반영.

---

## 11. 작업 시작 전 체크리스트 (Phase 0)

작업 진입 전 확인:
- [ ] `PROJECT_SPEC.md` v1.1 읽음
- [ ] 본 `CLAUDE.md` 읽음
- [ ] Limo가 KIPRIS 상표권·도메인 확보 완료 확인
- [ ] `.env`에 필요한 키 등록 (Turso, Vercel, Resend, 카카오맵, GSC, GA4 등)
- [ ] 시리즈 일관성: 법률지기·금리지기와의 차이점 확인

### Phase 0 첫 작업 우선순위
1. Next.js 15 + pnpm + Tailwind + shadcn/ui 골조
2. Drizzle ORM + Turso 연동 + 8개 스키마 마이그레이션
3. 카테고리 시스템 (CategoryProvider, ThemeMode, AdPolicyProvider)
4. 디자인 토큰 (default + memorial 모드)
5. ETL 골조 (GitHub Actions cron 5개 + 실패 알림)
6. SEO 골조 (next-sitemap, next-seo, IndexNow 클라이언트)
7. regions 시드 (통계청 행정구역)

---

## 12. 참조 문서

- **`PROJECT_SPEC.md`** v1.2 — 전체 스펙 (§0~17, Round 1+2 리뷰 반영)
- **`LEGAL_CONTENT_GUIDE.md`** v1.0 — 법무·콘텐츠 컴플라이언스 (약사법·표시광고법·개인정보보호법)
- **닥터맵·법률지기·금리지기 spec** — 시리즈 패턴 참고
- **공공데이터포털** (data.go.kr) — 데이터셋 메타 정보
- **LOCALDATA** (localdata.go.kr) — 인허가 raw 데이터
- **농림축산식품 공공데이터 포털** (data.mafra.go.kr) — 농식품 보조 데이터

---

## 13. 의심스러우면

1. **콘텐츠 자동 생성 결정**: §2 절대 금기 항목 재확인 → 의심되면 reviewer 큐로 보냄
2. **광고/CTA 노출 결정**: §8 정책 매트릭스 확인 → 의심되면 노출 안 함
3. **URL 구조 결정**: §6 + spec §5 확인 → noindex가 안전한 기본값
4. **스키마 변경**: 마이그레이션 작성 + Limo에게 변경 사항 알림
5. **데이터 라이선스**: spec §4.1 카탈로그 확인 → redirect 강제 조항 발견 시 즉시 중단
6. **콘텐츠 표현 (약사법)**: `LEGAL_CONTENT_GUIDE.md` §1 금지어 매칭 확인 → 매칭 발견 시 reviewer 큐 강제 라우팅
7. **어필리에이트 표시**: 페이지 상단·링크 근처·푸터 3중 표시 확인 → 누락 발견 시 즉시 추가
8. **개인정보 수집 폼**: `LEGAL_CONTENT_GUIDE.md` §3 동의 분리 표준 준수 확인
9. **Core Web Vitals**: 페이지 빌드 후 LCP/INP/CLS 측정 → 임계치 초과 시 최적화 후 발행

---

**마지막 업데이트**: 2026-05-17 v1.1 — Round 2 리뷰 결과 반영 (Round 1 5인 + Round 2 5인 = 10인 통과)
