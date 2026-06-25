'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const IMAGES = {
  globalPlans: '/esim/global.png',
  europe: '/esim/europe.png',
  destinations: {
    US: '/esim/us_deal.png',
    EU: '/esim/europe_deal.png',
    JP: '/esim/japan_deal.png',
    TH: '/esim/thailand_deal.png',
    TR: '/esim/turkey_deal.png',
    AE: '/esim/uae_deal.png',
    NG: '/esim/europe_deal.png',
    GB: '/esim/europe_deal.png',
  },
} as const

const POPULAR_DESTINATIONS = [
  {
    code: 'US',
    name: 'United States',
    coverage: 'Nationwide',
    from: '4.99',
    chipCode: 'US',
  },
  {
    code: 'EU',
    name: 'Europe',
    coverage: '35 Countries',
    from: '3.99',
    chipCode: 'EU',
  },
  {
    code: 'JP',
    name: 'Japan',
    coverage: 'Nationwide',
    from: '6.99',
    chipCode: 'JP',
  },
  {
    code: 'TH',
    name: 'Thailand',
    coverage: 'Nationwide',
    from: '4.99',
    chipCode: 'TH',
  },
  {
    code: 'TR',
    name: 'Turkey',
    coverage: 'Nationwide',
    from: '5.99',
    chipCode: 'TR',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    coverage: 'Nationwide',
    from: '12.99',
    chipCode: 'AE',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    coverage: 'Nationwide',
    from: '2.99',
    chipCode: 'NG',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    coverage: 'Nationwide',
    from: '5.99',
    chipCode: 'GB',
  },
] as const

export function EsimPromoCards() {
  const router = useRouter()
  return (
    <section className='page-container py-10 sm:py-14'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {/* Global Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='group relative cursor-pointer overflow-hidden rounded-2xl bg-card'
          style={{ minHeight: 280 }}
          onClick={() => router.push('/esim/plans?tab=global')}
        >
          <div className='absolute inset-0'>
            <Image
              src={IMAGES.globalPlans}
              alt='Global Plans'
              fill
              sizes='(max-width: 640px) 100vw, 50vw'
              className='object-cover opacity-50 transition-transform duration-700 group-hover:scale-105'
            />
          </div>
          <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent' />
          <div
            className='relative flex h-full flex-col justify-end p-7 sm:p-9'
            style={{ minHeight: 280 }}
          >
            <p className='mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary'>
              One eSIM, Everywhere
            </p>
            <h2 className='font-heading text-3xl font-bold text-white'>
              Global Plans
            </h2>
            <p className='mt-2 max-w-xs text-sm text-white/55'>
              Stay connected across 130+ countries with a single eSIM.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                router.push('/esim/plans?tab=global')
              }}
              className='mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/60 px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10'
            >
              See global plans <ArrowRight className='size-3.5' />
            </button>
          </div>
        </motion.div>

        {/* Europe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='group relative cursor-pointer overflow-hidden rounded-2xl bg-card'
          style={{ minHeight: 280 }}
          onClick={() => router.push('/esim/plans?tab=global&regions=Europe')}
        >
          <div className='absolute inset-0'>
            <Image
              src={IMAGES.europe}
              alt='Europe Plans'
              fill
              sizes='(max-width: 640px) 100vw, 50vw'
              className='object-cover opacity-65 transition-transform duration-700 group-hover:scale-105'
            />
          </div>
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10' />
          <div
            className='relative flex h-full flex-col justify-end p-7 sm:p-9'
            style={{ minHeight: 280 }}
          >
            <p className='mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary'>
              Roam Free
            </p>
            <h2 className='font-heading text-3xl font-bold text-white'>
              Europe
            </h2>
            <p className='mt-2 max-w-xs text-sm text-white/55'>
              One plan across 35 countries from €3.99.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                router.push('/esim/plans?tab=global&regions=Europe')
              }}
              className='mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/5'
            >
              See Europe plans <ArrowRight className='size-3.5' />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function EsimPopularDestinations() {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  function goDestination(chipCode: string) {
    if (chipCode === 'EU') {
      router.push('/esim/plans?tab=global&regions=Europe')
    } else {
      router.push(`/esim/plans?tab=local&country=${chipCode}`)
    }
  }

  return (
    <section className='pb-16 sm:pb-24'>
      <div className='page-container mb-6 flex items-end justify-between'>
        <div>
          <p className='font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary'>
            Popular Destinations
          </p>
          <h2 className='font-heading text-2xl font-bold sm:text-3xl'>
            Where Are You Going?
          </h2>
        </div>
        <button
          onClick={() => router.push('/esim/plans?tab=global')}
          className='shrink-0 font-mono text-[11px] font-bold text-primary underline-offset-2 hover:underline'
        >
          View all plans →
        </button>
      </div>

      <div className='relative'>
        <div className='pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-background to-transparent' />
        <div
          ref={scrollRef}
          className='scrollbar-hide flex gap-4 overflow-x-auto px-5 pb-4 sm:px-6 lg:px-8'
          style={{ paddingRight: 'calc(2rem + 80px)' }}
        >
          {POPULAR_DESTINATIONS.map((dest, i) => (
            <motion.button
              key={dest.code}
              onClick={() => goDestination(dest.chipCode)}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className='group relative shrink-0 overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-primary hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.5),0_0_20px_hsl(var(--primary)/0.2)]'
              style={{ width: 220, height: 290 }}
            >
              <Image
                src={
                  IMAGES.destinations[
                    dest.code as keyof typeof IMAGES.destinations
                  ] ?? '/globe.svg'
                }
                alt={dest.name}
                fill
                sizes='220px'
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10' />
              <div className='absolute left-3 top-3'>
                <span className='font-mono text-xs font-bold text-white/75'>
                  {dest.code}
                </span>
              </div>
              <div className='absolute bottom-0 left-0 right-0 p-4 text-left'>
                <p className='font-heading text-base font-bold leading-tight text-white'>
                  {dest.name}
                </p>
                <p className='mb-3 mt-0.5 text-[11px] text-white/45'>
                  {dest.coverage}
                </p>
                {/* € not $ */}
                <span className='inline-flex items-center rounded-full bg-primary px-3 py-1.5 font-mono text-[10px] font-black text-primary-foreground'>
                  from €{dest.from}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
