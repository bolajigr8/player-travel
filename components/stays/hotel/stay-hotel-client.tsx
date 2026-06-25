'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Star, Globe } from 'lucide-react'
import { STAY_DETAIL } from '@/store/stays'
import { StayGallery } from './stay-gallery'
import { StayAmenitiesGrid } from './stay-amenities-grid'
import { StayRoomsList } from './stay-rooms-list'
import { StayReviews } from './stay-reviews'
import { StayLocationMap } from './stay-location-map'
import { StayBookingSidebar } from './stay-booking-sidebar'

export function StayHotelClient() {
  const router = useRouter()
  const params = useSearchParams()
  const stay = STAY_DETAIL // single dummy stay regardless of id

  return (
    <div className='min-h-screen bg-background'>
      <div className='page-container py-6'>
        <button
          onClick={() => router.back()}
          className='mb-5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='size-4' />
          Back to results
        </button>

        {/* ── Header ── */}
        <div className='mb-5'>
          <div className='flex flex-wrap items-start justify-between gap-3'>
            <div>
              <div className='mb-1 flex items-center gap-2'>
                <span className='font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary'>
                  {stay.type}
                </span>
                <div className='flex items-center gap-0.5'>
                  {Array.from({ length: stay.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className='h-3.5 w-3.5 fill-amber-400 text-amber-400'
                    />
                  ))}
                </div>
              </div>
              <h1 className='font-heading text-3xl font-black sm:text-4xl'>
                {stay.name}
              </h1>
              <div className='mt-1 flex items-center gap-1.5 text-sm text-muted-foreground'>
                <Globe className='size-3.5 text-primary/70' />
                {stay.fullLocation}
              </div>
            </div>

            <div className='text-right'>
              <p className='text-[13px] font-bold text-foreground'>
                {stay.ratingLabel}
              </p>
              <p className='mb-1 text-[11px] text-muted-foreground'>
                {stay.reviewCount.toLocaleString()} reviews
              </p>
              <span className='inline-flex h-9 w-11 items-center justify-center rounded-lg border border-primary bg-primary/10 text-[14px] font-bold text-primary'>
                {stay.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Gallery ── */}
        <StayGallery images={stay.images} />

        {/* ── Two-column layout ── */}
        <div className='mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]'>
          <div className='space-y-10'>
            {/* Overview */}
            <section>
              <h2 className='mb-3 font-heading text-base font-black uppercase tracking-wide'>
                Overview
              </h2>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                {stay.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className='mb-4 font-heading text-base font-black uppercase tracking-wide'>
                Popular Amenities
              </h2>
              <StayAmenitiesGrid amenities={stay.amenities} />
            </section>

            {/* Rooms */}
            <StayRoomsList rooms={stay.rooms} basePrice={stay.pricePerNight} />

            {/* Reviews */}
            <StayReviews
              rating={stay.rating}
              ratingLabel={stay.ratingLabel}
              reviewCount={stay.reviewCount}
              breakdown={stay.ratingBreakdown}
              reviews={stay.reviews}
            />

            {/* Location */}
            <StayLocationMap location={stay.fullLocation} />
          </div>

          {/* Booking sidebar */}
          <div className='lg:sticky lg:top-6 lg:self-start'>
            <StayBookingSidebar stay={stay} />
          </div>
        </div>
      </div>
    </div>
  )
}
