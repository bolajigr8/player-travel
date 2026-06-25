import { ChevronLeft, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { cn } from '@/lib/utils'

export function Step2ContactDetails({
  email,
  setEmail,
  fullName,
  setFullName,
  phone,
  setPhone,
  deviceConfirmed,
  setDeviceConfirmed,
  activationConfirmed,
  setActivationConfirmed,
  isPending,
  onBack,
  onSubmit,
}: {
  email: string
  setEmail: (v: string) => void
  fullName: string
  setFullName: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  deviceConfirmed: boolean
  setDeviceConfirmed: (fn: (o: boolean) => boolean) => void
  activationConfirmed: boolean
  setActivationConfirmed: (fn: (o: boolean) => boolean) => void
  isPending: boolean
  onBack: () => void
  onSubmit: () => void
}) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3 rounded-2xl border border-border bg-card p-5'>
        <div className='grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary'>
          <svg viewBox='0 0 20 20' fill='currentColor' className='size-5'>
            <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
            <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
          </svg>
        </div>
        <div>
          <p className='font-heading font-bold'>Your Details</p>
          <p className='text-[12px] text-muted-foreground'>
            We'll email your eSIM QR code & install guide here
          </p>
        </div>
      </div>

      <div className='space-y-4'>
        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-foreground'>
            Email <span className='text-primary'>*</span>
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='your@email.com'
            className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'
          />
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-foreground'>
            Full name
          </label>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='Full name'
            className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'
          />
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-foreground'>
            Phone number
          </label>
          <PhoneInput
            country='ng'
            value={phone}
            onChange={(val) => setPhone(val)}
            inputClass='!w-full !rounded-xl !border-border !bg-background !text-foreground !text-sm !h-12 !pl-[52px] focus:!border-primary'
            buttonClass='!rounded-l-xl !border-border !bg-background'
            dropdownClass='!bg-card !border-border !text-foreground'
            searchClass='!bg-background !text-foreground !border-border'
          />
        </div>

        {/* Device compatibility — round radio style */}
        <button
          type='button'
          onClick={() => setDeviceConfirmed((o) => !o)}
          className={cn(
            'flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200',
            deviceConfirmed
              ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.2)]'
              : 'border-border bg-card hover:border-primary/30',
          )}
        >
          <div
            className={cn(
              'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all',
              deviceConfirmed
                ? 'border-primary bg-primary'
                : 'border-muted-foreground/40',
            )}
          >
            {deviceConfirmed && (
              <CheckCircle2 className='size-4 text-primary-foreground' />
            )}
          </div>
          <p className='text-sm leading-relaxed'>
            <span className='font-bold'>
              My device is eSIM-compatible and carrier-unlocked.
            </span>{' '}
            Most phones since 2019 support eSIM (iPhone XS+, Pixel 3+, recent
            Galaxy).
          </p>
        </button>

        {/* Activation note — square checkbox style */}
        <button
          type='button'
          onClick={() => setActivationConfirmed((o) => !o)}
          className={cn(
            'flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200',
            activationConfirmed
              ? 'border-primary/40 bg-primary/[0.02]'
              : 'border-border bg-card hover:border-border/80',
          )}
        >
          <div
            className={cn(
              'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border-2 transition-all',
              activationConfirmed
                ? 'border-primary bg-primary'
                : 'border-muted-foreground/40',
            )}
          >
            {activationConfirmed && (
              <svg viewBox='0 0 10 8' fill='none' className='size-2.5'>
                <path
                  d='M1 4l2.5 2.5L9 1'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-primary-foreground'
                />
              </svg>
            )}
          </div>
          <p className='text-sm text-muted-foreground'>
            Your eSIM activates only when you connect at your destination —
            install any time before you travel.
          </p>
        </button>
      </div>

      <div className='flex items-center justify-between pt-2'>
        <button
          onClick={onBack}
          className='flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          <ChevronLeft className='size-4' /> Back
        </button>
        <motion.button
          onClick={onSubmit}
          disabled={isPending || !email}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)] disabled:opacity-50'
        >
          {isPending && <Loader2 className='size-3.5 animate-spin' />}
          {isPending ? 'Redirecting…' : 'Continue'}
          {!isPending && <ChevronRight className='size-4' />}
        </motion.button>
      </div>
    </div>
  )
}
