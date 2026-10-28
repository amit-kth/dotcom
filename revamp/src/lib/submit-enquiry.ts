import { API_ENDPOINT } from "@/config/variables";

/* ============================================================================
   submitEnquiry  —  the only place the enquiry form talks to the outside world
   ----------------------------------------------------------------------------
   The Laravel endpoint does not exist yet. Both the contact section and the
   "Request a demo" dialog call this one function, so wiring the real backend
   later is a single change in config/variables.ts and nothing else.

   Response contract expected from Laravel:
     HTTP 2xx  -> success, body is ignored
     anything else -> shown to the user as a generic failure, never the raw body
   ========================================================================== */

export type EnquiryPayload = {
  name: string;
  email: string;
  /** full number including dial code, e.g. +917240560001 */
  phone: string;
  /** country name, from the phone input */
  country: string;
  message: string;
  /** product the visitor asked abpit, when the dialog opened from a product */
  product?: string;
};

export type EnquiryResult =
  | { ok: true }
  | { ok: false; error: string };

const GENERIC_ERROR =
  "We could not send that. Please try again, or email us at info@kriscent.in.";

export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  /* ---------------------------------------------------------------------
     TODO(api): delete this block once API_ENDPOINT is real.
     While the endpoint is still the placeholder we return a simulated success
     so the loading and success states can be reviewed in the browser. The
     moment a real URL is set in config/variables.ts, this branch can never
     run, so it cannot leak into production by accident.
     --------------------------------------------------------------------- */
  if (API_ENDPOINT.startsWith("TODO")) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // eslint-disable-next-line no-console
    console.info("[enquiry] simulated submission, endpoint not configured", payload);
    return { ok: true };
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, source: "kriscent.com" }),
    });

    if (!response.ok) return { ok: false, error: GENERIC_ERROR };
    return { ok: true };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}
