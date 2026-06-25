import axiosInstance from "@/lib/axios";
import type {
  ApiResponse,
  CancellationPayload,
  CancellationRecord,
  CancellationStatus,
  CreateOrderPayload,
  CreateOrderResult,
  FlightOffer,
  FlightOrder,
  FlightOfferRequest,
  FlightSearchPayload,
  OrderApiResponse,
  PlaceSuggestion,
} from "./types";

/* Idempotency key for unsafe, money-moving requests (order create / cancel).
 * Re-using the same key dedupes accidental double-submits server-side. */
function idempotencyKey(prefix: string) {
  const uuid =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}_${uuid}`;
}

export async function searchFlights(
  payload: FlightSearchPayload,
): Promise<ApiResponse<FlightOfferRequest>> {
  const { data } = await axiosInstance.post<ApiResponse<FlightOfferRequest>>(
    "/api/v1/flights/searching",
    payload,
  );
  return data;
}

export async function getOfferRequest(
  offerRequestId: string,
): Promise<ApiResponse<FlightOfferRequest>> {
  const { data } = await axiosInstance.get<ApiResponse<FlightOfferRequest>>(
    `/api/v1/flights/offer-requests/${offerRequestId}`,
  );
  return data;
}

export async function getOfferById(offerId: string): Promise<ApiResponse<FlightOffer>> {
  const { data } = await axiosInstance.get<ApiResponse<FlightOffer>>(
    `/api/v1/flights/offers/${offerId}`,
  );
  return data;
}

export async function getPlaceSuggestions(
  query: string,
  lat?: number,
  lng?: number,
  rad?: number,
): Promise<ApiResponse<PlaceSuggestion[]>> {
  const { data } = await axiosInstance.get<ApiResponse<PlaceSuggestion[]>>(
    "/api/v1/flights/places/suggestions",
    { params: { query, lat, lng, rad } },
  );
  return data;
}

export async function getCabinClasses(): Promise<ApiResponse<string[]>> {
  const { data } = await axiosInstance.get<ApiResponse<string[]>>(
    "/api/v1/flights/classes",
  );
  return data;
}

/* ── Orders ─────────────────────────────────────────────────── */

/** Create a flight order. Returns a Stripe checkout_url to redirect to. */
export async function createOrder(
  payload: CreateOrderPayload,
): Promise<OrderApiResponse<CreateOrderResult>> {
  const { data } = await axiosInstance.post<OrderApiResponse<CreateOrderResult>>(
    "/api/v1/flights/orders",
    payload,
    { headers: { Idempotency_Key: idempotencyKey("flight") } },
  );
  return data;
}

/** Fetch a confirmed booking by its order id (ord_…). */
export async function getOrder(
  orderId: string,
): Promise<OrderApiResponse<FlightOrder>> {
  const { data } = await axiosInstance.get<OrderApiResponse<FlightOrder>>(
    `/api/v1/flights/orders/${orderId}`,
  );
  return data;
}

/** Request cancellation of an order. */
export async function cancelOrder(
  payload: CancellationPayload,
): Promise<OrderApiResponse<CancellationRecord>> {
  const { data } = await axiosInstance.post<OrderApiResponse<CancellationRecord>>(
    "/api/v1/flights/order-cancellations",
    payload,
    { headers: { Idempotency_Key: idempotencyKey("cancel") } },
  );
  return data;
}

/** Fetch the cancellation status for an order id (ord_…). */
export async function getOrderCancellation(
  orderId: string,
): Promise<OrderApiResponse<CancellationStatus>> {
  const { data } = await axiosInstance.get<OrderApiResponse<CancellationStatus>>(
    `/api/v1/flights/order-cancellations/${orderId}`,
  );
  return data;
}
