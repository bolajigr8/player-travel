'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  ArrowRight,
  Plane,
  Wifi,
  Users,
  CreditCard,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DASHBOARD_USER } from '@/store/dashboard'

const TRIP_ESSENTIALS = [
  {
    icon: Plane,
    label: 'Documents',
    name: 'Passport',
    detail: 'Valid until 12 May 2029',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: CreditCard,
    label: 'Payment Cards',
    name: '•••• 4242',
    detail: 'Visa · Expires 09/27',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: Wifi,
    label: 'eSIM',
    name: 'UAE eSIM 10GB',
    detail: 'Active · Valid from 18 Jun 2025',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Users,
    label: 'Saved Travellers',
    name: '1 Traveller',
    detail: 'You',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
]

const ACTIVITY = [
  {
    id: 1,
    emoji: '✈️',
    title: 'Flight booked',
    subtitle: 'London → Dubai · EK882',
    date: '3 Jun 2025',
  },
  {
    id: 2,
    emoji: '🏨',
    title: 'Hotel booking confirmed',
    subtitle: 'The Grand Plaza · Dubai',
    date: '3 Jun 2025',
  },
  {
    id: 3,
    emoji: '📱',
    title: 'eSIM purchased',
    subtitle: 'UAE eSIM 10GB · 15 days',
    date: '3 Jun 2025',
  },
  {
    id: 4,
    emoji: '🎁',
    title: 'Reward redeemed',
    subtitle: '10% Off Next Booking',
    date: '15 Apr 2025',
  },
]

export function ProfileContent() {
  return (
    <div className='space-y-6 sm:space-y-8'>
      {/* ── Communication Preferences ── */}
      <section className='space-y-3'>
        <h2 className='font-heading text-[16px] sm:text-[18px] font-bold text-foreground dark:text-primary'>
          My Preferences
        </h2>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
          {/* Travel Preferences */}
          <div className='rounded-2xl border border-border bg-card p-4'>
            <h3 className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
              Travel Preferences
            </h3>
            <div className='mt-3 space-y-3'>
              {[
                { emoji: '✈️', label: 'Economy', sub: 'Preferred class' },
                { emoji: '🛏️', label: '7 Nights', sub: 'Typical stay' },
                { emoji: '📅', label: '1 Day Before', sub: 'Arrival time' },
              ].map(({ emoji, label, sub }) => (
                <div key={label} className='flex items-center gap-2.5'>
                  <span className='text-[15px]'>{emoji}</span>
                  <div>
                    <p className='font-heading text-[12px] font-bold text-foreground dark:text-primary'>
                      {label}
                    </p>
                    <p className='font-mono text-[10px] text-muted-foreground'>
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className='mt-4 flex items-center gap-1 font-heading text-[12px] font-bold text-primary'>
              Edit Preferences <ChevronRight className='h-3 w-3' />
            </button>
          </div>

          {/* Destinations */}
          <div className='rounded-2xl border border-border bg-card p-4'>
            <h3 className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
              Favourite Destinations
            </h3>
            <div className='mt-3 space-y-3'>
              {[
                { flag: '🇦🇪', label: 'Dubai', sub: 'Most visited' },
                { flag: '🇪🇸', label: 'Barcelona', sub: 'Last visited' },
                { flag: '🇳🇱', label: 'Amsterdam', sub: 'Visited Mar 25' },
              ].map(({ flag, label, sub }) => (
                <div key={label} className='flex items-center gap-2.5'>
                  <span className='text-[18px]'>{flag}</span>
                  <div>
                    <p className='font-heading text-[12px] font-bold text-foreground dark:text-primary'>
                      {label}
                    </p>
                    <p className='font-mono text-[10px] text-muted-foreground'>
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className='mt-4 flex items-center gap-1 font-heading text-[12px] font-bold text-primary'>
              Manage <ChevronRight className='h-3 w-3' />
            </button>
          </div>

          {/* Communication */}
          <div className='rounded-2xl border border-border bg-card p-4'>
            <h3 className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
              Communication
            </h3>
            <div className='mt-3 space-y-3'>
              {[
                { emoji: '📧', label: 'Email', value: DASHBOARD_USER.email },
                { emoji: '🔔', label: 'Push Notifications', value: 'Enabled' },
                { emoji: '💬', label: 'SMS', value: DASHBOARD_USER.phone },
              ].map(({ emoji, label, value }) => (
                <div key={label} className='flex items-start gap-2'>
                  <span className='mt-0.5 text-[13px]'>{emoji}</span>
                  <div className='min-w-0 flex-1'>
                    <p className='font-heading text-[12px] font-bold text-foreground dark:text-primary'>
                      {label}
                    </p>
                    <p className='truncate font-mono text-[10px] text-muted-foreground'>
                      {value}
                    </p>
                  </div>
                  <span className='mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary'>
                    ✓
                  </span>
                </div>
              ))}
            </div>
            <button className='mt-4 flex items-center gap-1 font-heading text-[12px] font-bold text-primary'>
              Manage Settings <ChevronRight className='h-3 w-3' />
            </button>
          </div>
        </div>
      </section>

      {/* ── Trip Essentials ── */}
      <section className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h2 className='font-heading text-[16px] sm:text-[18px] font-bold text-foreground dark:text-primary'>
            My Trip Essentials
          </h2>
          <Link
            href='#'
            className='font-mono text-[10px] sm:text-[11px] text-muted-foreground hover:text-foreground'
          >
            View all
          </Link>
        </div>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {TRIP_ESSENTIALS.map(
            ({ icon: Icon, label, name, detail, iconBg, iconColor }) => (
              <div
                key={label}
                className='flex flex-col rounded-2xl border border-border bg-card p-3 sm:p-4'
              >
                <p className='font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>
                  {label}
                </p>
                <div
                  className={cn(
                    'mt-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl',
                    iconBg,
                  )}
                >
                  <Icon className={cn('h-5 w-5 sm:h-6 sm:w-6', iconColor)} />
                </div>
                <p className='mt-2 sm:mt-3 font-heading text-[12px] sm:text-[13px] font-bold text-foreground dark:text-primary'>
                  {name}
                </p>
                <p className='mt-0.5 text-[9px] sm:text-[10px] leading-relaxed text-muted-foreground'>
                  {detail}
                </p>
                <button className='mt-2 sm:mt-3 flex items-center gap-1 font-heading text-[11px] sm:text-[12px] font-bold text-primary'>
                  Manage <ChevronRight className='h-3 w-3' />
                </button>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ── Recent Activity ── */}
      <section className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h2 className='font-heading text-[16px] sm:text-[18px] font-bold text-foreground dark:text-primary'>
            Recent Activity
          </h2>
          <Link
            href='#'
            className='font-mono text-[10px] sm:text-[11px] text-muted-foreground hover:text-foreground'
          >
            View all
          </Link>
        </div>
        <div className='overflow-hidden rounded-2xl border border-border bg-card'>
          {ACTIVITY.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4',
                i < ACTIVITY.length - 1 && 'border-b border-border',
              )}
            >
              <div className='flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-muted/60 text-[14px] sm:text-[16px]'>
                {item.emoji}
              </div>
              <div className='min-w-0 flex-1'>
                <p className='font-heading text-[12px] sm:text-[13px] font-bold text-foreground dark:text-primary'>
                  {item.title}
                </p>
                <p className='text-[10px] sm:text-[11px] text-muted-foreground truncate'>
                  {item.subtitle}
                </p>
              </div>
              <span className='shrink-0 font-mono text-[10px] sm:text-[11px] text-muted-foreground'>
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <div className='relative overflow-hidden rounded-2xl border border-border'>
        <div
          className='absolute inset-0 opacity-30 dark:opacity-50'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=50)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className='absolute inset-0 bg-linear-to-r from-card/95 via-card/80 to-card/40' />

        <div className='relative z-10 p-5 sm:p-7 flex flex-col gap-5 sm:gap-6 sm:flex-row sm:items-center sm:justify-between'>
          <p className='font-heading text-xl sm:text-2xl font-bold leading-snug text-foreground dark:text-primary'>
            More trips.
            <br />
            More memories.
            <br />
            More rewards.
          </p>
          <div className='hidden sm:flex items-center gap-2'>
            {(
              [
                { icon: '✈️', label: 'Fly' },
                { icon: '🏨', label: 'Stay' },
                { icon: '📱', label: 'Connect' },
                { icon: '😊', label: 'Enjoy' },
              ] as const
            ).map(({ icon, label }, i) => (
              <div key={label} className='flex items-center gap-2'>
                <div className='flex flex-col items-center gap-1'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-xl'>
                    {icon}
                  </div>
                  <span className='font-mono text-[9px] text-muted-foreground'>
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <ArrowRight className='h-3.5 w-3.5 shrink-0 text-primary/50' />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
