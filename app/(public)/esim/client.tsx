'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useLocalEsimPackages,
  useGlobalEsimPackages,
} from '@/features/esim/hooks'
import { useEsimFilters } from '@/features/esim/hooks/use-esim-filters'
import { useEsimPagination } from '@/features/esim/hooks/use-esim-pagination'
import type { EsimPackage } from '@/features/esim/types'
import {
  FilterSidebar,
  type FilterSidebarProps,
} from '@/components/esim/filter-sidebar'
import { EsimResults } from '@/components/esim/esim-results'
import {
  COUNTRY_CHIPS,
  EsimModifySearch,
} from '@/components/esim/landing/esim-modify-search'

function getLowestPrice(pkgs: EsimPackage[]): string | null {
  if (!pkgs.length) return null
  return `€${Math.min(...pkgs.map((p) => p.price)).toFixed(2)}`
}

function getBestValue(pkgs: EsimPackage[]): string | null {
  if (!pkgs.length) return null
  const withRatio = pkgs
    .filter((p) => p.validity_days > 0)
    .map((p) => ({ ratio: p.price / p.validity_days }))
  if (!withRatio.length) return null
  withRatio.sort((a, b) => a.ratio - b.ratio)
  return `€${withRatio[0].ratio.toFixed(2)}/day`
}

function getMostData(pkgs: EsimPackage[]): string | null {
  if (!pkgs.length) return null
  if (pkgs.some((p) => p.unlimited)) return 'Unlimited'
  const parsed = pkgs
    .map((p) => {
      const m = p.data.match(/([\d.]+)\s*(GB|MB)/i)
      if (!m) return 0
      return m[2].toUpperCase() === 'GB'
        ? parseFloat(m[1])
        : parseFloat(m[1]) / 1024
    })
    .filter((n) => n > 0)
  if (!parsed.length) return null
  return `${Math.max(...parsed)} GB`
}

function StatCard({
  label,
  value,
  highlighted,
}: {
  label: string
  value: string
  highlighted: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-xl border px-4 py-3 transition-colors',
        highlighted
          ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.3),0_0_16px_hsl(var(--primary)/0.12)]'
          : 'border-border bg-card',
      )}
    >
      <p
        className={cn(
          'font-mono text-[9px] uppercase tracking-wider',
          highlighted ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'mt-0.5 font-heading text-lg font-bold leading-tight',
          highlighted ? 'text-primary' : 'text-foreground',
        )}
      >
        {value}
      </p>
    </div>
  )
}

export function EsimClient() {
  const params = useSearchParams()
  const page = Math.max(1, Number(params.get('page') ?? 1))

  const filters = useEsimFilters()
  const {
    activeTab,
    countryCode,
    dataBuckets,
    validityBuckets,
    unlimitedOnly,
    minPrice,
    maxPrice,
    operators,
    regions,
    searchInput,
    setSearchInput,
    urlSearch,
    backendFilters,
    activeFilterCount,
    hasActive,
    setParam,
    toggleList,
    clearAll,
  } = filters

  const activeChip =
    COUNTRY_CHIPS.find((c) => c.code === countryCode) ?? COUNTRY_CHIPS[0]

  const {
    data: localData,
    isLoading: localLoading,
    error: localError,
  } = useLocalEsimPackages(
    activeTab === 'local' ? activeChip.code : null,
    backendFilters,
  )

  const {
    data: globalData,
    isLoading: globalLoading,
    error: globalError,
  } = useGlobalEsimPackages(activeTab === 'global' ? backendFilters : {})

  const rawPackages: EsimPackage[] =
    activeTab === 'local'
      ? (localData?.data?.data ?? [])
      : (globalData?.data?.data ?? [])

  const backendTotalPages =
    activeTab === 'local'
      ? (localData?.data?.pagination?.last_page ?? 1)
      : (globalData?.data?.pagination?.last_page ?? 1)

  const isLoading = activeTab === 'local' ? localLoading : globalLoading
  const hasError = activeTab === 'local' ? !!localError : !!globalError

  /* Filter globally by region chips (client-side since backend doesn't support region filter) */
  const regionFiltered = useMemo(() => {
    if (!regions.length || activeTab !== 'global') return rawPackages
    return rawPackages.filter((p) => regions.includes(p.country))
  }, [rawPackages, regions, activeTab])

  const { filtered, totalPages, safePage, paginated, globalRegions } =
    useEsimPagination({
      packages: regionFiltered,
      totalPages: backendTotalPages,
      page,
      isLoading,
      activeTab,
      urlSearch,
      setParam,
    })

  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showModifySearch, setShowModifySearch] = useState(false)

  const lowestPrice = useMemo(() => getLowestPrice(filtered), [filtered])
  const bestValue = useMemo(() => getBestValue(filtered), [filtered])
  const mostData = useMemo(() => getMostData(filtered), [filtered])

  const destinationLabel = activeTab === 'global' ? 'Global' : activeChip.label

  // Price floor/ceiling from current result set
  const priceFloor = rawPackages.length
    ? Math.floor(Math.min(...rawPackages.map((p) => p.price)))
    : 0
  const priceCeiling = rawPackages.length
    ? Math.ceil(Math.max(...rawPackages.map((p) => p.price)))
    : 999
  // const availableOperators = useMemo(
  //   () => [...new Set(rawPackages.map((p) => p.operator))].sort(),
  //   [rawPackages],
  // )

  const availableOperators = useMemo(
    () =>
      [
        ...new Set(
          rawPackages.flatMap((p) => p.networks?.map((n) => n.name) ?? []),
        ),
      ].sort(),
    [rawPackages],
  )

  const availableRegions = useMemo(
    () => [...new Set(rawPackages.map((p) => p.country))].sort(),
    [rawPackages],
  )

  const sidebarProps: FilterSidebarProps = {
    dataBuckets,
    validityBuckets,
    unlimitedOnly,
    minPrice,
    maxPrice,
    operators,
    regions,
    priceFloor,
    priceCeiling,
    isGlobal: activeTab === 'global',
    availableOperators,
    availableRegions,
    hasActive,
    onDataBucket: (l) => toggleList('data', dataBuckets, l),
    onValidityBucket: (l) => toggleList('validity', validityBuckets, l),
    onUnlimited: (v) => setParam({ unlimited: v ? '1' : null }),
    onMinPrice: (v) => setParam({ minPrice: String(v) }),
    onMaxPrice: (v) => setParam({ maxPrice: String(v) }),
    onOperator: (op) => toggleList('operators', operators, op),
    onRegion: (r) => toggleList('regions', regions, r),
    onClearAll: clearAll,
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='page-container py-6 sm:py-8'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <MapPin className='size-4 shrink-0 text-primary' />
            <span className='font-heading text-base font-bold'>
              {destinationLabel}
            </span>
            <span className='text-sm text-muted-foreground'>All plans</span>
          </div>
          <button
            onClick={() => setShowModifySearch((o) => !o)}
            className={cn(
              'flex items-center gap-1.5 text-primary rounded-full border px-4 py-1.5 text-sm font-bold transition-colors',
              showModifySearch
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-foreground hover:border-primary/40',
            )}
          >
            Modify search
          </button>
        </div>

        <EsimModifySearch
          show={showModifySearch}
          activeTab={activeTab}
          activeChip={activeChip}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setParam={setParam}
        />

        {!isLoading && !hasError && filtered.length > 0 && (
          <motion.div
            className='mb-6 flex flex-wrap gap-2'
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
          >
            <StatCard
              label='Lowest Price'
              value={lowestPrice ?? '—'}
              highlighted={false}
            />
            <StatCard label='Best Value' value={bestValue ?? '—'} highlighted />
            <StatCard
              label='Most Data'
              value={mostData ?? '—'}
              highlighted={false}
            />
          </motion.div>
        )}

        <div className='mb-4 lg:hidden'>
          <button
            onClick={() => setShowMobileFilters((o) => !o)}
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12px] font-bold transition-colors',
              showMobileFilters || hasActive
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground',
            )}
          >
            <SlidersHorizontal className='size-3.5' />
            Filters
            {activeFilterCount > 0 && (
              <span className='grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground'>
                {activeFilterCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                className='mt-3'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28 }}
              >
                <FilterSidebar {...sidebarProps} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]'>
          <motion.div
            className='hidden lg:block'
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            <FilterSidebar {...sidebarProps} />
          </motion.div>

          <EsimResults
            isLoading={isLoading}
            hasError={hasError}
            filtered={filtered}
            hasActive={hasActive}
            urlSearch={urlSearch}
            totalPages={totalPages}
            safePage={safePage}
            activeTab={activeTab}
            paginated={paginated}
            globalRegions={globalRegions}
            activeChip={activeChip}
            clearAll={clearAll}
            setParam={setParam}
          />
        </div>
      </div>
    </div>
  )
}
