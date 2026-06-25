'use client'

import { cn } from '@/lib/utils'
import {
  Globe,
  Wifi,
  Zap,
  Smartphone,
  ShieldCheck,
  QrCode,
  CalendarDays,
  Database,
} from 'lucide-react'
import type { EsimPackage } from '@/features/esim/types'

const INCLUDED_FEATURES = [
  { icon: Wifi, label: '5G / 4G LTE speeds' },
  { icon: Wifi, label: 'Hotspot / tethering' },
  { icon: Zap, label: 'Instant delivery' },
  { icon: Smartphone, label: 'Keep your number' },
  { icon: Globe, label: 'No roaming fees' },
  { icon: QrCode, label: 'Easy QR install' },
]

const HOW_STEPS = [
  {
    n: 1,
    title: 'Choose your plan',
    body: 'Pick a destination and the amount of data you need.',
  },
  {
    n: 2,
    title: 'Receive your QR',
    body: 'Your eSIM is emailed to you instantly after purchase.',
  },
  {
    n: 3,
    title: 'Scan & install',
    body: 'Scan the QR code in your phone settings to add the eSIM.',
  },
  {
    n: 4,
    title: 'Activate & connect',
    body: "Switch the eSIM on when you arrive and you're online.",
  },
]

function DetailChip({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType
  value: string
  label: string
}) {
  return (
    <div className='flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3'>
      <div className='grid size-8 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary'>
        <Icon className='size-4' />
      </div>
      <div>
        <p className='text-sm font-bold leading-tight'>{value}</p>
        <p className='font-mono text-[9px] uppercase tracking-wider text-muted-foreground'>
          {label}
        </p>
      </div>
    </div>
  )
}

interface EsimPlanInfoProps {
  selectedPkg: EsimPackage | null
  isLoading: boolean
  coverage: string
  planType: string
  coverageCountries: string[] | null
}

export function EsimPlanInfo({
  selectedPkg,
  isLoading,
  coverage,
  planType,
  coverageCountries,
}: EsimPlanInfoProps) {
  return (
    <>
      {selectedPkg && !isLoading && (
        <section>
          <h2 className='mb-4 font-heading text-base font-black uppercase tracking-wide'>
            Plan Details
          </h2>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            <DetailChip icon={Database} value={selectedPkg.data} label='Data' />
            <DetailChip
              icon={CalendarDays}
              value={`${selectedPkg.validity_days} Days`}
              label='Validity'
            />
            <DetailChip icon={Wifi} value='5G' label='Speed' />
            <DetailChip
              icon={Smartphone}
              value={selectedPkg.operator}
              label='Network'
            />
            <DetailChip icon={Globe} value={coverage} label='Coverage' />
            <DetailChip icon={ShieldCheck} value={planType} label='Plan Type' />
          </div>
        </section>
      )}

      <section>
        <h2 className='mb-4 font-heading text-base font-black uppercase tracking-wide'>
          What's Included
        </h2>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {INCLUDED_FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className='flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3'
            >
              <div className='grid size-8 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary'>
                <Icon className='size-4' />
              </div>
              <span className='text-sm font-medium'>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {selectedPkg && (
        <section>
          <h2 className='mb-3 font-heading text-base font-black uppercase tracking-wide'>
            Coverage
          </h2>
          {coverageCountries ? (
            <div className='flex flex-wrap gap-2'>
              {coverageCountries.map((c) => (
                <span
                  key={c}
                  className='rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground'
                >
                  {c}
                </span>
              ))}
            </div>
          ) : (
            <p className='text-sm text-muted-foreground'>
              {coverage} coverage across {selectedPkg.country} on the{' '}
              {selectedPkg.operator} network.
            </p>
          )}
        </section>
      )}

      <section>
        <h2 className='mb-6 font-heading text-base font-black uppercase tracking-wide'>
          How to Install
        </h2>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
          {HOW_STEPS.map((step) => (
            <div key={step.n} className='space-y-2.5'>
              <div className='grid size-9 place-items-center rounded-full bg-primary font-mono text-sm font-black text-primary-foreground'>
                {step.n}
              </div>
              <p className='text-sm font-bold'>{step.title}</p>
              <p className='text-[12px] leading-relaxed text-muted-foreground'>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
