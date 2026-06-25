"use client";

import { TrendingDown, Map } from "lucide-react";
import { PRICE_INSIGHTS_STAYS } from "@/store/travel";

export function StayMapView() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex h-36 items-center justify-center bg-muted sm:h-32">
        <div className="text-center">
          <Map className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-[12px] font-medium text-foreground">Map view</p>
        </div>
      </div>
      <div className="p-3 text-center">
        <button className="font-mono text-[11px] font-bold text-primary">Show on map</button>
      </div>
    </div>
  );
}

export function StayPriceInsights() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-3 text-[13px] font-bold text-foreground">Price Insights</h3>
      <div className="flex items-center gap-1.5">
        <TrendingDown className="h-3.5 w-3.5 text-primary" />
        <p className="text-[11px] font-bold text-primary">Prices are lower than usual</p>
      </div>
      <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
        {PRICE_INSIGHTS_STAYS.message}
      </p>
      <div className="mt-3 space-y-2 border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">Avg. per night</span>
          <span className="text-[13px] font-bold text-foreground">€{PRICE_INSIGHTS_STAYS.avgPerNight}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">Best deal</span>
          <span className="text-[13px] font-bold text-primary">€{PRICE_INSIGHTS_STAYS.bestDeal}</span>
        </div>
      </div>
    </div>
  );
}
