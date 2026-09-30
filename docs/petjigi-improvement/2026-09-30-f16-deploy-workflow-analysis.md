# F16 — CI/배포 workflow 분석 (분석·제안만, 코드 미수정)

**상태:** `VERIFY_LIVE` / `PROPOSED` — 이 문서는 조사 결과와 제안만 담는다. `.github/workflows/deploy.yml`,
Vercel 프로젝트 설정, GitHub Actions 비밀값, branch protection은 이 세션에서 변경하지 않았다.

## 확인한 사실 (CODE_CONFIRMED)

1. `deploy.yml`은 `push: branches: [main]` 및 `workflow_dispatch`로 트리거되며, 필요한 secret이
   모두 있으면 승인 단계 없이 곧바로 `pnpm build` → `vercel deploy --prebuilt --prod`를 실행한다.
2. `pnpm build` = `next build && next-sitemap`이며, `.vercel/output` 생성이나 `vercel build`
   단계가 없다. Vercel 공식 문서(E08)는 `--prebuilt`를 `vercel build`가 만든 `.vercel/output`과
   연결하도록 설명한다. 현재 workflow가 실제로 유효한 prebuilt 아티팩트를 만드는지, 아니면
   `vercel deploy --prebuilt`가 내부적으로 폴백하는지는 이 세션에서 실행 로그로 확인하지 않았다.
3. `deploy.yml`에는 `pnpm test`, `pnpm lint`, `pnpm exec tsc --noEmit`, 5개 audit 명령이 전혀
   포함되지 않는다. 즉 테스트가 실패한 커밋도 그대로 프로덕션에 배포될 수 있는 경로다.
4. `docs/HANDOFF.md`(2026-09-13 기록)는 "Vercel Git integration이 merge SHA `9b09ac8`를
   배포했다"고 기록한다. 즉 최소한 그 시점에는 Vercel Git 연동이 실제 배포 경로였다.
   `deploy.yml`의 CLI 배포가 그 이후에도 계속 활성 상태라면, 하나의 `main` push가
   Git 연동과 CLI workflow 양쪽에서 중복 배포를 일으킬 수 있다. 이 세션에서는 Vercel
   프로젝트의 Git Integration 활성 여부를 계정 접근 없이 확인할 수 없었다 — `VERIFY_LIVE`.
5. `docs/HOSTING_COST_GUARDRAILS.md`의 Vercel Controls 5번은 "자동 CI에서 환경 보호·수동
   승인 없이 `vercel --prod`를 실행하지 말 것"이라고 명시한다. 현재 `deploy.yml`은 secret
   존재 여부만 확인하고 이 원칙에서 요구하는 별도의 수동 승인 게이트(GitHub Environment
   protection rule 등)를 사용하지 않는다.
6. `vercel add -g vercel@latest`로 항상 최신 CLI를 설치한다. 버전 고정이 없어 CLI 동작이
   시점에 따라 달라질 수 있다(재현성 저하).

## 해석하지 않는 것

- 이 workflow가 실제로 실행되어 배포가 실패했다는 증거는 이 세션에 없다 — Actions 실행
  로그를 조회하지 않았다.
- Vercel Git Integration이 현재도 활성 상태인지, 비활성화됐는지는 계정 접근 없이는
  확정할 수 없다.
- "배포 파이프라인이 현재 실패 중"이라고 주장하지 않는다.

## 제안 (PROPOSED, 승인 필요)

1. **Authoritative 배포 경로 확정.** Vercel 프로젝트 설정에서 Git Integration이 `main`에
   연결되어 있는지 먼저 확인한다(읽기 전용 조회). 연결되어 있다면:
   - `deploy.yml`의 `Deploy to Vercel` 스텝을 비활성화하거나, Git Integration을 끄고 CLI
     경로 하나만 유지하는 안 중 하나를 운영자가 선택해야 한다. 둘 다 켜두면 매 push마다
     중복 배포와 중복 알림(`notify-published.ts` 재실행)이 발생할 수 있다.
2. **CLI 경로를 유지할 경우** 공식 순서(`vercel pull` → `vercel build` → 산출물 검사 →
   `vercel deploy --prebuilt`)로 교체하는 안을 검토한다. 현재는 `next build`만 실행하고
   `vercel build`를 생략하므로 `--prebuilt`가 기대하는 입력과 다를 수 있다.
3. **품질 게이트 추가.** `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test`, 5개
   `pnpm audit:*` 명령을 `Deploy to Vercel` 스텝 이전에 실행하고, 실패 시 배포를 막는다.
4. **수동 승인 게이트.** GitHub Environment(`production`)의 required reviewers 기능으로
   `vercel deploy --prod` 스텝 앞에 승인 단계를 추가해 비용 가이드 5번 원칙과 정합화한다.
5. **CLI 버전 고정.** `vercel@latest` 대신 검증된 특정 버전을 고정한다.
6. **HANDOFF 갱신.** 위 조사 결과와 결정 대기 상태를 최신 HANDOFF에 반영하되, 과거
   "Git integration이 배포했다"는 기록은 삭제하지 않고 시점을 명시해 보존한다.

## 실행하지 않은 것

- `.github/workflows/deploy.yml` 수정
- Vercel 프로젝트 설정 조회·변경
- GitHub Actions 재실행, workflow_dispatch 트리거
- branch protection·environment 설정 변경

## 다음에 필요한 승인

Vercel 프로젝트 대시보드에서 Git Integration 활성 여부를 읽기 전용으로 확인할 수 있는
계정 접근 권한. 그 확인 없이는 위 제안 1을 구체적인 코드 변경(workflow 비활성화 등)으로
전환할 수 없다.
