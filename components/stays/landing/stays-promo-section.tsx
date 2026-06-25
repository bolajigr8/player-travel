'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { STAY_PROMO_CARDS, STAY_DESTINATIONS } from '@/store/stays'

export function StaysPromoCards() {
  const router = useRouter()
  return (
    <section className='page-container py-10 sm:py-14'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {STAY_PROMO_CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className='group relative cursor-pointer overflow-hidden rounded-2xl bg-card'
            style={{ minHeight: 240 }}
            onClick={() => router.push('/stays/search')}
          >
            <div className='absolute inset-0'>
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes='(max-width: 640px) 100vw, 50vw'
                loading={i === 0 ? 'eager' : 'lazy'} // ← eager only on first card (LCP)
                className='object-cover opacity-60 transition-transform duration-700 group-hover:scale-105'
              />
            </div>
            <div
              className={
                card.variant === 'primary'
                  ? 'absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent'
                  : 'absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10'
              }
            />
            <div
              className='relative flex h-full flex-col justify-end p-7 sm:p-9'
              style={{ minHeight: 240 }}
            >
              <p className='mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary'>
                {card.tag}
              </p>
              <h2 className='font-heading text-3xl font-bold text-white'>
                {card.title}
              </h2>
              <p className='mt-2 max-w-xs text-sm text-white/60'>
                {card.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  router.push('/stays/search')
                }}
                className={
                  card.variant === 'primary'
                    ? 'mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/60 px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10'
                    : 'mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/5'
                }
              >
                {card.cta} <ArrowRight className='size-3.5' />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function StaysPopularDestinations() {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className='pb-16 sm:pb-24'>
      <div className='page-container mb-6 flex items-end justify-between'>
        <div>
          <p className='font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary'>
            Popular Destinations
          </p>
          <h2 className='font-heading text-2xl font-bold sm:text-3xl'>
            Where to Next?
          </h2>
        </div>
        <button
          onClick={() => router.push('/stays/search')}
          className='shrink-0 font-mono text-[11px] font-bold text-primary underline-offset-2 hover:underline'
        >
          View all stays →
        </button>
      </div>

      <div className='relative'>
        <div className='pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-background to-transparent' />

        <div
          ref={scrollRef}
          className='scrollbar-hide flex gap-4 overflow-x-auto px-5 pb-4 sm:px-6 lg:px-8'
          style={{ paddingRight: 'calc(2rem + 80px)' }}
        >
          {STAY_DESTINATIONS.map((dest, i) => (
            <motion.button
              key={dest.code}
              onClick={() =>
                router.push(
                  `/stays/search?destination=${encodeURIComponent(dest.name)}`,
                )
              }
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className='group relative shrink-0 overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-primary hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.5),0_0_20px_hsl(var(--primary)/0.2)]'
              style={{ width: 220, height: 290 }}
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes='220px' // ← matches the fixed inline style width
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
                  {dest.country}
                </p>
                <span className='inline-flex items-center rounded-full bg-primary px-3 py-1.5 font-mono text-[10px] font-black text-primary-foreground'>
                  from ${dest.price} / night
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
