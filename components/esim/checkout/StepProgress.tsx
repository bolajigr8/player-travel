import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CheckoutStep = 1 | 2

export function StepProgress({ step }: { step: CheckoutStep }) {
  const steps = [
    { n: 1, label: 'Your Plan' },
    { n: 2, label: 'Your Details' },
    { n: 3, label: 'Payment' },
  ]
  return (
    <div className='flex items-center'>
      {steps.map(({ n, label }, i) => {
        const done = step > n
        const active = step === n
        return (
          <div key={label} className='flex items-center'>
            <div className='relative flex items-center gap-2 py-4 -my-4'>
              <div
                className={cn(
                  'flex size-7 items-center justify-center rounded-full font-mono text-[11px] font-black transition-all',
                  done
                    ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                    : active
                      ? 'bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.5)]'
                      : 'bg-muted text-muted-foreground ring-1 ring-border',
                )}
              >
                {done ? <CheckCircle2 className='size-4' /> : n}
              </div>
              <span
                className={cn(
                  'font-mono text-[13px] font-bold uppercase tracking-wider transition-colors',
                  active
                    ? 'text-primary'
                    : done
                      ? 'text-primary/70'
                      : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
              {active && (
                <span className='absolute -bottom-0.5 lg:-bottom-2 left-0 right-0 h-0.5 rounded-full bg-primary' />
              )}
            </div>
            {i < steps.length - 1 && (
              <div className='mx-4 h-px w-8 bg-border' />
            )}
          </div>
        )
      })}
    </div>
  )
}
