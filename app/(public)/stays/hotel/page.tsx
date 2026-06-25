import type { Metadata } from 'next'
import { StayHotelClient } from '@/components/stays/hotel/stay-hotel-client'

export const metadata: Metadata = {
  title: 'Sunset Beach Resort | Golafly Stays',
}

export default function StayHotelPage() {
  return <StayHotelClient />
}
