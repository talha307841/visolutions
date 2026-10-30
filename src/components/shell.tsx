"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { solutions } from "@/data/solutions";
export function Logo() {
  return (
    <span className="logo">
      <svg
        width="29"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 5L13 27H20L9 5H2Z" fill="currentColor" />
        <path d="M15 5L22 19L30 5H15Z" fill="#55dbc0" />
      </svg>
      visolution
    </span>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const path = usePathname();
  const close = () => {
    setOpen(false);
    setDrop(false);
  };
  return (
    <header className="header">
      <div className="nav-wrap">
        <Link href="/" aria-label="Visolution home" onClick={close}>
          <Logo />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          aria-label="Main navigation"
          className={open ? "nav is-open" : "nav"}
        >
          <div
            className="dropdown"
            onKeyDown={(e) => {
              if (e.key === "Escape") setDrop(false);
            }}
          >
            <button onClick={() => setDrop(!drop)} aria-expanded={drop}>
              Solutions <ChevronDown size={13} />
            </button>
            {drop && (
              <div className="dropdown-menu">
                <Link href="/solutions" onClick={close}>
                  All solutions <ArrowUpRight size={15} />
                </Link>
                {solutions.map((s) => (
                  <Link
                    href={`/solutions/${s.slug}`}
                    key={s.slug}
                    onClick={close}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {[
            ["/platform", "Platform"],
            ["/how-it-works", "How it works"],
            ["/demo", "Interactive demo"],
            ["/about", "About"],
            ["/contact", "Contact"],
          ].map(([href, title]) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              aria-current={path === href ? "page" : undefined}
            >
              {title}
            </Link>
          ))}
          <Link
            className="button button-primary button-small nav-cta"
            href="/contact"
            onClick={close}
          >
            Request a pilot <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <Link href="/" aria-label="Visolution home">
            <Logo />
          </Link>
          <p>See risks. Prevent violations.</p>
          <span className="mono">BUILT IN KARACHI. THINKING BEYOND.</span>
        </div>
        <div>
          <span className="eyebrow">EXPLORE</span>
          <Link href="/platform">Platform</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/demo">Interactive demo</Link>
        </div>
        <div>
          <span className="eyebrow">SOLUTIONS</span>
          {solutions.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`}>
              {s.name}
            </Link>
          ))}
        </div>
        <div>
          <span className="eyebrow">COMPANY</span>
          <Link href="/about">About us</Link>
          <Link href="/contact">Get in touch</Link>
          <Link href="/contact">Request a pilot ↗</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Visolution. All rights reserved.
        </span>
        <span>Platform in development · Recorded demos</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
