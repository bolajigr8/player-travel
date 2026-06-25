import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { StayDetail, StayRoom } from '@/store/stays'

export function Step1YourStay({
  stay,
  room,
  rooms,
  selectedRoomId,
  onSelectRoom,
  checkIn,
  checkOut,
  guests,
  onCheckIn,
  onCheckOut,
  onGuests,
  onBack,
  onContinue,
}: {
  stay: StayDetail
  room: StayRoom
  rooms: StayRoom[]
  selectedRoomId: string
  onSelectRoom: (id: string) => void
  checkIn: string
  checkOut: string
  guests: string
  onCheckIn: (v: string) => void
  onCheckOut: (v: string) => void
  onGuests: (v: string) => void
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <div className='space-y-8'>
      {/* Hotel summary */}
      <div className='flex items-center gap-4 rounded-2xl border border-border bg-card p-5'>
        <div className='relative size-16 shrink-0 overflow-hidden rounded-xl'>
          <Image
            src={stay.images[0]}
            alt={stay.name}
            fill
            sizes='64px'
            className='object-cover'
          />
        </div>
        <div>
          <div className='mb-0.5 flex items-center gap-2'>
            <span className='font-mono text-[10px] uppercase tracking-wider text-primary'>
              {stay.type}
            </span>
            <div className='flex items-center gap-0.5'>
              {Array.from({ length: stay.stars }).map((_, i) => (
                <Star
                  key={i}
                  className='h-3 w-3 fill-amber-400 text-amber-400'
                />
              ))}
            </div>
          </div>
          <p className='font-heading text-lg font-bold'>{stay.name}</p>
          <div className='flex items-center gap-1 text-[11px] text-muted-foreground'>
            <MapPin className='size-3' />
            {stay.fullLocation}
          </div>
        </div>
      </div>

      {/* Choose room */}
      <section>
        <h2 className='mb-4 font-heading text-sm font-black uppercase tracking-wide'>
          Choose Your Room
        </h2>
        <div className='space-y-3'>
          {rooms.map((r) => {
            const selected = r.id === selectedRoomId
            return (
              <button
                key={r.id}
                onClick={() => onSelectRoom(r.id)}
                className={cn(
                  'flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-200',
                  selected
                    ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]'
                    : 'border-border bg-card hover:border-primary/40',
                )}
              >
                <div
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    selected
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground/40',
                  )}
                >
                  {selected && (
                    <div className='size-2 rounded-full bg-primary-foreground' />
                  )}
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-bold'>{r.name}</p>
                  <p className='truncate text-[12px] text-muted-foreground'>
                    {r.description}
                    {r.size && ` · ${r.size}`} · {r.bedInfo} · Sleeps {r.sleeps}
                  </p>
                </div>
                <div className='shrink-0 text-right'>
                  <p className='font-heading font-bold text-primary'>
                    ${r.pricePerNight.toFixed(2)}
                  </p>
                  <p className='font-mono text-[10px] text-muted-foreground'>
                    PER NIGHT
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Dates & Guests */}
      <section>
        <h2 className='mb-4 font-heading text-sm font-black uppercase tracking-wide'>
          Dates &amp; Guests
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-foreground'>
              Check-in
            </label>
            <input
              type='date'
              value={checkIn}
              onChange={(e) => onCheckIn(e.target.value)}
              className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none [color-scheme:dark] focus:border-primary'
            />
          </div>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-foreground'>
              Check-out
            </label>
            <input
              type='date'
              value={checkOut}
              onChange={(e) => onCheckOut(e.target.value)}
              className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none [color-scheme:dark] focus:border-primary'
            />
          </div>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-foreground'>
              Guests &amp; rooms
            </label>
            <select
              value={guests}
              onChange={(e) => onGuests(e.target.value)}
              className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary'
            >
              <option>1 Guest · 1 Room</option>
              <option>2 Guests · 1 Room</option>
              <option>2 Guests · 2 Rooms</option>
              <option>3 Guests · 2 Rooms</option>
              <option>Family (2+2) · 2 Rooms</option>
            </select>
          </div>
        </div>
      </section>

      <div className='flex items-center justify-between pt-2'>
        <button
          onClick={onBack}
          className='flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          <ChevronLeft className='size-4' /> Back to hotel
        </button>
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]'
        >
          Continue <ChevronRight className='size-4' />
        </motion.button>
      </div>
    </div>
  )
}
