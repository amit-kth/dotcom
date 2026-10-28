"use client";

import { useEffect, useId, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useCategory } from "@/components/category-context";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { categories } from "@/data/categories";
import { featuredProducts } from "@/data/products";
import { cn } from "@/lib/utils";

/* ============================================================================
   EnquiryForm  —  the only form on the site, used by the demo modal
   ----------------------------------------------------------------------------
   PURPOSE: capture a lead with minimum friction.

   Everything is pre-filled that can be pre-filled: the industry comes from the
   chip the visitor pressed, and the solution comes from the banner whose button
   opened the dialog. Both stay editable, because a visitor may open the form
   from the header and still want to say what they run.

   The dialog sits on a dark surface, so every field has a visible fill, a
   visible border and a visible focus ring. A hairline is not a field here.

   States: idle, submitting, success, error. All four are real; the submit
   function reads API_ENDPOINT from config/variables.ts.
   ========================================================================== */

type Errors = Partial<
  Record<"name" | "email" | "phone" | "message" | "category", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function EnquiryForm({ product }: { product?: string }) {
  const uid = useId();
  const { selected } = useCategory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [category, setCategory] = useState<string>(selected ?? "");
  const [solution, setSolution] = useState(product ?? "");
  const [message, setMessage] = useState("");

  /* If the dialog is opened after a chip was pressed, the industry fills itself
     in. Runs on open, not on mount, so it cannot fight what the visitor typed. */
  useEffect(() => {
    if (selected) setCategory((current) => current || selected);
    if (product) setSolution(product);
  }, [selected, product]);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");

  const validate = (): Errors => {
    const found: Errors = {};
    if (name.trim().length < 2) found.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim()))
      found.email = "Please enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 6)
      found.phone = "Please enter a valid phone number.";
    if (!category) found.category = "Pick the closest fit.";
    if (message.trim().length < 10)
      found.message = "A line or two about what you run is enough.";
    return found;
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
      category,
      solution: solution || undefined,
      message: message.trim(),
    });

    if (result.ok) {
      setStatus("success");
    } else {
      setServerError(result.error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-4">
        <span className="flex size-11 items-center justify-center rounded-full bg-accent-bright text-band-base">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-lg font-semibold">That&apos;s with us.</p>
          <p className="mt-1 text-on-dark-soft">
            We&apos;ll reply to arrange the demo
            {solution ? ` of ${solution}` : ""}.
          </p>
        </div>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Name" error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            required
            value={name}
            disabled={busy}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className="field"
          />
        </Field>

        <Field id={`${uid}-email`} label="Email" error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            disabled={busy}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            className="field"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-country`} label="Country">
          <input
            id={`${uid}-country`}
            name="country"
            autoComplete="country-name"
            value={country}
            disabled={busy}
            onChange={(event) => setCountry(event.target.value)}
            className="field"
          />
        </Field>

        <Field id={`${uid}-phone`} label="Phone" error={errors.phone}>
          <PhoneInput
            defaultCountry="in"
            value={phone}
            disabled={busy}
            onChange={(value, meta) => {
              setPhone(value);
              if (meta?.country?.name) setCountry(meta.country.name);
            }}
            className={cn("phone-field w-full", errors.phone && "field--error")}
            inputProps={{
              id: `${uid}-phone`,
              name: "phone",
              "aria-invalid": Boolean(errors.phone),
              "aria-describedby": errors.phone ? `${uid}-phone-error` : undefined,
            }}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-category`} label="Business category" error={errors.category}>
          <select
            id={`${uid}-category`}
            name="category"
            required
            value={category}
            disabled={busy}
            onChange={(event) => setCategory(event.target.value)}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? `${uid}-category-error` : undefined}
            className={cn("field", !category && "text-on-dark-faint")}
          >
            <option value="">Choose one</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${uid}-solution`} label="Solution (optional)">
          <select
            id={`${uid}-solution`}
            name="solution"
            value={solution}
            disabled={busy}
            onChange={(event) => setSolution(event.target.value)}
            className={cn("field", !solution && "text-on-dark-faint")}
          >
            <option value="">Not sure yet</option>
            {featuredProducts.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={`${uid}-message`} label="What are you trying to solve?" error={errors.message}>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={3}
          required
          value={message}
          disabled={busy}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          className="field"
        />
      </Field>

      {status === "error" && serverError && (
        <p
          role="alert"
          className="rounded-md border border-destructive-on-dark/50 bg-destructive/15 px-3 py-2.5 text-[0.9375rem] text-on-dark"
        >
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        <button type="submit" disabled={busy} className="btn-primary min-w-[11rem]">
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Request a demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-[0.8125rem] text-on-dark-faint">
          No signup. No demo credentials.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[0.8125rem] font-semibold text-on-dark-soft"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[0.8125rem] font-medium text-destructive-on-dark">
          {error}
        </p>
      )}
    </div>
  );
}
