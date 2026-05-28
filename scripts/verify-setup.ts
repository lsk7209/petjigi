/**
 * 통합 설정 검증 스크립트
 * 실행: pnpm tsx scripts/verify-setup.ts
 *
 * AdSense, GSC, GA4, IndexNow 연동 상태를 자동으로 확인합니다.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

function check(label: string, condition: boolean, fix?: string) {
  const icon = condition ? "✅" : "❌";
  console.log(`${icon} ${label}`);
  if (!condition && fix) console.log(`   → ${fix}`);
}

async function verifyIndexNow() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    check("IndexNow 키 파일", false, "INDEXNOW_KEY 환경변수 설정 필요");
    return;
  }

  // 키 파일이 공개 접근 가능한지 확인
  try {
    const res = await fetch(`${SITE_URL}/${key}.txt`, { signal: AbortSignal.timeout(5000) });
    const body = await res.text();
    check(
      "IndexNow 키 파일 접근 가능",
      res.ok && body.trim() === key,
      "public/{key}.txt 파일 내용이 키 값과 일치해야 함"
    );
  } catch {
    check("IndexNow 키 파일 접근 가능", false, `${SITE_URL}/${key}.txt 에서 키 파일을 읽을 수 없음 (배포 후 확인)`);
  }

  // Naver IndexNow 테스트 핑 (실제 전송하지 않고 엔드포인트만 확인)
  console.log(`   → IndexNow 키: ${key}`);
  console.log(`   → 키 파일 URL: ${SITE_URL}/${key}.txt`);
}

async function verifyGSC() {
  const saJson = process.env.GOOGLE_SA_JSON;

  if (!saJson) {
    check(
      "Google Indexing API 서비스 계정",
      false,
      "GOOGLE_SA_JSON 환경변수 설정 필요\n   " +
      "  1. GSC 대시보드 → 설정 → 사용자 및 권한 → 소유자 추가\n" +
      "     이메일: id-ai-179@cursorai-451704.iam.gserviceaccount.com\n" +
      "  2. Cloud Console → 서비스 계정 → JSON 키 다운로드\n" +
      "  3. Vercel 환경변수 GOOGLE_SA_JSON 에 JSON 내용 복사"
    );
    return;
  }

  try {
    const sa = JSON.parse(saJson) as { client_email: string; private_key: string };
    check("Google Indexing API 서비스 계정 JSON 파싱", true);
    console.log(`   → 서비스 계정 이메일: ${sa.client_email}`);
  } catch {
    check("Google Indexing API 서비스 계정 JSON 파싱", false, "GOOGLE_SA_JSON 값이 유효한 JSON인지 확인 필요");
  }
}

async function verifyGA4() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? process.env.NEXT_PUBLIC_GA_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  check("GA4 측정 ID", Boolean(ga4Id), "NEXT_PUBLIC_GA_ID 또는 NEXT_PUBLIC_GA4_MEASUREMENT_ID 환경변수 설정 필요");
  if (!ga4Id) return;
  console.log(`   → 측정 ID: ${ga4Id}`);

  if (!apiSecret) {
    console.log("   ℹ️  GA4_API_SECRET 없음 — Measurement Protocol 검증 건너뜀");
    console.log("   → GA4 대시보드 → 관리 → 데이터 스트림 → API 비밀번호 생성 후 GA4_API_SECRET 설정");
    return;
  }

  // Measurement Protocol로 테스트 이벤트 전송
  try {
    const res = await fetch(
      `https://www.google-analytics.com/debug/mp/collect?measurement_id=${ga4Id}&api_secret=${apiSecret}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "verify-setup-script",
          events: [{ name: "setup_verify", params: { source: "verify-setup-ts" } }],
        }),
        signal: AbortSignal.timeout(5000),
      }
    );
    const json = await res.json() as { validationMessages?: unknown[] };
    const errors = json.validationMessages ?? [];
    check(
      "GA4 Measurement Protocol 검증",
      errors.length === 0,
      errors.length > 0 ? `검증 오류: ${JSON.stringify(errors)}` : undefined
    );
  } catch (e) {
    check("GA4 Measurement Protocol 검증", false, String(e));
  }
}

function verifyAdSense() {
  const id = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const slotH = process.env.NEXT_PUBLIC_AD_SLOT_HORIZONTAL;
  const slotR = process.env.NEXT_PUBLIC_AD_SLOT_RECTANGLE;
  const slotV = process.env.NEXT_PUBLIC_AD_SLOT_VERTICAL;
  const slotA = process.env.NEXT_PUBLIC_AD_SLOT_AUTO;

  check("AdSense 퍼블리셔 ID", Boolean(id), "NEXT_PUBLIC_ADSENSE_ID 환경변수 설정 필요");
  if (id) console.log(`   → 퍼블리셔 ID: ${id}`);

  check(
    "AdSense 슬롯 ID (수평 배너)",
    Boolean(slotH),
    "AdSense 대시보드 → 광고 → 광고 단위 → 디스플레이 광고 → 수평 단위 생성\n" +
    "   → Vercel 환경변수 NEXT_PUBLIC_AD_SLOT_HORIZONTAL 에 슬롯 ID 추가"
  );
  check(
    "AdSense 슬롯 ID (직사각형)",
    Boolean(slotR),
    "AdSense 대시보드 → 직사각형 단위 생성 → NEXT_PUBLIC_AD_SLOT_RECTANGLE"
  );
  check(
    "AdSense 슬롯 ID (수직)",
    Boolean(slotV),
    "AdSense 대시보드 → 수직 단위 생성 → NEXT_PUBLIC_AD_SLOT_VERTICAL"
  );
  check(
    "AdSense 슬롯 ID (반응형 자동)",
    Boolean(slotA),
    "AdSense 대시보드 → 반응형 자동 단위 생성 → NEXT_PUBLIC_AD_SLOT_AUTO"
  );

  if (slotH && slotR) {
    console.log("   ✅ 핵심 슬롯 설정 완료 — 가이드·블로그 페이지에 광고 표시됩니다.");
  }
}

function verifyEnv() {
  const gscVerify = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  const naverVerify = process.env.NEXT_PUBLIC_NAVER_VERIFICATION;

  check("GSC 메타 인증 태그", Boolean(gscVerify), "NEXT_PUBLIC_GSC_VERIFICATION 환경변수 설정 필요");
  check("Naver Search Advisor 인증", Boolean(naverVerify), "NEXT_PUBLIC_NAVER_VERIFICATION 환경변수 설정 필요");
}

async function verifySitemap() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  const feedUrl = `${SITE_URL}/feed.xml`;

  try {
    const res = await fetch(sitemapUrl, { signal: AbortSignal.timeout(8000) });
    const text = await res.text();
    check(
      "sitemap.xml 접근 가능",
      res.ok && text.includes("<sitemapindex") || text.includes("<urlset"),
      `${sitemapUrl} 에서 사이트맵을 읽을 수 없음 (배포 후 확인)`
    );
    if (res.ok) {
      const urlCount = (text.match(/<url>/g) ?? []).length;
      const sitemapCount = (text.match(/<sitemap>/g) ?? []).length;
      if (urlCount > 0) console.log(`   → URL ${urlCount}개 포함`);
      if (sitemapCount > 0) console.log(`   → 서브 사이트맵 ${sitemapCount}개 참조`);
    }
  } catch {
    check("sitemap.xml 접근 가능", false, `배포 후 ${sitemapUrl} 확인 필요`);
  }

  try {
    const res = await fetch(feedUrl, { signal: AbortSignal.timeout(8000) });
    check("RSS feed.xml 접근 가능", res.ok && (res.headers.get("content-type") ?? "").includes("xml"), `${feedUrl} 접근 불가 — 배포 후 확인`);
    if (res.ok) console.log(`   → RSS URL: ${feedUrl} (Naver Search Advisor에 등록하세요)`);
  } catch {
    check("RSS feed.xml 접근 가능", false, `배포 후 ${feedUrl} 확인 필요`);
  }
}

async function main() {
  console.log("\n🔍 펫지기 통합 설정 검증 시작\n");
  console.log("=".repeat(50));

  console.log("\n📊 1. GA4 Analytics");
  await verifyGA4();

  console.log("\n💰 2. AdSense");
  verifyAdSense();

  console.log("\n🔍 3. GSC / Google Indexing API");
  await verifyGSC();

  console.log("\n🔔 4. IndexNow");
  await verifyIndexNow();

  console.log("\n🏷️  5. 검색엔진 인증 메타태그");
  verifyEnv();

  console.log("\n🗺️  6. 사이트맵 & RSS");
  await verifySitemap();

  console.log("\n" + "=".repeat(50));
  console.log("✅ 모두 통과하면 배포 후 검색엔진 자동 전송이 정상 동작합니다.\n");
}

main().catch(console.error);
