'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Star,
  Trash2,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Check,
  Plane,
  BedDouble,
  Wifi,
  Gift,
} from 'lucide-react'
import { INBOX_MESSAGES, type InboxMessage } from '@/store/dashboard'
import {
  InboxLeftPanel,
  type InboxTab,
} from '@/components/dashboard/inbox/inbox-left-panel'
import { InboxRightSidebar } from '@/components/dashboard/inbox/inbox-right-sidebar'

const BODY_LIMIT = 200

export function InboxClient() {
  const [activeTab, setActiveTab] = useState<InboxTab>('All')
  const [selectedMsg, setSelectedMsg] = useState<InboxMessage>(
    INBOX_MESSAGES[0],
  )
  const [expanded, setExpanded] = useState(false)
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list')

  useEffect(() => {
    setExpanded(false)
  }, [selectedMsg.id])

  const body = selectedMsg.preview ?? ''
  const isLong = body.length > BODY_LIMIT
  const display = expanded ? body : body.slice(0, BODY_LIMIT)

  function handleSelectMsg(msg: InboxMessage) {
    setSelectedMsg(msg)
    setMobileView('detail')
  }

  return (
    <div className='flex flex-col'>
      {/* Page header */}
      <div className='border-b border-border px-4 sm:px-6 py-4 sm:py-5'>
        <h1 className='font-heading text-xl sm:text-2xl font-bold text-foreground dark:text-primary'>
          Inbox
        </h1>
        <p className='mt-1 text-[12px] sm:text-[13px] text-muted-foreground'>
          All your booking updates, travel tips and offers in one place.
        </p>
      </div>

      <div className='flex items-start'>
        {/* Column 1 — message list */}
        <div
          className={[
            'shrink-0 border-r border-border',
            'md:block md:w-72',
            mobileView === 'list' ? 'block w-full' : 'hidden',
          ].join(' ')}
        >
          <InboxLeftPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedMsg={selectedMsg}
            setSelectedMsg={handleSelectMsg}
          />
        </div>

        {/* Column 2 — message detail */}
        <motion.div
          key={selectedMsg.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={[
            'min-w-0 border-r border-border',
            'md:block md:flex-1',
            mobileView === 'detail' ? 'block w-full' : 'hidden',
          ].join(' ')}
        >
          {/* Toolbar */}
          <div className='flex items-center border-b border-border px-4 sm:px-5 py-3 gap-2'>
            <button
              onClick={() => setMobileView('list')}
              className='flex items-center gap-1 rounded-lg px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden'
            >
              <ChevronLeft className='h-4 w-4' />
              <span className='font-heading text-[12px] font-semibold'>
                Back
              </span>
            </button>
            <div className='flex items-center gap-2 ml-auto md:ml-0'>
              <button className='rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground'>
                <Star className='h-4 w-4' />
              </button>
              <button className='rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground'>
                <Trash2 className='h-4 w-4' />
              </button>
              <button className='rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground'>
                <MoreHorizontal className='h-4 w-4' />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='p-4 sm:p-6'>
            <h2 className='font-heading text-lg sm:text-xl font-bold text-foreground dark:text-primary'>
              {selectedMsg.title}
            </h2>
            <p className='mt-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground'>
              {selectedMsg.date} · {selectedMsg.time}
            </p>

            {/* Flight check-in card */}
            {selectedMsg.type === 'flight' && (
              <div className='mt-4 overflow-hidden rounded-2xl border border-border bg-card'>
                <div className='flex items-center justify-center gap-6 py-5 bg-muted dark:bg-[#0d1a0d]'>
                  <div className='flex flex-col items-center gap-1.5'>
                    <div
                      className='flex h-12 w-12 items-center justify-center rounded-full font-heading text-lg font-bold text-white shadow-lg'
                      style={{ backgroundColor: '#C41E3A' }}
                    >
                      EK
                    </div>
                    <span className='font-heading text-[11px] font-bold text-foreground dark:text-primary'>
                      LHR
                    </span>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <Plane className='h-5 w-5 text-primary' />
                    <span className='font-mono text-[9px] text-muted-foreground'>
                      Emirates
                    </span>
                  </div>
                  <div className='flex flex-col items-center gap-1.5'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/30'>
                      <span className='text-lg'>🇦🇪</span>
                    </div>
                    <span className='font-heading text-[11px] font-bold text-foreground dark:text-primary'>
                      DXB
                    </span>
                  </div>
                </div>
                <div className='p-4'>
                  <p className='font-mono text-[10px] text-muted-foreground'>
                    Emirates · EK882
                  </p>
                  <p className='font-heading text-[14px] sm:text-base font-bold text-foreground dark:text-primary'>
                    London Heathrow → Dubai International
                  </p>
                  <div className='mt-2 grid grid-cols-1 gap-1 text-[11px] text-muted-foreground sm:grid-cols-2'>
                    <span>📅 Wed, 18 Jun 2025 · 08:35</span>
                    <span>📍 Terminal 3, Heathrow</span>
                  </div>
                  <button className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-heading text-[12px] sm:text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                    Check In Now <Plane className='h-4 w-4' />
                  </button>
                </div>
              </div>
            )}

            {/* Stay confirmation card */}
            {selectedMsg.type === 'stay' && (
              <div className='mt-4 overflow-hidden rounded-2xl border border-border bg-card'>
                <div className='flex items-center justify-center gap-4 py-5 bg-muted dark:bg-[#0d1a0d]'>
                  <BedDouble className='h-10 w-10 text-[#C084FC]' />
                </div>
                <div className='p-4'>
                  <p className='font-mono text-[10px] text-muted-foreground'>
                    Hotel Booking
                  </p>
                  <p className='font-heading text-[14px] sm:text-base font-bold text-foreground dark:text-primary'>
                    The Grand Plaza, Dubai
                  </p>
                  <div className='mt-2 grid grid-cols-1 gap-1 text-[11px] text-muted-foreground sm:grid-cols-2'>
                    <span>📅 Check-in: 18 Jun 2025</span>
                    <span>📅 Check-out: 25 Jun 2025</span>
                  </div>
                  <button className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-heading text-[12px] sm:text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                    View Booking Details
                  </button>
                </div>
              </div>
            )}

            {/* eSIM card */}
            {selectedMsg.type === 'esim' && (
              <div className='mt-4 overflow-hidden rounded-2xl border border-border bg-card'>
                <div className='flex items-center justify-center gap-4 py-5 bg-muted dark:bg-[#0d1a0d]'>
                  <Wifi className='h-10 w-10 text-[#34D399]' />
                </div>
                <div className='p-4'>
                  <p className='font-mono text-[10px] text-muted-foreground'>
                    eSIM Plan
                  </p>
                  <p className='font-heading text-[14px] sm:text-base font-bold text-foreground dark:text-primary'>
                    UAE eSIM · 10GB · 15 days
                  </p>
                  <div className='mt-2 text-[11px] text-muted-foreground'>
                    <span>📱 5G · LTE · Valid from 18 Jun 2025</span>
                  </div>
                  <button className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-heading text-[12px] sm:text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                    Install eSIM <Wifi className='h-4 w-4' />
                  </button>
                </div>
              </div>
            )}

            {/* Message body */}
            <div className='mt-5 space-y-3'>
              <p className='font-heading text-sm text-foreground dark:text-primary'>
                Hi {selectedMsg.type === 'welcome' ? 'there' : 'Alex'},
              </p>
              <p className='text-[12px] sm:text-[13px] leading-relaxed text-muted-foreground'>
                {display}
                {isLong && !expanded && '...'}
              </p>
              {isLong && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className='font-heading text-[12px] font-bold text-primary hover:underline'
                >
                  {expanded ? 'See less' : 'See more'}
                </button>
              )}
              {(selectedMsg.type === 'flight' ||
                selectedMsg.type === 'stay') && (
                <>
                  <p className='pt-1 font-heading text-[12px] sm:text-[13px] font-bold text-foreground dark:text-primary'>
                    What's included:
                  </p>
                  {[
                    'Booking confirmation & reference',
                    'Full itinerary details',
                    'Check-in instructions',
                    'Support contact information',
                  ].map((item) => (
                    <div
                      key={item}
                      className='flex items-center gap-2 text-[11px] sm:text-[12px] text-foreground dark:text-primary'
                    >
                      <Check className='h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary' />
                      {item}
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Add-on CTA */}
            <div className='mt-6 overflow-hidden rounded-2xl border border-border bg-muted dark:bg-[#0d1a0d]'>
              <div className='flex items-center gap-4 p-4'>
                <div className='flex-1'>
                  <p className='font-heading text-[12px] sm:text-[13px] font-bold text-foreground dark:text-primary'>
                    Complete your trip
                  </p>
                  <p className='mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground'>
                    Add transfers, insurance and more.
                  </p>
                  <Link
                    href='/dashboard/trips'
                    className='mt-2 inline-flex items-center gap-1 font-heading text-[11px] sm:text-[12px] font-bold text-primary'
                  >
                    Explore Add-ons <ChevronRight className='h-3.5 w-3.5' />
                  </Link>
                </div>
                <div className='flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-xl bg-primary/10'>
                  <Gift className='h-8 w-8 text-primary' />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Column 3 — right sidebar */}
        <InboxRightSidebar />
      </div>

      {/* Bottom banner */}
      <div className='border-t border-border bg-muted dark:bg-[#0d1a0d]'>
        <div className='relative overflow-hidden px-4 sm:px-6 py-4 sm:py-3'>
          <div
            className='pointer-events-none absolute inset-y-0 right-0 w-40 sm:w-56 opacity-50'
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=60)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className='pointer-events-none absolute inset-y-0 right-0 w-56 sm:w-72 bg-gradient-to-l from-transparent to-muted dark:to-[#0d1a0d]' />
          <div className='relative z-10 flex flex-wrap items-center justify-between gap-4'>
            <div>
              <h3 className='font-heading text-[13px] sm:text-[14px] font-bold leading-snug text-foreground dark:text-primary'>
                More trips. More rewards. More adventures.
              </h3>
              <p className='mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground'>
                Book more trips and unlock exclusive perks.
              </p>
              <button className='mt-2.5 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-heading text-[11px] sm:text-[12px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                Explore Trips <ArrowRight className='h-3.5 w-3.5' />
              </button>
            </div>
            <div className='hidden sm:flex items-center gap-2'>
              {[
                { icon: Plane, label: 'Fly' },
                { icon: BedDouble, label: 'Stay' },
                { icon: Wifi, label: 'Connect' },
              ].map(({ icon: Icon, label }, i) => (
                <div key={label} className='flex items-center gap-2'>
                  <div className='flex flex-col items-center gap-1'>
                    <div className='flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border/50 bg-foreground/5 backdrop-blur-sm'>
                      <Icon className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground' />
                    </div>
                    <span className='whitespace-nowrap font-heading text-[9px] font-semibold text-muted-foreground'>
                      {label}
                    </span>
                  </div>
                  {i < 2 && (
                    <ArrowRight className='mb-3 h-3 w-3 shrink-0 text-muted-foreground' />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
