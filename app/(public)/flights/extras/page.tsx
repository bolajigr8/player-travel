import { Suspense } from "react";
import type { Metadata } from "next";
import { ExtrasClient } from "./client";

export const metadata: Metadata = {
  title: "Optional extras | Golafly Travel",
  description: "Enhance your travel experience with priority boarding and travel insurance.",
};

export default function ExtrasPage() {
  return (
    <Suspense fallback={<div className="page-container py-10"><div className="h-64 animate-pulse rounded-2xl bg-muted" /></div>}>
      <ExtrasClient />
    </Suspense>
  );
}
