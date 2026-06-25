'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export function StaySearchBar({
  destination,
  guests,
  onSearch,
}: {
  destination: string
  guests: string
  onSearch: (params: Record<string, string>) => void
}) {
  const [showModify, setShowModify] = useState(false)
  const [dest, setDest] = useState(destination)
  const [checkIn, setCheckIn] = useState('2026-06-26')
  const [checkOut, setCheckOut] = useState('2026-06-29')
  const [guestsVal, setGuestsVal] = useState(guests)

  return (
    <div className='border-b border-border bg-card/60 backdrop-blur-sm'>
      <div className='page-container py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <MapPin className='size-4 shrink-0 text-primary' />
            <span className='font-heading text-base font-bold'>
              {destination}
            </span>
            <span className='text-sm text-muted-foreground'>· {guests}</span>
          </div>
          <button
            onClick={() => setShowModify((o) => !o)}
            className={
              showModify
                ? 'rounded-full border border-primary bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary transition-colors'
                : 'rounded-full border border-border px-4 py-1.5 text-sm font-bold text-foreground transition-colors hover:border-primary/40'
            }
          >
            Modify search
          </button>
        </div>

        {showModify && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.25 }}
            className='overflow-hidden'
          >
            <div className='mt-4 flex flex-wrap items-stretch gap-2'>
              <div className='flex min-w-[200px] flex-[2] flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5'>
                <input
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  placeholder='City, hotel or area'
                  className='bg-transparent text-[13px] font-medium text-foreground outline-none'
                />
                <span className='font-mono text-[9px] tracking-wider text-muted-foreground'>
                  Destination
                </span>
              </div>
              <div className='flex min-w-[130px] flex-1 flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5'>
                <input
                  type='date'
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className='bg-transparent text-[13px] font-medium text-foreground outline-none [color-scheme:dark]'
                />
                <span className='font-mono text-[9px] tracking-wider text-muted-foreground'>
                  Check-in
                </span>
              </div>
              <div className='flex min-w-[130px] flex-1 flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5'>
                <input
                  type='date'
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className='bg-transparent text-[13px] font-medium text-foreground outline-none [color-scheme:dark]'
                />
                <span className='font-mono text-[9px] tracking-wider text-muted-foreground'>
                  Check-out
                </span>
              </div>
              <div className='flex min-w-[150px] flex-1 flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5'>
                <select
                  value={guestsVal}
                  onChange={(e) => setGuestsVal(e.target.value)}
                  className='bg-transparent text-[13px] font-medium text-foreground outline-none'
                >
                  <option>1 Guest · 1 Room</option>
                  <option>2 Guests · 1 Room</option>
                  <option>2 Guests · 2 Rooms</option>
                  <option>3 Guests · 2 Rooms</option>
                  <option>Family (2+2) · 2 Rooms</option>
                </select>
                <span className='font-mono text-[9px] tracking-wider text-muted-foreground'>
                  Guests
                </span>
              </div>
              <motion.button
                onClick={() =>
                  onSearch({
                    destination: dest,
                    checkIn,
                    checkOut,
                    guests: guestsVal,
                  })
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className='flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.35)] transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]'
              >
                Search
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
