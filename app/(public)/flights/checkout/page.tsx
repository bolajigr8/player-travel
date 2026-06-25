import { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutClient } from "./client";

export const metadata: Metadata = {
  title: "Checkout | Golafly Travel",
  description: "Complete your booking — passenger details, contact, and payment.",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="page-container py-6 sm:py-10">
        <div className="mt-6 animate-pulse space-y-4">
          <div className="h-40 rounded-2xl bg-muted" />
          <div className="h-48 rounded-2xl bg-muted" />
        </div>
      </div>
    }>
      <CheckoutClient />
    </Suspense>
  );
}
