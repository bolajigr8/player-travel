import type { Metadata } from 'next'
import { DashboardHomeClient } from './client'

export const metadata: Metadata = {
  title: 'Home — Golafly Dashboard',
  description:
    'Welcome back. View your upcoming trips, bookings, points and everything you need for your next adventure.',
}

export default function DashboardPage() {
  return <DashboardHomeClient />
}
