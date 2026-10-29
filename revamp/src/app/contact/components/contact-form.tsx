"use client";

import { useEffect, useId, useState } from "react";
import { PhoneInput } from "react-international-phone";
import { Check, Loader2, Send } from "lucide-react";
import { submitContact } from "@/app/contact/lib/submit-contact";
import { useRequestedSolution } from "@/app/contact/lib/use-requested-solution";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

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

type Errors = Partial<
  Record<"name" | "email" | "phone" | "subject" | "message", string>
>;

/* A field is a visible fill with a visible border — a one-pixel hairline is not
   a field on a dark surface. Written once because five controls share it. */
const FIELD = cn(
  "w-full min-h-12 rounded-2xl border border-white/[0.22] bg-white/[0.07] px-3.5 py-3 text-base text-slate-50",
  "transition-[border-color,background-color] duration-[160ms]",
  "placeholder:text-slate-400 hover:border-white/[0.32]",
  "focus:border-blue-100 focus:bg-white/[0.1] focus:shadow-[0_0_0_3px_oklch(49.03%_0.2158_264.38/0.35)] focus:outline-none",
  "aria-invalid:border-red-500",
);

/* Tailwind descendant variants skin the phone library’s internal markup. */
const PHONE = cn(
  "flex min-h-12 w-full items-stretch rounded-2xl border border-white/[0.22] bg-white/[0.07]",
  "transition-colors duration-150 focus-within:border-blue-100 focus-within:bg-white/10 focus-within:ring-3 focus-within:ring-blue-600/35",
  "[&_.react-international-phone-country-selector-button]:flex [&_.react-international-phone-country-selector-button]:h-full [&_.react-international-phone-country-selector-button]:items-center [&_.react-international-phone-country-selector-button]:gap-1.5",
  "[&_.react-international-phone-country-selector-button]:rounded-none [&_.react-international-phone-country-selector-button]:border-0 [&_.react-international-phone-country-selector-button]:border-r [&_.react-international-phone-country-selector-button]:border-white/15 [&_.react-international-phone-country-selector-button]:bg-transparent [&_.react-international-phone-country-selector-button]:pr-2 [&_.react-international-phone-country-selector-button]:pl-3.5",
  "[&_.react-international-phone-country-selector-button__dropdown-arrow]:border-t-slate-300",
  "[&_.react-international-phone-input]:h-auto [&_.react-international-phone-input]:min-w-0 [&_.react-international-phone-input]:flex-1 [&_.react-international-phone-input]:rounded-none [&_.react-international-phone-input]:border-0 [&_.react-international-phone-input]:bg-transparent [&_.react-international-phone-input]:px-3.5 [&_.react-international-phone-input]:py-3 [&_.react-international-phone-input]:text-base [&_.react-international-phone-input]:text-slate-50 [&_.react-international-phone-input]:outline-none",
  "[&_.react-international-phone-input::placeholder]:text-slate-400",
  "[&_.react-international-phone-country-selector-dropdown]:mt-2 [&_.react-international-phone-country-selector-dropdown]:rounded-2xl [&_.react-international-phone-country-selector-dropdown]:border [&_.react-international-phone-country-selector-dropdown]:border-white/15 [&_.react-international-phone-country-selector-dropdown]:bg-slate-950 [&_.react-international-phone-country-selector-dropdown]:text-slate-50 [&_.react-international-phone-country-selector-dropdown]:shadow-[0_40px_120px_-60px_rgb(15_23_42/0.6)]",
  "[&_.react-international-phone-country-selector-dropdown__list-item--focused]:bg-white/10 [&_.react-international-phone-country-selector-dropdown__list-item-dial-code]:text-slate-300",
);

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
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");

  const validate = (): Errors => {
    const found: Errors = {};
    if (name.trim().length < 2) found.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim()))
      found.email = "Please enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 6)
      found.phone = "Please enter a valid phone number.";
    if (subject.trim().length < 3) found.subject = "What is this about?";
    if (message.trim().length < 10) found.message = "A line or two is enough.";
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
        <span className="flex size-11 items-center justify-center rounded-full bg-blue-100 text-slate-950">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-lg font-semibold">That&apos;s with us.</p>
          <p className="mt-1 text-slate-300">We will reply to {email}.</p>
        </div>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Field id={`${uid}-solution`} label="Solution">
        <Select
          name="solution"
          value={solution || "none"}
          disabled={busy}
          onValueChange={(value) => setSolution(value === "none" ? "" : value)}
        >
          <SelectTrigger
            id={`${uid}-solution`}
            surface="dark"
            className="w-full"
          >
            <span className="truncate">{solution || "Not sure yet"}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Not sure yet</SelectItem>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.name}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          label="Your Name"
          required
          error={errors.name}
        >
          <Input
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
            className={FIELD}
          />
        </Field>

        <Field
          id={`${uid}-email`}
          label="Your Email"
          required
          error={errors.email}
        >
          <Input
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
            className={FIELD}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${uid}-phone`}
          label="Contact Number"
          required
          error={errors.phone}
        >
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
              "aria-describedby": errors.phone
                ? `${uid}-phone-error`
                : undefined,
            }}
            className={cn(PHONE, errors.phone && "border-red-500")}
          />
          {/* what query.php used to receive from intl-tel-input */}
          <Input type="hidden" name="country_name" value={country} />
        </Field>

        <Field
          id={`${uid}-subject`}
          label="Your Subject"
          required
          error={errors.subject}
        >
          <Input
            id={`${uid}-subject`}
            name="subject"
            placeholder="Your subject here"
            required
            value={subject}
            disabled={busy}
            onChange={(event) => setSubject(event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={
              errors.subject ? `${uid}-subject-error` : undefined
            }
            className={FIELD}
          />
        </Field>
      </div>

      <Field
        id={`${uid}-message`}
        label="Message"
        required
        error={errors.message}
      >
        <Textarea
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
          className={cn(FIELD, "min-h-[6.5rem] resize-y")}
        />
      </Field>

      {status === "error" && serverError && (
        <p
          role="alert"
          className="rounded-2xl border border-red-400/50 bg-red-500/15 px-3 py-2.5 text-[0.9375rem] text-slate-50"
        >
          {serverError}
        </p>
      )}

      <div className="pt-1">
        <Button type="submit" disabled={busy} className="min-w-[11rem]">
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
        </Button>
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
      <Label
        htmlFor={id}
        className="block text-[0.8125rem] font-semibold text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-blue-100">*</span>}
      </Label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="text-[0.8125rem] font-medium text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
