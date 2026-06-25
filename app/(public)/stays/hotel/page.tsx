import type { Metadata } from 'next'
import { Suspense } from 'react'
import { StayHotelClient } from '@/components/stays/hotel/stay-hotel-client'

export const metadata: Metadata = { title: 'Sunset Beach Resort | Golafly Stays' }

export default function StayHotelPage() {
  return <Suspense><StayHotelClient /></Suspense>
}