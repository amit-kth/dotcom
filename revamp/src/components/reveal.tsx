"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ============================================================================
   Reveal ,  the one entrance on the page
   ----------------------------------------------------------------------------
   20px up and a fade, once, when the block is a fifth of the way into the
   viewport. Nothing else moves, nothing loops, and `prefers-reduced-motion`
   renders it already in place.

   Every section uses this and only this, so the page has one motion signature
   instead of a different trick per band.
   ========================================================================== */

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = as === "li" ? motion.li : motion.div;

  if (reduceMotion) {
    const Tag = as === "li" ? "li" : "div";
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
