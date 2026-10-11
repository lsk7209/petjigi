# AdSense 4차 감사 (2026-10-11)

점수·승인률 없음. 조사: 공개 사이트맵 1,045 URL 전수 크롤(HTTP·title·canonical·robots·h1·본문 길이), 운영 DB 읽기 전용 SELECT(695행), 기존 audit:* 5종 실행. 운영 DB 쓰기·push·배포 없음.

## A. 재현된 잔여 문제
| 우선 | 대상 | 문제 | 근거 | 조치 | 상태 |
|---|---|---|---|---|---|
| 높음 | blog 326건(YMYL 138 포함) | 출처 "참고 자료" 미노출 | 운영 DB `sources`가 이중 인코딩(`"[\"…\"]"`). 페이지의 `Array.isArray` 검사 실패 → 실제 라이브 blog 445건 중 67건만 노출 | `lib/content-sources.ts` 정규화, blog/guide/condition 페이지·위험 게이트 적용 | 코드 수정+단위·정적 테스트 통과. **배포 전 라이브 미확인** |
| 중간 | public/sitemap-0.xml | `/shelter/{buk,dong,gangseo,jung,nam,seo}` 6건 404, `/feed.xml`·`/sitemap-content.xml`이 페이지로 등재 | 크롤 404 6건, 파일 내 확인 | config exclude + 커밋 산출물 8행 제거 + 테스트 | 수정 완료(배포 필요) |
| 중간 | blog 49건(YMYL 19) | 본문 479~800자로 얇음 | dog-ear-hematoma-guide 479, male-dog-prostate 541, dog-nasal-discharge 565 등 (목록은 아래) | **미조치** — 의학 본문 증보는 출처·수의사 검토 필요, 무작정 확장 금지 | 결정 필요 |
| 중간 | shelter 27쪽 | 센터 1곳+공통 FAQ 템플릿 | /shelter/pyeongtaek 본문 약 420자 | 미조치 — 센터 1곳 지역 noindex 여부 결정 필요 | 결정 필요 |
| 낮음 | blog 70·guide 28 | 출처 없음(모두 비YMYL) | DB 확인, YMYL 196건은 전부 출처 있음 | 미조치 | 참고 |
| 낮음 | /category/* | 9개 시도 "준비중" 링크 반복 | 크롤 | 미조치(사실 표기) | 참고 |

얇은 YMYL blog: dog-ear-hematoma-guide, male-dog-prostate-disease-guide, dog-nasal-discharge-guide, petloss-guilt-coping-guide, dog-broken-nail-emergency, prolonged-grief-petloss-guide, cat-corneal-eye-injury-guide, pregnant-pet-care-guide, cat-tuna-addiction-risks, dog-addisons-disease-guide, dog-degenerative-myelopathy-guide, pet-insurance-hereditary-coverage, cat-asthma-bronchitis-guide, dog-mast-cell-tumor-guide, cat-fiv-felv-testing-guide, dog-skin-lump-guide, cat-food-allergy-elimination-diet, dog-liver-disease-early-signs, pet-insurance-renewal-cancel-guide.

## B. 이미 해결된 항목
- 크롤 1,045건 중 200=1,039, 404=6(위 shelter). 리디렉션·noindex가 사이트맵에 섞인 URL 없음, canonical 전부 자기 URL, h1 1개(피드·XML 제외), 플레이스홀더 없음(`준비중`은 의도된 표기), 본문 5-gram 유사도 0.12 초과 쌍 0건.
- DB 게시 글 중 사이트맵 누락 2건(cat-treats-guide, pet-photo-tips-guide)은 의도된 308 통합.
- source-claim-audit의 CONTRADICTED 2건(pet-food-rotation, pet-first-aid)은 운영 DB 출처가 이미 정정됨.
- YMYL 게시 196건 모두 disclaimer·sources 보유. 검토자 이름은 4건만(미검토 글에 검토자 생성 안 함 유지).

## C. 변경
`lib/content-sources.ts`(+test), `lib/content-risk-gate.ts`, `app/{blog,guide,condition}/[slug]/page.tsx`, `next-sitemap.config.js`, `public/sitemap-0.xml`, `scripts/sitemap-committed-artifact.test.ts`, `scripts/content-sources-render.test.ts`.
검증: `pnpm test` 439/439 통과. lint/tsc는 Stop hook 담당. 브라우저 E2E·Lighthouse·GSC는 미실행(GSC 접근 불가, 색인 상태 미확인).

## D. 운영 반영
- 코드 배포(main 병합) 필요 — 승인 대기. 롤백: 병합 revert.
- 운영 DB 변경 불필요(렌더 정규화). 원하면 이중 인코딩 정리는 별도 dry-run→백업→CAS.
- 다음 시드 작성 시 `JSON.stringify(sources)`를 json 모드 컬럼에 넣으면 같은 문제 재발 → 정규화로 흡수됨.

## E. 결론
**2. 주요 위험 일부 잔존** — 출처 미노출·사이트맵 404는 수정, 얇은 본문(blog 49, shelter 27)은 결정 대기. AdSense 계정 상태 미확인.

## 후속 조치 (2026-10-11)
- 얇은 건강 글 7건 보강(귀혈종·전립선·콧물·발톱 파절·고양이 각막·에디슨병·퇴행성 척수병증): 미확인 수치·약물명 제거, Merck/VCA/PMC 출처 3건 이내 부착(array 리터럴). 운영 DB는 `apply-content-update.ts`로 반영(백업 `.backup-prod/`, 복구 `--restore`). `dog-mast-cell-tumor-guide`는 시드 slug 중복으로 제외.
- shelter 센터 1곳 지역 10개: noindex+광고 차단+사이트맵 제거(`lib/shelter-index-policy.ts`).
- 글 통합(308)은 보류: 겹침이 확인된 쌍이 없어 근거 없이 합치지 않음.
