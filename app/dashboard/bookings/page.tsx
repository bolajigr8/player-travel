import type { Metadata } from 'next'
import { BookingsClient } from './client'

export const metadata: Metadata = {
  title: 'My Bookings — Golafly Dashboard',
  description:
    'View and manage all your flights, stays and eSIM bookings in one place.',
}

export default function BookingsPage() {
  return <BookingsClient />
}
