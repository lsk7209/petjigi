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
