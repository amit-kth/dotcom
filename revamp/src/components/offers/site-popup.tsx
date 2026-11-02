"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
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
          className="offer-popup fixed right-3 bottom-3 z-[111] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white text-slate-950 shadow-2xl sm:right-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
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
          <div className="popup-copy absolute inset-x-0 bottom-0 flex flex-col items-center text-center">
            <p className="popup-eyebrow font-semibold uppercase tracking-[0.2em] text-slate-500">
              {offer ? "A little more, for less" : "Let’s talk software"}
            </p>
            <Dialog.Title className={`popup-heading mt-2 font-semibold tracking-tight ${offer ? "" : "max-w-[15ch]"}`}>
              {offer?.heading ?? "Your next move, made simple."}
            </Dialog.Title>
            {offer && <p className="popup-discount font-bold tracking-[-0.06em]">{offer.discount}</p>}
            <Dialog.Description className="popup-description text-slate-500">
              {offer ? offerProductNames : "Tell us what you need. We’ll help you find the right fit."}
            </Dialog.Description>
            <Link href={contact.contactPath} onClick={close} className={`${buttonVariants()} popup-cta ${offer ? "offer-colors" : ""}`} data-tone={offer?.tone}>
              {offer?.cta ?? "Contact us"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <Dialog.Close asChild>
            <button type="button" aria-label="Close popup" className="popup-close absolute top-3 right-3 flex size-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-sm hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2">
              <X className="size-5" aria-hidden="true" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
