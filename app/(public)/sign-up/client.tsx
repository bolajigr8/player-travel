"use client";

import Link from "next/link";
import { Globe, DollarSign, Award, Lock, ShieldCheck, Headphones, Zap, Tag } from "lucide-react";

const PERKS = [
  { icon: Globe,      title: "Global Coverage", body: "eSIM in 200+ countries, instant delivery" },
  { icon: DollarSign, title: "Best Prices",     body: "Exclusive deals & offers for members"    },
  { icon: Award,      title: "Earn Rewards",    body: "Collect GolaPoints on every booking"     },
];

const TRUST = [
  { icon: ShieldCheck, t: "Secure payments", b: "100% safe and encrypted" },
  { icon: Headphones,  t: "24/7 support",    b: "We're here anytime"     },
  { icon: Zap,         t: "Flexible booking",b: "Change or cancel easily" },
  { icon: Tag,         t: "No hidden fees",  b: "What you see is what you pay" },
];

export function SignUpClient() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left — image hero */}
        <aside className="relative hidden overflow-hidden lg:block">
          <img src="/c5902ebd4561e008b4d3a49c231b9b87ed04c7cb.png" alt="Travel" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 space-y-6">
            <h2 className="font-heading text-5xl font-bold leading-[1.05] text-white">
              One platform. <br />
              <span className="text-primary">Limitless</span> <br />
              journeys.
            </h2>
            <div className="space-y-3">
              {PERKS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-3 text-white">
                  <div className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary"><Icon className="size-4" /></div>
                  <div>
                    <p className="text-sm font-bold">{title}</p>
                    <p className="text-xs text-white/70">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/70">Travel, stay and stay connected anywhere.</p>
          </div>
        </aside>

        {/* Right — form */}
        <section className="flex flex-col">
          <div className="flex justify-end p-6">
            <Link href="/help" className="text-xs text-muted-foreground hover:text-foreground">
              Need help? ↗
            </Link>
          </div>

          <div className="mx-auto w-full max-w-md flex-1 px-6 pb-10">
            <div className="space-y-1 rounded-3xl border border-primary/40 bg-card p-6 shadow-[0_0_28px_rgba(183,255,0,0.15)]">
              <p className="flex items-center gap-1 font-mono text-[11px] text-primary">
                <span className="inline-block size-1.5 rounded-full bg-primary" /> Get Started
              </p>
              <h1 className="font-heading text-2xl font-bold">Create your account</h1>
              <p className="text-xs text-muted-foreground">Let&apos;s get you started.</p>

              <div className="mt-4 space-y-3 text-sm">
                <Input icon="user" placeholder="Full name" />
                <Input icon="mail" placeholder="Email address" />
                <Input icon="lock" placeholder="Password" type="password" />
                <p className="flex items-center gap-1 text-[10px] text-muted-foreground"><Lock className="size-3" /> At least 8 characters with a number and a letter</p>
                <Input placeholder="Country of residence" />
                <p className="text-[11px] text-muted-foreground">
                  I agree to the <Link href="/legal/terms" className="text-primary">Terms &amp; Conditions</Link> and <Link href="/legal/privacy" className="text-primary">Privacy Policy</Link>
                </p>
                <button className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)]">
                  Sign up
                </button>
              </div>

              <div className="my-4 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
              </div>
              <div className="space-y-2">
                <SocialBtn provider="Google" />
                <SocialBtn provider="Apple"  />
                <SocialBtn provider="Facebook" />
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Already have an account? <Link href="/login" className="font-bold text-primary">Log in</Link>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 px-6 pb-6 sm:grid-cols-4">
            {TRUST.map(({ icon: Icon, t, b }) => (
              <div key={t} className="flex items-start gap-2">
                <Icon className="size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-[11px] font-bold">{t}</p>
                  <p className="text-[10px] text-muted-foreground">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Input({ placeholder, type = "text", icon }: { placeholder: string; type?: string; icon?: "user" | "mail" | "lock" }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2.5">
      {icon === "user" && <span className="text-xs text-muted-foreground">👤</span>}
      {icon === "mail" && <span className="text-xs text-muted-foreground">✉</span>}
      {icon === "lock" && <span className="text-xs text-muted-foreground">🔒</span>}
      <input type={type} placeholder={placeholder} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </div>
  );
}

function SocialBtn({ provider }: { provider: string }) {
  return (
    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/40 py-2.5 text-sm font-medium">
      <span className="grid size-5 place-items-center rounded-full bg-muted text-[10px] font-bold">{provider[0]}</span>
      Continue with {provider}
    </button>
  );
}
