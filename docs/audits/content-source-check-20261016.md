# 출처 재검토 — 2026-10-16

범위: 10월 15일 감사의 우선 오류 2건을 현재 원문과 대조하고 로컬 시드만 부분 교정했다. 운영 DB 조회·반영, 게시 상태·발행일·검수자 변경은 하지 않았다. 이 검토는 글 전체의 수의학적 검수 완료를 의미하지 않는다. 본문 교정은 활성 Codex 세션에서 직접 작성했다.

| 대상 | 확인 근거 | 로컬 수정 | 운영 상태 |
|---|---|---|---|
| `blog-dog-toxic-foods` / `dog-toxic-foods`, `db/seeds/blog-posts.ts` | [ASPCA 원문](https://www.aspca.org/pet-care/aspca-poison-control/people-foods-avoid-feeding-your-pets)의 Chocolate 및 Macadamia 절에는 기존 글의 kg당 용량 수치가 없다. 원문은 섭취 의심 시 수의사 또는 중독 상담 연락을 안내한다. | 잘못 귀속한 초콜릿·마카데미아 수치 삭제. 초콜릿 성분·종류에 따른 위험 설명과 섭취 정보 전달 안내로 교정. 직접 출처 URL 추가. | 미반영; 다른 문단의 주장과 전문 검수는 별도 |
| `blog-dog-patella-luxation` / `dog-patella-luxation`, `db/seeds/blog-posts-2.ts` | [ACVS 원문](https://www.acvs.org/small-animal/patellar-luxations/)의 Aftercare and Outcome은 90%를 보호자의 수술 후 경과 만족도로 설명한다. | 수술 성공률 표현을 보호자 만족도로 교정하고 완치·성공률과 구분. 직접 출처 URL 추가, 대조 대기 메모 제거. | 미반영; 다른 치료·관리 문장은 전문 검수 별도 |

검증: `pnpm audit:content:gate`의 **local scope**에서 changedRecords=2, blockers=0. `--base=HEAD`는 미커밋 변경을 검사하지 않아 최초 실행이 0건이었으며, 이를 통과 증거로 사용하지 않았다. 현재 결과는 `docs/audits/content-gate-20261016.csv`.

`dog-toxic-foods`는 중독·건강 정보를 담고도 기존 시드가 `ymyl: false`였다. 로컬에서 true로 분류하고 의료 면책문구를 추가했다. 향후 승인된 운영 반영에서는 본문뿐 아니라 이 두 필드도 별도 범위로 검토해야 한다. 기존 본문용 updater로 함께 반영됐다고 가정하지 않는다.

분류 수정 후 게이트가 기존 시간 수치의 미추적 위험 주장을 발견했다. 증상을 1시간 기다리게 할 수 있는 문구와 자일리톨의 미확인 발현 시간도 삭제하고, 같은 ASPCA 원문의 섭취 의심 시 상담 안내 범위로 좁혔다. 분류를 되돌리거나 게이트를 약화하지 않았다.

추가 조사: [Mueller 2016](https://link.springer.com/article/10.1186/s12917-016-0633-8)은 흔한 식품 알레르겐에 관한 논문이다. 이 출처만으로 8주 식이시험 기간을 검증했다고 기록하지 않는다. WSAVA·법령 등 나머지 출처와 공개 30건 전체 검토는 미완료다. 10월 15일 CSV는 당시 이력으로 보존한다.
