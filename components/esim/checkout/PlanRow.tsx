import { cn } from '@/lib/utils'
import type { EsimPackage } from '@/features/esim/types'

export function PlanRow({
  pkg,
  selected,
  onSelect,
}: {
  pkg: EsimPackage
  selected: boolean
  onSelect: () => void
}) {
  const ppd =
    pkg.validity_days > 0 ? (pkg.price / pkg.validity_days).toFixed(2) : null
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-200',
        selected
          ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]'
          : 'border-border bg-card hover:border-primary/40',
      )}
    >
      <div
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          selected ? 'border-primary bg-primary' : 'border-muted-foreground/40',
        )}
      >
        {selected && (
          <div className='size-2 rounded-full bg-primary-foreground' />
        )}
      </div>
      <div className='min-w-0 flex-1'>
        <p className='text-sm font-bold'>
          {pkg.unlimited ? 'Unlimited' : pkg.data}
        </p>
        <p className='truncate text-[12px] text-muted-foreground'>
          {pkg.validity_days} Days · 5G/4G · {pkg.operator}
        </p>
      </div>
      <div className='shrink-0 text-right'>
        <p className='font-heading font-bold text-primary'>
          €{pkg.price.toFixed(2)}
        </p>
        {ppd && (
          <p className='font-mono text-[10px] text-muted-foreground'>
            €{ppd}/DAY
          </p>
        )}
      </div>
    </button>
  )
}
