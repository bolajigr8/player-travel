import type { Metadata } from 'next'
import { InboxClient } from './client'

export const metadata: Metadata = {
  title: 'Inbox — Golafly Dashboard',
  description: 'All your booking updates, travel tips and offers in one place.',
}

export default function InboxPage() {
  return <InboxClient />
}
