"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container not-found">
      <h1>Let’s try that view again.</h1>
      <p>The page could not load. Please retry.</p>
      <Button onClick={reset}>Try again</Button>
    </section>
  );
}
