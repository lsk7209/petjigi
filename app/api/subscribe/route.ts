import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";
import { emailSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";

const bodySchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  consentRequired: z.boolean(),
  consentMarketing: z.boolean().default(false),
  ageConfirmed: z.boolean(),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // JSON 파싱
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { message: "요청 본문을 파싱할 수 없습니다." },
      { status: 400 },
    );
  }

  // Zod 유효성 검사
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.";
    return NextResponse.json({ message: firstError }, { status: 400 });
  }

  const { email, consentRequired, consentMarketing, ageConfirmed, source } = parsed.data;

  // 개인정보보호법: 필수 동의 미체크 → 400
  if (!consentRequired) {
    return NextResponse.json(
      { message: "개인정보 수집·이용 동의가 필요합니다." },
      { status: 400 },
    );
  }

  // 개인정보보호법 제22조: 14세 미만 보호
  if (!ageConfirmed) {
    return NextResponse.json(
      { message: "만 14세 이상만 구독할 수 있습니다." },
      { status: 400 },
    );
  }

  // 중복 이메일 확인
  const existing = await db
    .select({ id: emailSubscribers.id, unsubscribedAt: emailSubscribers.unsubscribedAt })
    .from(emailSubscribers)
    .where(eq(emailSubscribers.email, email))
    .get();

  if (existing) {
    // 이미 구독 중 (unsubscribedAt이 없음)
    if (!existing.unsubscribedAt) {
      return NextResponse.json(
        { message: "이미 구독 중인 이메일입니다." },
        { status: 200 },
      );
    }

    // 구독 취소 후 재구독: unsubscribedAt 초기화
    await db
      .update(emailSubscribers)
      .set({
        consentMarketing: consentMarketing ? "yes" : "no",
        subscribedAt: new Date().toISOString(),
        unsubscribedAt: null,
        source: source ?? null,
      })
      .where(eq(emailSubscribers.email, email));

    return NextResponse.json(
      { message: "구독이 재활성화되었습니다. 환영합니다!" },
      { status: 200 },
    );
  }

  // 신규 구독 삽입
  const id = crypto.randomUUID();
  await db.insert(emailSubscribers).values({
    id,
    email,
    consentMarketing: consentMarketing ? "yes" : "no",
    subscribedAt: new Date().toISOString(),
    source: source ?? null,
  });

  return NextResponse.json(
    { message: "구독이 완료되었습니다. 환영합니다!" },
    { status: 201 },
  );
}
