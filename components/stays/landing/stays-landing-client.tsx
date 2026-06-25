'use client'

import { StaysHeroSearch } from './stays-hero-search'
import {
  StaysPopularDestinations,
  StaysPromoCards,
} from './stays-promo-section'
import { StaysTrustBadges } from './stays-trust-badges'

export function StaysLandingClient() {
  return (
    <div className='min-h-screen bg-background'>
      {/* ── Hero ── */}
      <section className='relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_50%_0%,oklch(0.94_0.19_124/0.08),transparent_60%)] py-16 sm:py-24'>
        <div className='page-container'>
          <div className='mx-auto max-w-3xl text-center'>
            <div className='mb-5 flex items-center justify-center gap-3'>
              <span className='h-px w-10 bg-border' />
              <span className='font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-primary'>
                Golafly · Stays
              </span>
              <span className='h-px w-10 bg-border' />
            </div>
            <h1 className='font-heading text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-6xl'>
              Find Your
              <br />
              <span className='text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.55)]'>
                Perfect
              </span>{' '}
              Stay
            </h1>
            <p className='mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base'>
              Compare thousands of hotels, apartments &amp; villas · Free
              cancellation · Best price guarantee
            </p>
          </div>

          <StaysHeroSearch />
        </div>
      </section>
      {/* ── Trust badges ── */}
      <StaysTrustBadges />
      ``
      {/* ── Promo cards ── */}
      <StaysPromoCards />
      {/* ── Popular destinations ── */}
      <StaysPopularDestinations />
    </div>
  )
}
