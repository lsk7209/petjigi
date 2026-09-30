# F01/F17 — 26건 콘텐츠 반영 준비 (PREPARED_NOT_APPLIED)

**상태:** `PREPARED_NOT_APPLIED`. 운영 DB 접근이 이 세션에 없어 실제 비교·반영은 수행하지 않았다.
아래는 로컬 코드(현재 SHA `98e4242e`의 `db/seeds/*.ts`) 기준의 식별 결과와 반영 절차 초안이다.
"26건 수정 완료"라고 보고하지 않는다 — 이 26건은 **코드에는 이미 반영되어 있으나 운영 DB 반영 여부가
미확인인 레코드**다.

## 1. 26건의 식별 근거

`docs/HANDOFF.md`(2026-09-13)는 "26-record published-content update"가 다음 작업으로 남아있다고
기록했다. 정확한 레코드 ID 목록은 어느 문서에도 명시적으로 나열되어 있지 않아, 이번 세션에서
`pnpm audit:sources`가 정의한 36개 후보 slug(`scripts/audit-quality.ts`의 `candidates` 배열,
`progress.md`의 순차 정정 서술과 대응)를 `content-inventory.csv`와 대조해 재구성했다.

- 36개 후보 slug 중 **11개는 `status=review_queue`** (condition 초안) — HANDOFF의
  "11 review-queue records"와 정확히 일치. 이 11건은 **공개하지 않는다**(사용자 지시 및
  기존 게이트 유지).
- 나머지 slug는 `status=published`이나, `dog-paw-care-guide` slug가 두 개의 서로 다른
  content_id(`blog-161`/`db/seeds/blog-posts-17.ts`, `blog-324`/`db/seeds/blog-posts-40.ts`)에
  중복 존재한다(기존 `duplicate-clusters.csv`에 이미 URL 중복으로 별도 기록됨, F01과 무관한
  선행 이슈). `.goal-harness/CHANGELOG.md`가 명시적으로 언급한 파일은 `blog-posts-17.ts`이므로,
  실제 정정 대상은 `blog-161`이고 `blog-324`는 이번 정정 범위 밖의 별도 미해결 중복이다.
- 이를 제외하면 published 고유 레코드 **26건**이 남는다 — HANDOFF의 "26"과 일치.

## 2. 26건 목록 (ID / type / slug / 현재 코드 파일)

| content_id | type | slug | seed 파일 |
|---|---|---|---|
| seed-condition-dog-disc-disease | condition | dog-disc-disease | db/seeds/conditions-batch-1.ts (추정, 미검증) |
| blog-166 | blog | cat-grooming-basics-guide | db/seeds/blog-posts-*.ts |
| blog-155 | blog | pet-food-rotation-guide | db/seeds/blog-posts-*.ts |
| blog-puppy-first-week-guide | blog | puppy-first-week-guide | db/seeds/blog-posts.ts |
| seed-guide-pet-first-aid | guide | pet-first-aid-guide | db/seeds/contents.ts |
| blog-pet-registration-guide | blog | pet-registration-guide | db/seeds/blog-posts.ts |
| blog-453 | blog | pet-emergency-vet-preparation | db/seeds/blog-posts-*.ts |
| blog-164 | blog | pet-emergency-kit-guide | db/seeds/blog-posts-17.ts |
| blog-199 | blog | pet-toxic-plants-dog-guide | db/seeds/blog-posts-20.ts |
| blog-200 | blog | pet-toxic-plants-cat-guide | db/seeds/blog-posts-20.ts |
| blog-167 | blog | dog-flea-tick-guide | db/seeds/blog-posts-17.ts |
| blog-168 | blog | cat-flea-tick-prevention | db/seeds/blog-posts-17.ts |
| blog-170 | blog | dog-heartworm-treatment-guide | db/seeds/blog-posts-17.ts |
| blog-231 | blog | dog-dental-scaling-guide | db/seeds/blog-posts-24.ts |
| blog-232 | blog | cat-anal-gland-guide | db/seeds/blog-posts-24.ts |
| blog-233 | blog | dog-anal-gland-express-guide | db/seeds/blog-posts-24.ts |
| blog-162 | blog | cat-summer-safety-guide | db/seeds/blog-posts-17.ts |
| blog-163 | blog | dog-eye-care-guide | db/seeds/blog-posts-17.ts |
| blog-198 | blog | dog-summer-paw-protection | db/seeds/blog-posts-20.ts |
| blog-161 | blog | dog-paw-care-guide | db/seeds/blog-posts-17.ts |
| blog-165 | blog | dog-skin-care-guide | db/seeds/blog-posts-17.ts |
| blog-169 | blog | pet-vet-visit-guide | db/seeds/blog-posts-17.ts |
| blog-213 | blog | online-vet-consultation-guide | db/seeds/blog-posts-20.ts |
| blog-197 | blog | pet-allergy-season-guide | db/seeds/blog-posts-17.ts |
| blog-234 | blog | pet-human-allergy-guide | db/seeds/blog-posts-24.ts |
| seed-guide-dog-patellar-luxation | guide | dog-patellar-luxation | db/seeds/contents.ts |

이 26건 모두 `pnpm audit:content:gate`(변경분 게이트)와 `pnpm audit:content`(전체 소스 존재 검사)를
현재 코드 기준으로 통과한다 — 아래 3절 실행 결과 참조. 개별 seed 파일 경로는 `content-inventory.csv`의
`evidence` 컬럼을 근거로 했으나, 파일별 정확한 라인은 diff 기반 재확인이 필요하다(`VERIFY_LIVE` 표시).

## 3. 로컬 검증 결과 (이번 세션에 실행, 운영 DB 미접근)

```
pnpm audit:content
  records: 864, highRisk: 406, missingSources: 0, missingSourcesPublished: 0
  → 이 26건을 포함한 모든 published/review_queue 고위험 레코드에 출처가 존재함(코드 기준)

pnpm audit:sources
  candidates: 36, matchedRecords: 38
  statusCounts: SUPPORTED 30, PARTIAL 11, CONTRADICTED 2, UNVERIFIED 76, NEEDS_EXPERT_REVIEW 11
  → NEEDS_EXPERT_REVIEW 11건 = review_queue 콘텐츠(공개 금지 유지)
```

두 명령 모두 exit 0. 이는 **코드 상태**의 검증이며, 운영 DB에 이 값이 반영됐는지는 확인하지 않았다.

## 4. 운영 DB 반영 전 필요한 절차 (PROPOSED, 미실행)

1. 운영 DB에 대한 **SELECT-only** 접근이 승인되면, 위 26건 content_id로 운영 행을 조회해
   `title`/`body`/`sources`/`updatedAt` 필드가 현재 코드 값과 일치하는지 hash 비교한다.
   (`scripts/audit-quality.ts`의 `contentVersion()` 함수를 재사용해 동일한 sha256 계산 방식을 쓴다.)
2. 불일치하는 필드만 골라 승인 manifest(`content-promotion-manifest.json`)를 생성한다 —
   각 항목에 `content_id`, `expected_current_hash`(운영), `new_hash`(코드), 변경 필드, 사유를 기록한다.
3. 실제 UPDATE는 compare-and-swap(현재 hash 일치 조건) + 트랜잭션 + 영향 행수 검증 + 실패 시 rollback을
   포함하는 별도 스크립트(`scripts/promote-reviewed-content.ts`, 항상 `--dry-run` 기본값)로만 수행한다.
   이 스크립트는 이번 세션에 작성하지 않았다 — 운영 스키마·연결 정보가 없어 실제 SELECT 비교부터
   막혀 있기 때문이다(`VERIFY_LIVE`).
4. `publishedAt`(최초 발행일)은 보존하고 `updatedAt`만 변경한다. 검수일(`reviewedAt`)은 새로
   만들지 않는다 — 이 26건은 편집 정정이며 전문가 검수 완료가 아니다.
5. 11건의 review_queue 레코드는 이 반영과 무관하게 비공개 유지한다. 관리자 승인 경로가 이미
   `lib/content-risk-gate.ts` 기반 게이트를 통과해야 하므로 별도 코드 변경은 필요하지 않다
   (Task 0 조사에서 확인, 이번 세션 미변경).

## 5. 확인하지 못한 것

- 운영 DB의 현재 값 — 접근 불가, `VERIFY_LIVE`.
- `blog-324`(dog-paw-care-guide 중복)가 별도로 정정이 필요한지 여부 — 이번 26건 범위 밖으로
  분류했으나 검증되지 않음, 후속 조사 필요.
- 각 content_id가 위치한 정확한 seed 파일과 라인 — `content-inventory.csv`의 `evidence`
  컬럼 값을 그대로 사용했고 diff로 재확인하지 않았다.
