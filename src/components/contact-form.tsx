"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import {
  contactSchema,
  industries,
  type ContactValues,
} from "@/lib/contact-schema";
import { Button } from "./ui/button";
export function ContactForm({ configured }: { configured: boolean }) {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      jobTitle: "",
      location: "",
      cameras: "",
      challenge: "",
      message: "",
      website: "",
      consent: false,
    },
  });
  async function submit(values: ContactValues) {
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      setStatus({ ok: response.ok, message: result.message });
      if (response.ok) reset();
    } catch {
      setStatus({
        ok: false,
        message:
          "We couldn’t reach the server. Your inquiry has not been sent. Please try again.",
      });
    }
  }
  const fields: [keyof ContactValues, string, string, string?][] = [
    ["name", "Full name", "text", "Your full name"],
    ["email", "Work email", "email", "you@company.com"],
    ["company", "Company name", "text", "Organization name"],
    ["jobTitle", "Job title", "text", "Your role"],
    ["phone", "Phone number (optional)", "tel", "Include country code"],
    ["location", "City / country", "text", "Karachi, Pakistan"],
    ["cameras", "Number of CCTV cameras (optional)", "text", "e.g. 12"],
  ];
  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
      {!configured && (
        <p className="form-unavailable">
          Online inquiry delivery is not configured yet. You can explore the
          form, but submissions cannot be delivered until the website owner
          connects email delivery.
        </p>
      )}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <div className="form-grid">
        {fields.map(([name, label, type, placeholder]) => (
          <div className="field" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              autoComplete={
                (
                  {
                    name: "name",
                    email: "email",
                    company: "organization",
                    jobTitle: "organization-title",
                    phone: "tel",
                  } as Record<string, string>
                )[name]
              }
              inputMode={name === "cameras" ? "numeric" : undefined}
              {...register(name)}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
            {errors[name] && (
              <span id={`${name}-error`} className="field-error">
                {errors[name]?.message}
              </span>
            )}
          </div>
        ))}
        <div className="field">
          <label htmlFor="industry">Industry</label>
          <select
            id="industry"
            {...register("industry")}
            aria-invalid={!!errors.industry}
            aria-describedby={errors.industry ? "industry-error" : undefined}
          >
            <option value="">Select your industry</option>
            {industries.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          {errors.industry && (
            <span className="field-error" id="industry-error">
              {errors.industry.message}
            </span>
          )}
        </div>
        {(["challenge", "message"] as const).map((name) => (
          <div className="field full" key={name}>
            <label htmlFor={name}>
              {name === "challenge"
                ? "Primary operational challenge"
                : "Anything else we should know? (optional)"}
            </label>
            <textarea
              id={name}
              {...register(name)}
              placeholder={
                name === "challenge"
                  ? "What would you like your cameras to help you see?"
                  : "Tell us about your site or pilot requirements."
              }
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
            {errors[name] && (
              <span id={`${name}-error`} className="field-error">
                {errors[name]?.message}
              </span>
            )}
          </div>
        ))}
      </div>
      <label className="form-consent">
        <input
          type="checkbox"
          {...register("consent")}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          I agree that Visolution may use these details to respond to my
          inquiry, as described in the{" "}
          <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      {errors.consent && (
        <p
          id="consent-error"
          className="field-error"
          style={{ marginBottom: 20 }}
        >
          {errors.consent.message}
        </p>
      )}
      {status && (
        <p
          role="status"
          className={`form-status ${status.ok ? "success" : ""}`}
        >
          {status.message}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle size={17} /> Sending inquiry…
          </>
        ) : (
          <>
            Discuss my pilot <ArrowUpRight size={17} />
          </>
        )}
      </Button>
      <p className="fine-print" style={{ marginTop: 16 }}>
        No footage or sensitive personal information, please. Pilot scope and
        pricing are agreed after assessment.
      </p>
    </form>
  );
}
