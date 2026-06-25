import { EsimCheckout } from '@/components/esim/checkout/esim-checkout'
import type { Metadata } from 'next'
import { Suspense } from 'react'


export const metadata: Metadata = {
  title: 'Checkout | Golafly eSIM',
}

export default function EsimCheckoutPage() {
  return (
      <Suspense>
<EsimCheckout />      </Suspense>
    )
}
