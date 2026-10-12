# petjigi.kr 애드센스 기술·정책·UX 점검 — 2026-10-12

브랜치 `fix/adsense-tech-audit-20261012`(미push·미배포). 운영 DB·Vercel·AdSense·GSC·DNS는 변경하지 않았다. 점수·승인 확률은 만들지 않는다.

## 기준선 (운영 사이트, 읽기 전용 GET)
| 항목 | 결과 |
|---|---|
| `http://petjigi.kr/` | 308 → `https://petjigi.kr/` |
| `http://www.petjigi.kr/` | 308 → `https://www.petjigi.kr/` → **307** → `https://petjigi.kr/` (2단계) |
| `https://www.petjigi.kr/ads.txt` | **307** → `https://petjigi.kr/ads.txt` |
| `?utm=1` 쿼리 | 200, canonical은 쿼리 없는 URL |
| robots.txt / ads.txt / sitemap.xml / sitemap-0.xml / sitemap-content.xml | 모두 200. robots는 `*`·Mediapartners-Google 허용, `/api/`·`/admin/`만 제한 |
| 없는 경로 `/no-such-page`, 잘못된 지역 `/seoul-gangnam/vet` | 404 (soft 404 아님) |
| about / contact / privacy / terms / advertising / disclosure | 200, 푸터 링크 유지 |
| 보안 헤더 | HSTS(preload)·nosniff·X-Frame-Options DENY·Referrer-Policy·Permissions-Policy 있음, CSP 없음(새로 도입하지 않음) |
| sitemap 전수(1,016 URL) | 상태·canonical·noindex·title·description·H1 문제 **0건**, 중복 title **0**, 중복 description **0**, title 브랜드 중복 **0**, title 60자 초과 0, description 120자 초과 0 |
| `audit:internal-links` | 실패 0 (시드 864 · 인벤토리 1,502, 예약 글끼리 링크 7) |
| `audit:adsense:readiness` | PASS 13 · BLOCKED 0 · UNKNOWN 11 |
| `pnpm test` | 523/523 |

## 재현 결과: 의심 후보 4건
| 후보 | 재현 | 결론 |
|---|---|---|
| title 브랜드 중복(`강남구 동물병원 \| 펫지기 \| 펫지기`) | 운영 1,016 URL 전수에서 0건. 기존 테스트 "child metadata titles do not duplicate the root site-name template" 존재 | 미재현. 재발 방지용 검사만 추가 |
| 운영 주체 `펫지기` vs `(주)펫지기` | 코드·문서에 `(주)펫지기` 표기 없음. 기존 테스트 "unverified identity claims remain operator decisions" 존재 | 미재현. 법인 여부는 확인 불가 → 수정 안 함 |
| 제휴 안내 불일치 | 현재 문구는 `lib/revenue-disclosure.ts` 한 곳에서 "제휴 링크 없음"으로 통일. 단 어디에서도 쓰이지 않는 `components/layout/affiliate-notice.tsx`가 "이 페이지에는 제휴 링크가 포함되어 있습니다"를 담고 있었음 | 재발 위험 제거를 위해 미사용 컴포넌트 삭제 |
| 지역·시설 빈 목록·soft 404 | 잘못된 지역 404, 0건 목록은 noindex·sitemap 제외(`lib/seo/indexability-policy.ts`, `next-sitemap.config.js`), 전수 audit 통과 | 미재현 |

## 수정 내역
| 우선순위 | 문제 | 수정 | 파일 | 검증 |
|---|---|---|---|---|
| P2 | 감사 도구가 중복 title·description, title 브랜드 중복을 보고하지 않음 | `audit-live-site.mjs`에 title 브랜드 중복 검사(실패 처리)와 중복 title·description 묶음 보고 추가. `--base=http://localhost:3000`으로 로컬 production 빌드에도 사용 가능 | `scripts/audit-live-site.mjs` | 정규식 단위 확인, 운영 1,016 URL 재실행 결과 위 표와 일치 |
| P1 | 사용처 없는 제휴 고지 컴포넌트가 현재 사실("제휴 링크 없음")과 반대되는 문구를 포함 | 삭제 | `components/layout/affiliate-notice.tsx` | 전체 grep 참조 0, `pnpm test` |

## 코드로 해결할 수 없는 항목 (수동 확인 필요)
1. **문의 메일 수신 불가 가능성(P0)**: `petjigi.kr`에 MX·TXT(SPF)·`_dmarc` 레코드가 조회되지 않는다(8.8.8.8 기준). 문의 페이지와 구조화 데이터의 `cs@petjigi.kr`로 보낸 메일이 반송될 수 있다. 메일 서비스 선택과 DNS 등록은 운영자 결정.
2. **www 리디렉션 307 → 308**: Vercel 도메인 설정 `www.petjigi.kr`의 `redirectStatusCode`가 307(조회 확인). 영구 이전이므로 308이 적합하고, `http://www` → `https://www` → 대표 도메인으로 2단계다. Vercel 대시보드(Domains)에서 변경 필요. `www/ads.txt`도 같은 설정의 영향.
3. 실제 법인명·사업자 정보, 제휴 링크 운영 여부, AdSense 사이트 연결·게시자 ID, Search Console 색인, 개인정보처리방침 법률 검토, Google 인증 CMP 필요 여부 → `docs/adsense-account-manual-checklist.md`의 UNKNOWN 11건.
4. 우수 30건 외 비공개 전환(PR #68) 이후 `public/sitemap-0.xml`의 `/condition` 항목 복원 시점.

## 실행하지 않은 것
push, 병합, 배포, 운영 DB apply, DNS·Vercel·AdSense·GSC 설정 변경, 메일 발송, Lighthouse(로컬 브라우저 측정은 이번 세션 범위 밖 — 기존 e2e의 가로 넘침·콘솔 오류 검사로 대체), 문의 폼 실제 제출.

## 배포 전 체크리스트
1. PR #68(30건만 공개) 병합·배포 → 운영 `unpublish-contents.ts` dry-run → 승인 후 `--apply`
2. 메일 DNS(MX·SPF·DMARC) 등록 또는 문의 주소 변경 결정
3. Vercel 도메인 www 리디렉션을 308로 변경
4. 배포 후 `node scripts/audit-live-site.mjs --limit=2000` 재실행(중복·브랜드 중복 0 확인)
5. GSC 사이트맵 재제출
