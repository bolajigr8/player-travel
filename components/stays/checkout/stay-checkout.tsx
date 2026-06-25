'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { STAY_DETAIL } from '@/store/stays'
import { useBookingStore, ADD_ONS } from '@/store/booking'
import { StayStepProgress, type StayCheckoutStep } from './stay-step-progress'
import { StayBookingSummary } from './stay-booking-summary'
import { Step1YourStay } from './step1-your-stay'
import { Step2AddOns } from './step2-add-ons'
import { Step3GuestDetails } from './step3-guest-details'

export function StayCheckout() {
  const router = useRouter()
  const params = useSearchParams()

  const stay = STAY_DETAIL
  const roomIdFromQuery = params.get('room') ?? stay.rooms[0].id

  const checkIn = useBookingStore((s) => s.checkIn)
  const checkOut = useBookingStore((s) => s.checkOut)
  const guests = useBookingStore((s) => s.guests)
  const setCheckIn = useBookingStore((s) => s.setCheckIn)
  const setCheckOut = useBookingStore((s) => s.setCheckOut)
  const setGuests = useBookingStore((s) => s.setGuests)
  const selectedRoomId =
    useBookingStore((s) => s.selectedRoomId) ?? roomIdFromQuery
  const setSelectedRoom = useBookingStore((s) => s.setSelectedRoom)
  const selectedAddOnIds = useBookingStore((s) => s.selectedAddOnIds)
  const toggleAddOn = useBookingStore((s) => s.toggleAddOn)
  const nights = useBookingStore((s) => s.nights())

  const firstName = useBookingStore((s) => s.firstName)
  const lastName = useBookingStore((s) => s.lastName)
  const email = useBookingStore((s) => s.email)
  const countryCode = useBookingStore((s) => s.countryCode)
  const phone = useBookingStore((s) => s.phone)
  const arrivalTime = useBookingStore((s) => s.arrivalTime)
  const specialRequests = useBookingStore((s) => s.specialRequests)
  const setGuestField = useBookingStore((s) => s.setGuestField)

  const [step, setStep] = useState<StayCheckoutStep>(1)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const room = stay.rooms.find((r) => r.id === selectedRoomId) ?? stay.rooms[0]

  // ── Pricing ──
  const roomSubtotal = room.pricePerNight * nights
  const addOnsTotal = selectedAddOnIds.reduce((sum, id) => {
    const addOn = ADD_ONS.find((a) => a.id === id)
    if (!addOn) return sum
    return sum + (addOn.unit === '/ night' ? addOn.price * nights : addOn.price)
  }, 0)
  const taxes = Math.round(roomSubtotal * stay.taxRate)
  const total = roomSubtotal + addOnsTotal + taxes

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleStep1Continue() {
    setStep(2)
    scrollTop()
  }

  function handleStep2Continue() {
    setStep(3)
    scrollTop()
  }

  function handleStep3Submit() {
    if (!firstName || !lastName) {
      toast.error('Enter your first and last name.')
      return
    }
    if (!email || !email.includes('@')) {
      toast.error('Enter a valid email address.')
      return
    }
    if (!phone) {
      toast.error('Enter a phone number.')
      return
    }

    // ── Redirect to Stripe Checkout ──
    setIsRedirecting(true)
    toast.success('Redirecting to secure payment…', {
      description: "You'll be taken to Stripe to complete your booking.",
    })

    // Placeholder Stripe redirect — replace with real session URL from backend
    const stripeCheckoutUrl =
      process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL ??
      'https://checkout.stripe.com/'

    setTimeout(() => {
      window.location.href = stripeCheckoutUrl
    }, 900)
  }

  return (
    <div className='min-h-screen bg-background pt-10'>
      {/* Step bar */}
      <div className='sticky top-0 z-20 border-b border-border bg-background backdrop-blur-sm'>
        <div className='page-container flex items-center justify-between py-4'>
          <StayStepProgress step={step} />
          <div className='hidden text-right sm:block'>
            <p className='font-mono text-[9px] uppercase tracking-wider text-muted-foreground'>
              Running Total
            </p>
            <p className='font-heading text-lg font-black text-primary'>
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className='page-container py-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]'>
          <div>
            {step === 1 && (
              <Step1YourStay
                stay={stay}
                room={room}
                rooms={stay.rooms}
                selectedRoomId={selectedRoomId}
                onSelectRoom={setSelectedRoom}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                onCheckIn={setCheckIn}
                onCheckOut={setCheckOut}
                onGuests={setGuests}
                onBack={() => router.back()}
                onContinue={handleStep1Continue}
              />
            )}

            {step === 2 && (
              <Step2AddOns
                selectedAddOnIds={selectedAddOnIds}
                toggleAddOn={toggleAddOn}
                nights={nights}
                onBack={() => {
                  setStep(1)
                  scrollTop()
                }}
                onContinue={handleStep2Continue}
              />
            )}

            {step === 3 && (
              <Step3GuestDetails
                firstName={firstName}
                lastName={lastName}
                email={email}
                countryCode={countryCode}
                phone={phone}
                arrivalTime={arrivalTime}
                specialRequests={specialRequests}
                setGuestField={setGuestField}
                isPending={isRedirecting}
                onBack={() => {
                  setStep(2)
                  scrollTop()
                }}
                onSubmit={handleStep3Submit}
              />
            )}
          </div>

          <div className='lg:sticky lg:top-[73px] lg:self-start'>
            <StayBookingSummary
              stay={stay}
              room={room}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              nights={nights}
              roomSubtotal={roomSubtotal}
              addOnsTotal={addOnsTotal}
              taxes={taxes}
              total={total}
              selectedAddOnIds={selectedAddOnIds}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
