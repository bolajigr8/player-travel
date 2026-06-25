'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Star,
  ArrowRight,
  ChevronRight,
  Plane,
  BedDouble,
  Wifi,
  Gift,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DASHBOARD_USER,
  INBOX_MESSAGES,
  AVAILABLE_REWARDS,
} from '@/store/dashboard'

const INBOX_ICON_CONFIG: Record<
  string,
  { icon: React.ElementType; bg: string; color: string }
> = {
  flight: { icon: Plane, bg: 'bg-primary/15', color: 'text-primary' },
  stay: { icon: BedDouble, bg: 'bg-[#C084FC]/15', color: 'text-[#C084FC]' },
  esim: { icon: Wifi, bg: 'bg-[#34D399]/15', color: 'text-[#34D399]' },
  reward: { icon: Star, bg: 'bg-amber-500/15', color: 'text-amber-400' },
  default: { icon: Gift, bg: 'bg-muted/50', color: 'text-muted-foreground' },
}

function getIconConfig(type: string) {
  return INBOX_ICON_CONFIG[type] ?? INBOX_ICON_CONFIG.default
}

export function InboxAndRewards() {
  const unreadMessages = INBOX_MESSAGES.filter((m) => m.unread).slice(0, 3)

  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      {/* ── Inbox ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.38 }}
        className='rounded-2xl border border-border bg-card'
      >
        <div className='flex items-center justify-between px-5 pb-3 pt-5'>
          <h2 className='font-heading text-[15px] sm:text-[17px] font-bold text-foreground dark:text-primary'>
            Inbox{' '}
            <span className='ml-1 rounded-full bg-primary px-2 py-0.5 font-mono text-[10px] font-bold text-primary-foreground'>
              {INBOX_MESSAGES.filter((m) => m.unread).length}
            </span>
          </h2>
          <Link
            href='/dashboard/inbox'
            className='flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground hover:text-foreground'
          >
            View all <ChevronRight className='h-3 w-3' />
          </Link>
        </div>

        <div className='space-y-1 px-4'>
          {unreadMessages.map((msg) => {
            const cfg = getIconConfig(msg.type)
            const MsgIcon = cfg.icon
            return (
              <Link
                key={msg.id}
                href='/dashboard/inbox'
                className='flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-muted/30'
              >
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                    cfg.bg,
                  )}
                >
                  <MsgIcon className={cn('h-3.5 w-3.5', cfg.color)} />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='font-heading text-[12px] sm:text-[13px] font-bold text-foreground dark:text-primary'>
                    {msg.title}
                  </p>
                  <p className='mt-0.5 truncate text-[10px] sm:text-[11px] text-muted-foreground'>
                    {msg.preview}
                  </p>
                </div>
                <span className='shrink-0 pt-0.5 font-mono text-[10px] text-muted-foreground'>
                  {msg.date}
                </span>
              </Link>
            )
          })}
        </div>

        <div className='p-4 pt-3'>
          <Link
            href='/dashboard/inbox'
            className='flex w-full items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 font-heading text-[12px] sm:text-[13px] font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary'
          >
            See all messages <ArrowRight className='h-3.5 w-3.5' />
          </Link>
        </div>
      </motion.div>

      {/* ── Rewards ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.38 }}
        className='rounded-2xl border border-border bg-card'
      >
        <div className='flex items-center justify-between px-5 pb-3 pt-5'>
          <h2 className='font-heading text-[15px] sm:text-[17px] font-bold text-foreground dark:text-primary'>
            Your Rewards
          </h2>
          <Link
            href='/dashboard/rewards'
            className='flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground hover:text-foreground'
          >
            View all <ChevronRight className='h-3 w-3' />
          </Link>
        </div>

        <div className='grid grid-cols-2 gap-4 px-5'>
          <div>
            <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
              Your Points
            </p>
            <div className='mt-2 flex items-center gap-2'>
              <Star className='h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary' />
              <span className='font-heading text-xl sm:text-2xl font-bold text-foreground dark:text-primary'>
                {DASHBOARD_USER.points.toLocaleString()}
              </span>
            </div>
            <p className='mt-0.5 font-mono text-[10px] text-muted-foreground'>
              Points
            </p>
          </div>
          <div>
            <p className='font-mono text-[10px] tracking-wider text-muted-foreground'>
              Your Level
            </p>
            <div className='mt-2 flex items-center gap-1.5'>
              <span className='text-sm'>✈️</span>
              <span className='font-heading text-[13px] sm:text-[15px] font-bold text-foreground dark:text-primary'>
                {DASHBOARD_USER.level}
              </span>
            </div>
            <p className='mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground'>
              Keep flying!
            </p>
            <div className='mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted'>
              <div
                className='h-full rounded-full bg-primary'
                style={{
                  width: `${(DASHBOARD_USER.points / DASHBOARD_USER.totalPointsForNext) * 100}%`,
                }}
              />
            </div>
            <p className='mt-1 font-mono text-[9px] text-muted-foreground'>
              {DASHBOARD_USER.pointsToNext} pts to {DASHBOARD_USER.nextLevel}
            </p>
          </div>
        </div>

        <div className='mt-5 px-5'>
          <div className='mb-3 flex items-center justify-between'>
            <p className='font-heading text-[13px] sm:text-[14px] font-bold text-foreground dark:text-primary'>
              Available Rewards
            </p>
            <Link
              href='/dashboard/rewards'
              className='font-mono text-[10px] text-muted-foreground hover:text-foreground'
            >
              See all →
            </Link>
          </div>

          <div className='grid grid-cols-3 gap-2'>
            {/* 10% off */}
            <div className='flex flex-col items-center rounded-xl border border-border bg-background/40 px-1.5 sm:px-2 py-3 text-center'>
              <p className='font-heading text-[22px] sm:text-[26px] font-bold leading-none text-[#f87171]'>
                10%
              </p>
              <p className='mt-1.5 font-heading text-[9px] sm:text-[10px] font-bold leading-tight text-foreground dark:text-primary'>
                10% Off Next Booking
              </p>
              <p className='mt-1 font-mono text-[9px] text-muted-foreground'>
                {AVAILABLE_REWARDS[0]?.cost.toLocaleString()} pts
              </p>
            </div>

            {/* Lounge */}
            <div className='flex flex-col items-center rounded-xl border border-border bg-background/40 px-1.5 sm:px-2 py-3 text-center'>
              <div className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border bg-muted/40'>
                <Star className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400' />
              </div>
              <p className='mt-1.5 font-heading text-[9px] sm:text-[10px] font-bold leading-tight text-foreground dark:text-primary'>
                Airport Lounge Pass
              </p>
              <p className='mt-1 font-mono text-[9px] text-muted-foreground'>
                {AVAILABLE_REWARDS[1]?.cost.toLocaleString()} pts
              </p>
            </div>

            {/* eSIM */}
            <div className='flex flex-col items-center rounded-xl border border-border bg-background/40 px-1.5 sm:px-2 py-3 text-center'>
              <div className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border bg-muted/40'>
                <Wifi className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#34D399]' />
              </div>
              <p className='mt-1.5 font-heading text-[9px] sm:text-[10px] font-bold leading-tight text-foreground dark:text-primary'>
                Free eSIM Plan
              </p>
              <p className='mt-1 font-mono text-[9px] text-muted-foreground'>
                {AVAILABLE_REWARDS[2]?.cost.toLocaleString()} pts
              </p>
            </div>
          </div>
        </div>

        <div className='p-4 pt-4' />
      </motion.div>
    </div>
  )
}
