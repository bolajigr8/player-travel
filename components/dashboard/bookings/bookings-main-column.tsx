'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Plane,
  BedDouble,
  Wifi,
  Car,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  FileText,
  Download,
  ExternalLink,
  MapPin,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DASHBOARD_BOOKINGS, type DashboardBooking } from '@/store/dashboard'
import Image from 'next/image'

type Tab = 'All' | 'Flights' | 'Stays' | 'eSIM'

const TYPE_ICON: Record<string, React.ElementType> = {
  flight: Plane,
  stay: BedDouble,
  esim: Wifi,
  bundle: Car,
}

const TYPE_COLOR: Record<string, string> = {
  flight: 'text-primary',
  stay: 'text-[#C084FC]',
  esim: 'text-[#34D399]',
  bundle: 'text-[#60A5FA]',
}

const TYPE_BG: Record<string, string> = {
  flight: 'bg-primary/15',
  stay: 'bg-[#C084FC]/15',
  esim: 'bg-[#34D399]/15',
  bundle: 'bg-[#60A5FA]/15',
}

const STATUS_STYLE: Record<string, string> = {
  CONFIRMED: 'text-primary',
  UPCOMING: 'text-[#60A5FA]',
  COMPLETED: 'text-muted-foreground',
  CANCELLED: 'text-[#f87171]',
}

function BookingCard({
  booking,
  index,
}: {
  booking: DashboardBooking
  index: number
}) {
  const Icon = TYPE_ICON[booking.type] ?? Plane
  const iconColor = TYPE_COLOR[booking.type] ?? 'text-primary'
  const iconBg = TYPE_BG[booking.type] ?? 'bg-primary/15'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.38 }}
      className='overflow-hidden rounded-2xl border border-border bg-card'
    >
      {/* Card header */}
      <div className='flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/50'>
        <div className='flex items-center gap-2.5'>
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-xl',
              iconBg,
            )}
          >
            <Icon className={cn('h-4 w-4', iconColor)} />
          </div>
          <div>
            <p className='font-heading text-[13px] sm:text-[14px] font-bold text-foreground dark:text-primary'>
              {booking.title}
            </p>
            <p className='font-mono text-[10px] text-muted-foreground'>
              Ref: {booking.bookingRef}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-1.5'>
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full bg-current',
              STATUS_STYLE[booking.status],
            )}
          />
          <span
            className={cn(
              'font-mono text-[10px] font-bold',
              STATUS_STYLE[booking.status],
            )}
          >
            {booking.status}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className='flex items-start gap-4 p-5'>
        {/* Image */}
        <div className='relative h-20 w-28 sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-xl'>
          <Image
            src={booking.image}
            alt={booking.title}
            fill
            sizes='(max-width: 640px) 112px, 144px'
            className='object-cover'
          />
        </div>

        {/* Details */}
        <div className='flex-1 min-w-0 space-y-2'>
          {booking.type === 'flight' && (
            <>
              <div className='flex items-center gap-2 text-[12px] sm:text-[13px] text-foreground/70'>
                <Plane className='h-3.5 w-3.5 shrink-0 text-primary' />
                {booking.subtitle}
              </div>
              <div className='flex items-center gap-2 text-[12px] text-foreground/65'>
                <span className='font-heading font-bold text-foreground dark:text-primary'>
                  {booking.origin}
                </span>
                <span className='text-primary'>→</span>
                <span className='font-heading font-bold text-foreground dark:text-primary'>
                  {booking.destination}
                </span>
              </div>
              <p className='font-mono text-[11px] text-muted-foreground'>
                {booking.date}
              </p>
            </>
          )}

          {booking.type === 'stay' && (
            <>
              <div className='flex items-center gap-2 text-[12px] sm:text-[13px] text-foreground/70'>
                <BedDouble className='h-3.5 w-3.5 shrink-0 text-[#C084FC]' />
                {booking.subtitle}
              </div>
              <div className='flex items-center gap-2 text-[11px] text-muted-foreground'>
                <span>
                  Check-in:{' '}
                  <span className='font-semibold text-foreground dark:text-primary'>
                    {booking.checkIn}
                  </span>
                </span>
              </div>
              <div className='flex items-center gap-2 text-[11px] text-muted-foreground'>
                <span>
                  Check-out:{' '}
                  <span className='font-semibold text-foreground dark:text-primary'>
                    {booking.checkOut}
                  </span>
                </span>
              </div>
            </>
          )}

          {booking.type === 'esim' && (
            <>
              <div className='flex items-center gap-2 text-[12px] sm:text-[13px] text-foreground/70'>
                <Wifi className='h-3.5 w-3.5 shrink-0 text-[#34D399]' />
                {booking.subtitle}
              </div>
              <p className='font-mono text-[11px] text-muted-foreground'>
                {booking.date}
              </p>
            </>
          )}

          <p className='font-heading text-[14px] sm:text-[15px] font-bold text-foreground dark:text-primary'>
            {booking.currency}
            {booking.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className='flex gap-2 border-t border-border px-4 py-3'>
        <button className='flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2 font-heading text-[11px] font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary'>
          <FileText className='h-3.5 w-3.5' /> Details
        </button>
        <button className='flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2 font-heading text-[11px] font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary'>
          <Download className='h-3.5 w-3.5' /> Download
        </button>
        <button className='flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 font-heading text-[11px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
          <ExternalLink className='h-3.5 w-3.5' /> Manage
        </button>
      </div>
    </motion.div>
  )
}

export function BookingsMainColumn() {
  const [activeTab, setActiveTab] = useState<Tab>('All')

  const filtered =
    activeTab === 'All'
      ? DASHBOARD_BOOKINGS
      : DASHBOARD_BOOKINGS.filter((b) => {
          if (activeTab === 'Flights') return b.type === 'flight'
          if (activeTab === 'Stays') return b.type === 'stay'
          if (activeTab === 'eSIM') return b.type === 'esim'
          return true
        })

  const addOns = [
    {
      label: 'Airport Lounge Access',
      sub: 'Relax before your flight with premium lounge access.',
      price: '€45',
      color: 'text-[#C084FC]',
    },
    {
      label: 'Airport Transfer',
      sub: 'Hassle-free transfers to and from the airport.',
      price: '€28',
      color: 'text-[#34D399]',
    },
    {
      label: 'Travel Insurance',
      sub: 'Travel with peace of mind, fully covered.',
      price: '€12',
      color: 'text-[#60A5FA]',
    },
  ]

  return (
    <div className='space-y-5'>
      {/* Tabs + sort */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex gap-0 border-b border-border'>
          {(['All', 'Flights', 'Stays', 'eSIM'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2.5 font-heading text-[13px] font-semibold transition-colors',
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 font-mono text-[11px] text-foreground'>
            Sort by: Recent{' '}
            <ChevronDown className='h-3.5 w-3.5 text-muted-foreground' />
          </div>
          <button className='rounded-xl border border-border bg-card p-2'>
            <SlidersHorizontal className='h-4 w-4 text-muted-foreground' />
          </button>
        </div>
      </div>

      {/* Booking cards */}
      <div className='space-y-4'>
        {filtered.length > 0 ? (
          filtered.map((b, i) => (
            <BookingCard key={b.id} booking={b} index={i} />
          ))
        ) : (
          <div className='flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center'>
            <p className='font-heading text-base font-bold text-foreground dark:text-primary'>
              No {activeTab.toLowerCase()} bookings
            </p>
            <p className='text-[12px] text-muted-foreground'>
              Your {activeTab.toLowerCase()} bookings will appear here.
            </p>
            <Link
              href='/dashboard/trips'
              className='mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-heading text-[12px] font-bold text-primary-foreground transition-opacity hover:opacity-90'
            >
              Browse Trips
            </Link>
          </div>
        )}
      </div>

      {/* Plan next trip banner */}
      <div className='relative overflow-hidden rounded-2xl border border-border bg-card'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent' />
        <div
          className='pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20 dark:opacity-40'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center left',
          }}
        />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-transparent to-card' />

        <div className='relative z-10 flex items-center gap-4 p-5'>
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10'>
            <Plane className='h-6 w-6 text-primary' />
          </div>
          <div className='flex-1'>
            <p className='font-heading text-base font-bold text-foreground dark:text-primary'>
              Ready for your next adventure?
            </p>
            <p className='mt-0.5 text-[12px] text-muted-foreground'>
              Find flights, stays and eSIM plans for your next trip.
            </p>
            <Link
              href='/dashboard/trips'
              className='mt-3 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 font-heading text-[12px] font-bold text-foreground transition-colors hover:border-primary/30 hover:text-primary'
            >
              Explore Trips <ChevronRight className='h-3.5 w-3.5' />
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Add-ons */}
      <section className='space-y-3'>
        <div>
          <h2 className='font-heading text-[16px] font-bold text-foreground dark:text-primary'>
            Recommended Add-ons
          </h2>
          <p className='text-[12px] text-muted-foreground'>
            Make your trip even better
          </p>
        </div>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
          {addOns.map((a) => (
            <div
              key={a.label}
              className='rounded-2xl border border-border bg-card p-4'
            >
              <div className='mb-3 h-8 w-8 rounded-lg bg-primary/10' />
              <p className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                {a.label}
              </p>
              <p className='mt-1 text-[11px] text-muted-foreground'>{a.sub}</p>
              <div className='mt-3 flex items-center justify-between'>
                <span className={cn('font-heading text-sm font-bold', a.color)}>
                  From {a.price}
                </span>
                <button className='flex h-7 w-7 items-center justify-center rounded-full bg-primary'>
                  <ChevronRight className='h-3.5 w-3.5 text-primary-foreground' />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className='flex w-full items-center justify-center gap-1.5 font-mono text-[12px] font-bold text-primary'>
          View All Add-ons <ChevronRight className='h-3.5 w-3.5' />
        </button>
      </section>
    </div>
  )
}
