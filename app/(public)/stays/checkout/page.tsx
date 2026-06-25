import type { Metadata } from 'next'
import { Suspense } from 'react'
import { StayCheckout } from '@/components/stays/checkout/stay-checkout'

export const metadata: Metadata = { title: 'Checkout | Golafly Stays' }

export default function StayCheckoutPage() {
  return <Suspense><StayCheckout /></Suspense>
}