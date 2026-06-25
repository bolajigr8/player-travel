'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Globe } from 'lucide-react'
import {
  useLocalEsimPackages,
  useGlobalEsimPackages,
} from '@/features/esim/hooks'
import type { EsimPackage } from '@/features/esim/types'

import { Pagination } from '@/components/pagination'
import { COUNTRY_PHOTOS } from '../plan-card'
import { EsimPlanInfo } from './esim-plan-info'
import { PlanRow, PlanSidebar, EsimFaqSection } from './esim-plan-sidebar'

const PLANS_PER_PAGE = 5

const COVERAGE_COUNTRIES: Record<string, string[]> = {
  Europe: [
    'Spain',
    'France',
    'Italy',
    'Germany',
    'Portugal',
    'Netherlands',
    'Greece',
    'Austria',
    'Belgium',
    'Switzerland',
    'Ireland',
    'Poland',
  ],
  'European Union and United Kingdom': [
    'Spain',
    'France',
    'Italy',
    'Germany',
    'Portugal',
    'Netherlands',
    'Greece',
    'Austria',
    'Belgium',
    'Switzerland',
    'Ireland',
    'Poland',
    'United Kingdom',
  ],
  Asia: [
    'Japan',
    'South Korea',
    'Thailand',
    'Vietnam',
    'Singapore',
    'Malaysia',
    'Indonesia',
    'Philippines',
    'India',
    'Hong Kong',
    'Taiwan',
  ],
  Africa: [
    'Nigeria',
    'Kenya',
    'Ghana',
    'South Africa',
    'Ethiopia',
    'Tanzania',
    'Uganda',
    'Rwanda',
    'Senegal',
    'Ivory Coast',
  ],
  'North America': ['United States', 'Canada', 'Mexico'],
  'Latin America': [
    'Brazil',
    'Argentina',
    'Colombia',
    'Chile',
    'Peru',
    'Ecuador',
    'Bolivia',
  ],
  'Middle East and North Africa': [
    'UAE',
    'Saudi Arabia',
    'Egypt',
    'Jordan',
    'Israel',
    'Qatar',
    'Kuwait',
    'Bahrain',
    'Oman',
    'Morocco',
    'Tunisia',
  ],
  Oceania: ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea'],
}

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
    Thailand: 'TH',
  }
  return map[pkg.country] ?? pkg.country.slice(0, 2).toUpperCase()
}

function getCoverage(pkg: EsimPackage): string {
  const regional: Record<string, string> = {
    Europe: '35 Countries',
    'European Union and United Kingdom': '36 Countries',
    Asia: '20+ Countries',
    Africa: '30+ Countries',
    'Discover Global': '130+ Countries',
    'Latin America': '20+ Countries',
    'Middle East and North Africa': '15+ Countries',
    'North America': '3 Countries',
    Oceania: '10+ Countries',
  }
  return regional[pkg.country] ?? 'Nationwide'
}

function getPlanType(pkg: EsimPackage): string {
  const regional = [
    'Europe',
    'European Union and United Kingdom',
    'Asia',
    'Africa',
    'Latin America',
    'Middle East and North Africa',
    'North America',
    'Oceania',
  ]
  if (pkg.country === 'Discover Global') return 'Global'
  if (regional.includes(pkg.country)) return 'Regional'
  return 'Local'
}

export function EsimPlanDetail() {
  const router = useRouter()
  const params = useSearchParams()

  const packageId = params.get('id') ?? ''
  const destination = params.get('destination') ?? ''
  const tab = destination.toLowerCase() === 'global' ? 'global' : 'local'
  const countryCodeFromId =
    tab === 'local' ? destination.toUpperCase() || 'NG' : ''

  const { data: localData, isLoading: localLoading } = useLocalEsimPackages(
    tab === 'local' ? countryCodeFromId : null,
  )
  const { data: globalData, isLoading: globalLoading } = useGlobalEsimPackages()

  const allPackages: EsimPackage[] =
    tab === 'local'
      ? (localData?.data?.data ?? [])
      : (globalData?.data?.data ?? [])

  const isLoading = tab === 'local' ? localLoading : globalLoading

  const countryPackages = allPackages.filter(
    (p) =>
      p.country_code?.toUpperCase() === countryCodeFromId ||
      p.package_id === packageId,
  )

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedPkg =
    countryPackages.find((p) => p.package_id === selectedId) ??
    countryPackages.find((p) => p.package_id === packageId) ??
    countryPackages[0] ??
    null

  /* ── Plan list pagination ── */
  const [plansPage, setPlansPage] = useState(1)

  const plansTotalPages = Math.max(
    1,
    Math.ceil(countryPackages.length / PLANS_PER_PAGE),
  )

  // Reset to page 1 whenever the package list changes (e.g. data finishes loading)
  useEffect(() => {
    setPlansPage(1)
  }, [countryPackages.length])

  const paginatedPlans = useMemo(() => {
    const start = (plansPage - 1) * PLANS_PER_PAGE
    return countryPackages.slice(start, start + PLANS_PER_PAGE)
  }, [countryPackages, plansPage])

  const photo = selectedPkg
    ? (COUNTRY_PHOTOS[selectedPkg.country] ?? null)
    : null
  const code = selectedPkg ? getCountryCode(selectedPkg) : countryCodeFromId
  const coverage = selectedPkg ? getCoverage(selectedPkg) : 'Nationwide'
  const planType = selectedPkg ? getPlanType(selectedPkg) : 'Local'
  const coverageCountries = selectedPkg
    ? (COVERAGE_COUNTRIES[selectedPkg.country] ?? null)
    : null

  function handleBuy() {
    if (!selectedPkg) return
    const q = new URLSearchParams()
    q.set('id', selectedPkg.package_id)
    q.set('destination', destination || selectedPkg.country)
    q.set('data', selectedPkg.data)
    q.set('validity', String(selectedPkg.validity_days))
    router.push(`/esim/checkout?${q.toString()}`)
  }

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

        {/* Hero */}
        <div
          className='relative mb-8 overflow-hidden rounded-2xl bg-muted'
          style={{ minHeight: 300 }}
        >
          {photo && (
            <Image
              src={photo}
              alt={selectedPkg?.country ?? ''}
              fill
              className='object-cover'
            />
          )}
          <div className='absolute inset-0 bg-black/35' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent' />

          <div className='absolute bottom-4 right-4 rounded-md border border-primary/40 bg-black/50 px-2.5 py-1 font-mono text-[10px] font-bold text-primary backdrop-blur-sm'>
            5G
          </div>

          <div className='absolute bottom-4 left-4 flex items-end gap-3'>
            <div className='flex size-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm'>
              <span className='font-mono text-sm font-bold text-white'>
                {code}
              </span>
            </div>
            <div>
              <p className='font-mono text-[10px] font-bold uppercase tracking-wider text-primary'>
                {planType} eSIM
              </p>
              <h1 className='font-heading text-3xl font-black uppercase leading-tight text-white'>
                {selectedPkg?.country ?? destination}
              </h1>
              <div className='flex items-center gap-1 text-white/60'>
                <Globe className='size-3' />
                <span className='text-xs'>{coverage}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]'>
          <div className='space-y-10'>
            <EsimPlanInfo
              selectedPkg={selectedPkg}
              isLoading={isLoading}
              coverage={coverage}
              planType={planType}
              coverageCountries={coverageCountries}
            />

            <section>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='font-heading text-base font-black uppercase tracking-wide'>
                  Choose Your Plan
                </h2>
                {!isLoading && countryPackages.length > 0 && (
                  <span className='font-mono text-[10px] text-muted-foreground'>
                    {countryPackages.length} plan
                    {countryPackages.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              {isLoading ? (
                <div className='space-y-3'>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className='h-16 animate-pulse rounded-xl bg-muted'
                    />
                  ))}
                </div>
              ) : countryPackages.length === 0 ? (
                <p className='text-sm text-muted-foreground'>
                  No plans found for this destination.
                </p>
              ) : (
                <>
                  <div className='space-y-3'>
                    {paginatedPlans.map((pkg) => (
                      <PlanRow
                        key={pkg.package_id}
                        pkg={pkg}
                        selected={
                          pkg.package_id === (selectedPkg?.package_id ?? '')
                        }
                        onSelect={() => setSelectedId(pkg.package_id)}
                      />
                    ))}
                  </div>
                  <Pagination
                    page={plansPage}
                    totalPages={plansTotalPages}
                    onPage={setPlansPage}
                  />
                </>
              )}
            </section>

            <EsimFaqSection />
          </div>

          <div className='lg:sticky lg:top-6 lg:self-start'>
            <PlanSidebar
              pkg={selectedPkg}
              onBuy={handleBuy}
              country={destination}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
