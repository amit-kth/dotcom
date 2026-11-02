"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowUpRight, X } from "lucide-react";
import { contact } from "@/config/variables";
import { offer, offerProductNames, popupImages, offerColors } from "@/data/offer";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export function SitePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpen(false);
    const route = pathname.replace(/\/$/, "") || "/";
    if (route !== "/" && route !== "/solutions") return;
    let shown = false;
    const tryOpen = () => {
      if (shown || document.hidden) return;
      const target = document.getElementById(route === "/" ? "top" : "solutions-product-list");
      if (!target) return;
      const edge = route === "/"
        ? document.querySelector("header")?.getBoundingClientRect().height ?? 0
        : window.innerHeight;
      if (target.getBoundingClientRect().bottom > edge) return;
      if (document.querySelector('[role="dialog"], [role="alertdialog"]')) return;
      shown = true;
      previousFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    // A reload can restore scroll after hydration; recheck the real position.
    const frame = requestAnimationFrame(tryOpen);
    const observer = new MutationObserver(tryOpen);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", tryOpen, { passive: true });
    window.addEventListener("resize", tryOpen);
    window.addEventListener("pageshow", tryOpen);
    document.addEventListener("visibilitychange", tryOpen);
    tryOpen();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", tryOpen);
      window.removeEventListener("resize", tryOpen);
      window.removeEventListener("pageshow", tryOpen);
      document.removeEventListener("visibilitychange", tryOpen);
    };
  }, [pathname]);

  const close = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) close(); }}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="z-[110] bg-slate-950/45 animate-offer-fade-in motion-reduce:animate-none"
        data-site-popup
        aria-modal="true"
        data-tone={offer?.tone}
        className="@container/popup aspect-square animate-offer-popup-in motion-reduce:animate-none block top-auto left-auto right-3 bottom-3 w-[min(30rem,calc(100vw-1.5rem),50dvh)] sm:w-[min(30rem,calc(100vw-2rem),80dvh)] max-w-none translate-x-0 translate-y-0 gap-0 p-0 z-[111] overflow-hidden rounded-[1.75rem] border-0 bg-white text-slate-950 shadow-2xl sm:right-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
        onKeyDown={(event) => {
          // Keep the global search shortcut from opening a second modal.
          if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") event.stopPropagation();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (previousFocus.current?.isConnected) previousFocus.current.focus({ preventScroll: true });
        }}
      >
        <img
          src={offer ? popupImages[offer.tone] : popupImages.contact}
          alt=""
          width={960}
          height={960}
          className="absolute inset-0 size-full object-contain"
        />
        <div className={cn("absolute inset-x-0 bottom-0 flex flex-col items-center text-center", offer ? "h-[54%] px-[6%] pt-[1.5%] pb-[4%]" : "h-[51%] px-[7%] pb-[5%]")}>
          <p className="text-[2.1cqi] leading-[1.3] @max-[320px]/popup:hidden font-semibold uppercase tracking-[0.2em] text-slate-500">
            {offer ? "A little more, for less" : "Let’s talk software"}
          </p>
          <DialogTitle className={cn("font-semibold leading-[1.08] tracking-tight @max-[320px]/popup:mt-0", offer ? "mt-[1cqi] text-[7cqi]" : "mt-2 max-w-[15ch] text-[6cqi]")}>
            {offer?.heading ?? "Can’t find the right product?"}
          </DialogTitle>
          {offer && <p className="mt-[1cqi] text-[13cqi] leading-none font-bold tracking-[-0.06em]">{offer.discount}</p>}
          <DialogDescription className={cn("mt-[2cqi] max-w-[32ch]", offer ? "max-h-[13cqi] w-full overflow-y-auto rounded-[2cqi] bg-slate-100 px-[3cqi] py-[1.5cqi] text-[clamp(13px,4cqi,20px)] font-semibold leading-[1.25] text-slate-950" : "text-[clamp(11px,3cqi,15px)] leading-[1.45] text-slate-600")}>
            {offer ? offerProductNames : "Contact our team. We’ll help you choose the right solution."}
          </DialogDescription>
          <Link href={contact.contactPath} onClick={close} className={cn(buttonVariants(), "mt-auto min-h-8 rounded-[3cqi] px-[5cqi] @max-[320px]/popup:min-h-9", offer ? `h-[11cqi] w-full text-[clamp(13px,3.4cqi,17px)] ${offerColors[offer.tone]}` : "h-[10cqi] text-[clamp(12px,3cqi,15px)]")} data-tone={offer?.tone}>
            {offer?.cta ?? "Contact us"}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <DialogClose asChild>
          <button type="button" aria-label="Close popup" className="absolute top-3 right-3 flex size-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-sm hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400">
            <X className="size-5" aria-hidden="true" />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
