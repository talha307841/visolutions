import type { Metadata } from "next";
import { Header, Footer } from "@/components/shell";
import { site } from "@/config/site";
import "@fontsource-variable/manrope";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Visolution | AI-Powered CCTV Safety & Compliance Monitoring",
    template: "%s | Visolution",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "Visolution",
    title: "Visolution — See risks. Prevent violations.",
    description: site.description,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visolution — See risks. Prevent violations.",
    description: site.description,
    images: ["/opengraph-image"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
