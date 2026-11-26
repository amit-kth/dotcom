import assert from "node:assert/strict";
import { test, mock } from "node:test";
import { CONTACT_ENDPOINT } from "../src/config/variables";
import {
  submitContact,
  type ContactPayload,
} from "../src/app/contact/lib/submit-contact";

const payload: ContactPayload = {
  name: "Test User",
  email: "test@example.com",
  phone: "+917240560001",
  country: "India",
  subject: "Test enquiry",
  message: "Contact form test message.",
};

/** The service's actual success body, trimmed to the parts we rely on. */
const successBody = {
  success: true,
  message: "Message Sent successfully",
  data: {
    enq_id: "",
    priority_odr: 2,
    enq_name: "test",
    enq_country: "India",
    enq_mobile: "",
    enq_email: "priyatam@kriscent.in",
    enq_subject: "test",
    enq_message: "hello test",
    crt_on: "2026-11-26 12:26:53",
    status_prim: 0,
    id: 74,
  },
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/** Every test replaces fetch: npm test never contacts the real enquiry service. */
const mockFetch = (impl: (...args: unknown[]) => Promise<Response>) =>
  mock.method(globalThis, "fetch", impl as unknown as typeof fetch);

test("the enquiry posts the legacy field set to the configured endpoint", async () => {
  const request = mockFetch(async () => jsonResponse(successBody));
  try {
    const result = await submitContact(payload);
    assert.equal(result.ok, true);
    assert.equal(request.mock.callCount(), 1);
    const [url, init] = request.mock.calls[0].arguments;
    assert.equal(String(url), CONTACT_ENDPOINT);
    assert.equal(init?.method, "POST");
    assert.equal(
      new Headers(init?.headers).get("Content-Type"),
      "application/json",
    );
    const body = JSON.parse(String(init?.body));
    assert.deepEqual(Object.keys(body).sort(), [
      "country_name",
      "email",
      "message",
      "name",
      "phone",
      "subject",
    ]);
    assert.equal(body.name, "Test User");
    assert.equal(body.phone, "+917240560001");
    assert.equal(body.country_name, "India");
    assert.equal("solution" in body, false);
  } finally {
    request.mock.restore();
  }
});

test("the service's success envelope is accepted", async () => {
  const request = mockFetch(async () => jsonResponse(successBody));
  try {
    const result = await submitContact(payload);
    assert.deepEqual(result, { ok: true });
  } finally {
    request.mock.restore();
  }
});

test("a 200 with success:false is a rejection, not a success", async () => {
  // The envelope, not the HTTP status, decides: this must never confirm.
  const request = mockFetch(async () =>
    jsonResponse({ success: false, message: "Email already exists", data: null }),
  );
  try {
    const result = await submitContact(payload);
    if (result.ok) assert.fail("success:false must not be confirmed");
    assert.equal(result.error, "Email already exists");
  } finally {
    request.mock.restore();
  }
});

test("a 200 with success:false and no message uses the fallback", async () => {
  const request = mockFetch(async () => jsonResponse({ success: false }));
  try {
    const result = await submitContact(payload);
    if (result.ok) assert.fail("success:false must not be confirmed");
    assert.match(result.error, /@/);
  } finally {
    request.mock.restore();
  }
});

test("a rejected enquiry surfaces the service's own message", async () => {
  const request = mockFetch(async () =>
    jsonResponse({ message: "Invalid input" }, 422),
  );
  try {
    const result = await submitContact(payload);
    if (result.ok) assert.fail("expected a failure");
    assert.equal(result.error, "Invalid input");
  } finally {
    request.mock.restore();
  }
});

test("a rejected enquiry without a message falls back to the contact email", async () => {
  const request = mockFetch(async () =>
    jsonResponse({ success: false, message: "" }, 500),
  );
  try {
    const result = await submitContact(payload);
    if (result.ok) assert.fail("expected a failure");
    assert.match(result.error, /@/);
  } finally {
    request.mock.restore();
  }
});

test("a network failure tells the visitor how to reach us", async () => {
  const request = mockFetch(async () => {
    throw new TypeError("Failed to fetch");
  });
  try {
    const result = await submitContact(payload);
    if (result.ok) assert.fail("expected a failure");
    assert.match(result.error, /connection/i);
    assert.match(result.error, /@/);
  } finally {
    request.mock.restore();
  }
});

test("a slow enquiry service times out with a clear message", async () => {
  const request = mockFetch(
    (_input, init) =>
      new Promise<Response>((_resolve, reject) => {
        (init as RequestInit | undefined)?.signal?.addEventListener("abort", () =>
          reject(new DOMException("The operation was aborted.", "AbortError")),
        );
      }),
  );
  try {
    const result = await submitContact(payload, { timeoutMs: 10 });
    if (result.ok) assert.fail("expected a failure");
    assert.match(result.error, /took too long/);
  } finally {
    request.mock.restore();
  }
});
