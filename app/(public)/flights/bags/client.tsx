"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown, ChevronUp, Luggage, Backpack, Plus, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProgress } from "@/components/checkout/step-progress";
import { BookingSummary, offerToBookingData } from "@/components/checkout/booking-summary";
import { useFlightOffer } from "@/features/flights/hooks";
import { BAG_OPTIONS, useAncillaries, ancillaryLineItems, ancillariesTotal } from "@/features/flights/ancillaries";

const BAG_ICONS = { personal: Backpack, carry: Briefcase, checked: Luggage } as const;

export function BagsClient() {
  const offerId = useSearchParams().get("offerId");
  const qs = offerId ? `?offerId=${offerId}` : "";
  const { data } = useFlightOffer(offerId);
  const offer = data?.data;

  const [openRules, setOpenRules] = useState(false);
  const { state, update } = useAncillaries(offerId);

  const legCount = offer?.slices.length ?? 1;
  const paxCount = offer?.passengers.length ?? 1;

  const lineItems = ancillaryLineItems(state, legCount, paxCount);
  const bagsTotal = ancillariesTotal(
    lineItems.filter(i => BAG_OPTIONS.some(b => i.label.startsWith(b.name))),
  );
  const summary = offer ? { ...offerToBookingData(offer), extras: lineItems } : undefined;

  function toggleBag(id: string) {
    update({ bags: { ...state.bags, [id]: !state.bags[id] }, skipBags: false });
  }

  function toggleSkipBags() {
    /* Skipping clears any chosen bags */
    update({ skipBags: !state.skipBags, bags: {} });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-6 sm:py-10">
        <StepProgress currentStep={2} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          <section className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-primary/15">
                  <Briefcase className="size-4 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold">Baggage</p>
                  <p className="text-xs text-muted-foreground">Add bags now and save vs. airport prices.</p>
                </div>
              </div>

              {legCount > 1 && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  <ArrowLeftRight className="size-3.5 text-primary" />
                  Bags apply to <span className="font-bold text-foreground">both legs</span> — outbound and return included.
                </div>
              )}

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {BAG_OPTIONS.map(b => {
                  const isSelected = b.included || (!state.skipBags && state.bags[b.id]);
                  const isDisabled = !b.included && state.skipBags;
                  const Icon = BAG_ICONS[b.id];
                  return (
                    <button
                      key={b.id}
                      onClick={() => !b.included && toggleBag(b.id)}
                      disabled={isDisabled}
                      className={cn(
                        "relative space-y-3 rounded-xl border p-4 text-left transition-all",
                        isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/40",
                        b.included && "cursor-default",
                        isDisabled && "pointer-events-none opacity-40 grayscale",
                      )}
                    >
                      {isSelected && (
                        <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">✓</span>
                      )}
                      <div className="space-y-1">
                        <div className="grid size-12 place-items-center rounded-lg bg-muted">
                          <Icon className="size-6 text-primary" />
                        </div>
                        <p className="font-mono text-[10px] text-muted-foreground">{b.weight}</p>
                      </div>
                      <p className="font-heading text-base font-bold">{b.name}</p>
                      <p className="text-xs text-muted-foreground">{b.desc}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{b.dim}</p>
                      {b.included ? (
                        <>
                          <p className="text-sm font-bold text-foreground">Included</p>
                          <p className="rounded-full bg-primary px-3 py-1.5 text-center text-xs font-bold text-primary-foreground">✓ Included in fare</p>
                        </>
                      ) : (
                        <>
                          <p className="font-mono text-[10px] text-muted-foreground line-through">${b.original?.toFixed(2)}/leg</p>
                          <p className="text-sm font-bold">from <span className="text-primary">${b.price.toFixed(2)}</span>/leg</p>
                          <p className={cn("flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-center text-xs font-bold", isSelected ? "bg-primary text-primary-foreground" : "text-primary")}>
                            {isSelected ? "Added" : (<><Plus className="size-3" /> Add</>)}
                          </p>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={state.skipBags}
                  onChange={toggleSkipBags}
                  className="size-4 rounded border-border bg-background text-primary"
                />
                <span className="font-medium">I don&apos;t need extra baggage.</span>
                <span className="ml-2 text-muted-foreground italic">*Adding bags at the airport costs more. Book now to save.</span>
              </label>

              <button
                onClick={() => setOpenRules(o => !o)}
                className="mt-4 flex w-full items-center justify-between rounded-lg border border-border px-4 py-2.5 text-xs"
              >
                <span className="font-medium">▶ Baggage rules &amp; dimensions</span>
                {openRules ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              </button>
              {openRules && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="rounded-b-lg border border-t-0 border-border px-4 py-3 text-xs text-muted-foreground">
                  <ul className="space-y-1">
                    <li>· Personal item: 10kg max, must fit under the seat.</li>
                    <li>· Carry-on: 10kg max, fits in overhead bin.</li>
                    <li>· Checked: 23kg max per piece, max 158 cm linear.</li>
                  </ul>
                </motion.div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="font-bold">Baggage total ({legCount > 1 ? "both legs" : "one leg"}):</span>
                <span className="font-heading text-lg font-bold">${bagsTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Link href={`/flights/select${qs}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                ‹ Back
              </Link>
              <Link href={`/flights/seats${qs}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)]">
                ▶ Continue
              </Link>
            </div>
          </section>

          <BookingSummary data={summary} />
        </div>
      </div>
    </div>
  );
}
