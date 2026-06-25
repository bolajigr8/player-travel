'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane,
  Bed,
  Wifi,
  Search,
  ArrowRight,
  ArrowLeftRight,
  Car,
  MapPin,
  Tag,
  Zap,
  Headphones,
  ChevronDown,
  Globe2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AirportInput } from '@/components/flights/airport-input'
import {
  flightSearchSchema,
  type FlightSearchValues,
} from '@/features/flights/schema'

/* ─── Constants ──────────────────────────────────────────────── */

const SEARCH_TABS = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'stays', label: 'Stays', icon: Bed },
  { id: 'esim', label: 'eSIM', icon: Wifi },
] as const

const TRUST_BADGES = [
  {
    icon: Tag,
    title: 'Best Price Guarantee',
    body: "We'll match or beat any price",
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    body: 'Secure your trip in seconds',
  },
  {
    icon: Wifi,
    title: 'Instant eSIM Delivery',
    body: 'Stay connected, anywhere',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    body: "We're here whenever you need us",
  },
] as const

const PACKAGES = [
  {
    id: 'p1',
    city: 'Barcelona Getaway',
    price: 450,
    image: '/figma/2a7a76966bc097de36eaf62926eb81a2bbd8c8ab.png',
  },
  {
    id: 'p2',
    city: 'Dubai Experience',
    price: 620,
    image: '/figma/2b2cf42d143460347a49f8bd452c7581be53a270.png',
  },
  {
    id: 'p3',
    city: 'Istanbul Escapes',
    price: 380,
    image: '/figma/052520396ba9e3230e862090ca3497fcc08e1b6d.png',
  },
  {
    id: 'p4',
    city: 'New York Weekender',
    price: 520,
    image: '/figma/c75053ffa78035684ff89eb287af9944c565d266.png',
  },
] as const

const ESIM_PLANS = [
  {
    id: 'e1',
    country: 'Europe',
    flag: '🇪🇺',
    days: '30 days',
    price: 12.99,
    image: '/figma/3e2287830da4785678f12d82805c975de932ee00.png',
  },
  {
    id: 'e2',
    country: 'United States',
    flag: '🇺🇸',
    days: '15 days',
    price: 11.99,
    image: '/figma/24c56f1c7a3c2f306fb231fea6ceffa981140d11.png',
  },
  {
    id: 'e3',
    country: 'Thailand',
    flag: '🇹🇭',
    days: '10 days',
    price: 6.99,
    image: '/figma/b32ef627a5f44ada73462061c22eb216470a95d9.png',
  },
  {
    id: 'e4',
    country: 'Japan',
    flag: '🇯🇵',
    days: '20 days',
    price: 9.99,
    image: '/figma/7d339df8f415673a11b4d88dc76a9959c419ca5f.png',
  },
] as const

const FLIGHT_DEALS = [
  { from: 'London', to: 'Dubai', price: 412, save: 35 },
  { from: 'Paris', to: 'New York', price: 489, save: 42 },
  { from: 'Madrid', to: 'Athens', price: 168, save: 18 },
] as const

const TOP_STAYS = [
  { name: 'The Marina Resort', city: 'Dubai', price: 215 },
  { name: 'Hoxton Amsterdam', city: 'Amsterdam', price: 185 },
] as const

const MOBILITY = [
  {
    icon: Plane,
    title: 'Airport Transfers',
    body: 'Hassle-free pickup, anytime, anywhere',
  },
  {
    icon: Car,
    title: 'Car Rentals',
    body: 'Hundreds of vehicles in 90+ countries',
  },
  {
    icon: MapPin,
    title: 'City Rides',
    body: 'Reliable rides across major cities',
  },
] as const

const PLAN_STEPS = [
  { n: 1, label: 'Search' },
  { n: 2, label: 'Compare' },
  { n: 3, label: 'Book' },
  { n: 4, label: 'Travel' },
] as const

/* ── eSIM destination options — mirrors landing-page.tsx ─────── */
const ESIM_DESTINATIONS = [
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

/* Maps destination value → country code used by /esim/plans */
const ESIM_CHIP_MAP: Record<string, string> = {
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

/* Data options — must match what /esim/plans filter understands */
const ESIM_DATA_OPTIONS = [
  'Any',
  '1 GB',
  '3 GB',
  '5 GB',
  '10 GB',
  '20 GB',
  'Unlimited',
] as const

/* Validity options — must match validity bucket labels */
const ESIM_VALIDITY_OPTIONS = [
  'Any',
  '7 days',
  '15 days',
  '30 days',
  '90 days',
] as const

/* ─── Shared micro-components ────────────────────────────────── */

/** Small styled select wrapper used inside the home search panel */
function PanelDropdown({
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
    <div ref={ref} className='relative h-full'>
      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        className='flex h-full w-full flex-col justify-center px-0 text-left focus:outline-none'
      >
        <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
          {label}
        </p>
        <span className='flex items-center gap-1 text-sm font-medium text-foreground'>
          {value}
          <ChevronDown
            className={cn(
              'size-3.5 shrink-0 text-muted-foreground transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            /* z-[200] — must clear the panel card and hero overlay */
            className='absolute left-0 top-full z-[200] mt-2 min-w-[160px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl'
          >
            <div className='max-h-56 overflow-y-auto py-1'>
              {options.map((o) => (
                <button
                  key={o}
                  type='button'
                  onClick={() => {
                    onChange(o)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted',
                    value === o
                      ? 'bg-primary/5 font-bold text-primary'
                      : 'font-normal text-foreground',
                  )}
                >
                  {value === o && (
                    <span className='size-1.5 shrink-0 rounded-full bg-primary' />
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

/** Destination combobox with autocomplete list */
function EsimDestinationInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = value.trim()
    ? ESIM_DESTINATIONS.filter((o) =>
        o.label.toLowerCase().includes(value.toLowerCase()),
      )
    : ESIM_DESTINATIONS

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={ref} className='relative min-w-0 flex-1'>
      <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
        Country
      </p>
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
        className='w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground'
      />

      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className='absolute left-0 top-full z-[200] mt-2 w-full min-w-[220px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl'
          >
            <div className='max-h-64 overflow-y-auto py-1'>
              {filtered.map((o) => (
                <button
                  key={o.value}
                  type='button'
                  onClick={() => {
                    onChange(o.label)
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

/* ─── eSIM search panel ──────────────────────────────────────── */
function EsimSearchPanel() {
  const router = useRouter()
  const [destination, setDestination] = useState('')
  const [data, setData] = useState<(typeof ESIM_DATA_OPTIONS)[number]>('Any')
  const [validity, setValidity] =
    useState<(typeof ESIM_VALIDITY_OPTIONS)[number]>('Any')

  function handleSearch() {
    const q = new URLSearchParams()
    const dest = destination.toLowerCase().trim()

    /* Determine tab + country from destination text */
    if (
      !dest ||
      ['global', 'worldwide', 'international'].some((k) => dest.includes(k))
    ) {
      q.set('tab', 'global')
    } else if (['europe', 'eu'].some((k) => dest.includes(k))) {
      q.set('tab', 'global')
      q.set('regions', 'Europe')
    } else {
      q.set('tab', 'local')
      const matched = Object.entries(ESIM_CHIP_MAP).find(([k]) =>
        dest.includes(k),
      )
      if (matched) q.set('country', matched[1])
    }

    /* Data filter — maps display label → what /esim/plans bucket system understands.
       The plans page reads `data` from URL and passes it to the filter sidebar
       which maps it to a DATA_BUCKET label. We pass the raw display value here
       and the plans page will match it via the DATA_OPTIONS in the filter sidebar. */
    if (data !== 'Any') q.set('data', data)

    /* Validity filter — maps display label to a validity bucket.
       "7 days" → "1–7 days", "15 days" → "8–15 days", "30 days" → "16–30 days", "90 days" → "31–90 days" */
    if (validity !== 'Any') {
      const validityMap: Record<string, string> = {
        '7 days': '1–7 days',
        '15 days': '8–15 days',
        '30 days': '16–30 days',
        '90 days': '31–90 days',
      }
      const mapped = validityMap[validity]
      if (mapped) q.set('validity', mapped)
    }

    q.set('page', '1')
    router.push(`/esim/plans?${q.toString()}`)
  }

  return (
    <>
      {/*
        Layout:
        - Mobile: stacked vertically
        - sm+: 4-col grid — [destination 2col | data | validity]
        Dropdowns use z-[200] to clear the panel card's stacking context.
        The parent card must NOT have overflow-hidden.
      */}
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-4'>
        {/* Destination — spans 2 cols on sm+ */}
        <div className='col-span-1 rounded-xl border border-border bg-background/60 px-4 py-2.5 sm:col-span-2'>
          <EsimDestinationInput value={destination} onChange={setDestination} />
        </div>

        {/* Data */}
        <div className='rounded-xl border border-border bg-background/60 px-4 py-2.5'>
          <PanelDropdown
            label='Data'
            value={data}
            options={ESIM_DATA_OPTIONS}
            onChange={(v) => setData(v as typeof data)}
          />
        </div>

        {/* Validity */}
        <div className='rounded-xl border border-border bg-background/60 px-4 py-2.5'>
          <PanelDropdown
            label='Validity'
            value={validity}
            options={ESIM_VALIDITY_OPTIONS}
            onChange={(v) => setValidity(v as typeof validity)}
          />
        </div>
      </div>

      <button
        type='button'
        onClick={handleSearch}
        className='mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)] transition-all hover:shadow-[0_0_28px_rgba(183,255,0,0.6)]'
      >
        <Search className='size-4' />
        Search eSIM Plans
      </button>
    </>
  )
}

/* ─── Stays search panel ─────────────────────────────────────── */
function StaysSearchPanel() {
  const router = useRouter()
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  function handleSearch() {
    const q = new URLSearchParams()
    if (destination) q.set('destination', destination)
    if (checkIn) q.set('check_in', checkIn)
    if (checkOut) q.set('check_out', checkOut)
    router.push(`/stays?${q.toString()}`)
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-4'>
        <div className='col-span-1 rounded-xl border border-border bg-background/60 px-4 py-2.5 sm:col-span-2'>
          <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
            Destination
          </p>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder='City or hotel'
            className='w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground'
          />
        </div>
        <div className='rounded-xl border border-border bg-background/60 px-4 py-2.5'>
          <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
            Check-in
          </p>
          <input
            type='date'
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className='w-full bg-transparent text-sm font-medium text-foreground outline-none [color-scheme:light] dark:[color-scheme:dark]'
          />
        </div>
        <div className='rounded-xl border border-border bg-background/60 px-4 py-2.5'>
          <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
            Check-out
          </p>
          <input
            type='date'
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className='w-full bg-transparent text-sm font-medium text-foreground outline-none [color-scheme:light] dark:[color-scheme:dark]'
          />
        </div>
      </div>
      <button
        type='button'
        onClick={handleSearch}
        className='mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)] transition-all hover:shadow-[0_0_28px_rgba(183,255,0,0.6)]'
      >
        <Search className='size-4' />
        Search Stays
      </button>
    </>
  )
}

/* ─── Main page ──────────────────────────────────────────────── */
export default function TravelsHome() {
  const router = useRouter()
  const [tab, setTab] = useState<(typeof SEARCH_TABS)[number]['id']>('flights')

  const { control, handleSubmit, getValues, setValue } =
    useForm<FlightSearchValues>({
      resolver: zodResolver(flightSearchSchema),
      defaultValues: {
        origin: 'LHR',
        destination: 'DXB',
        departure_date: '',
        return_date: '',
        adults: 1,
        cabin_class: 'economy',
      },
    })

  function swapAirports() {
    const { origin, destination } = getValues()
    setValue('origin', destination, { shouldValidate: true })
    setValue('destination', origin, { shouldValidate: true })
  }

  function onSearch(values: FlightSearchValues) {
    const params = new URLSearchParams({
      origin: values.origin,
      destination: values.destination,
      departure_date: values.departure_date,
      adults: String(values.adults),
      cabin_class: values.cabin_class,
    })
    if (values.return_date) params.set('return_date', values.return_date)
    router.push(`/flights?${params.toString()}`)
  }

  return (
    <div className='relative min-h-screen bg-background'>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className='relative'>
        <div className='relative h-[520px] w-full overflow-hidden sm:h-[620px]'>
          <img
            src='/figma/aeb8925614c64123a69a4f9f6e8e185e9c8a104c.png'
            alt='Airplane wing above clouds at sunset'
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15' />
          <div className='page-container relative z-10 flex h-full flex-col justify-center'>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='max-w-xl space-y-4'
            >
              <p className='font-mono text-[11px] tracking-[2.86px] text-primary'>
                <span className='mr-2 inline-block size-1.5 -translate-y-0.5 rounded-full bg-primary shadow-[0_0_8px_rgba(183,255,0,0.55)]' />
                Stay Connected
              </p>
              <h1 className='font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl'>
                Travel fully <br />
                <span className='text-primary'>connected.</span>
              </h1>
              <p className='max-w-md text-base text-white/80'>
                Flights, stays, and eSIM — all in one place. Your journey,
                simplified.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Search panel — overlapping hero.
            IMPORTANT: no overflow-hidden here — dropdowns must escape */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='page-container relative z-20 -mt-32 sm:-mt-24'
        >
          <div className='rounded-2xl border border-home-panel-border bg-home-panel p-3 shadow-xl backdrop-blur-md sm:p-4'>
            {/* Tabs */}
            <div className='flex gap-2 px-1 pb-3'>
              {SEARCH_TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    tab === id
                      ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(183,255,0,0.45)]'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon className='size-4' />
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content — each panel is self-contained */}
            <AnimatePresence mode='wait'>
              {tab === 'flights' && (
                <motion.div
                  key='flights'
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <form onSubmit={handleSubmit(onSearch)} noValidate>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-4'>
                      {/* From / Swap / To */}
                      <div className='relative col-span-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-2.5 sm:col-span-2'>
                        <div className='min-w-0'>
                          <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
                            From
                          </p>
                          <Controller
                            control={control}
                            name='origin'
                            render={({ field }) => (
                              <AirportInput
                                value={field.value}
                                onChange={field.onChange}
                                label=''
                                placeholder='London (LHR)'
                                naked
                              />
                            )}
                          />
                        </div>
                        <button
                          type='button'
                          onClick={swapAirports}
                          className='grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors'
                        >
                          <ArrowLeftRight className='size-3.5' />
                        </button>
                        <div className='min-w-0'>
                          <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
                            To
                          </p>
                          <Controller
                            control={control}
                            name='destination'
                            render={({ field }) => (
                              <AirportInput
                                value={field.value}
                                onChange={field.onChange}
                                label=''
                                placeholder='Dubai (DXB)'
                                naked
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className='rounded-xl border border-border bg-background/60 px-4 py-2.5'>
                        <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
                          Depart
                        </p>
                        <Controller
                          control={control}
                          name='departure_date'
                          render={({ field }) => (
                            <input
                              type='date'
                              value={field.value}
                              onChange={field.onChange}
                              className='w-full bg-transparent text-sm font-medium text-foreground outline-none [color-scheme:light] dark:[color-scheme:dark]'
                            />
                          )}
                        />
                      </div>

                      <div className='rounded-xl border border-border bg-background/60 px-4 py-2.5'>
                        <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
                          Return
                        </p>
                        <Controller
                          control={control}
                          name='return_date'
                          render={({ field }) => (
                            <input
                              type='date'
                              value={field.value ?? ''}
                              onChange={field.onChange}
                              className='w-full bg-transparent text-sm font-medium text-foreground outline-none [color-scheme:light] dark:[color-scheme:dark]'
                            />
                          )}
                        />
                      </div>
                    </div>

                    <button
                      type='submit'
                      className='mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)] transition-all hover:shadow-[0_0_28px_rgba(183,255,0,0.6)]'
                    >
                      <Search className='size-4' />
                      Search Flights
                    </button>
                  </form>
                </motion.div>
              )}

              {tab === 'stays' && (
                <motion.div
                  key='stays'
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <StaysSearchPanel />
                </motion.div>
              )}

              {tab === 'esim' && (
                <motion.div
                  key='esim'
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <EsimSearchPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust badges */}
          <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {TRUST_BADGES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className='flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3'
              >
                <div className='grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary'>
                  <Icon className='size-4' />
                </div>
                <div className='min-w-0'>
                  <p className='text-[13px] font-bold text-foreground'>
                    {title}
                  </p>
                  <p className='truncate text-[11px] text-muted-foreground'>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PACKAGES ───────────────────────────────────────────── */}
      <section className='page-container py-16 sm:py-20'>
        <div className='mb-6 flex items-end justify-between'>
          <div>
            <p className='font-mono text-[11px] tracking-[2.86px] text-primary'>
              FEATURED TRIPS
            </p>
            <h2 className='mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl'>
              Handpicked packages for you
            </h2>
          </div>
          <Link
            href='/offers'
            className='hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex'
          >
            See all <ArrowRight className='size-3.5' />
          </Link>
        </div>

        <div className='-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4'>
          {PACKAGES.map((p) => (
            <motion.article
              key={p.id}
              whileHover={{ y: -4 }}
              className='group min-w-[260px] overflow-hidden rounded-2xl border border-border bg-card sm:min-w-0'
            >
              <div className='relative h-48 w-full overflow-hidden'>
                <img
                  src={p.image}
                  alt={p.city}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
                <div className='absolute left-3 top-3 rounded-full border border-primary/50 bg-primary/15 px-2.5 py-1 font-mono text-[10px] tracking-wider text-primary backdrop-blur'>
                  From €{p.price}
                </div>
              </div>
              <div className='space-y-3 p-4'>
                <p className='font-heading text-lg font-bold leading-tight'>
                  {p.city}
                </p>
                <Link
                  href='/flights'
                  className='inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground'
                >
                  Book Now
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── eSIM showcase ──────────────────────────────────────── */}
      <section className='border-y border-border bg-card/40'>
        <div className='page-container py-16 sm:py-20'>
          <div className='mb-6 flex items-end justify-between'>
            <div>
              <p className='font-mono text-[11px] tracking-[2.86px] text-primary'>
                STAY CONNECTED
              </p>
              <h2 className='mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl'>
                High-speed eSIM data plans <br className='hidden sm:block' />
                in 200+ countries
              </h2>
            </div>
            <Link
              href='/esim'
              className='hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex'
            >
              View all plans <ArrowRight className='size-3.5' />
            </Link>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {ESIM_PLANS.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -3 }}
                className='overflow-hidden rounded-2xl border border-border bg-card'
              >
                <div className='relative h-32 w-full'>
                  <img
                    src={plan.image}
                    alt={plan.country}
                    className='h-full w-full object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/65 to-transparent' />
                  <p className='absolute bottom-2 left-3 flex items-center gap-1.5 font-heading text-base font-bold text-white'>
                    <span>{plan.flag}</span>
                    {plan.country}
                  </p>
                </div>
                <div className='space-y-2 p-4'>
                  <div className='flex items-center justify-between font-mono text-[10px] tracking-wider text-muted-foreground'>
                    <span>5G · LTE</span>
                    <span>{plan.days}</span>
                  </div>
                  <p className='font-heading text-2xl font-bold text-primary'>
                    €{plan.price}
                  </p>
                  {/* Clicking takes to the plans page pre-filtered for that country */}
                  <button
                    type='button'
                    onClick={() => {
                      const dest = plan.country.toLowerCase()
                      const q = new URLSearchParams()
                      if (dest === 'europe') {
                        q.set('tab', 'global')
                        q.set('regions', 'Europe')
                      } else {
                        q.set('tab', 'local')
                        const matched = Object.entries(ESIM_CHIP_MAP).find(
                          ([k]) => dest.includes(k),
                        )
                        if (matched) q.set('country', matched[1])
                      }
                      q.set('page', '1')
                      router.push(`/esim/plans?${q.toString()}`)
                    }}
                    className='block w-full rounded-full bg-primary py-2 text-center text-xs font-bold text-primary-foreground transition-shadow hover:shadow-[0_0_14px_rgba(183,255,0,0.45)]'
                  >
                    Get eSIM
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className='mt-6 text-center sm:hidden'>
            <Link
              href='/esim'
              className='inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline'
            >
              View all plans <ArrowRight className='size-3.5' />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Deals + Mobility ─────────────────────────────────── */}
      <section className='page-container py-16 sm:py-20'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Flight deals */}
          <div className='space-y-3 rounded-2xl border border-border bg-card p-5'>
            <p className='font-mono text-[11px] tracking-[2.86px] text-primary'>
              TOP FLIGHT DEALS
            </p>
            {FLIGHT_DEALS.map((d) => (
              <Link
                key={d.from + d.to}
                href='/flights'
                className='flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5 transition-colors hover:border-primary/30'
              >
                <div>
                  <p className='text-sm font-medium'>
                    {d.from} → {d.to}
                  </p>
                  <p className='font-mono text-[10px] text-muted-foreground'>
                    Save up to €{d.save}
                  </p>
                </div>
                <p className='text-sm font-bold text-primary'>
                  From €{d.price}
                </p>
              </Link>
            ))}
          </div>

          {/* Top stays */}
          <div className='space-y-3 rounded-2xl border border-border bg-card p-5'>
            <p className='font-mono text-[11px] tracking-[2.86px] text-primary'>
              TOP STAYS
            </p>
            {TOP_STAYS.map((s) => (
              <Link
                key={s.name}
                href='/stays'
                className='flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5 transition-colors hover:border-primary/30'
              >
                <div>
                  <p className='text-sm font-medium'>{s.name}</p>
                  <p className='font-mono text-[10px] text-muted-foreground'>
                    {s.city}
                  </p>
                </div>
                <p className='text-sm font-bold text-primary'>
                  €{s.price}/night
                </p>
              </Link>
            ))}
          </div>

          {/* Mobility */}
          <div className='space-y-3 rounded-2xl border border-border bg-card p-5'>
            <p className='font-mono text-[11px] tracking-[2.86px] text-primary'>
              MOBILITY
            </p>
            {MOBILITY.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className='flex items-start gap-3 rounded-xl border border-border/60 px-3 py-2.5'
              >
                <div className='grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary'>
                  <Icon className='size-4' />
                </div>
                <div>
                  <p className='text-sm font-medium'>{title}</p>
                  <p className='text-[11px] text-muted-foreground'>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Build Your Trip ───────────────────────────────────── */}
      <section className='border-t border-border bg-card/30'>
        <div className='page-container py-16 text-center sm:py-20'>
          <p className='font-mono text-[11px] tracking-[2.86px] text-primary'>
            BUILD A TRIP
          </p>
          <h2 className='mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl'>
            Build Your Trip in Seconds
          </h2>
          <p className='mx-auto mt-2 max-w-md text-sm text-muted-foreground'>
            Plan, book and manage your entire trip in one place.
          </p>

          <div className='mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6'>
            {PLAN_STEPS.map((step, i) => (
              <div key={step.n} className='flex items-center gap-3 sm:gap-6'>
                <div className='flex flex-col items-center gap-2'>
                  <div className='grid size-12 place-items-center rounded-full border border-primary/40 bg-primary/10 font-heading text-base font-bold text-primary'>
                    {step.n}
                  </div>
                  <p className='font-mono text-xs tracking-wider text-muted-foreground'>
                    {step.label}
                  </p>
                </div>
                {i < PLAN_STEPS.length - 1 && (
                  <span className='h-px w-8 bg-border sm:w-14' />
                )}
              </div>
            ))}
          </div>

          <Link
            href='/flights'
            className='mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_18px_rgba(183,255,0,0.4)]'
          >
            <Plane className='size-4' />
            Start Planning
          </Link>
        </div>
      </section>
    </div>
  )
}
