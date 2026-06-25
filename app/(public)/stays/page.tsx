import type { Metadata } from 'next'
import { StaysLandingClient } from '@/components/stays/landing/stays-landing-client'

export const metadata: Metadata = {
  title: 'Hotels, Apartments & Villas | Golafly Stays',
  description:
    'Compare thousands of hotels, apartments & villas. Free cancellation, best price guarantee.',
}

export default function StaysPage() {
  return <StaysLandingClient />
}
