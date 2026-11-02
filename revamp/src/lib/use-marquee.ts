"use client";

import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Native animation preserves the loop's position when hover or focus pauses it. */
export function useMarquee(root: RefObject<HTMLElement | null>, duration: number) {
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const element = root.current;
    if (!element || reduceMotion) return;
    const animations = Array.from(element.querySelectorAll<HTMLElement>("[data-marquee-copy]")).map((copy) =>
      copy.animate([{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }], { duration, iterations: Infinity, easing: "linear" }),
    );
    const update = () => animations.forEach((animation) => {
      if (document.hidden || element.matches(":hover, :focus-within")) animation.pause();
      else animation.play();
    });
    for (const event of ["mouseenter", "mouseleave", "focusin", "focusout"]) element.addEventListener(event, update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      animations.forEach((animation) => animation.cancel());
      for (const event of ["mouseenter", "mouseleave", "focusin", "focusout"]) element.removeEventListener(event, update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [root, duration, reduceMotion]);
}
