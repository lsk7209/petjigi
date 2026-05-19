import { db } from "../client";
import { adPolicies } from "../schema";

// 카테고리 × 광고 타입 정책 시드 (spec §7.1)
const AD_POLICIES_DATA = [
  // 카테고리 1 — 입양·등록
  { category: 1, adType: "adsense", policy: "allow" },
  { category: 1, adType: "pet_insurance", policy: "allow" },
  { category: 1, adType: "pet_food", policy: "allow" },
  { category: 1, adType: "pet_service", policy: "preferred" },
  { category: 1, adType: "memorial", policy: "block" },
  // 카테고리 2 — 사료·영양
  { category: 2, adType: "adsense", policy: "allow" },
  { category: 2, adType: "pet_insurance", policy: "allow" },
  { category: 2, adType: "pet_food", policy: "preferred" },
  { category: 2, adType: "pet_service", policy: "allow" },
  { category: 2, adType: "memorial", policy: "block" },
  // 카테고리 3 — 건강·의료
  { category: 3, adType: "adsense", policy: "allow" },
  { category: 3, adType: "pet_insurance", policy: "preferred" },
  { category: 3, adType: "pet_food", policy: "allow" },
  { category: 3, adType: "pet_service", policy: "allow" },
  { category: 3, adType: "memorial", policy: "block" },
  // 카테고리 4 — 보험·법률
  { category: 4, adType: "adsense", policy: "allow" },
  { category: 4, adType: "pet_insurance", policy: "preferred" },
  { category: 4, adType: "pet_food", policy: "allow" },
  { category: 4, adType: "pet_service", policy: "allow" },
  { category: 4, adType: "memorial", policy: "block" },
  // 카테고리 5 — 케어·라이프
  { category: 5, adType: "adsense", policy: "allow" },
  { category: 5, adType: "pet_insurance", policy: "allow" },
  { category: 5, adType: "pet_food", policy: "allow" },
  { category: 5, adType: "pet_service", policy: "preferred" },
  { category: 5, adType: "memorial", policy: "block" },
  // 카테고리 6 — 장례·추모 (펫보험·펫푸드·펫서비스 DOM 레벨 차단)
  { category: 6, adType: "adsense", policy: "block" },
  { category: 6, adType: "pet_insurance", policy: "block" },
  { category: 6, adType: "pet_food", policy: "block" },
  { category: 6, adType: "pet_service", policy: "block" },
  { category: 6, adType: "memorial", policy: "preferred" },
] as const;

async function seedAdPolicies() {
  console.log("Seeding ad policies...");
  await db.delete(adPolicies);
  await db.insert(adPolicies).values(AD_POLICIES_DATA.map((p) => ({
    category: p.category,
    adType: p.adType,
    policy: p.policy,
  })));
  console.log("Ad policies seeded.");
}

seedAdPolicies().catch(console.error);
