import { z } from "zod";
const required = (label: string, max = 150) =>
  z
    .string()
    .trim()
    .min(2, `${label} is required.`)
    .max(max, `Use ${max} characters or fewer.`);
export const industries = [
  "Manufacturing",
  "Healthcare",
  "Warehousing",
  "Logistics",
  "Retail & Shopping Malls",
  "Food Production",
  "Other",
] as const;
export const contactSchema = z.object({
  name: required("Full name"),
  email: z.string().trim().email("Enter a valid work email.").max(254),
  company: required("Company name"),
  industry: z.enum(industries, { error: "Select your industry." }),
  jobTitle: required("Job title"),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine(
      (s) => s === "" || /^[+\d\s().-]{7,40}$/.test(s),
      "Enter a valid phone number.",
    ),
  location: required("City / country"),
  cameras: z
    .string()
    .trim()
    .max(7)
    .refine(
      (s) => s === "" || (/^\d+$/.test(s) && Number(s) > 0),
      "Enter a positive camera count.",
    ),
  challenge: required("Operational challenge", 1000),
  message: z.string().trim().max(3000, "Use 3,000 characters or fewer."),
  consent: z.boolean().refine(Boolean, "Please agree to the privacy notice."),
  website: z.string().max(300),
});
export type ContactValues = z.infer<typeof contactSchema>;
