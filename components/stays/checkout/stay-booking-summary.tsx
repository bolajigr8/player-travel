import Image from 'next/image'
import { ClipboardList } from 'lucide-react'
import { ADD_ONS } from '@/store/booking'
import type { StayDetail, StayRoom } from '@/store/stays'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function StayBookingSummary({
  stay,
  room,
  checkIn,
  checkOut,
  guests,
  nights,
  roomSubtotal,
  addOnsTotal,
  taxes,
  total,
  selectedAddOnIds,
}: {
  stay: StayDetail
  room: StayRoom
  checkIn: string
  checkOut: string
  guests: string
  nights: number
  roomSubtotal: number
  addOnsTotal: number
  taxes: number
  total: number
  selectedAddOnIds: string[]
}) {
  const selectedAddOns = ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id))

  return (
    <div className='overflow-hidden rounded-2xl border border-border bg-card'>
      <div className='flex items-center gap-2 bg-primary px-4 py-3.5'>
        <ClipboardList className='size-4 text-primary-foreground' />
        <div>
          <p className='font-heading text-sm font-black text-primary-foreground'>
            Your Booking
          </p>
          <p className='font-mono text-[9px] uppercase tracking-wider text-primary-foreground/70'>
            Live Summary
          </p>
        </div>
      </div>

      <div className='space-y-4 p-4'>
        {/* Hotel */}
        <div className='flex items-center gap-3'>
          <div className='relative size-12 shrink-0 overflow-hidden rounded-lg'>
            <Image
              src={stay.images[0]}
              alt={stay.name}
              fill
              sizes='48px'
              className='object-cover'
            />
          </div>
          <div>
            <p className='text-sm font-bold leading-tight'>{stay.name}</p>
            <p className='text-[11px] text-muted-foreground'>{stay.location}</p>
          </div>
        </div>

        {/* Stay details */}
        <div className='space-y-1 text-[12px] text-muted-foreground'>
          <div className='flex items-center gap-1.5'>
            📅 {formatDate(checkIn)} — {formatDate(checkOut)} · {nights} night
            {nights !== 1 ? 's' : ''}
          </div>
          <div className='flex items-center gap-1.5'>🛏️ {room.name}</div>
          <div className='flex items-center gap-1.5'>👤 {guests}</div>
        </div>

        {/* Price breakdown */}
        <div className='space-y-1.5 border-t border-border pt-3 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>
              ${room.pricePerNight.toFixed(2)} × {nights} night
              {nights !== 1 ? 's' : ''}
            </span>
            <span className='font-medium'>${roomSubtotal.toFixed(2)}</span>
          </div>

          {selectedAddOns.map((a) => (
            <div key={a.id} className='flex justify-between'>
              <span className='text-muted-foreground'>{a.label}</span>
              <span className='font-medium'>
                $
                {(a.unit === '/ night' ? a.price * nights : a.price).toFixed(2)}
              </span>
            </div>
          ))}

          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Taxes &amp; fees</span>
            <span className='font-medium'>${taxes.toFixed(2)}</span>
          </div>
        </div>

        {/* Total */}
        <div className='flex items-center justify-between rounded-xl bg-primary px-4 py-3.5 font-black'>
          <span className='text-sm text-primary-foreground'>Total:</span>
          <span className='text-primary-foreground'>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
