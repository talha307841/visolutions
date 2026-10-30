import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Check, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/solutions";
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="tiny-cross">+</span>
      {children}
    </div>
  );
}
export function Actions() {
  return (
    <div className="actions">
      <Button asChild>
        <Link href="/contact">
          Request a pilot <ArrowUpRight size={17} />
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/demo">
          Explore the demo <ArrowRight size={17} />
        </Link>
      </Button>
    </div>
  );
}
export function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="container page-hero">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </section>
  );
}
export function CTA() {
  return (
    <section className="cta-section container">
      <div className="cta-mark" aria-hidden="true">
        V
      </div>
      <Eyebrow>A CLEARER VIEW STARTS HERE</Eyebrow>
      <h2>
        Your cameras are already watching.
        <br />
        <span>It’s time to make them useful.</span>
      </h2>
      <div className="cta-bottom">
        <p>One site. One use case. A practical first step.</p>
        <Button asChild>
          <Link href="/contact">
            Let’s discuss your pilot <ArrowUpRight size={18} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
export function Industries() {
  return (
    <div className="industry-grid">
      {solutions.map((s, i) => (
        <Link
          className="industry-panel"
          href={`/solutions/${s.slug}`}
          key={s.slug}
        >
          <div className="industry-image">
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 33vw, 440px"
              className="industry-photo"
            />
            <span className="industry-photo-label">ILLUSTRATIVE IMAGE</span>
            <span className="industry-index">
              0{i + 1} / {s.label.split(" & ")[0]}
            </span>
            <span className="round-arrow">
              <ArrowUpRight size={22} />
            </span>
          </div>
          <div className="industry-title">
            <h3>{s.name}</h3>
            <span className="industry-number">0{i + 1}</span>
          </div>
          <p>
            {
              [
                "Keep attention on PPE, restricted zones and blocked safety routes.",
                "Bring approved operational areas into a privacy-conscious review workflow.",
                "See potential risks where people, vehicles and goods intersect.",
                "Review checkout, entrance and after-hours conditions across your stores.",
              ][i]
            }
          </p>
          <span className="text-link">
            Explore solution <ArrowRight size={15} />
          </span>
        </Link>
      ))}
    </div>
  );
}
export function Pilot() {
  return (
    <section className="section container pilot-grid">
      <div>
        <Eyebrow>THE PILOT PROGRAM</Eyebrow>
        <h2>
          Start with one camera.
          <br />
          <span>Prove the value.</span>
        </h2>
        <p className="lead">
          A focused pilot. A defined risk. A shared understanding of what
          success looks like.
        </p>
        <Button asChild variant="outline">
          <Link href="/contact">
            Discuss a pilot <MoveUpRight size={17} />
          </Link>
        </Button>
      </div>
      <ol className="pilot-steps">
        {[
          "Understand your operational challenge",
          "Assess camera compatibility",
          "Choose one measurable violation",
          "Configure a controlled pilot",
          "Evaluate quality and operational value",
        ].map((s, i) => (
          <li key={s}>
            <span className="mono">0{i + 1}</span>
            {s}
            <Check size={17} />
          </li>
        ))}
      </ol>
    </section>
  );
}
