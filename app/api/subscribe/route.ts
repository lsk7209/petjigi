import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";
import { emailSubscribers } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { Resend } from "resend";
import { renderWelcomeEmail } from "@/lib/email/templates";
import { sendWelcomeEmail, subscribeMessage, type WelcomeEmailStatus } from "@/lib/email/send-welcome";
import { trackSubscribe } from "@/lib/analytics/ga4-server";
import { NewsletterRequestError, readNewsletterJson } from "@/lib/newsletter-request";

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().max(254).email("올바른 이메일 형식이 아닙니다."),
  consentRequired: z.boolean(),
  consentMarketing: z.boolean().default(false),
  ageConfirmed: z.boolean(),
  source: z.enum(["contact_page", "home_newsletter", "pet_loss_newsletter"]).optional(),
  website: z.string().max(200).optional().default(""),
});

async function deliverWelcomeEmail(
  email: string,
  subscriberId: string,
  hasMarketingConsent: boolean,
): Promise<WelcomeEmailStatus> {
  const apiKey = process.env.RESEND_API_KEY;
  return sendWelcomeEmail(email, {
    apiKey,
    from: process.env.RESEND_FROM_EMAIL,
    render: () => renderWelcomeEmail({ email, unsubscribeToken: subscriberId, hasMarketingConsent }),
    send: async (message) => {
      const { error } = await new Resend(apiKey).emails.send(message);
      if (error) throw new Error(error.message);
    },
  });
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await readNewsletterJson(req);
  } catch (error) {
    if (error instanceof NewsletterRequestError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: "요청 본문을 처리할 수 없습니다." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.";
    return NextResponse.json({ message: firstError }, { status: 400 });
  }

  const { email, consentRequired, consentMarketing, ageConfirmed, source } = parsed.data;

  if (parsed.data.website) {
    return NextResponse.json({ message: "구독 요청을 처리할 수 없습니다." }, { status: 400 });
  }

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
    const reactivated = await db
      .update(emailSubscribers)
      .set({
        consentMarketing: consentMarketing ? "yes" : "no",
        subscribedAt: new Date().toISOString(),
        unsubscribedAt: null,
        source: source ?? null,
      })
      .where(and(
        eq(emailSubscribers.email, email),
        isNotNull(emailSubscribers.unsubscribedAt),
      ))
      .returning({ id: emailSubscribers.id })
      .get();

    if (!reactivated) {
      return NextResponse.json({ message: "이미 구독 중인 이메일입니다." }, { status: 200 });
    }

    const mailStatus = await deliverWelcomeEmail(email, reactivated.id, consentMarketing);
    void trackSubscribe(source ?? "unknown", false);
    return NextResponse.json(
      { message: subscribeMessage("구독이 재활성화되었습니다.", mailStatus), welcomeEmail: mailStatus },
      { status: 200 },
    );
  }

  const id = crypto.randomUUID();
  const inserted = await db
    .insert(emailSubscribers)
    .values({
      id,
      email,
      consentMarketing: consentMarketing ? "yes" : "no",
      subscribedAt: new Date().toISOString(),
      source: source ?? null,
    })
    .onConflictDoNothing({ target: emailSubscribers.email })
    .returning({ id: emailSubscribers.id })
    .get();

  if (!inserted) {
    return NextResponse.json({ message: "이미 구독 중인 이메일입니다." }, { status: 200 });
  }

  const mailStatus = await deliverWelcomeEmail(email, id, consentMarketing);
  void trackSubscribe(source ?? "unknown", true);
  return NextResponse.json(
    { message: subscribeMessage("구독이 완료되었습니다.", mailStatus), welcomeEmail: mailStatus },
    { status: 201 },
  );
}
