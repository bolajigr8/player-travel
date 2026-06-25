import type { Metadata } from "next";
import { LoginClient } from "./client";

export const metadata: Metadata = {
  title: "Log in | Golafly Travel",
  description: "Welcome back — log in to manage your bookings and trips.",
};

export default function LoginPage() {
  return <LoginClient />;
}
