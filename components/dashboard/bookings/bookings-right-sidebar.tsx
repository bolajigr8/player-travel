'use client'

import Link from 'next/link'
import {
  Plane,
  BedDouble,
  Wifi,
  Car,
  Headphones,
  Shield,
  ChevronRight,
} from 'lucide-react'
import { DASHBOARD_BOOKINGS, NEXT_TRIP } from '@/store/dashboard'

export function BookingsRightSidebar() {
  const confirmedBookings = DASHBOARD_BOOKINGS.filter(
    (b) => b.status === 'CONFIRMED',
  )

  const addOns = [
    { icon: BedDouble, label: 'Stays', sub: 'Find hotels near you' },
    { icon: Wifi, label: 'eSIM', sub: 'Stay connected' },
    { icon: Car, label: 'Transfers', sub: 'Airport pickups' },
    { icon: Shield, label: 'Insurance', sub: 'Travel with peace of mind' },
  ]

  return (
    <aside className='space-y-4'>
      {/* Upcoming Trip Summary */}
      <div className='overflow-hidden rounded-2xl border border-border bg-card'>
        <div
          className='relative h-28'
          style={{
            backgroundImage: `url(${NEXT_TRIP.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-t from-card/95 via-card/30 to-transparent' />
          <div className='absolute bottom-3 left-3'>
            <p className='font-heading text-sm font-bold text-foreground dark:text-primary'>
              {NEXT_TRIP.destination}
            </p>
            <p className='font-mono text-[10px] text-muted-foreground'>
              {NEXT_TRIP.departDate} — {NEXT_TRIP.returnDate}
            </p>
          </div>
        </div>
        <div className='p-4'>
          <h3 className='font-heading text-[14px] font-bold text-foreground dark:text-primary'>
            Next Trip
          </h3>
          <div className='mt-3 space-y-2'>
            {[
              { Icon: Plane, label: 'Flight', status: 'Confirmed' },
              { Icon: BedDouble, label: 'Hotel', status: 'Confirmed' },
              { Icon: Wifi, label: 'eSIM', status: 'Ready' },
            ].map(({ Icon, label, status }) => (
              <div key={label} className='flex items-center gap-2'>
                <Icon className='h-3.5 w-3.5 text-muted-foreground' />
                <span className='flex-1 text-[12px] text-foreground dark:text-primary'>
                  {label}
                </span>
                <span className='font-mono text-[10px] text-primary'>
                  {status}
                </span>
              </div>
            ))}
          </div>
          <button className='mt-4 flex w-full items-center justify-between rounded-xl border border-border px-4 py-2.5 font-heading text-[12px] font-bold text-foreground transition-colors hover:border-primary/30 hover:text-primary'>
            View Itinerary <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </div>

      {/* Booking Stats */}
      <div className='rounded-2xl border border-border bg-card p-4'>
        <h3 className='font-heading text-[14px] font-bold text-foreground dark:text-primary'>
          Booking Summary
        </h3>
        <div className='mt-3 grid grid-cols-2 gap-3'>
          {[
            {
              label: 'Confirmed',
              value: confirmedBookings.length,
              color: 'text-primary',
            },
            {
              label: 'Completed',
              value: DASHBOARD_BOOKINGS.filter((b) => b.status === 'COMPLETED')
                .length,
              color: 'text-muted-foreground',
            },
            {
              label: 'Total Trips',
              value: 5,
              color: 'text-foreground dark:text-primary',
            },
            {
              label: 'Countries',
              value: 3,
              color: 'text-foreground dark:text-primary',
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className='rounded-xl border border-border p-3 text-center'
            >
              <p className={`font-heading text-2xl font-bold ${color}`}>
                {value}
              </p>
              <p className='mt-0.5 font-mono text-[10px] text-muted-foreground'>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add to trip */}
      <div className='rounded-2xl border border-border bg-card p-4'>
        <h3 className='font-heading text-[14px] font-bold text-foreground dark:text-primary'>
          Add to your trip
        </h3>
        <p className='mt-0.5 text-[11px] text-muted-foreground'>
          Complete your journey
        </p>
        <div className='mt-3 space-y-2'>
          {addOns.map(({ icon: Icon, label, sub }) => (
            <button
              key={label}
              className='flex w-full items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-primary/30 hover:bg-muted/40'
            >
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                <Icon className='h-4 w-4 text-primary' />
              </div>
              <div className='flex-1 text-left'>
                <p className='font-heading text-[12px] font-bold text-foreground dark:text-primary'>
                  {label}
                </p>
                <p className='text-[10px] text-muted-foreground'>{sub}</p>
              </div>
              <ChevronRight className='h-3.5 w-3.5 text-muted-foreground' />
            </button>
          ))}
        </div>
      </div>

      {/* Need help */}
      <div className='rounded-2xl border border-border bg-card p-4'>
        <h3 className='font-heading text-[14px] font-bold text-foreground dark:text-primary'>
          Need help?
        </h3>
        <p className='mt-0.5 text-[12px] text-muted-foreground'>
          Our support team is here to help you 24/7.
        </p>
        <Link
          href='/help'
          className='mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 font-heading text-[12px] font-bold text-foreground transition-colors hover:border-primary/30 hover:text-primary'
        >
          <Headphones className='h-4 w-4' /> Contact Support
        </Link>
      </div>
    </aside>
  )
}
