import type { Metadata } from 'next'
import { SettingsClient } from './client'

export const metadata: Metadata = {
  title: 'Settings — Golafly Dashboard',
  description:
    'Manage your account settings, communication preferences and security options.',
}

export default function SettingsPage() {
  return <SettingsClient />
}
