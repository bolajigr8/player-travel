"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Search, ArrowLeftRight, ChevronDown, Loader2 } from "lucide-react";
import { RECENT_SEARCHES } from "@/store/travel";
import { flightSearchSchema, todayISO, type FlightSearchValues } from "@/features/flights/schema";
import { AirportInput } from "@/components/flights/airport-input";

interface FlightSearchBarProps {
  onSearch: (values: FlightSearchValues) => void;
  isSearching?: boolean;
  /** Seed the form (e.g. from homepage query params) */
  initialValues?: Partial<FlightSearchValues>;
}

export function FlightSearchBar({ onSearch, isSearching, initialValues }: FlightSearchBarProps) {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FlightSearchValues>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: {
      origin:         "LHR",
      destination:    "DXB",
      departure_date: "2026-08-01",
      return_date:    "",
      adults:         1,
      cabin_class:    "economy",
      ...initialValues,
    },
  });

  const departureDate = watch("departure_date");

  function swapAirports() {
    const { origin, destination } = getValues();
    setValue("origin", destination, { shouldValidate: true });
    setValue("destination", origin,  { shouldValidate: true });
  }

  function searchRecent(origin: string, destination: string) {
    setValue("origin", origin, { shouldValidate: true });
    setValue("destination", destination, { shouldValidate: true });
    handleSubmit(onSearch)();
  }

  return (
    <div className="border-b border-border bg-card/60 backdrop-blur-sm">
      <div className="page-container py-4">
        <form onSubmit={handleSubmit(onSearch)} noValidate>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Row 1 — From / Swap / To */}
            <div className="flex min-w-0 items-start gap-2">
              {/* From */}
              <div className="min-w-0 flex-1">
                <Controller
                  control={control}
                  name="origin"
                  render={({ field }) => (
                    <AirportInput
                      value={field.value}
                      onChange={field.onChange}
                      label="From"
                      placeholder="City or airport"
                    />
                  )}
                />
                {errors.origin && (
                  <span className="mt-0.5 block font-mono text-[9px] text-red-500">
                    {errors.origin.message}
                  </span>
                )}
              </div>

              {/* Swap */}
              <motion.button
                type="button"
                onClick={swapAirports}
                className="mt-1 flex shrink-0 items-center justify-center rounded-xl border border-border bg-muted px-3 py-[18px] text-muted-foreground"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                aria-label="Swap airports"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </motion.button>

              {/* To */}
              <div className="min-w-0 flex-1">
                <Controller
                  control={control}
                  name="destination"
                  render={({ field }) => (
                    <AirportInput
                      value={field.value}
                      onChange={field.onChange}
                      label="To"
                      placeholder="City or airport"
                    />
                  )}
                />
                {errors.destination && (
                  <span className="mt-0.5 block font-mono text-[9px] text-red-500">
                    {errors.destination.message}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2 — Depart / Return */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5">
                <Controller
                  control={control}
                  name="departure_date"
                  render={({ field }) => (
                    <input
                      type="date"
                      value={field.value}
                      onChange={field.onChange}
                      min={todayISO()}
                      className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none"
                    />
                  )}
                />
                <span className="font-mono text-[9px] tracking-wider text-muted-foreground">Depart</span>
                {errors.departure_date && (
                  <span className="font-mono text-[9px] text-red-500">{errors.departure_date.message}</span>
                )}
              </div>

              <div className="flex flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5">
                <Controller
                  control={control}
                  name="return_date"
                  render={({ field }) => (
                    <input
                      type="date"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      min={departureDate || todayISO()}
                      className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none"
                    />
                  )}
                />
                <span className="font-mono text-[9px] tracking-wider text-muted-foreground">Return (optional)</span>
                {errors.return_date && (
                  <span className="font-mono text-[9px] text-red-500">{errors.return_date.message}</span>
                )}
              </div>
            </div>

            {/* Row 3 — Travellers + Class + Search */}
            <div className="flex min-w-0 items-stretch gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2.5">
                {/* Adults */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <Controller
                    control={control}
                    name="adults"
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-[13px] font-medium text-foreground outline-none [&>option]:bg-card [&>option]:text-foreground"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                            <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    )}
                  />
                  <span className="font-mono text-[9px] tracking-wider text-muted-foreground">Travellers</span>
                </div>

                <div className="mx-2 h-7 w-px shrink-0 bg-border" />

                {/* Cabin class */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <Controller
                    control={control}
                    name="cabin_class"
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-[13px] font-medium text-foreground outline-none [&>option]:bg-card [&>option]:text-foreground"
                        >
                          <option value="economy">Economy</option>
                          <option value="premium_economy">Premium Economy</option>
                          <option value="business">Business</option>
                          <option value="first">First</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    )}
                  />
                  <span className="font-mono text-[9px] tracking-wider text-muted-foreground">Class</span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSearching}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground shadow-[0_0_12px_rgba(183,255,0,0.35)] transition-all hover:shadow-[0_0_20px_rgba(183,255,0,0.5)] disabled:opacity-60"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSearching
                  ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                  : <Search className="h-4 w-4 shrink-0" />
                }
                <span className="hidden sm:inline">
                  {isSearching ? "Searching…" : "Search Flights"}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </form>

        {/* Recent searches */}
        <motion.div
          className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">Recent:</span>
          {RECENT_SEARCHES.map(s => (
            <button
              key={s.label}
              type="button"
              onClick={() => searchRecent(s.origin, s.destination)}
              disabled={isSearching}
              className="shrink-0 rounded-full border border-border bg-muted px-3 py-1 font-mono text-[10px] text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-60"
            >
              {s.label}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
