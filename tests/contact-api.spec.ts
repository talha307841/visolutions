import { test, expect } from "@playwright/test";
import { POST } from "../src/app/api/contact/route";
const lead = {
  name: "Test Person",
  email: "test@example.com",
  company: "Test Organization",
  industry: "Manufacturing",
  jobTitle: "Manager",
  phone: "",
  location: "Karachi, Pakistan",
  cameras: "4",
  challenge: "Test emergency exit obstruction",
  message: "",
  consent: true,
  website: "",
};
let count = 0;
function req(body: unknown = lead, ip?: string) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip || `test-${count++}`,
    },
    body: JSON.stringify(body),
  });
}
test("API rejects invalid, spam, cross-origin and excessive requests", async () => {
  expect((await POST(req({ ...lead, email: "invalid" }))).status).toBe(400);
  expect((await POST(req({ ...lead, website: "spam" }))).status).toBe(400);
  const cross = req();
  cross.headers.set("origin", "https://untrusted.example");
  expect((await POST(cross)).status).toBe(403);
  for (let i = 0; i < 5; i++) await POST(req({}, "rate-test"));
  expect((await POST(req({}, "rate-test"))).status).toBe(429);
});
test("API handles unconfigured, accepted, rejected and failed email delivery", async () => {
  const saved = {
    key: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
  };
  const originalFetch = globalThis.fetch;
  try {
    delete process.env.RESEND_API_KEY;
    expect((await POST(req())).status).toBe(503);
    process.env.RESEND_API_KEY = "re_test_only";
    process.env.CONTACT_FROM_EMAIL = "sender@example.com";
    process.env.CONTACT_TO_EMAIL = "owner@example.com";
    let payload: Record<string, unknown> = {};
    globalThis.fetch = async (_input, init) => {
      payload = JSON.parse(String(init?.body));
      return new Response(JSON.stringify({ id: "mock-email-id" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };
    const accepted = await POST(req());
    expect(accepted.status).toBe(200);
    expect(payload.reply_to).toBe(lead.email);
    expect(payload.to).toBe("owner@example.com");
    delete process.env.CONTACT_TO_EMAIL;
    expect((await POST(req())).status).toBe(200);
    expect(payload.to).toBe("muhammadtalhayousaf3@gmail.com");
    expect(payload.text).toContain(lead.challenge);
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({ name: "validation_error", message: "mock rejection" }),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    expect((await POST(req())).status).toBe(502);
    globalThis.fetch = async () => {
      throw new Error("Mock network failure");
    };
    expect((await POST(req())).status).toBe(502);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [env, value] of Object.entries({
      RESEND_API_KEY: saved.key,
      CONTACT_FROM_EMAIL: saved.from,
      CONTACT_TO_EMAIL: saved.to,
    })) {
      if (value === undefined) delete process.env[env];
      else process.env[env] = value;
    }
  }
});
