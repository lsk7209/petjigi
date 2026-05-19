import type { Metadata } from "next";
import { SubscribeForm } from "@/components/forms/subscribe-form";

export const metadata: Metadata = {
  title: "문의 및 구독 — 펫지기",
  description: "펫지기에 문의하거나 반려동물 정보 뉴스레터를 구독하세요.",
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-16">
      {/* 이메일 구독 */}
      <section>
        <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-2">
          뉴스레터 구독
        </h1>
        <p className="text-[var(--brand-text-secondary)] mb-8">
          월 2회, 수의사·전문가 검토를 거친 반려동물 정보를 이메일로 받아보세요.
        </p>
        <SubscribeForm source="contact_page" />
      </section>

      {/* 문의 */}
      <section className="border-t border-[var(--brand-border)] pt-12">
        <h2 className="text-xl font-bold text-[var(--brand-text)] mb-3">문의하기</h2>
        <p className="text-[var(--brand-text-secondary)] mb-2">
          콘텐츠 제안, 데이터 오류 신고, 제휴 문의는 아래 이메일로 연락해 주세요.
        </p>
        <a
          href="mailto:contact@petjigi.com"
          className="font-medium text-[var(--brand-accent)] hover:underline"
        >
          contact@petjigi.com
        </a>
      </section>
    </main>
  );
}
