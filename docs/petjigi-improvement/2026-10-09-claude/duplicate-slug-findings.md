# 시드 중복 slug 감사 (2026-10-09, 로컬 소스 기준)

도구: `pnpm exec tsx scripts/audit-slug-conflicts.ts` — `db/seeds/*.ts`를 **실행하지 않고** AST로만 읽는다(시드 파일은 import 시 DB 클라이언트를 로드하므로 import 금지).
결과: `slug-conflicts.csv` (id/type/status/본문 길이/본문 sha256 앞 12자).

## 핵심 사실
- `contents.slug`는 **전역 UNIQUE** (`db/schema/contents.ts:5`). type이 달라도 같은 slug는 한 행만 DB에 존재할 수 있다.
- 시드에서 같은 slug를 선언한 레코드: **65건 / 32개 slug** (최대 3건/slug). 같은 본문은 0건(전부 서로 다른 원고).
- 서로 다른 type이 slug를 공유: 8개 slug. 상태가 섞인 slug: 1개(`dog-patellar-luxation`).
- 시드별 upsert 방식이 달라 결과가 실행 순서에 의존한다 (`blog-posts-17`: target=id → slug UNIQUE 위반 가능, `blog-posts-40`: target=slug + `...post` → id까지 덮어씀).
- 이 수치는 **소스 시드 기준**이다. 운영 DB에 실제로 어느 행이 남아 있는지는 미확인(운영 조회 금지 범위).

## 요청된 두 충돌
| slug | 레코드 | type/status/cat | body sha12 | 비고 |
|---|---|---|---|---|
| dog-paw-care-guide | blog-161 (blog-posts-17) | blog/published/3 | b6273b6f6546 | id 기준 upsert |
| dog-paw-care-guide | blog-324 (blog-posts-40) | blog/published/5 | fe5f5afd12ad | slug 기준 upsert + 전 필드 덮어씀 → blog-161 행을 대체할 수 있음 |
| dog-patellar-luxation | seed-guide-dog-patellar-luxation (contents.ts) | guide/published/3 | 701f129e8ac1 | /guide 로 공개 |
| dog-patellar-luxation | condition-dog-patellar-luxation (conditions-batch-2) | condition/review_queue/3 | b1b1e04a9368 | 공개 금지 대기 레코드 |

분류(자동 병합·삭제 없음): 두 slug 모두 **NEEDS_REVIEW**.
- `dog-paw-care-guide`: 두 원고는 주제가 겹치나 본문·카테고리가 다르다 → MERGE_CANDIDATE 후보, 한쪽을 새 slug로 분리할지는 운영자 판단.
- `dog-patellar-luxation`: guide(공개)와 condition(검토 대기)은 slug 충돌로 동시에 존재할 수 없다. condition 쪽은 이미 별도 slug(`dog-patellar-luxation-stages` 등)가 있는지 확인 후 결정. 11건 의료 검토 대기 묶음은 공개로 전환하지 않는다.

## 운영자용 읽기 전용 확인 쿼리 (실행하지 않음)
```sql
SELECT id, type, status, category, length(body) AS len, published_at, updated_at
FROM contents WHERE slug IN ('dog-paw-care-guide','dog-patellar-luxation');
```
결과로 DB에 실제로 남은 행을 확정한 뒤 승격안을 만든다.

## DB 승격 dry-run 명세 (이번 실행에서 적용하지 않음, `--apply` 미사용)
- 대상 고정: content_id / type / slug / status / publishedAt / 원본 body hash (위 표).
- CAS 사전조건: `UPDATE ... WHERE id=? AND body_hash=?` 형태 — 운영 행의 hash가 위 표와 다르면 중단.
- 롤백: 해당 id의 이전 title/body/updatedAt만 복원(전체 시드 재실행 금지).
- 캐시: 승격 후 해당 slug의 revalidateTag만(전 사이트 무효화 금지).
- 열사병·펫로스 정정안(content-claims-review.md)도 동일 절차. 펫로스 정적 페이지는 코드 배포로 반영되며 DB 승격 불필요(DB 렌더링 본문이 별도인지는 위 쿼리와 함께 확인).

## 권고(별도 승인)
- 시드 upsert 대상을 전부 id로 통일하고 slug 중복을 시드 단계에서 거부하는 테스트 추가.
