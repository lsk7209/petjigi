# 애드센스 준비 상태 (코드 기준)

PASS 13 · BLOCKED 0 · UNKNOWN 11

UNKNOWN은 코드로 확인할 수 없는 외부 상태이며 재심사 준비 완료를 뜻하지 않습니다.

| 상태 | 항목 | 근거 |
|---|---|---|
| PASS | ads.txt 존재 및 게시자 ID 일치 | ads.txt=3050601904412736 layout=3050601904412736 |
| PASS | head 게시자 ID가 production 런타임에서만 사용됨 | app/layout.tsx 런타임 게이트 |
| PASS | 필수 정책 페이지 존재 | about, privacy, advertising, disclosure, contact, terms |
| PASS | 푸터에서 정책 페이지 접근 가능 | 모두 연결 |
| PASS | noindex 페이지는 sitemap·광고·JSON-LD 제외 | 9개 조합 검사 |
| PASS | JSON-LD canonical·날짜·자기권위 정합 | localBusiness canonicalUrl, Article 날짜 헬퍼, 자기권위 제거 |
| PASS | GA4/AdSense 전에 Consent Mode 기본 denied | 4개 항목 denied, 로드 순서, 개인화 신호 제거 |
| PASS | preview/local에서 실제 광고·GA4 차단 | 런타임+호스트 게이트 |
| PASS | 0건·오류 페이지 광고 차단 | 목록 eligibility 마커 + 404 마커 |
| PASS | 일반 콘텐츠의 Indexing API 호출 경로 없음 | 호출처 없음 |
| PASS | 로컬 시드·코드 내부 링크 오류 0건 | 실패 0건 |
| PASS | claim manifest 정합(verified 근거·stale·removed) | manifest 이슈 0, 위험 문구 0 |
| UNKNOWN | YMYL 주장 원문 대조·전문가 검토 | 미검증 위험 주장 260건(untracked/needs_review) — 별도 검토 필요 |
| PASS | 뉴스레터 구독·해지 fixture 테스트 존재 | tests/newsletter-flow.test.ts |
| UNKNOWN | AdSense 사이트 등록·심사 상태 | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
| UNKNOWN | 거절 또는 주의 사유 원문 | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
| UNKNOWN | Policy Center 상태 | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
| UNKNOWN | Google 인증 CMP 계정 활성화 | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
| UNKNOWN | ads.txt 계정 인식 상태 | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
| UNKNOWN | cs@petjigi.kr 실제 수신 가능 여부 | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
| UNKNOWN | Resend 운영 발송 성공 | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
| UNKNOWN | 의학·법률·보험 전문가 검토 | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
| UNKNOWN | 실제 Google URL 색인 상태 | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
| UNKNOWN | 운영 sitemap HTTP/canonical/noindex 정합 (pnpm audit:live 실행 필요) | 코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조 |
