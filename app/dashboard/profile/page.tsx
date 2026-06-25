import type { Metadata } from 'next'
import { ProfileClient } from './client'

export const metadata: Metadata = {
  title: 'My Profile — Golafly Dashboard',
  description:
    'Manage your account details, travel preferences and personal information.',
}

export default function ProfilePage() {
  return <ProfileClient />
}
