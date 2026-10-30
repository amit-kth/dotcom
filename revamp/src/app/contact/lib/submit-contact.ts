import { CONTACT_ENDPOINT, contact } from "@/config/variables";

/* ============================================================================
   submitContact ,  the only place the contact page talks to the outside world
   ----------------------------------------------------------------------------
   The contact form on the old site posted to query.php with `T1=enquiry` and the
   fields name / email / phone / country_name / subject / message. The new form
   keeps those names and posts JSON to CONTACT_ENDPOINT instead, so the Laravel
   endpoint can be written against one contract.

   TODO(api): set CONTACT_ENDPOINT in config/variables.ts. While it still starts
   with TODO the submission is simulated locally, so the loading and success
   states can be reviewed; the moment it is a real URL the simulation stops and
   every submission is a real request.

   Response contract expected from Laravel:
     HTTP 2xx -> success, body ignored
     anything else -> generic failure shown to the user, never the raw body
   ========================================================================== */

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
  if (CONTACT_ENDPOINT.startsWith("TODO")) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // eslint-disable-next-line no-console
    console.info(
      "[contact] simulated submission, endpoint not configured",
      payload,
    );
    return { ok: true };
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
