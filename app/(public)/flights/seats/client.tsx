"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Armchair, ChevronDown, ChevronUp, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProgress } from "@/components/checkout/step-progress";
import { BookingSummary, offerToBookingData } from "@/components/checkout/booking-summary";
import { useFlightOffer } from "@/features/flights/hooks";
import { useAncillaries, ancillaryLineItems } from "@/features/flights/ancillaries";

type SeatType = "first" | "comfort" | "exit" | "smart" | "standard" | "unavailable" | "free";

const SEAT_TYPES: { type: SeatType; label: string; price?: number; sample?: string }[] = [
  { type: "first",       label: "First Row",   price: 39.34 },
  { type: "comfort",     label: "Full Comfort",price: 26.70 },
  { type: "exit",        label: "Exit Row",    price: 26.70 },
  { type: "smart",       label: "Smart",       price: 26.70 },
  { type: "standard",    label: "Standard",    price: 19.67 },
  { type: "unavailable", label: "Unavailable" },
];

const ROW_COUNT = 12;
const COLS = ["A", "B", "C", "D", "E", "F"];

// helper to color seats by row position
function seatType(row: number, col: string): SeatType {
  if (row === 1) return "first";
  if (row === 5) return "exit";
  if (row >= 2 && row <= 4) return "comfort";
  if (row >= 6 && row <= 9) return "smart";
  if ([10, 11, 12].includes(row)) return "standard";
  if (col === "C" || col === "D") return "free";
  return "standard";
}

const SEAT_COLORS: Record<SeatType, string> = {
  first:       "bg-primary/40 hover:bg-primary/60",
  comfort:     "bg-primary/25 hover:bg-primary/45",
  exit:        "bg-emerald-500/30 hover:bg-emerald-500/50",
  smart:       "bg-blue-500/25 hover:bg-blue-500/45",
  standard:    "bg-muted/60 hover:bg-muted",
  unavailable: "bg-destructive/30 cursor-not-allowed",
  free:        "bg-transparent",
};

const LEGS = [
  { id: "out", label: "SCL → MDZ", date: "06:50→07:56·Fri 16 May" },
  { id: "ret", label: "MDZ → SCL", date: "08:20→09:26·Wed 21 May" },
];

export function SeatsClient() {
  const offerId = useSearchParams().get("offerId");
  const qs = offerId ? `?offerId=${offerId}` : "";
  const { data } = useFlightOffer(offerId);
  const { state: ancillaries } = useAncillaries(offerId);
  const summary = data?.data
    ? {
        ...offerToBookingData(data.data),
        extras: ancillaryLineItems(ancillaries, data.data.slices.length, data.data.passengers.length),
      }
    : undefined;

  const [activeLeg, setActiveLeg] = useState("out");
  const [openAssign, setOpenAssign] = useState<Record<string, boolean>>({ out: true });
  const [selected, setSelected] = useState<Record<string, string | null>>({ out: null, ret: null });

  const handleSeat = (row: number, col: string) => {
    const id = `${row}${col}`;
    if (seatType(row, col) === "unavailable") return;
    setSelected(s => ({ ...s, [activeLeg]: s[activeLeg] === id ? null : id }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="page-container py-6 sm:py-10">
        <StepProgress currentStep={3} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          <section className="space-y-4">
            {/* Leg switcher */}
            <div className="grid grid-cols-2 gap-3">
              {LEGS.map(l => (
                <button
                  key={l.id}
                  onClick={() => setActiveLeg(l.id)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left transition-colors",
                    activeLeg === l.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/30",
                  )}
                >
                  <p className="text-sm font-bold">{l.label}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{l.date}</p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
              {/* Left controls */}
              <div className="space-y-3">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <Armchair className="size-4 text-primary" /> Choose your seat
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Click any available seat on the map to select it.</p>
                </div>

                {LEGS.map(l => (
                  <div key={l.id} className="rounded-2xl border border-border bg-card">
                    <button
                      onClick={() => setOpenAssign(s => ({ ...s, [l.id]: !s[l.id] }))}
                      className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold"
                    >
                      <span>Seat Assignment</span>
                      {openAssign[l.id] ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                    </button>
                    {openAssign[l.id] && (
                      <div className="space-y-2 px-4 pb-4 text-xs">
                        <div className="flex items-center justify-between border-b border-border pb-2">
                          <span>{l.label}</span>
                          <span className="font-mono">{selected[l.id] ?? "—"}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Seat total:</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground italic">Random seat ( outbound )</p>
                  <Link
                    href={`/flights/extras${qs}`}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"
                  >
                    ▶ Continue
                  </Link>
                </div>
              </div>

              {/* Seat map */}
              <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-center gap-3 text-[10px]">
                  {SEAT_TYPES.map(s => (
                    <div key={s.label} className="flex items-center gap-1.5">
                      <span className={cn("inline-block size-3 rounded-sm", SEAT_COLORS[s.type])} />
                      <span className="font-mono text-muted-foreground">
                        {s.label}{s.price && ` · $${s.price.toFixed(2)}`}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center font-mono text-xs text-muted-foreground">GF 201</p>
                <div className="mx-auto mt-4 grid w-full max-w-[460px] grid-cols-7 gap-1">
                  {/* Header */}
                  <div />
                  {COLS.map(c => <p key={c} className="text-center text-[10px] font-mono text-muted-foreground">{c}</p>)}

                  {/* Rows */}
                  {Array.from({ length: ROW_COUNT }, (_, i) => i + 1).map(row => (
                    <div key={row} className="contents">
                      <p className="text-center text-[10px] font-mono text-muted-foreground">{row}</p>
                      {COLS.map(col => {
                        const id = `${row}${col}`;
                        const type = seatType(row, col);
                        const isSelected = selected[activeLeg] === id;
                        return (
                          <button
                            key={id}
                            onClick={() => handleSeat(row, col)}
                            className={cn(
                              "grid h-7 place-items-center rounded text-[8px] font-mono transition-colors",
                              SEAT_COLORS[type],
                              isSelected && "ring-2 ring-primary ring-offset-1 ring-offset-card",
                            )}
                          >
                            {type === "unavailable" ? "" : col}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href={`/flights/bags${qs}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">‹ Back</Link>
              <Link href={`/flights/extras${qs}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)]">▶ Continue</Link>
            </div>
          </section>

          <BookingSummary data={summary} />
        </div>
      </div>
    </div>
  );
}
