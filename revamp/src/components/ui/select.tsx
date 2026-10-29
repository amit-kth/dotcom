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
      className={cn(
        "select-trigger",
        surface === "dark" && "select-trigger--dark",
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
        className={cn("select-content", className)}
        position={position}
        sideOffset={6}
        {...props}
      >
        <SelectPrimitive.Viewport className="select-viewport">
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
    <SelectPrimitive.Item className={cn("select-item", className)} {...props}>
      <span className="select-item__label">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>
      <SelectPrimitive.ItemIndicator className="select-item__check">
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
    <SelectPrimitive.Label className={cn("select-label", className)} {...props} />
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
