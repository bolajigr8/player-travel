import { z } from "zod";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Today as YYYY-MM-DD in the user's local timezone. */
export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const flightSearchSchema = z
  .object({
    origin:         z.string().min(3, "Enter at least 3 characters"),
    destination:    z.string().min(3, "Enter at least 3 characters"),
    departure_date: z.string()
      .regex(DATE_RE, "Select a departure date")
      .refine(d => d >= todayISO(), "Departure date can't be in the past"),
    return_date:    z.string().optional(),
    adults:         z.coerce.number().min(1).max(9),
    cabin_class:    z.enum(["economy", "premium_economy", "business", "first"]),
  })
  .superRefine((vals, ctx) => {
    if (!vals.return_date) return;
    if (!DATE_RE.test(vals.return_date)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["return_date"], message: "Select a valid return date" });
    } else if (vals.return_date < vals.departure_date) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["return_date"], message: "Return can't be before departure" });
    }
  });

export type FlightSearchValues = z.infer<typeof flightSearchSchema>;

/* ── Checkout: passenger details ────────────────────────────── */
export const passengerSchema = z.object({
  id:           z.string().min(1),               // pas_… carried from the offer
  title:        z.enum(["mr", "mrs", "ms", "miss", "dr"]),
  given_name:   z.string().min(1, "First name is required"),
  family_name:  z.string().min(1, "Last name is required"),
  gender:       z.enum(["m", "f"]),
  born_on:      z.string().min(1, "Date of birth is required"),  // YYYY-MM-DD
});
export type PassengerValues = z.infer<typeof passengerSchema>;

export const checkoutSchema = z.object({
  passengers: z.array(passengerSchema).min(1),
  email:        z.string().email("Enter a valid email"),
  phone_number: z.string().min(6, "Enter a valid phone number"),
});
export type CheckoutValues = z.infer<typeof checkoutSchema>;

/* ── Manage booking: cancellation reason ────────────────────── */
export const cancellationSchema = z.object({
  order_id: z.string().min(1, "Order ID is required"),
  reason:   z.string().min(5, "Tell us briefly why you're cancelling"),
});
export type CancellationValues = z.infer<typeof cancellationSchema>;
