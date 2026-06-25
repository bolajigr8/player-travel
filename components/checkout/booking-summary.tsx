"use client";

import { Plane, ArrowLeftRight, Receipt } from "lucide-react";
import type { FlightOffer } from "@/features/flights/types";

export interface BookingLeg {
  from: string;
  to: string;
  date: string;
  time: string;
  type: "outbound" | "return";
}

export interface BookingSummaryData {
  legs: BookingLeg[];
  passengers: number;
  tripType: "Round trip" | "One way";
  baseFare: number;
  taxes: number;
  discount: number;
  /** Ancillaries (bags, priority boarding, …) added during checkout */
  extras?: { label: string; amount: number }[];
}

export const DEFAULT_BOOKING: BookingSummaryData = {
  legs: [
    { from: "SCL", to: "MDZ", date: "Fri 16 May", time: "06:50→07:56", type: "outbound" },
    { from: "MDZ", to: "SCL", date: "Wed 21 May", time: "08:20→09:26", type: "return" },
  ],
  passengers: 1,
  tripType: "Round trip",
  baseFare: 144,
  taxes: 36.9,
  discount: 6,
};

/* Build summary data straight from a Duffel offer. */
export function offerToBookingData(offer: FlightOffer): BookingSummaryData {
  const t = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  const d = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  return {
    legs: offer.slices.map((sl, i) => ({
      from: sl.origin.iata_code,
      to: sl.destination.iata_code,
      date: d(sl.departure_date),
      time: `${t(sl.segments[0].departing_at)}→${t(sl.segments[sl.segments.length - 1].arriving_at)}`,
      type: i === 0 ? "outbound" : "return",
    })) as BookingSummaryData["legs"],
    passengers: offer.passengers.length,
    tripType: offer.slices.length > 1 ? "Round trip" : "One way",
    baseFare: parseFloat(offer.base_amount),
    taxes: offer.tax_amount ? parseFloat(offer.tax_amount) : 0,
    discount: 0,
  };
}

export function BookingSummary({
  data = DEFAULT_BOOKING,
  highlight = true,
}: {
  data?: BookingSummaryData;
  highlight?: boolean;
}) {
  const extras = data.extras ?? [];
  const extrasTotal = extras.reduce((sum, e) => sum + e.amount, 0);
  const total = data.baseFare + data.taxes + extrasTotal - data.discount;

  return (
    <aside className="space-y-3 rounded-2xl border border-border bg-card p-4">
      <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${highlight ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
        <Receipt className="size-4" />
        <p className="font-heading text-sm font-bold">Your Booking</p>
      </div>

      <div className="space-y-2 px-1">
        {data.legs.map(l => (
          <div key={l.type} className="flex items-start gap-2 text-xs">
            {l.type === "outbound" ? (
              <Plane className="mt-0.5 size-3.5 -rotate-45 text-primary" />
            ) : (
              <ArrowLeftRight className="mt-0.5 size-3.5 text-primary" />
            )}
            <div className="min-w-0">
              <p className="font-medium text-foreground">
                {l.from} <span className="text-muted-foreground">→</span> {l.to}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground">{l.time}·{l.date}</p>
            </div>
          </div>
        ))}
        <p className="font-mono text-[10px] text-muted-foreground">
          {data.passengers} passenger · {data.tripType}
        </p>
      </div>

      <div className="space-y-1.5 border-t border-border pt-3 text-xs">
        <div className="flex justify-between"><span className="text-muted-foreground">Base fare (BASIC) × {data.passengers}</span><span className="font-medium">${data.baseFare.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Taxes &amp; fees</span><span className="font-medium">${data.taxes.toFixed(2)}</span></div>
        {extras.map(e => (
          <div key={e.label} className="flex justify-between"><span className="text-muted-foreground">{e.label}</span><span className="font-medium">${e.amount.toFixed(2)}</span></div>
        ))}
        <div className="flex justify-between text-primary"><span>Discount</span><span>-${data.discount.toFixed(2)}</span></div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-primary px-3 py-2.5 text-primary-foreground">
        <span className="text-sm font-bold">Total:</span>
        <span className="font-heading text-lg font-bold">${total.toFixed(2)}</span>
      </div>
    </aside>
  );
}
