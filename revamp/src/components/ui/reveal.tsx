"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ============================================================================
   Reveal  —  the one motion primitive in the project
   ----------------------------------------------------------------------------
   A short fade and rise, once, when the element is scrolled into view. Nothing
   else: no parallax, no loops, no scroll-linked effects.

   WHY NOT A MOTION LIBRARY
   ------------------------
   Most of them render the element with `opacity: 0` in the HTML and let
   JavaScript reveal it. If the script fails, or a crawler does not run it, the
   page is blank, which is a worse bug than having no animation. So:

     - The server-rendered state is always the FINAL state: fully visible.
     - On mount, only elements that are still below the fold get hidden, and
       only just before they would be seen. Nothing above the fold ever animates.
     - IntersectionObserver then reveals them.

   `prefers-reduced-motion: reduce` disables the effect entirely.
   ========================================================================== */

type RevealProps = {
  children: ReactNode;
  /** delay before this element starts, in ms; used to stagger a small group */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    /* Already on screen at mount: leave it alone, there is nothing to reveal. */
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          window.setTimeout(() => setState("shown"), delay);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement & HTMLElement>}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-out will-change-[opacity,transform] motion-reduce:transition-none",
        state === "hidden" && "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
