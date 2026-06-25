'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export function EsimHeroSearch() {
  const router = useRouter()

  const [destination, setDestination] = useState('')
  const [data, setData] = useState('Any')
  const [validity, setValidity] = useState('Any')
  const [dataOpen, setDataOpen] = useState(false)
  const [validityOpen, setValidityOpen] = useState(false)

  function handleSearch() {
    const q = new URLSearchParams()
    const dest = destination.toLowerCase().trim()
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
      const matched = Object.entries(CHIP_MAP).find(([k]) => dest.includes(k))
      if (matched) q.set('country', matched[1])
    }
    if (data !== 'Any') q.set('data', data)
    if (validity !== 'Any') q.set('validity', validity)
    router.push(`/esim/plans?${q.toString()}`)
  }

  return (
    <motion.div
      className='mx-auto mt-10 max-w-3xl'
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className='flex flex-col overflow-hidden rounded-2xl border border-border bg-card sm:flex-row'>
        {/* DESTINATION */}
        <div className='flex flex-1 flex-col px-5 py-4 sm:border-r sm:border-border'>
          <span className='font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary'>
            Destination
          </span>
          <input
            type='text'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder='Where are you going?'
            className='mt-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground'
          />
        </div>

        {/* DATA */}
        <div className='relative border-t border-border sm:border-r sm:border-t-0 sm:border-border'>
          <button
            onClick={() => {
              setDataOpen((o) => !o)
              setValidityOpen(false)
            }}
            className='flex min-w-[130px] w-full flex-col px-5 py-4 text-left'
          >
            <span className='font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary'>
              Data
            </span>
            <span className='mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground'>
              {data}
              <ChevronDown
                className={cn(
                  'size-3.5 text-muted-foreground transition-transform',
                  dataOpen && 'rotate-180',
                )}
              />
            </span>
          </button>
          <AnimatePresence>
            {dataOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className='absolute left-0 top-full z-30 mt-1 min-w-[150px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl'
              >
                {DATA_OPTIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => {
                      setData(o)
                      setDataOpen(false)
                    }}
                    className={cn(
                      'block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted',
                      data === o
                        ? 'font-bold text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    {o}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* VALIDITY */}
        <div className='relative border-t border-border sm:border-t-0'>
          <button
            onClick={() => {
              setValidityOpen((o) => !o)
              setDataOpen(false)
            }}
            className='flex min-w-[140px] w-full flex-col px-5 py-4 text-left'
          >
            <span className='font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary'>
              Validity
            </span>
            <span className='mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground'>
              {validity}
              <ChevronDown
                className={cn(
                  'size-3.5 text-muted-foreground transition-transform',
                  validityOpen && 'rotate-180',
                )}
              />
            </span>
          </button>
          <AnimatePresence>
            {validityOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className='absolute left-0 top-full z-30 mt-1 min-w-[150px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl'
              >
                {VALIDITY_OPTIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => {
                      setValidity(o)
                      setValidityOpen(false)
                    }}
                    className={cn(
                      'block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted',
                      validity === o
                        ? 'font-bold text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    {o}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SEARCH */}
        <div className='border-t border-border p-2 sm:border-t-0'>
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className='flex h-full w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-mono text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] sm:min-h-[58px] sm:py-0'
          >
            <Search className='size-4' />
            Search
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
