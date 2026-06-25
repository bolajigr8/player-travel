import type { Metadata } from 'next'
import { StayCheckout } from '@/components/stays/checkout/stay-checkout'

export const metadata: Metadata = {
  title: 'Checkout | Golafly Stays',
}

export default function StayCheckoutPage() {
  return <StayCheckout />
}
