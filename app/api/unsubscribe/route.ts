import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { emailSubscribers } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.com";

// GET /api/unsubscribe?token=xxx&email=yyy
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  if (!email || !token) {
    return new NextResponse("잘못된 수신 거부 링크입니다.", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const subscriber = await db
    .select({ id: emailSubscribers.id, unsubscribedAt: emailSubscribers.unsubscribedAt })
    .from(emailSubscribers)
    .where(eq(emailSubscribers.email, email))
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
    .where(and(eq(emailSubscribers.email, email), eq(emailSubscribers.id, subscriber.id)));

  return NextResponse.redirect(`${SITE_URL}/?unsubscribe=ok`);
}
