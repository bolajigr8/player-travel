import { Database, Wifi } from 'lucide-react'
import type { EsimPackage } from '@/features/esim/types'

export function OrderSidebar({
  pkg,
  isGlobal,
}: {
  pkg: EsimPackage | null
  isGlobal: boolean
}) {
  if (!pkg) return null
  const code =
    pkg.country_code?.toUpperCase().slice(0, 2) ??
    pkg.country.slice(0, 2).toUpperCase()

  return (
    <div className='overflow-hidden rounded-2xl border border-border bg-card'>
      {/* Header uses primary color */}
      <div className='flex items-center gap-2 bg-primary px-4 py-3.5'>
        <Database className='size-4 text-primary-foreground' />
        <div>
          <p className='font-heading text-sm font-black text-primary-foreground'>
            Your Order
          </p>
          <p className='font-mono text-[9px] uppercase tracking-wider text-primary-foreground/70'>
            Live Summary
          </p>
        </div>
      </div>

      <div className='space-y-4 p-4'>
        <div className='flex items-center gap-3'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm font-bold'>
            {code}
          </div>
          <div>
            <p className='text-sm font-bold'>{pkg.country}</p>
            <p className='text-[11px] text-muted-foreground'>
              {isGlobal ? 'Regional / Global' : 'Nationwide'}
            </p>
          </div>
        </div>

        <div className='space-y-1 text-[12px] text-muted-foreground'>
          <div className='flex items-center gap-1.5'>
            <Database className='size-3 shrink-0 text-primary' />
            {pkg.data} · {pkg.validity_days} Days
          </div>
          <div className='flex items-center gap-1.5'>
            <Wifi className='size-3 shrink-0 text-primary' />
            5G / 4G LTE · {pkg.operator}
          </div>
        </div>

        <div className='space-y-1.5 border-t border-border pt-3 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>
              {pkg.country} eSIM ({pkg.data})
            </span>
            <span className='font-medium'>€{pkg.price.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Delivery</span>
            <span className='font-bold text-primary'>Instant</span>
          </div>
        </div>

        <div className='flex items-center justify-between rounded-xl bg-primary px-4 py-3.5 font-black'>
          <span className='text-sm text-primary-foreground'>Total:</span>
          <span className='text-primary-foreground'>
            €{pkg.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
