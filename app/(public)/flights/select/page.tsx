import { Suspense } from "react";
import type { Metadata } from "next";
import { SelectFlightClient } from "./client";

export const metadata: Metadata = {
  title: "Select your flight & fare | Golafly Travel",
  description: "Review your selected flight, included fare and baggage, then continue to add bags.",
};

export default function SelectFlightPage() {
  return (
    <Suspense fallback={
      <div className="page-container py-6 sm:py-10">
        <div className="mt-6 animate-pulse space-y-4">
          <div className="h-12 rounded-2xl bg-muted" />
          <div className="h-52 rounded-2xl bg-muted" />
          <div className="h-52 rounded-2xl bg-muted" />
        </div>
      </div>
    }>
      <SelectFlightClient />
    </Suspense>
  );
}
