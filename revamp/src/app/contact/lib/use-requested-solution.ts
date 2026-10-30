"use client";

import { useEffect, useState } from "react";
import { products, type Product } from "@/data/products";

/* ============================================================================
   useRequestedSolution ,  reads ?solution= on /contact
   ----------------------------------------------------------------------------
   A product banner sends the visitor to `/contact?solution=k-exam`. That one
   parameter decides two things: the heading ("Request a demo of K-Exam") and the
   solution field of the form.

   HOW IT IS READ
   From `window.location.search` in an effect, not with `useSearchParams`. The
   site is a static export, so there is no request to read at build time; a hook
   that only runs in the browser keeps the page prerenderable and the first paint
   identical for everyone. An unknown or absent id is simply "no product", the
   heading falls back to "Contact us" and the field stays empty.

   WHY IT NEVER FLASHES
   The heading renders its neutral state first and only changes if the parameter
   exists, so arriving from a banner costs one frame of "Contact us". That is
   cheaper than wrapping the page in a Suspense boundary for a static export.
   ========================================================================== */

export function useRequestedSolution(): Product | null {
  const [solution, setSolution] = useState<Product | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("solution");
    if (!id) return;
    setSolution(products.find((product) => product.id === id) ?? null);
  }, []);

  return solution;
}
