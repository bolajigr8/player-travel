"use client";

import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { PRICE_INSIGHTS_FLIGHTS } from "@/store/travel";

export function FlightPriceInsights() {
  const bars = [40, 55, 70, 35, 60, 45, 80, 50, 65, 30, 55, 75];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-3 text-[13px] font-bold text-foreground">Price Insights</h3>
      {/* Mini bar chart */}
      <div className="mb-3 flex h-16 items-end gap-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className={i === 10 ? "flex-1 rounded-sm bg-primary" : "flex-1 rounded-sm bg-muted"}
            style={{ height: `${h}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.2 + i * 0.03, duration: 0.3 }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <TrendingDown className="h-3.5 w-3.5 text-primary" />
        <p className="text-[11px] font-bold text-primary">Prices are currently Low</p>
      </div>
      <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
        {PRICE_INSIGHTS_FLIGHTS.message}
      </p>
      <button className="mt-2 font-mono text-[10px] text-primary underline underline-offset-2">
        View Price History
      </button>
    </div>
  );
}

export function FlightTravelConnected() {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
      <h3 className="mb-1.5 text-[12px] font-bold text-foreground">Travel Connected</h3>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Add eSIM to your trip. Stay online from the moment you land.
      </p>
      <button className="mt-3 font-mono text-[10px] font-bold text-primary">
        Explore eSIM Plans →
      </button>
    </div>
  );
}

export function FlightYourTrip() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[12px] font-bold text-foreground">Your Trip</h3>
        <button className="font-mono text-[10px] text-primary">Edit</button>
      </div>
      <div className="space-y-2.5">
        {[
          { icon: "✈", text: "London (LHR)" },
          { icon: "📍", text: "Dubai (DXB)" },
          { icon: "📅", text: "Wed, 18 Jun – 25 Jun" },
          { icon: "👤", text: "1 Adult, Economy" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-2.5">
            <span className="text-sm">{icon}</span>
            <span className="text-[12px] text-foreground">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FlightSortTabs({
  activeSort,
  setActiveSort,
}: {
  activeSort: string;
  setActiveSort: (s: string) => void;
}) {
  const tabs = [
    { id: "best",       label: "Best",       price: 354 },
    { id: "cheapest",   label: "Cheapest",   price: 260 },
    { id: "fastest",    label: "Fastest",    price: 592 },
    { id: "best_value", label: "Best Value", price: 384 },
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map(tab => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveSort(tab.id)}
          className={`rounded-xl border px-3 py-2 text-center transition-colors ${
            activeSort === tab.id
              ? "border-primary bg-primary/10 shadow-[0_0_8px_rgba(183,255,0,0.2)]"
              : "border-border bg-card hover:border-primary/30"
          }`}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        >
          <p className={`text-[10px] font-mono ${activeSort === tab.id ? "text-primary" : "text-muted-foreground"}`}>
            {tab.label}
          </p>
          <p className={`text-[14px] font-bold ${activeSort === tab.id ? "text-primary" : "text-foreground"}`}>
            €{tab.price}
          </p>
        </motion.button>
      ))}
    </div>
  );
}
