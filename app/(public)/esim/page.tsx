import { EsimLandingClient } from '@/components/esim/landing/landing-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'eSIM data plans | Golafly Travel',
  description:
    'High-speed eSIM data plans in 200+ countries — instant delivery, instant activation.',
}

export default function EsimPage() {
  return <EsimLandingClient />
}
