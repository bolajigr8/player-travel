'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Euro } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FilterSidebarProps {
  dataBuckets: string[]
  validityBuckets: string[]
  unlimitedOnly: boolean
  minPrice: number
  maxPrice: number
  operators: string[]
  regions: string[]
  priceFloor: number
  priceCeiling: number
  isGlobal: boolean
  availableOperators: string[]
  availableRegions: string[]
  onDataBucket: (label: string) => void
  onValidityBucket: (label: string) => void
  onUnlimited: (v: boolean) => void
  onMinPrice: (v: number) => void
  onMaxPrice: (v: number) => void
  onOperator: (op: string) => void
  onRegion: (r: string) => void
  onClearAll: () => void
  hasActive: boolean
}

const DATA_OPTIONS = ['1 GB', '3–5 GB', '10–20 GB', 'Unlimited'] as const
const VALIDITY_OPTIONS = ['1–7 days', '8–15 days', '16–30 days'] as const

const DATA_LABEL_MAP: Record<string, string[]> = {
  '1 GB': ['≤ 1 GB'],
  '3–5 GB': ['2–3 GB', '5–10 GB'],
  '10–20 GB': ['20–50 GB'],
  Unlimited: ['Unlimited'],
}
const VALIDITY_LABEL_MAP: Record<string, string[]> = {
  '1–7 days': ['1–7 days'],
  '8–15 days': ['8–15 days'],
  '16–30 days': ['16–30 days'],
}

/* ── Price preset buttons ─────────────────────────────────────── */
const PRICE_PRESETS = [
  { label: 'Under €10', max: 10 },
  { label: 'Under €25', max: 25 },
  { label: 'Under €50', max: 50 },
  { label: 'Any price', max: 9999 },
] as const

export function FilterSidebar(p: FilterSidebarProps) {
  const [planTypeOpen, setPlanTypeOpen] = useState(true)
  const [dataOpen, setDataOpen] = useState(true)
  const [validityOpen, setValidityOpen] = useState(true)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [networkOpen, setNetworkOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)
  const [showAllNetworks, setShowAllNetworks] = useState(false)

  /* Local slider state so it doesn't fire setParam on every px move */
  const [localMax, setLocalMax] = useState(
    p.maxPrice >= 9999 ? p.priceCeiling : p.maxPrice,
  )

  function isDataActive(opt: string) {
    const mapped = DATA_LABEL_MAP[opt] ?? [opt]
    return mapped.some((l) => p.dataBuckets.includes(l))
  }
  function toggleData(opt: string) {
    const mapped = DATA_LABEL_MAP[opt] ?? [opt]
    const anyActive = mapped.some((l) => p.dataBuckets.includes(l))
    mapped.forEach((l) => {
      const currentlyActive = p.dataBuckets.includes(l)
      if (anyActive && currentlyActive) p.onDataBucket(l)
      if (!anyActive && !currentlyActive) p.onDataBucket(l)
    })
  }
  function isValidityActive(opt: string) {
    const mapped = VALIDITY_LABEL_MAP[opt] ?? [opt]
    return mapped.some((l) => p.validityBuckets.includes(l))
  }
  function toggleValidity(opt: string) {
    const mapped = VALIDITY_LABEL_MAP[opt] ?? [opt]
    const anyActive = mapped.some((l) => p.validityBuckets.includes(l))
    mapped.forEach((l) => {
      const currentlyActive = p.validityBuckets.includes(l)
      if (anyActive && currentlyActive) p.onValidityBucket(l)
      if (!anyActive && !currentlyActive) p.onValidityBucket(l)
    })
  }

  const effectiveCeiling = p.priceCeiling > 0 ? p.priceCeiling : 200
  const activePreset = PRICE_PRESETS.find((pr) =>
    pr.max === 9999 ? p.maxPrice >= 9999 : p.maxPrice === pr.max,
  )

  return (
    <div className='space-y-2 text-xs'>
      {/* ── PLAN TYPE ── */}
      <FilterCard>
        <SectionHeader
          title='Plan Type'
          open={planTypeOpen}
          onToggle={() => setPlanTypeOpen((o) => !o)}
        />
        {planTypeOpen && (
          <div className='mt-3 flex flex-wrap gap-2'>
            {(['Local', 'Regional', 'Global'] as const).map((t) => {
              const active =
                (t === 'Global' && p.isGlobal) || (t === 'Local' && !p.isGlobal)
              return (
                <span
                  key={t}
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-[11px] font-medium',
                    active
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground',
                  )}
                >
                  {t}
                </span>
              )
            })}
          </div>
        )}
      </FilterCard>

      {/* ── DATA AMOUNT ── */}
      <FilterCard>
        <SectionHeader
          title='Data Amount'
          open={dataOpen}
          onToggle={() => setDataOpen((o) => !o)}
        />
        {dataOpen && (
          <div className='mt-3 space-y-2.5'>
            {DATA_OPTIONS.map((opt) => (
              <CheckRow
                key={opt}
                label={opt}
                checked={isDataActive(opt)}
                onChange={() => toggleData(opt)}
              />
            ))}
          </div>
        )}
      </FilterCard>

      {/* ── VALIDITY ── */}
      <FilterCard>
        <SectionHeader
          title='Validity'
          open={validityOpen}
          onToggle={() => setValidityOpen((o) => !o)}
        />
        {validityOpen && (
          <div className='mt-3 space-y-2.5'>
            {VALIDITY_OPTIONS.map((opt) => (
              <CheckRow
                key={opt}
                label={opt}
                checked={isValidityActive(opt)}
                onChange={() => toggleValidity(opt)}
              />
            ))}
          </div>
        )}
      </FilterCard>

      {/* ── FEATURES ── */}
      {/* <FilterCard>
        <SectionHeader
          title='Features'
          open={featuresOpen}
          onToggle={() => setFeaturesOpen((o) => !o)}
        />
        {featuresOpen && (
          <div className='mt-3 space-y-2.5'>
            <CheckRow label='5G' checked={false} onChange={() => {}} />
            <CheckRow label='Hotspot' checked={false} onChange={() => {}} />
            <CheckRow
              label='Instant delivery'
              checked={false}
              onChange={() => {}}
            />
            <CheckRow
              label='Unlimited data only'
              checked={p.unlimitedOnly}
              onChange={(v) => p.onUnlimited(v)}
            />
          </div>
        )}
      </FilterCard> */}

      {/* ── NETWORK ── */}
      {p.availableOperators.length > 0 && (
        <FilterCard>
          <SectionHeader
            title='Network'
            open={networkOpen}
            onToggle={() => setNetworkOpen((o) => !o)}
          />
          {networkOpen && (
            <div className='mt-3 space-y-2.5'>
              <p className='font-mono text-[9px] text-muted-foreground uppercase tracking-wider'>
                Only one network can be selected at a time
              </p>
              {(showAllNetworks
                ? p.availableOperators
                : p.availableOperators.slice(0, 5)
              ).map((op) => {
                const isChecked = p.operators.includes(op)
                const isDisabled = p.operators.length > 0 && !isChecked

                return (
                  <div
                    key={op}
                    className={cn(
                      'flex cursor-pointer select-none items-center gap-2.5',
                      isDisabled && 'opacity-40 cursor-not-allowed',
                    )}
                    onClick={() => {
                      if (!isDisabled) p.onOperator(op)
                    }}
                  >
                    <div
                      className={cn(
                        'flex size-4 shrink-0 items-center justify-center rounded-sm border transition-colors',
                        isChecked
                          ? 'border-primary bg-primary'
                          : isDisabled
                            ? 'border-muted-foreground/20 bg-transparent'
                            : 'border-muted-foreground/40 bg-transparent hover:border-primary/50',
                      )}
                    >
                      {isChecked && (
                        <svg
                          viewBox='0 0 10 8'
                          fill='none'
                          className='size-2.5'
                        >
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
                        isChecked
                          ? 'font-medium text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {op}
                    </span>
                  </div>
                )
              })}

              {p.availableOperators.length > 5 && (
                <button
                  onClick={() => setShowAllNetworks((o) => !o)}
                  className='mt-1 font-mono text-[10px] text-primary underline underline-offset-2 hover:text-primary/70 transition-colors'
                >
                  {showAllNetworks
                    ? 'Show less'
                    : `See ${p.availableOperators.length - 5} more`}
                </button>
              )}
            </div>
          )}
        </FilterCard>
      )}

      {/* ── MAX PRICE — redesigned ── */}
      <FilterCard>
        <SectionHeader
          title='Max Price'
          open={priceOpen}
          onToggle={() => setPriceOpen((o) => !o)}
        />
        {priceOpen && (
          <div className='mt-3 space-y-4'>
            {/* Quick preset pills */}
            <div className='flex flex-wrap gap-1.5'>
              {PRICE_PRESETS.map((pr) => {
                const isActive = activePreset?.max === pr.max
                return (
                  <button
                    key={pr.label}
                    onClick={() => {
                      const val = pr.max >= 9999 ? 9999 : pr.max
                      setLocalMax(pr.max >= 9999 ? effectiveCeiling : pr.max)
                      p.onMaxPrice(val)
                    }}
                    className={cn(
                      'rounded-full border px-3 py-1 text-[11px] font-medium transition-colors',
                      isActive
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
                    )}
                  >
                    {pr.label}
                  </button>
                )
              })}
            </div>

            {/* Current value display */}
            <div className='flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2'>
              <span className='font-mono text-[11px] text-muted-foreground'>
                Max
              </span>
              <span className='flex items-center gap-0.5 font-mono text-[13px] font-bold text-primary'>
                <Euro className='size-3' />
                {localMax >= effectiveCeiling ? 'Any' : localMax.toFixed(0)}
              </span>
            </div>

            {/* Slider */}
            <div className='space-y-1.5'>
              <input
                type='range'
                min={p.priceFloor > 0 ? p.priceFloor : 0}
                max={effectiveCeiling}
                step={1}
                value={
                  localMax >= effectiveCeiling ? effectiveCeiling : localMax
                }
                onChange={(e) => setLocalMax(Number(e.target.value))}
                onMouseUp={(e) => {
                  const val = Number((e.target as HTMLInputElement).value)
                  p.onMaxPrice(val >= effectiveCeiling ? 9999 : val)
                }}
                onTouchEnd={(e) => {
                  const val = Number((e.target as HTMLInputElement).value)
                  p.onMaxPrice(val >= effectiveCeiling ? 9999 : val)
                }}
                className='w-full accent-primary'
              />
              <div className='flex justify-between font-mono text-[10px] text-muted-foreground'>
                <span>€{p.priceFloor > 0 ? p.priceFloor.toFixed(0) : '0'}</span>
                <span>€{effectiveCeiling.toFixed(0)}+</span>
              </div>
            </div>
          </div>
        )}
      </FilterCard>

      {/* ── Reset ── */}
      {p.hasActive && (
        <button
          onClick={p.onClearAll}
          className='px-1 text-[11px] text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground'
        >
          Reset all filters
        </button>
      )}
    </div>
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
    <label className='flex cursor-pointer select-none items-center gap-2.5'>
      <div
        onClick={() => onChange(!checked)}
        className={cn(
          'flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border transition-colors',
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
