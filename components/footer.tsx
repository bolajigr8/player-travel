"use client";

import Link from "next/link";
import { SOCIAL_LINKS, FOOTER_COLUMNS, OFFICES, CONTACT, BRAND } from "@/store/data";
import { SOCIAL_ICON_MAP } from "@/components/social-icons";

const GRADIENT_BG = "/f0a42d752c8086e9be6b45641ffeb2e31cc642cc.png";
const GRID_BG     = "/80f0d270a559b792b5b5bf890834121eb11d171f.png";

export function Footer() {
  return (
    <footer className="relative isolate w-full overflow-hidden bg-footer-bg text-footer-text">
      {/* Layer 1 — full-footer gradient (Figma export): top green-white band + bottom-right glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${GRADIENT_BG})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Layer 2 — soft grid overlay (Figma export), tiled across the whole footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 mix-blend-screen"
        style={{
          backgroundImage: `url(${GRID_BG})`,
          backgroundRepeat: "repeat",
          backgroundSize: "1440px auto",
        }}
      />

      <div className="page-container py-14 sm:py-16">

        {/* ── Newsletter ── */}
        <section className="flex flex-col gap-10 border-b border-footer-border pb-14 lg:flex-row lg:items-start lg:justify-between">
          {/* Copy */}
          <div className="max-w-md space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-block size-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(204,255,0,0.7)]" />
              <span className="font-mono text-[11px] tracking-[2.86px] text-primary">
                Stay Connected
              </span>
            </div>
            <h3 className="text-[26px] font-bold leading-[1.12] tracking-tight text-footer-heading">
              Exclusive trial windows,
              <br />
              offers &amp; football insights.
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-footer-text">
              Join 2,400+ players, coaches, and brands receiving our monthly briefing.
            </p>
          </div>

          {/* Form */}
          <div className="flex w-full max-w-md flex-col gap-3 lg:items-end">
            <p className="font-mono text-[11px] tracking-[2.42px] text-footer-text">
              Get the Golafly briefing
            </p>
            <div className="flex w-full max-w-[400px] items-center rounded-full border border-footer-input-border bg-footer-input-bg px-5 py-2.5 backdrop-blur-sm">
              <input
                type="email"
                placeholder="you@email.com"
                className="min-w-0 flex-1 bg-transparent text-sm text-footer-heading placeholder:text-footer-text-muted outline-none"
              />
              <button
                type="button"
                className="ml-3 shrink-0 rounded-full bg-primary px-5 py-2 text-[11px] font-bold tracking-[1.76px] text-primary-foreground shadow-[0_0_6px_rgba(204,255,0,0.45)] transition-all hover:shadow-[0_0_14px_rgba(204,255,0,0.6)]"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm text-footer-text-muted">No spam. Unsubscribe anytime.</p>
          </div>
        </section>

        {/* ── Main grid ── */}
        <section className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1fr_repeat(5,auto)]">
          {/* Brand */}
          <div className="space-y-5">
            <img
              src={BRAND.logo}
              alt={BRAND.name}
              className="h-14 sm:h-18 object-contain opacity-95"
            />
            <p className="max-w-[255px] text-sm leading-relaxed text-footer-text">
              {BRAND.tagline}
            </p>

            {/* Contact */}
            <div className="space-y-1 font-mono text-[11px] tracking-[1.32px] text-footer-text-muted">
              <p>
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-primary">
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-primary">
                  {CONTACT.phone}
                </a>
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ name, href }) => {
                const Icon = SOCIAL_ICON_MAP[name];
                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="inline-flex size-[34px] items-center justify-center rounded-lg border border-white/10 text-footer-text transition-all hover:border-primary/50 hover:text-primary"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLUMNS.map(col => (
            <div key={col.heading} className="space-y-4">
              <h4 className="font-mono text-[11px] tracking-[2.42px] text-footer-text">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-footer-text transition-colors hover:text-footer-heading"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Offices */}
          <div className="space-y-5">
            <h4 className="font-mono text-[11px] tracking-[2.42px] text-footer-text">
              Offices
            </h4>
            {OFFICES.map(office => (
              <div key={office.city} className="space-y-0.5">
                <p className="text-xs font-bold leading-relaxed text-footer-heading">
                  {office.city}
                </p>
                {office.lines.map(line => (
                  <p key={line} className="text-xs leading-relaxed text-footer-text">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom bar ── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-footer-border pt-6 font-mono text-[10px] tracking-[1.4px] text-footer-text-muted sm:flex-row">
          <p>{BRAND.legal}</p>
          <p>{BRAND.badges.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
