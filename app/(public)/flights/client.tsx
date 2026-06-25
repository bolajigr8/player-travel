"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, AlertCircle, Plane, Tag, ShieldCheck, Zap, Headphones, ArrowRight, MapPin } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SORT_TABS } from "@/store/travel";

const FLIGHT_TRUST = [
  { icon: Tag,         t: "Hot Deals",    b: "Best fares this week" },
  { icon: Plane,       t: "Airlines",     b: "All major carriers" },
  { icon: ShieldCheck, t: "Baggage",      b: "Rules & allowances" },
  { icon: Headphones,  t: "24/7 Support", b: "We're always here" },
];
const FLIGHT_CATS = [
  { id: "europe", label: "Fly to Europe",       body: "From $389 per person — direct & connecting routes.", cta: "See flights", image: "/c5902ebd4561e008b4d3a49c231b9b87ed04c7cb.png", chip: "Starter trip" },
  { id: "flex",   label: "Flexible Booking",    body: "Change your dates for free on selected fares.",      cta: "Learn more",  image: "/7a586d726fe648e46cf473e1282c5f6522a5af8a.png", chip: "Travel smarter" },
];
const TOP_DEALS = [
  { name: "Madrid",    country: "Spain",  from: 389, image: "/c5902ebd4561e008b4d3a49c231b9b87ed04c7cb.png" },
  { name: "Barcelona", country: "Spain",  from: 412, image: "/2a7a76966bc097de36eaf62926eb81a2bbd8c8ab.png" },
  { name: "Paris",     country: "France", from: 445, image: "/1524a9703d60ba170b8762ae15b7455b02fe81f8.png" },
  { name: "London",    country: "UK",     from: 467, image: "/b01eef212cfdae3dc78a4a2ae45b51bea5321ad5.png" },
  { name: "Miami",     country: "USA",    from: 318, image: "/7f51e74f003cd1d9c27aa8fc150bf870d2aa492d.png" },
];

import { FlightSearchBar }      from "@/components/flights/search-bar";
import { FlightFiltersSidebar } from "@/components/flights/filters-sidebar";
import { FlightCard, FlightCardSkeleton } from "@/components/flights/flight-card";
import {
  FlightPriceInsights,
  FlightTravelConnected,
  FlightYourTrip,
} from "@/components/flights/price-insights";

import { useSearchFlights, useFlightOfferRequest } from "@/features/flights/hooks";
import type { FlightSearchValues } from "@/features/flights/schema";
import type { FlightOffer } from "@/features/flights/types";

const CABIN_CLASSES = ["economy", "premium_economy", "business", "first"] as const;

function currencySymbol(code: string) {
  return ({ EUR: "€", USD: "$", GBP: "£", AED: "د.إ" } as Record<string, string>)[code] ?? code + " ";
}

export function FlightsClient() {
  const [activeSort,     setActiveSort]     = useState("best");
  const [selectedStops,  setSelectedStops]  = useState<string[]>(["Direct", "1 Stop", "2+ Stops"]);
  const [activeAirlines, setActiveAirlines] = useState<string[]>([]);
  const [maxPrice,       setMaxPrice]       = useState<number | null>(null);
  const [showFilters,    setShowFilters]    = useState(false);
  const [showInsights,   setShowInsights]   = useState(false);

  /* ── Seed from query params (homepage hand-off) ── */
  const params = useSearchParams();
  const initialValues = useMemo<FlightSearchValues | undefined>(() => {
    const origin         = params.get("origin");
    const destination    = params.get("destination");
    const departure_date = params.get("departure_date");
    if (!origin || !destination || !departure_date) return undefined;
    const cabin = params.get("cabin_class") ?? "";
    return {
      origin,
      destination,
      departure_date,
      return_date: params.get("return_date") ?? "",
      adults: Math.min(9, Math.max(1, Number(params.get("adults")) || 1)),
      cabin_class: (CABIN_CLASSES as readonly string[]).includes(cabin)
        ? (cabin as FlightSearchValues["cabin_class"])
        : "economy",
    };
  }, [params]);

  /* ── Search mutation ── */
  const {
    mutate: search,
    isPending: isSearching,
    data: searchResult,
  } = useSearchFlights();

  /* offer_request_id from the first search response */
  const offerRequestId = searchResult?.data?.id;

  /* ── Poll / fetch the offers list ── */
  const {
    data: offerRequestData,
    isLoading: isLoadingOffers,
  } = useFlightOfferRequest(offerRequestId);

  const rawOffers: FlightOffer[] = offerRequestData?.data?.offers ?? [];

  /* ── Client-side stop filter ── */
  function stopCount(offer: FlightOffer): string {
    const stops = (offer.slices[0]?.segments.length ?? 1) - 1;
    if (stops === 0) return "Direct";
    if (stops === 1) return "1 Stop";
    return "2+ Stops";
  }

  function offerAirline(offer: FlightOffer): string | undefined {
    return offer.slices[0]?.segments[0]?.marketing_carrier?.name;
  }

  /* ── Filter options derived from the actual results ── */
  const airlines = useMemo(() => {
    const minByName = new Map<string, number>();
    for (const o of rawOffers) {
      const name = offerAirline(o);
      if (!name) continue;
      const price = parseFloat(o.total_amount);
      minByName.set(name, Math.min(minByName.get(name) ?? Infinity, price));
    }
    return [...minByName.entries()]
      .map(([name, minPrice]) => ({ name, minPrice: Math.round(minPrice) }))
      .sort((a, b) => a.minPrice - b.minPrice);
  }, [rawOffers]);

  const priceBounds = useMemo(() => {
    if (rawOffers.length === 0) return undefined;
    const prices = rawOffers.map(o => parseFloat(o.total_amount));
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [rawOffers]);

  const symbol = rawOffers[0] ? currencySymbol(rawOffers[0].total_currency) : "€";

  /* Reset result-specific filters when a new search starts */
  const [lastRequestId, setLastRequestId] = useState(offerRequestId);
  if (offerRequestId !== lastRequestId) {
    setLastRequestId(offerRequestId);
    setMaxPrice(null);
    setActiveAirlines([]);
  }

  const filtered = rawOffers.filter(o => {
    if (selectedStops.length > 0 && !selectedStops.includes(stopCount(o))) return false;
    if (activeAirlines.length > 0 && !activeAirlines.includes(offerAirline(o) ?? "")) return false;
    if (maxPrice !== null && parseFloat(o.total_amount) > maxPrice) return false;
    return true;
  });

  const toggleStop    = (s: string) =>
    setSelectedStops(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleAirline = (a: string) =>
    setActiveAirlines(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  /* ── Handle search submit ── */
  function handleSearch(values: FlightSearchValues) {
    const slices = [
      { origin: values.origin.toUpperCase(), destination: values.destination.toUpperCase(), departure_date: values.departure_date },
    ];

    if (values.return_date) {
      slices.push({
        origin: values.destination.toUpperCase(),
        destination: values.origin.toUpperCase(),
        departure_date: values.return_date,
      });
    }

    const passengers = Array.from({ length: values.adults }, () => ({
      age: 25,
    }));

    search(
      { data: { slices, passengers, cabin_class: values.cabin_class } },
      {
        onError: (err) => {
          toast.error(
            err.response?.data?.message ?? err.message ?? "Search failed. Please try again.",
          );
        },
      },
    );
  }

  /* Auto-run the search once when arriving with params from the homepage */
  const autoSearched = useRef(false);
  useEffect(() => {
    if (!initialValues || autoSearched.current) return;
    autoSearched.current = true;
    handleSearch(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const isLoading = isSearching || isLoadingOffers;
  const hasSearched = !!offerRequestId;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Landing hero (only before first search) ── */}
      {!hasSearched && !isLoading && (
        <section className="page-container pb-6 pt-10 sm:pb-8 sm:pt-14">
          <p className="mb-4 font-mono text-[10px] tracking-[2.5px] text-muted-foreground">GOLAFLY · FLIGHTS</p>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find Your <span className="text-primary">Perfect</span> Flight
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Search hundreds of airlines · Compare prices instantly · Book with confidence
          </p>
        </section>
      )}

      <FlightSearchBar onSearch={handleSearch} isSearching={isSearching} initialValues={initialValues} />

      {/* Trust badges */}
      {!hasSearched && !isLoading && (
        <section className="border-y border-border bg-muted/30">
          <div className="page-container grid grid-cols-2 gap-px sm:grid-cols-4">
            {FLIGHT_TRUST.map(({ icon: Icon, t, b }) => (
              <div key={t} className="flex items-center gap-3 px-4 py-4 sm:py-5">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-foreground">{t}</p>
                  <p className="text-[11px] text-muted-foreground">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category cards */}
      {!hasSearched && !isLoading && (
        <section className="page-container py-8 sm:py-12">
          <div className="grid gap-4 sm:grid-cols-2">
            {FLIGHT_CATS.map(cat => (
              <motion.div key={cat.id} className="group relative h-52 overflow-hidden rounded-2xl" whileHover={{ scale: 1.01 }}>
                <img src={cat.image} alt={cat.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-mono text-[10px] tracking-widest text-primary">{cat.chip}</p>
                  <h2 className="font-heading text-xl font-bold text-white">{cat.label}</h2>
                  <p className="mt-1 text-[12px] text-white/80">{cat.body}</p>
                  <button className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-primary">
                    <ArrowRight className="size-3" /> {cat.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Top deals */}
      {!hasSearched && !isLoading && (
        <section className="page-container pb-14">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[2.5px] text-primary">Top Deals</p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-foreground">Best Prices Right Now</h2>
            </div>
            <Link href="/flights" className="font-mono text-[11px] text-primary hover:underline">View all deals →</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {TOP_DEALS.map((dest, i) => (
              <motion.div key={dest.name} className="group relative h-40 min-w-[160px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl" whileHover={{ y: -4 }} transition={{ delay: i * 0.06 }}>
                <img src={dest.image} alt={dest.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3">
                  <p className="font-heading text-[13px] font-bold text-white">{dest.name}</p>
                  <p className="font-mono text-[10px] text-white/60">{dest.country}</p>
                  <p className="font-mono text-[11px] font-bold text-primary">From ${dest.from}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <div className={cn("page-container py-5 sm:py-8", !hasSearched && "hidden")}>

        {/* ── Mobile toolbar ── */}
        <div className="mb-4 flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setShowFilters(o => !o)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-2 font-mono text-[11px] font-bold transition-colors",
              showFilters ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </button>

          <div className="flex flex-1 gap-1.5 overflow-x-auto scrollbar-hide">
            {["Direct", "1 Stop", "2+ Stops"].map(s => (
              <button
                key={s}
                onClick={() => toggleStop(s)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-2 font-mono text-[11px] font-bold transition-colors",
                  selectedStops.includes(s)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Mobile expandable filters ── */}
        {showFilters && (
          <motion.div
            className="mb-4 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FlightFiltersSidebar
              selectedStops={selectedStops}
              toggleStop={toggleStop}
              airlines={airlines}
              activeAirlines={activeAirlines}
              toggleAirline={toggleAirline}
              priceBounds={priceBounds}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              currencySymbol={symbol}
            />
          </motion.div>
        )}

        {/* ── 3-col grid ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr_260px]">

          {/* Desktop filters */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            <FlightFiltersSidebar
              selectedStops={selectedStops}
              toggleStop={toggleStop}
              airlines={airlines}
              activeAirlines={activeAirlines}
              toggleAirline={toggleAirline}
              priceBounds={priceBounds}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              currencySymbol={symbol}
            />
          </motion.div>

          {/* Results column */}
          <div className="space-y-4">
            {/* Sort tabs */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.38 }}
            >
              <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
                {isLoading
                  ? "Searching…"
                  : hasSearched
                    ? <><span className="font-bold text-foreground">{filtered.length}</span> flights found</>
                    : "Enter a route above and search"
                }
              </p>

              {hasSearched && (
                <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
                  {SORT_TABS.map(tab => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveSort(tab.id)}
                      className={cn(
                        "shrink-0 rounded-xl border px-3 py-2 text-center transition-colors",
                        activeSort === tab.id
                          ? "border-primary bg-primary/10 shadow-[0_0_8px_rgba(183,255,0,0.2)]"
                          : "border-border bg-card hover:border-primary/30",
                      )}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <p className={cn("text-[10px] font-mono", activeSort === tab.id ? "text-primary" : "text-muted-foreground")}>
                        {tab.label}
                      </p>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Price info bar */}
            {hasSearched && !isLoading && (
              <motion.div
                className="flex flex-col items-start gap-2 rounded-lg border border-border bg-muted/40 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14, duration: 0.35 }}
              >
                <p className="text-[11px] text-muted-foreground">
                  Prices include taxes and fees.
                </p>
              </motion.div>
            )}

            {/* ── States ── */}

            {/* Loading skeletons */}
            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <FlightCardSkeleton key={i} />)}
              </div>
            )}

            {/* Empty — no search yet */}
            {!isLoading && !hasSearched && (
              <motion.div
                className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="grid size-14 place-items-center rounded-full bg-primary/10">
                  <Plane className="size-6 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold">Find your flight</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter origin, destination, and dates above then hit Search.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Empty — searched but no results */}
            {!isLoading && hasSearched && filtered.length === 0 && (
              <motion.div
                className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertCircle className="size-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No flights found for your search. Try adjusting the filters or dates.
                </p>
              </motion.div>
            )}

            {/* Flight cards */}
            {!isLoading && filtered.length > 0 && (
              <div className="space-y-3">
                {filtered.map((offer, i) => (
                  <FlightCard key={offer.id} offer={offer} index={i} />
                ))}
              </div>
            )}

            {/* Mobile — price insights toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowInsights(o => !o)}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
              >
                <span className="text-[13px] font-bold text-foreground">Price Insights &amp; Trip Summary</span>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", showInsights && "rotate-180")} />
              </button>
              {showInsights && (
                <motion.div
                  className="mt-3 space-y-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <FlightPriceInsights />
                  <FlightTravelConnected />
                  <FlightYourTrip />
                </motion.div>
              )}
            </div>
          </div>

          {/* Desktop right sidebar */}
          <motion.div
            className="hidden space-y-4 lg:block"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            <FlightPriceInsights />
            <FlightTravelConnected />
            <FlightYourTrip />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
