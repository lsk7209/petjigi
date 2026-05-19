import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 prose prose-sm">
      <h1>개인정보처리방침</h1>
      <p className="text-sm text-[var(--brand-text-secondary)]">
        최종 업데이트: 2026-05-18
      </p>

      <h2>1. 처리하는 개인정보 항목</h2>
      <ul>
        <li>이메일 주소 (수집)</li>
        <li>IP 주소, 쿠키, User-Agent (자동 수집)</li>
      </ul>

      <h2>2. 처리 목적</h2>
      <ul>
        <li>가이드 발송 및 서비스 안내</li>
        <li>서비스 운영 및 개선</li>
        <li>광고성 정보 발송 (별도 동의 시)</li>
      </ul>

      <h2>3. 처리 및 보유 기간</h2>
      <p>회원 탈퇴 또는 발송 동의 철회 시까지 보관합니다.</p>

      <h2>4. 처리 위탁 (제3자)</h2>
      <ul>
        <li>Resend — 이메일 발송 (미국)</li>
        <li>Google Analytics — 분석 (미국)</li>
        <li>Google AdSense — 광고 (미국)</li>
        <li>Vercel — 호스팅 (미국)</li>
        <li>Turso — 데이터베이스 (미국)</li>
      </ul>

      <h2>5. 개인정보의 국외 이전</h2>
      <p>
        위 서비스는 모두 미국 등 해외 클라우드를 사용하며, 해당 국가의 개인정보
        보호법령이 적용됩니다.
      </p>

      <h2>6. 정보주체의 권리</h2>
      <p>
        열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다.
        문의: contact@petjigi.com
      </p>

      <h2>7. 개인정보 보호책임자</h2>
      <p>이메일: contact@petjigi.com</p>
    </main>
  );
}
