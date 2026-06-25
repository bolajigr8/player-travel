"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Plane, Loader2, Ticket } from "lucide-react";
import { useFlightOrder } from "@/features/flights/hooks";
import type { FlightOrder } from "@/features/flights/types";

/* ── helpers ───────────────────────────────────────────────────── */
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}
function currencySymbol(code: string) {
  return ({ EUR: "€", USD: "$", GBP: "£", AED: "د.إ" } as Record<string, string>)[code] ?? code + " ";
}

export function ConfirmationClient() {
  const params = useSearchParams();
  // Stripe / backend may return the order id under a few common keys.
  const orderId =
    params.get("orderId") ?? params.get("order_id") ?? params.get("ord");
  const sessionId = params.get("session_id") ?? params.get("sessionId");

  const { data, isLoading, error } = useFlightOrder(orderId);
  const order = data?.data;

  if (orderId && isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Confirming your booking…</p>
      </div>
    );
  }

  if (order) return <RealBooking order={order} />;

  /* ── generic success (no order id, or fetch failed) ── */
  return (
    <GenericSuccess sessionId={sessionId} fetchFailed={!!orderId && !!error} />
  );
}

/* ── real, ticketed booking ────────────────────────────────────── */
function RealBooking({ order }: { order: FlightOrder }) {
  const sym = currencySymbol(order.payment.currency);

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container max-w-2xl py-12">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 220 }}
          className="mx-auto grid size-16 place-items-center rounded-full border-2 border-primary bg-primary/15 text-primary shadow-[0_0_28px_rgba(183,255,0,0.5)]"
        >
          <Check className="size-7" strokeWidth={3} />
        </motion.div>

        <h1 className="mt-6 text-center font-heading text-3xl font-bold sm:text-4xl">Booking Confirmed</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {order.ticketing.ticketed ? "Your tickets have been issued." : "Your booking is being processed."}
        </p>

        {/* Reference + status */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="inline-block rounded-xl border border-primary/40 bg-primary/10 px-6 py-3 font-mono text-base font-bold tracking-[6px] text-primary">
            {order.booking_reference}
          </div>
          <span className="rounded-full bg-muted px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {order.booking_status}
          </span>
        </div>

        {/* Flights */}
        <div className="mt-8 space-y-3">
          {order.flights.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <Plane className="size-4 -rotate-45 text-primary" /> {f.airline} · {f.flight_number}
                </p>
                <span className="font-mono text-[10px] text-muted-foreground">{f.cabin_class}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="text-center">
                  <p className="font-heading text-xl font-bold">{fmtTime(f.departure_time)}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{f.departure_airport}</p>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <div className="flex w-full items-center gap-1">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-[11px] text-muted-foreground">✈</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">{fmtDate(f.departure_time)}</p>
                </div>
                <div className="text-center">
                  <p className="font-heading text-xl font-bold">{fmtTime(f.arrival_time)}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{f.arrival_airport}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Passengers + tickets */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-bold"><Ticket className="size-4 text-primary" /> Passengers</p>
          <div className="mt-2 space-y-1.5">
            {order.passengers.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="capitalize">{p.title} {p.given_name} {p.family_name}</span>
                <span className="font-mono text-muted-foreground">
                  {order.ticketing.tickets[i]?.ticket_number ? `#${order.ticketing.tickets[i].ticket_number}` : p.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-card p-4 text-sm">
          <span className="text-muted-foreground">Total charged · <span className="capitalize">{order.payment.payment_status}</span></span>
          <span className="font-heading text-lg font-bold">{sym}{parseFloat(order.payment.amount_paid).toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href={`/flights/manage?orderId=${order.order_id}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Manage booking
          </Link>
          <Link href="/flights" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)]">
            ▶ Book another flight
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── generic success (Stripe returned, but no order id to fetch) ── */
function GenericSuccess({ sessionId, fetchFailed }: { sessionId: string | null; fetchFailed: boolean }) {
  const ref = sessionId ? sessionId.replace("cs_", "").slice(0, 8).toUpperCase() : "GFBTCMTV";

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center bg-background">

      {/* Pulsing check */}
      <motion.div
        className="relative mb-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <div className="flex size-20 items-center justify-center rounded-full border-4 border-primary bg-background shadow-[0_0_40px_rgba(183,255,0,0.4)]">
          <Check className="size-10 text-primary" strokeWidth={3} />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/30"
          animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Booking Confirmed</h1>
      </motion.div>

      <motion.p
        className="mt-4 max-w-md text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        {fetchFailed
          ? "Your payment was received and your booking is being finalised. Your e-tickets will arrive by email shortly."
          : "Your payment was successful. A confirmation with your e-tickets and booking reference has been sent to your email."}
      </motion.p>

      {/* Reference box */}
      <motion.div
        className="my-6 rounded-xl border border-primary/40 bg-primary/5 px-10 py-4 shadow-[0_0_20px_rgba(183,255,0,0.15)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <p className="font-mono text-[11px] text-muted-foreground mb-1">Booking reference</p>
        <p className="font-mono text-2xl font-bold tracking-widest text-primary">{ref}</p>
      </motion.div>

      <motion.div
        className="flex flex-col gap-3 sm:flex-row"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Link
          href="/flights"
          className="rounded-full border border-border px-6 py-3 font-mono text-[13px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          ← Back to Flights
        </Link>
        <Link
          href="/flights"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-[13px] font-bold text-primary-foreground shadow-[0_0_16px_rgba(183,255,0,0.4)] hover:shadow-[0_0_28px_rgba(183,255,0,0.55)]"
        >
          Explore more destinations →
        </Link>
      </motion.div>
    </div>
  );
}
