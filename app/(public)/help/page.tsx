import type { Metadata } from "next";
import { HelpClient } from "./client";

export const metadata: Metadata = {
  title: "Help Center | Golafly Travel",
  description: "Find answers, get support, and manage your bookings across flights, stays and eSIM.",
};

export default function HelpPage() {
  return <HelpClient />;
}
