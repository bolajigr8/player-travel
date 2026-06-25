import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StayCheckoutStep = 1 | 2 | 3

export function StayStepProgress({ step }: { step: StayCheckoutStep }) {
  const steps = [
    { n: 1, label: 'Your Stay' },
    { n: 2, label: 'Add-ons' },
    { n: 3, label: 'Guest Details' },
    { n: 4, label: 'Payment' },
  ]

  return (
    <div className='flex items-center overflow-x-auto md:overflow-x-hidden scrollbar-hide'>
      {steps.map(({ n, label }, i) => {
        const done =
          step >= n && n !== 4
            ? step > n || (n === 3 && step === 3 ? false : step > n)
            : false
        const isDone = n < step
        const active = step === n
        return (
          <div key={label} className='flex items-center'>
            <div className='relative flex items-center gap-2 py-4 -my-4'>
              <div
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-black transition-all',
                  isDone
                    ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                    : active
                      ? 'bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.5)]'
                      : 'bg-muted text-muted-foreground ring-1 ring-border',
                )}
              >
                {isDone ? <CheckCircle2 className='size-4' /> : n}
              </div>
              <span
                className={cn(
                  'whitespace-nowrap font-mono text-[12px] font-bold uppercase tracking-wider transition-colors sm:text-[13px]',
                  active
                    ? 'text-primary'
                    : isDone
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
              <div className='mx-3 h-px w-6 shrink-0 bg-border sm:mx-4 sm:w-8' />
            )}
          </div>
        )
      })}
    </div>
  )
}
