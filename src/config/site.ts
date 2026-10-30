export const site = {
  name: "Visolution",
  description:
    "Turn existing CCTV into proactive safety and compliance intelligence. Explore Visolution’s planned platform and interactive product simulation.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL,
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS,
  booking: process.env.NEXT_PUBLIC_BOOKING_URL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
};
export const routes = [
  "/",
  "/solutions",
  "/solutions/industrial-safety",
  "/solutions/healthcare",
  "/solutions/warehousing",
  "/solutions/retail",
  "/platform",
  "/how-it-works",
  "/demo",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];
