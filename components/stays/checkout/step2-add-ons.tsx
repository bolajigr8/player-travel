import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  Car,
  Clock,
  ParkingCircle,
  ShieldCheck,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ADD_ONS } from '@/store/booking'

const ICONS: Record<string, React.ElementType> = {
  coffee: Coffee,
  car: Car,
  clock: Clock,
  parking: ParkingCircle,
  shield: ShieldCheck,
}

export function Step2AddOns({
  selectedAddOnIds,
  toggleAddOn,
  nights,
  onBack,
  onContinue,
}: {
  selectedAddOnIds: string[]
  toggleAddOn: (id: string) => void
  nights: number
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <div className='space-y-6'>
      <div className='rounded-2xl border border-border bg-card p-5'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary'>
            <Coffee className='size-5' />
          </div>
          <div>
            <p className='font-heading font-bold'>Enhance your stay</p>
            <p className='text-[12px] text-muted-foreground'>
              Optional extras — add now, pay at checkout
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {ADD_ONS.map((addOn) => {
            const Icon = ICONS[addOn.icon] ?? Coffee
            const selected = selectedAddOnIds.includes(addOn.id)
            const computedPrice =
              addOn.unit === '/ night' ? addOn.price : addOn.price
            return (
              <div
                key={addOn.id}
                className={cn(
                  'flex flex-col gap-3 rounded-xl border p-4 transition-colors',
                  selected
                    ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]'
                    : 'border-border bg-background',
                )}
              >
                <div className='flex items-start gap-3'>
                  <div className='grid size-9 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary'>
                    <Icon className='size-4' />
                  </div>
                  <div className='min-w-0'>
                    <p className='text-sm font-bold leading-tight'>
                      {addOn.label}
                    </p>
                    <p className='text-[11px] leading-relaxed text-muted-foreground'>
                      {addOn.description}
                    </p>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='font-heading text-base font-bold'>
                    ${computedPrice.toFixed(2)}{' '}
                    <span className='font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground'>
                      {addOn.unit}
                    </span>
                  </span>
                  <motion.button
                    onClick={() => toggleAddOn(addOn.id)}
                    whileTap={{ scale: 0.96 }}
                    className={cn(
                      'rounded-lg border px-4 py-1.5 font-mono text-[11px] font-black uppercase tracking-wide transition-colors',
                      selected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-foreground hover:border-primary/40',
                    )}
                  >
                    {selected ? 'Added' : 'Add'}
                  </motion.button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='flex items-center justify-between pt-2'>
        <button
          onClick={onBack}
          className='flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          <ChevronLeft className='size-4' /> Back
        </button>
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]'
        >
          Continue <ChevronRight className='size-4' />
        </motion.button>
      </div>
    </div>
  )
}
