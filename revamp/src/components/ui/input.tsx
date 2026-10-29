import * as React from "react";
import { cn } from "@/lib/utils";

/** shadcn-style native input: slots, accessible states, and utility overrides. */
export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "flex h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-slate-400",
        "focus-visible:border-blue-600 focus-visible:ring-[3px] focus-visible:ring-blue-600/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        className,
      )}
      {...props}
    />
  );
}
