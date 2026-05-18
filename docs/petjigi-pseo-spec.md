# 펫지기 (PetJigi) — pSEO 사이트 v1.0 핸드오프 스펙

> **목적**: Claude Code 자율 실행 수준의 사이트 구축 핸드오프 스펙
> **작성일**: 2026-05-17
> **시리즈 위치**: 법률지기 · 금리지기 · 펫지기 (지기 시리즈 3호)
> **핸드오프 대상**: Claude Code (클코)

---

## 0. 메타 & 빠른 참조

| 항목 | 값 |
|------|---|
| 프로젝트명 | 펫지기 (PetJigi) |
| 도메인 후보 | petjigi.com (1순위) / petjigi.co.kr (2순위) |
| 컨셉 한 줄 | 반려동물과 함께하는 모든 결정 — 입양부터 장례까지 |
| 카테고리 수 | 6대 카테고리 |
| 1차 목표 페이지 | ~19,000 (Phase 3 완료 시) |
| 풀스케일 목표 | 35,000~50,000 페이지 |
| MVP 출시 목표 | Phase 0+1 완료 시점 (약 7~10주) |
| 풀스케일 목표 | 약 6~7개월 |
| 기술 스택 | Next.js 15 App Router + Vercel Pro + Turso + Drizzle ORM |

### Phase 0 진입 전 Limo 직접 확인 사항 (5~10분)

- [ ] **KIPRIS 상표권** (kipris.or.kr → 상표 → "펫지기" 검색) — 41/42류 출원 충돌 여부
- [ ] **도메인 가용성** (후이즈) — petjigi.com / petjigi.co.kr / petjigi.kr
- [ ] **상표권 출원** 결정 — 우리가 먼저 출원할지 (시리즈 자산 보호)

---

## 1. 프로젝트 개요 & 포지셔닝

### 1.1 비전

**광고가 아닌 정보로 보호자를 지킨다.** 닥터맵·법률지기 패턴의 정보 신뢰성 + 펫 영역 특유의 따뜻함을 결합한 종합 정보 사이트.

### 1.2 6대 카테고리 트리

| # | 카테고리 | 핵심 부주제 | 톤 | 공공데이터 강도 |
|---|---------|------------|----|---------------|
| 1 | **입양·등록** | 분양·입양, 유기동물 보호소, 동물등록제, 품종 가이드 | 따뜻하게 | ★★★★★ |
| 2 | **사료·영양** | 사료 비교, 간식·영양제, 알러지, 견종·묘종별 식단 | 정확하게 | ☆ (콘텐츠 위주) |
| 3 | **건강·의료** | 동물병원 검색, 증상·질병, 응급, 예방접종, 약물 | 정확·꼼꼼하게 | ★★★★ |
| 4 | **보험·법률** | 펫보험 비교, 보장범위, 청구, 동물보호법 분쟁 | 꼼꼼하게 | ★★ (어필리에이트) |
| 5 | **케어·라이프** | 미용·호텔, 훈련, 산책지, 동반시설, 여행 | 따뜻하게 | ★★★★★ |
| 6 | **장례·추모** | 장묘업체, 장례절차·비용, 펫로스 케어, 추모 | 조용히 | ★★★★ |

### 1.3 타겟 사용자 페르소나 5종

| ID | 페르소나 | 라이프 단계 | 주 카테고리 | LTV | 진입 비중 (추정) |
|----|---------|-----------|-----------|-----|---------------|
| P1 | 예비 입양자 | 입양 전 1~6개월 | 1, 2, 3 | 짧음 | 15% |
| P2 | 초보 보호자 | 0~1년 | 1, 2, 3, 5 | 중 | 25% |
| **P3** | **일상 보호자** | 1~7년차 | 3, 4, 5, 2 | **최장 (7년+)** | **35% (수익 핵심)** |
| P4 | 시니어 보호자 | 7년 이상 | 3, 4, 6 | 중 | 15% |
| P5 | 펫로스 경험자 | 사별 후 | 6 | 짧음 | 10% |

**수익 전략**: P3가 LTV·광고 친화도 모두 최상. P1·P2 → P3 전환 흐름 설계 + P5 영역은 별도 미니사이트처럼 운영(광고/CTA 분리).

---

## 2. 브랜딩 & 디자인 시스템

### 2.1 브랜드 아이덴티티

- **이름**: 펫지기
- **시리즈**: 지기 (법률지기·금리지기·펫지기)
- **한 줄 포지셔닝**: "반려동물 보호자를 위한, 광고가 아닌 정보"
- **금기**: 과한 의인화 캐릭터, 슬픔 마케팅(카테고리 6 한정 톤만), 영어 슬로건

### 2.2 디자인 시스템 — Default 모드

```
색상 토큰:
- bg-primary:    #FAF5EE (크림 베이지)
- text-primary:  #2A2520 (다크 브라운)
- text-secondary: #8C6A4F (소프트 브라운)
- accent:        #9CAF88 (세이지 그린)
- accent-warm:   #C97D5B (테라코타, 포인트)
- border:        #E8DFD0
- success:       #6B9080
- warning:       #D9A455

폰트:
- 본문: Pretendard Variable (현대성 + 가독성)
- 헤딩: Pretendard Variable Semi-bold
- 강조: Pretendard Variable Bold

라운드:
- card: 16px
- button: 12px
- input: 10px
```

### 2.3 디자인 시스템 — Memorial 모드 (카테고리 6 전용)

```
색상 토큰:
- bg-primary:    #2C2C2C (다크 그레이)
- text-primary:  #F5F1EA (따뜻한 화이트)
- text-secondary: #B8B3AA
- accent:        #B89968 (머스크 골드)
- accent-warm:   #8C7B6B
- border:        #3A3A3A
```

**카테고리 6 진입 시 자동 전환:**
- 컬러 모드 전환 (CSS variable 스왑)
- 헤더 슬로건 톤 변경 ("정보로 곁에서")
- 광고 슬롯 자동 비활성화 → 메모리얼 굿즈 어필리에이트만 노출
- 펫보험·펫푸드 CTA 노출 차단

### 2.4 카테고리별 톤 매트릭스

| 카테고리 | 톤 키워드 | 문장 길이 | 인용/통계 비중 | 면책문 |
|---------|---------|---------|--------------|------|
| 1 입양·등록 | 따뜻·격려 | 중간 | 중 | 일반 |
| 2 사료·영양 | 정확·실용 | 짧음 | 높음 | 일반 |
| 3 건강·의료 | 정확·꼼꼼 | 짧음 | **매우 높음** | **의료 면책 필수** |
| 4 보험·법률 | 꼼꼼·중립 | 중간 | 높음 | **금융/법률 면책 필수** |
| 5 케어·라이프 | 따뜻·캐주얼 | 자유 | 중 | 일반 |
| 6 장례·추모 | 조용·곁에서 | 자유, 호흡 길게 | 낮음 | **펫로스 면책 필수** |

---

## 3. 기술 스택 & 인프라

### 3.1 스택

| 레이어 | 기술 | 비고 |
|-------|------|------|
| Framework | Next.js 15 (App Router) | Server Components 활용 |
| Runtime | Vercel Pro | Hobby tier 제약 없음 |
| DB | Turso (libSQL) | 글로벌 엣지 캐시 |
| ORM | Drizzle | 닥터맵·법률지기와 동일 |
| Styling | Tailwind CSS + shadcn/ui | 카테고리별 모드 분기 |
| Forms | react-hook-form + zod | 이메일 수집·문의 |
| 다국어 | next-intl (Phase 4+ 영문 검토) | Phase 0~3 한국어만 |
| 패키지 매니저 | pnpm | 모노레포 |
| 배포 | GitHub → Vercel | Push 자동 배포 |
| Cron | GitHub Actions + Vercel Cron | ETL 분리 |

### 3.2 SEO/AEO/GEO 도구

| 도구 | 용도 |
|------|------|
| next-sitemap | 자동 사이트맵 + lastmod 정확성 |
| next-seo | 메타·OG·구조화 데이터 |
| IndexNow API | Naver + Bing 동시 ping (구글 ping 엔드포인트 deprecated, 사용 X) |
| Naver Search Advisor | RSS feed `/feed.xml`, Yeti bot 허용 |
| GSC API | 인덱싱 추적 + 정기 모니터링 |
| GA4 | 사용자 행동·전환 추적 |
| AdSense API | 페이지 단위 광고 정책 분기 |

### 3.3 모니터링·자동화

- AdSense Optimizer 스킬(에센최적화) 정기 진단
- 사이트 헬스 모니터 (uptime + Core Web Vitals)
- ETL 실패 알림 (Slack 또는 이메일)

---

## 4. 데이터 소스 & ETL 파이프라인

### 4.1 검증 완료 데이터셋 카탈로그

| ID | 데이터셋 | 형식 | 갱신주기 (추정) | 사용 카테고리 | 라이선스 |
|----|---------|------|--------------|-------------|---------|
| 15121110 | 농림축산검역본부_반려동물 영업장 주소 등 정보 (7업종 통합) | XLS | 분기~연 | 1, 5, 6 | Open |
| 15045050 | 행정안전부_동물병원 | XLS | 월~분기 | 3 | Open |
| 15025454 | 전국동물보호센터정보표준데이터 | REST API | 일~주 | 1 | Open |
| 15098931 | APMS 구조동물 조회 서비스 | REST API | 일 | 1 (noindex) | Open |
| (LOCALDATA) | 동물 카테고리 18종 인허가 | XLS/XML | 월 | 1, 3, 5, 6 | Open |
| (검역본부) | 반려동물 등록대행업체 | API | 월 | 1 | Open |
| (검역본부) | 가축 및 반려동물 항생제 내성 모니터링 | 파일 | 연 | 3 (콘텐츠) | Open |

**라이선스 검증 결과**: redirect 강제 조항 없음. 자체 페이지 생성 가능.

**갱신주기 주의**: LOCALDATA 통합 데이터는 batch download 방식(API 아님). 일일 동기화 cron 권장.

### 4.2 데이터 매핑 — 영업장 카테고리 분류

```
동물장묘업       → 카테고리 6
동물미용업       → 카테고리 5
동물위탁관리업    → 카테고리 5 (펫호텔)
동물판매업       → 카테고리 1
동물생산업       → 카테고리 1 (브리더)
동물수입업       → 카테고리 1
동물운송업       → 카테고리 5
동물전시업       → 카테고리 5 (체험)
동물병원         → 카테고리 3
동물보호센터     → 카테고리 1
반려동물 등록대행 → 카테고리 1
```

### 4.3 Turso 스키마 초안 (Drizzle)

```typescript
// schema/businesses.ts
export const businesses = sqliteTable("businesses", {
  id: text("id").primaryKey(),                  // 인허가번호 또는 hash
  type: text("type").notNull(),                 // 'vet' | 'grooming' | 'funeral' | 'boarding' | 'sale' | 'breeder' | 'transport' | 'exhibition'
  category: integer("category").notNull(),      // 1~6
  name: text("name").notNull(),
  legalName: text("legal_name"),
  address: text("address").notNull(),
  addressSido: text("address_sido"),
  addressSigungu: text("address_sigungu"),
  addressDong: text("address_dong"),
  lat: real("lat"),
  lng: real("lng"),
  phone: text("phone"),
  licenseDate: text("license_date"),
  status: text("status").notNull(),             // 'active' | 'closed' | 'paused'
  scale: text("scale"),                         // 면적, 규모 메타
  source: text("source").notNull(),             // 'localdata_15121110' | 'localdata_animals' | 'mafra' | ...
  rawData: text("raw_data", { mode: 'json' }),
  lastSyncedAt: text("last_synced_at").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// schema/shelters.ts
export const shelters = sqliteTable("shelters", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  sido: text("sido"),
  sigungu: text("sigungu"),
  address: text("address"),
  lat: real("lat"),
  lng: real("lng"),
  phone: text("phone"),
  capacity: integer("capacity"),
  source: text("source").notNull(),
  lastSyncedAt: text("last_synced_at").notNull(),
});

// schema/contents.ts
export const contents = sqliteTable("contents", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(),                 // 'guide' | 'business_overlay' | 'breed' | 'condition' | 'comparison'
  category: integer("category").notNull(),
  title: text("title").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  body: text("body").notNull(),                 // markdown or MDX
  authorId: text("author_id"),
  authorName: text("author_name"),
  reviewedAt: text("reviewed_at"),
  reviewerId: text("reviewer_id"),
  status: text("status").notNull(),             // 'draft' | 'review_queue' | 'published' | 'archived'
  ymyl: integer("ymyl", { mode: 'boolean' }).notNull(),
  sources: text("sources", { mode: 'json' }),   // 인용 출처
  disclaimer: text("disclaimer"),
  publishedAt: text("published_at"),
  updatedAt: text("updated_at"),
});

// schema/breeds.ts
export const breeds = sqliteTable("breeds", {
  id: text("id").primaryKey(),
  species: text("species").notNull(),           // 'dog' | 'cat' | 'small'
  slug: text("slug").notNull().unique(),
  nameKo: text("name_ko").notNull(),
  nameEn: text("name_en"),
  origin: text("origin"),
  sizeCategory: text("size_category"),          // 'tiny' | 'small' | 'medium' | 'large' | 'giant'
  lifespanMin: integer("lifespan_min"),
  lifespanMax: integer("lifespan_max"),
  commonConditions: text("common_conditions", { mode: 'json' }),
  body: text("body"),                           // 콘텐츠 (자동생성 + 검수)
  status: text("status").notNull(),
});

// schema/regions.ts
export const regions = sqliteTable("regions", {
  code: text("code").primaryKey(),              // 시군구 코드
  sido: text("sido").notNull(),
  sidoSlug: text("sido_slug").notNull(),
  sigungu: text("sigungu").notNull(),
  sigunguSlug: text("sigungu_slug").notNull(),
  fullName: text("full_name").notNull(),
});

// schema/review_queue.ts
export const reviewQueue = sqliteTable("review_queue", {
  id: text("id").primaryKey(),
  contentId: text("content_id").notNull(),
  contentType: text("content_type").notNull(),
  priority: integer("priority").notNull(),      // 1(highest) ~ 5
  reason: text("reason"),                       // 'ymyl_required' | 'flagged' | 'periodic'
  assignedTo: text("assigned_to"),
  status: text("status").notNull(),             // 'pending' | 'in_review' | 'approved' | 'rejected'
  createdAt: text("created_at").notNull(),
  resolvedAt: text("resolved_at"),
});

// schema/ad_policies.ts
export const adPolicies = sqliteTable("ad_policies", {
  id: integer("id").primaryKey(),
  category: integer("category").notNull(),      // 1~6
  adType: text("ad_type").notNull(),            // 'adsense' | 'pet_insurance' | 'pet_food' | 'pet_service' | 'memorial'
  policy: text("policy").notNull(),             // 'allow' | 'block' | 'preferred'
  notes: text("notes"),
});

// schema/email_subscribers.ts (이메일 리스트)
export const emailSubscribers = sqliteTable("email_subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  persona: text("persona"),                     // 'P1' | 'P2' | 'P3' | 'P4' | 'P5' (자가신고)
  source: text("source"),                       // 'pet_loss_guide' | 'new_owner_guide' | ...
  subscribedAt: text("subscribed_at").notNull(),
  unsubscribedAt: text("unsubscribed_at"),
});
```

### 4.4 ETL 파이프라인 설계

```
[Cron 1: 일 1회 03:00 KST]
LOCALDATA 18종 동물 카테고리 batch download
  → 영업장 통합 데이터셋 (15121110) 또는 카테고리별 XLS
  → 파싱 + diff (해시 비교)
  → upsert into businesses 테이블
  → 폐업/휴업 status 업데이트
  → 변경된 row만 IndexNow ping

[Cron 2: 주 1회 일요일 04:00 KST]
APMS 보호센터 정보 REST API
  → fetch shelterInfo_v2
  → upsert into shelters 테이블

[Cron 3: 일 1회 05:00 KST]
APMS 구조동물 조회 API
  → fetch + upsert into rescued_animals (별도 테이블)
  → 페이지는 noindex (휘발성)

[Cron 4: 월 1회 1일 06:00 KST]
검역본부 등록대행업체 + 항생제 모니터링 데이터
  → fetch + upsert

[Cron 5: 분기 1회]
펫보험 6대 손보사 공시 자료
  → reviewer 알림 발송 (자동 fetch 아님, 수동 큐)
  → 비교표 업데이트 트리거
```

**실패 처리**: 각 cron 실패 시 Slack/이메일 알림 + 재시도 3회 + 마지막 성공 데이터 유지.

### 4.5 데이터 검증·정제 규칙

- 주소 → 좌표 변환: 카카오맵 또는 네이버맵 지오코딩 API (Limo 선택)
- 시군구 정규화: 통계청 행정구역 코드 매핑
- 전화번호 정규화: E.164 형식
- 폐업 영업장: status='closed' + 페이지 410 응답 + 캐노니컬 상위로
- 데이터 없는 필드: null 명시, 페이지 템플릿에서 "정보 없음" 처리

---

## 5. 페이지 매트릭스 & URL 구조

### 5.1 URL 패턴

```
/                                       # 홈
/category/{slug}                        # 카테고리 허브 (6개)
  예: /category/care, /category/memorial

/{type}/{sigungu}/{slug}                # 영업장 상세
  예: /pet-funeral/seoul-gangnam/하늘소망펫메모리얼
  예: /vet/busan-haeundae/사랑동물병원
  예: /grooming/seoul-mapo/멍멍살롱

/{sigungu}/{type}                       # 지역 × 업종 허브
  예: /seoul-gangnam/pet-funeral
  예: /busan-haeundae/vet

/sido/{sido}                            # 시도 허브
  예: /sido/seoul

/guide/{slug}                           # 카테고리 가이드
  예: /guide/pet-loss-care
  예: /guide/puppy-vaccination-schedule

/breed/{species}/{slug}                 # 견종/묘종
  예: /breed/dog/maltese
  예: /breed/cat/korean-shorthair

/condition/{slug}                       # 질병/증상 (Phase 2+)
  예: /condition/patellar-luxation

/insurance/compare                      # 펫보험 비교
/insurance/{insurer}                    # 보험사별 상세

/tools/{slug}                           # 도구 (Phase 3+)
  예: /tools/pet-cost-calculator
  예: /tools/breed-finder

/about, /privacy, /contact, /sitemap.xml, /feed.xml
```

### 5.2 Canonical 전략

| 페이지 | indexable | canonical |
|-------|-----------|----------|
| 홈 | ✓ | self |
| 카테고리 허브 | ✓ | self |
| 시도 허브 | ✓ | self |
| 시군구 허브 | ✓ | self |
| 동 단위 페이지 | ✗ | 시군구 허브로 |
| 영업장 상세 | ✓ | self |
| 폐업 영업장 | 410 | — |
| 가이드 | ✓ | self |
| 견종/묘종 | ✓ | self |
| 질병/증상 | ✓ | self |
| 구조동물 | ✗ | noindex (휘발) |
| 펫보험 비교 | ✓ | self |
| 검색 결과 | ✗ | noindex |
| 페이지네이션 ?page=2+ | ✗ | noindex 또는 첫 페이지로 |

### 5.3 페이지 템플릿 종류 (Phase 1~3 누적)

| 템플릿 | Phase | 페이지 수 (1차) |
|-------|-------|--------------|
| 홈 | 0 | 1 |
| 카테고리 허브 | 1 | 6 |
| 시도 허브 | 1 | 17 |
| 시군구 허브 | 1 | ~250 |
| 영업장 상세 | 1~2 | ~6,700 |
| 보호센터 상세 | 2 | ~280 |
| 가이드 | 1~3 | ~1,500 |
| 견종/묘종 | 2 | ~250 |
| 질병/증상 | 3 | ~500 |
| 펫보험 비교 + 보험사별 | 3 | ~50 |
| 어필리에이트 허브 | 3 | ~50 |
| 도구 | 3+ | 5~10 |

---

## 6. 콘텐츠 거버넌스 & YMYL 정책

### 6.1 자동생성 vs 검수 큐 분리 정책

| 카테고리 | 자동 생성 | reviewer 검수 큐 | 검수 후 발행 |
|---------|---------|---------------|------------|
| 1 입양·등록 (가이드) | ✓ (1차) | 필수 | ✓ |
| 1 보호센터 페이지 | ✓ | 면제 (사실 정보) | ✓ |
| 2 사료·영양 | ✓ (1차) | 필수 | ✓ |
| 3 건강·의료 가이드 | ✓ (1차) | **필수 (high priority)** | ✓ |
| 3 동물병원 페이지 | ✓ (위치·연락처만) | 면제 | ✓ |
| 3 질병/증상 | ✓ (1차) | **필수 (high priority)** | ✓ |
| 4 펫보험 비교 | 수동 | **필수** | ✓ |
| 4 동물보호법 콘텐츠 | ✓ (1차, 법률지기 재활용) | 필수 | ✓ |
| 5 케어·라이프 가이드 | ✓ | 권장 | ✓ |
| 5 영업장 페이지 | ✓ | 면제 | ✓ |
| 6 장묘업체 페이지 | ✓ | 면제 | ✓ |
| 6 장례·추모 가이드 | ✓ (1차) | **필수 (high priority)** | ✓ |
| 6 펫로스 케어 콘텐츠 | ✓ (1차) | **필수 (high priority)** | ✓ |

**원칙**: 본문 자동 재생성/리라이팅은 **절대 금지** (Scaled Content Abuse 정책). 콘텐츠는 1회 자동 생성 → 검수 → 발행 → 정기 검토(분기/연 단위)만.

### 6.2 페이지당 unique signal 3종 (영업장 페이지 필수)

영업장 상세 페이지는 위치·연락처 외에 다음 3종 unique signal을 자동 생성하여 SCA 회피:

1. **지역 인사이트** — 해당 시군구의 동물 영업장 수, 동물등록 비율, 보호센터 거리 등 통계 (regions + businesses 테이블 조인)
2. **유형/규모 데이터** — 영업장 면적·등급(있는 경우), 등록 연도, 운영 기간, 비교 그룹 평균
3. **인근 시설 추천** — 5km 반경 내 관련 카테고리 시설 자동 큐레이션 (장묘업이면 인근 추모 공원·동물병원, 미용업이면 인근 호텔·동물병원)

### 6.3 E-E-A-T 시그널 의무 필드 (YMYL 카테고리 3, 4, 6)

```yaml
required_fields:
  - author_name: 작성자/검토자 이름
  - author_credential: 자격(예: "동물보건사", "수의학 전공 콘텐츠 에디터")
  - reviewed_at: 마지막 검토일자
  - reviewer_name: 검토자 이름
  - sources: 인용 출처 (최소 2건)
  - disclaimer: 카테고리별 면책문
  - structured_data:
    - schema.org/Article 또는 schema.org/MedicalWebPage
    - author, datePublished, dateModified, reviewedBy
```

### 6.4 카테고리별 면책문 템플릿

**카테고리 3 (의료):**
> 본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 반려동물의 건강 문제는 반드시 수의사와 상담하세요. 응급 상황 시 가까운 동물병원 또는 24시간 동물의료센터를 즉시 방문해 주세요.

**카테고리 4 (보험·법률):**
> 본 콘텐츠는 보험·법률 정보 제공 목적이며, 개별 상황에 따라 적용이 다를 수 있습니다. 구체적인 가입·청구·분쟁 시 보험사 또는 법률 전문가와 상담을 권합니다. 본 사이트는 보험 중개·법률 자문 기관이 아닙니다.

**카테고리 6 (장례·펫로스):**
> 본 콘텐츠는 정보 제공 및 슬픔 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다. 펫로스로 일상이 어렵다면 전문 심리상담사 또는 정신건강복지센터의 도움을 받으세요.

### 6.5 콘텐츠 절대 금지 항목

- 동물병원 페이지에 진료과목/진료 가능 동물 종 자동 생성 (LOCALDATA 정보 없음 — 허위 정보 생성 위험)
- 약물 용량·투여 지침 (모든 약물 정보는 "수의사 처방" 명시)
- 특정 질병의 "확실한 진단" 또는 "치료 보장" 표현
- 펫보험 가입 권유성 표현 (정보 제공 톤만, 어필리에이트 링크는 명확한 표시)
- 본문 자동 리라이팅·패러프레이징 (SCA 위반)

---

## 7. 디자인·광고 정책 분기 시스템

### 7.1 카테고리별 광고 정책 매트릭스

| 카테고리 | AdSense | 펫보험 어필 | 펫푸드 어필 | 펫서비스 어필 | 메모리얼 어필 |
|---------|---------|------------|------------|-------------|------------|
| 1 입양·등록 | ✓ | 보류 | ✓ | 권장 | ✗ |
| 2 사료·영양 | ✓ | 보류 | **★★★** | ✓ | ✗ |
| 3 건강·의료 | ✓ | **★★★** | ✓ | ✓ | ✗ |
| 4 보험·법률 | ✓ | **★★★** | ✓ | ✓ | ✗ |
| 5 케어·라이프 | ✓ | ✓ | ✓ | **★★★** | ✗ |
| **6 장례·추모** | **제한** | **차단** | **차단** | **차단** | **★★★** |

**카테고리 6 자동 처리:**
- AdSense 광고 슬롯: 자동 비활성화 또는 메모리얼 굿즈 어필리에이트로 대체
- 펫보험·펫푸드·펫서비스 CTA: DOM 레벨에서 차단
- 다른 카테고리로의 cross-link도 직접 광고/CTA 없이 "관련 정보" 톤으로만

### 7.2 어필리에이트 4종 통합 정책

| 어필리에이트 | 제휴 후보 | 카테고리 노출 |
|------------|---------|-------------|
| 펫보험 | 라이펫 / 펫인슈 / 비마이펫 | 3, 4 (선호), 1·2·5 (허용) |
| 펫푸드 | 쿠팡파트너스 (펫 카테고리), 아이허브 | 2 (선호), 1·3·5 (허용) |
| 펫서비스 (호텔·미용·훈련) | 자체 제휴 또는 플랫폼 제휴 | 5 (선호), 1·3 (허용) |
| 메모리얼 굿즈 | 자체 큐레이션 또는 제휴 (위메이드몰·아이디어스 등) | **6 전용** |

**원칙**: 어필리에이트 링크는 모두 `rel="sponsored nofollow"` + 명확한 표시("제휴 링크" 라벨). 가격·조건 정확성 분기 1회 검증.

### 7.3 카테고리별 디자인 분기 구현

```typescript
// app/[...slug]/layout.tsx (개념적)
const category = getCategoryFromPath(params.slug);

return (
  <CategoryProvider category={category}>
    <ThemeMode mode={category === 6 ? 'memorial' : 'default'}>
      <AdPolicyProvider category={category}>
        {children}
      </AdPolicyProvider>
    </ThemeMode>
  </CategoryProvider>
);
```

```typescript
// components/AdSlot.tsx (개념적)
const { category } = useCategory();
const { policy } = useAdPolicy(category, adType);

if (policy === 'block') return null;
if (policy === 'preferred' && adType === 'memorial') return <MemorialAd />;
// ... AdSense 슬롯 출력
```

---

## 8. SEO/AEO/GEO 전략

### 8.1 SEO 기본

- **사이트맵**: next-sitemap, lastmod 정확성 (cron 동기화 시점 사용)
- **IndexNow**: Naver + Bing 동시 ping (변경된 URL만, 일 1회 최대)
- **Google ping endpoint 사용 금지** (2023 deprecated)
- **robots.txt**: Yeti(Naver) 명시 허용, AI 크롤러는 정책 결정 후 (GPTBot, ClaudeBot 등 — Limo 의견 필요)
- **구조화 데이터**: schema.org 적용
  - 영업장 페이지: `LocalBusiness` 또는 `VeterinaryCare`
  - 가이드: `Article` 또는 `MedicalWebPage`(YMYL)
  - 견종: `Thing` + custom
  - FAQ: `FAQPage`

### 8.2 한국·국제 듀얼 SEO

- **Google**: title/description 최적화, Core Web Vitals, E-E-A-T 시그널, 내부 링크 구조
- **Naver**: RSS feed `/feed.xml` 생성, C-Rank/D.I.A. 알고리즘 고려한 콘텐츠 깊이, 네이버 Search Advisor 등록, Yeti bot 허용

### 8.3 AEO/GEO (LLM 인용 최적화)

- 50~150 단어 구조화 chunk (LLM 인용 친화)
- 첫 단락에 핵심 답변 우선 배치 (역피라미드)
- H2 = 직접 질문 형태
- 정의·통계 박스 (인용 가능한 fact box)
- FAQ 마크업

### 8.4 인덱싱 모니터링

- GSC API로 일 단위 인덱싱 비율 추적
- 카니발리제이션 자동 탐지 (동일 시군구 내 유사 페이지 클러스터 감지 시 알림)
- 인덱싱 비율 50% 이하 카테고리는 구조 재점검

---

## 9. Phase 0~3 실행 체크리스트

### Phase 0 — Foundation (1~2주)

**Limo 직접:**
- [ ] KIPRIS 상표권 확인
- [ ] 도메인 후이즈 + 구매 (petjigi.com / .co.kr)
- [ ] Vercel Pro 프로젝트 생성
- [ ] Turso 데이터베이스 생성 + 토큰 발급
- [ ] GitHub repo 생성 (private)
- [ ] AdSense·GA4·GSC·Naver Search Advisor 사전 등록

**Claude Code 자율 실행:**
- [ ] Next.js 15 App Router + pnpm 모노레포 골조
- [ ] Tailwind + shadcn/ui 셋업
- [ ] Drizzle ORM + Turso 연동 + 마이그레이션 시스템
- [ ] schema/businesses, shelters, contents, breeds, regions, review_queue, ad_policies, email_subscribers 스키마 적용
- [ ] 카테고리별 디자인 토큰 + 모드 분기 시스템 (default + memorial)
- [ ] AdPolicyProvider + AdSlot 컴포넌트 (정책 분기)
- [ ] next-sitemap + next-seo 셋업
- [ ] IndexNow API 클라이언트 (Naver + Bing)
- [ ] CategoryProvider + 페이지 layout 분기
- [ ] CI/CD (GitHub Actions → Vercel)
- [ ] ETL 골조 (GitHub Actions cron 5개 + 실패 알림)
- [ ] 기본 페이지 (홈, /about, /privacy, /contact)
- [ ] 시도/시군구 regions 시드 데이터 (통계청 행정구역 기준)

### Phase 1 — MVP (6~8주)

**데이터 적재:**
- [ ] LOCALDATA 동물미용업 ETL 가동 → businesses 적재
- [ ] LOCALDATA 동물위탁관리업 ETL → 적재
- [ ] LOCALDATA 동물장묘업 ETL → 적재
- [ ] 검역본부 영업장 통합 데이터셋 (15121110) 보조 sync
- [ ] 주소 → 좌표 지오코딩 일괄 처리

**페이지 구현:**
- [ ] 영업장 상세 페이지 템플릿 (3업종 공용)
  - [ ] 위치 정보 + 카카오/네이버맵 임베드
  - [ ] **unique signal 3종 자동 생성**: 지역 인사이트 / 규모·운영 데이터 / 인근 시설
  - [ ] schema.org/LocalBusiness 또는 분기
- [ ] 시군구 × 업종 허브 페이지 템플릿
- [ ] 시도 허브 페이지 템플릿
- [ ] 카테고리 5 허브 (`/category/care`)
- [ ] 카테고리 6 허브 (`/category/memorial`, Memorial 모드 적용)
- [ ] 카테고리 5·6 가이드 200건 (1차 자동 생성)

**콘텐츠 거버넌스:**
- [ ] reviewer 검수 큐 시스템 (간단한 admin UI 또는 Notion 연동)
- [ ] 카테고리 6 콘텐츠 모두 검수 큐 통과 후 발행
- [ ] 면책문 자동 삽입 (카테고리 6)
- [ ] E-E-A-T 시그널 자동 출력

**리드 자성:**
- [ ] 펫로스 케어 무료 PDF (이메일 게이트)
- [ ] 이메일 수집 후 P5 페르소나 자동 태깅

**SEO/배포:**
- [ ] sitemap.xml + feed.xml 자동 생성
- [ ] IndexNow ping 자동화 (변경 URL만)
- [ ] AdSense 신청
- [ ] GA4 + GSC 데이터 수집 시작
- [ ] AdSense Optimizer 1차 진단

**게이트 (Phase 2 진입 조건):**
- AdSense 승인 OR 일 방문 100+ (둘 중 빠른 쪽)

### Phase 2 — Expansion (8~10주)

**데이터 적재:**
- [ ] LOCALDATA 동물병원 ETL → businesses 적재 (~4,800곳)
- [ ] 전국동물보호센터정보표준데이터 (15025454) REST API → shelters 적재
- [ ] APMS 구조동물 동기화 (페이지 noindex)
- [ ] 검역본부 등록대행업체 동기화
- [ ] 견종/묘종 시드 데이터 (한국켄넬클럽 등 출처 큐레이션)

**페이지 구현:**
- [ ] 동물병원 상세 페이지 (위치·연락처·기본 정보만)
- [ ] **⛔ 진료과목/진료 동물 종 절대 자동 생성 X**
- [ ] 보호센터 상세 페이지
- [ ] 구조동물 페이지 (noindex)
- [ ] 견종/묘종 페이지 (~250건, 자동 생성 + 검수)
- [ ] 카테고리 1·3 허브
- [ ] 카테고리 1·3 가이드 300건 추가 (1차 자동 생성)

**거버넌스:**
- [ ] 건강 카테고리 검수 큐 가동 (high priority)
- [ ] 의료 면책문 카테고리 3 전체 적용
- [ ] reviewedBy schema.org 자동 출력

**리드 자성:**
- [ ] 초보 보호자 가이드 무료 PDF
- [ ] 노령견 케어 가이드 무료 PDF

**SEO:**
- [ ] 카니발리제이션 모니터링 + canonical 재정비
- [ ] GSC 인덱싱 비율 추적 자동화

**게이트:**
- YMYL 거버넌스 안정 운영 (검수 큐 적체 없음)
- 일 방문 1,000+

### Phase 3 — Full Scale (10~12주)

**콘텐츠 + 어필리에이트:**
- [ ] 사료·영양 콘텐츠 매트릭스 (견종/묘종 × 사료 타입) ~2,000건
- [ ] 펫보험 비교 인프라 (6대 손보사 공시 자료 분기 수동 수집)
- [ ] 동물보호법 콘텐츠 (법률지기 데이터 일부 재활용) ~500건
- [ ] 어필리에이트 허브 페이지 (4종)
- [ ] 어필리에이트 트래킹 + 카테고리별 화이트리스트 적용

**도구:**
- [ ] 펫 평생 비용 계산기
- [ ] 펫보험 추천 미니 위저드

**이메일 자동화:**
- [ ] P2·P4 페르소나별 시리즈 발송 자동화
- [ ] 발송 도구 (Resend / SendGrid / 자체)

**SEO/광고 최적화:**
- [ ] 광고 위치 A/B 테스트
- [ ] AdSense Optimizer 정기 진단 (분기)
- [ ] AEO/GEO 콘텐츠 구조 적용 (기존 콘텐츠 50~150 단어 chunk 리팩토링)

**게이트:**
- 일 방문 5,000+
- 광고 + 어필리에이트 수익 비율 검증

### Phase 4 — Scale & Diversify (12개월+)

- 견종 × 질병 매트릭스 (콘텐츠 거버넌스 강화 필수)
- 동물병원 가격 후기 사용자 제출형 + 모더레이션
- 메모리얼 굿즈 자체 큐레이션 마켓플레이스
- 모바일 PWA 또는 앱
- 다국어 (Phase 4+ 영문 검토)

---

## 10. 위험 관리 & 다중 페르소나 리뷰 결과

### 10.1 5인 전문가 리뷰 핵심 요약

| 전문가 | 핵심 우려 | 반영 위치 |
|-------|---------|---------|
| SEO 전략가 (Tina) | 카니발리제이션, thin content, SCA | §5.2 canonical, §6.2 unique signal |
| AdSense 정책 전문가 (Park) | YMYL E-E-A-T, SCA | §6.3 E-E-A-T 필드 의무화 |
| 수의사 (Dr. Kim) | 의료 허위정보 위험 | §6.5 절대 금지 항목 |
| UX 디자이너 (Lee) | 카테고리 6 톤·광고 충돌 | §7 분기 시스템 |
| 비즈 전략가 (Choi) | 단일 수익 의존 위험 | §7.2 어필리에이트 4종 + 이메일 리스트 |

### 10.2 7대 위험 매트릭스

| 위험 | 심각도 | 대응 Phase | 대응 위치 |
|------|-------|----------|---------|
| 자동생성 허위 의료 정보 | ⛔ ★★★★★ | Phase 0 거버넌스 + Phase 2 운영 | §6.5 |
| 장례 카테고리 광고 부적합 | ⛔ ★★★★★ | Phase 0 분기 시스템 | §7 |
| YMYL E-E-A-T 부재 | ★★★★★ | Phase 0~ 의무화 | §6.3 |
| Scaled Content Abuse | ★★★★ | Phase 1~ unique signal 3종 | §6.2 |
| 카니발리제이션 | ★★★ | Phase 1~ canonical | §5.2 |
| 수익 단일 의존 | ★★★ | Phase 3 다각화 | §7.2 |
| 카테고리 톤 충돌 | ★★★ | Phase 0 시스템 | §7 |

### 10.3 MVP 진입 전 필수 5대 조치 (재확인)

1. YMYL 콘텐츠 거버넌스 정식 도입 (카테고리 3·4·6 검수 큐 의무)
2. 페이지당 unique signal 3종 강제 (영업장 매트릭스)
3. 카테고리별 디자인·광고 분기 시스템 (카테고리 6 분리)
4. canonical 전략 (시군구까지만 indexable)
5. 수익 다각화 + 이메일 리스트 (Phase 3 본격화, Phase 0부터 인프라)

---

## 11. 부록 A — 사용자 여정 매핑

| 페르소나 | 진입 키워드 (예시) | 첫 페이지 | 2~3차 페이지 | 전환 목표 |
|---------|----------------|---------|-----------|---------|
| P1 예비 입양자 | "강아지 입양 비용", "포메라니안 특징" | /breed/dog/pomeranian | /guide/adoption-checklist, /category/adoption | 이메일 게이트 (초보 가이드 PDF) |
| P2 초보 보호자 | "강아지 첫 사료", "동물등록제" | /guide/puppy-food-guide | /breed/..., /category/health | 이메일 게이트 + AdSense |
| P3 일상 보호자 | "강아지 슬개골 탈구", "펫보험 비교" | /condition/patellar-luxation, /insurance/compare | /vet/{지역}/..., 어필리에이트 | 펫보험 어필리에이트 |
| P4 시니어 보호자 | "노령견 사료", "강아지 임종 준비" | /guide/senior-dog-food | /category/memorial 진입 (서서히) | 이메일 게이트 (노령견 가이드) |
| P5 펫로스 경험자 | "강아지 장례 절차", "펫로스 극복" | /guide/pet-loss-care | /pet-funeral/{지역}/... | 메모리얼 굿즈 어필리에이트 |

---

## 12. 부록 B — 결정 사항 (v1.1 확정)

| # | 항목 | 확정 | 비고 |
|---|------|------|------|
| 1 | 지오코딩 API | **카카오맵 REST API** | 일 30만 건 무료, 한국 주소 정밀도 우수 |
| 2 | 이메일 발송 도구 | **Resend** | Next.js·Vercel 정합, React Email 템플릿, 월 3,000건 무료 |
| 3 | 펫보험 어필리에이트 (1차) | **비마이펫 + 라이펫 듀얼** | 비마이펫=초반 안전, 라이펫=트래픽 안착 후 단가 ↑. ⚠️ 실제 제휴 가부는 일 1,000+ 도달 후 직접 컨택 |
| 4 | 메모리얼 굿즈 | **쿠팡파트너스 + 자체 큐레이션 하이브리드** | 카테고리 6 톤 유지: 배너 X, 텍스트 링크 + 큐레이션 카드만 |
| 5 | AI 크롤러 정책 | **전체 허용** | GPTBot·ClaudeBot·PerplexityBot·GoogleOther 명시 허용. AEO/GEO 인용 트래픽 우선 |
| 6 | 견종·묘종 시드 | **위키피디아 + Claude 생성 + reviewer 큐 하이브리드** | CC BY-SA 출처 footer 명시 |
| 7 | 펫호텔·미용 예약 제휴 | **Phase 3 진입 + 일 1,000+ 확보 후 직접 컨택** | 후보: 와요·펫플래닛·도그메이트·펫홀 |
| 8 | 상표권 출원 시점 | **Phase 0 즉시 출원** | 분류: 41류 + 42류 + 35류. 비용 60~80만원, 등록 14~18개월 |

### Limo 직접 확정 잔여 항목 (Phase 0 진입 전)

- [ ] KIPRIS 상표권 검색 (kipris.or.kr → "펫지기")
- [ ] 도메인 후이즈 + 구매 (petjigi.com / .co.kr / .kr)
- [ ] 시리즈 일관성 확인: 법률지기·금리지기에서 위 #1·#2·#5 다른 선택을 했다면 통일 검토

---

## 13. 부록 C — 시리즈 일관성 체크리스트

법률지기·금리지기·닥터맵과의 일관성:

- [x] "-지기" 시리즈 네이밍
- [x] Next.js 15 + Vercel Pro + Turso + Drizzle 동일 스택
- [x] pSEO 매트릭스 패턴 + 공공데이터 ETL
- [x] AdSense + 어필리에이트 듀얼 수익화
- [x] Naver + Google 듀얼 SEO + IndexNow
- [x] AdSense Optimizer 스킬 연동
- [x] Universal CLAUDE.md 적용 (Next.js Claude Code 가이드)
- [ ] 시리즈 푸터 (다른 지기 사이트 cross-link) — Phase 2+ 검토

---

---

## 14. 부록 D — 운영비·손익분기 시뮬레이션

### 14.1 월간 운영비 추정

| 항목 | Phase 0~1 (월) | Phase 2 (월) | Phase 3 (월) |
|------|--------------|------------|-------------|
| Vercel Pro | $20 | $20 | $20~50 (variable) |
| Turso | $24 | $24~50 | $50~100 |
| Resend | $0 (무료) | $20 | $20~50 |
| 카카오맵 | $0 (무료) | $0 | $0 |
| 도메인 (월 환산) | $1.5 | $1.5 | $1.5 |
| AI 콘텐츠 생성 (Gemini/Claude) | $50~100 | $100~200 | $50 (장기 정기 검토만) |
| 모니터링·기타 도구 | $20 | $30 | $50 |
| **합계 (USD)** | **$115~165** | **$195~325** | **$190~320** |
| **합계 (KRW 환산)** | **₩155K~225K** | **₩265K~440K** | **₩260K~435K** |

### 14.2 매출 추정 (한국 펫 카테고리 RPM 가정)

| 가정 | 값 |
|------|---|
| AdSense RPM (펫 카테고리) | ₩3,000~6,000 / 1K PV |
| 페이지당 평균 광고 슬롯 | 2~3개 |
| 어필리에이트 전환율 (펫보험) | 트래픽 대비 0.1~0.3% |
| 어필리에이트 평균 수수료 | ₩5,000~30,000/건 |
| 쿠팡파트너스 수수료율 | 1~5% |

### 14.3 손익분기 시뮬레이션

| Phase | 일 방문 (목표) | 월 AdSense | 월 어필리에이트 | 월 매출 | 월 비용 | 월 순익 |
|-------|--------------|-----------|--------------|--------|--------|--------|
| 1 종료 | 500 | ₩60K | ₩30K | ₩90K | ₩200K | -₩110K |
| 2 종료 | 3,000 | ₩400K | ₩200K | ₩600K | ₩400K | +₩200K |
| 3 종료 | 7,000 | ₩900K | ₩500K | ₩1.4M | ₩400K | +₩1.0M |
| 4 (12개월차) | 20,000 | ₩2.4M | ₩1.5M | ₩3.9M | ₩600K | +₩3.3M |

**손익분기 예상**: Phase 2 종료 시점 (약 4~5개월차)
**ROI 회수**: 도메인·상표 + AI 생성 비용 초기 투자 약 ₩300~500K → Phase 2 종료 시 회수

### 14.4 KPI 게이트 (Phase 진입 의사결정)

| 게이트 | 측정 시점 | 통과 조건 | 미통과 시 |
|--------|---------|---------|---------|
| AdSense 승인 | Phase 1 종료 | 승인 완료 | Phase 2 보류, YMYL·E-E-A-T 재점검 |
| 광고 RPM | Phase 2 6주차 | ₩3,000+/1K PV | 광고 위치 A/B, 콘텐츠 품질 점검 |
| 어필리에이트 전환율 | Phase 3 4주차 | 0.1%+ | 어필리에이트 다각화 재검토 |
| 일 방문 | Phase 3 종료 | 5,000+ | 콘텐츠 추가 + 시리즈 cross-link 강화 |

---

## 15. 부록 E — 콘텐츠 자동 생성 파이프라인

### 15.1 모델 분기 매트릭스

| 콘텐츠 유형 | 1차 생성 | 정제 | 검수 | 비용 (1회) |
|-----------|---------|------|------|---------|
| 영업장 unique signal (지역 인사이트 등) | Gemini Flash | - | 자동 quality check | $9 (9,000곳) |
| 카테고리 1·2·5 가이드 | Gemini Flash | Gemini Pro 정제 | 권장 검수 | $75 (1,500건) |
| 카테고리 3 YMYL 가이드 | Gemini Pro 또는 Claude | - | **필수 검수** | $30 (500건) |
| 카테고리 4·6 YMYL | Claude (정확성) | - | **필수 검수** | $30 (500건) |
| 견종·묘종 콘텐츠 | Gemini Pro | - | 권장 검수 | $12.5 (250건) |
| **총 1회 생성** | | | | **~$160** |
| 정기 검토 (분기) | Gemini Flash | - | 변경 시만 검수 | $30/분기 |

### 15.2 파이프라인 단계

```
[Step 1: Generate]
  → 카테고리별 모델 분기 호출
  → 프롬프트에 카테고리 톤·금지어·면책문 가이드 주입
  → JSON 구조화 출력

[Step 2: Auto-Scan]
  → 약사법 금지어 정규식 매칭 (legal-content-guide §1)
  → 매칭 발견 시 검수 큐 강제 라우팅
  → unique signal 완비도 점수 측정

[Step 3: Quality Gate]
  → E-E-A-T 시그널 자동 체크 (저자·출처·검토일자 등)
  → 미충족 시 검수 큐 + 보강 요청

[Step 4: Reviewer Queue (YMYL 또는 매칭 발견 시)]
  → review_queue 테이블에 priority 부여
  → reviewer가 Notion 또는 admin UI로 처리
  → approve / reject / edit

[Step 5: Publish]
  → status='published'로 변경
  → 사이트맵 추가 + IndexNow ping
  → schema.org 구조화 데이터 자동 출력
```

### 15.3 프롬프트 표준 템플릿 (요약)

```
시스템: 너는 펫지기의 콘텐츠 작성자다. 카테고리는 {category}, 톤은 {tone}.

규칙:
1. 약사법·동물의료법 금지어 사용 금지 (별도 가이드 §1 참조)
2. YMYL 카테고리는 면책문·인용 출처·검토일자 필수 필드
3. 50~150 단어 chunk로 구조화 (AI 검색 인용 최적화)
4. H2 = 직접 질문 형태
5. 첫 단락 = 핵심 답변 (역피라미드)

출력 형식: JSON
{
  "title": "...",
  "metaTitle": "...",
  "metaDescription": "...",
  "body": "MDX 본문",
  "sources": ["..."],
  "disclaimer": "...",
  "uniqueSignals": ["...", "...", "..."]
}
```

### 15.4 reviewer 큐 운영 (인간 검수 효율)

- YMYL 검수 큐 처리량 목표: **일 50건** (한 사람 기준)
- Phase 1 YMYL ~200건 → 4일 처리
- Phase 2 YMYL ~500건 → 10일 처리
- Phase 3 YMYL ~500건 추가 → 10일 처리
- **검수 인원**: Limo 직접 또는 외주 검수자 (수의학 콘텐츠 에디터)

---

## 16. 부록 F — 경쟁사 분석 매트릭스

### 16.1 카테고리별 경쟁사·진입 전략

| 카테고리 | 1순위 경쟁 | 2순위 경쟁 | 우리 진입 전략 |
|---------|----------|-----------|-------------|
| 1 입양·등록 | 동물보호관리시스템 (공식) | 비마이펫 | Long-tail: 보호소 비교, 입양 절차, 동물등록 후기 |
| 2 사료·영양 | 펫프렌즈 (e-커머스) | 비마이펫 | 견종·증상별 long-tail (예: "퍼피 골든리트리버 사료 단계별") |
| 3 건강·의료 | 펫닥 | 동물병원 블로그 | Long-tail: "○○ 선택 방법", "24시 응급 동물병원", 증상 → 진료 흐름 |
| 4 보험·법률 | 보맵·굿리치·토스 펫보험 | 보험사 공식 | 비교 도구 직접 경쟁 회피. 콘텐츠 SEO 중심 (가입 절차, 보장 범위, 청구 가이드) + 비교는 어필리에이트 임베드 |
| 5 케어·라이프 | 알파독 (훈련) | 비마이펫 | 지역·서비스 매트릭스 (Naver Place 우회 long-tail) |
| 6 장례·추모 | 비마이펫(펫로스 콘텐츠), 장묘 업체 자체 | 별나라·페트나라 | 펫로스 케어 + 지역·서비스 통합 + 가격대 비교 |

### 16.2 키워드 우회 전략 (직접 경쟁 회피)

| 직접 경쟁 키워드 | 우회 long-tail 키워드 |
|--------------|------------------|
| "강아지 슬개골 탈구 치료법" | "강아지 슬개골 탈구 증상", "강아지 슬개골 탈구 등급별 차이" |
| "강남구 동물병원" | "강남구 24시 동물병원", "강남구 응급 동물병원", "강남구 동물병원 선택 방법" |
| "펫보험 비교" | "펫보험 가입 전 확인 사항", "펫보험 청구 절차", "○○보험사 펫보험 특징" |
| "포메라니안 사료" | "포메라니안 단계별 식단 가이드", "포메라니안 알러지 대응 사료" |
| "강아지 화장 비용" | "강아지 장례 절차별 비용 범위", "지역별 강아지 화장 서비스 비교" |

### 16.3 우리 차별화 핵심 자산

1. **pSEO 매트릭스 깊이**: 지역 × 업종 × 카테고리 통합 = ~35K~50K 페이지 (경쟁 사이트 평균 1K~10K)
2. **공공데이터 신뢰성**: 정부 데이터 기반 → 정보 정확도 + E-E-A-T 강력
3. **시리즈 효과**: 닥터맵·법률지기·금리지기와 cross-link로 도메인 권위 빠르게 축적
4. **카테고리 통합**: 보호자 라이프사이클 전체 커버 → P3 일상 보호자 LTV 최대화
5. **카테고리 6 분리 시스템**: 윤리적 광고 정책 + 톤 분리 → 신뢰감 (경쟁사 일반 미적용)

### 16.4 시리즈 cross-link 전략 (Phase 2+)

- 법률지기와 cross: 동물보호법, 반려동물 분쟁 → 법률지기 상세 페이지 링크
- 닥터맵과 cross: 동물병원 인근 인간 의료 시설 → 닥터맵 링크
- 금리지기와 cross: 펫보험 → 일반 보험 비교 → 금리지기 링크
- 시리즈 푸터: 모든 페이지 하단에 다른 지기 사이트 명시 (도메인 권위 + 트래픽 흐름)

---

## 17. 부록 G — Round 2 다중 페르소나 리뷰 결과 (추가 위험)

**Round 1 5인 + Round 2 5인 = 총 10인 리뷰 통과**

### 17.1 Round 2 신규 위험 매트릭스

| 위험 | 심각도 | 발견자 | 대응 위치 |
|------|-------|------|---------|
| 어필리에이트 표시 누락 (공정거래법) | ⛔ ★★★★★ | Yoo (법무) | legal-content-guide §2 |
| 약사법·동물의료법 콘텐츠 표현 | ★★★★★ | Yoo (법무) | legal-content-guide §1 |
| ETL stale 검출 부재 | ★★★★ | Yun (데이터엔지) | spec §4.4 (보강 필요) |
| LOCALDATA diff fuzzy match | ★★★★ | Yun | spec §4.5 (보강 필요) |
| Naver Place 우위 영역 우회 | ★★★★ | Bae·Sim | spec §16.2 (본 부록) |
| 운영비·손익분기 미산정 | ★★★★ | Han | spec §14 (본 부록) |
| 약관·동의 흐름 미명시 | ★★★★ | Yoo | legal-content-guide §3·§4 |
| Core Web Vitals 목표 | ★★★ | Bae | CLAUDE.md §9 (보강 필요) |
| 카카오톡 공유 메타 | ★★★ | Bae | CLAUDE.md §9 (보강 필요) |
| 콘텐츠 생성 파이프라인 명세 | ★★★ | Han | spec §15 (본 부록) |
| 경쟁사 우회 전략 명문화 | ★★★ | Sim | spec §16 (본 부록) |
| 캐시·revalidate 페이지별 정책 | ★★★ | Yun | CLAUDE.md §3 (보강 필요) |

### 17.2 Round 1 + Round 2 종합 — MVP 진입 전 7대 필수 조치

원래 5대에서 7대로 확장:

1. YMYL 콘텐츠 거버넌스 (Round 1)
2. 페이지당 unique signal 3종 (Round 1)
3. 카테고리별 디자인·광고 분기 (Round 1)
4. canonical 전략 (Round 1)
5. 수익 다각화 + 이메일 리스트 (Round 1)
6. **약사법 금지어 자동 스캔 + 어필리에이트 표시 의무** (Round 2)
7. **ETL 모니터링 + 약관·동의 흐름 표준** (Round 2)

---

**문서 끝. v1.2 - 2026-05-17 (§14~17 Round 2 리뷰 결과 반영)**
