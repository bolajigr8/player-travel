'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ChevronRight, ArrowRight } from 'lucide-react'
import { DASHBOARD_USER, POINTS_HISTORY } from '@/store/dashboard'
import { RewardsEarnSection } from '@/components/dashboard/rewards/rewards-earn'
import { RewardsRedeemSection } from '@/components/dashboard/rewards/rewards-redeem'

const TYPE_ICON: Record<string, string> = {
  flight: '✈️',
  stay: '🏨',
  esim: '📱',
  bundle: '📦',
  refer: '👥',
}

export function RewardsClient() {
  const pct = (DASHBOARD_USER.points / DASHBOARD_USER.totalPointsForNext) * 100

  return (
    <div className='p-4 sm:p-6'>
      <div className='mb-5 sm:mb-6'>
        <h1 className='font-heading text-xl sm:text-2xl font-bold text-foreground dark:text-primary'>
          My Rewards
        </h1>
        <p className='mt-1 text-[12px] sm:text-[13px] text-muted-foreground'>
          Book. Fly. Earn. Get rewarded.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]'>
        {/* ── Main column ── */}
        <div className='space-y-6'>
          {/* Points overview */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className='rounded-2xl border border-border bg-card p-4 sm:p-5'
          >
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <p className='font-mono text-[11px] tracking-wider text-muted-foreground'>
                  Your Points
                </p>
                <div className='mt-1.5 flex items-center gap-2'>
                  <Star className='h-5 w-5 sm:h-6 sm:w-6 fill-primary text-primary' />
                  <span className='font-heading text-3xl sm:text-4xl font-bold text-foreground dark:text-primary'>
                    {DASHBOARD_USER.points.toLocaleString()}
                  </span>
                </div>
                <p className='mt-1.5 text-[11px] sm:text-[12px] text-muted-foreground'>
                  Keep going! You're{' '}
                  <span className='font-semibold text-foreground dark:text-primary'>
                    {DASHBOARD_USER.pointsToNext}
                  </span>{' '}
                  points away from{' '}
                  <span className='font-semibold text-foreground dark:text-primary'>
                    {DASHBOARD_USER.nextLevel}
                  </span>{' '}
                  level.
                </p>
              </div>

              {/* Progress bar */}
              <div className='flex-1 sm:max-w-xs'>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='font-heading text-[11px] font-bold text-primary'>
                    {DASHBOARD_USER.level}
                  </span>
                  <span className='font-heading text-[11px] font-semibold text-muted-foreground'>
                    {DASHBOARD_USER.nextLevel}
                  </span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-muted'>
                  <div
                    className='h-full rounded-full bg-primary transition-all'
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className='mt-1.5 font-mono text-[10px] text-muted-foreground'>
                  {DASHBOARD_USER.points.toLocaleString()} /{' '}
                  {DASHBOARD_USER.totalPointsForNext.toLocaleString()} pts to{' '}
                  {DASHBOARD_USER.nextLevel}
                </p>
              </div>
            </div>

            {/* Quick links */}
            <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {[
                {
                  title: 'How to earn points',
                  sub: 'See all the ways to earn',
                },
                { title: 'Rewards FAQ', sub: 'Learn more about rewards' },
              ].map((item) => (
                <button
                  key={item.title}
                  className='flex items-center gap-2 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary/30'
                >
                  <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-heading text-[14px] font-bold text-primary'>
                    ?
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='font-heading text-[12px] font-bold text-foreground dark:text-primary'>
                      {item.title}
                    </p>
                    <p className='text-[10px] text-muted-foreground'>
                      {item.sub}
                    </p>
                  </div>
                  <ChevronRight className='ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground' />
                </button>
              ))}
            </div>
          </motion.div>

          <RewardsEarnSection />
          <RewardsRedeemSection />
        </div>

        {/* ── Sidebar ── */}
        <aside className='space-y-4'>
          {/* Your Level */}
          <div className='rounded-2xl border border-border bg-card p-4 sm:p-5'>
            <h3 className='font-heading text-[13px] sm:text-[14px] font-bold text-foreground dark:text-primary'>
              Your Level
            </h3>
            <div className='mt-3 flex items-center gap-3'>
              <div className='flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-500/20 text-[22px] sm:text-[24px]'>
                ✈️
              </div>
              <div>
                <p className='font-heading text-[14px] sm:text-base font-bold text-foreground dark:text-primary'>
                  {DASHBOARD_USER.level}
                </p>
                <p className='font-mono text-[10px] text-muted-foreground'>
                  Member since Jan 2024
                </p>
              </div>
            </div>
            <div className='mt-4 space-y-1.5'>
              {[
                'Earn points on every booking',
                'Exclusive travel offers',
                'Priority customer support',
              ].map((perk) => (
                <div
                  key={perk}
                  className='flex items-center gap-2 text-[11px] sm:text-[12px] text-muted-foreground'
                >
                  <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-primary' />
                  {perk}
                </div>
              ))}
            </div>
            <button className='mt-4 w-full rounded-xl border border-border py-2.5 font-heading text-[11px] sm:text-[12px] font-bold text-foreground transition-colors hover:border-primary/30 hover:text-primary'>
              View all levels
            </button>
          </div>

          {/* Points History */}
          <div className='rounded-2xl border border-border bg-card p-4 sm:p-5'>
            <div className='flex items-center justify-between'>
              <h3 className='font-heading text-[13px] sm:text-[14px] font-bold text-foreground dark:text-primary'>
                Points History
              </h3>
              <Link
                href='#'
                className='font-mono text-[10px] text-muted-foreground hover:text-foreground'
              >
                View all
              </Link>
            </div>
            <div className='mt-3 space-y-3'>
              {POINTS_HISTORY.map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm'>
                    {TYPE_ICON[item.type] ?? '⭐'}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='font-heading text-[11px] font-bold text-foreground dark:text-primary'>
                      {item.title}
                    </p>
                    <p className='truncate text-[10px] text-muted-foreground'>
                      {item.subtitle}
                    </p>
                  </div>
                  <span className='shrink-0 font-mono text-[11px] font-bold text-primary'>
                    +{item.points}
                  </span>
                </div>
              ))}
            </div>
            <button className='mt-3 w-full rounded-xl border border-border py-2 font-heading text-[11px] font-bold text-foreground transition-colors hover:border-primary/30 hover:text-primary'>
              View all history
            </button>
          </div>

          {/* Promo */}
          <div className='overflow-hidden rounded-2xl border border-border bg-card'>
            <div className='p-4'>
              <p className='font-heading text-[14px] sm:text-base font-bold text-foreground dark:text-primary'>
                More trips.
                <br />
                More rewards.
              </p>
              <p className='mt-1 text-[10px] sm:text-[11px] text-muted-foreground'>
                The more you fly, the more you earn.
              </p>
              <button className='mt-3 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-heading text-[11px] sm:text-[12px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                Explore Offers <ArrowRight className='h-3.5 w-3.5' />
              </button>
            </div>
            <div className='h-16 bg-gradient-to-b from-primary/10 to-transparent' />
          </div>
        </aside>
      </div>
    </div>
  )
}
