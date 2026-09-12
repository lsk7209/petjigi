import assert from "node:assert/strict";
import test from "node:test";
import { canResolveReview, canTransitionReview } from "./review-workflow";

test("only unresolved review items can be resolved", () => {
  assert.equal(canResolveReview("pending"), true);
  assert.equal(canResolveReview("in_review"), true);
  assert.equal(canResolveReview("approved"), false);
  assert.equal(canResolveReview("rejected"), false);
});
test("resolved review items cannot be reopened or re-approved", () => {
  assert.equal(canTransitionReview("approved", "pending"), false);
  assert.equal(canTransitionReview("approved", "approved"), true);
  assert.equal(canTransitionReview("rejected", "approved"), false);
  assert.equal(canTransitionReview("pending", "approved"), true);
  assert.equal(canTransitionReview("in_review", "rejected"), true);
});
