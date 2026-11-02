"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** GTM owns the initial view; only report subsequent pathname changes. */
export function RouteTracker() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "page_view", page_path: pathname });
  }, [pathname]);

  return null;
}
