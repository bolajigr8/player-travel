/* ─── eSIM Packages ─────────────────────────────────────────── */
export interface EsimPackage {
  package_id: string
  title: string
  data: string
  voice: number | null
  text: number | null
  validity_days: number
  unlimited: boolean
  price: number
  currency: string
  country: string
  country_code: string
  country_image: string
  operator: string
  speed: string | null
  networks: { name: string; types: string[] }[]
  plan_type: string
  rechargeability: boolean
}

export interface EsimPagination {
  total: number
  per_page: number
  page: number
  last_page: number
}

/* ─── Top-up packages ───────────────────────────────────────── */
export interface TopUpPackageItem {
  id: string
  type: 'topup'
  title: string
  data: string
  validity_days: number
  unlimited: boolean
  price: number
  currency: string
}

/* ─── eSIM Order ────────────────────────────────────────────── */
export type EsimType = 'local' | 'global'

export interface EsimOrderPayload {
  package_id: string
  quantity: number
  email: string
  full_name?: string
  phone?: string
  country: string
  type: EsimType
  sandbox?: boolean
}

export interface EsimOrderResult {
  checkout_url: string
  session_id: string
  ledger_id: number
  price: number
  currency: string
}

/* ─── Confirmed Order ───────────────────────────────────────── */
export interface EsimOrderCustomer {
  full_name: string | null
  email: string
  country: string
  phone: string | null
}

export interface EsimOrderPackageDetail {
  id: string
  title: string
  image: string | null
  description: string
  quantity: number
}

export interface EsimOrderPricing {
  price: number
  currency: string
}

export interface EsimOrderPayment {
  paid_at: string
}

export interface EsimOrderFulfillment {
  provider: string
  airalo_order_id: string
  esim_ready: boolean
  iccid: string
  lpa: string
  matching_id: string
  qrcode: string
  direct_apple_installation_url: string
  confirmed_at: string
}

export interface EsimManualInstallation {
  smdp_address: string
  activation_code: string
}

export interface EsimConfirmedOrder {
  status: string
  payment_status: string
  payment_method: string
  customer: EsimOrderCustomer
  package: EsimOrderPackageDetail
  pricing: EsimOrderPricing
  payment: EsimOrderPayment
  fulfillment: EsimOrderFulfillment
  manual_installation: EsimManualInstallation
  created_at: string
  updated_at: string
}

/* ─── SIM packages by ICCID ─────────────────────────────────── */
export interface SimPackageItem {
  id: number
  status: string
  remaining_mb: number | null
  activated_at: string | null
  expired_at: string | null
  finished_at: string | null
  package: {
    id: string
    title: string
    data: string
    validity_days: string
    unlimited: boolean
    type: 'sim' | 'topup'
  }
}

/* ─── API envelopes ─────────────────────────────────────────── */
export interface EsimApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedEsimResponse {
  data: EsimPackage[]
  pagination: EsimPagination
}
