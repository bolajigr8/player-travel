'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  ChevronRight,
  Plane,
  BedDouble,
  Wifi,
  Car,
  Headphones,
  Star,
  ArrowRight,
  Edit,
  Shield,
  Bell,
  CreditCard,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type TripTab = 'Flights' | 'Stays' | 'eSIM' | 'Transfers'

const FLIGHTS = [
  {
    id: 1,
    badge: 'Best Value',
    badgeCls: 'text-primary border-primary/40 bg-primary/10',
    airline: 'Emirates',
    color: '#C41E3A',
    initials: 'EK',
    depart: '08:35',
    arrive: '19:05',
    origin: 'LHR',
    dest: 'DXB',
    stops: 'Direct',
    duration: '7h 30m',
    price: 358,
  },
  {
    id: 2,
    badge: 'Fastest',
    badgeCls: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
    airline: 'British Airways',
    color: '#1C2B5B',
    initials: 'BA',
    depart: '10:20',
    arrive: '21:40',
    origin: 'LHR',
    dest: 'DXB',
    stops: 'Direct',
    duration: '7h 20m',
    price: 412,
  },
  {
    id: 3,
    badge: 'Cheapest',
    badgeCls: 'text-orange-400 border-orange-400/40 bg-orange-400/10',
    airline: 'Turkish Airlines',
    color: '#E81932',
    initials: 'TK',
    depart: '06:15',
    arrive: '23:10',
    origin: 'LHR',
    dest: 'DXB',
    stops: '1 stop',
    duration: '10h 55m',
    price: 289,
  },
]

const HOTELS = [
  {
    id: 1,
    badge: 'Popular',
    badgeCls: 'text-primary border-primary/40 bg-primary/10',
    name: 'The Grand Plaza',
    rating: 4.8,
    reviews: 2104,
    distance: '15 min to city centre',
    price: 210,
    img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80',
  },
  {
    id: 2,
    badge: 'Best Seller',
    badgeCls: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
    name: 'Address Dubai Marina',
    rating: 4.7,
    reviews: 1876,
    distance: 'Dubai Marina · 5 min',
    price: 185,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
  },
  {
    id: 3,
    badge: 'Great Value',
    badgeCls: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
    name: 'Premier Inn Dubai',
    rating: 4.4,
    reviews: 932,
    distance: '10 min to beach',
    price: 95,
    img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&q=80',
  },
]

const ESIM_PLANS = [
  {
    id: 1,
    country: 'UAE',
    flag: '🇦🇪',
    data: '10GB',
    days: 15,
    price: 8.99,
    badge: 'Popular',
  },
  {
    id: 2,
    country: 'Europe',
    flag: '🇪🇺',
    data: '15GB',
    days: 30,
    price: 12.99,
    badge: 'Best Value',
  },
  {
    id: 3,
    country: 'Global',
    flag: '🌍',
    data: '5GB',
    days: 15,
    price: 14.99,
    badge: 'Flexible',
  },
]

const TRANSFERS = [
  {
    id: 1,
    title: 'Dubai Airport → Hotel',
    sub: 'Private car · Up to 4 passengers',
    price: 28,
    duration: '35 min',
  },
  {
    id: 2,
    title: 'Hotel → Dubai Airport',
    sub: 'Private car · Up to 4 passengers',
    price: 28,
    duration: '35 min',
  },
  {
    id: 3,
    title: 'Airport → Burj Khalifa',
    sub: 'Shared shuttle · Economy',
    price: 12,
    duration: '50 min',
  },
]

const ADD_ONS = [
  {
    icon: Wifi,
    label: 'eSIM',
    sub: 'Stay connected anywhere',
    price: '€8.99',
    cta: 'Get eSIM',
  },
  {
    icon: Car,
    label: 'Airport Transfer',
    sub: 'Hassle-free ride to hotel',
    price: '€28',
    cta: 'Book Now',
  },
  {
    icon: Shield,
    label: 'Travel Insurance',
    sub: 'Travel with peace of mind',
    price: '€12',
    cta: 'Get Covered',
  },
  {
    icon: Star,
    label: 'Lounge Access',
    sub: 'Relax before your flight',
    price: '€45',
    cta: 'Add Now',
  },
]

const TRUST = [
  { label: 'Secure Payments', sub: 'Your payment is safe and protected' },
  { label: 'Best Price Guarantee', sub: "Found a lower price? We'll match it" },
  { label: '24/7 Support', sub: "We're here anytime you need us" },
  { label: 'Trusted Partners', sub: 'We work with top airlines and hotels' },
]

const QUICK_ACTIONS = [
  { icon: Search, label: 'Search Flights', sub: 'Find the best deals' },
  { icon: BedDouble, label: 'Browse Stays', sub: 'Hotels and apartments' },
  { icon: Bell, label: 'Price Alerts', sub: 'Get notified on price drops' },
  { icon: CreditCard, label: 'Payment Methods', sub: 'Manage your cards' },
]

function TripHero({
  activeTab,
  setActiveTab,
}: {
  activeTab: TripTab
  setActiveTab: (t: TripTab) => void
}) {
  const TABS: { key: TripTab; Icon: React.ElementType }[] = [
    { key: 'Flights', Icon: Plane },
    { key: 'Stays', Icon: BedDouble },
    { key: 'eSIM', Icon: Wifi },
    { key: 'Transfers', Icon: Car },
  ]

  return (
    <div className='space-y-4'>
      {/* Match hero panel */}
      <div className='relative overflow-hidden rounded-2xl border border-border bg-card p-5'>
        <div
          className='pointer-events-none absolute inset-0 opacity-0 dark:opacity-20'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=40)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent' />

        <div className='relative z-10'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='font-mono text-[11px] tracking-widest text-primary'>
                PLAN YOUR TRIP
              </p>
              <h2 className='mt-1 font-heading text-xl sm:text-2xl font-bold text-foreground dark:text-primary'>
                Where are you going?
              </h2>
              <p className='mt-1 text-[12px] sm:text-[13px] text-muted-foreground'>
                Search flights, stays, eSIM and transfers for your next
                adventure.
              </p>
            </div>
            <div className='flex items-center gap-3 text-[12px] sm:text-[13px] text-muted-foreground'>
              <div className='flex items-center gap-1.5'>
                <MapPin className='h-4 w-4 text-primary' />
                Dubai, UAE
              </div>
              <span className='h-4 w-px bg-border' />
              <span>18 – 25 Jun 2025</span>
              <span className='h-4 w-px bg-border' />
              <span>1 Traveller</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex overflow-x-auto border-b border-border [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]'>
        {TABS.map(({ key, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 px-4 py-3 font-heading text-[13px] font-semibold transition-colors',
              activeTab === key
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className='h-3.5 w-3.5' />
            {key}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className='rounded-2xl border border-border bg-card p-4'>
        <div className='flex flex-wrap items-center gap-4'>
          <div>
            <div className='flex items-center gap-2 font-heading text-[13px] font-bold text-foreground dark:text-primary'>
              London (LHR) <ArrowRight className='h-3.5 w-3.5 text-primary' />{' '}
              Dubai (DXB)
            </div>
            <div className='mt-0.5 flex gap-2 font-mono text-[10px] text-muted-foreground'>
              <span>Heathrow</span>
              <span>·</span>
              <span>Dubai International</span>
            </div>
          </div>
          <span className='h-8 w-px bg-border' />
          <div>
            <p className='font-heading text-[12px] font-semibold text-foreground dark:text-primary'>
              18 – 25 Jun
            </p>
            <p className='font-mono text-[10px] text-muted-foreground'>
              7 Nights
            </p>
          </div>
          <span className='h-8 w-px bg-border' />
          <div>
            <p className='font-heading text-[12px] font-semibold text-foreground dark:text-primary'>
              1 Traveller
            </p>
            <p className='font-mono text-[10px] text-muted-foreground'>
              Economy
            </p>
          </div>
          <button className='ml-auto flex items-center gap-1.5 rounded-xl border border-primary px-3 py-1.5 font-heading text-[12px] font-bold text-primary transition-colors hover:bg-primary/10'>
            <Edit className='h-3.5 w-3.5' /> Edit Search
          </button>
        </div>
      </div>
    </div>
  )
}

function TripListings({ activeTab }: { activeTab: TripTab }) {
  return (
    <div className='space-y-8'>
      {/* ── Flights ── */}
      {activeTab === 'Flights' && (
        <section className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='font-heading text-[16px] font-bold text-foreground dark:text-primary'>
              Recommended Flights
            </h2>
            <button className='flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground'>
              View all <ArrowRight className='h-3 w-3' />
            </button>
          </div>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
            {FLIGHTS.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                className='rounded-2xl border border-border bg-card p-4'
              >
                <span
                  className={cn(
                    'inline-block rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold',
                    f.badgeCls,
                  )}
                >
                  {f.badge}
                </span>
                <div className='mt-3 flex items-center gap-2.5'>
                  <div
                    className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-[11px] font-bold text-white'
                    style={{ backgroundColor: f.color }}
                  >
                    {f.initials}
                  </div>
                  <p className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                    {f.airline}
                  </p>
                </div>
                <div className='mt-4 flex items-center justify-between'>
                  <div>
                    <p className='font-heading text-xl font-bold text-foreground dark:text-primary'>
                      {f.depart}
                    </p>
                    <p className='font-mono text-[10px] text-muted-foreground'>
                      {f.origin}
                    </p>
                  </div>
                  <div className='flex flex-col items-center gap-0.5'>
                    <p className='font-mono text-[9px] text-muted-foreground'>
                      {f.stops}
                    </p>
                    <div className='flex items-center gap-1'>
                      <div className='h-px w-7 bg-border' />
                      <Plane className='h-3 w-3 text-primary' />
                      <div className='h-px w-7 bg-border' />
                    </div>
                    <p className='font-mono text-[9px] text-muted-foreground'>
                      {f.duration}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-heading text-xl font-bold text-foreground dark:text-primary'>
                      {f.arrive}
                    </p>
                    <p className='font-mono text-[10px] text-muted-foreground'>
                      {f.dest}
                    </p>
                  </div>
                </div>
                <div className='mt-4 border-t border-border pt-3'>
                  <p className='font-mono text-[10px] text-muted-foreground'>
                    From
                  </p>
                  <p className='font-heading text-xl font-bold text-foreground dark:text-primary'>
                    €{f.price}{' '}
                    <span className='font-mono text-[10px] font-normal text-muted-foreground'>
                      per person
                    </span>
                  </p>
                  <button className='mt-3 w-full rounded-xl bg-primary py-2.5 font-heading text-[12px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Stays ── */}
      {activeTab === 'Stays' && (
        <section className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='font-heading text-[16px] font-bold text-foreground dark:text-primary'>
              Recommended Stays
            </h2>
            <button className='flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground'>
              View all <ArrowRight className='h-3 w-3' />
            </button>
          </div>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
            {HOTELS.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                className='overflow-hidden rounded-2xl border border-border bg-card'
              >
                <div className='relative h-40'>
                  <Image
                    src={h.img}
                    alt={h.name}
                    fill
                    sizes='(max-width: 640px) 100vw, 33vw'
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-card/60 to-transparent' />
                  <span
                    className={cn(
                      'absolute left-2 top-2 rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold backdrop-blur-sm',
                      h.badgeCls,
                    )}
                  >
                    {h.badge}
                  </span>
                </div>
                <div className='p-4'>
                  <p className='font-heading text-[14px] font-bold text-foreground dark:text-primary'>
                    {h.name}
                  </p>
                  <div className='mt-1.5 flex items-center gap-1'>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={cn(
                          'h-3 w-3',
                          j < Math.floor(h.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-muted text-muted',
                        )}
                      />
                    ))}
                    <span className='ml-1 font-mono text-[10px] text-foreground dark:text-primary'>
                      {h.rating}
                    </span>
                    <span className='font-mono text-[10px] text-muted-foreground'>
                      ({h.reviews.toLocaleString()})
                    </span>
                  </div>
                  <p className='mt-1 text-[11px] text-muted-foreground'>
                    {h.distance}
                  </p>
                  <div className='mt-3 flex items-center justify-between'>
                    <div>
                      <p className='font-mono text-[9px] text-muted-foreground'>
                        From
                      </p>
                      <p className='font-heading text-base font-bold text-foreground dark:text-primary'>
                        €{h.price}
                        <span className='font-mono text-[10px] font-normal text-muted-foreground'>
                          /night
                        </span>
                      </p>
                    </div>
                    <button className='rounded-xl bg-primary px-3 py-2 font-heading text-[11px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                      View Hotel
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── eSIM ── */}
      {activeTab === 'eSIM' && (
        <section className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='font-heading text-[16px] font-bold text-foreground dark:text-primary'>
              eSIM Plans
            </h2>
            <button className='flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground'>
              View all plans <ArrowRight className='h-3 w-3' />
            </button>
          </div>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
            {ESIM_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className='rounded-2xl border border-border bg-card p-5'
              >
                <div className='flex items-start justify-between'>
                  <div>
                    <span className='text-3xl'>{plan.flag}</span>
                    <p className='mt-2 font-heading text-[15px] font-bold text-foreground dark:text-primary'>
                      {plan.country}
                    </p>
                  </div>
                  <span className='rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[9px] font-bold text-primary'>
                    {plan.badge}
                  </span>
                </div>
                <div className='mt-4 grid grid-cols-2 gap-2 text-[11px]'>
                  <div>
                    <p className='text-muted-foreground'>Data</p>
                    <p className='font-heading font-bold text-foreground dark:text-primary'>
                      {plan.data}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Validity</p>
                    <p className='font-heading font-bold text-foreground dark:text-primary'>
                      {plan.days} days
                    </p>
                  </div>
                </div>
                <div className='mt-4 flex items-center justify-between'>
                  <p className='font-heading text-xl font-bold text-foreground dark:text-primary'>
                    €{plan.price}
                  </p>
                  <button className='rounded-xl bg-primary px-3 py-2 font-heading text-[11px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                    Get eSIM
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Transfers ── */}
      {activeTab === 'Transfers' && (
        <section className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='font-heading text-[16px] font-bold text-foreground dark:text-primary'>
              Airport Transfers
            </h2>
            <button className='flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground'>
              View all <ArrowRight className='h-3 w-3' />
            </button>
          </div>
          <div className='space-y-3'>
            {TRANSFERS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className='flex items-center gap-4 rounded-2xl border border-border bg-card p-4'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#60A5FA]/15'>
                  <Car className='h-5 w-5 text-[#60A5FA]' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                    {t.title}
                  </p>
                  <p className='text-[11px] text-muted-foreground'>{t.sub}</p>
                  <p className='font-mono text-[10px] text-muted-foreground'>
                    {t.duration}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-heading text-[15px] font-bold text-foreground dark:text-primary'>
                    €{t.price}
                  </p>
                  <button className='mt-1 rounded-lg bg-primary px-3 py-1.5 font-heading text-[11px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                    Book
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Add-ons (shown for all tabs) ── */}
      <section className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h2 className='font-heading text-[16px] font-bold text-foreground dark:text-primary'>
            Travel Add-ons
          </h2>
          <button className='flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground'>
            View all <ArrowRight className='h-3 w-3' />
          </button>
        </div>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {ADD_ONS.map(({ icon: Icon, label, sub, price, cta }) => (
            <div
              key={label}
              className='rounded-2xl border border-border bg-card p-4'
            >
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10'>
                <Icon className='h-5 w-5 text-primary' />
              </div>
              <p className='mt-3 font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                {label}
              </p>
              <p className='mt-0.5 text-[11px] text-muted-foreground'>{sub}</p>
              <p className='mt-2 font-mono text-[10px] text-muted-foreground'>
                From
              </p>
              <p className='font-heading text-sm font-bold text-foreground dark:text-primary'>
                {price}
              </p>
              <button className='mt-2 flex items-center gap-1 font-heading text-[11px] font-bold text-primary'>
                {cta} <ArrowRight className='h-3 w-3' />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bundle & Save ── */}
      <div className='relative overflow-hidden rounded-2xl border border-border bg-card p-6'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent' />
        <div
          className='absolute inset-0 opacity-5 dark:opacity-15'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=40)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className='relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h3 className='font-heading text-xl font-bold text-foreground dark:text-primary'>
              Bundle & Save More ✨
            </h3>
            <p className='mt-1 text-[13px] text-muted-foreground'>
              Book your flight + hotel together and save up to{' '}
              <span className='font-bold text-primary'>15%</span>
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/50'>
              <Plane className='h-5 w-5 text-foreground dark:text-primary' />
            </div>
            <span className='font-bold text-primary text-lg'>+</span>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/50'>
              <BedDouble className='h-5 w-5 text-foreground dark:text-primary' />
            </div>
            <span className='font-bold text-primary text-lg'>=</span>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10'>
              <span className='text-lg'>🏷️</span>
            </div>
          </div>
          <button className='flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-heading text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
            View Bundle Deals <ArrowRight className='h-4 w-4' />
          </button>
        </div>
      </div>

      {/* ── Trust badges ── */}
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {TRUST.map(({ label, sub }) => (
          <div
            key={label}
            className='flex items-start gap-2.5 rounded-xl border border-border bg-card p-3'
          >
            <div className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-[10px] font-bold text-primary'>
              ✓
            </div>
            <div>
              <p className='font-heading text-[11px] font-bold text-foreground dark:text-primary'>
                {label}
              </p>
              <p className='mt-0.5 text-[10px] text-muted-foreground'>{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TripSidebar() {
  const TRIP_ITEMS = [
    { Icon: Plane, label: 'Flight', status: 'Confirmed' },
    { Icon: BedDouble, label: 'Hotel', status: 'Confirmed' },
    { Icon: Wifi, label: 'eSIM', status: 'Ready' },
    { Icon: Car, label: 'Transfers', status: 'Not added' },
  ]

  return (
    <aside className='space-y-4'>
      {/* Your Trip */}
      <div className='overflow-hidden rounded-2xl border border-border bg-card'>
        <div className='relative h-36'>
          <Image
            src='https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80'
            alt='Dubai'
            fill
            sizes='280px'
            className='object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-card/95 via-card/30 to-transparent' />
          <div className='absolute bottom-3 left-3'>
            <p className='font-heading text-sm font-bold text-foreground dark:text-primary'>
              Dubai
            </p>
            <p className='font-mono text-[10px] text-muted-foreground'>
              18 Jun – 25 Jun 2025 · 7 Nights
            </p>
          </div>
        </div>
        <div className='p-4'>
          <h3 className='font-heading text-[14px] font-bold text-foreground dark:text-primary'>
            Your Trip
          </h3>
          <div className='mt-3 space-y-2.5'>
            {TRIP_ITEMS.map(({ Icon, label, status }) => (
              <div key={label} className='flex items-center gap-2'>
                <Icon className='h-3.5 w-3.5 text-muted-foreground' />
                <span className='flex-1 text-[12px] text-foreground dark:text-primary'>
                  {label}
                </span>
                <span
                  className={cn(
                    'font-mono text-[10px]',
                    status === 'Not added'
                      ? 'text-muted-foreground'
                      : 'text-primary',
                  )}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
          <button className='mt-4 flex w-full items-center justify-center rounded-xl border border-border py-2.5 font-heading text-[12px] font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary'>
            View Itinerary
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='rounded-2xl border border-border bg-card p-4'>
        <h3 className='font-heading text-[14px] font-bold text-foreground dark:text-primary'>
          Quick Actions
        </h3>
        <div className='mt-3 space-y-1'>
          {QUICK_ACTIONS.map(({ icon: Icon, label, sub }) => (
            <button
              key={label}
              className='flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-muted/40'
            >
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                <Icon className='h-3.5 w-3.5 text-primary' />
              </div>
              <div className='flex-1'>
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

      {/* Exclusive deals */}
      <div className='overflow-hidden rounded-2xl border border-border bg-card'>
        <div
          className='relative h-24'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-card/90' />
        </div>
        <div className='p-4'>
          <p className='font-mono text-[10px] font-bold tracking-widest text-primary'>
            Exclusive for members!
          </p>
          <p className='mt-1 font-heading text-[13px] font-bold text-foreground dark:text-primary'>
            Get special travel deals only for Golafly members.
          </p>
          <button className='mt-3 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-heading text-[12px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
            Explore Deals <ArrowRight className='h-3.5 w-3.5' />
          </button>
        </div>
      </div>

      {/* Need help */}
      <div className='rounded-2xl border border-border bg-card p-4'>
        <p className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
          Need help with your trip?
        </p>
        <p className='mt-0.5 text-[11px] text-muted-foreground'>
          Our travel experts are available 24/7.
        </p>
        <button className='mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 font-heading text-[12px] font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary'>
          <Headphones className='h-4 w-4' /> Contact Support
        </button>
      </div>
    </aside>
  )
}

export function TripsClient() {
  const [activeTab, setActiveTab] = useState<TripTab>('Flights')

  return (
    <div className='p-4 sm:p-6'>
      <div className='mb-5 sm:mb-6'>
        <h1 className='font-heading text-[26px] sm:text-[36px] font-bold leading-tight text-foreground dark:text-primary'>
          Trips
        </h1>
        <p className='mt-1 text-[12px] sm:text-[14px] text-muted-foreground'>
          Everything you need for your next adventure.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]'>
        <div className='space-y-6'>
          <TripHero activeTab={activeTab} setActiveTab={setActiveTab} />
          <TripListings activeTab={activeTab} />
        </div>
        <TripSidebar />
      </div>
    </div>
  )
}
