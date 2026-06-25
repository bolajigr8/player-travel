import { Suspense } from "react";
import type { Metadata } from "next";
import { FlightsClient } from "./client";

export const metadata: Metadata = {
  title: "Flights | Golafly Travel",
  description: "Search and compare flights worldwide — best prices, instant confirmation.",
};

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="page-container py-10"><div className="h-64 animate-pulse rounded-2xl bg-muted" /></div>}>
      <FlightsClient />
    </Suspense>
  );
}
