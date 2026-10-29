import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================================
   Button
   ----------------------------------------------------------------------------
   One component for every action on the site.

   VARIANTS — five, because there are five jobs:
     primary    the one saturated action (blue, white label)
     inverse    the same action on a dark band, inverted to white
     secondary  a quiet action on a light band
     outline    a quiet action on a dark band
     ghost      a chrome-level action, e.g. inside a dark nav
     link       inline text that happens to be an action

   ICONS
   Pass a lucide icon component as `icon`; the component owns the size, the gap
   and the alignment, so no call site needs to hand-tune an SVG again. The icon
   can sit left (default) or right, and right is what the primary CTAs use:
   label first, arrow toward the next step.

   SIZES
   sm 36px · md 44px · lg 52px. Nothing on the site is under 36px, and anything
   that is the only way to act is md or larger.
   ========================================================================== */

/* Every value here was previously a rule in globals.css (.btn, .btn--primary,
   …). It is a utility string now: there is no `.btn` class in the stylesheet,
   and adding a variant means adding a row below, not a new block of CSS.

   The primary's hover is `brightness-[1.08]` rather than the old pseudo-element
   gradient swap: one utility instead of two ::before/::after rules, and it
   reads the same at this size. */
const buttonVariants = cva(
  [
    "relative isolate inline-flex h-11 cursor-pointer items-center justify-center gap-2",
    "rounded-[0.6875rem] border border-transparent px-5",
    "text-[0.9375rem] leading-none font-semibold tracking-[-0.006em] whitespace-nowrap no-underline",
    "transition-[background-color,border-color,color,box-shadow,transform,filter] duration-[180ms] ease-out",
    "hover:-translate-y-px active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-55",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "border-white/12 text-white",
          "bg-[linear-gradient(180deg,#4066ec_0%,var(--brand)_52%,#2447cf_100%)]",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.26),inset_0_-1px_0_rgb(4_1_30/0.22),0_1px_2px_rgb(4_1_30/0.35),0_12px_26px_-14px_var(--accent-glow)]",
          "hover:brightness-[1.08]",
          "hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.3),inset_0_-1px_0_rgb(4_1_30/0.22),0_1px_2px_rgb(4_1_30/0.35),0_18px_34px_-16px_var(--accent-glow)]",
        ].join(" "),
        inverse: [
          "border-white/16 bg-on-dark text-brand-ink",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_1px_2px_rgb(4_1_30/0.4),0_10px_26px_-18px_rgb(0_0_0/0.8)]",
          "hover:bg-white",
        ].join(" "),
        secondary: [
          "border-line bg-white text-brand-ink shadow-[0_1px_2px_rgb(5_1_37/0.06)]",
          "hover:border-brand/45 hover:text-brand hover:shadow-[0_10px_22px_-16px_rgb(5_1_37/0.45)]",
        ].join(" "),
        outline: [
          "border-glass-border bg-white/[0.02] text-on-dark",
          "hover:border-glass-border-hover hover:bg-white/10",
        ].join(" "),
        ghost:
          "bg-transparent text-on-dark-soft hover:bg-white/[0.06] hover:text-on-dark",
        link: "h-auto border-0 bg-transparent p-0 text-accent-bright hover:underline hover:underline-offset-4",
      },
      size: {
        sm: "h-9 rounded-[0.625rem] px-3.5 text-sm",
        md: "h-11",
        lg: "h-[3.25rem] rounded-[0.8125rem] px-7 text-base",
        icon: "w-11 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonOwnProps = {
  asChild?: boolean;
  /** A lucide icon component. The size is handled here, not by the caller. */
  icon?: LucideIcon;
  /** Icons point at the next step, so they default to the trailing edge. */
  iconPosition?: "left" | "right";
};

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  ButtonOwnProps;

function Button({
  className,
  variant,
  size,
  asChild = false,
  icon: Icon,
  iconPosition = "right",
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const glyph = Icon ? <Icon aria-hidden="true" /> : null;

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {iconPosition === "left" && glyph}
      {children}
      {iconPosition === "right" && glyph}
    </Comp>
  );
}

export { Button, buttonVariants };
