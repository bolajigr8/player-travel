'use client'

import type { StayRatingBreakdown, StayReview } from '@/store/stays'

export function StayReviews({
  rating,
  ratingLabel,
  reviewCount,
  breakdown,
  reviews,
}: {
  rating: number
  ratingLabel: string
  reviewCount: number
  breakdown: StayRatingBreakdown
  reviews: StayReview[]
}) {
  const items: [string, number][] = [
    ['Cleanliness', breakdown.cleanliness],
    ['Comfort', breakdown.comfort],
    ['Location', breakdown.location],
    ['Facilities', breakdown.facilities],
    ['Staff', breakdown.staff],
    ['Value', breakdown.value],
  ]

  return (
    <section className='space-y-6'>
      <div className='flex items-center gap-3'>
        <span className='grid size-12 shrink-0 place-items-center rounded-xl border border-primary bg-primary/10 font-heading text-lg font-black text-primary'>
          {rating.toFixed(1)}
        </span>
        <div>
          <p className='font-heading text-lg font-bold'>{ratingLabel}</p>
          <p className='text-[12px] text-muted-foreground'>
            Based on {reviewCount.toLocaleString()} verified reviews
          </p>
        </div>
      </div>

      {/* Rating bars */}
      <div className='grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2'>
        {items.map(([label, value]) => (
          <div key={label} className='flex items-center gap-3'>
            <span className='w-20 shrink-0 text-sm text-muted-foreground'>
              {label}
            </span>
            <div className='h-1.5 flex-1 overflow-hidden rounded-full bg-muted'>
              <div
                className='h-full rounded-full bg-primary'
                style={{ width: `${(value / 10) * 100}%` }}
              />
            </div>
            <span className='w-8 shrink-0 text-right text-sm font-bold'>
              {value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Review cards */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {reviews.map((r) => (
          <div
            key={r.id}
            className='rounded-xl border border-border bg-card p-4'
          >
            <div className='mb-2 flex items-start justify-between gap-3'>
              <div className='flex items-center gap-2.5'>
                <span className='grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 font-mono text-[12px] font-bold text-primary'>
                  {r.initial}
                </span>
                <div>
                  <p className='text-sm font-bold leading-tight'>{r.name}</p>
                  <p className='text-[11px] text-muted-foreground'>
                    {r.country} · {r.date}
                  </p>
                </div>
              </div>
              <span className='rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary'>
                {r.score.toFixed(1)}
              </span>
            </div>
            <p className='mb-1 text-sm font-bold'>{r.title}</p>
            <p className='text-[12px] leading-relaxed text-muted-foreground'>
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
