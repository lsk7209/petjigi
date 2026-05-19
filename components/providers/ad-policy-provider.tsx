"use client";

import { createContext, useContext } from "react";
import type { CategoryId } from "@/lib/category";
import { getAdPolicy, isAdAllowed } from "@/lib/ad-policy";
import type { AdType, AdPolicy } from "@/db/schema/ad-policies";

interface AdPolicyContextValue {
  getPolicy: (adType: AdType) => AdPolicy;
  isAllowed: (adType: AdType) => boolean;
}

const AdPolicyContext = createContext<AdPolicyContextValue | null>(null);

export function AdPolicyProvider({
  category,
  children,
}: {
  category: CategoryId;
  children: React.ReactNode;
}) {
  return (
    <AdPolicyContext.Provider
      value={{
        getPolicy: (adType) => getAdPolicy(category, adType),
        isAllowed: (adType) => isAdAllowed(category, adType),
      }}
    >
      {children}
    </AdPolicyContext.Provider>
  );
}

export function useAdPolicy(): AdPolicyContextValue {
  const ctx = useContext(AdPolicyContext);
  if (!ctx) throw new Error("useAdPolicy must be used within AdPolicyProvider");
  return ctx;
}
