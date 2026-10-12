# 애드센스 계정·외부 상태 수동 확인 체크리스트 (2026-10-12)

코드로 확인할 수 없는 항목입니다. **모든 항목은 UNKNOWN이며, 확인 전에는 PASS로 표시하지 않습니다.** 이 문서의 작업은 사람이 직접 수행합니다(자동화·설정 변경 금지 범위).

| 항목 | 상태 | 확인 방법 | 비고 |
|---|---|---|---|
| AdSense 사이트 심사 상태 | UNKNOWN (관측: GETTING_READY) | AdSense > 사이트 | 2026-10-12 읽기 전용 API(`adsense.readonly`)에서 `petjigi.kr` state=GETTING_READY. 승인 완료(READY)가 아니며 거절 사유는 API로 얻지 못함 |
| 거절 또는 주의 사유 원문 | UNKNOWN | AdSense 알림·이메일 원문 | 원문 없이 사유를 추정하지 않음 |
| Google 인증 CMP 활성화 여부 | UNKNOWN | AdSense > 개인정보 보호 및 메시지 | 코드는 Consent Mode v2 기본 denied만 설정. 자체 배너를 "인증 CMP"로 표기하지 않음 |
| EEA·영국·스위스 메시지 설정 | UNKNOWN | 동일 | 동의 결과를 `updateGoogleConsent`(lib/privacy/google-consent.ts)로 전달하는 연결이 필요 |
| 개인 맞춤/비개인 맞춤 광고 설정 | UNKNOWN | AdSense > 개인정보 보호 및 메시지 | /advertising·/privacy 문구와 일치시킬 것 |
| Policy Center 상태 | UNKNOWN | AdSense > 정책 센터 | API policyIssues 응답 비어 있음. 계정 경고: SEVERE `ads-txt-issues`(어느 사이트인지 API로 불명), WARNING `ua-conflict-policy-update` |
| ads.txt 계정 인식 상태 | UNKNOWN | AdSense > 사이트 > ads.txt | 파일은 `public/ads.txt`, 운영 `https://petjigi.kr/ads.txt` 200에 게시자 ID 일치 확인. 단 `www.petjigi.kr/ads.txt`는 307(→petjigi.kr) — Google이 www를 리디렉션으로 보고 문제 삼을 수 있음(memory 기록의 307→308 TODO와 동일). 계정 SEVERE ads-txt-issues 경고와의 관계는 미확인 |
| cs@petjigi.kr 수신 가능 여부 | UNKNOWN | 테스트 메일(사람이 직접) | 2026-10-12 읽기 전용 DNS 조회에서 petjigi.kr MX·SPF·DMARC 레코드가 조회되지 않음. 운영자가 설정을 보류한 상태이므로 수신을 가정하지 말 것 |
| Resend 운영 발송 성공 | UNKNOWN | 도메인 인증 후 사람이 확인 | 코드는 키 미설정/실패 시 "메일 발송 완료"라고 표시하지 않음 |
| 전문가의 의학·법률·보험 검토 | UNKNOWN | 외부 전문가 | `docs/claim-verification/manifest.json`의 needs_review 항목이 대상 |
| 실제 Google URL 색인 상태 | UNKNOWN | Search Console | 일반 콘텐츠에 Indexing API를 사용하지 않음 |
| 운영 sitemap·canonical 정합 | UNKNOWN | `pnpm audit:live` | 배포 후 읽기 전용 실행 |

## 배포 전 영향 (코드 변경으로 달라지는 운영 동작)
- 방문자의 GA4·광고 저장소 동의가 기본 denied가 되어 GA4 데이터가 줄어듭니다(의도된 동작).
- 광고·GA4는 Vercel production + `petjigi.kr` 호스트에서만 로드됩니다. www 호스트·preview·local은 로드하지 않습니다.
- 광고 제외 경로·noindex·404 페이지에서는 GA4도 로드하지 않습니다.
