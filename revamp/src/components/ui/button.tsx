import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** shadcn Button: Radix Slot + CVA variants + Tailwind utilities. */
const buttonVariants = cva(
  [
    "relative isolate inline-flex h-11 cursor-pointer items-center justify-center gap-2",
    "rounded-xl border border-transparent px-5",
    "text-[0.9375rem] leading-none font-semibold tracking-[-0.006em] whitespace-nowrap no-underline",
    "transition-[background-color,border-color,color,box-shadow,transform,filter] duration-[180ms] ease-out",
    "hover:-translate-y-px active:translate-y-px",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
        inverse: [
          "border-white/16 bg-slate-50 text-slate-950",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_1px_2px_rgb(4_1_30/0.4),0_10px_26px_-18px_rgb(0_0_0/0.8)]",
          "hover:bg-white",
        ].join(" "),
        secondary: [
          "border-slate-200 bg-white text-slate-950 shadow-[0_1px_2px_rgb(5_1_37/0.06)]",
          "hover:border-blue-600/45 hover:text-blue-600 hover:shadow-[0_10px_22px_-16px_rgb(5_1_37/0.45)]",
        ].join(" "),
        outline: [
          "border-white/15 bg-white/[0.02] text-slate-50",
          "hover:border-white/30 hover:bg-white/10",
        ].join(" "),
        ghost:
          "bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-slate-50",
        link: "h-auto border-0 bg-transparent p-0 text-blue-100 hover:underline hover:underline-offset-4",
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
