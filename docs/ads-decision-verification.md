# 광고 판정 통합 및 브라우저 검증 (A02, 2026-10-10)

## 구조
- `lib/ads-policy.ts` `decideAdPage({pathname, marker, renderComplete})` → `allow | block | pending` 단일 판정.
- `components/ads/use-page-ad-decision.ts` 훅: DOM 마커(`data-ads-policy=block|pending`) + `document.readyState==="complete"` 구독. 서버/첫 하이드레이션은 항상 pending. **타이머로 allow 전환하지 않음**(구 1,200ms 대기 제거).
- 자동광고 로더·수동 `AdSlot`이 같은 훅 사용. pending은 자리만 예약(ins/push/하우스 광고 없음), block은 null.
- 경로 규칙: 장례 목록 `/{지역}/funeral`과 상세 `/funeral/{지역}/{업체}` 모두 차단, `/rescue` 차단. 장례 상세·동명 업체 선택 안내·가이드 0건 화면에 `data-ads-policy="block"` 마커 추가.
- 허용→차단 클라이언트 이동은 기존 방식(광고 런타임이 이미 로드된 경우 clean document로 `location.replace`) 유지. CSS 숨김 사용 안 함.
- 추모 광고 제한은 펫지기 자체 정책이며 Google 정책상 일괄 금지가 아님.

## 검증 (로컬, 외부 광고 서버 미호출)
격리 빌드 + 합성 fixture DB:
```
node tests/e2e/create-ads-fixture.mjs
NEXT_DIST_DIR=.next-verify TURSO_DATABASE_URL=file:<fixture> NEXT_PUBLIC_ADSENSE_ID=ca-pub-fixture NEXT_PUBLIC_AD_SLOT_HORIZONTAL=1 NEXT_PUBLIC_AD_SLOT_RECTANGLE=2 NEXT_PUBLIC_AD_SLOT_AUTO=3 pnpm exec next build
(같은 env로) node tests/e2e/ads-decision.mjs
```
결과(12/12 통과): 404·장례 상세/목록·업체 0건·검색·개인정보·2.5초 지연 404에서 ins/push/스크립트/광고 요청 0, 가이드 상세·병원 목록 허용, Googlebot UA 동일 판정, 허용→차단 이동 후 신규 광고 0, 차단→허용 시 스크립트 1개.

## 계정 확인 필요 (코드로 확인 불가)
- 자동광고 URL 제외 설정, CMP(EEA/영국/스위스 동의) 적용 상태, 소유 확인 방식(meta `google-adsense-account`)의 계정 일치.
