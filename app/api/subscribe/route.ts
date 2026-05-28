import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";
import { emailSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { renderWelcomeEmail } from "@/lib/email/templates";
import { trackSubscribe } from "@/lib/analytics/ga4-server";

const bodySchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  consentRequired: z.boolean(),
  consentMarketing: z.boolean().default(false),
  ageConfirmed: z.boolean(),
  source: z.string().optional(),
});

async function sendWelcomeEmail(
  email: string,
  subscriberId: string,
  hasMarketingConsent: boolean,
  source?: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // RESEND_API_KEY 미설정 시 조용히 스킵

  try {
    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL ?? "noreply@petjigi.com";
    const html = await renderWelcomeEmail({
      email,
      unsubscribeToken: subscriberId,
      hasMarketingConsent,
      source,
    });
    const subject =
      source === "pet_loss_care"
        ? "[펫지기] 펫로스 케어 가이드 PDF가 도착했습니다"
        : "[펫지기] 구독을 환영합니다";

    await resend.emails.send({ from, to: email, subject, html });
  } catch {
    // 이메일 발송 실패는 구독 자체를 실패 처리하지 않음
  }
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ message: "요청 본문을 파싱할 수 없습니다." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.";
    return NextResponse.json({ message: firstError }, { status: 400 });
  }

  const { email, consentRequired, consentMarketing, ageConfirmed, source } = parsed.data;

  if (!consentRequired) {
    return NextResponse.json({ message: "개인정보 수집·이용 동의가 필요합니다." }, { status: 400 });
  }
  if (!ageConfirmed) {
    return NextResponse.json({ message: "만 14세 이상만 구독할 수 있습니다." }, { status: 400 });
  }

  const existing = await db
    .select({ id: emailSubscribers.id, unsubscribedAt: emailSubscribers.unsubscribedAt })
    .from(emailSubscribers)
    .where(eq(emailSubscribers.email, email))
    .get();

  if (existing) {
    if (!existing.unsubscribedAt) {
      return NextResponse.json({ message: "이미 구독 중인 이메일입니다." }, { status: 200 });
    }
    await db
      .update(emailSubscribers)
      .set({
        consentMarketing: consentMarketing ? "yes" : "no",
        subscribedAt: new Date().toISOString(),
        unsubscribedAt: null,
        source: source ?? null,
      })
      .where(eq(emailSubscribers.email, email));

    await sendWelcomeEmail(existing.id, existing.id, consentMarketing, source);
    void trackSubscribe(source ?? "unknown", false);
    return NextResponse.json({ message: "구독이 재활성화되었습니다. 환영합니다!" }, { status: 200 });
  }

  const id = crypto.randomUUID();
  await db.insert(emailSubscribers).values({
    id,
    email,
    consentMarketing: consentMarketing ? "yes" : "no",
    subscribedAt: new Date().toISOString(),
    source: source ?? null,
  });

  await sendWelcomeEmail(email, id, consentMarketing, source);
  void trackSubscribe(source ?? "unknown", true);
  return NextResponse.json({ message: "구독이 완료되었습니다. 환영합니다!" }, { status: 201 });
}
