"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FlightOffer } from "@/features/flights/types";

/* ── helpers ───────────────────────────────────────────────── */
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function fmtDuration(iso: string) {
  // ISO 8601: PT7H40M or PT45M
  const h = iso.match(/(\d+)H/)?.[1];
  const m = iso.match(/(\d+)M/)?.[1];
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  if (m) return `${m}m`;
  return iso;
}

function stopLabel(n: number) {
  if (n === 0) return "Direct";
  if (n === 1) return "1 Stop";
  return `${n} Stops`;
}

/* ── component ─────────────────────────────────────────────── */
export function FlightCard({ offer, index }: { offer: FlightOffer; index: number }) {
  const slice = offer.slices[0];
  const firstSeg = slice.segments[0];
  const lastSeg = slice.segments[slice.segments.length - 1];
  const totalStops = slice.segments.length - 1;
  const airline = firstSeg.marketing_carrier.name;
  const price = parseFloat(offer.total_amount);
  const currency = offer.total_currency;

  const currencySymbol: Record<string, string> = {
    EUR: "€", USD: "$", GBP: "£", AED: "د.إ",
  };
  const symbol = currencySymbol[currency] ?? currency + " ";

  return (
    <motion.div
      className="rounded-xl border border-border bg-card p-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.38 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      {/* Top row: airline + price */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {firstSeg.marketing_carrier.logo_symbol_url ? (
            <img
              src={firstSeg.marketing_carrier.logo_symbol_url}
              alt={airline}
              className="h-6 w-6 rounded object-contain"
            />
          ) : (
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
              {airline.slice(0, 2).toUpperCase()}
            </span>
          )}
          <div>
            <p className="text-[13px] font-semibold text-foreground">{airline}</p>
            <p className="text-[10px] text-muted-foreground">
              {firstSeg.marketing_carrier_flight_number}
              {firstSeg.aircraft ? ` · ${firstSeg.aircraft.name}` : ""}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[18px] font-bold leading-none text-primary">
            {symbol}{price.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">per person</p>
        </div>
      </div>

      {/* Route diagram */}
      <div className="my-3 flex items-center gap-2">
        <div className="text-center">
          <p className="text-[16px] font-bold leading-none text-foreground">
            {fmtTime(firstSeg.departing_at)}
          </p>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
            {slice.origin.iata_code}
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 px-1">
          <div className="flex w-full items-center gap-1">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] text-muted-foreground">✈</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="font-mono text-[9px] text-muted-foreground">
            {fmtDuration(slice.duration)} · {stopLabel(totalStops)}
          </p>
        </div>

        <div className="text-center">
          <p className="text-[16px] font-bold leading-none text-foreground">
            {fmtTime(lastSeg.arriving_at)}
          </p>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
            {slice.destination.iata_code}
          </p>
        </div>
      </div>

      {/* Stop badge */}
      {totalStops > 0 && (
        <div className="mb-3 flex gap-1.5">
          {slice.segments.slice(1).map((seg, i) => (
            <span key={i} className="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
              via {seg.origin.iata_code}
            </span>
          ))}
        </div>
      )}

      {/* Bottom: CTA */}
      <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
        <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
          totalStops === 0
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground"
        }`}>
          {stopLabel(totalStops)}
        </span>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Link
            href={`/flights/select?offerId=${offer.id}`}
            className="inline-block rounded-full bg-primary px-4 py-1.5 text-[12px] font-bold text-primary-foreground shadow-[0_0_8px_rgba(183,255,0,0.3)] transition-all hover:shadow-[0_0_16px_rgba(183,255,0,0.5)]"
          >
            View Deal
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── skeleton ──────────────────────────────────────────────── */
export function FlightCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-muted" />
          <div className="space-y-1">
            <div className="h-3 w-28 rounded bg-muted" />
            <div className="h-2.5 w-20 rounded bg-muted" />
          </div>
        </div>
        <div className="h-5 w-20 rounded bg-muted" />
      </div>
      <div className="my-4 flex items-center gap-2">
        <div className="h-4 w-16 rounded bg-muted" />
        <div className="flex-1 rounded bg-muted" style={{ height: 1 }} />
        <div className="h-4 w-16 rounded bg-muted" />
      </div>
      <div className="h-8 w-full rounded-xl bg-muted" />
    </div>
  );
}
