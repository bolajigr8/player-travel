import type { Metadata } from 'next'
import { RewardsClient } from './client'

export const metadata: Metadata = {
  title: 'My Rewards — Golafly Dashboard',
  description:
    'Earn points on every booking, redeem exclusive rewards and track your level.',
}

export default function RewardsPage() {
  return <RewardsClient />
}
