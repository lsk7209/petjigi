# CLAUDE.md — 펫지기 (PetJigi) 프로젝트 가이드

> **너에게 (Claude Code)**: 이 파일은 항상 컨텍스트에 있어야 한다. 작업 시작 전 이 파일과 `docs/petjigi-pseo-spec.md`를 먼저 읽어라. 의심스러우면 spec을 다시 확인하고, 본 파일과 spec이 충돌하면 spec이 우선이다.

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
2. ⛔ **본문 자동 리라이팅·패러프레이징 금지** (Google Scaled Content Abuse)
3. ⛔ **카테고리 6(장례·추모)에 펫보험·펫푸드·펫서비스 광고/CTA 노출 금지** — DOM 레벨 차단
4. ⛔ **약물 용량·투여 지침, "확실한 진단"·"치료 보장" 표현 금지**
5. ⛔ **YMYL 카테고리(3·4·6) 콘텐츠를 reviewer 검수 큐 우회 발행 금지**
6. ⛔ **Google 사이트맵 ping endpoint 사용 금지** — IndexNow(Naver+Bing)만
7. ⛔ **약사법·동물의료법 금지어 사용 금지** — 정규식 자동 스캔 필수
8. ⛔ **어필리에이트 표시 의무 누락 금지** — 상단+링크근처+푸터 3중 표시, `rel="sponsored nofollow"`

---

## 3. 기술 스택 (확정)

| 레이어 | 기술 |
|--------|------|
| Framework | Next.js 16 (App Router, Server Components) |
| Runtime | Vercel Pro |
| DB | Turso (libSQL) |
| ORM | Drizzle |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Forms | react-hook-form + zod |
| 패키지 매니저 | **pnpm** |
| Cron | GitHub Actions + Vercel Cron |
| 지오코딩 | **카카오맵 REST API** |
| 이메일 발송 | **Resend** + React Email |
| Analytics | GSC + GA4 + AdSense + Naver Search Advisor |
| Sitemap/SEO | next-sitemap + next-seo |
| IndexNow | Naver + Bing 동시 ping |

### 패키지 설치 명령
```bash
pnpm add <package>
pnpm add -D <package>
pnpm dlx <command>
```

### 캐시 정책 (Turso row reads 한도 보존)
- 영업장 상세: `revalidate: 86400`
- 시군구·시도 허브: `revalidate: 86400`
- 가이드 콘텐츠: `revalidate: 604800`
- 견종·묘종: `revalidate: 604800`
- 홈·카테고리 허브: `revalidate: 3600`
- 구조동물 (noindex): SSR

---

## 4. 카테고리 시스템

| ID | 이름 | 톤 | 디자인 모드 | 광고 정책 | YMYL |
|----|------|----|-----------|----------|------|
| 1 | 입양·등록 | 따뜻하게 | default | 일반 | X |
| 2 | 사료·영양 | 정확하게 | default | 펫푸드 ★★★ | X |
| 3 | 건강·의료 | 정확·꼼꼼 | default | 펫보험 ★★★ | **✓** |
| 4 | 보험·법률 | 꼼꼼하게 | default | 펫보험 ★★★ | **✓** |
| 5 | 케어·라이프 | 따뜻하게 | default | 펫서비스 ★★★ | X |
| 6 | 장례·추모 | 조용히 | **memorial** | 메모리얼만 | **✓** |

---

## 5. 데이터 소스

| ID | 데이터셋 | Cron |
|----|---------|------|
| 15121110 | 검역본부_반려동물 영업장 (7업종) | 일 03:00 |
| 15045050 | 행정안전부_동물병원 | 일 03:30 |
| 15025454 | 전국동물보호센터 | 주 일요일 04:00 |
| 15098931 | APMS 구조동물 (noindex) | 일 05:00 |
| LOCALDATA | 동물 18종 인허가 | 일 |
| 검역본부 | 반려동물 등록대행업체 | 월 |

---

## 6. Drizzle 스키마 (8개 테이블)
1. `businesses` — 영업장 통합
2. `shelters` — 보호센터
3. `contents` — 가이드·견종·질병
4. `breeds` — 견종·묘종
5. `regions` — 시도/시군구
6. `review_queue` — YMYL 검수 큐
7. `ad_policies` — 카테고리 × 광고 타입
8. `email_subscribers` — 이메일 리스트

---

## 7. URL 구조
```
/                                  # 홈
/category/{slug}                   # 카테고리 허브
/{type}/{sigungu}/{slug}           # 영업장 상세
/{sigungu}/{type}                  # 지역 × 업종 허브
/sido/{sido}                       # 시도 허브
/guide/{slug}                      # 가이드
/breed/{species}/{slug}            # 견종/묘종
/condition/{slug}                  # 질병/증상 (Phase 2+)
/insurance/compare, /insurance/{insurer}
/tools/{slug}                      # 도구 (Phase 3+)
```

---

## 8. 의심스러우면

1. 콘텐츠 자동 생성 → §2 절대 금기 확인 → 의심되면 reviewer 큐
2. 광고/CTA 노출 → 카테고리 광고 매트릭스 확인 → 의심되면 노출 안 함
3. URL 구조 → §6 확인 → noindex가 안전한 기본값
4. 약사법 표현 → `docs/petjigi-legal-content-guide.md` §1 확인

---

**마지막 업데이트**: 2026-05-18 v1.2 (Phase 0 개발 시작)
