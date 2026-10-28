"use client";

import { useId, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { cn } from "@/lib/utils";

/* ============================================================================
   EnquiryForm  —  one form, used by the contact section and the demo dialog
   ----------------------------------------------------------------------------
   Fields mirror the old site: name, email, phone (with country code), message.
   Behaviour mirrors it too: everything required, validated before submit.

   States implemented: idle, submitting, success, error. Each has its own UI:
   - submitting: button shows a spinner and is disabled, inputs disabled
   - success: the form is replaced by a confirmation panel
   - error: an alert above the button, form keeps what the visitor typed

   Accessibility: every field has a <label>, errors are wired with
   aria-invalid + aria-describedby, and the status message is a live region.
   ========================================================================== */

type EnquiryFormProps = {
  /** When the dialog is opened from a product row, that product is prefilled. */
  product?: string;
  /** Called after a successful submission, e.g. to close the dialog. */
  onSuccess?: () => void;
  className?: string;
};

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function EnquiryForm({ product, onSuccess, className }: EnquiryFormProps) {
  const uid = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");

  const validate = (): Errors => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email address.";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 6) next.phone = "Please enter a valid phone number.";
    if (message.trim().length < 10)
      next.message = "Please tell us a little more, at least a line or two.";
    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setServerError("");

    const result = await submitEnquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country,
      message: message.trim(),
      product,
    });

    if (result.ok) {
      setStatus("success");
      onSuccess?.();
    } else {
      setServerError(result.error);
      setStatus("error");
    }
  };

  /* ---------------------------------------------------------------- success */
  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-4 rounded-xl border border-border bg-secondary/60 p-6",
          className,
        )}
        role="status"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-base font-semibold">Thank you, that is with us.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We will reply within one working day to arrange the walkthrough
            {product ? ` for ${product}` : ""}.
          </p>
        </div>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("space-y-4", className)}>
      {product && (
        <p className="rounded-md border border-border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
          Enquiry about{" "}
          <span className="font-semibold text-foreground">{product}</span>
        </p>
      )}

      {/* name + email share a row from sm up */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          label="Your name"
          error={errors.name}
          input={
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              disabled={busy}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${uid}-name-error` : undefined}
              className={inputClass(Boolean(errors.name))}
            />
          }
        />
        <Field
          id={`${uid}-email`}
          label="Email address"
          error={errors.email}
          input={
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              disabled={busy}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${uid}-email-error` : undefined}
              className={inputClass(Boolean(errors.email))}
            />
          }
        />
      </div>

      <Field
        id={`${uid}-phone`}
        label="Phone"
        error={errors.phone}
        hint="We only use this to arrange the call."
        input={
          <PhoneInput
            defaultCountry="in"
            value={phone}
            disabled={busy}
            onChange={(value, meta) => {
              setPhone(value);
              if (meta?.country?.name) setCountry(meta.country.name);
            }}
            /* Theming lives in app/globals.css under `.phone-field`, driven by
               the library's own CSS variables. Nothing to override here. */
            className={cn("phone-field w-full", errors.phone && "phone-field--error")}
            inputProps={{
              id: `${uid}-phone`,
              name: "phone",
              "aria-invalid": Boolean(errors.phone),
              "aria-describedby": errors.phone ? `${uid}-phone-error` : undefined,
            }}
          />
        }
      />

      <Field
        id={`${uid}-message`}
        label="What are you trying to solve?"
        error={errors.message}
        input={
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            required
            value={message}
            disabled={busy}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
            className={cn(inputClass(Boolean(errors.message)), "h-auto resize-y py-3")}
          />
        }
      />

      {status === "error" && serverError && (
        <p
          role="alert"
          className="rounded-md border border-primary/40 bg-primary/5 px-3 py-2 text-xs text-foreground"
        >
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
        <Button type="submit" size="lg" disabled={busy} className="min-w-[10rem]">
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="meta dim">Usually a reply within one working day.</p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ helpers */

function inputClass(hasError: boolean) {
  return cn(
    /* white, not the paper background: the card is paper, so the field has to
       sit a step above it or the inputs disappear into it */
    "h-12 w-full rounded-lg border bg-white px-3.5 text-sm text-foreground",
    "placeholder:text-muted-foreground/70",
    "disabled:cursor-not-allowed disabled:opacity-60",
    hasError ? "border-primary" : "border-border",
  );
}

function Field({
  id,
  label,
  hint,
  error,
  input,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-foreground">
        {label}
      </label>
      {input}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-primary">
          {error}
        </p>
      )}
    </div>
  );
}
