import type { Metadata } from "next";
import { SITE_IDENTITY } from "@/lib/site-identity";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "개인정보처리방침", url: `${SITE_URL}/privacy` },
]);

export const metadata: Metadata = {
  title: { absolute: "개인정보처리방침 | 펫지기" },
  description: "펫지기 개인정보처리방침 — 수집 항목, 처리 목적, 보유 기간, 정보주체의 권리를 안내합니다.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <main className="max-w-3xl mx-auto px-4 py-16 prose prose-sm">
      <h1>개인정보처리방침</h1>
      <p className="text-sm text-[var(--brand-text-secondary)]">
        최종 업데이트: 2026-10-10
      </p>

      <h2>1. 처리하는 개인정보 항목</h2>
      <ul>
        <li>이메일 주소 (수집)</li>
        <li>IP 주소, 쿠키, User-Agent (자동 수집)</li>
      </ul>

      <h2>2. 처리 목적</h2>
      <ul>
        <li>뉴스레터 및 서비스 안내 발송</li>
        <li>서비스 운영 및 개선</li>
        <li>광고성 정보 발송 (별도 동의 시)</li>
      </ul>

      <h2>3. 처리 및 보유 기간</h2>
      <p>뉴스레터 구독 취소 또는 발송 동의 철회 시까지 구독 이메일을 보관합니다. 구독 취소는 발송된 메일의 구독 해지 링크 또는 아래 이메일 문의로 요청할 수 있습니다. 접속 기록(IP, 쿠키, User-Agent)은 분석·광고 서비스 제공자의 정책에 따라 보관되며, 사이트가 직접 저장하는 개인정보는 구독 이메일입니다.</p>

      <h2>4. 처리 위탁 (제3자)</h2>
      <ul>
        <li>Resend — 이메일 발송 (미국)</li>
        <li>Google Analytics — 분석 (미국)</li>
        <li>Google AdSense — 광고 (미국)</li>
        <li>Vercel — 호스팅 (미국)</li>
        <li>Turso — 데이터베이스 (미국)</li>
      </ul>

      <h2>5. 제3자 광고 사업자(Google)의 쿠키 사용 안내</h2>
      <p>
        펫지기는 Google AdSense를 이용해 광고를 표시할 수 있습니다. Google을 포함한 제3자 공급업체는
        쿠키를 사용하여 사용자의 이전 웹사이트 방문 기록을 바탕으로 광고를 제공합니다.
      </p>
      <p>
        사용자는{" "}
        <a
          href="https://adssettings.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[var(--brand-accent)]"
        >
          Google 광고 설정
        </a>
        을 방문하여 맞춤형 광고 게재에 사용되는 쿠키 설정을 직접 관리하거나 사용을 중지할 수 있습니다.
        브라우저 설정에서 쿠키를 거부하거나 삭제할 수도 있으며, 이 경우 일부 기능이 제한될 수 있습니다.
        Google의 광고 쿠키 사용 방식은{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[var(--brand-accent)]"
        >
          Google 정책 안내
        </a>
        에서 확인할 수 있습니다.
      </p>

      <h2>6. 개인정보의 국외 이전</h2>
      <p>
        위 서비스는 모두 미국 등 해외 클라우드를 사용하며, 해당 국가의 개인정보
        보호법령이 적용됩니다.
      </p>

      <h2>7. 정보주체의 권리</h2>
      <p>
        열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다.
        문의: {SITE_IDENTITY.contactEmail}
      </p>

      <h2>8. 개인정보 보호책임자</h2>
      <p>이메일: {SITE_IDENTITY.contactEmail}</p>
    </main>
    </>
  );
}
