'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Smartphone,
  Wifi,
  RefreshCw,
  X,
  ArrowRight,
  Loader2,
  ChevronDown,
  Search,
  MapPin,
  Globe2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  EsimPromoCards,
  EsimPopularDestinations,
} from '@/components/esim/landing/esim-promo-destinations'

/* ── Constants ───────────────────────────────────────────────── */
const DATA_OPTIONS = [
  'Any',
  '1 GB',
  '3 GB',
  '5 GB',
  '10 GB',
  '20 GB',
  'Unlimited',
] as const
const VALIDITY_OPTIONS = [
  'Any',
  '7 days',
  '15 days',
  '30 days',
  '90 days',
] as const

const DESTINATION_OPTIONS = [
  { label: 'Global (130+ countries)', value: 'global', type: 'global' },
  { label: 'Europe', value: 'europe', type: 'region' },
  { label: 'Nigeria', value: 'nigeria', type: 'country' },
  { label: 'Ghana', value: 'ghana', type: 'country' },
  { label: 'South Africa', value: 'south africa', type: 'country' },
  { label: 'Kenya', value: 'kenya', type: 'country' },
  { label: 'United Arab Emirates', value: 'uae', type: 'country' },
  { label: 'United Kingdom', value: 'united kingdom', type: 'country' },
  { label: 'United States', value: 'united states', type: 'country' },
  { label: 'Turkey', value: 'turkey', type: 'country' },
  { label: 'Japan', value: 'japan', type: 'country' },
  { label: 'Thailand', value: 'thailand', type: 'country' },
] as const

const CHIP_MAP: Record<string, string> = {
  nigeria: 'NG',
  ghana: 'GH',
  'south africa': 'ZA',
  kenya: 'KE',
  uae: 'AE',
  'united arab emirates': 'AE',
  'united kingdom': 'GB',
  uk: 'GB',
  'united states': 'US',
  usa: 'US',
  turkey: 'TR',
  japan: 'JP',
  thailand: 'TH',
}

const FEATURE_BAR = [
  { icon: Zap, title: 'Instant Delivery', body: 'eSIM in seconds' },
  { icon: Smartphone, title: 'Keep Your Number', body: 'Dual-SIM ready' },
  { icon: Wifi, title: '5G Speeds', body: 'Where available' },
  { icon: RefreshCw, title: 'Easy Top-Up', body: 'Add data anytime' },
] as const

/* ── ICCID Modal ─────────────────────────────────────────────── */
function IccidModal({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [iccid, setIccid] = useState('')
  const [error, setError] = useState('')
  const [going, setGoing] = useState(false)

  function handleSubmit() {
    const clean = iccid.trim().replace(/\s+/g, '')
    if (!clean || !/^\d{18,22}$/.test(clean)) {
      setError('Enter a valid ICCID (18–22 digits, numbers only).')
      return
    }
    setError('')
    setGoing(true)
    onClose()
    router.push(`/esim/topup?iccid=${clean}`)
  }

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' />
      <motion.div
        className='relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl'
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-start justify-between border-b border-border px-6 py-5'>
          <div>
            <div className='flex items-center gap-2'>
              <RefreshCw className='size-4 text-primary' />
              <p className='font-heading font-black uppercase tracking-wide'>
                Top Up eSIM
              </p>
            </div>
            <p className='mt-1 text-[12px] text-muted-foreground'>
              Enter your eSIM ICCID to add more data
            </p>
          </div>
          <button
            onClick={onClose}
            className='grid size-7 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground'
          >
            <X className='size-3.5' />
          </button>
        </div>
        <div className='space-y-4 px-6 py-5'>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-foreground'>
              ICCID <span className='text-primary'>*</span>
            </label>
            <input
              type='text'
              inputMode='numeric'
              value={iccid}
              onChange={(e) => {
                setIccid(e.target.value)
                if (error) setError('')
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder='e.g. 8900000553208290755'
              autoFocus
              className={cn(
                'w-full rounded-xl border bg-background px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground',
                error
                  ? 'border-destructive focus:border-destructive'
                  : 'border-border focus:border-primary',
              )}
            />
            {error && <p className='text-[11px] text-destructive'>{error}</p>}
          </div>
          <div className='rounded-xl border border-border bg-muted/40 px-4 py-3'>
            <p className='font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
              Where to find your ICCID
            </p>
            <p className='mt-1 text-[12px] leading-relaxed text-muted-foreground'>
              It's in the eSIM confirmation email, or in Settings → General →
              About → ICCID on your phone.
            </p>
          </div>
          <motion.button
            onClick={handleSubmit}
            disabled={going || !iccid.trim()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-mono text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] disabled:opacity-50'
          >
            {going ? (
              <>
                <Loader2 className='size-4 animate-spin' /> Loading…
              </>
            ) : (
              <>
                View Top-Up Plans <ArrowRight className='size-4' />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Dropdown component — self-contained, handles outside click ── */
function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={ref} className='relative'>
      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        className='flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30'
      >
        <div className='flex flex-col items-start'>
          <span className='font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary'>
            {label}
          </span>
          <span className='mt-0.5 text-sm font-semibold'>{value}</span>
        </div>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            /* z-[100] so it renders above everything including the search card */
            className='absolute left-0 top-full z-[100] mt-2 w-full min-w-[160px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl'
          >
            <div className='max-h-60 overflow-y-auto py-1'>
              {options.map((o) => (
                <button
                  key={o}
                  type='button'
                  onClick={() => {
                    onChange(o)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted',
                    value === o
                      ? 'bg-primary/5 font-bold text-primary'
                      : 'font-normal text-foreground',
                  )}
                >
                  {value === o && (
                    <span className='mr-2 size-1.5 rounded-full bg-primary' />
                  )}
                  {o}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Destination combobox ────────────────────────────────────── */
function DestinationInput({
  value,
  onChange,
  onSelect,
}: {
  value: string
  onChange: (v: string) => void
  onSelect: (label: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = value.trim()
    ? DESTINATION_OPTIONS.filter((o) =>
        o.label.toLowerCase().includes(value.toLowerCase()),
      )
    : DESTINATION_OPTIONS

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={ref} className='relative'>
      <div className='flex flex-col rounded-xl border border-border bg-card px-4 py-3 transition-colors focus-within:border-primary/60'>
        <span className='font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary'>
          Destination
        </span>
        <input
          type='text'
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false)
          }}
          placeholder='Where are you going?'
          className='mt-0.5 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground'
        />
      </div>

      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className='absolute left-0 top-full z-[100] mt-2 w-full min-w-[240px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl'
          >
            <div className='max-h-72 overflow-y-auto py-1'>
              {filtered.map((o) => (
                <button
                  key={o.value}
                  type='button'
                  onClick={() => {
                    onSelect(o.label)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted',
                    value.toLowerCase() === o.label.toLowerCase()
                      ? 'bg-primary/5 font-bold text-primary'
                      : 'text-foreground',
                  )}
                >
                  {o.type === 'global' || o.type === 'region' ? (
                    <Globe2 className='size-3.5 shrink-0 text-primary' />
                  ) : (
                    <MapPin className='size-3.5 shrink-0 text-muted-foreground' />
                  )}
                  {o.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Hero search bar ─────────────────────────────────────────── */
function EsimHeroSearch() {
  const router = useRouter()
  const [destination, setDestination] = useState('')
  const [data, setData] = useState('Any')
  const [validity, setValidity] = useState('Any')

  function buildQuery(dest: string) {
    const q = new URLSearchParams()
    const d = dest.toLowerCase().trim()
    if (
      !d ||
      ['global', 'worldwide', 'international'].some((k) => d.includes(k))
    ) {
      q.set('tab', 'global')
    } else if (['europe', 'eu'].some((k) => d.includes(k))) {
      q.set('tab', 'global')
      q.set('regions', 'Europe')
    } else {
      q.set('tab', 'local')
      const matched = Object.entries(CHIP_MAP).find(([k]) => d.includes(k))
      if (matched) q.set('country', matched[1])
    }
    if (data !== 'Any') q.set('data', data)
    if (validity !== 'Any') q.set('validity', validity)
    return q
  }

  function handleSearch() {
    router.push(`/esim/plans?${buildQuery(destination).toString()}`)
  }

  function handleSelectDestination(label: string) {
    setDestination(label)
    router.push(`/esim/plans?${buildQuery(label).toString()}`)
  }

  return (
    <div className='mx-auto mt-8 w-full max-w-3xl'>
      <div className='rounded-2xl border border-border bg-card p-3'>
        {/* Mobile: stack vertically. Desktop (sm+): single row */}
        <div className='flex flex-col gap-2 sm:flex-row sm:items-stretch'>
          {/* Destination — grows to fill remaining space */}
          <div className='sm:flex-1'>
            <DestinationInput
              value={destination}
              onChange={setDestination}
              onSelect={handleSelectDestination}
            />
          </div>

          {/* Data dropdown */}
          <div className='sm:w-32'>
            <Dropdown
              label='Data'
              value={data}
              options={DATA_OPTIONS}
              onChange={setData}
            />
          </div>

          {/* Validity dropdown */}
          <div className='sm:w-36'>
            <Dropdown
              label='Validity'
              value={validity}
              options={VALIDITY_OPTIONS}
              onChange={setValidity}
            />
          </div>

          {/* Search button */}
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className='flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-mono text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] sm:shrink-0'
          >
            <Search className='size-4' />
            <span>Search</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

/* ── Main landing page ───────────────────────────────────────── */
export function EsimLandingClient() {
  const [showIccidModal, setShowIccidModal] = useState(false)

  return (
    <div className='min-h-screen bg-background'>
      <AnimatePresence>
        {showIccidModal && (
          <IccidModal onClose={() => setShowIccidModal(false)} />
        )}
      </AnimatePresence>

      {/* Hero section */}
      <section className='relative overflow-hidden bg-background'>
        {/* Grid texture */}
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.07]'
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='h-[500px] w-[700px] rounded-full bg-primary/5 blur-[120px]' />
        </div>

        <div className='relative page-container py-20 sm:py-28 lg:py-36'>
          <motion.div
            className='mb-6 flex items-center justify-center gap-3'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='h-px w-8 bg-primary' />
            <span className='font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary'>
              Golafly · eSIM
            </span>
            <div className='h-px w-8 bg-primary' />
          </motion.div>

          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <h1 className='font-heading text-5xl font-black leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl'>
              STAY CONNECTED
            </h1>
            <h1 className='font-heading text-5xl font-black leading-none tracking-tight text-primary drop-shadow-[0_0_40px_hsl(var(--primary)/0.5)] sm:text-6xl lg:text-7xl xl:text-8xl'>
              ANYWHERE
            </h1>
          </motion.div>

          <motion.p
            className='mt-5 text-center text-sm text-muted-foreground sm:text-base'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            Instant eSIM data in 130+ countries · Keep your number · No roaming
            fees
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <EsimHeroSearch />
          </motion.div>

          {/* Top-up nudge */}
          <motion.div
            className='mx-auto mt-5 flex max-w-3xl items-center justify-center gap-3'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.42 }}
          >
            <span className='text-sm text-muted-foreground'>
              Already have an eSIM?
            </span>
            <button
              onClick={() => setShowIccidModal(true)}
              className='flex items-center gap-1.5 rounded-full border border-primary/50 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/10'
            >
              <RefreshCw className='size-3.5' />
              Top up data
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feature bar */}
      <section className='border-y border-border bg-card'>
        <div className='page-container'>
          <div className='grid grid-cols-2 lg:grid-cols-4'>
            {FEATURE_BAR.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className={cn(
                  'group flex cursor-default items-center gap-3 px-5 py-5 transition-colors duration-200 hover:bg-primary/10',
                  i % 2 === 0 && 'border-r border-border',
                  i < 2 && 'border-b border-border lg:border-b-0',
                  i < 3 && 'lg:border-r lg:border-border',
                )}
              >
                <div className='grid size-9 shrink-0 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary transition-colors group-hover:border-primary/60 group-hover:bg-primary/20'>
                  <Icon className='size-4' />
                </div>
                <div>
                  <p className='text-[13px] font-bold leading-tight text-primary'>
                    {title}
                  </p>
                  <p className='text-[11px] text-muted-foreground'>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EsimPromoCards />
      <EsimPopularDestinations />
    </div>
  )
}
