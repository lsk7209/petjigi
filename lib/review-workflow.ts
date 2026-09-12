export type ReviewStatus = "pending" | "in_review" | "approved" | "rejected";

export function canResolveReview(status: string): status is "pending" | "in_review" {
  return status === "pending" || status === "in_review";
}
export function canTransitionReview(from: string, to: ReviewStatus): boolean {
  if (from === to) return true;
  if (from === "pending") return to === "in_review" || to === "approved" || to === "rejected";
  if (from === "in_review") return to === "approved" || to === "rejected";
  return false;
}
