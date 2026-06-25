import type { Metadata } from 'next'
import { TripsClient } from './client'

export const metadata: Metadata = {
  title: 'Trips — Golafly Dashboard',
  description:
    'Search and book flights, stays, eSIM plans and transfers for your next adventure.',
}

export default function TripsPage() {
  return <TripsClient />
}
