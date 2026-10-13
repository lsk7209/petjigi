# B. 수정 결과 (2026-10-13)

## 변경
| 파일 | 수정 전 | 수정 후 |
|------|---------|---------|
| `next-sitemap.config.js` | 지역 목록·센터가 빌드 시 누락(65건), DB 실패 시 조용히 누락 | DB 기준 additionalPaths/transform, 실패 시 빌드 실패 → 453건 |
| `public/sitemap-0.xml` | 65건 | 453건 |
| `db/seeds/blog-posts*.ts` (4개) | 미확인 인용·수치 8개 글 | 삭제 중심 정정, 출처에 "원문 대조 대기" 표기 |
| `docs/link-repair-manifest-20261012.json` | 본문 해시 구버전 | blog-245/247 갱신 |
| `.github/workflows/deploy.yml` | skip인데 success | Vercel 상태 조회·기록 |
| `scripts/apply-content-update.ts(+test)` | 해시 미표시 | fromHash/toHash 표시 |
| `scripts/audit-keep30-drift.ts` (신규) | 없음 | 시드↔운영 30건 읽기 전용 감사 |
| `scripts/sitemap-*.test.ts` | - | 신규 보호 테스트 |
| `etl/localdata/sync.ts` | 원본 API 실패를 삼키고 success | 실패 시 종료코드 1 (**미커밋·미배포**) |

## 운영 반영
- PR #71 병합(CI 통과), main `de35b5b`.
- 운영 DB: 22건 `--apply`(백업 `.backup-prod`, CAS). 이후 30/30 일치, draft 652 불변.
- 호스팅: petjigi.kr = OVH VPS. 이미지 `ovh-petjigi-production:de35b5b-20261013-v1` 교체, healthy, 라이브 sitemap-0 453건 확인.
- Vercel Production 배포도 1건 생성했으나 도메인과 무관(DNS가 OVH).
- GSC: sitemap.xml 재제출.

## 테스트
`pnpm test` 526/526, `pnpm build` 성공(사이트맵 453), `audit:internal-links` 실패 0, `audit:adsense:readiness` PASS 13 / UNKNOWN 11. 이후 변경(ETL)은 단위 테스트 없음 — NOT_RUN: `test:e2e`, 모바일 Lighthouse.

## 롤백
- 컨테이너: `/data/coolify/services/zlpoefjoahqbwf0dswhrvc7w/docker-compose.yml.before-de35b5b` 복원 후 `docker compose up -d web`.
- DB 본문: `pnpm exec tsx scripts/apply-content-update.ts --restore --yes <slug>` (`.backup-prod`).
- 코드: PR #71 revert.

## 추가 수정 (같은 날 후속)
| 항목 | 수정 전 | 수정 후 |
|------|---------|---------|
| 지역 목록 중복(PR #73) | 같은 업체가 CSV·포털 두 출처로 이중 노출(약 977건) | `notDuplicateListing`으로 1건만 노출. 양천구 vet 50→49, 라이브 중복 0 |
| 동물병원 ETL(PR #74) | API 페이지 상한(100건)을 1000으로 가정 → 10,648건 중 1,100건만 수집, 말소(04)가 영업 중 처리, CSV와 중복 적재, 스케줄 없음 | 107페이지 전체 수집, 01 외 모두 closed, 신규 폐업 미적재, CSV 동일 관리번호는 갱신(중복 없음), `etl-animal-hospitals.yml` 주 1회 |
| 운영 DB 동물병원 | CSV(5월 스냅샷) 5,419 + 포털 1,071 | 영업 중 약 5,900(신규 538), 폐업 반영 CSV 55건·포털 129건, 이름+주소 중복 0 |
| ETL 실패 은폐(PR #72) | LOCALDATA 실패해도 success | 실패 시 종료코드 1 |

운영 DB 쓰기: 백업 `.backup-prod/vet-etl-20261013.json`(작업 전 vet 6,490행), 삭제한 중복 포털 행 `.backup-prod/vet-etl-dup-mois-rows-20261013.json`(4,946행). 롤백: 백업 JSON으로 행 복원(INSERT OR REPLACE). 서버 재배포: `ovh-petjigi-production:586db12-20261013-v1`(PR #73 포함), 롤백 compose는 `docker-compose.yml.before-586db12`.
미해결: 카카오 지오코딩 키 403 → 신규 538곳 좌표 없음, 나머지 7개 업종은 LOCALDATA 원본 불통으로 5월 스냅샷 그대로.
