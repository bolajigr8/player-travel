'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Plane, BedDouble } from 'lucide-react'
import { NEXT_TRIP } from '@/store/dashboard'

function CountdownUnit({ val, label }: { val: string; label: string }) {
  return (
    <div className='text-center'>
      <p className='font-heading text-3xl sm:text-4xl font-bold leading-none text-primary'>
        {val}
      </p>
      <p className='mt-1.5 font-mono text-[9px] tracking-widest text-foreground/40'>
        {label}
      </p>
    </div>
  )
}

export function NextTripCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.42 }}
      className='relative overflow-hidden rounded-2xl border border-border bg-card'
    >
      {/* Destination background */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `url(${NEXT_TRIP.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Theme-aware overlay */}
      <div className='absolute inset-0 bg-background/88 dark:bg-background/93' />
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/8 to-transparent' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(183,255,0,0.05),transparent_60%)]' />

      {/* ── MOBILE layout ── */}
      <div className='relative z-10 flex flex-col md:hidden px-5 py-6 gap-5'>
        <span className='self-start rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-primary'>
          NEXT TRIP
        </span>

        {/* Route */}
        <div className='flex items-center gap-3'>
          <div className='flex flex-col items-center gap-1'>
            <div
              className='flex h-10 w-10 items-center justify-center rounded-full font-heading text-[13px] font-bold text-white shadow-lg'
              style={{ backgroundColor: NEXT_TRIP.airlineColor }}
            >
              {NEXT_TRIP.airlineInitials}
            </div>
            <span className='font-heading text-[11px] font-bold uppercase tracking-wide text-foreground dark:text-primary'>
              {NEXT_TRIP.originCode}
            </span>
          </div>

          <div className='flex flex-1 flex-col items-center gap-1'>
            <Plane className='h-4 w-4 text-primary' />
            <div className='h-px w-full bg-foreground/10' />
            <span className='font-mono text-[9px] text-foreground/50'>
              {NEXT_TRIP.airline}
            </span>
          </div>

          <div className='flex flex-col items-center gap-1'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/30'>
              <MapPin className='h-4 w-4 text-primary' />
            </div>
            <span className='font-heading text-[11px] font-bold uppercase tracking-wide text-foreground dark:text-primary'>
              {NEXT_TRIP.destinationCode}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-[12px] text-foreground/65'>
            <Calendar className='h-3.5 w-3.5 shrink-0 text-primary' />
            {NEXT_TRIP.departDate} · {NEXT_TRIP.departTime}
          </div>
          <div className='flex items-center gap-2 text-[12px] text-foreground/65'>
            <BedDouble className='h-3.5 w-3.5 shrink-0 text-primary' />
            {NEXT_TRIP.hotel} · {NEXT_TRIP.nights} nights
          </div>
        </div>

        <div className='h-px w-full bg-foreground/[0.07]' />

        {/* Countdown */}
        <div className='flex flex-col items-center gap-4'>
          <p className='font-mono text-[10px] font-bold tracking-[0.2em] text-primary'>
            DEPARTURE IN
          </p>
          <div className='flex items-center gap-6'>
            <CountdownUnit val={NEXT_TRIP.countdownDays} label='DAYS' />
            <CountdownUnit val={NEXT_TRIP.countdownHrs} label='HRS' />
            <CountdownUnit val={NEXT_TRIP.countdownMins} label='MINS' />
          </div>
          <Link
            href='/dashboard/bookings'
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'
          >
            View Booking
          </Link>
        </div>
      </div>

      {/* ── DESKTOP layout ── */}
      <div className='relative z-10 hidden md:flex items-stretch'>
        {/* Left: trip info */}
        <div className='flex flex-1 flex-col justify-center px-8 py-6 gap-4'>
          <span className='w-fit rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-primary'>
            NEXT TRIP
          </span>

          <div className='flex items-center gap-8'>
            {/* Origin */}
            <div className='flex flex-col items-center gap-2'>
              <div
                className='flex h-14 w-14 items-center justify-center rounded-full font-heading text-[16px] font-bold text-white shadow-lg'
                style={{ backgroundColor: NEXT_TRIP.airlineColor }}
              >
                {NEXT_TRIP.airlineInitials}
              </div>
              <span className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                {NEXT_TRIP.originCode}
              </span>
              <span className='font-mono text-[10px] text-foreground/50'>
                {NEXT_TRIP.origin}
              </span>
            </div>

            {/* Arrow */}
            <div className='flex flex-col items-center gap-1'>
              <Plane className='h-5 w-5 text-primary' />
              <div className='h-px w-16 bg-foreground/10' />
              <span className='font-mono text-[9px] text-foreground/40'>
                {NEXT_TRIP.airline}
              </span>
            </div>

            {/* Destination */}
            <div className='flex flex-col items-center gap-2'>
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/30'>
                <MapPin className='h-6 w-6 text-primary' />
              </div>
              <span className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                {NEXT_TRIP.destinationCode}
              </span>
              <span className='font-mono text-[10px] text-foreground/50'>
                {NEXT_TRIP.destination}
              </span>
            </div>

            <div className='mx-2 h-16 w-px bg-foreground/10' />

            {/* Meta */}
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-2.5 text-[13px] text-foreground/70'>
                <Calendar className='h-4 w-4 shrink-0 text-primary' />
                {NEXT_TRIP.departDate}
              </div>
              <div className='flex items-center gap-2.5 text-[13px] text-foreground/70'>
                <Clock className='h-4 w-4 shrink-0 text-primary' />
                {NEXT_TRIP.departTime} · Return {NEXT_TRIP.returnDate}
              </div>
              <div className='flex items-center gap-2.5 text-[13px] text-foreground/70'>
                <BedDouble className='h-4 w-4 shrink-0 text-primary' />
                {NEXT_TRIP.hotel} · {NEXT_TRIP.nights} nights
              </div>
            </div>
          </div>
        </div>

        {/* Right: countdown */}
        <div className='flex flex-col items-center justify-center gap-5 border-l border-foreground/[0.07] px-8 py-7 min-w-60'>
          <p className='font-mono text-[10px] font-bold tracking-[0.2em] text-primary'>
            DEPARTURE IN
          </p>
          <div className='flex items-center gap-6'>
            <CountdownUnit val={NEXT_TRIP.countdownDays} label='DAYS' />
            <CountdownUnit val={NEXT_TRIP.countdownHrs} label='HRS' />
            <CountdownUnit val={NEXT_TRIP.countdownMins} label='MINS' />
          </div>
          <Link
            href='/dashboard/bookings'
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-[14px] font-bold text-primary-foreground transition-opacity hover:opacity-90'
          >
            View Booking
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
