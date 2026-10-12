# 의존성 보안 검증 — 2026-10-12

## 범위와 결과

사용자 지시로 기존 GitHub 경고의 실제 의존성 경로와 공개 사이트를 점검했다. 이 문서는 로컬 의존성 수정에 관한 기록이다. 커밋·push·배포·DB·Google 계정 변경·메일 수신 검사는 실행하지 않는다.

- GitHub API의 열린 Dependabot 경고는 33건이다. manifest별 중복 및 집계 방식이 있으므로 pnpm 결과와 같은 단위가 아니다.
- 수정 전 `pnpm audit --json`: 38건(critical2/high21/moderate13/low2). `--prod`: 11건(critical1/high4/moderate5/low1).
- Next와 eslint-config-next를 16.3.5에서 16.3.8로 맞췄다. Next의 sharp는 0.35.5로 해소됐다. 새 직접 의존성은 추가하지 않았다.
- esbuild, js-yaml, brace-expansion, postcss, nanoid, fast-uri, ip-address, source-map-js, proxy-addr, @modelcontextprotocol/sdk만 부모의 허용 범위 내에서 전이 의존성을 갱신했다. major 강제 override는 추가하지 않았다.
- 수정 후 전체 audit: 3건(critical0/high1/moderate2/low0). prod audit: 2건(high1/moderate1). prod 분류는 package.json 등록 위치이며 실제 서버 실행 경로와 같지 않다.

## 영향과 남은 경고

Next Critical은 Node의 `next/og` ImageResponse에 공격자가 제어하는 SVG 입력이 들어가는 조건에서 발생한다. 이 프로젝트는 ImageResponse를 사용하고 일부 제목은 DB에서 읽는다. 패키지 영향은 확인했으나 운영에서 취약점 악용 가능성 또는 침해를 입증한 것은 아니다. 16.3.8은 해당 수정 및 이미지 최적화 등 추가 6개 보안 수정을 포함한다.

sharp 취약점은 glibc Linux의 특정 SVG 처리 조건과 관계가 있다. 이 프로젝트의 `dangerouslyAllowSVG`는 false지만 해당 설정만으로 모든 내부 라이브러리 사용의 안전성을 단정하지 않는다. proxy-addr Critical은 shadcn→MCP SDK→express의 개발 도구 경로였고, 잘못 설정한 IPv4-mapped IPv6 trust prefix가 악용 조건이다. 둘 다 수정 버전으로 해소했다.

남은 항목:

1. **braces 3.0.3 / High** — eslint-config-next와 next-sitemap의 fast-glob→micromatch. 중첩 패턴의 스택 고갈. 공식 수정 버전이 없다. 현행 사이트맵·lint는 저장소의 고정 패턴을 사용하며 공개 요청을 이 도구로 전달하는 경로를 확인하지 못했다. 신뢰할 수 없는 패턴을 빌드 도구에 넣지 않는다. 후속 수정 릴리스를 추적한다.
2. **esbuild 0.18.20 / Moderate** — drizzle-kit→구형 esm-loader. 개발 서버 `serve` 기능의 CORS 문제. 공개 Next 서버 경로가 아니며 해당 esbuild serve를 실행하지 않는다. 부모 도구의 호환 가능한 수정 전까지 무리한 major override를 하지 않는다.
3. **postcss-selector-parser 6.0.10 / Moderate** — @tailwindcss/typography의 CSS 빌드. 수정 버전 7.1.6은 부모의 6.x 범위 밖이다. 신뢰할 수 없는 CSS를 파싱하는 공개 경로는 확인하지 못했다. 호환성 검증 없이 major override를 넣지 않는다.

## 공식 근거

- [Next Critical advisory](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j)
- [Next 16.3.8 보안 수정](https://github.com/vercel/next.js/releases/tag/v16.3.8)
- [sharp advisory](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w)
- [proxy-addr advisory](https://github.com/jshttp/proxy-addr/security/advisories/GHSA-jqcg-44mw-7w3h)
- [braces 미수정 advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)

## 증거와 검증

원본·최종 audit, GitHub 경고 원본 및 업데이트 로그는 `.seo-cache/security-*-20261012.*`와 `.seo-cache/dependabot-20261012.json`에 보존한다. `pnpm install --lockfile-only --frozen-lockfile` 통과. 단위 테스트460/460, lint·타입 검사 통과. 격리 production 빌드와 브라우저 회귀113/113(광고12·기본42·주장5·가이드29·사용성25) 통과. 빌드가 임시 추가한 tsconfig 경로는 러너가 원본으로 복원했다.

독립 코드 리뷰는 manifest/lock 일치, 잠금 그래프 누락 없음, 변경된 의존성의 부모 허용 범위·무결성, 잔여 경고 해석을 확인했고 패치 범위 PASS를 보고했다. 게시자가 변경한 선택적 전이 의존성의 major 변경은 있으나 강제 범위 override는 없다. 취약점 0건을 달성한 것은 아니다.

운영 배포는 이번에 수행하지 않았으므로 운영 서버는 기존 의존성 상태이다. 로컬 audit 감소를 GitHub 경고 해소 또는 운영 보안 패치 완료로 해석하지 않는다.
