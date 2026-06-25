import { Suspense } from "react";
import type { Metadata } from "next";
import { ManageBookingClient } from "./client";

export const metadata: Metadata = {
  title: "Manage booking | Golafly Travel",
  description: "View your flight booking, check refundability, and request a cancellation.",
};

export default function ManageBookingPage() {
  return (
    <Suspense fallback={<div className="page-container py-12"><div className="h-40 animate-pulse rounded-2xl bg-muted" /></div>}>
      <ManageBookingClient />
    </Suspense>
  );
}
