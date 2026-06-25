'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STAY_RESULTS, STAY_FILTERS } from '@/store/stays'
import { StaySearchBar } from './stay-search-bar'
import { StayFiltersSidebar } from './stay-filters-sidebar'
import { StayResultCard } from './stay-result-card'

export function StaysSearchClient() {
  const router = useRouter()
  const params = useSearchParams()

  const destination = params.get('destination') || 'Phuket'
  const guests = params.get('guests') || '2 Guests · 1 Room'

  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [activeTypes, setActiveTypes] = useState<string[]>([])
  const [activeRatings, setActiveRatings] = useState<string[]>([])
  const [activeAmenities, setActiveAmenities] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(260)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [sortTab, setSortTab] = useState<'lowest' | 'best' | 'top'>('best')

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    )
  const toggleType = (t: string) =>
    setActiveTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )
  const toggleRating = (r: string) =>
    setActiveRatings((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r],
    )
  const toggleAmenity = (a: string) =>
    setActiveAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    )

  const hasActive =
    activeFilters.length > 0 ||
    activeTypes.length > 0 ||
    activeRatings.length > 0 ||
    activeAmenities.length > 0 ||
    maxPrice < 1000

  function clearAll() {
    setActiveFilters([])
    setActiveTypes([])
    setActiveRatings([])
    setActiveAmenities([])
    setMaxPrice(1000)
  }

  // Single dummy stay — always shown regardless of filters for now
  const results = useMemo(() => STAY_RESULTS, [])

  const lowestPrice = Math.min(...results.map((r) => r.pricePerNight))

  return (
    <div className='min-h-screen bg-background'>
      <StaySearchBar
        destination={destination}
        guests={guests}
        onSearch={(next) => {
          const q = new URLSearchParams(next)
          router.push(`/stays/search?${q.toString()}`)
        }}
      />

      <div className='page-container py-6 sm:py-8'>
        {/* ── Sort tabs ── */}
        <motion.div
          className='mb-5 flex flex-wrap gap-2'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
        >
          <SortTab
            label='Lowest Price'
            value={`$${lowestPrice} / night`}
            active={sortTab === 'lowest'}
            onClick={() => setSortTab('lowest')}
          />
          <SortTab
            label='Best Match'
            value='Recommended'
            active={sortTab === 'best'}
            onClick={() => setSortTab('best')}
          />
          <SortTab
            label='Top Rated'
            value={`${results[0]?.rating.toFixed(1)} / 10`}
            active={sortTab === 'top'}
            onClick={() => setSortTab('top')}
          />
        </motion.div>

        {/* ── Mobile filter toggle ── */}
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
          </button>
          {showMobileFilters && (
            <div className='mt-3'>
              <StayFiltersSidebar
                activeFilters={activeFilters}
                toggleFilter={toggleFilter}
                activeTypes={activeTypes}
                toggleType={toggleType}
                activeRatings={activeRatings}
                toggleRating={toggleRating}
                activeAmenities={activeAmenities}
                toggleAmenity={toggleAmenity}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                hasActive={hasActive}
                onClearAll={clearAll}
              />
            </div>
          )}
        </div>

        {/* ── Layout ── */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]'>
          {/* Desktop sidebar */}
          <motion.div
            className='hidden lg:block'
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            <StayFiltersSidebar
              activeFilters={activeFilters}
              toggleFilter={toggleFilter}
              activeTypes={activeTypes}
              toggleType={toggleType}
              activeRatings={activeRatings}
              toggleRating={toggleRating}
              activeAmenities={activeAmenities}
              toggleAmenity={toggleAmenity}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              hasActive={hasActive}
              onClearAll={clearAll}
            />
          </motion.div>

          {/* Results */}
          <div className='space-y-4'>
            <motion.p
              className='font-mono text-[11px] uppercase tracking-wider text-muted-foreground'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              <span className='font-bold text-foreground'>
                {results.length}
              </span>{' '}
              {results.length === 1 ? 'stay' : 'stays'} found in {destination}
            </motion.p>

            <div className='space-y-4'>
              {results.map((stay, i) => (
                <StayResultCard key={stay.id} stay={stay} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SortTab({
  label,
  value,
  active,
  onClick,
}: {
  label: string
  value: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-xl border px-4 py-2.5 text-left transition-colors',
        active
          ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.3),0_0_16px_hsl(var(--primary)/0.12)]'
          : 'border-border bg-card',
      )}
    >
      <p
        className={cn(
          'font-mono text-[9px] font-bold uppercase tracking-wider',
          active ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'mt-0.5 text-[13px] font-bold',
          active ? 'text-primary' : 'text-foreground',
        )}
      >
        {value}
      </p>
    </button>
  )
}
