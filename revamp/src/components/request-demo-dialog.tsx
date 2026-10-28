"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/enquiry-form";

/* ============================================================================
   RequestDemoDialog  —  the primary action on every product
   ----------------------------------------------------------------------------
   Demos are not public: no IDs, no passwords, no links to a demo instance.
   The button opens this dialog with the product already attached, and the same
   enquiry component used by the contact section does the work.

   The trigger is a real <button>, so keyboard and screen readers get the dialog
   behaviour from Radix: focus trap, Escape to close, focus returned on close.
   ========================================================================== */

type RequestDemoDialogProps = {
  /** Omit for the site-wide "Request a demo" button in the header and CTA bands. */
  product?: string;
  /** label override; defaults to the product's own CTA label */
  label?: string;
  className?: string;
  size?: React.ComponentProps<typeof Button>["size"];
  variant?: React.ComponentProps<typeof Button>["variant"];
};

export function RequestDemoDialog({
  product,
  label,
  className,
  size = "default",
  variant = "default",
}: RequestDemoDialogProps) {
  const [open, setOpen] = useState(false);

  const triggerLabel = label ?? "Request a demo";
  const title = product ? `Request a demo of ${product}` : "Request a demo";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={className}>
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Tell us what you run and we will show you the closest thing we have
            already built. No signup, no software to install.
          </DialogDescription>
        </DialogHeader>

        <EnquiryForm product={product} />
      </DialogContent>
    </Dialog>
  );
}
