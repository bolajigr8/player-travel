'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Star,
  ChevronRight,
  Plane,
  BedDouble,
  Wifi,
  Car,
  Search,
  CalendarPlus,
  HelpCircle,
  Heart,
  ArrowRight,
} from 'lucide-react'
import { DASHBOARD_USER } from '@/store/dashboard'
import { NextTripCard } from '@/components/dashboard/home/NextTripCard'
import { TripEssentials } from '@/components/dashboard/home/TripEssentials'
import { InboxAndRewards } from '@/components/dashboard/home/InboxAndRewards'

function SectionHeader({
  title,
  action,
  actionHref = '#',
}: {
  title: string
  action?: string
  actionHref?: string
}) {
  return (
    <div className='flex items-center justify-between'>
      <h2 className='font-heading text-[16px] sm:text-[18px] font-bold text-foreground dark:text-primary'>
        {title}
      </h2>
      {action && (
        <Link
          href={actionHref}
          className='flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground transition-colors hover:text-foreground'
        >
          {action} <ChevronRight className='h-3 w-3' />
        </Link>
      )}
    </div>
  )
}

function QuickAction({
  icon: Icon,
  label,
  sub,
  href = '#',
}: {
  icon: React.ElementType
  label: string
  sub: string
  href?: string
}) {
  return (
    <Link
      href={href}
      className='flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 sm:p-4 text-left transition-all hover:border-primary/30 hover:bg-muted/30'
    >
      <div className='flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10'>
        <Icon className='h-4 w-4 sm:h-5 sm:w-5 text-primary' />
      </div>
      <div className='min-w-0 flex-1'>
        <p className='font-heading text-[12px] sm:text-[13px] font-bold text-foreground dark:text-primary'>
          {label}
        </p>
        <p className='text-[10px] sm:text-[11px] text-muted-foreground'>
          {sub}
        </p>
      </div>
      <ChevronRight className='h-4 w-4 shrink-0 text-muted-foreground' />
    </Link>
  )
}

export function DashboardHomeClient() {
  return (
    <div className='space-y-6 p-4 sm:p-6'>
      {/* Welcome + Points */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className='font-heading text-[10px] font-medium text-muted-foreground'>
            Welcome back,
          </p>
          <h1 className='font-heading text-[26px] sm:text-[32px] font-bold leading-[1.05] text-foreground dark:text-primary'>
            {DASHBOARD_USER.name}!
          </h1>
          <p className='mt-2 text-[12px] sm:text-[13px] text-muted-foreground'>
            Everything you need for your next adventure, in one place.
          </p>
        </motion.div>

        {/* Points card */}
        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.38 }}
          className='w-full overflow-hidden rounded-2xl border border-border bg-card sm:w-60 sm:shrink-0'
        >
          <div className='flex items-start justify-between p-4'>
            <div>
              <p className='font-mono text-[10px] tracking-widest text-muted-foreground'>
                Your Points
              </p>
              <div className='mt-2 flex items-center gap-2'>
                <Star className='h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary' />
                <span className='font-heading text-2xl sm:text-3xl font-bold text-foreground dark:text-primary'>
                  {DASHBOARD_USER.points.toLocaleString()}
                </span>
              </div>
            </div>
            <span
              className='select-none text-4xl sm:text-5xl leading-none'
              style={{
                filter: 'drop-shadow(0 2px 10px rgba(100,160,255,0.4))',
              }}
            >
              ✈️
            </span>
          </div>
          <div className='flex items-center justify-between border-t border-border px-4 py-3'>
            <div className='flex items-center gap-1.5'>
              <span className='text-[13px]'>🌍</span>
              <span className='font-heading text-[12px] sm:text-[13px] font-semibold text-muted-foreground'>
                {DASHBOARD_USER.level}
              </span>
            </div>
            <Link
              href='/dashboard/rewards'
              className='flex items-center gap-1 font-heading text-[11px] sm:text-[12px] font-bold text-primary'
            >
              View Rewards <ArrowRight className='h-3 w-3 sm:h-3.5 sm:w-3.5' />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Next Trip Card */}
      <NextTripCard />

      {/* Trip Essentials */}
      <TripEssentials />

      {/* Inbox + Rewards */}
      <InboxAndRewards />

      {/* Plan Your Trip banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.38 }}
        className='relative overflow-hidden rounded-2xl border border-border bg-card'
      >
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent' />
        <div
          className='pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-20 dark:opacity-30'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-transparent to-card' />

        <div className='relative z-10 flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center'>
          <div className='max-w-md'>
            <h2 className='font-heading text-xl sm:text-2xl font-bold leading-tight text-foreground dark:text-primary'>
              Plan Everything.
              <br />
              Travel Smarter.
            </h2>
            <p className='mt-3 text-[12px] sm:text-[13px] leading-relaxed text-muted-foreground'>
              Flights, stays, eSIM and transfers — book your whole trip in one
              place and save more.
            </p>
            <Link
              href='/dashboard/trips'
              className='mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-heading text-[12px] sm:text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'
            >
              Explore Trips
            </Link>
          </div>

          {/* Desktop icon row */}
          <div className='hidden lg:block lg:ml-3'>
            <div className='flex items-start'>
              {[
                { icon: Plane, label: 'Flights' },
                { icon: BedDouble, label: 'Stays' },
                { icon: Wifi, label: 'eSIM' },
                { icon: Car, label: 'Transfers' },
              ].map(({ icon: Icon, label }, i) => (
                <div key={label} className='flex'>
                  <div className='flex flex-col items-center gap-2'>
                    <span className='flex h-12 w-12 items-center justify-center rounded-xl border border-primary/50 dark:border-primary/30 bg-primary/20 dark:bg-primary/15 z-10'>
                      <Icon className='h-5 w-5 text-primary' />
                    </span>
                    <span className='font-mono text-[11px] text-foreground/60 dark:text-muted-foreground whitespace-nowrap text-center'>
                      {label}
                    </span>
                  </div>
                  {i < 3 && (
                    <div className='flex h-12 w-14 items-center mx-px'>
                      <svg
                        viewBox='0 0 100 10'
                        className='h-3 w-full text-primary/50 dark:text-primary/40'
                        preserveAspectRatio='none'
                      >
                        <line
                          x1='0'
                          y1='5'
                          x2='100'
                          y2='5'
                          stroke='currentColor'
                          strokeWidth='1.5'
                        />
                        <path d='M0 5 L8 1 L8 9 Z' fill='currentColor' />
                        <path d='M100 5 L92 1 L92 9 Z' fill='currentColor' />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile icon row */}
          <div className='grid grid-cols-4 gap-3 lg:hidden'>
            {[
              { icon: Plane, label: 'Flights' },
              { icon: BedDouble, label: 'Stays' },
              { icon: Wifi, label: 'eSIM' },
              { icon: Car, label: 'Transfers' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className='flex flex-col items-center gap-1.5'>
                <span className='flex h-10 w-10 items-center justify-center rounded-xl border border-primary/50 dark:border-primary/30 bg-primary/20 dark:bg-primary/15'>
                  <Icon className='h-4 w-4 text-primary' />
                </span>
                <span className='font-mono text-[10px] text-foreground/60 dark:text-muted-foreground'>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <p className='absolute bottom-5 right-8 hidden font-heading text-lg italic text-primary/40 lg:block'>
            Bon voyage! 🌍
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <section className='space-y-4'>
        <SectionHeader title='Quick Actions' />
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          <QuickAction
            icon={Search}
            label='Search Flights'
            sub='Find the best deals'
            href='/dashboard/trips'
          />
          <QuickAction
            icon={BedDouble}
            label='Browse Stays'
            sub='Hotels and apartments'
            href='/dashboard/trips'
          />
          <QuickAction
            icon={CalendarPlus}
            label='Manage Bookings'
            sub='View and modify your trips'
            href='/dashboard/bookings'
          />
          <QuickAction
            icon={HelpCircle}
            label='Contact Support'
            sub="We're here 24/7"
            href='/help'
          />
        </div>
      </section>

      {/* Footer */}
      <div className='flex items-center justify-center gap-2 py-2'>
        <Heart className='h-4 w-4 text-primary' />
        <p className='font-mono text-[10px] sm:text-[11px] text-muted-foreground'>
          Thanks for travelling with Golafly!
        </p>
      </div>
    </div>
  )
}
