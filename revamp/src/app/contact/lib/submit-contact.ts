import { CONTACT_ENDPOINT, contact } from "@/config/variables";

// Static hosting needs a separate, configured enquiry endpoint.
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

const GENERIC_ERROR = `We could not send that. Please try again, or email us at ${contact.emails.general}.`;

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  if (!CONTACT_ENDPOINT.trim() || CONTACT_ENDPOINT.startsWith("TODO")) {
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        country_name: payload.country,
        source: "kriscent.com",
        form: "contact",
      }),
    });

    if (!response.ok) return { ok: false, error: GENERIC_ERROR };
    return { ok: true };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}
