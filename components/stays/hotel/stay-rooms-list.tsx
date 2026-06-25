'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useBookingStore } from '@/store/booking'
import type { StayRoom } from '@/store/stays'

export function StayRoomsList({
  rooms,
  basePrice,
}: {
  rooms: StayRoom[]
  basePrice: number
}) {
  const selectedRoomId = useBookingStore((s) => s.selectedRoomId)
  const setSelectedRoom = useBookingStore((s) => s.setSelectedRoom)

  return (
    <section>
      <h2 className='mb-4 font-heading text-base font-black uppercase tracking-wide'>
        Choose Your Room
      </h2>
      <div className='space-y-3'>
        {rooms.map((room) => {
          const selected = room.id === selectedRoomId
          return (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={cn(
                'flex w-full flex-col items-start justify-between gap-3 rounded-xl border p-4 text-left transition-all duration-200 sm:flex-row sm:items-center',
                selected
                  ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]'
                  : 'border-border bg-card hover:border-primary/40',
              )}
            >
              <div>
                <p className='text-base font-bold'>{room.name}</p>
                <p className='text-[12px] text-muted-foreground'>
                  {room.description}
                  {room.size && ` · ${room.size}`}
                </p>
                <div className='mt-2 flex flex-wrap gap-1.5'>
                  <Tag>{room.bedInfo}</Tag>
                  <Tag>Sleeps {room.sleeps}</Tag>
                  <Tag
                    className={
                      room.cancellation === 'Free cancellation'
                        ? 'border-primary/40 text-primary'
                        : 'border-border text-muted-foreground'
                    }
                  >
                    {room.cancellation}
                  </Tag>
                </div>
              </div>

              <div className='flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end sm:gap-1'>
                <div className='text-left sm:text-right'>
                  <p className='font-heading text-xl font-black'>
                    ${room.pricePerNight.toFixed(2)}
                  </p>
                  <p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
                    per night
                  </p>
                </div>
                <motion.span
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    'rounded-full border px-5 py-2 font-mono text-xs font-black uppercase tracking-wide transition-all',
                    selected
                      ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]'
                      : 'border-primary/50 text-primary hover:bg-primary/10',
                  )}
                >
                  {selected ? 'Selected' : 'Select Room'}
                </motion.span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function Tag({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'rounded-md border border-border bg-muted px-2 py-1 font-mono text-[9px] uppercase tracking-wide text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}
