"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { CategoryId } from "@/data/categories";

type CategoryContextValue = {
  selected: CategoryId[];
  toggleCategory: (id: CategoryId) => void;
  clearCategories: () => void;
};
const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<CategoryId[]>([]);
  const toggleCategory = useCallback((id: CategoryId) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }, []);
  const clearCategories = useCallback(() => setSelected([]), []);
  const value = useMemo(
    () => ({ selected, toggleCategory, clearCategories }),
    [selected, toggleCategory, clearCategories],
  );
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context)
    throw new Error("useCategory must be used inside <CategoryProvider>");
  return context;
}
