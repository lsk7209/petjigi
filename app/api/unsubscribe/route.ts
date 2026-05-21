import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { emailSubscribers } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

// GET /api/unsubscribe?token={subscriberId}&email={email}
// token = emailSubscribers.id (UUID, 이메일 발송 시 포함)
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  if (!email || !token) {
    return NextResponse.redirect(`${SITE_URL}/?unsubscribe=invalid`);
  }

  const subscriber = await db
    .select({ id: emailSubscribers.id, unsubscribedAt: emailSubscribers.unsubscribedAt })
    .from(emailSubscribers)
    .where(and(eq(emailSubscribers.email, email), eq(emailSubscribers.id, token)))
    .get();

  if (!subscriber) {
    return NextResponse.redirect(`${SITE_URL}/?unsubscribe=not_found`);
  }

  if (subscriber.unsubscribedAt) {
    return NextResponse.redirect(`${SITE_URL}/?unsubscribe=already`);
  }

  await db
    .update(emailSubscribers)
    .set({ unsubscribedAt: new Date().toISOString() })
    .where(eq(emailSubscribers.id, token));

  return NextResponse.redirect(`${SITE_URL}/?unsubscribe=ok`);
}
