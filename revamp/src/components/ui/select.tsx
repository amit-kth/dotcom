"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================================
   Select  —  shadcn shape, our tokens
   ----------------------------------------------------------------------------
   Radix does the keyboard work (type-ahead, arrow keys, Escape, focus return),
   which is why this is a library primitive and not a styled <select>. Only the
   trigger and the item list are ours.

   Two surfaces are styled: the default (light band: white, ink text, hairline)
   and `onDark` (dark band: glass fill, light text). Anything else is a variant
   waiting to be designed, and we do not add variants without a job for them.
   ========================================================================== */

/* Light is the default surface (paper band: white, ink text, hairline). `dark`
   is the same control on a dark band. No third variant exists, because no third
   surface does. */
const TRIGGER = [
  "inline-flex h-11 min-w-[12.5rem] items-center justify-between gap-3 rounded-[0.6875rem] px-3.5 text-[0.9375rem] font-semibold tracking-[-0.006em]",
  "border border-slate-200 bg-white text-slate-950 shadow-[0_1px_2px_rgb(5_1_37/0.06)]",
  "transition-[border-color,background-color,box-shadow] duration-[160ms]",
  "hover:border-[color-mix(in_oklch,var(--color-blue-600)_40%,var(--color-slate-200))]",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
];

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
  className,
  children,
  surface = "light",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  surface?: "light" | "dark";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        ...TRIGGER,
        surface === "dark" &&
          "border-white/15 bg-white/[0.04] text-slate-50 shadow-none hover:border-white/30 hover:bg-white/[0.08]",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 opacity-60" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "z-70 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden",
          "rounded-[0.875rem] border border-slate-200 bg-white shadow-[0_24px_48px_-24px_rgb(5_1_37/0.35)]",
          "animate-[select-in_140ms_cubic-bezier(0.22,0.61,0.36,1)]",
          className,
        )}
        position={position}
        sideOffset={6}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-[0.3125rem]">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex h-9 cursor-pointer items-center justify-between gap-3 rounded-[0.5rem] px-2.5 text-[0.9375rem] text-slate-950 outline-none",
        "data-[highlighted]:bg-slate-100 data-[state=checked]:font-semibold data-[state=checked]:text-blue-600",
        className,
      )}
      {...props}
    >
      <span className="truncate">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>
      <SelectPrimitive.ItemIndicator className="inline-flex text-blue-600">
        <Check className="size-3.5" aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "px-2.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-slate-500 uppercase",
        className,
      )}
      {...props}
    />
  );
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
};
