"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { CategoryId } from "@/data/categories";

/* ============================================================================
   CategoryContext
   ----------------------------------------------------------------------------
   The hero chips and the solutions list are in two different sections and both
   need the chosen industry, so the choice lives here rather than in either
   component.

   `null` means "no filter", and that is the default: the page opens showing
   everything, and clearing a chip returns to exactly that state.
   ========================================================================== */

type CategoryContextValue = {
  selected: CategoryId | null;
  setSelected: (id: CategoryId | null) => void;
};

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<CategoryId | null>(null);
  const value = useMemo(() => ({ selected, setSelected }), [selected]);

  return (
    <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used inside <CategoryProvider>");
  }
  return context;
}
