import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="eyebrow" style={{ justifyContent: "center" }}>
        404 / OUTSIDE THE FRAME
      </span>
      <h1>This view isn’t available.</h1>
      <p>Return to the homepage to explore Visolution.</p>
      <Button asChild>
        <Link href="/">Back to home ↗</Link>
      </Button>
    </section>
  );
}
