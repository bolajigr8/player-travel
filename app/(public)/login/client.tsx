"use client";

import Link from "next/link";
import { ShieldCheck, Headphones, Zap, Tag, Check } from "lucide-react";

const PERKS = ["Secure & trusted", "Easy booking", "24/7 support"];
const TRUST = [
  { icon: ShieldCheck, t: "Secure payments", b: "100% safe and encrypted" },
  { icon: Headphones,  t: "24/7 support",    b: "We're here anytime"     },
  { icon: Zap,         t: "Flexible booking",b: "Change or cancel easily" },
  { icon: Tag,         t: "No hidden fees",  b: "What you see is what you pay" },
];

export function LoginClient() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left — image */}
        <aside className="relative hidden overflow-hidden lg:block">
          <img src="/c5902ebd4561e008b4d3a49c231b9b87ed04c7cb.png" alt="Eiffel" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 space-y-6">
            <h2 className="font-heading text-5xl font-bold leading-[1.05] text-white">
              Your journey. <br />
              <span className="text-primary">Connected.</span>
            </h2>
            <ul className="space-y-2">
              {PERKS.map(p => (
                <li key={p} className="flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2 text-white backdrop-blur">
                  <Check className="size-4 text-primary" />
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-white/70">Flights, stays and eSIM — all in one place.</p>
          </div>
        </aside>

        {/* Right — login form */}
        <section className="flex flex-col">
          <div className="flex justify-end p-6">
            <Link href="/help" className="text-xs text-muted-foreground hover:text-foreground">Need help? ↗</Link>
          </div>

          <div className="mx-auto w-full max-w-md flex-1 px-6 pb-10">
            <div className="space-y-1 rounded-3xl border border-primary/40 bg-card p-6 shadow-[0_0_28px_rgba(183,255,0,0.15)]">
              <p className="flex items-center gap-1 font-mono text-[11px] text-primary">
                <span className="inline-block size-1.5 rounded-full bg-primary" /> Welcome Back
              </p>
              <h1 className="font-heading text-2xl font-bold">Log in</h1>
              <p className="text-xs text-muted-foreground">Please enter your details.</p>

              <div className="mt-4 space-y-3 text-sm">
                <Input placeholder="Email Address" />
                <Input placeholder="Password" type="password" />
                <div className="text-right">
                  <Link href="/forgot-password" className="text-[11px] text-primary">Forgot password?</Link>
                </div>
                <button className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)]">
                  Log in
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
                Don&apos;t have an account? <Link href="/sign-up" className="font-bold text-primary">Sign up</Link>
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

function Input({ placeholder, type = "text" }: { placeholder: string; type?: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 px-3 py-2.5">
      <input type={type} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
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
