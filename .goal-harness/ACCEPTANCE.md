# ACCEPTANCE — 2026-10-16
| 기준 | 상태 | 근거 |
|---|---|---|
| 목록/건수/페이지/중복/3곳사이트맵 같은계약 | PASS_LOCAL | listing-identity/business-region tests, 13fixture JSON |
| 확정시도 범위·미분류·원본근거 있는 통합표기만 기존URL 대응 | PASS_LOCAL | SQLite fixtures, region-consistency browser:3/3/3+unclassified1 PASS |
| 모호상세 메타/본문/광고/JSON-LD 단일결정 보존 | ALREADY_FIXED | evaluateDetailTarget + regression |
| APMS 불완전자료 성공시각 금지·오류/0구분 | PASS_LOCAL | mocked collector/parser tests; 실제 ETL NOT_RUN |
| 주소변경/좌표쌍·fallback해시·HTTP오류 | PASS_LOCAL | coordinates + actual hashRow + mocked Kakao tests |
| keep30·draft보존 결정/본문미수정/URL정책 유지 | PASS_SCOPE | public keep30 exact; DB draft652 BLOCKED; seed diff0 |
| 운영계정/이미지/DB/재신청 | NOT_VERIFIED | 권한/환경부족; 운영반영금지 |
| 산출물 | COMPLETE_LOCAL | updated audit, JSON/CSV/diff/production plan |
