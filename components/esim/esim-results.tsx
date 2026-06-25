'use client'

import { motion } from 'framer-motion'
import { Wifi, AlertCircle } from 'lucide-react'
import type { EsimPackage } from '@/features/esim/types'
import { PlanCard, PlanCardSkeleton } from '@/components/esim/plan-card'
import { Pagination } from '@/components/pagination'

const COUNTRY_FLAG: Record<string, string> = {
  Nigeria: '🇳🇬',
  'European Union and United Kingdom': '🇪🇺',
  Europe: '🌍',
  Asia: '🌏',
  'Africa Safari': '🦁',
  'Caribbean Islands': '🏝️',
  'Discover Global': '🌐',
  'Latin America': '🌎',
  'Middle East and North Africa': '🕌',
  'North America': '🌎',
  Oceania: '🦘',
  Africa: '🌍',
}

interface EsimResultsProps {
  isLoading: boolean
  hasError: boolean
  filtered: EsimPackage[]
  hasActive: boolean
  urlSearch: string
  totalPages: number
  safePage: number
  activeTab: 'local' | 'global'
  paginated: EsimPackage[]
  globalRegions: string[]
  activeChip: { label: string; code: string }
  clearAll: () => void
  setParam: (params: Record<string, string | null>, replace?: boolean) => void
}

export function EsimResults({
  isLoading,
  hasError,
  filtered,
  hasActive,
  urlSearch,
  totalPages,
  safePage,
  activeTab,
  paginated,
  globalRegions,
  activeChip,
  clearAll,
  setParam,
}: EsimResultsProps) {
  return (
    <div id='esim-results' className='space-y-5'>
      {/* Count + page */}
      <motion.div
        className='flex items-center justify-between'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        {!isLoading && !hasError && (
          <p className='font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
            {filtered.length} Plans Found
            {hasActive && !urlSearch ? ' · filters active' : ''}
          </p>
        )}
        {!isLoading && totalPages > 1 && (
          <span className='font-mono text-[10px] text-muted-foreground'>
            Page {safePage} of {totalPages}
          </span>
        )}
      </motion.div>

      {/* Search hint */}
      {urlSearch && !isLoading && (
        <p className='text-[11px] text-muted-foreground'>
          {filtered.length === 0
            ? `No plans found for "${urlSearch}"`
            : `${filtered.length} plan${filtered.length !== 1 ? 's' : ''} matching "${urlSearch}"`}
        </p>
      )}

      {/* Loading */}
      {isLoading && (
        /* Max 2 per row */
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {Array.from({ length: 4 }).map((_, i) => (
            <PlanCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && hasError && (
        <div className='flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-14 text-center'>
          <AlertCircle className='size-8 text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>
            Failed to load packages. Please try again.
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !hasError && filtered.length === 0 && (
        <div className='flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-14 text-center'>
          <Wifi className='size-8 text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>
            {urlSearch
              ? `No plans found for "${urlSearch}"`
              : 'No plans match your filters.'}
          </p>
          <button
            onClick={clearAll}
            className='font-mono text-[11px] text-primary underline underline-offset-2'
          >
            {urlSearch ? 'Clear search' : 'Clear all filters'}
          </button>
        </div>
      )}

      {/* Local — max 2 per row */}
      {!isLoading &&
        !hasError &&
        activeTab === 'local' &&
        paginated.length > 0 && (
          <>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {paginated.map((pkg, i) => (
                <motion.div
                  key={pkg.package_id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.32 }}
                >
                  <PlanCard
                    pkg={pkg}
                    activeTab={activeTab}
                    countryCode={activeChip.code}
                  />
                </motion.div>
              ))}
            </div>
            <Pagination
              page={safePage}
              totalPages={totalPages}
              onPage={(p) => setParam({ page: String(p) }, false)}
            />
          </>
        )}

      {/* Global — grouped by region, max 2 per row */}
      {!isLoading &&
        !hasError &&
        activeTab === 'global' &&
        paginated.length > 0 && (
          <>
            <div className='space-y-8'>
              {globalRegions.map((region) => {
                const regionPkgs = paginated.filter((p) => p.country === region)
                if (!regionPkgs.length) return null
                return (
                  <div key={region}>
                    <div className='mb-3 flex items-center gap-2'>
                      <span className='text-lg'>
                        {COUNTRY_FLAG[region] ?? '🌐'}
                      </span>
                      <h2 className='font-heading text-lg font-bold'>
                        {region}
                      </h2>
                      <span className='rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground'>
                        {regionPkgs.length}
                      </span>
                    </div>
                    {/* Max 2 per row */}
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      {regionPkgs.map((pkg, i) => (
                        <motion.div
                          key={pkg.package_id}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.32 }}
                        >
                          <PlanCard
                            pkg={pkg}
                            activeTab={activeTab}
                            countryCode={activeChip.code}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <Pagination
              page={safePage}
              totalPages={totalPages}
              onPage={(p) => setParam({ page: String(p) }, false)}
            />
          </>
        )}
    </div>
  )
}
