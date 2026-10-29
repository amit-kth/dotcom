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

const buttonVariants = cva(
  ["btn", "disabled:pointer-events-none", "[&_svg]:size-4 [&_svg]:shrink-0"].join(" "),
  {
    variants: {
      variant: {
        primary: "btn--primary",
        inverse: "btn--inverse",
        secondary: "btn--secondary",
        outline: "btn--outline",
        ghost: "btn--ghost",
        link: "btn--link",
      },
      size: {
        sm: "btn--sm",
        md: "btn--md",
        lg: "btn--lg",
        icon: "btn--icon",
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
