import type { Metadata } from "next";
export function pageMeta(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Visolution`, description, url: path },
    twitter: { title: `${title} | Visolution`, description },
  };
}
