import { useMutation, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { QueryKeys } from '@/models/query'
import {
  createEsimOrder,
  createTopUp,
  getEsimOrder,
  getGlobalPackages,
  getLocalPackages,
  getSimPackagesByIccid,
  getTopUpPackages,
  type EsimPackageFilters,
  type TopUpOrderPayload,
} from '../api'
import type {
  EsimApiResponse,
  EsimConfirmedOrder,
  EsimOrderPayload,
  EsimOrderResult,
  EsimPackage,
  PaginatedEsimResponse,
  SimPackageItem,
  TopUpPackageItem,
} from '../types'

interface ApiErrorBody {
  message?: string
}

/** Fetch local eSIM packages — filters forwarded to backend */
export function useLocalEsimPackages(
  country: string | null | undefined,
  filters: EsimPackageFilters = {},
) {
  return useQuery<
    EsimApiResponse<PaginatedEsimResponse>,
    AxiosError<ApiErrorBody>
  >({
    queryKey: [QueryKeys.Esim_Local_Packages, country, filters],
    queryFn: () => getLocalPackages(country!, filters),
    enabled: !!country && country.length >= 2,
    staleTime: 5 * 60 * 1000,
  })
}

/** Fetch global eSIM packages — filters forwarded to backend */
export function useGlobalEsimPackages(filters: EsimPackageFilters = {}) {
  return useQuery<
    EsimApiResponse<PaginatedEsimResponse>,
    AxiosError<ApiErrorBody>
  >({
    queryKey: [QueryKeys.Esim_Global_Packages, filters],
    queryFn: () => getGlobalPackages(filters),
    staleTime: 5 * 60 * 1000,
  })
}

export function useCreateEsimOrder() {
  return useMutation<
    EsimApiResponse<EsimOrderResult>,
    AxiosError<ApiErrorBody>,
    EsimOrderPayload
  >({
    mutationKey: [QueryKeys.Esim_Order_Create],
    mutationFn: createEsimOrder,
  })
}

export function useEsimOrder(ledgerId: number | string | null | undefined) {
  return useQuery<
    EsimApiResponse<EsimConfirmedOrder>,
    AxiosError<ApiErrorBody>
  >({
    queryKey: [QueryKeys.Esim_Order, ledgerId],
    queryFn: () => getEsimOrder(ledgerId!),
    enabled: !!ledgerId,
    retry: false,
  })
}

export function useSimPackagesByIccid(iccid: string | null | undefined) {
  return useQuery<EsimApiResponse<SimPackageItem[]>, AxiosError<ApiErrorBody>>({
    queryKey: [QueryKeys.Esim_Sim_Packages, iccid],
    queryFn: () => getSimPackagesByIccid(iccid!),
    enabled: !!iccid,
    retry: false,
  })
}

/** Fetch top-up packages for an existing eSIM by ICCID */
export function useTopUpPackages(iccid: string | null | undefined) {
  return useQuery<
    EsimApiResponse<TopUpPackageItem[]>,
    AxiosError<ApiErrorBody>
  >({
    queryKey: [QueryKeys.Esim_TopUp_Packages, iccid],
    queryFn: () => getTopUpPackages(iccid!),
    enabled: !!iccid,
    retry: false,
  })
}

/** Purchase a top-up */
export function useCreateTopUp(iccid: string) {
  return useMutation<
    EsimApiResponse<EsimOrderResult>,
    AxiosError<ApiErrorBody>,
    TopUpOrderPayload
  >({
    mutationFn: (payload) => createTopUp(iccid, payload),
  })
}

export { useDebounce } from './use-debounce'
export { useEsimFilters } from './use-esim-filters'
export { useEsimPagination } from './use-esim-pagination'
