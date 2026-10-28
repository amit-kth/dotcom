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
        /* the single primary action, light surfaces */
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_0_hsl(var(--primary)/0.9)] hover:bg-primary/92 active:translate-y-px",
        /* same job, on a dark band */
        onInk:
          "bg-ink-foreground text-ink hover:bg-white active:translate-y-px",
        /* quiet secondary */
        outline:
          "border border-border bg-transparent text-foreground hover:border-foreground/35 hover:bg-secondary",
        /* quiet secondary, on a dark band */
        outlineOnInk:
          "border border-line-on-ink bg-transparent text-ink-foreground hover:border-ink-foreground/45 hover:bg-white/5",
        ghost: "text-foreground hover:bg-secondary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[0.9375rem]",
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
