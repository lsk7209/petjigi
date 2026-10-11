# 대표 콘텐츠 보강 — 2026-10-11

로컬 구현 완료 범위: 대표 문서 6개, 관련 문서 16개의 돌아오는 링크, 중복 문서 2개 통합. 변경 전 기준은 `0df857f`. 정확한 ID·파일·변경 컬럼·본문 해시는 [변경 목록](core-guides-update-manifest-20261011.json)에 기록했다. 모든 22개 레코드의 공개 상태, 발행일, 검토자·검토일·자격 정보는 유지했다. 전문가 검토를 받았다는 표시를 만들지 않았다.

| 대표 경로 | 보강 내용 | 근거와 적용 범위 |
| --- | --- | --- |
| `/guide/dog-adoption-checklist` | 가족 역할, 실제 견적을 적는 예산표, 인계 기록, 첫날 준비 | AVMA 입양 안내, 국가동물보호정보시스템 공고, 국내 등록대상 시행령. 등록 조건을 모든 반려동물로 확대하지 않음 |
| `/guide/dog-food-label-guide` | 제조사 질문, 완전균형 표시, 가상 건물 기준 계산 예시 | WSAVA 영양 자료와 FDA 표시 안내. 미국 표시 제도와 국내 의무 구분, 성분 순서만으로 품질 단정 제거 |
| `/guide/animal-hospital-guide` | 전화 질문, 방문 기록표, 지역 검색과 진료 준비 | AAHA 병원 선택·방문 준비. 임의 금식·투약 중단 권고 제거 |
| `/blog/pet-insurance-comparison-method` | 현재 약관을 채우는 비교표, 보장 제외·청구 확인 | 금융감독원 2024 보도자료 원문 재수록 및 금융위 당시 발표. 과거 발표를 현재 상품 조건으로 사용하지 않음 |
| `/guide/indoor-cat-enrichment-guide` | 다섯 환경 원칙, 자원 분산, 개별 관찰표, 안전 점검 | AAFP/ISFM 원문 논문. 일률적인 높이·놀이 시간과 허브·오일 권고 제거 |
| `/guide/memorial-ceremony` | 허가 업체 확인, 전화 질문, 견적 빈칸, 애도 지원 | 동물보호법 장묘업 허가 규정과 공식 업체 목록. 보관 시간·온도 및 처리 방법의 일괄 단정 제거 |

각 본문에 자료 확인일, 구체적인 출처 링크, 실행 가능한 표·목록, 공개 관련 글 3개 이상을 넣었다. 원래 보험 대상 `/guide/pet-insurance-before-joining`은 `review_queue`이고 발행일이 없어 공개 보험 글로 대체했다. 해당 초안은 변경하지 않았으며 404와 목록·사이트맵 제외를 검증한다.

## 중복 통합

- `/guide/dog-adoption-complete-guide` → `/guide/dog-adoption-checklist`
- `/guide/cat-indoor-enrichment-guide` → `/guide/indoor-cat-enrichment-guide`

유용한 첫날 준비·스크래칭·창가·놀이 교체 내용을 대표 글에 합쳤다. 원본 레코드는 보존하며 308로 대표 글에 연결한다. 공개 SQL 필터가 페이지 제한 전에 통합 문서를 제외하므로 목록·검색·사이트맵에 중복이 나타나지 않는다. 종이 다른 사료 성분 글은 별도 질문이 있어 통합하지 않았다.

## 검증 및 제한

검증 결과는 [.goal-harness 기록](../.goal-harness/core-guides-20261011/EVIDENCE.md)에 수록한다. 시드는 AST로 읽고 격리 SQLite DB에서 빌드와 브라우저 검증을 수행한다. 운영 시드 모듈을 실행하지 않는다. 1440px·390px 화면의 제목·canonical·표·목록·출처·내부 링크·가로 넘침을 확인하며 장묘 글의 광고 차단을 검사한다.

이번 범위는 대표 글과 연결 구조다. 연결된 기존 글의 모든 주장을 재검증한 것은 아니다. 자격을 갖춘 전문가 검토와 운영 데이터 최신성은 별도이며 미확인이다. 로컬 성공은 AdSense 승인이나 실제 배포를 뜻하지 않는다. 운영 DB 반영, 커밋·push·배포, Google/AdSense 계정 변경과 재심사 제출은 실행하지 않았다.

## 적용·복구 계약

`apply-content-update.ts`는 지정 slug의 본문·메타 설명·출처와 시드에 명시된 disclaimer·updatedAt만 갱신한다. ID·slug·published 상태 및 기존 값에 대한 compare-and-swap으로 충돌을 막는다. 운영 적용 전에 22개 전체 변경 목록을 검토해야 한다. 대표 6개만 적용하면 관련 글의 돌아오는 링크는 반영되지 않는다. 리다이렉트·공개 필터는 별도의 앱 배포가 필요하다.

실제 적용 시에는 매번 새 `BACKUP_DIR`(예: `.backup-prod/core-guides-20261011/<run-id>`)을 지정한다. 백업은 내용과 ID가 일치하는 전체 스냅샷만 재사용할 수 있으며, 오래된 3컬럼·불일치·깨진 백업은 `skip_backup_conflict`로 DB 쓰기 전에 중단한다. `updated`, `noop`, `cas_failed`, `skip_*` 결과를 모두 확인해야 한다. 명령 종료 코드만으로 반영 완료를 판정하지 않는다.

승인된 환경에서 실행하는 예시(이번 작업에서는 실행하지 않음):

```powershell
$env:BACKUP_DIR = '.backup-prod/core-guides-20261011/<new-run-id>'
pnpm exec tsx --env-file=.env.local scripts/apply-content-update.ts <manifest-slugs>
# dry-run 및 대상 ID 검토 후 승인된 경우에만:
pnpm exec tsx --env-file=.env.local scripts/apply-content-update.ts --apply <manifest-slugs>
# 동일 백업 디렉터리로 복구 미리보기:
pnpm exec tsx --env-file=.env.local scripts/apply-content-update.ts --restore <manifest-slugs>
# 복구 결과 검토 후 승인된 경우에만:
pnpm exec tsx --env-file=.env.local scripts/apply-content-update.ts --restore --yes <manifest-slugs>
```

기존 3컬럼 백업 복구는 당시 저장한 컬럼만 복구하고 저장되지 않은 disclaimer·updatedAt을 덮어쓰지 않는다. 통합 URL 복구에는 앱 코드의 해당 리다이렉트 변경도 별도로 되돌려야 한다.

## 출처 원문 목록

자료 확인일: 2026-10-11. 링크는 근거가 적용되는 범위 안에서만 사용한다.

- `dog-adoption-checklist`: [원문 1](https://www.avma.org/resources/pet-owners/petcare/selecting-pet-dog), [원문 2](https://www.animal.go.kr/front/awtis/protection/protectionList.do?menuNo=1000000060), [원문 3](https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1030927001)
- `dog-food-label-guide`: [원문 1](https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf), [원문 2](https://www.fda.gov/animal-veterinary/animal-health-literacy/complete-and-balanced-pet-food)
- `animal-hospital-guide`: [원문 1](https://www.aaha.org/resources/prioritizing-your-pets-health-how-to-choose-a-veterinarian/), [원문 2](https://www.aaha.org/resources/preparing-your-pet-for-a-successful-veterinary-visit/)
- `pet-insurance-comparison-method`: [원문 1](https://kiri.or.kr/PDF/weeklytrend/20240408/trend20240408_4.pdf), [원문 2](https://fsc.go.kr/po010103/82547)
- `indoor-cat-enrichment-guide`: [원문 1](https://pmc.ncbi.nlm.nih.gov/articles/PMC11383066/), [원문 2](https://pmc.ncbi.nlm.nih.gov/articles/PMC11383093/)
- `memorial-ceremony`: [원문 1](https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1034052703), [원문 2](https://www.animal.go.kr/front/awtis/shop/salesList.do?menuNo=5000000023), [원문 3](https://www.law.go.kr/LSW/flDownload.do?bylClsCd=110202&flSeq=155418929&gubun=)
# 후속 기록

2026-10-11 추가 개선의 현재 본문 해시·검증·운영 대조는 [site-value-improvement-20261011.md](site-value-improvement-20261011.md)와 `site-value-update-manifest-20261011.json`을 따른다. 아래 기록과 기존 manifest는 첫 단계의 역사적 스냅샷이다.
