import type { Metadata } from 'next'
import { PaymentsClient } from './client'

export const metadata: Metadata = {
  title: 'Payments — Golafly Dashboard',
  description:
    'Manage your payment methods, view transaction history and track your spending.',
}

export default function PaymentsPage() {
  return <PaymentsClient />
}
