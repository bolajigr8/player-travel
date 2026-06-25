'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STAY_FILTERS } from '@/store/stays'

interface Props {
  activeFilters: string[]
  toggleFilter: (f: string) => void
  activeTypes: string[]
  toggleType: (t: string) => void
  activeRatings: string[]
  toggleRating: (r: string) => void
  activeAmenities: string[]
  toggleAmenity: (a: string) => void
  maxPrice: number
  setMaxPrice: (n: number) => void
  hasActive: boolean
  onClearAll: () => void
}

export function StayFiltersSidebar({
  activeFilters,
  toggleFilter,
  activeTypes,
  toggleType,
  activeRatings,
  toggleRating,
  activeAmenities,
  toggleAmenity,
  maxPrice,
  setMaxPrice,
  hasActive,
  onClearAll,
}: Props) {
  const [priceOpen, setPriceOpen] = useState(true)
  const [starOpen, setStarOpen] = useState(true)
  const [ratingOpen, setRatingOpen] = useState(true)
  const [amenitiesOpen, setAmenitiesOpen] = useState(true)
  const [typeOpen, setTypeOpen] = useState(false)

  return (
    <aside className='space-y-2 text-xs'>
      {/* ── PRICE / NIGHT ── */}
      <FilterCard>
        <SectionHeader
          title='Price / Night'
          open={priceOpen}
          onToggle={() => setPriceOpen((o) => !o)}
        />
        {priceOpen && (
          <div className='mt-3 space-y-2'>
            <div className='flex items-center justify-between font-mono text-[11px]'>
              <span className='text-muted-foreground'>$50</span>
              <span className='font-bold text-primary'>${maxPrice}</span>
            </div>
            <input
              type='range'
              min={50}
              max={1000}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className='w-full accent-primary'
            />
          </div>
        )}
      </FilterCard>

      {/* ── STAR RATING ── */}
      <FilterCard>
        <SectionHeader
          title='Star Rating'
          open={starOpen}
          onToggle={() => setStarOpen((o) => !o)}
        />
        {starOpen && (
          <div className='mt-3 flex flex-wrap gap-2'>
            {[5, 4, 3].map((s) => (
              <button
                key={s}
                onClick={() => toggleType(`${s}-star`)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors',
                  activeTypes.includes(`${s}-star`)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30',
                )}
              >
                {s} ★
              </button>
            ))}
          </div>
        )}
      </FilterCard>

      {/* ── GUEST RATING ── */}
      <FilterCard>
        <SectionHeader
          title='Guest Rating'
          open={ratingOpen}
          onToggle={() => setRatingOpen((o) => !o)}
        />
        {ratingOpen && (
          <div className='mt-3 flex flex-wrap gap-2'>
            {STAY_FILTERS.guestRatings.map((r) => (
              <button
                key={r.label}
                onClick={() => toggleRating(r.label)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors',
                  activeRatings.includes(r.label)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30',
                )}
              >
                {r.label} <span className='opacity-60'>{r.value}+</span>
              </button>
            ))}
          </div>
        )}
      </FilterCard>

      {/* ── AMENITIES ── */}
      <FilterCard>
        <SectionHeader
          title='Amenities'
          open={amenitiesOpen}
          onToggle={() => setAmenitiesOpen((o) => !o)}
        />
        {amenitiesOpen && (
          <div className='mt-3 space-y-2.5'>
            {STAY_FILTERS.amenitiesList.map((a) => (
              <CheckRow
                key={a}
                label={a}
                checked={activeAmenities.includes(a)}
                onChange={() => toggleAmenity(a)}
              />
            ))}
          </div>
        )}
      </FilterCard>

      {/* ── PROPERTY TYPE ── */}
      <FilterCard>
        <SectionHeader
          title='Property Type'
          open={typeOpen}
          onToggle={() => setTypeOpen((o) => !o)}
        />
        {typeOpen && (
          <div className='mt-3 space-y-1.5'>
            {STAY_FILTERS.propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={cn(
                  'w-full rounded-lg border px-3 py-2 text-left text-[13px] transition-colors',
                  activeTypes.includes(type)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-muted/30 text-foreground hover:border-primary/30',
                )}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </FilterCard>

      {/* ── MAP ── */}
      <div className='relative h-32 overflow-hidden rounded-xl border border-border bg-muted'>
        <Image
          src='/stays/map.jpeg'
          alt='Map'
          fill
          sizes='(max-width: 640px) 100vw, 280px' // sidebar is ~280px wide on desktop
          className='object-cover opacity-70'
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] font-bold text-white backdrop-blur-sm'>
            <MapPin className='size-3' />
            View on map
          </span>
        </div>
      </div>

      {/* ── Reset ── */}
      {hasActive && (
        <button
          onClick={onClearAll}
          className='px-1 text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors'
        >
          Reset all filters
        </button>
      )}
    </aside>
  )
}

/* ─── Sub-components ─────────────────────────────────────────── */

function FilterCard({ children }: { children: React.ReactNode }) {
  return (
    <div className='rounded-xl border border-border bg-card px-4 py-3'>
      {children}
    </div>
  )
}

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className='flex w-full items-center justify-between'
    >
      <span className='font-mono text-[10px] font-bold uppercase tracking-wider text-foreground'>
        {title}
      </span>
      {open ? (
        <ChevronUp className='size-3.5 text-muted-foreground' />
      ) : (
        <ChevronDown className='size-3.5 text-muted-foreground' />
      )}
    </button>
  )
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className='flex cursor-pointer items-center gap-2.5 select-none'>
      <div
        onClick={() => onChange(!checked)}
        className={cn(
          'flex size-4 shrink-0 items-center justify-center rounded-sm border transition-colors cursor-pointer',
          checked
            ? 'border-primary bg-primary'
            : 'border-muted-foreground/40 bg-transparent hover:border-primary/50',
        )}
      >
        {checked && (
          <svg viewBox='0 0 10 8' fill='none' className='size-2.5'>
            <path
              d='M1 4l2.5 2.5L9 1'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-primary-foreground'
            />
          </svg>
        )}
      </div>
      <span
        className={cn(
          'text-[12px] leading-none',
          checked ? 'font-medium text-foreground' : 'text-muted-foreground',
        )}
      >
        {label}
      </span>
    </label>
  )
}
