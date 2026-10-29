"use client";

import { useEffect, useId, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Check, Loader2, Send } from "lucide-react";
import { submitContact } from "@/lib/submit-contact";
import { useRequestedSolution } from "@/lib/use-requested-solution";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/* ============================================================================
   ContactForm  —  the form on /contact
   ----------------------------------------------------------------------------
   The fields are the old site's, in the old order and with the old labels:
   Your Name, Your Email, Contact Number, Your Subject, Message, and a "Send
   Message" button. One field is new and sits above them: Solution. It is empty
   on "Contact us" and filled in when the visitor arrived from a product banner. The phone keeps the country picker the old form had, and its
   country name is sent as `country_name`, which is what query.php expected.

   The only thing that changed is where it goes: `submitContact` in
   lib/submit-contact.ts posts to CONTACT_ENDPOINT. Until that URL exists the
   function simulates success, so the four states below are real states rather
   than decoration.

   States: idle · submitting · success · error.
   ========================================================================== */

type Errors = Partial<Record<"name" | "email" | "phone" | "subject" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const uid = useId();

  /* filled from ?solution= when a banner sent the visitor here */
  const requested = useRequestedSolution();
  const [solution, setSolution] = useState("");

  useEffect(() => {
    if (requested) setSolution(requested.name);
  }, [requested]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const validate = (): Errors => {
    const found: Errors = {};
    if (name.trim().length < 2) found.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim()))
      found.email = "Please enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 6)
      found.phone = "Please enter a valid phone number.";
    if (subject.trim().length < 3) found.subject = "What is this about?";
    if (message.trim().length < 10)
      found.message = "A line or two is enough.";
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

    const result = await submitContact({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country,
      subject: subject.trim(),
      message: message.trim(),
      solution: solution || null,
    });

    if (result.ok) setStatus("success");
    else {
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
            We will reply to {email}.
          </p>
        </div>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Field id={`${uid}-solution`} label="Solution">
        <select
          id={`${uid}-solution`}
          name="solution"
          value={solution}
          disabled={busy}
          onChange={(event) => setSolution(event.target.value)}
          className="field"
        >
          <option value="">Not sure yet</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Your Name" required error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            placeholder="Your name here"
            required
            value={name}
            disabled={busy}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className="field"
          />
        </Field>

        <Field id={`${uid}-email`} label="Your Email" required error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email here"
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
        <Field id={`${uid}-phone`} label="Contact Number" required error={errors.phone}>
          <PhoneInput
            defaultCountry="in"
            value={phone}
            disabled={busy}
            placeholder="Your phone here"
            onChange={(value, meta) => {
              setPhone(value);
              if (meta?.country?.name) setCountry(meta.country.name);
            }}
            inputProps={{
              id: `${uid}-phone`,
              name: "phone",
              "aria-invalid": Boolean(errors.phone),
              "aria-describedby": errors.phone ? `${uid}-phone-error` : undefined,
            }}
            className={cn("phone-field w-full", errors.phone && "field--error")}
          />
          {/* what query.php used to receive from intl-tel-input */}
          <input type="hidden" name="country_name" value={country} />
        </Field>

        <Field id={`${uid}-subject`} label="Your Subject" required error={errors.subject}>
          <input
            id={`${uid}-subject`}
            name="subject"
            placeholder="Your subject here"
            required
            value={subject}
            disabled={busy}
            onChange={(event) => setSubject(event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? `${uid}-subject-error` : undefined}
            className="field"
          />
        </Field>
      </div>

      <Field id={`${uid}-message`} label="Message" required error={errors.message}>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          placeholder="Tell us a few words"
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

      <div className="pt-1">
        <button
          type="submit"
          disabled={busy}
          className={cn(buttonVariants({ variant: "primary", size: "md" }), "min-w-[11rem]")}
        >
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send Message
              <Send className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[0.8125rem] font-semibold text-on-dark-soft">
        {label}
        {required && <span className="ml-1 text-accent-bright">*</span>}
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
