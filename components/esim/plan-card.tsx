'use client'

import { memo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Globe, Heart, Wifi, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EsimPackage } from '@/features/esim/types'

function getCountryCode(pkg: EsimPackage): string {
  if (pkg.country_code && pkg.country_code.length <= 3) return pkg.country_code
  const map: Record<string, string> = {
    Japan: 'JP',
    Vietnam: 'VN',
    Europe: 'EU',
    Turkey: 'TR',
    Nigeria: 'NG',
    Ghana: 'GH',
    'South Africa': 'ZA',
    Kenya: 'KE',
    UAE: 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'European Union and United Kingdom': 'EU',
    'Latin America': 'LA',
    'North America': 'NA',
    'Middle East and North Africa': 'ME',
    'Discover Global': 'GL',
    'Caribbean Islands': 'CB',
    'Africa Safari': 'AF',
    Oceania: 'OC',
    Asia: 'AS',
    Africa: 'AF',
    Thailand: 'TH',
  }
  return map[pkg.country] ?? pkg.country.slice(0, 2).toUpperCase()
}

export const COUNTRY_PHOTOS: Record<string, string> = {
  Japan: '/esim/New/japan.jpeg',
  Nigeria: '/esim/New/africa.webp',
  Vietnam: '/esim/New/vietnam.jpeg',
  Turkey: '/esim/New/turk.jpeg',
  Ghana: '/esim/New/africa.webp',
  'South Africa': '/esim/New/africa.webp',
  Kenya: '/esim/New/africa.webp',
  'United Arab Emirates': '/esim/New/paris.jpeg',
  'United Kingdom': '/esim/New/uk.jpeg',
  'United States': '/esim/New/uk.jpeg',
  Europe: '/esim/New/europe.jpeg',
  'European Union and United Kingdom': '/esim/New/europe.jpeg',
  Asia: '/esim/New/vietnam.jpeg',
  Africa: '/esim/New/africa.webp',
  'Latin America': '/esim/New/africa.webp',
  'North America': '/esim/New/africa.webp',
  'Middle East and North Africa': '/esim/New/indo.jpeg',
  'Discover Global': '/esim/New/global.jpeg',
  Oceania: '/esim/New/thai.jpeg',
  'Africa Safari': '/esim/New/africa.webp',
  'Caribbean Islands': '/esim/New/mexico.jpeg',
  Thailand: '/esim/New/thai.jpeg',
}

function getCoverage(pkg: EsimPackage): string {
  const regional: Record<string, string> = {
    Europe: '35 Countries',
    'European Union and United Kingdom': '36 Countries',
    Asia: '20+ Countries',
    Africa: '30+ Countries',
    'Africa Safari': '10 Countries',
    'Caribbean Islands': '20+ Countries',
    'Discover Global': '130+ Countries',
    'Latin America': '20+ Countries',
    'Middle East and North Africa': '15+ Countries',
    'North America': '3 Countries',
    Oceania: '10+ Countries',
  }
  return regional[pkg.country] ?? 'Nationwide'
}

export const PlanCard = memo(function PlanCard({
  pkg,
  activeTab,
  countryCode,
}: {
  pkg: EsimPackage
  activeTab: 'local' | 'global'
  countryCode: string
}) {
  const router = useRouter()
  const code = getCountryCode(pkg)
  const coverage = getCoverage(pkg)
  const photo = COUNTRY_PHOTOS[pkg.country]
  const perDay =
    pkg.validity_days > 0 ? (pkg.price / pkg.validity_days).toFixed(2) : null

  function handleViewPlan(e?: React.MouseEvent) {
    e?.stopPropagation()
    const q = new URLSearchParams()
    q.set('id', pkg.package_id)
    q.set('destination', activeTab === 'global' ? 'global' : countryCode)
    router.push(`/esim/plan?${q.toString()}`)
  }

  console.log('PlanCard render', pkg.package_id, pkg.country, pkg.price)

  return (
    <div
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card',
        'transition-all duration-300',
        'hover:border-primary hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.55),0_0_24px_hsl(var(--primary)/0.15)]',
      )}
      onClick={() => handleViewPlan()}
    >
      {/* Image header */}
      <div className='relative h-44 overflow-hidden'>
        {photo ? (
          <Image
            src={photo}
            alt={pkg.country}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        ) : (
          <div className='absolute inset-0 bg-muted' />
        )}
        <div className='absolute inset-0 bg-black/35' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent' />

        <div className='absolute left-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm'>
          <span className='font-mono text-[11px] font-bold text-white'>
            {code}
          </span>
        </div>
        <div className='absolute right-3 top-3 rounded-lg bg-primary px-2 py-0.5 font-mono text-[10px] font-bold text-primary-foreground'>
          5G
        </div>
        <div className='absolute bottom-0 left-0 right-0 flex items-end justify-between px-3 pb-3'>
          <p className='font-heading text-xl font-bold leading-tight text-white'>
            {pkg.country}
          </p>
          <button
            onClick={(e) => e.stopPropagation()}
            className='grid size-8 place-items-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/65'
            aria-label='Save'
          >
            <Heart className='size-4 text-white' />
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className='space-y-3 p-4'>
        <div className='flex items-center gap-1.5 text-[11px] text-muted-foreground'>
          <Globe className='size-3 shrink-0 text-primary/70' />
          <span>{coverage}</span>
        </div>

        <div className='grid grid-cols-3 border-y border-border/50'>
          <div className='py-2.5 text-center'>
            <p className='font-heading text-sm font-bold leading-tight'>
              {pkg.data}
            </p>
            <p className='mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground'>
              Data
            </p>
          </div>
          <div className='py-2.5 text-center'>
            <p className='font-heading text-sm font-bold leading-tight'>
              {pkg.validity_days} Days
            </p>
            <p className='mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground'>
              Validity
            </p>
          </div>
          <div className='py-2.5 text-center'>
            <p className='font-heading text-sm font-bold leading-tight'>5G</p>
            <p className='mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground'>
              Speed
            </p>
          </div>
        </div>

        <div className='flex flex-wrap gap-1.5'>
          {[
            { icon: <Wifi className='size-3' />, label: '5G' },
            { icon: <Wifi className='size-3' />, label: 'Hotspot' },
            { icon: <Zap className='size-3' />, label: 'Instant' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className='flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 font-mono text-[9px] font-medium text-muted-foreground'
            >
              <span className='text-primary/70'>{icon}</span>
              {label}
            </div>
          ))}
        </div>

        {/* Price — € not $ */}
        <div className='flex items-end justify-between pt-0.5'>
          <div>
            <p className='font-mono text-[9px] uppercase tracking-wider text-muted-foreground'>
              From
            </p>
            <p className='font-heading text-2xl font-black leading-tight'>
              €{pkg.price.toFixed(2)}
            </p>
            {perDay && (
              <p className='font-mono text-[10px] text-muted-foreground'>
                €{perDay}/day
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => handleViewPlan(e)}
            className='inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wide text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)] transition-shadow group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)]'
          >
            View Plan →
          </motion.button>
        </div>
      </div>
    </div>
  )
})

export const PlanCardSkeleton = memo(function PlanCardSkeleton() {
  return (
    <div className='animate-pulse overflow-hidden rounded-2xl border border-border bg-card'>
      <div className='h-44 bg-muted' />
      <div className='space-y-3 p-4'>
        <div className='h-2.5 w-1/3 rounded bg-muted' />
        <div className='h-14 rounded-xl bg-muted' />
        <div className='flex gap-1.5'>
          <div className='h-6 w-10 rounded-md bg-muted' />
          <div className='h-6 w-14 rounded-md bg-muted' />
          <div className='h-6 w-12 rounded-md bg-muted' />
        </div>
        <div className='flex justify-between pt-1'>
          <div className='h-10 w-20 rounded bg-muted' />
          <div className='h-9 w-28 rounded-full bg-muted' />
        </div>
      </div>
    </div>
  )
})
