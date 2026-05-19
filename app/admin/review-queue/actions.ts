"use server";

import { db } from "@/db/client";
import { reviewQueue } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function approveContent(id: string): Promise<void> {
  await db
    .update(reviewQueue)
    .set({
      status: "approved",
      resolvedAt: new Date().toISOString(),
    })
    .where(eq(reviewQueue.id, id));

  revalidatePath("/admin/review-queue");
}

export async function rejectContent(id: string, formData: FormData): Promise<void> {
  const notes = (formData.get("notes") as string | null) ?? "검수 거부";
  await db
    .update(reviewQueue)
    .set({
      status: "rejected",
      notes,
      resolvedAt: new Date().toISOString(),
    })
    .where(eq(reviewQueue.id, id));

  revalidatePath("/admin/review-queue");
}
