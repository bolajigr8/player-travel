'use client'

import { Plane, BedDouble, Wifi, Bell, Gift, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NEXT_TRIP, INBOX_MESSAGES } from '@/store/dashboard'
import Image from 'next/image'

export function InboxRightSidebar() {
  const unreadSummary = [
    {
      label: 'Flights',
      count: INBOX_MESSAGES.filter((m) => m.unread && m.type === 'flight')
        .length,
      icon: Plane,
      color: 'bg-primary/20 text-primary',
    },
    {
      label: 'Stays',
      count: INBOX_MESSAGES.filter((m) => m.unread && m.type === 'stay').length,
      icon: BedDouble,
      color: 'bg-[#C084FC]/20 text-[#C084FC]',
    },
    {
      label: 'Announcements',
      count: INBOX_MESSAGES.filter((m) => m.unread && m.type === 'info').length,
      icon: Bell,
      color: 'bg-gray-500/20 text-gray-400',
    },
    {
      label: 'Rewards',
      count: INBOX_MESSAGES.filter((m) => m.unread && m.type === 'reward')
        .length,
      icon: Star,
      color: 'bg-amber-500/20 text-amber-400',
    },
  ]

  return (
    <div className='hidden w-64 shrink-0 overflow-y-auto xl:block'>
      <div className='space-y-4 p-4'>
        {/* Upcoming Trip */}
        <div className='rounded-2xl border border-border bg-card p-4'>
          <h3 className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
            Upcoming Trip
          </h3>

          <div className='relative mt-3 h-20 overflow-hidden rounded-lg'>
            <Image
              src={NEXT_TRIP.image}
              alt={NEXT_TRIP.destination}
              fill
              sizes='224px'
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
            <p className='absolute bottom-2 left-2 font-heading text-xs font-bold text-white'>
              {NEXT_TRIP.destination}
            </p>
          </div>

          <p className='mt-2 text-center font-mono text-[10px] text-muted-foreground'>
            {NEXT_TRIP.departDate}
          </p>
          <p className='text-center font-mono text-[10px] text-muted-foreground'>
            {NEXT_TRIP.airline} · {NEXT_TRIP.originCode} →{' '}
            {NEXT_TRIP.destinationCode}
          </p>

          <div className='mt-3 flex justify-center gap-4'>
            {[
              { v: NEXT_TRIP.countdownDays, l: 'DAYS' },
              { v: NEXT_TRIP.countdownHrs, l: 'HRS' },
              { v: NEXT_TRIP.countdownMins, l: 'MINS' },
            ].map(({ v, l }) => (
              <div key={l} className='text-center'>
                <p className='font-heading text-lg font-bold text-primary'>
                  {v}
                </p>
                <p className='font-mono text-[8px] tracking-widest text-muted-foreground'>
                  {l}
                </p>
              </div>
            ))}
          </div>

          <button className='mt-3 w-full rounded-xl border border-border py-2 font-heading text-[11px] font-bold text-foreground transition-colors hover:border-primary/30 hover:text-primary'>
            View Booking
          </button>
        </div>

        {/* My Trip checklist */}
        <div className='rounded-2xl border border-border bg-card p-4'>
          <h3 className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
            My Trip
          </h3>
          <p className='mt-1 font-heading text-sm font-bold text-foreground dark:text-primary'>
            {NEXT_TRIP.destination}
          </p>
          <p className='font-mono text-[10px] text-muted-foreground'>
            {NEXT_TRIP.departDate} – {NEXT_TRIP.returnDate}
          </p>

          <div className='mt-3 space-y-2'>
            {[
              { icon: Plane, label: 'Flight', status: 'Confirmed', ok: true },
              {
                icon: BedDouble,
                label: 'Hotel',
                status: 'Confirmed',
                ok: true,
              },
              {
                icon: Wifi,
                label: 'eSIM',
                status: 'Ready to install',
                ok: true,
              },
            ].map(({ icon: Icon, label, status, ok }) => (
              <div key={label} className='flex items-center gap-2'>
                <Icon className='h-3.5 w-3.5 text-muted-foreground' />
                <span className='flex-1 text-[11px] text-foreground dark:text-primary'>
                  {label}
                </span>
                <span
                  className={cn(
                    'font-mono text-[10px]',
                    ok ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>

          <button className='mt-3 w-full rounded-xl border border-border py-2 font-heading text-[11px] font-bold text-foreground transition-colors hover:border-primary/30 hover:text-primary'>
            View Trip
          </button>
        </div>

        {/* Unread Summary */}
        <div className='rounded-2xl border border-border bg-card p-4'>
          <h3 className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
            Unread Summary
          </h3>
          <div className='mt-3 space-y-2.5'>
            {unreadSummary.map(({ label, count, icon: Icon, color }) => (
              <div key={label} className='flex items-center gap-2.5'>
                <div
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-md',
                    color,
                  )}
                >
                  <Icon className='h-3 w-3' />
                </div>
                <span className='flex-1 text-[12px] text-foreground dark:text-primary'>
                  {label}
                </span>
                <span
                  className={cn(
                    'font-mono text-[11px] font-bold',
                    count > 0 ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
          <button className='mt-3 w-full rounded-xl border border-border py-2 font-heading text-[11px] font-bold text-foreground transition-colors hover:border-primary/30 hover:text-primary'>
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  )
}
