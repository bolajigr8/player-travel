"use client";

import { useEffect, useState } from "react";

/* ── Catalogue (display data lives with the pages; prices here so
      the booking summary and checkout share one source of truth) ── */
export const BAG_OPTIONS = [
  { id: "personal", name: "Personal Item", weight: "10kg", desc: "Backpack or small bag", dim: "45 × 35 × 25 cm", price: 0, included: true },
  { id: "carry",    name: "Carry-on Bag",  weight: "10kg", desc: "Fits in overhead bin",  dim: "55 × 35 × 25 cm", price: 40.75, included: false, original: 42.15 },
  { id: "checked",  name: "Checked Bag",   weight: "23kg", desc: "Stored in cargo hold",  dim: "158 cm total (A+B+C)", price: 56.20, included: false, original: 57.61 },
] as const;

export const EXTRA_OPTIONS = [
  { id: "priority",  title: "Priority Boarding", price: 15,   body: "Skip the queue and board first. Perfect if you travel with carry-on only." },
  { id: "insurance", title: "Travel Insurance",  price: 18.5, body: "International medical coverage, 24/7 assistance, and trip cancellation protection." },
] as const;

export interface AncillaryState {
  bags: Record<string, boolean>;
  skipBags: boolean;
  extras: Record<string, boolean>;
}

const DEFAULT_STATE: AncillaryState = { bags: {}, skipBags: false, extras: {} };

const storageKey = (offerId: string) => `flight-ancillaries:${offerId}`;

/**
 * Bag/extra selections for one offer, persisted in sessionStorage so they
 * survive navigation across the bags → seats → extras → checkout steps.
 */
export function useAncillaries(offerId: string | null) {
  const [state, setState] = useState<AncillaryState>(DEFAULT_STATE);

  /* Hydrate after mount — sessionStorage isn't available during SSR */
  useEffect(() => {
    if (!offerId) return;
    try {
      const raw = sessionStorage.getItem(storageKey(offerId));
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
    } catch {
      /* corrupt entry — keep defaults */
    }
  }, [offerId]);

  function update(patch: Partial<AncillaryState>) {
    setState(prev => {
      const next = { ...prev, ...patch };
      if (offerId) {
        try {
          sessionStorage.setItem(storageKey(offerId), JSON.stringify(next));
        } catch {
          /* storage full / unavailable — selection still works in-memory */
        }
      }
      return next;
    });
  }

  return { state, update };
}

export interface AncillaryLineItem {
  label: string;
  amount: number;
}

/** Priced line items for the booking summary. Bags are per leg; extras per leg and passenger. */
export function ancillaryLineItems(state: AncillaryState, legCount: number, passengerCount: number): AncillaryLineItem[] {
  const items: AncillaryLineItem[] = [];
  if (!state.skipBags) {
    for (const b of BAG_OPTIONS) {
      if (!b.included && state.bags[b.id]) {
        items.push({ label: `${b.name} × ${legCount} leg${legCount > 1 ? "s" : ""}`, amount: b.price * legCount });
      }
    }
  }
  for (const e of EXTRA_OPTIONS) {
    if (state.extras[e.id]) {
      items.push({ label: e.title, amount: e.price * legCount * passengerCount });
    }
  }
  return items;
}

export function ancillariesTotal(items: AncillaryLineItem[]) {
  return items.reduce((sum, i) => sum + i.amount, 0);
}
