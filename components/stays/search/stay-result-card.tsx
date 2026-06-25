'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Star, Heart, ArrowRight } from 'lucide-react'
import type { StayResult } from '@/store/stays'

export function StayResultCard({
  stay,
  index,
}: {
  stay: StayResult
  index: number
}) {
  const router = useRouter()

  function handleViewDetails(e?: React.MouseEvent) {
    e?.stopPropagation()
    router.push(`/stays/hotel?id=${stay.id}`)
  }

  return (
    <motion.div
      className='group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.55),0_0_24px_hsl(var(--primary)/0.15)]'
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
      onClick={() => handleViewDetails()}
    >
      <div className='flex flex-col sm:flex-row'>
        {/* Image */}
        <div className='relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-64'>
          <Image
            src={stay.image}
            alt={stay.name}
            fill
            sizes='(max-width: 640px) 100vw, 256px'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />

          {stay.originalPrice && (
            <div className='absolute left-2.5 top-2.5 rounded-md bg-primary px-2 py-1 font-mono text-[11px] font-bold text-primary-foreground'>
              -
              {Math.round(
                ((stay.originalPrice - stay.pricePerNight) /
                  stay.originalPrice) *
                  100,
              )}
              %
            </div>
          )}

          <button
            onClick={(e) => e.stopPropagation()}
            className='absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60'
            aria-label='Save'
          >
            <Heart className='size-4' />
          </button>
        </div>

        {/* Content */}
        <div className='flex flex-1 flex-col justify-between gap-3 p-4'>
          <div>
            <div className='flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-start'>
              <div className='flex-1'>
                <p className='mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary'>
                  {stay.amenities[0] === 'Pool' ? 'Resort' : 'Hotel'}
                </p>
                <h3 className='font-heading text-xl font-bold leading-tight text-foreground'>
                  {stay.name}
                </h3>
                <div className='mt-1 flex items-center gap-0.5'>
                  {Array.from({ length: stay.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className='h-3.5 w-3.5 fill-amber-400 text-amber-400'
                    />
                  ))}
                </div>
                <div className='mt-1.5 flex items-center gap-1.5 text-[12px] text-muted-foreground'>
                  <MapPin className='h-3 w-3 shrink-0 text-primary/70' />
                  <span>{stay.location}</span>
                </div>
              </div>

              {/* Rating */}
              <div className='flex shrink-0 items-center gap-2'>
                <div className='text-right'>
                  <p className='text-[13px] font-bold text-foreground'>
                    {stay.ratingLabel}
                  </p>
                  <p className='text-[10px] text-muted-foreground'>
                    {stay.reviewCount.toLocaleString()} reviews
                  </p>
                </div>
                <span className='flex h-9 w-11 items-center justify-center rounded-lg border border-primary bg-primary/10 text-[14px] font-bold text-primary'>
                  {stay.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className='mt-3 flex flex-wrap gap-1.5'>
              {stay.amenities.map((a) => (
                <span
                  key={a}
                  className='rounded-md border border-border bg-muted px-2 py-1 font-mono text-[9px] uppercase tracking-wide text-muted-foreground'
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Price + CTA */}
          <div className='flex items-end justify-between pt-0.5'>
            <div>
              {stay.originalPrice && (
                <p className='font-mono text-[11px] text-muted-foreground line-through'>
                  ${stay.originalPrice}
                </p>
              )}
              <p className='font-heading text-2xl font-black leading-tight text-foreground'>
                ${stay.pricePerNight}
              </p>
              <p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
                per night
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => handleViewDetails(e)}
              className='inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wide text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)] transition-shadow group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)]'
            >
              View Details <ArrowRight className='size-3.5' />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
