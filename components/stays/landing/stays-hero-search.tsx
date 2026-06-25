'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export function StaysHeroSearch() {
  const router = useRouter()
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('2026-06-26')
  const [checkOut, setCheckOut] = useState('2026-06-29')
  const [guests, setGuests] = useState('2 Guests · 1 Room')

  function handleSearch() {
    const q = new URLSearchParams()
    if (destination) q.set('destination', destination)
    q.set('checkIn', checkIn)
    q.set('checkOut', checkOut)
    q.set('guests', guests)
    router.push(`/stays/search?${q.toString()}`)
  }

  return (
    <motion.div
      className='mx-auto mt-10 max-w-4xl'
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        className='flex flex-col overflow-visible rounded-2xl border
        border-border bg-card/90 backdrop-blur-sm sm:flex-row  '
      >
        {/* Destination */}
        <div className='flex flex-[2] flex-col px-3 py-4 sm:border-r sm:border-border'>
          <span className='font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary'>
            Destination
          </span>
          <input
            type='text'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder='City, hotel or area'
            className='mt-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground'
          />
        </div>

        {/* Check-in */}
        <div className='flex flex-1 flex-col border-t border-border px-5 py-4 sm:border-r sm:border-t-0'>
          <span className='font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary'>
            Check-in
          </span>
          <input
            type='date'
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className='mt-1 bg-transparent text-sm font-medium text-foreground outline-none [color-scheme:dark]'
          />
        </div>

        {/* Check-out */}
        <div className='flex flex-1 flex-col border-t border-border px-5 py-4 sm:border-r sm:border-t-0'>
          <span className='font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary'>
            Check-out
          </span>
          <input
            type='date'
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className='mt-1 bg-transparent text-sm font-medium text-foreground outline-none [color-scheme:dark]'
          />
        </div>

        {/* Guests & rooms */}
        <div className='flex flex-1 flex-col border-t border-border px-5 py-4 sm:border-r sm:border-t-0'>
          <span className='font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary'>
            Guests &amp; Rooms
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className='mt-1 bg-transparent text-sm font-medium text-foreground outline-none'
          >
            <option>1 Guest · 1 Room</option>
            <option>2 Guests · 1 Room</option>
            <option>2 Guests · 2 Rooms</option>
            <option>3 Guests · 2 Rooms</option>
            <option>Family (2+2) · 2 Rooms</option>
          </select>
        </div>

        {/* Search */}
        <div className='shrink-0 border-t border-border p-2  sm:border-t-0 sm:min-w-[120px]'>
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            // className='flex h-full w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-mono text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] sm:min-h-[58px] sm:py-0'
            className='flex h-full w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-mono text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] whitespace-nowrap sm:min-h-[58px] sm:py-0'
          >
            <Search className='size-4' />
            Search
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
