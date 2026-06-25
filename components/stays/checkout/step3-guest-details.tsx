import { ChevronLeft, ChevronRight, User, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export function Step3GuestDetails({
  firstName,
  lastName,
  email,
  countryCode,
  phone,
  arrivalTime,
  specialRequests,
  setGuestField,
  isPending,
  onBack,
  onSubmit,
}: {
  firstName: string
  lastName: string
  email: string
  countryCode: string
  phone: string
  arrivalTime: string
  specialRequests: string
  setGuestField: (field: string, value: string) => void
  isPending: boolean
  onBack: () => void
  onSubmit: () => void
}) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3 rounded-2xl border border-border bg-card p-5'>
        <div className='grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary'>
          <User className='size-5' />
        </div>
        <div>
          <p className='font-heading font-bold'>Guest Details</p>
          <p className='text-[12px] text-muted-foreground'>
            Who&apos;s the lead guest for this booking?
          </p>
        </div>
      </div>

      <div className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-foreground'>
              First name <span className='text-primary'>*</span>
            </label>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setGuestField('firstName', e.target.value)}
              placeholder='First name'
              className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'
            />
          </div>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-foreground'>
              Last name <span className='text-primary'>*</span>
            </label>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setGuestField('lastName', e.target.value)}
              placeholder='Last name'
              className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'
            />
          </div>
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-foreground'>
            Email <span className='text-primary'>*</span>
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setGuestField('email', e.target.value)}
            placeholder='your@email.com'
            className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'
          />
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-foreground'>
            Phone number <span className='text-primary'>*</span>
          </label>
          <PhoneInput
            country='ng'
            value={phone}
            onChange={(val) => setGuestField('phone', val)}
            inputClass='!w-full !rounded-xl !border-border !bg-background !text-foreground !text-sm !h-12 !pl-[52px] focus:!border-primary'
            buttonClass='!rounded-l-xl !border-border !bg-background'
            dropdownClass='!bg-card !border-border !text-foreground'
            searchClass='!bg-background !text-foreground !border-border'
          />
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-foreground'>
            Estimated arrival time
          </label>
          <select
            value={arrivalTime}
            onChange={(e) => setGuestField('arrivalTime', e.target.value)}
            className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary'
          >
            <option>I&apos;m not sure</option>
            <option>Before 12:00 PM</option>
            <option>12:00 PM – 3:00 PM</option>
            <option>3:00 PM – 6:00 PM</option>
            <option>6:00 PM – 9:00 PM</option>
            <option>After 9:00 PM</option>
          </select>
        </div>

        <div className='space-y-1.5'>
          <label className='text-sm font-medium text-foreground'>
            Special requests (optional)
          </label>
          <textarea
            value={specialRequests}
            onChange={(e) => setGuestField('specialRequests', e.target.value)}
            placeholder='Let the property know if you have any requests — e.g. high floor, late arrival, quiet room…'
            rows={3}
            className='w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'
          />
        </div>

        <div className='flex items-start gap-2 rounded-xl border border-border bg-card px-4 py-3'>
          <span className='text-primary'>💬</span>
          <p className='text-[12px] text-muted-foreground'>
            Requests can&apos;t be guaranteed but the property will do its best
            to meet them.
          </p>
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
          onClick={onSubmit}
          disabled={isPending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)] disabled:opacity-50'
        >
          {isPending && <Loader2 className='size-3.5 animate-spin' />}
          {isPending ? 'Redirecting…' : 'Continue to Payment'}
          {!isPending && <ChevronRight className='size-4' />}
        </motion.button>
      </div>
    </div>
  )
}
