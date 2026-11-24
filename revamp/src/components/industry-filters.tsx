"use client";

import { X } from "lucide-react";
import { categories, type CategoryId } from "@/data/categories";
import { cn } from "@/lib/utils";

export function IndustryFilters({ selected, onToggle, onClear, selectedOnly = false }: {
  selected: CategoryId[];
  onToggle: (id: CategoryId) => void;
  onClear: () => void;
  selectedOnly?: boolean;
}) {
  const visible = selectedOnly ? categories.filter((item) => selected.includes(item.id)) : categories;
  return (
    <div role="group" aria-label={selectedOnly ? "Selected industries" : "Filter solutions by industry"} className="flex flex-wrap items-center gap-2">
      {!selectedOnly && <button type="button" aria-pressed={!selected.length} onClick={onClear} className="min-h-11 rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:border-blue-600 aria-pressed:border-blue-600 aria-pressed:bg-blue-50 aria-pressed:text-blue-800">All industries</button>}
      {visible.map((item) => {
        const active = selected.includes(item.id);
        return (
          <button key={item.id} type="button" aria-pressed={active} aria-label={selectedOnly ? `Remove ${item.label} filter` : item.label} onClick={() => onToggle(item.id)} className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium text-slate-800 transition-colors max-md:px-3 max-md:text-xs",
            "border-[var(--chip)] bg-[color-mix(in_srgb,var(--chip)_12%,white)] hover:bg-[color-mix(in_srgb,var(--chip)_30%,white)]",
            "aria-pressed:bg-[color-mix(in_srgb,var(--chip)_40%,white)] aria-pressed:ring-1 aria-pressed:ring-[var(--chip)]",
            item.color,
          )}>
            <span aria-hidden="true" className="size-2 rounded-full bg-[var(--chip)] ring-1 ring-slate-900/10" />
            {item.label}
            {active && <X className="size-3.5" aria-hidden="true" />}
          </button>
        );
      })}
      {!!selected.length && <button type="button" onClick={onClear} className="min-h-11 px-3 text-sm font-semibold text-blue-700 hover:underline">Clear all</button>}
    </div>
  );
}
