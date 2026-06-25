import axiosInstance from '@/lib/axios'
import type {
  EsimApiResponse,
  EsimConfirmedOrder,
  EsimOrderPayload,
  EsimOrderResult,
  EsimPackage,
  SimPackageItem,
  TopUpPackageItem,
} from './types'

function idempotencyKey(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `esim-${crypto.randomUUID()}`
  }
  // Fallback: construct a UUID-shaped string using getRandomValues
  const arr = new Uint8Array(16)
  crypto.getRandomValues(arr)
  arr[6] = (arr[6] & 0x0f) | 0x40 // version 4
  arr[8] = (arr[8] & 0x3f) | 0x80 // variant
  const hex = Array.from(arr).map((b) => b.toString(16).padStart(2, '0'))
  const uuid = [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-')
  return `esim-${uuid}`
}

export interface EsimPackageFilters {
  min_price?: number
  max_price?: number
  validity_days?: number
  data?: string // e.g. "1GB", "10GB", "unlimited"
  speed?: string // "5G" | "4G"
  network?: string // e.g. "T-Mobile"
  plan_type?: string // "data" | "data-voice" | "data-voice-text"
  page?: number
}

/** Fetch local packages for a specific country — all filters sent to backend */
export async function getLocalPackages(
  country: string,
  filters: EsimPackageFilters = {},
): Promise<
  EsimApiResponse<{ data: EsimPackage[]; pagination: EsimPagination }>
> {
  const { data } = await axiosInstance.get('/api/v1/esim2/packages', {
    params: {
      type: 'local',
      country,
      ...buildFilterParams(filters),
    },
  })
  return data
}

/** Fetch global packages — all filters sent to backend */
export async function getGlobalPackages(
  filters: EsimPackageFilters = {},
): Promise<
  EsimApiResponse<{ data: EsimPackage[]; pagination: EsimPagination }>
> {
  const { data } = await axiosInstance.get('/api/v1/esim2/packages', {
    params: {
      type: 'global',
      ...buildFilterParams(filters),
    },
  })
  return data
}

/** Strip undefined/null so axios doesn't send empty params */
function buildFilterParams(
  filters: EsimPackageFilters,
): Record<string, string | number> {
  const out: Record<string, string | number> = {}
  if (filters.min_price != null) out.min_price = filters.min_price
  if (filters.max_price != null) out.max_price = filters.max_price
  if (filters.validity_days != null) out.validity_days = filters.validity_days
  if (filters.data) out.data = filters.data
  if (filters.speed) out.speed = filters.speed
  if (filters.network) out.network = filters.network
  if (filters.plan_type) out.plan_type = filters.plan_type
  if (filters.page != null) out.page = filters.page
  return out
}

export async function createEsimOrder(
  payload: EsimOrderPayload,
): Promise<EsimApiResponse<EsimOrderResult>> {
  const { data } = await axiosInstance.post<EsimApiResponse<EsimOrderResult>>(
    '/api/v1/esim2/orders',
    payload,
    { headers: { 'Idempotency-Key': idempotencyKey() } },
  )
  return data
}

export async function getEsimOrder(
  ledgerId: number | string,
): Promise<EsimApiResponse<EsimConfirmedOrder>> {
  const { data } = await axiosInstance.get<EsimApiResponse<EsimConfirmedOrder>>(
    `/api/v1/esim2/orders/${ledgerId}`,
  )
  return data
}

export async function getSimPackagesByIccid(
  iccid: string,
): Promise<EsimApiResponse<SimPackageItem[]>> {
  const { data } = await axiosInstance.get<EsimApiResponse<SimPackageItem[]>>(
    `/api/v1/esim2/sims/${iccid}/packages`,
  )
  return data
}

/** Fetch top-up packages available for an existing eSIM (by ICCID) */
export async function getTopUpPackages(
  iccid: string,
): Promise<EsimApiResponse<TopUpPackageItem[]>> {
  const { data } = await axiosInstance.get<EsimApiResponse<TopUpPackageItem[]>>(
    `/api/v1/esim2/sims/${iccid}/topups`,
  )
  return data
}

export interface TopUpOrderPayload {
  package_id: string
  quantity: number
  email: string
  sandbox?: boolean
}

/** Purchase a top-up for an existing eSIM */
export async function createTopUp(
  iccid: string,
  payload: TopUpOrderPayload,
): Promise<EsimApiResponse<EsimOrderResult>> {
  const { data } = await axiosInstance.post<EsimApiResponse<EsimOrderResult>>(
    `/api/v1/esim2/sims/${iccid}/topup`,
    payload,
    { headers: { 'Idempotency-Key': idempotencyKey() } },
  )
  return data
}

export interface EsimPagination {
  total: number
  per_page: number
  page: number
  last_page: number
}
