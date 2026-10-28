import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ============================================================================
   Button
   ----------------------------------------------------------------------------
   Four variants only, because there are only four jobs: the one primary action
   on a light surface, the same action on the ink surface, a quiet secondary,
   and a text link. Anything more and the hierarchy stops meaning anything.

   Heights are tap-safe (44px at default), the icon slot is sized once here so
   callers never pass widths, and the focus ring comes from globals.css.
   ========================================================================== */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-lg font-semibold tracking-[-0.005em]",
    "transition-[background-color,color,border-color,transform] duration-200",
    "disabled:pointer-events-none disabled:opacity-55",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        /* the one primary action on this site, on every dark band */
        default:
          "btn-primary",
        /* same action, on a light surface: the inverse */
        onInk:
          "bg-on-dark text-band-base hover:bg-on-dark active:translate-y-px",
        /* quiet secondary */
        outline:
          "border border-glass-border bg-transparent text-on-dark hover:border-glass-border-hover hover:bg-glass",
        /* a text link */
        link: "text-accent-bright underline-offset-4 hover:underline",
      },
      size: {
        /* tap targets: never under 44px */
        sm: "h-11 px-5 text-[0.9375rem]",
        default: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
