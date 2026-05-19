import type { CategoryId } from "./category";
import type { AdType, AdPolicy } from "@/db/schema/ad-policies";

// 카테고리 6에 펫보험·펫푸드·펫서비스 CTA 노출 절대 금지 (spec §2 금기 3)
const AD_POLICY_MATRIX: Record<CategoryId, Record<AdType, AdPolicy>> = {
  1: {
    adsense: "allow",
    pet_insurance: "allow",
    pet_food: "allow",
    pet_service: "preferred",
    memorial: "block",
  },
  2: {
    adsense: "allow",
    pet_insurance: "allow",
    pet_food: "preferred",
    pet_service: "allow",
    memorial: "block",
  },
  3: {
    adsense: "allow",
    pet_insurance: "preferred",
    pet_food: "allow",
    pet_service: "allow",
    memorial: "block",
  },
  4: {
    adsense: "allow",
    pet_insurance: "preferred",
    pet_food: "allow",
    pet_service: "allow",
    memorial: "block",
  },
  5: {
    adsense: "allow",
    pet_insurance: "allow",
    pet_food: "allow",
    pet_service: "preferred",
    memorial: "block",
  },
  6: {
    adsense: "block",
    pet_insurance: "block",
    pet_food: "block",
    pet_service: "block",
    memorial: "preferred",
  },
};

export function getAdPolicy(
  categoryId: CategoryId,
  adType: AdType
): AdPolicy {
  return AD_POLICY_MATRIX[categoryId][adType];
}

export function isAdAllowed(
  categoryId: CategoryId,
  adType: AdType
): boolean {
  return getAdPolicy(categoryId, adType) !== "block";
}
