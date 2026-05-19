"use client";

import { createContext, useContext } from "react";
import type { CategoryId, CategoryConfig } from "@/lib/category";
import { getCategoryById } from "@/lib/category";

const CategoryContext = createContext<CategoryConfig | null>(null);

export function CategoryProvider({
  category,
  children,
}: {
  category: CategoryId;
  children: React.ReactNode;
}) {
  const config = getCategoryById(category);
  return (
    <CategoryContext.Provider value={config}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory(): CategoryConfig {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategory must be used within CategoryProvider");
  return ctx;
}
