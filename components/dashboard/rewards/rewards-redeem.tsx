'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { DASHBOARD_USER, AVAILABLE_REWARDS } from '@/store/dashboard'

type RewardTab =
  | 'All Rewards'
  | 'Discounts'
  | 'Experiences'
  | 'eSIM'
  | 'Access'
  | 'Travel'
const REWARD_TABS: RewardTab[] = [
  'All Rewards',
  'Discounts',
  'Experiences',
  'eSIM',
  'Access',
  'Travel',
]

const REWARDS = [
  {
    id: 1,
    title: '10% Off Next Booking',
    subtitle: 'On flights or stays',
    cost: 2000,
    type: 'discount' as const,
    image: null,
  },
  {
    id: 2,
    title: 'Airport Lounge Pass',
    subtitle: 'One-time lounge access',
    cost: 3000,
    type: 'experience' as const,
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70',
  },
  {
    id: 3,
    title: 'Free eSIM Plan',
    subtitle: '5GB data, any country',
    cost: 1500,
    type: 'esim' as const,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=70',
  },
  {
    id: 4,
    title: 'Priority Check-in',
    subtitle: 'Skip the queue at the airport',
    cost: 2500,
    type: 'access' as const,
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=70',
  },
]

const BADGES = [
  {
    id: 1,
    name: 'First Booking',
    description: 'Complete your first booking',
    gradient: 'linear-gradient(145deg, #7B2500, #C44020)',
    icon: '✈️',
    earned: true,
    date: '28 Apr 2025',
    locked: false,
    progress: null,
  },
  {
    id: 2,
    name: 'Frequent Flyer',
    description: 'Book 5 flights',
    gradient: 'linear-gradient(145deg, #4A1080, #8B40CC)',
    icon: '🌟',
    earned: false,
    date: null,
    locked: false,
    progress: { current: 2, total: 5 },
  },
  {
    id: 3,
    name: 'Globe Trotter',
    description: 'Visit 3 different countries',
    gradient: 'linear-gradient(145deg, #0A2060, #1A5FAF)',
    icon: '🌍',
    earned: false,
    date: null,
    locked: false,
    progress: { current: 2, total: 3 },
  },
  {
    id: 4,
    name: 'Bundle Master',
    description: 'Book 3 flight + hotel bundles',
    gradient: 'linear-gradient(145deg, #7A4800, #C98E00)',
    icon: '📦',
    earned: false,
    date: null,
    locked: false,
    progress: { current: 1, total: 3 },
  },
  {
    id: 5,
    name: 'Golafly Elite',
    description: 'Earn 10,000 points',
    gradient: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
    icon: '👑',
    earned: false,
    date: null,
    locked: true,
    progress: null,
  },
]

function ShieldBadge({
  gradient,
  icon,
  locked,
}: {
  gradient: string
  icon: string
  locked?: boolean
}) {
  return (
    <div
      className='relative flex items-center justify-center'
      style={{ width: 48, height: 54 }}
    >
      {!locked && (
        <div
          className='absolute inset-0 opacity-30 blur-[3px]'
          style={{
            background: gradient,
            clipPath:
              'polygon(50% 0%, 100% 20%, 100% 72%, 50% 100%, 0% 72%, 0% 20%)',
          }}
        />
      )}
      <div
        className='relative flex items-center justify-center'
        style={{
          width: 44,
          height: 50,
          background: locked
            ? 'linear-gradient(145deg, #1c1c1c, #2e2e2e)'
            : gradient,
          clipPath:
            'polygon(50% 0%, 100% 20%, 100% 72%, 50% 100%, 0% 72%, 0% 20%)',
        }}
      >
        {locked ? (
          <Lock className='h-4 w-4 text-muted-foreground/70' />
        ) : (
          <span style={{ fontSize: 18, lineHeight: 1 }}>{icon}</span>
        )}
      </div>
    </div>
  )
}

export function RewardsRedeemSection() {
  const [activeTab, setActiveTab] = useState<RewardTab>('All Rewards')

  return (
    <div className='space-y-8'>
      {/* ── Redeem Rewards ── */}
      <section className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h2 className='font-heading text-[15px] sm:text-[16px] font-bold text-foreground dark:text-primary'>
            Redeem Rewards
          </h2>
          <Link
            href='#'
            className='flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground hover:text-foreground'
          >
            View all rewards <ArrowRight className='h-3 w-3' />
          </Link>
        </div>

        {/* Filter tabs */}
        <div className='flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide'>
          {REWARD_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'shrink-0 rounded-full px-3 sm:px-4 py-1.5 font-heading text-[11px] sm:text-[12px] font-semibold transition-colors',
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {REWARDS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className='overflow-hidden rounded-2xl border border-border bg-card'
            >
              {r.type === 'discount' ? (
                <div className='flex h-24 sm:h-28 items-center justify-center bg-muted dark:bg-[#071407]'>
                  <span className='font-heading text-[38px] sm:text-[44px] font-black leading-none text-primary'>
                    10%
                  </span>
                </div>
              ) : (
                <div className='relative h-24 sm:h-28 overflow-hidden'>
                  <Image
                    src={r.image!}
                    alt={r.title}
                    fill
                    sizes='(max-width: 640px) 50vw, 25vw'
                    className='object-cover'
                  />
                </div>
              )}

              <div className='p-2.5 sm:p-3'>
                <p className='font-heading text-[11px] sm:text-[12px] font-bold leading-tight text-foreground dark:text-primary'>
                  {r.title}
                </p>
                <p className='mt-0.5 text-[9px] sm:text-[10px] leading-tight text-muted-foreground'>
                  {r.subtitle}
                </p>
                <p className='mt-2 font-mono text-[10px] sm:text-[11px] font-semibold text-muted-foreground'>
                  {r.cost.toLocaleString()} pts
                </p>
                <button
                  className={cn(
                    'mt-2 w-full rounded-xl py-2 font-heading text-[10px] sm:text-[11px] font-bold transition-colors',
                    DASHBOARD_USER.points >= r.cost
                      ? 'bg-primary text-primary-foreground hover:opacity-90'
                      : 'border border-border text-foreground hover:border-primary/30',
                  )}
                >
                  Redeem
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── My Badges ── */}
      <section className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h2 className='font-heading text-[15px] sm:text-[16px] font-bold text-foreground dark:text-primary'>
            My Badges
          </h2>
          <Link
            href='#'
            className='flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground hover:text-foreground'
          >
            View all <ArrowRight className='h-3 w-3' />
          </Link>
        </div>
        <p className='text-[11px] sm:text-[12px] text-muted-foreground'>
          Collect badges and show off your travel spirit.
        </p>

        <div className='grid grid-cols-3 gap-2 sm:grid-cols-5'>
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className={cn(
                'flex flex-col items-center rounded-2xl border border-border bg-card p-3 sm:p-4 text-center',
                badge.locked && 'opacity-50',
              )}
            >
              <ShieldBadge
                gradient={badge.gradient}
                icon={badge.icon}
                locked={badge.locked}
              />
              <p className='mt-2 sm:mt-3 font-heading text-[10px] sm:text-[11px] font-bold leading-tight text-foreground dark:text-primary'>
                {badge.name}
              </p>
              <p className='mt-0.5 text-[8px] sm:text-[9px] leading-snug text-muted-foreground'>
                {badge.description}
              </p>
              {badge.earned && badge.date && (
                <p className='mt-1.5 font-mono text-[8px] sm:text-[9px] text-primary'>
                  {badge.date}
                </p>
              )}
              {badge.progress && !badge.earned && (
                <div className='mt-1.5 w-full'>
                  <div className='h-1 w-full overflow-hidden rounded-full bg-muted'>
                    <div
                      className='h-full rounded-full bg-primary'
                      style={{
                        width: `${(badge.progress.current / badge.progress.total) * 100}%`,
                      }}
                    />
                  </div>
                  <p className='mt-1 font-mono text-[8px] text-muted-foreground'>
                    {badge.progress.current}/{badge.progress.total}
                  </p>
                </div>
              )}
              {badge.locked && (
                <p className='mt-1.5 font-mono text-[8px] sm:text-[9px] text-muted-foreground'>
                  Locked
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <div className='relative min-h-36 sm:min-h-40 overflow-hidden rounded-2xl border border-border bg-card'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent' />
        <div
          className='absolute inset-y-0 right-0 w-[48%] opacity-20 dark:opacity-40'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className='absolute inset-y-0 right-0 w-[55%] bg-gradient-to-l from-transparent to-card' />

        <div className='relative z-10 p-4 sm:p-6'>
          <h3 className='font-heading text-[15px] sm:text-[18px] font-bold leading-snug text-foreground dark:text-primary'>
            Every trip brings you closer
            <br />
            to amazing rewards.
          </h3>
          <p className='mt-1.5 max-w-[54%] text-[10px] sm:text-[12px] text-muted-foreground'>
            Book more, earn more and unlock exclusive travel perks.
          </p>
          <button className='mt-3 sm:mt-4 flex items-center gap-2 rounded-xl bg-primary px-4 sm:px-5 py-2 sm:py-2.5 font-heading text-[11px] sm:text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
            Explore All Rewards <ArrowRight className='h-3.5 w-3.5' />
          </button>
        </div>
      </div>
    </div>
  )
}
