import { EsimPlanDetail } from '@/components/esim/plan/plan-detail'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Plan Details | Golafly eSIM',
}

export default function EsimPlanPage() {
  return <Suspense>
    <EsimPlanDetail />
    </Suspense>
  
}
