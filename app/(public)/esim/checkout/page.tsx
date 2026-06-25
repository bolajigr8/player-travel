import { EsimCheckout } from '@/components/esim/checkout/esim-checkout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | Golafly eSIM',
}

export default function EsimCheckoutPage() {
  return <EsimCheckout />
}
