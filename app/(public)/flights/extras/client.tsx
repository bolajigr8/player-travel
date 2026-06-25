"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star, Zap, Shield, ArrowLeftRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProgress } from "@/components/checkout/step-progress";
import { BookingSummary, offerToBookingData } from "@/components/checkout/booking-summary";
import { useFlightOffer } from "@/features/flights/hooks";
import { EXTRA_OPTIONS, useAncillaries, ancillaryLineItems } from "@/features/flights/ancillaries";

const EXTRA_ICONS = { priority: Zap, insurance: Shield } as const;

export function ExtrasClient() {
  const offerId = useSearchParams().get("offerId");
  const qs = offerId ? `?offerId=${offerId}` : "";
  const { data } = useFlightOffer(offerId);
  const offer = data?.data;

  const { state, update } = useAncillaries(offerId);
  const legCount = offer?.slices.length ?? 1;
  const paxCount = offer?.passengers.length ?? 1;
  const summary = offer
    ? { ...offerToBookingData(offer), extras: ancillaryLineItems(state, legCount, paxCount) }
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-6 sm:py-10">
        <StepProgress currentStep={4} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          <section className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-primary/15">
                  <Star className="size-4 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold">Optional Extras</p>
                  <p className="text-xs text-muted-foreground">Enhance your travel experience.</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                <ArrowLeftRight className="size-3.5 text-primary" />
                Extras apply to <span className="font-bold text-foreground">both legs</span> — price shown is per leg.
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {EXTRA_OPTIONS.map(e => {
                  const Icon = EXTRA_ICONS[e.id];
                  const isAdded = state.extras[e.id];
                  return (
                    <div key={e.id} className={cn("rounded-2xl border bg-background/40 p-4 transition-all", isAdded ? "border-primary" : "border-border")}>
                      <div className="grid size-12 place-items-center rounded-xl bg-muted">
                        <Icon className="size-5 text-foreground" />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <p className="font-heading text-xl font-bold">${e.price.toFixed(2)}</p>
                          <p className="font-mono text-[10px] text-muted-foreground">/ leg · per pax</p>
                        </div>
                        <button
                          onClick={() => update({ extras: { ...state.extras, [e.id]: !state.extras[e.id] } })}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                            isAdded ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10",
                          )}
                        >
                          {isAdded ? "✓ Added" : (<><Plus className="size-3" /> Add</>)}
                        </button>
                      </div>
                      <p className="mt-3 font-heading text-base font-bold">{e.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{e.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href={`/flights/seats${qs}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">‹ Back</Link>
              <Link href={`/flights/checkout${qs}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)]">▶ Continue</Link>
            </div>
          </section>

          <BookingSummary data={summary} />
        </div>
      </div>
    </div>
  );
}
