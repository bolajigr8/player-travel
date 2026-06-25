import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { QueryKeys } from "@/models/query";
import {
  cancelOrder,
  createOrder,
  getCabinClasses,
  getOfferById,
  getOfferRequest,
  getOrder,
  getOrderCancellation,
  getPlaceSuggestions,
  searchFlights,
} from "./api";
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
} from "./types";

interface ApiErrorBody {
  message?: string;
}

/* Search → POST, returns offer request with client_key + offers */
export function useSearchFlights() {
  return useMutation<
    ApiResponse<FlightOfferRequest>,
    AxiosError<ApiErrorBody>,
    FlightSearchPayload
  >({
    mutationKey: [QueryKeys.Flight_Search],
    mutationFn: searchFlights,
  });
}

/*
 * Fetch all offers for a given offer-request ID.
 * Duffel populates offers asynchronously — poll every 2 s until
 * at least one offer arrives, then stop.
 */
export function useFlightOfferRequest(offerRequestId: string | null | undefined) {
  return useQuery<ApiResponse<FlightOfferRequest>, AxiosError<ApiErrorBody>>({
    queryKey: [QueryKeys.Flight_Offer_Request, offerRequestId],
    queryFn: () => getOfferRequest(offerRequestId!),
    enabled: !!offerRequestId,
    staleTime: 2 * 60 * 1000,
    refetchInterval: (query) => {
      const offers = (query.state.data as ApiResponse<FlightOfferRequest> | undefined)
        ?.data?.offers;
      return offers && offers.length > 0 ? false : 2_000;
    },
  });
}

/* Fetch a single offer by ID */
export function useFlightOffer(offerId: string | null) {
  return useQuery<ApiResponse<FlightOffer>, AxiosError<ApiErrorBody>>({
    queryKey: [QueryKeys.Flight_Offer, offerId],
    queryFn: () => getOfferById(offerId!),
    enabled: !!offerId,
  });
}

/* Airport / city autocomplete */
export function usePlaceSuggestions(query: string) {
  return useQuery({
    queryKey: [QueryKeys.Flight_Places, query],
    queryFn: () => getPlaceSuggestions(query),
    enabled: query.length >= 2,
    staleTime: 10 * 60 * 1000,
  });
}

/* Static list of cabin classes */
export function useCabinClasses() {
  return useQuery({
    queryKey: [QueryKeys.Flight_Classes],
    queryFn: getCabinClasses,
    staleTime: Infinity,
  });
}

/* ── Orders ─────────────────────────────────────────────────── */

/* Create an order → returns a Stripe checkout_url to redirect to */
export function useCreateOrder() {
  return useMutation<
    OrderApiResponse<CreateOrderResult>,
    AxiosError<ApiErrorBody>,
    CreateOrderPayload
  >({
    mutationKey: [QueryKeys.Flight_Order_Create],
    mutationFn: createOrder,
  });
}

/* Fetch a confirmed booking by order id (ord_…) */
export function useFlightOrder(orderId: string | null | undefined) {
  return useQuery<OrderApiResponse<FlightOrder>, AxiosError<ApiErrorBody>>({
    queryKey: [QueryKeys.Flight_Order, orderId],
    queryFn: () => getOrder(orderId!),
    enabled: !!orderId,
    retry: false,
  });
}

/* Request cancellation of an order */
export function useCancelOrder() {
  return useMutation<
    OrderApiResponse<CancellationRecord>,
    AxiosError<ApiErrorBody>,
    CancellationPayload
  >({
    mutationKey: [QueryKeys.Flight_Cancel],
    mutationFn: cancelOrder,
  });
}

/* Fetch cancellation status for an order id (ord_…) */
export function useOrderCancellation(orderId: string | null | undefined) {
  return useQuery<OrderApiResponse<CancellationStatus>, AxiosError<ApiErrorBody>>({
    queryKey: [QueryKeys.Flight_Cancellation, orderId],
    queryFn: () => getOrderCancellation(orderId!),
    enabled: !!orderId,
    retry: false,
  });
}
