/* ── Shared airport / place ─────────────────────────────────── */
export interface Airport {
  id: string;
  iata_code: string;
  name: string;
  city_name?: string;
  iata_country_code?: string;
  latitude?: number;
  longitude?: number;
  time_zone?: string;
}

export interface PlaceSuggestion {
  id: string;
  name: string;
  iata_code?: string;
  iata_country_code?: string;
  latitude?: number;
  longitude?: number;
  time_zone?: string;
  type: "airport" | "city";
  airports?: PlaceSuggestion[];
}

/* ── Carrier / aircraft ─────────────────────────────────────── */
export interface Carrier {
  id: string;
  name: string;
  iata_code: string;
  logo_symbol_url?: string;
  logo_lockup_url?: string;
}

export interface Aircraft {
  id: string;
  name: string;
  iata_code: string;
}

/* ── Segment (one flight leg: airport-to-airport, no stops) ── */
export interface FlightSegment {
  id: string;
  departing_at: string;        // ISO 8601
  arriving_at: string;
  origin: Airport;
  destination: Airport;
  operating_carrier: Carrier;
  marketing_carrier: Carrier;
  marketing_carrier_flight_number: string;
  aircraft?: Aircraft;
  duration: string;            // ISO 8601 e.g. "PT7H40M"
  stops: number;
}

/* ── Slice (full journey leg, may include connecting flights) ─ */
export interface FlightSlice {
  id: string;
  origin: Airport;
  destination: Airport;
  departure_date: string;
  duration: string;
  segments: FlightSegment[];
  fare_brand_name?: string;
  conditions?: {
    change_before_departure?: { allowed: boolean; penalty_amount?: string };
    refund_before_departure?: { allowed: boolean; penalty_amount?: string };
  };
}

/* ── Passenger on an offer ──────────────────────────────────── */
export interface OfferPassenger {
  id: string;
  age?: number;
  type?: string;
  fare_brand_name?: string;
  baggages?: { quantity: number; type: "carry_on" | "checked" }[];
}

/* ── Full flight offer ──────────────────────────────────────── */
export interface FlightOffer {
  id: string;
  total_amount: string;
  total_currency: string;
  base_amount: string;
  tax_amount?: string;
  slices: FlightSlice[];
  passengers: OfferPassenger[];
  payment_requirements?: {
    requires_instant_payment: boolean;
    price_guarantee_expires_at?: string;
  };
  created_at: string;
  expires_at?: string;
}

/* ── Offer request (contains many offers) ───────────────────── */
export interface FlightOfferRequest {
  id: string;
  client_key: string;
  cabin_class: string;
  slices: {
    origin: { iata_code: string; name?: string };
    destination: { iata_code: string; name?: string };
    departure_date: string;
  }[];
  passengers: { id: string; age?: number; type?: string }[];
  offers: FlightOffer[];
  created_at: string;
  expires_at?: string;
}

/* ── Search request payload ─────────────────────────────────── */
export interface FlightSearchPayload {
  data: {
    slices: { origin: string; destination: string; departure_date: string }[];
    passengers: { age?: number; type?: string }[];
    cabin_class: string;
  };
}

/* ── API envelope ───────────────────────────────────────────── */
export interface ApiResponse<T> {
  data: T;
  meta?: { limit?: number; before?: string | null; after?: string | null };
}

/* ── Order envelope (Laravel-style, differs from search) ────── */
export interface OrderApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ── Create-order request payload ───────────────────────────── */
export type PassengerTitle = "mr" | "mrs" | "ms" | "miss" | "dr";
export type PassengerGender = "m" | "f";

export interface OrderPassengerInput {
  id: string;                 // pas_… from the offer
  given_name: string;
  family_name: string;
  born_on: string;            // YYYY-MM-DD
  gender: PassengerGender;
  email: string;
  phone_number: string;       // E.164 e.g. +2349038009576
  title: PassengerTitle;
}

export interface OrderPaymentInput {
  type: string;               // "balance" per API docs
  currency: string;
  amount: string;
}

export interface CreateOrderPayload {
  data: {
    type: "instant";
    selected_offers: string[];
    passengers: OrderPassengerInput[];
    payments: OrderPaymentInput[];
  };
}

/* ── Create-order response (Stripe redirect) ────────────────── */
export interface CreateOrderResult {
  checkout_url: string;
  session_id: string;
  ledger_id: number;
}

/* ── Get-order response (a confirmed booking) ───────────────── */
export interface OrderTicket {
  passenger_name: string;
  ticket_number: string;
}

export interface OrderBookingPassenger {
  title: string;
  given_name: string;
  family_name: string;
  type: string;
}

export interface OrderFlight {
  flight_number: string;
  airline: string;
  aircraft: string;
  departure_airport: string;
  departure_airport_name: string;
  arrival_airport: string;
  arrival_airport_name: string;
  departure_terminal: string | null;
  arrival_terminal: string | null;
  departure_time: string;
  arrival_time: string;
  cabin_class: string;
  seat: string | null;
  baggage: { type: "checked" | "carry_on"; quantity: number }[];
}

export interface FlightOrder {
  booking_reference: string;
  booking_status: string;
  order_id: string;
  airline: string;
  ticketing: { ticketed: boolean; tickets: OrderTicket[] };
  refundability: {
    refundable: boolean;
    penalty_amount: string | null;
    penalty_currency: string | null;
  };
  passengers: OrderBookingPassenger[];
  flights: OrderFlight[];
  payment: { currency: string; amount_paid: string; payment_status: string };
}

/* ── Cancellation request ───────────────────────────────────── */
export interface CancellationPayload {
  data: { order_id: string; reason: string };
}

export interface CancellationRecord {
  id: number;
  parent_ledger_id: number;
  booking_reference: string;
  order_id: string;
  booking_status: string;
  request_type: string;
  cancellation_status: string;
  cancellation_requested_at: string;
  cancelled_at: string | null;
  cancellation_reason: string;
  airline_penalty_amount: string | null;
  service_fee_forfeited: string | null;
  refund_amount: string | null;
  refund_currency: string | null;
  cancelled_by_admin_id: number | null;
  full_name: string;
  email: string;
  phone: string;
  currency: string;
  amount_paid: string;
  fee: string;
}

export interface CancellationStatus {
  status: string;
  requested_at: string;
  cancelled_at: string | null;
  reason: string;
  airline_penalty_amount: string | null;
  service_fee_forfeited: string | null;
  refund_amount: string | null;
  refund_currency: string | null;
}
