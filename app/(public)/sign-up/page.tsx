import type { Metadata } from "next";
import { SignUpClient } from "./client";

export const metadata: Metadata = {
  title: "Create your account | Golafly Travel",
  description: "Sign up for Golafly — one platform for flights, stays, and eSIM.",
};

export default function SignUpPage() {
  return <SignUpClient />;
}
