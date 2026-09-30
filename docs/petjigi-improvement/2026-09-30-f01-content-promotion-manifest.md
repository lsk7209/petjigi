# F01/F17 — 24건 콘텐츠 운영 반영 완료 (PRODUCTION_VERIFIED)

**상태:** `PRODUCTION_VERIFIED`. 2026-09-30, 사용자가 제공한 Turso 자격증명으로 24건을
compare-and-swap UPDATE로 실제 반영했고, 반영 직후 SELECT-only로 재검증했다.

## 0. 실행 순서와 결과

1. **SELECT-only 비교** (`scripts/compare-content-promotion.ts`) — 26건 중 2건을 slug 충돌로
   제외(아래 6절), 24건이 hash 불일치로 반영 후보 확정. 결과:
   `docs/petjigi-improvement/content-promotion-manifest.json`.
2. **Dry-run** (`scripts/promote-reviewed-content.ts`, `--apply` 없이) — 24건 모두
   `would_update`, 에러/스킵 0건. 각 slug가 seed 전체에서 정확히 1회만 정의됨을 추가로
   확인(다른 숨은 중복 없음).
3. **실제 반영** (`scripts/promote-reviewed-content.ts --apply`) — 24건 모두 `updated`,
   `rowsAffected: 1`. 결과: `docs/petjigi-improvement/content-promotion-result.json`.
4. **반영 후 재검증** (`scripts/verify-content-promotion-safety.ts`, SELECT-only) — 24건 모두
   `status=published` 유지, `published_at` 원본 보존, `reviewed_at`/`reviewer_name` 임의 생성
   없음을 확인. 전체 PASS.
5. **hash 재비교** (`compare-content-promotion.ts` 재실행) — 24건 모두 `changed_fields: []`
   (title/body/sources가 코드 값과 정확히 일치). `hashes_match`는 `false`로 남는데, 이는
   `updated_at`이 반영 시각으로 새로 찍혔기 때문이며 오작동이 아니다(hash 계산에 updatedAt이
   포함되는 설계상 당연한 결과).

이 24건은 이제 **운영 DB에 실제로 반영 완료**됐다. 아래 1~5절은 반영 전 조사 기록으로 보존한다.

## 1. 24건(원래 26건)의 식별 근거

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

## 4. 운영 DB 반영 전 필요한 절차 (0절 완료, 이후 단계는 PROPOSED)

1. ~~운영 DB SELECT-only 접근~~ — **완료.** 25건 모두 hash 불일치, 반영 후보로 확정.
2. 불일치 필드만 골라 승인 manifest를 생성한다 — **완료.**
   `docs/petjigi-improvement/content-promotion-manifest.json`에 각 항목의 `content_id`,
   `production_hash`(운영 현재값), `code_hash`(반영하려는 새 값), `changed_fields`, 사유가 있다.
3. 실제 UPDATE는 compare-and-swap(현재 hash 일치 조건) + 트랜잭션 + 영향 행수 검증 + 실패 시 rollback을
   포함하는 별도 스크립트(`scripts/promote-reviewed-content.ts`, 항상 `--dry-run` 기본값)로만 수행한다.
   **다음 단계.** 아직 작성하지 않았다.
4. `publishedAt`(최초 발행일)은 보존하고 `updatedAt`만 변경한다. 검수일(`reviewedAt`)은 새로
   만들지 않는다 — 이 25건은 편집 정정이며 전문가 검수 완료가 아니다.
5. 11건의 review_queue 레코드는 이 반영과 무관하게 비공개 유지한다. 관리자 승인 경로가 이미
   `lib/content-risk-gate.ts` 기반 게이트를 통과해야 하므로 별도 코드 변경은 필요하지 않다
   (Task 0 조사에서 확인, 이번 세션 미변경).

## 5. 확인하지 못한 것

- `blog-324`(dog-paw-care-guide 중복)가 별도로 정정이 필요한지 여부 — 이번 25건 범위 밖으로
  분류했으나 검증되지 않음, 후속 조사 필요. (참고: `blog-324`는 slug `dog-paw-care-guide`로
  운영에 존재하고 `sources` 필드만 코드와 다름 — 이번 SELECT 비교에서 확인됨. `blog-161`은
  별도 content_id로 25건에 포함됨.)
- 각 content_id가 위치한 정확한 seed 파일과 라인 — `content-inventory.csv`의 `evidence`
  컬럼 값을 그대로 사용했고 diff로 재확인하지 않았다.

## 6. 별도 이슈 — 2건의 slug 충돌 (F01 범위 밖, 미해결, 이번에 반영하지 않음)

이번 SELECT/dry-run 비교 중 발견. **양쪽 모두 UPDATE 승인 대상에서 제외했다.**

### 6.1 `dog-patellar-luxation`

- 코드에 같은 slug로 두 개의 다른 content_id가 존재:
  - `seed-guide-dog-patellar-luxation` (type=guide, status=published, `db/seeds/contents.ts`)
  - `condition-dog-patellar-luxation` (type=condition, status=review_queue,
    `db/seeds/conditions-batch-2.ts`, 코드 주석에 "슬러그 충돌"로 이미 명시됨)
- 운영 DB의 현재 `dog-patellar-luxation` 행은 `condition-dog-patellar-luxation`
  (review_queue)이다 — SELECT로 확인.
- 이 상태에서 guide 쪽 코드 값을 그대로 UPDATE하면 review_queue(미검수 의료 초안) 보호를
  깨뜨리고 사실상 공개하는 것과 동일한 결과를 낳는다.

### 6.2 `dog-paw-care-guide`

- 코드에 같은 slug로 **내용이 완전히 다른** 두 글이 존재:
  - `blog-161` (`db/seeds/blog-posts-17.ts`, category 3, "갈라짐·화상·이물질 대처법" 중심)
  - `blog-324` (`db/seeds/blog-posts-40.ts`, category 5, "계절별 주의사항·발톱·패드 케어" 중심)
- dry-run 실행 중 발견 — 운영 DB의 현재 `dog-paw-care-guide` 행은 `blog-324`다. 원래 26건
  목록(`docs/HANDOFF.md`)이 의도한 정정 대상은 `blog-161`이었으나, 그 코드 값으로 그대로
  UPDATE하면 지금 운영 중인 글(`blog-324`)을 전혀 다른 글로 **바꿔치기**하는 결과가 된다.
  이는 "정정"이 아니라 "다른 글로 교체"이므로 이번 반영에서 제외했다.

### 두 건 모두 필요한 후속 조사 (사용자 승인 후)

1. 운영자가 어느 콘텐츠가 해당 slug의 진짜 의도인지 결정한다.
2. 유지하지 않는 쪽은 slug를 바꾸거나 코드에서 제거/병합해야 한다.
3. 결정 후에는 이번 24건과 같은 compare-and-swap 방식으로, 별도 승인을 받아 반영한다.
