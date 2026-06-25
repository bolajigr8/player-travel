import { Suspense } from "react";
import type { Metadata } from "next";
import { BagsClient } from "./client";

export const metadata: Metadata = {
  title: "Add baggage | Golafly Travel",
  description: "Add baggage to your booking now and save vs. airport prices.",
};

export default function BagsPage() {
  return (
    <Suspense fallback={<div className="page-container py-10"><div className="h-64 animate-pulse rounded-2xl bg-muted" /></div>}>
      <BagsClient />
    </Suspense>
  );
}
