import type { Metadata } from "next";
import { OffersClient } from "./client";

export const metadata: Metadata = {
  title: "Offers | Golafly Travel",
  description: "Exclusive deals and limited-time offers on flights, stays, and eSIM.",
};

export default function OffersPage() {
  return <OffersClient />;
}
