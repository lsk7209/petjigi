import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import ts from "typescript";
import {
  evaluateChangedHighRiskContent,
  includeEntireFiles,
  parseAddedLineRanges,
  rangesOverlap,
} from "../lib/content-risk-gate";
import { sourceValues } from "../lib/content-seed-parser";
import { MEMORIAL_AUTO_ADS_EXCLUDED_PATHS } from "../lib/memorial-auto-ads-paths";
import { isAutoAdsEligiblePath } from "../lib/ads-policy";
import { findUnsafeMetadataTitleSuffixes } from "../lib/seo/metadata-audit";
import { SITE_IDENTITY } from "../lib/site-identity";

type AuditKind = "content" | "content-gate" | "sources" | "data" | "seo" | "ads";

interface ContentRecord {
  file: string;
  id: string | null;
  slug: string;
  type: string | null;
  title: string | null;
  category: number | null;
  status: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  disclaimer: string | null;
  ymyl: boolean | null;
  reviewerName: string | null;
  reviewedAt: string | null;
  sourceCount: number;
  sources: string[];
  body: string | null;
  startLine: number;
  endLine: number;
}

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "docs", "petjigi-improvement");
const SEED_DIR = path.join(ROOT, "db", "seeds");

function walk(dir: string, extension: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(target, extension);
    return entry.isFile() && entry.name.endsWith(extension) ? [target] : [];
  });
}

function propertyMap(node: ts.ObjectLiteralExpression): Map<string, ts.Expression> {
  const result = new Map<string, ts.Expression>();
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : null;
    if (name) result.set(name, prop.initializer);
  }
  return result;
}

function stringValue(expression: ts.Expression | undefined): string | null {
  if (!expression) return null;
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
  return null;
}

function numberValue(expression: ts.Expression | undefined): number | null {
  return expression && ts.isNumericLiteral(expression) ? Number(expression.text) : null;
}

function booleanValue(expression: ts.Expression | undefined): boolean | null {
  if (!expression) return null;
  if (expression.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (expression.kind === ts.SyntaxKind.FalseKeyword) return false;
  return null;
}

function inventory(): ContentRecord[] {
  const rows: ContentRecord[] = [];
  for (const file of walk(SEED_DIR, ".ts")) {
    const sourceText = fs.readFileSync(file, "utf8");
    const source = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);
    const visit = (node: ts.Node) => {
      if (ts.isObjectLiteralExpression(node)) {
        const props = propertyMap(node);
        const slug = stringValue(props.get("slug"));
        const title = stringValue(props.get("title"));
        if (slug && title && props.has("body")) {
          const sources = sourceValues(props.get("sources"));
          rows.push({
            file: path.relative(ROOT, file).replaceAll("\\", "/"),
            id: stringValue(props.get("id")),
            slug,
            type: stringValue(props.get("type")),
            title,
            category: numberValue(props.get("category")),
            status: stringValue(props.get("status")),
            publishedAt: stringValue(props.get("publishedAt")),
            updatedAt: stringValue(props.get("updatedAt")),
            metaTitle: stringValue(props.get("metaTitle")),
            metaDescription: stringValue(props.get("metaDescription")),
            disclaimer: stringValue(props.get("disclaimer")),
            ymyl: booleanValue(props.get("ymyl")),
            reviewerName: stringValue(props.get("reviewerName")),
            reviewedAt: stringValue(props.get("reviewedAt")),
            sourceCount: sources.length,
            sources,
            body: stringValue(props.get("body")),
            startLine: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
            endLine: source.getLineAndCharacterOfPosition(node.getEnd()).line + 1,
          });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return rows.sort((a, b) => a.slug.localeCompare(b.slug, "en"));
}

function contentGate(records: ContentRecord[]) {
  const baseArg = process.argv.find((arg) => arg.startsWith("--base="));
  const base = baseArg?.slice("--base=".length) || "HEAD";
  if (!/^[A-Za-z0-9._/~-]+$/.test(base)) {
    throw new Error("Invalid --base revision");
  }

  const diff = execFileSync(
    "git",
    ["diff", "--unified=0", "--no-ext-diff", base, "--", "db/seeds"],
    { cwd: ROOT, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }
  );
  const untrackedFiles = execFileSync(
    "git",
    ["ls-files", "--others", "--exclude-standard", "--", "db/seeds"],
    { cwd: ROOT, encoding: "utf8" }
  ).split(/\r?\n/).filter(Boolean);
  const changedRanges = includeEntireFiles(parseAddedLineRanges(diff), untrackedFiles);
  const changedRecords = records.filter((record) =>
    rangesOverlap(record.startLine, record.endLine, changedRanges.get(record.file) ?? [])
  );
  const evaluated = changedRecords.map((record) => ({
    record,
    issues: evaluateChangedHighRiskContent(record),
  }));
  const blockers = evaluated.filter((entry) => entry.issues.length > 0);

  writeCsv(
    "content-gate-dry-run.csv",
    ["content_id", "url", "file", "status", "high_risk", "result", "issues"],
    evaluated.map(({ record, issues }) => [
      record.id,
      `/${record.type === "blog" ? "blog" : record.type === "condition" ? "condition" : "guide"}/${record.slug}`,
      record.file,
      record.status,
      record.ymyl || [3, 4, 6].includes(record.category ?? -1),
      issues.length === 0 ? "PASS_OR_NOT_APPLICABLE" : "BLOCK",
      issues.join("|"),
    ])
  );

  return {
    base,
    changedRecords: changedRecords.length,
    blockers: blockers.length,
    note: "Only added/modified seed records are gated; unchanged legacy gaps remain audit-only.",
  };
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = String(value).replaceAll("\r", " ").replaceAll("\n", " ");
  return /[",]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filename: string, headers: string[], rows: unknown[][]): void {
  const invalidRow = rows.findIndex((row) => row.length !== headers.length);
  if (invalidRow >= 0) {
    throw new Error(`${filename}: row ${invalidRow + 2} has ${rows[invalidRow].length} columns; expected ${headers.length}`);
  }
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const output = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
  fs.writeFileSync(path.join(REPORT_DIR, filename), output, "utf8");
}

function contentAudit(records: ContentRecord[]) {
  const publicUrl = (record: ContentRecord): string =>
    `/${record.type === "blog" ? "blog" : record.type === "condition" ? "condition" : "guide"}/${record.slug}`;
  const contentVersion = (record: ContentRecord): string => `sha256:${createHash("sha256").update(JSON.stringify({
    title: record.title,
    body: record.body,
    sources: record.sources,
    updatedAt: record.updatedAt,
  })).digest("hex")}`;
  writeCsv("content-inventory.csv", [
    "content_id", "url", "type", "title", "category", "status", "published_at", "updated_at",
    "content_hash", "source_count", "review_state", "primary_intent", "gsc_clicks", "gsc_impressions",
    "gsc_window", "gsc_available", "proposed_action", "reason", "evidence", "approval_needed",
  ], records.map((r) => [
    r.id, publicUrl(r),
    r.type, r.title, r.category, r.status, r.publishedAt, r.updatedAt,
    contentVersion(r),
    r.sourceCount,
    r.reviewedAt && r.reviewerName ? "EDITORIAL_RECORD_PRESENT_EXPERT_STATUS_UNVERIFIED" : "UNVERIFIED",
    "not_semantically_classified", null, null, null, false, "NEEDS_HUMAN_REVIEW",
    "Repository seed inventory only; body value and source support require separate review", r.file, true,
  ]));

  const groups = <T>(keyFor: (record: ContentRecord) => T) => {
    const grouped = new Map<T, ContentRecord[]>();
    for (const record of records) {
      const key = keyFor(record);
      grouped.set(key, [...(grouped.get(key) ?? []), record]);
    }
    return [...grouped.entries()].filter(([, matches]) => matches.length > 1);
  };
  const duplicateUrlRows = groups(publicUrl).map(([url, matches], index) => [
    `URL-${String(index + 1).padStart(3, "0")}`,
    "duplicate public URL",
    matches.map((record) => `${record.id}:${url}`).join(";"),
    "NEEDS_HUMAN_REVIEW",
    `${matches.length} repository records declare the same public URL; deployment precedence and unique information are not inferred`,
    "repository_static_scan",
    "Compare complete records and production selection behavior before merge, retirement, or redirect",
    true,
  ]);
  const duplicateTitleRows = groups((record) => record.title?.trim().replaceAll(/\s+/g, " ").toLocaleLowerCase("ko-KR") ?? "")
    .filter(([title, matches]) => title && new Set(matches.map(publicUrl)).size > 1)
    .map(([title, matches], index) => [
      `TITLE-${String(index + 1).padStart(3, "0")}`,
      title,
      matches.map((record) => publicUrl(record)).join(";"),
      "NEEDS_HUMAN_REVIEW",
      "Exact normalized title match only; title equality does not prove equivalent content or intent",
      "repository_static_scan",
      "Compare audience, question, unique information, and tools before choosing an action",
      true,
    ]);
  const exactContentRows = groups(contentVersion)
    .filter(([, matches]) => new Set(matches.map(publicUrl)).size > 1)
    .map(([, matches], index) => [
      `HASH-${String(index + 1).padStart(3, "0")}`,
      "exact repository content hash",
      matches.map((record) => publicUrl(record)).join(";"),
      "MERGE_CANDIDATE",
      "Title, body, sources, and updatedAt have the same deterministic hash across different URLs",
      "repository_static_scan",
      "Preserve unique information and review canonical/redirect purpose before applying",
      true,
    ]);
  const semanticPriorityRows = [
    ["TOPIC-001", "응급처치", "/guide/pet-first-aid-guide;/blog/pet-emergency-vet-preparation", "NEEDS_HUMAN_REVIEW", "준비 체크리스트와 현장 응급 대응은 독립 가치가 있을 수 있음", "curated_priority_candidate", "본문 질문과 고유 정보를 비교", true],
    ["TOPIC-002", "동물등록", "/blog/pet-registration-guide;/category/adoption", "IMPROVE", "법령 안내 글과 탐색 허브의 목적이 다름", "curated_priority_candidate", "대표 법령 문서의 최신성 검토", false],
    ["TOPIC-003", "보험 비교", "/insurance/compare;/insurance", "NEEDS_HUMAN_REVIEW", "비교표와 제도 안내의 의도가 다름", "curated_priority_candidate", "판매 상태와 약관 버전 확인", true],
  ];
  writeCsv("duplicate-clusters.csv", [
    "cluster_id", "topic", "urls", "classification", "reason", "evidence_status", "recommended_action", "approval_required",
  ], [...duplicateUrlRows, ...duplicateTitleRows, ...exactContentRows, ...semanticPriorityRows]);

  const highRisk = records.filter((r) => r.ymyl || [3, 4, 6].includes(r.category ?? -1));
  const missingSources = highRisk.filter((r) => r.sourceCount === 0);
  return {
    records: records.length,
    highRisk: highRisk.length,
    missingSources: missingSources.length,
    missingSourcesPublished: missingSources.filter((r) => r.status === "published").length,
    missingSourcesReviewQueue: missingSources.filter((r) => r.status === "review_queue").length,
    expertReviewProvable: 0,
    duplicateUrlGroups: duplicateUrlRows.length,
    duplicateTitleGroups: duplicateTitleRows.length,
    exactContentGroups: exactContentRows.length,
    note: "Machine inventory only; semantic and expert review are not complete.",
  };
}

function sourceAudit(records: ContentRecord[]) {
  const candidates = [
    "dog-disc-disease", "cat-grooming-basics-guide", "pet-food-rotation-guide",
    "puppy-first-week-guide", "pet-first-aid-guide", "pet-registration-guide", "pet-emergency-vet-preparation",
    "pet-emergency-kit-guide", "pet-toxic-plants-dog-guide", "pet-toxic-plants-cat-guide",
    "dog-flea-tick-guide", "cat-flea-tick-prevention", "dog-heartworm-treatment-guide",
    "dog-dental-scaling-guide", "cat-anal-gland-guide", "dog-anal-gland-express-guide",
    "cat-summer-safety-guide", "dog-eye-care-guide", "dog-summer-paw-protection",
    "dog-paw-care-guide", "dog-skin-care-guide", "pet-vet-visit-guide",
    "online-vet-consultation-guide", "pet-allergy-season-guide", "pet-human-allergy-guide",
    "dog-patellar-luxation-stages", "dog-patellar-luxation", "dog-heartworm-disease",
    "cat-vomiting-causes", "dog-skin-allergy-guide", "cat-kidney-disease-guide",
    "dog-separation-anxiety-disorder", "cat-urinary-tract-disease", "dog-obesity-management",
    "dog-joint-arthritis", "cat-dental-disease",
  ];
  const checkedSourceRows = [
    ["cat-grooming-basics-guide", "blog-166", "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/danger-hairballs", "The Danger of Hairballs", "Cornell University College of Veterinary Medicine", "", "daily-combing recommendation", "daily combing and hairball prevention; no 50 percent reduction located", "PARTIAL", "official_page_read", "2026-09-12", "repository-seed", "General brushing guidance supported; exact 50 percent reduction removed"],
    ["dog-disc-disease", "seed-condition-dog-disc-disease", "https://wsava.org/wp-content/uploads/2021/12/WSAVA_Singapore_2018_Abstracts.pdf", "WSAVA Singapore 2018 Abstracts", "WSAVA", "2018", "CT and IVDD discussion", "CT can investigate IVDD; no universal most-accurate ranking", "PARTIAL", "official_pdf_search", "2026-09-12", "repository-seed", "Absolute CT ranking removed; modality choice left to veterinarian"],
    ["pet-registration-guide", "blog-pet-registration-guide", "https://www.mafra.go.kr/bbs/home/792/596971/download.do", "반려동물을 가족으로 맞이하기 위한 첫걸음, 동물등록하세요!", "농림축산식품부", "2026-04-29", "본문 1쪽", "2개월령 이상 반려견, 등록 방식, 변경 신고, 법정 과태료 상한", "SUPPORTED", "official_pdf_read", "2026-09-12", "repository-seed", "현행 안내에 맞춰 2개 등록 방식과 변경 신고 경로로 수정"],
    ["pet-registration-guide", "blog-pet-registration-guide", "https://www.law.go.kr/LSW/flDownload.do?bylClsCd=110201&flSeq=151937599&gubun=", "동물보호법 시행령 별표 4", "국가법령정보센터", "2024-04-26", "별표 4 라목·마목", "미등록 1·2·3차 이상 및 변경 신고 위반 과태료 기준", "SUPPORTED", "official_pdf_read", "2026-09-12", "repository-seed", "법 제15조와 미등록·변경 신고 과태료를 구분해 반영"],
    ["insurance-compare", "route-insurance-compare", "https://platform.hi.co.kr/service.do?m=78ee531539&petType=D", "굿앤굿우리펫보험", "현대해상", "", "공식 상품 페이지", "상품명, 판매 채널, 가입 연령과 가입 제한", "SUPPORTED", "official_page_read", "2026-09-12", "route-source", "기존 하이펫·점유율 1위·추천 표현 제거"],
    ["insurance-compare", "route-insurance-compare", "https://www.idbins.com/pc/bizxpress/pb/ppb/app/FWMAIV1544.shtm", "보험상품 공시", "DB손해보험", "", "상품 공시", "반려동물·판매 채널별 상품 구분", "PARTIAL", "official_page_read", "2026-09-12", "route-source", "채널별 상세 조건은 가입 시점 공시에서 재확인 필요"],
    ["insurance-compare", "route-insurance-compare", "https://www.kbinsure.co.kr/CG803000012.ec", "상품공시", "KB손해보험", "", "상품 공시", "KB 금쪽같은 펫보험 상품군", "PARTIAL", "official_page_read", "2026-09-12", "route-source", "채널·계약 유형·인수 조건에 따라 달라짐"],
    ["insurance-compare", "route-insurance-compare", "https://www.samsungfire.com/product/P_P02_09_01_124.html", "애니펫", "삼성화재", "", "공식 상품 페이지", "상품명과 상품별 계약 조건", "PARTIAL", "official_page_read", "2026-09-12", "route-source", "기존 최고 보장·상황별 추천 표현 제거"],
    ["insurance-compare", "route-insurance-compare", "", "한화손해보험 펫보험", "한화손해보험", "", "공식 판매 페이지 미확인", "현재 판매 상품·조건", "UNVERIFIED", "official_site_search", "2026-09-12", "route-source", "기존 레저펫 상품·배상책임·추천 정보를 노출하지 않음"],
    ["insurance-compare", "route-insurance-compare", "https://store.meritzfire.com/pet/product.do", "펫퍼민트", "메리츠화재", "", "공식 상품 페이지", "상품명과 다이렉트 채널 조건", "PARTIAL", "official_page_read", "2026-09-12", "route-source", "기존 퍼피라이프·고령 특화 추천 표현 제거"],
    ["puppy-first-week-guide", "blog-puppy-first-week-guide", "https://ebusiness.avma.org/files/productdownloads/SelectDog_En.pdf", "Selecting a Dog", "American Veterinary Medical Association", "", "When you acquire a pet", "Veterinary examination should be scheduled as soon as possible; no 48-72 hour rule located", "PARTIAL", "official_pdf_read", "2026-09-12", "repository-seed", "Unsupported 48-72 hour attribution replaced with the source's actual non-numeric guidance"],
    ["pet-food-rotation-guide", "blog-155", "https://pubmed.ncbi.nlm.nih.gov/23176236/", "Assessment of commercial diets and recipes for home-prepared diets recommended for dogs with cancer", "JAVMA / PubMed", "2012-12-01", "bibliographic record", "This Heinze paper concerns diets recommended for dogs with cancer, not rotation feeding benefits", "CONTRADICTED", "official_bibliographic_record", "2026-09-12", "repository-seed", "False attribution removed; rotation benefit claims rewritten as unverified considerations"],
    ["pet-food-rotation-guide", "blog-155", "https://www.aafco.org/consumers/understanding-pet-food/selecting-the-right-pet-food", "Selecting the Right Pet Food", "AAFCO", "", "Life Stage and Condition", "Nutritional adequacy should match species, life stage, and condition", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Used only for label and nutritional-adequacy guidance, not to claim rotation benefits"],
    ["pet-first-aid-guide", "seed-guide-pet-first-aid", "https://www.redcross.org/take-a-class/resources/learn-pet-first-aid", "Learn Pet First Aid for Emergencies", "American Red Cross", "", "Course and app overview", "Supports general emergency preparation topics but does not identify a 2023 manual edition", "PARTIAL", "official_page_read", "2026-09-12", "repository-seed", "Unverified manual edition removed"],
    ["pet-first-aid-guide", "seed-guide-pet-first-aid", "https://www.bsava.com/wp-content/uploads/2026/01/21289-Publications-Catalogue-2026-A5-Landscape.pdf", "BSAVA Publications Catalogue 2026", "BSAVA", "2026", "Veterinary nursing catalogue entry", "Manual of Practical Animal Care is listed as published 2007 and reprinted with updates, not 3rd ed. 2022", "CONTRADICTED", "official_catalogue_read", "2026-09-12", "repository-seed", "Edition and publication year corrected"],
    ["pet-emergency-vet-preparation", "blog-453", "https://www.aaha.org/resources/help-is-this-a-pet-emergency/", "Help! Is This a Pet Emergency?", "AAHA", "2024-09-05", "Emergency signs list", "Repeated vomiting/diarrhea, altered responsiveness, seizures, bleeding and breathing difficulty warrant prompt veterinary care", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Article category corrected from insurance/legal to health; emergency wording narrowed"],
    ["pet-emergency-vet-preparation", "blog-453", "https://ebusiness.avma.org/files/ProductDownloads/mcm-client-brochures-pet-first-aid-2025.pdf", "Pet First Aid", "AVMA", "2025", "Seizure and poisoning first-aid sections", "Time a seizure, avoid the mouth, contact a veterinarian; do not induce vomiting or medicate without direction", "SUPPORTED", "official_pdf_read", "2026-09-12", "repository-seed", "Unsupported universal five-minute cutoff and ambiguous poison-service direction removed"],
    ["pet-emergency-kit-guide", "blog-164", "https://ebusiness.avma.org/files/ProductDownloads/mcm-client-brochures-pet-first-aid-2025.pdf", "Pet First Aid", "AVMA", "2025", "Bleeding, poisoning, heatstroke and preparation sections", "Supports veterinary contact, safe transport, bleeding pressure, no unsupervised vomiting or medication, and cooling without ice-cold water", "SUPPORTED", "official_pdf_read", "2026-09-12", "repository-seed", "Unsupported survival comparison and arbitrary five-minute threshold removed"],
    ["pet-emergency-kit-guide", "blog-164", "https://ebusiness.avma.org/files/productdownloads/LR_COM_FirstAid_010816.pdf", "Pet First Aid Kit Checklist", "AVMA", "", "First aid kit checklist", "Supports emergency contacts, records, gauze, bandage, saline, thermometer, scissors, towel and transport supplies", "SUPPORTED", "official_pdf_read", "2026-09-12", "repository-seed", "Used for preparation items only, not treatment-outcome claims"],
    ["pet-toxic-plants-dog-guide", "blog-199", "https://www.aspca.org/pet-care/animal-poison-control/dogs-plant-list", "Toxic and Non-Toxic Plant List — Dogs", "ASPCA", "", "Dog toxic-plant index", "Supports species-specific toxic membership for named plants; not universal dose, timing, or severity claims", "PARTIAL", "official_page_read", "2026-09-12", "repository-seed", "Unsupported 25 percent ranking, xylitol-plant category and 30-minute threshold removed"],
    ["pet-toxic-plants-cat-guide", "blog-200", "https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants", "Toxic and Non-Toxic Plants", "ASPCA", "", "Species-filtered plant database", "Supports checking exact plant and animal species and urgent poison/veterinary contact", "PARTIAL", "official_page_read", "2026-09-12", "repository-seed", "Article renamed as a major-plant list rather than a complete list"],
    ["pet-toxic-plants-cat-guide", "blog-200", "https://www.merckvetmanual.com/toxicology/poisonous-plants/houseplants-and-ornamentals-toxic-to-animals", "Houseplants and Ornamentals Toxic to Animals", "Merck Veterinary Manual", "", "Lily toxicity section", "True Lilium and Hemerocallis lilies can cause acute kidney injury in cats; plants merely called lily may have different toxicities", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Overbroad all-lilies statement and unverified 18-hour treatment threshold removed"],
    ["dog-flea-tick-guide", "blog-167", "https://www.fda.gov/consumers/consumer-updates/safe-use-flea-and-tick-products-pets", "Safe Use of Flea and Tick Products in Pets", "U.S. FDA", "", "Species, life stage, weight, label and adverse-event sections", "Supports product-label matching and separation until topical products dry; not universal application intervals", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unsupported egg count and universal product durations removed"],
    ["dog-flea-tick-guide", "blog-167", "https://www.epa.gov/pets/controlling-fleas-and-ticks-your-pet", "Controlling Fleas and Ticks on Your Pet", "U.S. EPA", "", "Product selection and use section", "Never use dog products on cats or cat products on dogs; follow the label", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Reversed permethrin species warning corrected"],
    ["cat-flea-tick-prevention", "blog-168", "https://www.fda.gov/consumers/consumer-updates/safe-use-flea-and-tick-products-pets", "Safe Use of Flea and Tick Products in Pets", "U.S. FDA", "", "Multi-pet household and label sections", "Supports species-specific selection and separating animals until a topical product dries", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Universal 24-hour separation replaced with label-specific guidance"],
    ["cat-flea-tick-prevention", "blog-168", "https://capcvet.org/guidelines/fleas/", "Fleas", "Companion Animal Parasite Council", "", "Control strategy", "Supports treating pets and managing the environment; not a universal 60 C wash or two-week re-dose", "PARTIAL", "official_page_read", "2026-09-12", "repository-seed", "Unverified number-one ranking and fixed retreatment instructions removed"],
    ["dog-heartworm-treatment-guide", "blog-170", "https://www.heartwormsociety.org/veterinary-resources/american-heartworm-society-guidelines/canine", "Canine Guidelines", "American Heartworm Society", "", "Current canine guideline landing page", "Supports veterinarian-directed diagnosis, staged treatment, three-dose melarsomine protocol and exercise restriction", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unsupported 95 percent cure claim removed"],
    ["dog-heartworm-treatment-guide", "blog-170", "https://www.heartwormsociety.org/veterinary-resources/american-heartworm-society-guidelines", "American Heartworm Society Guidelines", "American Heartworm Society", "", "Guideline version statement", "Guidelines are living documents and posted versions supersede prior editions", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Fixed six-month follow-up statement replaced with current-guideline and veterinarian direction"],
    ["dog-dental-scaling-guide", "blog-231", "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/", "2019 AAHA Dental Care Guidelines for Dogs and Cats", "AAHA", "2019-05-06", "Guideline overview and procedure sections", "Supports anesthetized oral evaluation, radiography, scaling and individualized treatment planning", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unsupported prevalence, tooth-loss, fixed interval, price and anesthesia mortality claims removed"],
    ["cat-anal-gland-guide", "blog-232", "https://www.merckvetmanual.com/digestive-system/diseases-of-the-rectum-and-anus/anal-sac-disease-in-dogs-and-cats", "Anal Sac Disease in Dogs and Cats", "Merck Veterinary Manual", "2025-08", "Clinical findings, diagnosis and treatment", "Supports disease categories, clinical signs and veterinarian-directed expression, flushing, medication or surgery", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unverified WSAVA risk-factor and fixed treatment-duration claims removed"],
    ["dog-anal-gland-express-guide", "blog-233", "https://www.merckvetmanual.com/digestive-system/diseases-of-the-rectum-and-anus/anal-sac-disease-in-dogs-and-cats", "Anal Sac Disease in Dogs and Cats", "Merck Veterinary Manual", "2025-08", "Clinical findings, diagnosis and treatment", "Supports professional assessment and gentle expression when indicated; not a universal home schedule", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unverified home procedure, prevalence ratio and fixed expression intervals removed"],
    ["cat-summer-safety-guide", "blog-162", "https://www.merckvetmanual.com/news/editorial/2025/05/28/17/27/protecting-pets-during-hot-summer-months", "Protecting Pets During Hot Summer Months", "Merck Veterinary Manual", "2025-05-28", "Heatstroke signs and initial response", "Supports symptom-based emergency recognition, gradual cooling with cool water and prompt veterinary care", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unsupported temperature thresholds and fixed room settings removed"],
    ["dog-eye-care-guide", "blog-163", "https://www.merckvetmanual.com/dog-owners/eye-disorders-of-dogs/disorders-of-the-cornea-in-dogs", "Disorders of the Cornea in Dogs", "Merck Veterinary Manual", "2024-09", "Corneal inflammation and ulcer sections", "Supports prompt evaluation of pain, watering, squinting, cloudiness and injury; discharge colour alone is not a diagnosis", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Colour diagnosis and 48-hour wait removed"],
    ["dog-summer-paw-protection", "blog-198", "https://www.aaha.org/resources/how-to-protect-dog-paws-from-hot-pavement/", "How to Protect Your Dog's Paws from Hot Pavement", "AAHA", "2026-06-12", "Pavement test, burn signs and initial response", "Supports checking the actual surface, cooler routes, cool-water rinsing and veterinary consultation", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Fabricated five-second and 80-percent claims plus rigid clock rules removed"],
    ["dog-paw-care-guide", "blog-161", "https://www.aaha.org/resources/how-to-protect-dog-paws-from-hot-pavement/", "How to Protect Your Dog's Paws from Hot Pavement", "AAHA", "2026-06-12", "Pavement test, burn signs and initial response", "Supports actual-surface checks, cooler routes, cool-water rinsing and veterinary contact", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Universal temperature, five-second, ten-minute and product-frequency rules removed"],
    ["dog-skin-care-guide", "blog-165", "https://www.merckvetmanual.com/integumentary-system/atopic-skin-conditions-in-dogs-and-cats/atopic-dermatitis-in-dogs", "Atopic Dermatitis in Dogs", "Merck Veterinary Manual", "2026-05", "Diagnosis and management", "Supports multifactorial diagnosis and individualized management; not universal breed, site or bathing rules", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unverified top-five ranking, pH numbers and fixed schedules removed"],
    ["dog-skin-care-guide", "blog-165", "https://www.merckvetmanual.com/dog-owners/skin-disorders-of-dogs/itching-pruritus-in-dogs", "Itching (Pruritus) in Dogs", "Merck Veterinary Manual", "", "Causes and veterinary evaluation", "Supports veterinary evaluation for persistent or significant itching and associated lesions", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unsafe two-week wait removed"],
    ["pet-vet-visit-guide", "blog-169", "https://www.aaha.org/resources/preparing-your-pet-for-a-successful-veterinary-visit/", "Preparing Your Pet for a Successful Veterinary Visit", "AAHA", "2026-02-10", "Carrier acclimation and previsit preparation", "Supports familiar carriers, bedding, treats and advance discussion of severe fear or anxiety", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unverified AVMA statistic and fixed acclimation period removed"],
    ["pet-vet-visit-guide", "blog-169", "https://www.aaha.org/resources/2020-aaha-anesthesia-and-monitoring-guidelines-for-dogs-and-cats/phase-2-day-of-anesthesia/step-1-anesthesia-begins-at-home/", "Anesthesia Begins at Home", "AAHA", "2020", "Day-of-anesthesia preparation", "Fasting and medication instructions depend on the anesthesia team and patient", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Universal fasting statements removed"],
    ["online-vet-consultation-guide", "blog-213", "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=259085", "수의사법", "국가법령정보센터", "2024-07-24", "제12조 및 제41조", "직접 진료하지 않은 처방대상 동물용 의약품 처방·투약 제한", "SUPPORTED", "official_law_read", "2026-09-12", "repository-seed", "Unverified usage statistics, market projections and platform listings removed"],
    ["online-vet-consultation-guide", "blog-213", "https://ebusiness.avma.org/files/ProductDownloads/mcm-client-brochures-pet-first-aid-2025.pdf", "Pet First Aid", "AVMA", "2025", "Emergency signs and first response", "Supports direct emergency contact and transport rather than waiting for online advice", "SUPPORTED", "official_pdf_read", "2026-09-12", "repository-seed", "Fixed intake threshold removed"],
    ["pet-allergy-season-guide", "blog-197", "https://www.merckvetmanual.com/integumentary-system/atopic-skin-conditions-in-dogs-and-cats/atopic-dermatitis-in-dogs", "Atopic Dermatitis in Dogs", "Merck Veterinary Manual", "2026-05", "Diagnosis and treatment", "Supports history and exclusion-based diagnosis, individualized multimodal management, bathing and allergen-specific immunotherapy", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unsupported prevalence, ranking, calendar and universal medication claims removed"],
    ["pet-human-allergy-guide", "blog-234", "https://www.niehs.nih.gov/health/topics/agents/allergens/pets", "Pet Allergens", "National Institute of Environmental Health Sciences", "", "Allergen sources and preventive strategies", "Supports protein allergen scope, lack of hypoallergenic breeds, bedroom separation, HEPA filtration and cleaning", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "Unsupported prevalence and fixed reduction percentages removed"],
    ["pet-human-allergy-guide", "blog-234", "https://www.aaaai.org/conditions-treatments/allergies/pet-allergy", "Pet Allergy", "American Academy of Allergy, Asthma & Immunology", "", "Symptoms, diagnosis and management", "Supports symptom list, allergist testing, bedroom exclusion and individualized treatment", "SUPPORTED", "official_page_read", "2026-09-12", "repository-seed", "No guaranteed coexistence or treatment outcome claimed"],
    ["dog-patellar-luxation-stages", "cond-dog-patellar-luxation", "https://www.acvs.org/small-animal/patellar-luxations/", "Patellar Luxation (Dislocating Kneecap) in Dogs", "American College of Veterinary Surgeons", "", "Grading, diagnosis and individualized treatment", "Supports grading and case-dependent treatment; unsupported Korean prevalence and fixed CT/checkup rules removed", "NEEDS_EXPERT_REVIEW", "official_page_read", "2026-09-12", "repository-seed", "Qualified veterinary review still required before publication"],
    ["dog-patellar-luxation", "condition-dog-patellar-luxation", "https://www.acvs.org/small-animal/patellar-luxations/", "Patellar Luxation (Dislocating Kneecap) in Dogs", "American College of Veterinary Surgeons", "", "Grading, surgery and recovery", "Supports grading and common surgical approaches; success, recurrence and fixed recovery schedules removed", "NEEDS_EXPERT_REVIEW", "official_page_read", "2026-09-12", "repository-seed", "Unverified veterinary-review claim removed"],
    ["dog-heartworm-disease", "cond-dog-heartworm-prevention", "https://www.heartwormsociety.org/veterinary-resources/american-heartworm-society-guidelines/canine", "Canine Guidelines", "American Heartworm Society", "2024", "Transmission, testing, prevention and treatment", "Supports veterinarian-directed prevention and testing; fixed test and product timings narrowed", "NEEDS_EXPERT_REVIEW", "official_page_read", "2026-09-12", "repository-seed", "Product-specific details need veterinary review"],
    ["cat-vomiting-causes", "cond-cat-vomiting-causes", "https://www.merckvetmanual.com/cat-owners/digestive-disorders-of-cats/vomiting-in-cats", "Vomiting in Cats", "Merck Veterinary Manual", "2024-09", "Causes, diagnostic workup and escalation", "Supports symptom-based evaluation; rigid frequency and withholding thresholds removed", "NEEDS_EXPERT_REVIEW", "official_page_read", "2026-09-12", "repository-seed", "Differential diagnosis needs veterinary review"],
    ["dog-skin-allergy-guide", "cond-dog-skin-allergy-guide", "https://www.merckvetmanual.com/dog-owners/skin-disorders-of-dogs/atopic-dermatitis-in-dogs", "Atopic Dermatitis in Dogs", "Merck Veterinary Manual", "", "Diagnosis by exclusion and individualized management", "Supports multimodal management; fixed environmental and elimination-diet protocol removed", "NEEDS_EXPERT_REVIEW", "official_page_read", "2026-09-12", "repository-seed", "Clinical protocol needs veterinary review"],
    ["cat-kidney-disease-guide", "cond-cat-kidney-disease-guide", "https://www.iris-kidney.com/iris-staging-system", "IRIS Staging System", "International Renal Interest Society", "2026", "Stable CKD staging and substaging", "Supports stage-based evaluation; prevalence and universal screening/feeding schedules removed", "NEEDS_EXPERT_REVIEW", "official_page_read", "2026-09-12", "repository-seed", "Use current IRIS material during expert review"],
    ["dog-separation-anxiety-disorder", "cond-dog-separation-anxiety", "https://www.merckvetmanual.com/dog-owners/behavior-of-dogs/separation-anxiety-in-dogs", "Separation Anxiety in Dogs", "Merck Veterinary Manual", "", "Diagnosis and gradual behavior modification", "Supports gradual below-threshold work; rigid second-by-second protocol removed", "NEEDS_EXPERT_REVIEW", "official_page_read", "2026-09-12", "repository-seed", "Veterinary behavior review needed"],
    ["cat-urinary-tract-disease", "cond-cat-urinary-tract-disease", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11816079/", "2025 iCatCare consensus guidelines on lower urinary tract diseases in cats", "International Cat Care", "2025", "Syndrome causes, obstruction and management", "Supports immediate obstruction assessment and individualized management; delay-producing cutoffs removed", "NEEDS_EXPERT_REVIEW", "official_consensus_read", "2026-09-12", "repository-seed", "Emergency and diet wording needs veterinary review"],
    ["dog-obesity-management", "cond-dog-obesity-management", "https://www.aaha.org/resources/2021-aaha-nutrition-and-weight-management-guidelines/home/", "2021 AAHA Nutrition and Weight Management Guidelines", "AAHA", "2021", "BCS, calorie planning, treats and monitoring", "Supports individualized weight plans; unsupported Korean prevalence and monthly rate removed", "NEEDS_EXPERT_REVIEW", "official_page_read", "2026-09-12", "repository-seed", "Patient-specific rate needs veterinary review"],
    ["dog-joint-arthritis", "cond-dog-joint-arthritis", "https://www.acvs.org/small-animal/osteoarthritis-in-dogs/", "Osteoarthritis in Dogs", "American College of Veterinary Surgeons", "", "Diagnosis and multimodal management", "Supports weight, rehabilitation and veterinary analgesia; prevalence and therapy superlative removed", "NEEDS_EXPERT_REVIEW", "official_page_read", "2026-09-12", "repository-seed", "Medication and rehabilitation need veterinary review"],
    ["cat-dental-disease", "cond-cat-dental-disease", "https://wsava.org/global-guidelines/dental-guidelines/", "Global Dental Guidelines", "WSAVA", "2020", "Periodontal assessment, professional care and home care", "Supports professional assessment and brushing; prevalence, systemic-causation and fixed training claims removed", "NEEDS_EXPERT_REVIEW", "official_guideline_read", "2026-09-12", "repository-seed", "Stage descriptions require veterinary review"],
  ];
  const versionByContentId = new Map(records.map((record) => [
    record.id ?? record.slug,
    `sha256:${createHash("sha256").update(JSON.stringify({
      title: record.title,
      body: record.body,
      sources: record.sources,
      updatedAt: record.updatedAt,
    })).digest("hex")}`,
  ]));
  const claimType = (slug: string): string => slug === "pet-registration-guide"
    ? "legal"
    : slug === "insurance-compare"
      ? "insurance"
      : "health";
  const checkedRows = checkedSourceRows.map((row, index) => [
    `${row[0]}-claim-${index + 1}`,
    row[1],
    row[7],
    claimType(row[0]),
    `${row[0]}-source-${index + 1}`,
    row[3],
    row[4],
    row[2],
    row[5],
    row[10],
    row[5] || "current-at-access",
    row[7],
    row[6],
    row[8],
    row[9],
    "codex-editorial-audit",
    row[10],
    versionByContentId.get(row[1]) ?? row[11],
    row[12],
  ]);
  const staticRows = records.filter((record) => candidates.includes(record.slug)).flatMap((record) => {
    const version = versionByContentId.get(record.id ?? record.slug) ?? "unknown";
    const recordKey = record.id ?? record.slug;
    if (record.sources.length === 0) return [[
      `${recordKey}-source-presence-0`, record.id, "No structured source URL extracted", "source_metadata",
      `${recordKey}-source-0`, "", "", "", "", "2026-09-12", "unknown", "Source presence only",
      "Repository seed source field", "UNVERIFIED", "repository_static_scan", "machine-audit", "2026-09-12",
      version, "Semantic review required",
    ]];
    return record.sources.map((source, index) => [
      `${recordKey}-source-presence-${index + 1}`, record.id, "A source reference is present in the seed record",
      "source_metadata", `${recordKey}-source-${index + 1}`, "", "", source, "", "2026-09-12",
      "current-at-access", "Source presence only", "Repository seed source field", "UNVERIFIED",
      "repository_static_scan", "machine-audit", "2026-09-12", version,
      "URL presence is not claim support",
    ]);
  });
  const rows = [...checkedRows, ...staticRows];
  writeCsv("source-claim-audit.csv", [
    "claimId", "contentId", "exactClaim", "claimType", "sourceId", "sourceTitle", "publisher", "url",
    "publishedDate", "accessedAt", "sourceVersion", "applicableContext", "evidenceLocation", "supportStatus",
    "verificationMethod", "checkedBy", "checkedAt", "contentVersion", "notes",
  ], rows);
  const statusCounts = Object.fromEntries(
    ["SUPPORTED", "PARTIAL", "CONTRADICTED", "UNVERIFIED", "ACCESS_FAILED", "NEEDS_EXPERT_REVIEW"]
      .map((status) => [status, rows.filter((row) => row[13] === status).length]),
  );
  return {
    candidates: candidates.length,
    matchedRecords: records.filter((record) => candidates.includes(record.slug)).length,
    checkedRows: checkedRows.length,
    staticRows: staticRows.length,
    statusCounts,
    status: "PARTIAL_WITH_UNVERIFIED_ITEMS",
    note: "Checked semantic rows and automatic URL-presence rows are reported separately.",
  };
}

function dataAudit() {
  const query = fs.readFileSync(path.join(ROOT, "lib", "db-queries.ts"), "utf8");
  const page = fs.readFileSync(path.join(ROOT, "app", "[sigungu]", "[type]", "page.tsx"), "utf8");
  const rescuePage = fs.readFileSync(path.join(ROOT, "app", "rescue", "page.tsx"), "utf8");
  const etl = fs.readFileSync(path.join(ROOT, "etl", "localdata", "sync.ts"), "utf8");
  const listingUtility = fs.readFileSync(path.join(ROOT, "lib", "business-listing.ts"), "utf8");
  const findings = [
    ["DATA-COUNT-FILTER-PARITY", "FIXED", "/{sigungu}/{type}", "lib/db-queries.ts", String(query.includes("const where = and(") && query.includes("count: count()")), "Shared predicate is used for COUNT and SELECT"],
    ["DATA-STABLE-ORDER", "FIXED", "/{sigungu}/{type}", "lib/db-queries.ts", String(query.includes("asc(businesses.id)")), "Stable name and ID tie-breakers"],
    ["DATA-DISPLAYED-RANGE", "FIXED", "/{sigungu}/{type}", "app/[sigungu]/[type]/page.tsx", String(page.includes("listing.start") && page.includes("listing.end")), "Total and displayed range are separate"],
    ["DATA-REGION-MISMATCH", "PARTIALLY_CONFIRMED", "/bucheon/sale", "production data and ETL", "public samples: Paju, Suwon, Hwaseong, Gimpo", "Visible address and listing region disagree; licensing jurisdiction, relocation history, and raw source remain unknown"],
    ["DATA-REGION-MISMATCH-DISCLOSURE", "FIXED", "/{sigungu}/{type} and detail", "lib/business-listing.ts and route pages", String(listingUtility.includes("getAddressRegionConsistency") && page.includes("원본 확인이 필요합니다")), "Clear address-region conflicts are disclosed without deleting, moving, or guessing source records"],
    ["DATA-REFRESH-FAILURE", "NOT_REPRODUCED", "ETL", "etl/localdata/sync.ts", String(!/db\s*\.\s*delete\s*\(\s*businesses\s*\)/.test(etl)), "Fetch failure retains existing records; static regression test guards against bulk deletion"],
    ["DATA-RESCUE-FRESHNESS", "FIXED", "/rescue", "db/schema/etl-sync-state.ts, etl/apms/rescued-animals.ts, lib/db-queries.ts and app/rescue/page.tsx", String(query.includes("etlSyncState.lastAttemptAt") && query.includes("etlSyncState.lastSuccessfulAt") && rescuePage.includes("수집 예정:") && rescuePage.includes("마지막 수집 시도:") && rescuePage.includes("마지막 성공 수집:")), "Run-level attempt and success timestamps are stored separately; success advances only after the paged import completes"],
  ];
  writeCsv("data-quality-findings.csv", ["issue_id", "status", "affected_urls", "affected_files", "evidence", "notes"], findings);
  return { findings: findings.length, fixed: findings.filter((r) => r[1] === "FIXED").length };
}

function seoAudit() {
  const files = walk(path.join(ROOT, "app"), ".tsx");
  const suffixFindings = files.flatMap((file) =>
    findUnsafeMetadataTitleSuffixes(fs.readFileSync(file, "utf8"), file).map(
      (line) => `${path.relative(ROOT, file).replaceAll("\\", "/")}:${line}`,
    ));
  const sitemap = fs.readFileSync(path.join(ROOT, "next-sitemap.config.js"), "utf8");
  return {
    unsafeChildMetadataTitleSuffixes: suffixFindings.length,
    findings: suffixFindings,
    generatedLastmodUsesCurrentTime: sitemap.includes("lastmod: new Date().toISOString()"),
    note: "Child document titles with a site suffix must use title.absolute; OpenGraph/social titles are audited separately.",
  };
}

function adsAudit(records: ContentRecord[]) {
  const rootLayout = fs.readFileSync(path.join(ROOT, "app", "layout.tsx"), "utf8");
  const notFoundPage = fs.readFileSync(path.join(ROOT, "app", "not-found.tsx"), "utf8");
  const loader = fs.readFileSync(path.join(ROOT, "components", "ads", "adsense-loader.tsx"), "utf8");
  const policy = fs.readFileSync(path.join(ROOT, "lib", "ad-policy.ts"), "utf8");
  const autoAdsPolicy = fs.readFileSync(path.join(ROOT, "lib", "ads-policy.ts"), "utf8");
  const memorialInventoryPaths = [...new Set(records
    .filter((record) => record.category === 6 && record.status === "published")
    .map((record) => `/${record.type}/${record.slug}`))]
    .sort();
  const uncoveredMemorialPaths = memorialInventoryPaths.filter(
    (pathname) => !MEMORIAL_AUTO_ADS_EXCLUDED_PATHS.has(pathname),
  );
  return {
    globalLoaderConfigured: rootLayout.includes("AdsenseLoader"),
    memorialSlotBlockConfigured: /6:\s*\{[\s\S]*?adsense:\s*"block"/.test(policy),
    memorialInventoryPaths: memorialInventoryPaths.length,
    memorialAutoAdsPathsCovered: uncoveredMemorialPaths.length === 0,
    uncoveredMemorialPaths,
    memorialStaticPathsCovered: ["/category/memorial", "/guide/pet-loss-care"].every(
      (pathname) => MEMORIAL_AUTO_ADS_EXCLUDED_PATHS.has(pathname),
    ),
    memorialBusinessRouteFamiliesCovered: [
      "/hwaseong/funeral",
      "/hwaseong/funeral/example-business",
    ].every((pathname) => !isAutoAdsEligiblePath(pathname)),
    operationalAndTrustPathsExcluded: [
      "/admin", "/search", "/contact", "/privacy", "/terms", "/disclosure", "/advertising",
    ].every((pathname) => autoAdsPolicy.includes(`"${pathname}"`)),
    initialNotFoundAutoAdsExcluded: notFoundPage.includes('data-ads-policy="block"')
      && loader.includes("pageBlocksAds")
      && loader.includes("() => false"),
    clientNavigationIntoExcludedPath: "FULL_DOCUMENT_RELOAD_ENFORCED",
    thirdPartyRuntimeAfterReload: "NOT_EXECUTED_WITH_REAL_PUBLISHER_ID",
    accountAutoAdsExclusion: "UNKNOWN",
    publisherAccountBinding: "UNKNOWN",
    publicTrustClaims: {
      legalEntityLabel: SITE_IDENTITY.legalEntityLabel,
      legalEntityVerification: SITE_IDENTITY.evidence.legalEntity.status,
      contactEmail: SITE_IDENTITY.contactEmail,
      contactMailboxVerification: SITE_IDENTITY.evidence.contactMailbox.status,
      note: "UNKNOWN is not a contradiction; operator evidence is required before changing either public claim.",
    },
  };
}

const kind = process.argv[2] as AuditKind | undefined;
if (!kind || !["content", "content-gate", "sources", "data", "seo", "ads"].includes(kind)) {
  console.error("Usage: tsx scripts/audit-quality.ts <content|content-gate|sources|data|seo|ads> [--base=HEAD]");
  process.exit(2);
}

const records = kind === "content" || kind === "content-gate" || kind === "sources" || kind === "ads"
  ? inventory()
  : [];
const result = kind === "content" ? contentAudit(records)
  : kind === "content-gate" ? contentGate(records)
    : kind === "sources" ? sourceAudit(records)
    : kind === "data" ? dataAudit()
      : kind === "seo" ? seoAudit()
        : adsAudit(records);

console.log(JSON.stringify({ audit: kind, mode: "read-only/dry-run", ...result }, null, 2));
if (kind === "content-gate" && "blockers" in result && result.blockers > 0) {
  process.exitCode = 1;
}
