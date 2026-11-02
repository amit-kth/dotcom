import assert from "node:assert/strict";
import { test, mock } from "node:test";
import { CONTACT_ENDPOINT } from "../src/config/variables";
import { submitContact } from "../src/app/contact/lib/submit-contact";

test("an unconfigured contact form fails without making a request", {
  skip: !CONTACT_ENDPOINT.startsWith("TODO"),
}, async () => {
  const request = mock.method(globalThis, "fetch");
  try {
    const result = await submitContact({
      name: "Test User", email: "test@example.com", phone: "+917240560001",
      country: "India", subject: "Test enquiry", message: "Contact form test.",
    });
    assert.equal(result.ok, false);
    assert.equal(request.mock.callCount(), 0);
  } finally {
    request.mock.restore();
  }
});
