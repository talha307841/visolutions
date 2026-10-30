import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createHash } from "node:crypto";
import { contactSchema } from "@/lib/contact-schema";
export const runtime = "nodejs";
const buckets = new Map<string, { count: number; expires: number }>();
export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { message: "Send a JSON inquiry." },
      { status: 415 },
    );
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const requestOrigin = new URL(request.url).origin;
  let sameHost = false;
  try {
    sameHost = Boolean(origin && host && new URL(origin).host === host);
  } catch {
    return NextResponse.json(
      { message: "Invalid request origin." },
      { status: 403 },
    );
  }
  if (
    origin &&
    !sameHost &&
    origin !== requestOrigin &&
    origin !== process.env.NEXT_PUBLIC_SITE_URL
  )
    return NextResponse.json(
      { message: "This request origin is not allowed." },
      { status: 403 },
    );
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const key = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  for (const [k, b] of buckets) if (b.expires <= now) buckets.delete(k);
  const bucket = buckets.get(key);
  if (bucket && bucket.count >= 5)
    return NextResponse.json(
      { message: "Too many attempts. Please try again in 15 minutes." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  if (buckets.size > 5000) buckets.delete(buckets.keys().next().value!);
  buckets.set(key, {
    count: (bucket?.count || 0) + 1,
    expires: bucket?.expires || now + 900000,
  });
  let data: unknown;
  try {
    const text = await request.text();
    if (text.length > 16000)
      return NextResponse.json(
        { message: "Your inquiry is too large." },
        { status: 413 },
      );
    data = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }
  const result = contactSchema.safeParse(data);
  if (!result.success)
    return NextResponse.json(
      {
        message: "Please check the form fields and try again.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  if (result.data.website)
    return NextResponse.json(
      { message: "Unable to submit this inquiry." },
      { status: 400 },
    );
  const apiKey = process.env.RESEND_API_KEY,
    from = process.env.CONTACT_FROM_EMAIL,
    to = process.env.CONTACT_TO_EMAIL || "muhammadtalhayousaf3@gmail.com";
  if (!apiKey || !from || !to)
    return NextResponse.json(
      {
        message:
          "Email delivery is not configured. Your inquiry has not been sent. Please use a listed contact method if available, or return later.",
      },
      { status: 503 },
    );
  const { website, consent, ...lead } = result.data;
  void website;
  void consent;
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: "New Visolution pilot inquiry",
      text: Object.entries(lead)
        .map(([key, value]) => `${key}: ${value || "Not provided"}`)
        .join("\n\n"),
    });
    if (error)
      return NextResponse.json(
        {
          message:
            "The email provider could not accept your inquiry. Please try again later.",
        },
        { status: 502 },
      );
    return NextResponse.json({
      message:
        "Your inquiry has been accepted by our email provider. Thank you for exploring a Visolution pilot.",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Email delivery is temporarily unavailable. Your inquiry could not be confirmed. Please try again later.",
      },
      { status: 502 },
    );
  }
}
