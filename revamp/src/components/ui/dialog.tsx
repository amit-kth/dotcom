"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================================
   Dialog  —  shadcn/ui pattern, hand-written on Radix
   ----------------------------------------------------------------------------
   Used by "Request a demo": it opens with the industry and solution already
   filled in, and renders the one <EnquiryForm />.

   Radix provides the parts that are easy to get wrong: focus trap, Escape,
   aria-modal, labelled by the title, described by the description, focus
   returned to the trigger on close, and scroll lock on the body.

   The enter animation is a few lines of CSS in globals.css keyed off
   data-state, because the usual animate-in utilities come from a plugin this
   project does not install.
   ========================================================================== */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-50 bg-material backdrop-blur-[3px]" />
      <DialogPrimitive.Content
        className={cn(
          "dialog-content modal-surface fixed left-1/2 top-1/2 z-50 w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 -translate-y-1/2",
          "max-h-[92svh] overflow-y-auto rounded-lg p-6 sm:p-8",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-md text-on-dark-soft transition-colors hover:bg-glass hover:text-on-dark"
          aria-label="Close"
        >
          <X className="size-5" aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-6 pr-12">{children}</div>;
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-2xl font-bold tracking-[-0.03em] text-on-dark", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("mt-2 text-[1rem] leading-relaxed text-on-dark-soft", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
