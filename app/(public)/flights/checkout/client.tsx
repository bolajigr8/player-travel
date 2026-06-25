"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Lock, ShieldCheck, User, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { StepProgress } from "@/components/checkout/step-progress";
import { BookingSummary, type BookingSummaryData } from "@/components/checkout/booking-summary";
import { useFlightOffer, useCreateOrder } from "@/features/flights/hooks";
import { useAncillaries, ancillaryLineItems, ancillariesTotal } from "@/features/flights/ancillaries";
import { checkoutSchema, type CheckoutValues } from "@/features/flights/schema";
import type { FlightOffer } from "@/features/flights/types";

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
function toBookingData(offer: FlightOffer): BookingSummaryData {
  return {
    legs: offer.slices.map((sl, i) => ({
      from: sl.origin.iata_code,
      to: sl.destination.iata_code,
      date: fmtDate(sl.departure_date),
      time: `${fmtTime(sl.segments[0].departing_at)}→${fmtTime(sl.segments[sl.segments.length - 1].arriving_at)}`,
      type: i === 0 ? "outbound" : "return",
    })) as BookingSummaryData["legs"],
    passengers: offer.passengers.length,
    tripType: offer.slices.length > 1 ? "Round trip" : "One way",
    baseFare: parseFloat(offer.base_amount),
    taxes: offer.tax_amount ? parseFloat(offer.tax_amount) : 0,
    discount: 0,
  };
}

const TITLES = [
  { value: "mr", label: "Mr" },
  { value: "mrs", label: "Mrs" },
  { value: "ms", label: "Ms" },
  { value: "miss", label: "Miss" },
  { value: "dr", label: "Dr" },
] as const;

/* ── page client ───────────────────────────────────────────────── */
export function CheckoutClient() {
  const params = useSearchParams();
  const offerId = params.get("offerId");

  const { data, isLoading, error } = useFlightOffer(offerId);
  const offer = data?.data;

  const { state: ancillaries } = useAncillaries(offerId);
  const extraItems = offer
    ? ancillaryLineItems(ancillaries, offer.slices.length, offer.passengers.length)
    : [];
  const extrasTotal = ancillariesTotal(extraItems);

  const { mutate: placeOrder, isPending } = useCreateOrder();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    values: offer
      ? {
          passengers: offer.passengers.map((p) => ({
            id: p.id,
            title: "mr",
            given_name: "",
            family_name: "",
            gender: "m",
            born_on: "",
          })),
          email: "",
          phone_number: "",
        }
      : undefined,
  });

  const { fields } = useFieldArray({ control, name: "passengers" });

  function onSubmit(values: CheckoutValues) {
    if (!offer || !offerId) return;
    placeOrder(
      {
        data: {
          type: "instant",
          selected_offers: [offerId],
          passengers: values.passengers.map((p) => ({
            ...p,
            email: values.email,
            phone_number: values.phone_number,
          })),
          payments: [
            {
              type: "balance",
              currency: offer.total_currency,
              amount: (parseFloat(offer.total_amount) + extrasTotal).toFixed(2),
            },
          ],
        },
      },
      {
        onSuccess: (res) => {
          // Hand off to Stripe's hosted checkout.
          window.location.href = res.data.checkout_url;
        },
        onError: (err) => {
          toast.error(
            err.response?.data?.message ?? err.message ?? "Could not start checkout. Please try again.",
          );
        },
      },
    );
  }

  /* ── no offerId ── */
  if (!offerId) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="size-10 text-muted-foreground" />
        <p className="font-heading text-lg font-bold">No flight selected</p>
        <p className="text-sm text-muted-foreground">Go back and pick a flight to continue.</p>
        <Link href="/flights" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
          Back to search
        </Link>
      </div>
    );
  }

  /* ── loading ── */
  if (isLoading) {
    return (
      <div className="page-container py-6 sm:py-10">
        <StepProgress currentStep={5} />
        <div className="mt-6 animate-pulse space-y-4">
          <div className="h-40 rounded-2xl bg-muted" />
          <div className="h-48 rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  /* ── error / expired ── */
  if (error || !offer) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <XCircle className="size-10 text-red-500" />
        <p className="font-heading text-lg font-bold">Offer no longer available</p>
        <p className="text-sm text-muted-foreground">This offer may have expired. Please search again.</p>
        <Link href="/flights" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
          Search again
        </Link>
      </div>
    );
  }

  const symbol = currencySymbol(offer.total_currency);
  const total = (parseFloat(offer.total_amount) + extrasTotal).toLocaleString("en-GB", { minimumFractionDigits: 2 });

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-6 sm:py-10">
        <StepProgress currentStep={5} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          <section className="space-y-4">
            {/* Passenger Details */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-sm">1</div>
                <div>
                  <p className="font-heading text-lg font-bold">Passenger Details</p>
                  <p className="text-xs text-muted-foreground">Enter each name exactly as on the official ID / passport.</p>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {fields.map((field, i) => (
                  <div key={field.id} className="rounded-xl border border-border bg-background/40 p-4">
                    <p className="flex items-center gap-2 text-sm font-bold">
                      <User className="size-3.5 text-primary" /> Passenger {i + 1}
                    </p>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Title" error={errors.passengers?.[i]?.title?.message}>
                        <select {...register(`passengers.${i}.title`)} className={inputCls}>
                          {TITLES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </Field>
                      <Field label="Gender" error={errors.passengers?.[i]?.gender?.message}>
                        <select {...register(`passengers.${i}.gender`)} className={inputCls}>
                          <option value="m">Male</option>
                          <option value="f">Female</option>
                        </select>
                      </Field>
                      <Field label="First name" error={errors.passengers?.[i]?.given_name?.message}>
                        <input {...register(`passengers.${i}.given_name`)} className={inputCls} placeholder="First name" />
                      </Field>
                      <Field label="Last name" error={errors.passengers?.[i]?.family_name?.message}>
                        <input {...register(`passengers.${i}.family_name`)} className={inputCls} placeholder="Last name" />
                      </Field>
                      <Field label="Date of birth" error={errors.passengers?.[i]?.born_on?.message} fullWidth>
                        <input type="date" {...register(`passengers.${i}.born_on`)} className={inputCls} />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-sm">2</div>
                <div>
                  <p className="font-heading text-lg font-bold">Contact Information</p>
                  <p className="text-xs text-muted-foreground">We&apos;ll send your booking confirmation and flight updates here.</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Email" error={errors.email?.message} fullWidth>
                  <input type="email" {...register("email")} className={inputCls} placeholder="you@email.com" />
                </Field>
                <Field label="Phone number" error={errors.phone_number?.message} fullWidth>
                  <input {...register("phone_number")} className={inputCls} placeholder="+2349038009576" />
                </Field>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-sm">3</div>
                <div>
                  <p className="font-heading text-lg font-bold">Payment</p>
                  <p className="text-xs text-muted-foreground">Your payment is processed securely by Stripe.</p>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-xs text-muted-foreground">
                  When you continue, you&apos;ll be redirected to <span className="font-bold text-foreground">Stripe&apos;s secure checkout</span> to
                  complete your payment of <span className="font-bold text-foreground">{symbol}{total}</span>. Your booking is confirmed once payment succeeds.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href={`/flights/extras?offerId=${offerId}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">‹ Back</Link>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)] transition-opacity disabled:opacity-60"
              >
                <Lock className="size-3.5" /> {isPending ? "Redirecting…" : `Pay ${symbol}${total}`}
              </button>
            </div>
          </section>

          <BookingSummary data={{ ...toBookingData(offer), extras: extraItems }} />
        </form>
      </div>
    </div>
  );
}

/* ── small field wrapper ───────────────────────────────────────── */
const inputCls = "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";

function Field({
  label, error, fullWidth, children,
}: {
  label: string;
  error?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(fullWidth && "sm:col-span-2")}>
      <p className="text-[10px] font-mono text-muted-foreground">{label}</p>
      {children}
      {error && <p className="mt-1 text-[10px] text-red-500">{error}</p>}
    </div>
  );
}
