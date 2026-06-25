'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { EsimPackageFilters } from '../api'
import { useDebounce } from './use-debounce'

export const DATA_BUCKETS = [
  { label: '≤ 1 GB', apiValue: '1GB' },
  { label: '2–3 GB', apiValue: '3GB' },
  { label: '5–10 GB', apiValue: '5GB' },
  { label: '20–50 GB', apiValue: '20GB' },
  { label: '100 GB+', apiValue: '100GB' },
  { label: 'Unlimited', apiValue: 'unlimited' },
] as const

export const VALIDITY_BUCKETS = [
  { label: '1–7 days', days: 7 },
  { label: '8–15 days', days: 15 },
  { label: '16–30 days', days: 30 },
  { label: '31–90 days', days: 90 },
  { label: '90+ days', days: 365 },
] as const

export function parseList(raw: string | null): string[] {
  if (!raw) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function encodeList(arr: string[]): string {
  return arr.join(',')
}

function dataBucketsToApiParam(buckets: string[]): string | undefined {
  if (!buckets.length) return undefined
  if (buckets.includes('Unlimited')) return 'unlimited'
  const first = DATA_BUCKETS.find((b) => buckets.includes(b.label))
  return first?.apiValue
}

function validityBucketsToApiParam(buckets: string[]): number | undefined {
  if (!buckets.length) return undefined
  const matched = VALIDITY_BUCKETS.filter((b) => buckets.includes(b.label))
  if (!matched.length) return undefined
  return Math.max(...matched.map((b) => b.days))
}

export function useEsimFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const activeTab = (params.get('tab') ?? 'local') as 'local' | 'global'
  const countryCode = params.get('country') ?? 'NG'
  const dataBuckets = useMemo(() => parseList(params.get('data')), [params])
  const validityBuckets = useMemo(
    () => parseList(params.get('validity')),
    [params],
  )
  const unlimitedOnly = params.get('unlimited') === '1'
  const minPrice = Number(params.get('minPrice') ?? 0)
  const maxPrice = Number(params.get('maxPrice') ?? 9999)
  const operators = useMemo(() => parseList(params.get('operators')), [params])
  const regions = useMemo(() => parseList(params.get('regions')), [params])
  const page = Math.max(1, Number(params.get('page') ?? 1))

  const [searchInput, setSearchInput] = useState(params.get('q') ?? '')
  const debouncedSearch = useDebounce(searchInput, 300)

  const setParam = useCallback(
    (updates: Record<string, string | null>, resetPage = true) => {
      const next = new URLSearchParams(params.toString())
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === '') next.delete(k)
        else next.set(k, v)
      })
      if (resetPage) next.set('page', '1')
      router.replace(`${pathname}?${next.toString()}`, { scroll: false })
    },
    [params, pathname, router],
  )

  useEffect(() => {
    setParam({ q: debouncedSearch || null }, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  useEffect(() => {
    const urlQ = params.get('q') ?? ''
    if (urlQ !== searchInput) setSearchInput(urlQ)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  /* ── Stable backendFilters — only recompute when actual values change ──
     This is the fix for the infinite re-render loop. A plain object literal
     created inside the hook body is a new reference every render, which
     changes the React Query key every render → refetch → re-render → loop.
     useMemo with primitive dependencies breaks the cycle. */
  const backendFilters: EsimPackageFilters = useMemo(() => {
    const f: EsimPackageFilters = {}

    if (unlimitedOnly) {
      f.data = 'unlimited'
    } else {
      const dataParam = dataBucketsToApiParam(dataBuckets)
      if (dataParam) f.data = dataParam
    }

    const validityParam = validityBucketsToApiParam(validityBuckets)
    if (validityParam) f.validity_days = validityParam

    if (minPrice > 0) f.min_price = minPrice
    if (maxPrice < 9999) f.max_price = maxPrice

    if (operators.length === 1) f.network = operators[0]

    f.page = page

    return f
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    unlimitedOnly,
    // stringify arrays so useMemo does a deep comparison via primitive
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dataBuckets.join(','),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    validityBuckets.join(','),
    minPrice,
    maxPrice,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    operators.join(','),
    page,
  ])

  const urlSearch = params.get('q')?.toLowerCase().trim() ?? ''

  const activeFilterCount =
    (urlSearch ? 1 : 0) +
    dataBuckets.length +
    validityBuckets.length +
    (unlimitedOnly ? 1 : 0) +
    (minPrice > 0 ? 1 : 0) +
    (maxPrice < 9999 ? 1 : 0) +
    operators.length +
    regions.length

  const hasActive = activeFilterCount > 0

  function toggleList(param: string, current: string[], value: string) {
    const next = current.includes(value)
      ? current.filter((x) => x !== value)
      : [...current, value]
    setParam({ [param]: encodeList(next) || null })
  }

  function clearAll() {
    setSearchInput('')
    setParam({
      q: null,
      data: null,
      validity: null,
      unlimited: null,
      minPrice: null,
      maxPrice: null,
      operators: null,
      regions: null,
    })
  }

  return {
    activeTab,
    countryCode,
    dataBuckets,
    validityBuckets,
    unlimitedOnly,
    minPrice,
    maxPrice,
    operators,
    regions,
    page,
    searchInput,
    setSearchInput,
    urlSearch,
    backendFilters,
    activeFilterCount,
    hasActive,
    setParam,
    toggleList,
    clearAll,
  }
}
