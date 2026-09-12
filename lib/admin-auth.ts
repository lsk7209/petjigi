import { timingSafeEqual } from "node:crypto";

export function isValidAdminSecret(candidate: string | null | undefined): boolean {
  const expected = process.env.CRON_SECRET;
  if (!candidate || !expected) return false;

  const candidateBuffer = Buffer.from(candidate);
  const expectedBuffer = Buffer.from(expected);
  return candidateBuffer.length === expectedBuffer.length
    && timingSafeEqual(candidateBuffer, expectedBuffer);
}
