import { CONTACT_ENDPOINT, contact } from "@/config/variables";

// Static hosting posts enquiries straight to the configured enquiry service.
export type ContactPayload = {
  name: string;
  email: string;
  /** full number including dial code, e.g. +917240560001 */
  phone: string;
  /** country name, from the phone input, the old form's `country_name` */
  country: string;
  subject: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

/** The service answers `{ success, message, data }`. A 2xx is not proof on its
 *  own: `success: false` with a 200 is a rejection and must not be confirmed
 *  to the visitor. */
type EnquiryResponse = {
  success?: boolean;
  message?: string;
  data?: { id?: number | string; enq_id?: string } | null;
};

/** How long the enquiry service gets before the form says so. */
export const CONTACT_TIMEOUT_MS = 20_000;

const UNCONFIGURED_ERROR = `Enquiries are not configured yet. Please email us at ${contact.emails.general}.`;
const TIMEOUT_ERROR = `The enquiry service took too long to respond. Please try again, or email us at ${contact.emails.general}.`;
const NETWORK_ERROR = `We could not reach the enquiry service. Please check your connection and try again, or email us at ${contact.emails.general}.`;
const SERVER_ERROR = `The enquiry service could not accept that right now. Please try again in a little while, or email us at ${contact.emails.general}.`;

export async function submitContact(
  payload: ContactPayload,
  { timeoutMs = CONTACT_TIMEOUT_MS }: { timeoutMs?: number } = {},
): Promise<ContactResult> {
  if (!CONTACT_ENDPOINT.trim() || CONTACT_ENDPOINT.startsWith("TODO")) {
    return { ok: false, error: UNCONFIGURED_ERROR };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Exactly the legacy form fields, nothing invented.
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        subject: payload.subject,
        message: payload.message,
        country_name: payload.country,
      }),
      signal: controller.signal,
    });

    // The body decides the outcome; a non-JSON body is not treated as failure
    // when the status itself says the enquiry was accepted.
    const body: EnquiryResponse | null = await response
      .json()
      .catch(() => null);
    const serverMessage =
      typeof body?.message === "string" ? body.message.trim() : "";

    // `success: false` on a 200 is still a rejection.
    if (!response.ok || body?.success === false) {
      return { ok: false, error: serverMessage || SERVER_ERROR };
    }

    return { ok: true };
  } catch {
    if (controller.signal.aborted) return { ok: false, error: TIMEOUT_ERROR };
    return { ok: false, error: NETWORK_ERROR };
  } finally {
    clearTimeout(timer);
  }
}
