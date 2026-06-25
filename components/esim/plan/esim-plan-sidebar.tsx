'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { EsimPackage } from '@/features/esim/types'

const FAQS = [
  {
    q: 'Is my phone compatible with eSIM?',
    a: 'Most phones released since 2019 support eSIM (iPhone XS and newer, Google Pixel 3+, recent Samsung Galaxy). Make sure your device is eSIM-capable and carrier-unlocked.',
  },
  {
    q: 'When does my plan start?',
    a: 'Your plan starts when you first connect to the network at your destination. It does not start when you install the eSIM.',
  },
  {
    q: 'Can I keep my regular number?',
    a: 'Yes. The eSIM works alongside your existing SIM. Your regular number stays active for calls and texts.',
  },
  {
    q: 'Do I get a phone number with the eSIM?',
    a: 'No. The eSIM provides data only. You keep your regular number on your existing SIM for calls and texts.',
  },
  {
    q: 'What happens when my data runs out?',
    a: 'Your data connection will stop. You can purchase a top-up or a new plan through the website.',
  },
]

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      <button
        onClick={() => setOpen((o) => !o)}
        className='flex w-full items-center justify-between px-5 py-4 text-left text-sm font-bold'
      >
        {q}
        {open ? (
          <ChevronUp className='size-4 shrink-0 text-muted-foreground' />
        ) : (
          <ChevronDown className='size-4 shrink-0 text-muted-foreground' />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.22 }}
            className='overflow-hidden'
          >
            <p className='px-5 pb-4 text-sm text-muted-foreground'>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function EsimFaqSection() {
  return (
    <section className='pb-12'>
      <h2 className='mb-4 font-heading text-base font-black uppercase tracking-wide'>
        Frequently Asked Questions
      </h2>
      <div className='space-y-2'>
        {FAQS.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  )
}

export function PlanRow({
  pkg,
  selected,
  onSelect,
}: {
  pkg: EsimPackage
  selected: boolean
  onSelect: () => void
}) {
  const ppd =
    pkg.validity_days > 0 ? (pkg.price / pkg.validity_days).toFixed(2) : null
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-200',
        selected
          ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]'
          : 'border-border bg-card hover:border-primary/40',
      )}
    >
      <div
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          selected ? 'border-primary bg-primary' : 'border-muted-foreground/40',
        )}
      >
        {selected && (
          <div className='size-2 rounded-full bg-primary-foreground' />
        )}
      </div>
      <div className='min-w-0 flex-1'>
        <p className='text-sm font-bold'>
          {pkg.unlimited ? 'Unlimited' : pkg.data}
        </p>
        <p className='truncate text-[12px] text-muted-foreground'>
          {pkg.validity_days} Days · 5G/4G · {pkg.operator}
        </p>
      </div>
      <div className='shrink-0 text-right'>
        <p className='font-heading font-bold text-primary'>
          €{pkg.price.toFixed(2)}
        </p>
        {ppd && (
          <p className='font-mono text-[10px] text-muted-foreground'>
            €{ppd}/DAY
          </p>
        )}
      </div>
    </button>
  )
}

export function PlanSidebar({
  pkg,
  onBuy,
  country,
}: {
  pkg: EsimPackage | null
  onBuy: () => void
  country: string
}) {
  if (!pkg) return null

  function handleSave() {
    toast.success('Plan saved!', {
      description: `${pkg!.country} ${pkg!.data} saved to your list.`,
    })
  }

  function handleShare() {
    const url = `${window.location.origin}/esim/plan?id=${pkg!.package_id}&destination=${country}`
    navigator.clipboard
      .writeText(url)
      .then(() =>
        toast.success('Link copied!', {
          description: 'Plan link copied to clipboard.',
        }),
      )
      .catch(() => toast.error('Could not copy link.'))
  }

  return (
    <div
      className='overflow-hidden rounded-2xl border border-border bg-card'
      style={{ minWidth: 300 }}
    >
      <div className='border-b border-border px-5 py-3.5'>
        <p className='font-mono text-[11px] font-bold uppercase tracking-wider text-primary'>
          {pkg.country} · {pkg.data}
        </p>
      </div>
      <div className='space-y-4 p-5'>
        <div className='flex items-baseline gap-2.5'>
          <span className='font-heading text-4xl font-black'>
            €{pkg.price.toFixed(2)}
          </span>
          <span className='font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
            One-Time
          </span>
        </div>

        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>
              {pkg.data} · {pkg.validity_days} Days
            </span>
            <span className='font-medium'>€{pkg.price.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Delivery</span>
            <span className='font-bold text-primary'>Instant</span>
          </div>
        </div>

        <div className='border-t border-border' />

        <div className='flex items-center justify-between'>
          <span className='font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            Total
          </span>
          <span className='font-heading text-xl font-black text-primary'>
            €{pkg.price.toFixed(2)}
          </span>
        </div>

        <motion.button
          onClick={onBuy}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className='w-full rounded-xl bg-primary py-4 font-mono text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-shadow hover:shadow-[0_0_28px_hsl(var(--primary)/0.55)]'
        >
          Buy eSIM →
        </motion.button>

        <div className='flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground'>
          <Zap className='size-3 text-primary' />
          Instant delivery — QR code sent to your email
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <button
            onClick={handleSave}
            className='rounded-lg border border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground'
          >
            ♡ Save
          </button>
          <button
            onClick={handleShare}
            className='rounded-lg border border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground'
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
