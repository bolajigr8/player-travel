import type { Metadata } from 'next'
import { EsimClient } from '../client'

export const metadata: Metadata = {
  title: 'eSIM Plans | Golafly Travel',
  description: 'Browse eSIM data plans for local and global destinations.',
}

export default function EsimPlansPage() {
  return <EsimClient />
}
