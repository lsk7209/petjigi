/**
 * 애드센스 준비 상태 점검 항목. 코드로 판정 가능한 것만 PASS/BLOCKED, 외부 확인이 필요한 것은 UNKNOWN.
 * 점수·승인 확률은 만들지 않는다.
 */
import fs from "node:fs";
import path from "node:path";
import { DEFAULT_CONSENT } from "../lib/privacy/google-consent";
import {
  canLoadThirdParty,
  resolveThirdPartyRuntime,
} from "../lib/privacy/third-party-runtime";
import {
  evaluateBusinessDetailEligibility,
  evaluateContentEligibility,
  evaluateListingEligibility,
  type PageEligibility,
} from "../lib/seo/indexability-policy";
import { evaluateClaimEvidence } from "../lib/claim-evidence";
import { evaluateChangedHighRiskContent } from "../lib/content-risk-gate";
import { collectFindings } from "./audit-internal-links";
import { isHighRiskSeed, loadManifest } from "./audit-claim-evidence";
import { readSeedContents } from "./internal-link-inventory";

export type Status = "PASS" | "BLOCKED" | "UNKNOWN";
export interface Check {
  id: string;
  title: string;
  status: Status;
  detail: string;
}

const ROOT = process.cwd();
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const exists = (rel: string) => fs.existsSync(path.join(ROOT, rel));
const check = (
  id: string,
  title: string,
  ok: boolean,
  detail: string,
): Check => ({ id, title, status: ok ? "PASS" : "BLOCKED", detail });
const unknown = (id: string, title: string, detail: string): Check => ({
  id,
  title,
  status: "UNKNOWN",
  detail,
});

const POLICY_PAGES = [
  "about",
  "privacy",
  "advertising",
  "disclosure",
  "contact",
  "terms",
];

function adsIdChecks(): Check[] {
  const adsTxt = read("public/ads.txt");
  const layout = read("app/layout.tsx");
  const txtId = adsTxt.match(/pub-(\d+)/)?.[1];
  const layoutId = layout.match(
    /PRODUCTION_ADSENSE_ID\s*=\s*"ca-pub-(\d+)"/,
  )?.[1];
  return [
    check(
      "ads-txt",
      "ads.txt 존재 및 게시자 ID 일치",
      Boolean(txtId && txtId === layoutId),
      `ads.txt=${txtId ?? "없음"} layout=${layoutId ?? "없음"}`,
    ),
    check(
      "head-publisher-id",
      "head 게시자 ID가 production 런타임에서만 사용됨",
      /currentThirdPartyRuntime\(\)\s*===\s*"production"/.test(layout),
      "app/layout.tsx 런타임 게이트",
    ),
  ];
}

function policyPageChecks(): Check[] {
  const missing = POLICY_PAGES.filter((p) => !exists(`app/${p}/page.tsx`));
  const footer = read("components/layout/footer.tsx");
  const unlinked = POLICY_PAGES.filter((p) => !footer.includes(`"/${p}"`));
  return [
    check(
      "policy-pages",
      "필수 정책 페이지 존재",
      missing.length === 0,
      missing.join(", ") || POLICY_PAGES.join(", "),
    ),
    check(
      "footer-links",
      "푸터에서 정책 페이지 접근 가능",
      unlinked.length === 0,
      unlinked.join(", ") || "모두 연결",
    ),
  ];
}

function eligibilityInvariant(): Check {
  const cases: PageEligibility[] = [
    ...(["empty_confirmed", "not_collected", "available"] as const).flatMap(
      (state) =>
        [true, false].map((ambiguousRegion) =>
          evaluateListingEligibility({
            ambiguousRegion,
            status: { state },
            categoryId: 3,
          }),
        ),
    ),
    evaluateBusinessDetailEligibility({
      ambiguous: false,
      business: {},
      categoryId: 3,
    }),
    evaluateContentEligibility({ isPublic: false, redirected: false }),
    evaluateContentEligibility({ isPublic: true, redirected: true }),
  ];
  const bad = cases.filter(
    (c) =>
      !c.indexable &&
      (c.sitemapEligible || c.adEligible || c.structuredDataEligible),
  );
  return check(
    "indexability-invariant",
    "noindex 페이지는 sitemap·광고·JSON-LD 제외",
    bad.length === 0,
    `${cases.length}개 조합 검사`,
  );
}

function sourceChecks(): Check[] {
  const structured = read("lib/seo/structured-data.ts");
  const ga4 = read("components/analytics/ga4.tsx");
  const layout = read("app/layout.tsx");
  const loader = read("components/ads/adsense-loader.tsx");
  const allDenied = Object.values(DEFAULT_CONSENT).every((v) => v === "denied");
  const preview = resolveThirdPartyRuntime({ vercelEnv: "preview" });
  return [
    check(
      "structured-data",
      "JSON-LD canonical·날짜·자기권위 정합",
      /canonicalUrl/.test(structured) &&
        /resolveArticleDates/.test(structured) &&
        !/recognizingAuthority/.test(structured),
      "localBusiness canonicalUrl, Article 날짜 헬퍼, 자기권위 제거",
    ),
    check(
      "ga4-consent",
      "GA4/AdSense 전에 Consent Mode 기본 denied",
      allDenied &&
        layout.indexOf('id="google-consent-defaults"') <
          layout.indexOf("<GA4 />") &&
        !/allow_(google_signals|ad_personalization_signals):\s*true/.test(ga4),
      "4개 항목 denied, 로드 순서, 개인화 신호 제거",
    ),
    check(
      "preview-ads-off",
      "preview/local에서 실제 광고·GA4 차단",
      preview === "off" &&
        !canLoadThirdParty("production", "localhost") &&
        /useThirdPartyAllowed/.test(loader) &&
        /useThirdPartyAllowed/.test(ga4),
      "런타임+호스트 게이트",
    ),
    check(
      "zero-result-ad-block",
      "0건·오류 페이지 광고 차단",
      /eligibility\.adEligible[\s\S]{0,80}data-ads-policy/.test(
        read("app/[sigungu]/[type]/page.tsx"),
      ) && /data-ads-policy/.test(read("app/not-found.tsx")),
      "목록 eligibility 마커 + 404 마커",
    ),
  ];
}

function indexingApiCheck(): Check {
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(path.join(ROOT, dir), {
      withFileTypes: true,
    })) {
      const rel = `${dir}/${e.name}`;
      if (e.isDirectory()) walk(rel);
      else if (
        /\.(ts|tsx|mjs)$/.test(e.name) &&
        !/\.test\./.test(e.name) &&
        rel !== "lib/seo/google-indexing.ts" &&
        /notifyGoogle(Indexing|Batch)\s*\(/.test(read(rel))
      )
        offenders.push(rel);
    }
  };
  for (const d of ["app", "lib", "scripts", "etl", "components"]) walk(d);
  return check(
    "indexing-api",
    "일반 콘텐츠의 Indexing API 호출 경로 없음",
    offenders.length === 0,
    offenders.join(", ") || "호출처 없음",
  );
}

function contentChecks(): Check[] {
  const links = collectFindings().findings.filter(
    (f) => f.status !== "scheduled",
  );
  const seeds = readSeedContents().filter(
    (s) => s.status === "published" && isHighRiskSeed(s),
  );
  const manifest = loadManifest();
  const legacyGaps = seeds.filter(
    (s) =>
      evaluateChangedHighRiskContent({
        slug: s.slug,
        category: s.category,
        ymyl: s.ymyl,
        status: s.status,
        sourceCount: 1,
        disclaimer: "x",
        metaTitle: null,
        metaDescription: null,
        body: s.body,
      }).length > 0,
  ).length;
  const claims = seeds.map((s) =>
    evaluateClaimEvidence({
      bodyHtml: s.body,
      entry: manifest.entries.find((e) => e.slug === s.slug),
    }),
  );
  const manifestIssues = claims
    .flatMap((c) => c.issues)
    .filter((i) => i.code !== "UNTRACKED_RISKY_CLAIM").length;
  const open = claims.reduce(
    (n, c) => n + c.untracked.length + c.byStatus.needs_review,
    0,
  );
  return [
    check(
      "internal-links",
      "로컬 시드·코드 내부 링크 오류 0건",
      links.length === 0,
      `실패 ${links.length}건`,
    ),
    check(
      "claim-manifest",
      "claim manifest 정합(verified 근거·stale·removed)",
      manifestIssues === 0 && legacyGaps === 0,
      `manifest 이슈 ${manifestIssues}, 검토 표현·요도 대기 문구 ${legacyGaps}`,
    ),
    open > 0
      ? unknown(
          "claim-review",
          "YMYL 주장 원문 대조·전문가 검토",
          `미검증 위험 주장 ${open}건(untracked/needs_review) — 별도 검토 필요`,
        )
      : check("claim-review", "YMYL 주장 원문 대조", true, "미검증 없음"),
  ];
}

const EXTERNAL_UNKNOWNS: [string, string][] = [
  ["adsense-site-status", "AdSense 사이트 등록·심사 상태"],
  ["adsense-reject-reason", "거절 또는 주의 사유 원문"],
  ["policy-center", "Policy Center 상태"],
  ["cmp-activation", "Google 인증 CMP 계정 활성화"],
  ["ads-txt-recognized", "ads.txt 계정 인식 상태"],
  ["mailbox", "cs@petjigi.kr 실제 수신 가능 여부 (2026-10-12 읽기 전용 DNS 조회: MX·SPF·DMARC 레코드 없음 — 수신·발신 설정 확인 필요)"],
  ["resend-prod", "Resend 운영 발송 성공"],
  ["expert-review", "의학·법률·보험 전문가 검토"],
  ["google-index-state", "실제 Google URL 색인 상태"],
  [
    "sitemap-live",
    "운영 sitemap HTTP/canonical/noindex 정합 (pnpm audit:live 실행 필요)",
  ],
];

export function runChecks(): Check[] {
  return [
    ...adsIdChecks(),
    ...policyPageChecks(),
    eligibilityInvariant(),
    ...sourceChecks(),
    indexingApiCheck(),
    ...contentChecks(),
    check(
      "newsletter-fixture",
      "뉴스레터 구독·해지 fixture 테스트 존재",
      exists("tests/newsletter-flow.test.ts"),
      "tests/newsletter-flow.test.ts",
    ),
    ...EXTERNAL_UNKNOWNS.map(([id, title]) =>
      unknown(
        id,
        title,
        "코드로 확인 불가 — docs/adsense-account-manual-checklist.md 참조",
      ),
    ),
  ];
}
