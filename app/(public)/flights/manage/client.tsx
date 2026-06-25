"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Plane, Loader2, XCircle, ShieldCheck, ShieldOff,
  Ban, CheckCircle2, Clock,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useFlightOrder, useOrderCancellation, useCancelOrder } from "@/features/flights/hooks";
import type { FlightOrder, CancellationStatus } from "@/features/flights/types";

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
function currencySymbol(code: string | null) {
  if (!code) return "";
  return ({ EUR: "€", USD: "$", GBP: "£", AED: "د.إ" } as Record<string, string>)[code] ?? code + " ";
}

export function ManageBookingClient() {
  const initial = useSearchParams().get("orderId") ?? "";
  const [input, setInput] = useState(initial);
  const [orderId, setOrderId] = useState<string | null>(initial || null);

  const { data: orderData, isLoading, error } = useFlightOrder(orderId);
  const order = orderData?.data;

  const { data: cancelData, refetch: refetchCancellation } = useOrderCancellation(orderId);
  const cancellation = cancelData?.data;

  function lookup(e: React.FormEvent) {
    e.preventDefault();
    const id = input.trim();
    if (!id) return;
    setOrderId(id);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container max-w-2xl py-8 sm:py-12">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Manage your booking</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your order ID (starts with <span className="font-mono">ord_</span>) to view your booking or request a cancellation.
        </p>

        {/* Lookup */}
        <form onSubmit={lookup} className="mt-5 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ord_0000…"
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm"
          />
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
            <Search className="size-4" /> Find
          </button>
        </form>

        {/* States */}
        {orderId && isLoading && (
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="size-5 animate-spin text-primary" /> Loading booking…
          </div>
        )}

        {orderId && !isLoading && (error || !order) && (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-12 text-center">
            <XCircle className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No booking found for that order ID.</p>
          </div>
        )}

        {order && (
          <BookingDetails
            order={order}
            cancellation={cancellation}
            onCancelled={() => refetchCancellation()}
          />
        )}

        <div className="mt-8">
          <Link href="/flights" className="text-sm text-muted-foreground hover:text-foreground">‹ Back to flights</Link>
        </div>
      </div>
    </div>
  );
}

/* ── booking details + cancellation ────────────────────────────── */
function BookingDetails({
  order, cancellation, onCancelled,
}: {
  order: FlightOrder;
  cancellation?: CancellationStatus;
  onCancelled: () => void;
}) {
  const sym = currencySymbol(order.payment.currency);
  const [showCancel, setShowCancel] = useState(false);
  const [reason, setReason] = useState("");
  const { mutate: cancel, isPending } = useCancelOrder();

  // Already cancelled / requested?
  const alreadyCancelling = !!cancellation && cancellation.status !== "none";

  function submitCancel() {
    if (reason.trim().length < 5) {
      toast.error("Please give a brief reason (at least 5 characters).");
      return;
    }
    cancel(
      { data: { order_id: order.order_id, reason: reason.trim() } },
      {
        onSuccess: (res) => {
          toast.success(res.message ?? "Cancellation requested.");
          setShowCancel(false);
          setReason("");
          onCancelled();
        },
        onError: (err) => {
          toast.error(err.response?.data?.message ?? err.message ?? "Could not submit cancellation.");
        },
      },
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Booking reference</p>
          <p className="font-heading text-xl font-bold tracking-[4px] text-primary">{order.booking_reference}</p>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {order.booking_status}
        </span>
      </div>

      {/* Flights */}
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
                <div className="h-px flex-1 bg-border" /><span className="text-[11px] text-muted-foreground">✈</span><div className="h-px flex-1 bg-border" />
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

      {/* Payment + refundability */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4 text-sm">
          <p className="text-muted-foreground">Amount paid</p>
          <p className="font-heading text-lg font-bold">{sym}{parseFloat(order.payment.amount_paid).toLocaleString("en-GB", { minimumFractionDigits: 2 })}</p>
          <p className="mt-0.5 font-mono text-[10px] capitalize text-muted-foreground">{order.payment.payment_status}</p>
        </div>
        <div className="flex items-start gap-2 rounded-2xl border border-border bg-card p-4 text-sm">
          {order.refundability.refundable ? <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /> : <ShieldOff className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
          <div>
            <p className="font-medium">{order.refundability.refundable ? "Refundable" : "Non-refundable"}</p>
            {order.refundability.refundable && order.refundability.penalty_amount && (
              <p className="font-mono text-[10px] text-muted-foreground">
                Penalty: {currencySymbol(order.refundability.penalty_currency)}{order.refundability.penalty_amount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cancellation status (if any) */}
      {alreadyCancelling && cancellation && (
        <CancellationCard c={cancellation} />
      )}

      {/* Cancel action */}
      {!alreadyCancelling && (
        <div className="rounded-2xl border border-border bg-card p-4">
          {!showCancel ? (
            <button
              onClick={() => setShowCancel(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600"
            >
              <Ban className="size-4" /> Request cancellation
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-bold">Request cancellation</p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Tell us briefly why you're cancelling…"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={submitCancel}
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-60"
                >
                  {isPending ? <Loader2 className="size-4 animate-spin" /> : <Ban className="size-4" />}
                  {isPending ? "Submitting…" : "Confirm cancellation"}
                </button>
                <button onClick={() => setShowCancel(false)} className="text-sm text-muted-foreground hover:text-foreground">
                  Keep booking
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ── cancellation status card ──────────────────────────────────── */
function CancellationCard({ c }: { c: CancellationStatus }) {
  const cancelled = c.status === "cancelled";
  return (
    <div className={cn("rounded-2xl border p-4", cancelled ? "border-primary/30 bg-primary/5" : "border-amber-500/30 bg-amber-500/5")}>
      <p className="flex items-center gap-2 text-sm font-bold">
        {cancelled ? <CheckCircle2 className="size-4 text-primary" /> : <Clock className="size-4 text-amber-500" />}
        Cancellation {c.status}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Requested {fmtDate(c.requested_at)}{c.cancelled_at ? ` · cancelled ${fmtDate(c.cancelled_at)}` : ""}</p>
      {c.reason && <p className="mt-2 text-xs italic text-muted-foreground">“{c.reason}”</p>}

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
        <Stat label="Airline penalty" value={c.airline_penalty_amount} currency={c.refund_currency} />
        <Stat label="Service fee" value={c.service_fee_forfeited} currency={c.refund_currency} />
        <Stat label="Refund" value={c.refund_amount} currency={c.refund_currency} highlight />
      </div>
    </div>
  );
}

function Stat({ label, value, currency, highlight }: { label: string; value: string | null; currency: string | null; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 px-3 py-2">
      <p className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn("font-bold", highlight && "text-primary")}>
        {value != null ? `${currencySymbol(currency)}${value}` : "—"}
      </p>
    </div>
  );
}
