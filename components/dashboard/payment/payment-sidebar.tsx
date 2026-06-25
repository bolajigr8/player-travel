'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  ArrowRight,
  Lock,
  Shield,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react'

const R = 72
const C = 2 * Math.PI * R

const SEGMENTS = [
  {
    label: 'Flights',
    pct: 53,
    amount: '€547.00',
    color: 'hsl(var(--primary))',
    rotation: -90,
  },
  {
    label: 'Stays',
    pct: 41,
    amount: '€420.00',
    color: '#C084FC',
    rotation: -90 + 53 * 3.6,
  },
  {
    label: 'eSIM',
    pct: 2,
    amount: '€21.98',
    color: '#34D399',
    rotation: -90 + 94 * 3.6,
  },
  {
    label: 'Other',
    pct: 4,
    amount: '€40.00',
    color: '#4B5563',
    rotation: -90 + 96 * 3.6,
  },
]

function SpendingDonut() {
  return (
    <div className='relative mx-auto flex h-42.5 w-42.5 items-center justify-center'>
      <svg
        viewBox='0 0 200 200'
        width='170'
        height='170'
        className='absolute inset-0'
      >
        <circle
          cx='100'
          cy='100'
          r={R}
          fill='none'
          stroke='currentColor'
          strokeWidth='26'
          className='text-muted/20'
        />
        {SEGMENTS.map((seg) => (
          <circle
            key={seg.label}
            cx='100'
            cy='100'
            r={R}
            fill='none'
            stroke={seg.color}
            strokeWidth='26'
            strokeDasharray={`${C * (seg.pct / 100) - 4} ${C}`}
            transform={`rotate(${seg.rotation} 100 100)`}
            strokeLinecap='butt'
          />
        ))}
      </svg>
      <div className='relative z-10 text-center'>
        <p className='font-heading text-[17px] font-bold leading-tight text-foreground dark:text-primary'>
          €1,028.98
        </p>
        <p className='font-mono text-[10px] text-muted-foreground mt-0.5'>
          Total spent
        </p>
      </div>
    </div>
  )
}

export function PaymentSidebar() {
  return (
    <div className='space-y-4'>
      {/* Spending Summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.38 }}
        className='rounded-2xl border border-border bg-card p-4 sm:p-5'
      >
        <div className='flex items-center justify-between mb-4 sm:mb-5'>
          <h2 className='font-heading text-[15px] sm:text-[17px] font-bold text-foreground dark:text-primary'>
            Spending Summary
          </h2>
          <button className='flex items-center gap-1.5 rounded-xl border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary/30 transition-colors'>
            This Year <ChevronDown className='h-3 w-3' />
          </button>
        </div>

        <SpendingDonut />

        <div className='mt-4 sm:mt-5 space-y-2.5'>
          {SEGMENTS.map((seg) => (
            <div key={seg.label} className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span
                  className='h-2.5 w-2.5 rounded-full shrink-0'
                  style={{ backgroundColor: seg.color }}
                />
                <span className='font-mono text-[11px] sm:text-[12px] text-muted-foreground'>
                  {seg.label}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='font-heading text-[12px] sm:text-[13px] font-bold text-foreground dark:text-primary'>
                  {seg.amount}
                </span>
                <span className='font-mono text-[10px] sm:text-[11px] text-muted-foreground w-7 sm:w-8 text-right'>
                  {seg.pct}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className='mt-4 sm:mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/40 px-4 py-2.5 font-heading text-[12px] sm:text-[13px] font-bold text-primary transition-colors hover:bg-primary/10'>
          View full report <ArrowRight className='h-3.5 w-3.5' />
        </button>
      </motion.div>

      {/* Payment Security */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.38 }}
        className='rounded-2xl border border-border bg-card p-4 sm:p-5'
      >
        <h2 className='font-heading text-[15px] sm:text-[17px] font-bold text-foreground dark:text-primary mb-3 sm:mb-4'>
          Payment Security
        </h2>
        <div className='space-y-3 sm:space-y-4'>
          {[
            {
              icon: Lock,
              bg: 'bg-primary/15',
              color: 'text-primary',
              title: 'Secure Checkout',
              desc: 'Your payments are encrypted and protected.',
            },
            {
              icon: Shield,
              bg: 'bg-[#60A5FA]/15',
              color: 'text-[#60A5FA]',
              title: 'Fraud Protection',
              desc: 'We monitor every transaction 24/7 for your safety.',
            },
            {
              icon: RefreshCw,
              bg: 'bg-amber-500/15',
              color: 'text-amber-400',
              title: 'Secure Refunds',
              desc: 'Refunds are processed securely to your original method.',
            },
          ].map(({ icon: Icon, bg, color, title, desc }) => (
            <div key={title} className='flex items-start gap-3'>
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${bg}`}
              >
                <Icon className={`h-3.5 w-3.5 ${color}`} />
              </div>
              <div>
                <p className='font-heading text-[12px] sm:text-[13px] font-bold text-foreground dark:text-primary'>
                  {title}
                </p>
                <p className='mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground leading-snug'>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className='mt-4 flex w-full items-center justify-center gap-2 font-heading text-[11px] sm:text-[12px] font-bold text-primary hover:opacity-80 transition-opacity py-1'>
          Learn more about security <ArrowRight className='h-3 w-3' />
        </button>
      </motion.div>

      {/* Promo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.38 }}
        className='relative overflow-hidden rounded-2xl border border-border bg-card'
      >
        <div
          className='absolute inset-0 opacity-20 dark:opacity-40'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-card/80 via-card/90 to-card/95' />

        <div className='relative z-10 p-4 sm:p-5'>
          <h3 className='font-heading text-[16px] sm:text-[18px] font-bold text-foreground dark:text-primary leading-tight'>
            Book more,
            <br />
            save more!
          </h3>
          <p className='mt-1.5 text-[11px] sm:text-[12px] text-muted-foreground leading-snug'>
            Get exclusive member deals on flights, stays and more.
          </p>
          <div className='mt-3 sm:mt-4 space-y-2'>
            {[
              'Member-only discounts',
              'Early access to offers',
              'Save on every trip',
            ].map((item) => (
              <div key={item} className='flex items-center gap-2'>
                <CheckCircle2 className='h-4 w-4 shrink-0 text-primary' />
                <span className='font-mono text-[10px] sm:text-[11px] text-muted-foreground'>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <Link
            href='/dashboard/trips'
            className='mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 sm:px-5 py-2.5 font-heading text-[12px] sm:text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'
          >
            Explore Deals <ArrowRight className='h-3.5 w-3.5' />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
