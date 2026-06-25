'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import type { StayDetail } from '@/store/stays'
import { useBookingStore } from '@/store/booking'

export function StayBookingSidebar({ stay }: { stay: StayDetail }) {
  const router = useRouter()
  const checkIn = useBookingStore((s) => s.checkIn)
  const checkOut = useBookingStore((s) => s.checkOut)
  const guests = useBookingStore((s) => s.guests)
  const setCheckIn = useBookingStore((s) => s.setCheckIn)
  const setCheckOut = useBookingStore((s) => s.setCheckOut)
  const setGuests = useBookingStore((s) => s.setGuests)
  const selectedRoomId = useBookingStore((s) => s.selectedRoomId)
  const setSelectedRoom = useBookingStore((s) => s.setSelectedRoom)
  const nights = useBookingStore((s) => s.nights())

  const room = stay.rooms.find((r) => r.id === selectedRoomId) ?? stay.rooms[0]

  if (!selectedRoomId) {
    // ensure default selection on first render
    setSelectedRoom(stay.rooms[0].id)
  }

  const subtotal = room.pricePerNight * nights
  const taxes = Math.round(subtotal * stay.taxRate)
  const total = subtotal + taxes

  function handleSave() {
    toast.success('Stay saved!', {
      description: `${stay.name} saved to your list.`,
    })
  }

  function handleShare() {
    const url = `${window.location.origin}/stays/hotel?id=${stay.id}`
    navigator.clipboard
      .writeText(url)
      .then(() =>
        toast.success('Link copied!', {
          description: 'Hotel link copied to clipboard.',
        }),
      )
      .catch(() => toast.error('Could not copy link.'))
  }

  function handleReserve() {
    const q = new URLSearchParams()
    q.set('id', stay.id)
    q.set('room', room.id)
    router.push(`/stays/checkout?${q.toString()}`)
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-border bg-card'>
      <div className='border-b border-border px-5 py-4'>
        <div className='flex items-baseline gap-2'>
          <span className='font-heading text-3xl font-black'>
            ${room.pricePerNight.toFixed(0)}
          </span>
          {stay.originalPrice && (
            <span className='font-mono text-sm text-muted-foreground line-through'>
              ${stay.originalPrice}
            </span>
          )}
          <span className='font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
            / night
          </span>
        </div>
        {stay.isLimitedDeal && stay.discountPercent && (
          <span className='mt-2 inline-flex items-center rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wide text-primary-foreground'>
            Save {stay.discountPercent}% · Limited Deal
          </span>
        )}
      </div>

      <div className='space-y-4 p-5'>
        {/* Dates */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='space-y-1'>
            <label className='font-mono text-[10px] font-bold uppercase tracking-wider text-primary'>
              Check-in
            </label>
            <input
              type='date'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none [color-scheme:dark] focus:border-primary'
            />
          </div>
          <div className='space-y-1'>
            <label className='font-mono text-[10px] font-bold uppercase tracking-wider text-primary'>
              Check-out
            </label>
            <input
              type='date'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none [color-scheme:dark] focus:border-primary'
            />
          </div>
        </div>

        {/* Guests */}
        <div className='space-y-1'>
          <label className='font-mono text-[10px] font-bold uppercase tracking-wider text-primary'>
            Guests &amp; Rooms
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className='w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary'
          >
            <option>1 Guest · 1 Room</option>
            <option>2 Guests · 1 Room</option>
            <option>2 Guests · 2 Rooms</option>
            <option>3 Guests · 2 Rooms</option>
            <option>Family (2+2) · 2 Rooms</option>
          </select>
        </div>

        <div className='border-t border-border' />

        {/* Price breakdown */}
        <div className='space-y-1.5 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>
              ${room.pricePerNight.toFixed(0)} × {nights} night
              {nights !== 1 ? 's' : ''}
            </span>
            <span className='font-medium'>${subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Taxes &amp; fees</span>
            <span className='font-medium'>${taxes.toFixed(2)}</span>
          </div>
        </div>

        <div className='flex items-center justify-between border-t border-border pt-3'>
          <span className='font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            Total
          </span>
          <span className='font-heading text-xl font-black text-primary'>
            ${total.toFixed(2)}
          </span>
        </div>

        <motion.button
          onClick={handleReserve}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className='w-full rounded-xl bg-primary py-4 font-mono text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-shadow hover:shadow-[0_0_28px_hsl(var(--primary)/0.55)]'
        >
          Reserve →
        </motion.button>

        <p className='flex items-center justify-center gap-1.5 text-[11px] text-primary'>
          ✓ Free cancellation before check-in
        </p>

        <div className='grid grid-cols-2 gap-2'>
          <button
            onClick={handleSave}
            className='rounded-lg border border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground'
          >
            ♡ Save
          </button>
          <button
            onClick={handleShare}
            className='rounded-lg border border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground'
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
