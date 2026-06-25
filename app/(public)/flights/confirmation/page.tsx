import { Suspense } from "react";
import type { Metadata } from "next";
import { ConfirmationClient } from "./client";

export const metadata: Metadata = {
  title: "Booking Confirmed | Golafly Travel",
  description: "Your travel booking is confirmed. Check your email for details.",
};

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationClient />
    </Suspense>
  );
}
