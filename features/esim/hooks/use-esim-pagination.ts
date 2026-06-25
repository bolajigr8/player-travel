import { useMemo, useEffect } from 'react'
import type { EsimPackage } from '../types'

const PLANS_PER_PAGE = 12

export function useEsimPagination({
  packages,
  totalPages: backendTotalPages,
  page,
  isLoading,
  activeTab,
  urlSearch,
  setParam,
}: {
  packages: EsimPackage[]
  totalPages: number
  page: number
  isLoading: boolean
  activeTab: 'local' | 'global'
  urlSearch: string
  setParam: (
    updates: Record<string, string | null>,
    resetPage?: boolean,
  ) => void
}) {
  const filtered = useMemo(() => {
    if (!urlSearch) return packages
    const q = urlSearch.toLowerCase()
    return packages.filter((pkg) => {
      const haystack = [
        pkg.country,
        pkg.country_code,
        pkg.operator,
        pkg.title,
        pkg.data,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [packages, urlSearch])

  const totalPages = Math.max(
    1,
    urlSearch ? Math.ceil(filtered.length / PLANS_PER_PAGE) : backendTotalPages,
  )

  /* Always at least 1 — fixes page=0 in logs */
  const safePage = Math.max(1, Math.min(page, totalPages))

  const paginated = useMemo(() => {
    if (urlSearch) {
      return filtered.slice(
        (safePage - 1) * PLANS_PER_PAGE,
        safePage * PLANS_PER_PAGE,
      )
    }
    return filtered
  }, [filtered, safePage, urlSearch])

  /* Snap back only when page is genuinely out of range and not already 1 */
  useEffect(() => {
    if (!isLoading && page !== safePage && safePage >= 1) {
      setParam({ page: String(safePage) }, false)
    }
  }, [safePage, page, isLoading, setParam])

  useEffect(() => {
    document
      .getElementById('esim-results')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page])

  const globalRegions = useMemo(
    () =>
      activeTab === 'global'
        ? [...new Set(paginated.map((p) => p.country))]
        : [],
    [activeTab, paginated],
  )

  return { filtered, totalPages, safePage, paginated, globalRegions }
}
