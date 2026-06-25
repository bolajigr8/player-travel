'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Plane,
  BedDouble,
  Wifi,
  Car,
  ChevronRight,
  ArrowRight,
  Grid2x2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DASHBOARD_BOOKINGS } from '@/store/dashboard'
import Image from 'next/image'

interface EssentialCardProps {
  badgeCount?: number
  icon: React.ElementType
  title: string
  imageUrl: string
  line1: string
  line2?: string
  line3?: string
  ctaLabel: string
  ctaStyle: 'primary' | 'stay' | 'esim' | 'transfer'
  index: number
  href: string
}

function EssentialCard({
  badgeCount,
  icon: Icon,
  title,
  imageUrl,
  line1,
  line2,
  line3,
  ctaLabel,
  ctaStyle,
  index,
  href,
}: EssentialCardProps) {
  const ctaAccent =
    ctaStyle === 'stay'
      ? 'text-[#C084FC]'
      : ctaStyle === 'esim'
        ? 'text-[#34D399]'
        : ctaStyle === 'transfer'
          ? 'text-[#60A5FA]'
          : ''

  const ctaIconAccent =
    ctaStyle === 'stay'
      ? 'bg-[#C084FC]/20 text-[#C084FC]'
      : ctaStyle === 'esim'
        ? 'bg-[#34D399]/20 text-[#34D399]'
        : ctaStyle === 'transfer'
          ? 'bg-[#60A5FA]/20 text-[#60A5FA]'
          : 'bg-primary-foreground/20 text-primary-foreground'

  const iconAccent =
    ctaStyle === 'stay'
      ? 'text-[#C084FC]'
      : ctaStyle === 'esim'
        ? 'text-[#34D399]'
        : ctaStyle === 'transfer'
          ? 'text-[#60A5FA]'
          : 'text-primary'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 + index * 0.06, duration: 0.38 }}
      className='flex flex-col overflow-hidden rounded-2xl border border-border bg-card'
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className='flex items-center gap-2 px-3 py-2.5'>
        <Icon className={cn('h-3.5 w-3.5 sm:h-4 sm:w-4', iconAccent)} />
        <span className='font-heading text-[12px] sm:text-[13px] font-semibold text-foreground dark:text-primary'>
          {title}
        </span>
        {badgeCount != null && (
          <span className='ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-mono text-[9px] font-bold text-primary-foreground'>
            {badgeCount}
          </span>
        )}
      </div>

      {/* Image */}
      <div className='relative h-28 sm:h-40 w-full overflow-hidden'>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px'
          className='object-cover'
        />
        <div className='absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card/80 to-transparent' />
      </div>

      {/* Text */}
      <div className='flex flex-1 flex-col px-3 pb-1 pt-2.5'>
        <p className='font-heading text-[11px] sm:text-[13px] font-bold leading-tight text-foreground dark:text-primary'>
          {line1}
        </p>
        {line2 && (
          <p className='mt-1 text-[10px] sm:text-[11px] text-muted-foreground leading-snug'>
            {line2}
          </p>
        )}
        {line3 && (
          <p className='text-[10px] sm:text-[11px] text-muted-foreground leading-snug'>
            {line3}
          </p>
        )}
      </div>

      {/* CTA */}
      <div className='px-3 pb-3 pt-2'>
        {ctaStyle === 'primary' ? (
          <Link
            href={href}
            className='flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 sm:py-2.5 font-heading text-[11px] sm:text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'
          >
            {ctaLabel} <Grid2x2 className='h-3 w-3 sm:h-3.5 sm:w-3.5' />
          </Link>
        ) : (
          <Link
            href={href}
            className='flex w-full items-center justify-between rounded-xl border border-border px-3 py-2 sm:py-2.5 transition-colors hover:border-primary/20 hover:bg-muted/30'
          >
            <span
              className={cn(
                'font-heading text-[11px] sm:text-[13px] font-bold',
                ctaAccent,
              )}
            >
              {ctaLabel}
            </span>
            <span
              className={cn(
                'flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-lg',
                ctaIconAccent,
              )}
            >
              <ArrowRight className='h-2.5 w-2.5 sm:h-3 sm:w-3' />
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

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

export function TripEssentials() {
  const flightBooking = DASHBOARD_BOOKINGS.find(
    (b) => b.type === 'flight' && b.status === 'CONFIRMED',
  )
  const stayBooking = DASHBOARD_BOOKINGS.find(
    (b) => b.type === 'stay' && b.status === 'CONFIRMED',
  )
  const esimBooking = DASHBOARD_BOOKINGS.find(
    (b) => b.type === 'esim' && b.status === 'CONFIRMED',
  )

  return (
    <section className='space-y-4'>
      <SectionHeader
        title='Your Trip Essentials'
        action='Manage All Bookings'
        actionHref='/dashboard/bookings'
      />
      <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
        <EssentialCard
          index={0}
          badgeCount={1}
          icon={Plane}
          title='Flight'
          href='/dashboard/bookings'
          imageUrl='https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80'
          line1={flightBooking?.title ?? 'London → Dubai'}
          line2={flightBooking?.subtitle ?? 'Emirates · EK882'}
          line3={flightBooking?.date ?? 'Wed, 18 Jun 2025'}
          ctaLabel='View Booking'
          ctaStyle='primary'
        />
        <EssentialCard
          index={1}
          icon={BedDouble}
          title='Stay'
          href='/dashboard/bookings'
          imageUrl='https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80'
          line1={stayBooking?.title ?? 'The Grand Plaza'}
          line2={
            stayBooking?.checkIn
              ? `Check-in: ${stayBooking.checkIn}`
              : 'Check-in: 18 Jun 2025'
          }
          line3={
            stayBooking?.nights ? `${stayBooking.nights} nights` : '7 nights'
          }
          ctaLabel='View Stay'
          ctaStyle='stay'
        />
        <EssentialCard
          index={2}
          icon={Wifi}
          title='eSIM'
          href='/dashboard/bookings'
          imageUrl='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'
          line1={esimBooking?.title ?? 'UAE eSIM · 10GB'}
          line2='5G · LTE · Ready to install'
          line3='Valid from 18 Jun 2025'
          ctaLabel='View eSIM'
          ctaStyle='esim'
        />
        <EssentialCard
          index={3}
          icon={Car}
          title='Transfer'
          href='/dashboard/trips'
          imageUrl='https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80'
          line1='Airport Transfer'
          line2='Dubai International → Hotel'
          line3='Add a transfer to your trip'
          ctaLabel='Add Transfer'
          ctaStyle='transfer'
        />
      </div>
    </section>
  )
}
