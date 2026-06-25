import { Suspense } from 'react'
import type { Metadata } from 'next'
import { EsimTopUp } from '@/components/esim/esim-topup'

export const metadata: Metadata = {
  title: 'Top Up eSIM | Golafly Travel',
}

export default function EsimTopUpPage() {
  return (
    <Suspense>
      <EsimTopUp />
    </Suspense>
  )
}
