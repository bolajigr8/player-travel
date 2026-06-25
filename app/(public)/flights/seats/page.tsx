import { Suspense } from "react";
import type { Metadata } from "next";
import { SeatsClient } from "./client";

export const metadata: Metadata = {
  title: "Choose your seats | Golafly Travel",
  description: "Pick your preferred seats for both legs of your trip.",
};

export default function SeatsPage() {
  return (
    <Suspense fallback={<div className="page-container py-10"><div className="h-64 animate-pulse rounded-2xl bg-muted" /></div>}>
      <SeatsClient />
    </Suspense>
  );
}
