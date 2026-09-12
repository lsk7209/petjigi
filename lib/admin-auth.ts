import "server-only";

// Reuse the configured key; a missing deployment secret never grants access.
export function isValidAdminSecret(key: unknown): key is string {
  const secret = process.env.CRON_SECRET;
  return typeof secret === "string" && secret.trim().length > 0
    && typeof key === "string" && key === secret;
}

export const isReviewKeyAuthorized = isValidAdminSecret;

export function isReviewRequestAuthorized(headers: Pick<Headers, "get">): boolean {
  const value = headers.get("authorization");
  return typeof value === "string" && value.startsWith("Bearer ")
    && isReviewKeyAuthorized(value.slice(7));
}

export function requireReviewFormKey(formData: FormData): void {
  if (!formData || typeof formData.get !== "function"
      || !isReviewKeyAuthorized(formData.get("key"))) {
    throw new Error("Unauthorized");
  }
}
