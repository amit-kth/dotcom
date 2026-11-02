"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { contact } from "@/config/variables";
import { offer, offerProductNames, popupImages } from "@/data/offer";
import { buttonVariants } from "@/components/ui/button";

export function SitePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const key = `popup-seen-${offer?.id ?? "contact"}`;

  useEffect(() => {
    setOpen(false);
    if (pathname.replace(/\/$/, "") === contact.contactPath) return;
    try { if (localStorage.getItem(key)) return; } catch { /* Storage may be blocked. */ }
    let ready = false;
    let shown = false;
    const tryOpen = () => {
      if (shown) return;
      const hero = document.getElementById("top");
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      if (hero && hero.getBoundingClientRect().bottom <= headerHeight) ready = true;
      if (!ready || document.hidden || document.querySelector('[role="dialog"], [role="alertdialog"]')) return;
      shown = true;
      previousFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    const timer = window.setTimeout(() => { ready = true; tryOpen(); }, 8000);
    const observer = new MutationObserver(tryOpen);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", tryOpen, { passive: true });
    document.addEventListener("visibilitychange", tryOpen);
    tryOpen(); // A returning navigation may already be scrolled beyond the hero.
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", tryOpen);
      document.removeEventListener("visibilitychange", tryOpen);
    };
  }, [key, pathname]);

  const close = () => {
    try { localStorage.setItem(key, "true"); } catch { /* Still close without storage. */ }
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => { if (!next) close(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="offer-popup-overlay fixed inset-0 z-[110] bg-slate-950/45" />
        <Dialog.Content
          data-site-popup
          aria-modal="true"
          data-tone={offer?.tone}
          className={`offer-popup fixed inset-x-3 bottom-3 z-[111] max-h-[50dvh] overflow-y-auto rounded-2xl border border-slate-200 shadow-2xl sm:inset-x-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:max-h-[80dvh] sm:w-[min(44rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 ${offer ? "bg-white text-slate-950 sm:grid sm:grid-cols-2" : "bg-slate-950 text-white sm:max-w-lg"}`}
          onKeyDown={(event) => {
            // Keep the global search shortcut from opening a second modal.
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") event.stopPropagation();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (previousFocus.current?.isConnected) previousFocus.current.focus({ preventScroll: true });
          }}
        >
          <div className={offer ? "offer-popup-art offer-colors h-16 sm:h-full sm:min-h-72" : "absolute inset-0"} data-tone={offer?.tone}>
            <img
              src={offer ? popupImages[offer.tone] : popupImages.contact}
              alt=""
              className={offer ? "size-full object-contain" : "size-full object-cover"}
              onError={(event) => { event.currentTarget.style.display = "none"; }}
            />
            {!offer && <div className="absolute inset-0 bg-slate-950/60" />}
          </div>
          <div className="relative p-4 sm:p-7">
            <Dialog.Title className="pr-8 text-xl font-semibold leading-tight sm:text-2xl">
              {offer?.heading ?? "Find the right solution."}
            </Dialog.Title>
            {offer && <p className="offer-colors mt-2 inline-block rounded-lg px-2 py-1 text-3xl font-bold leading-tight sm:mt-4 sm:text-4xl" data-tone={offer.tone}>{offer.discount}</p>}
            <Dialog.Description className={`mt-2 text-sm leading-relaxed sm:mt-4 ${offer ? "text-slate-600" : "text-slate-200"}`}>
              {offer ? offerProductNames : "Tell us what you need. We will help you find what fits."}
            </Dialog.Description>
            <Link href={contact.contactPath} onClick={close} className={`${buttonVariants()} mt-3 sm:mt-6 ${offer ? "offer-colors" : ""}`} data-tone={offer?.tone}>
              {offer?.cta ?? "Contact us"}
            </Link>
          </div>
          <Dialog.Close asChild>
            <button type="button" aria-label="Close popup" className="absolute top-2 right-2 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-slate-950 shadow-sm hover:bg-slate-100">
              <X className="size-5" aria-hidden="true" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
