"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, Plane, Bed, Wifi, Package, ShieldCheck, Zap, Headphones, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  "All Offers", "Flight Deals", "Stay Deals", "eSIM Deals", "Bundle Deals", "Seasonal Offers", "Bank Offers", "Last Minute",
] as const;

const HEROES = [
  { id: "h1", tag: "FLIGHT DEAL", title: "Fly More, Pay Less", body: "Save up to €120 on selected international flights.", price: "UP TO €120 OFF", cta: "Explore Flights", href: "/flights", image: "/c5902ebd4561e008b4d3a49c231b9b87ed04c7cb.png" },
  { id: "h2", tag: "STAY DEAL", title: "Stay Longer, Save More", body: "Get up to 25% off on stays worldwide.", price: "UP TO 25% OFF", cta: "Explore Stays", href: "/stays", image: "/7a586d726fe648e46cf473e1282c5f6522a5af8a.png" },
  { id: "h3", tag: "ESIM DEAL", title: "Stay Connected, Anywhere", body: "Up to 30% off on global eSIM plans.", price: "UP TO 30% OFF", cta: "Explore eSIM", href: "/esim", image: "/2b2cf42d143460347a49f8bd452c7581be53a270.png" },
  { id: "h4", tag: "BUNDLE DEAL", title: "Bundle & Save More", body: "Flight + Stay + eSIM starting from €399.", price: "FROM €399", cta: "View Bundles", href: "/offers", image: "/052520396ba9e3230e862090ca3497fcc08e1b6d.png" },
];

const TRENDING = [
  { id: "t1", chip: "LAST CHANCE", chipColor: "bg-rose-500",   title: "Paris",      sub: "Return from", price: 169, oldPrice: 240, body: "Book by 23 Jun 2026", flag: "🇫🇷", image: "/c5902ebd4561e008b4d3a49c231b9b87ed04c7cb.png" },
  { id: "t2", chip: "WEEKEND GETAWAY", chipColor: "bg-sky-500", title: "Dubai",     sub: "Return from", price: 189, oldPrice: 252, body: "Book by 30 Jun 2026", flag: "🇦🇪", image: "/2b2cf42d143460347a49f8bd452c7581be53a270.png" },
  { id: "t3", chip: "BANK OFFER",    chipColor: "bg-violet-500", title: "Extra 10% Off", sub: "With selected bank cards", body: "Valid till 28 Jun 2026", image: "/24c56f1c7a3c2f306fb231fea6ceffa981140d11.png" },
  { id: "t4", chip: "BAR & BEER",    chipColor: "bg-amber-500",  title: "Athens",   sub: "Return from", price: 129, body: "Book by 30 Jun 2026", flag: "🇬🇷", image: "/2a7a76966bc097de36eaf62926eb81a2bbd8c8ab.png" },
  { id: "t5", chip: "FLASH SALE",    chipColor: "bg-emerald-500",title: "Global eSIM", sub: "Plans starting from", price: 6.99, body: "Until 26 March 2026", image: "/b32ef627a5f44ada73462061c22eb216470a95d9.png" },
];

const TRUST = [
  { icon: Tag,         t: "Best Price Guarantee", b: "We match or beat any price" },
  { icon: ShieldCheck, t: "No Hidden Fees",       b: "What you see is what you pay" },
  { icon: Zap,         t: "Instant Confirmation", b: "Book now, travel worry-free" },
];

export function OffersClient() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All Offers");

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-10 sm:py-14">

        {/* Header */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-1 font-mono text-[11px] tracking-[2.86px] text-primary">
              <Tag className="size-3" /> Offers
            </p>
            <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Exclusive deals and limited-time offers, only on Golafly.
            </h1>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {TRUST.map(({ icon: Icon, t, b }) => (
              <div key={t} className="flex items-center gap-2">
                <Icon className="size-4 text-primary" />
                <div>
                  <p className="font-bold">{t}</p>
                  <p className="text-muted-foreground">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium transition-colors",
                activeTab === t ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/30",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Hero cards (2x2) */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {HEROES.map(h => (
            <motion.article
              key={h.id}
              whileHover={{ y: -3 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative h-44 w-full">
                <img src={h.image} alt={h.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white backdrop-blur">{h.tag}</span>
                <span className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 font-mono text-[11px] font-bold text-primary-foreground">{h.price}</span>
              </div>
              <div className="space-y-2 p-4">
                <p className="font-heading text-xl font-bold">{h.title}</p>
                <p className="text-sm text-muted-foreground">{h.body}</p>
                <Link href={h.href} className="inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-primary">
                  ▶ {h.cta}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Trending */}
        <section className="mt-12">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[2.86px] text-primary">🔥 Trending Offers</p>
              <p className="text-sm text-muted-foreground">Hurry! These deals are popular and won&apos;t last long.</p>
            </div>
            <Link href="/offers" className="text-xs font-medium text-primary">→ View all offers</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {TRENDING.map(t => (
              <motion.div
                key={t.id}
                whileHover={{ y: -3 }}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-28 w-full">
                  <img src={t.image} alt={t.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className={cn("absolute left-2 top-2 rounded-full px-2 py-0.5 font-mono text-[9px] font-bold text-white", t.chipColor)}>{t.chip}</span>
                  <button className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-black/30 backdrop-blur"><Heart className="size-3 text-white" /></button>
                </div>
                <div className="space-y-1.5 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{t.title}</p>
                    {t.flag && <span className="text-base">{t.flag}</span>}
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground">{t.sub}</p>
                  {t.price && (
                    <p>
                      <span className="font-heading text-base font-bold text-primary">€{t.price}</span>
                      {t.oldPrice && <span className="ml-1 text-[10px] text-muted-foreground line-through">€{t.oldPrice}</span>}
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground">{t.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust bar */}
        <section className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Secure Payments", b: "Your payment is safe with us." },
            { icon: Zap,         t: "Flexible Booking", b: "Change or cancel easily."     },
            { icon: Headphones,  t: "24/7 Support",     b: "We're here to help anytime."   },
            { icon: Tag,         t: "No Hidden Fees",   b: "What you see is what you pay." },
          ].map(({ icon: Icon, t, b }) => (
            <div key={t} className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></div>
              <div>
                <p className="text-[13px] font-bold">{t}</p>
                <p className="text-[11px] text-muted-foreground">{b}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
