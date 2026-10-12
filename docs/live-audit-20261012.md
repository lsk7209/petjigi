# 펫지기 운영 사이트 전체 사이트맵 감사 — 2026-10-12

공개 사이트 `https://petjigi.kr`을 **읽기 전용**으로 검사했다. 수집 시각은 2026-10-12 08:51–08:53 KST(UTC 2026-10-11 23:51–23:53)이다. 광고 클릭, 양식 제출, 계정·운영 데이터 변경은 실행하지 않았다.

## 검사 범위와 결과

| 항목 | 결과 |
| --- | ---: |
| 사이트맵 인덱스 | HTTP 200, 하위 사이트맵 2개 |
| 정적 사이트맵 URL | 454개 |
| 콘텐츠 사이트맵 URL | 563개 |
| 중복 없이 수집한 URL | 1,017개 |
| 수집한 URL의 HTTP 상태 | 200: 1,017개; 실패·이동: 0개 |
| 제목·설명·canonical 누락 | 각 0개 |
| 자기 URL과 다른 canonical | 0개 |
| noindex(meta 또는 X-Robots-Tag) | 0개 |
| 중복 제목·설명·canonical 그룹 | 각 0개 |
| 사이트맵 밖 내부 링크 후보 | 9,378개 |
| 추가 검사한 내부 링크 | 500개: HTTP 200 454개, HTTP 404 46개 |

사이트맵에 올라간 공개 페이지의 색인 메타데이터와 HTTP 상태는 이 검사에서 일관됐다. 추가 검사한 링크 46개는 실제 운영 URL에서 404로 응답했다. 모두 사이트맵에 없는 콘텐츠 경로이며 `/blog/` 37개, `/guide/` 9개다. 이들은 의도적으로 사이트맵에서 제외한 `/search`, `/rescue`, 자료 없는 지역 페이지의 noindex와 구분된다.

반복해서 연결되는 예시는 다음과 같다. 참조 페이지 수는 증거 파일에 저장한 최대 5개의 예시 기준이므로 실제 수보다 적을 수 있다.

| 실패 대상 | 확인한 참조 예시 | 저장된 참조 수 |
| --- | --- | ---: |
| `/blog/dog-adoption-checklist` | `/blog/puppy-first-week-guide` | 5 |
| `/blog/petloss-recovery-guide` | `/blog/petloss-telling-others-how-to` | 5 |
| `/guide/dog-food-by-age` | `/blog/dog-puppy-nutrition-guide` | 5 |
| `/guide/dog-health-checkup` | `/blog/pet-vet-visit-guide` | 5 |
| `/guide/pet-insurance-guide` | `/blog/pet-consumer-rights-guide` | 5 |
| `/guide/vet-cost-saving-guide` | `/blog/pet-consumer-rights-guide` | 5 |

모든 실패 대상과 참조 예시는 [`summary.json`](../.seo-cache/live-audit-20261012/summary.json)의 `badLinks`에 있다. 공개된 실제 대체 글이 있으면 링크를 그 경로로 고치고, 적절한 대상이 없으면 링크를 제거하는 것이 우선이다. `/blog/dog-adoption-checklist`는 이름이 비슷한 `/guide/dog-adoption-checklist`가 있으나 내용과 연결 의도를 대조한 뒤 교체해야 한다. 운영 DB 본문 수정은 이번 읽기 전용 감사 범위에 포함되지 않았다.

## 방법과 한계

사이트맵 인덱스와 하위 XML을 실시간으로 가져온 다음, 열거된 URL을 동시 요청 8개·요청당 제한 25초·일시적 서버 오류 최대 2회로 검사했다. HTML의 `<head>`에서 title, description, canonical, robots를 읽고 응답 헤더의 X-Robots-Tag를 함께 확인했다. 모든 1,017개 페이지에서 해당 메타데이터가 발견되어 스트리밍 메타데이터 누락으로 오인한 사례는 없었다. `<a href>` 내부 링크는 query·fragment를 제거해 URL별로 합쳤다.

사이트맵 밖 링크 9,378개는 업체 상세 경로가 대부분이다. 부하를 제한하기 위해 여러 페이지가 참조한 URL을 먼저, 그다음 URL 정렬순으로 500개만 검사했다. 나머지 8,878개는 상태를 확인하지 않았으므로 **전체 사이트 내부 링크 결함 46개**라고 해석하면 안 된다. 이미지·스크립트·외부 링크·브라우저 렌더링·Google 실제 색인 상태도 범위 밖이다. 사이트맵 목록과 운영 콘텐츠는 수집 뒤 바뀔 수 있다.

증거: [`crawl.json`](../.seo-cache/live-audit-20261012/crawl.json)(사이트맵 XML, URL별 응답·메타데이터·링크, 추가 요청 결과), [`summary.json`](../.seo-cache/live-audit-20261012/summary.json)(집계), [`live-audit-20261012.mjs`](../.seo-cache/live-audit-20261012.mjs)(재현 스크립트).
