'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const COUNTRY_CHIPS = [
  { label: 'Nigeria', code: 'NG' },
  { label: 'Ghana', code: 'GH' },
  { label: 'South Africa', code: 'ZA' },
  { label: 'Kenya', code: 'KE' },
  { label: 'UAE', code: 'AE' },
  { label: 'United Kingdom', code: 'GB' },
  { label: 'United States', code: 'US' },
  { label: 'Turkey', code: 'TR' },
  { label: 'Japan', code: 'JP' },
  { label: 'Thailand', code: 'TH' },
] as const

interface EsimModifySearchProps {
  show: boolean
  activeTab: 'local' | 'global'
  activeChip: { label: string; code: string }
  searchInput: string
  setSearchInput: (v: string) => void
  setParam: (params: Record<string, string | null>) => void
}

export function EsimModifySearch({
  show,
  activeTab,
  activeChip,
  searchInput,
  setSearchInput,
  setParam,
}: EsimModifySearchProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className='mb-4 overflow-hidden'
        >
          <div className='space-y-4 rounded-2xl border border-border bg-card p-4'>
            {/* Tab switcher */}
            <div className='flex flex-wrap items-center gap-2'>
              {(['local', 'global'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setParam({
                      tab,
                      country: tab === 'local' ? 'NG' : null,
                      data: null,
                      validity: null,
                      unlimited: null,
                      minPrice: null,
                      maxPrice: null,
                      operators: null,
                      regions: null,
                    })
                  }
                  className={cn(
                    'rounded-full border px-5 py-2 text-sm font-bold capitalize transition-colors',
                    activeTab === tab
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30',
                  )}
                >
                  {tab} Plans
                </button>
              ))}
            </div>

            {/* Country chips */}
            {activeTab === 'local' && (
              <div className='flex flex-wrap items-center gap-2'>
                <span className='font-mono text-[10px] tracking-wider text-muted-foreground'>
                  Country:
                </span>
                {COUNTRY_CHIPS.map((chip) => (
                  <button
                    key={chip.code}
                    onClick={() =>
                      setParam({
                        country: chip.code,
                        data: null,
                        validity: null,
                        unlimited: null,
                        minPrice: null,
                        maxPrice: null,
                      })
                    }
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      activeChip.code === chip.code
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/30',
                    )}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            {/* Search */}
            <div
              className={cn(
                'flex items-center gap-3 rounded-xl border bg-background px-4 py-3 transition-colors',
                searchInput
                  ? 'border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]'
                  : 'border-border',
              )}
            >
              <Search className='size-4 shrink-0 text-muted-foreground' />
              <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  activeTab === 'local'
                    ? `Search in ${activeChip.label}…`
                    : 'Search countries or operators…'
                }
                className='flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground'
              />
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput('')
                    setParam({ q: null })
                  }}
                  className='grid size-5 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground'
                >
                  <X className='size-3' />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
