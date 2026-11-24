"use client";

import { X } from "lucide-react";
import { categories, type CategoryId } from "@/data/categories";
import { cn } from "@/lib/utils";

const FILLED_COLORS: Record<CategoryId, string> = {
  fintech: "aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white aria-pressed:ring-blue-700",
  logistics: "aria-pressed:border-cyan-700 aria-pressed:bg-cyan-700 aria-pressed:text-white aria-pressed:ring-cyan-700",
  manufacturing: "aria-pressed:border-violet-700 aria-pressed:bg-violet-700 aria-pressed:text-white aria-pressed:ring-violet-700",
  healthcare: "aria-pressed:border-red-700 aria-pressed:bg-red-700 aria-pressed:text-white aria-pressed:ring-red-700",
  astrology: "aria-pressed:border-fuchsia-700 aria-pressed:bg-fuchsia-700 aria-pressed:text-white aria-pressed:ring-fuchsia-700",
  edtech: "aria-pressed:border-amber-400 aria-pressed:bg-amber-400 aria-pressed:text-slate-950 aria-pressed:ring-amber-400",
  "real-estate": "aria-pressed:border-emerald-700 aria-pressed:bg-emerald-700 aria-pressed:text-white aria-pressed:ring-emerald-700",
};

export function IndustryFilters({ selected, onToggle, onClear, selectedOnly = false, solidSelected = false, scrollable = false }: {
  selected: CategoryId[];
  onToggle: (id: CategoryId) => void;
  onClear: () => void;
  selectedOnly?: boolean;
  solidSelected?: boolean;
  scrollable?: boolean;
}) {
  const visible = selectedOnly ? categories.filter((item) => selected.includes(item.id)) : categories;
  return (
    <div role="group" aria-label={selectedOnly ? "Selected industries" : "Filter solutions by industry"} className={cn("flex flex-wrap items-center gap-2", scrollable && "max-md:flex-nowrap max-md:overflow-x-auto max-md:py-1 max-md:px-1 max-md:[scrollbar-width:none]! max-md:[&::-webkit-scrollbar]:hidden!")}>
      {!selectedOnly && <button type="button" aria-pressed={!selected.length} onClick={onClear} className={cn("min-h-11 shrink-0 rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:border-blue-600", solidSelected ? "aria-pressed:border-slate-900 aria-pressed:bg-slate-900 aria-pressed:text-white" : "aria-pressed:border-blue-600 aria-pressed:bg-blue-50 aria-pressed:text-blue-800")}>All industries</button>}
      {visible.map((item) => {
        const active = selected.includes(item.id);
        return (
          <button key={item.id} type="button" aria-pressed={active} aria-label={selectedOnly ? `Remove ${item.label} filter` : item.label} onClick={() => onToggle(item.id)} className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium text-slate-800 transition-colors max-md:px-3 max-md:text-xs",
            "border-[var(--chip)] bg-[color-mix(in_srgb,var(--chip)_12%,white)] hover:bg-[color-mix(in_srgb,var(--chip)_30%,white)]",
            solidSelected ? `aria-pressed:ring-1 ${FILLED_COLORS[item.id]}` : "aria-pressed:bg-[color-mix(in_srgb,var(--chip)_40%,white)] aria-pressed:ring-1 aria-pressed:ring-[var(--chip)]",
            item.color,
          )}>
            <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full bg-[var(--chip)] ring-1 ring-slate-900/10", solidSelected && active && "bg-current ring-0")} />
            {item.label}
            {active && <X className="size-3.5" aria-hidden="true" />}
          </button>
        );
      })}
      {!!selected.length && <button type="button" onClick={onClear} className="min-h-11 shrink-0 px-3 text-sm font-semibold text-blue-700 hover:underline">Clear all</button>}
    </div>
  );
}
