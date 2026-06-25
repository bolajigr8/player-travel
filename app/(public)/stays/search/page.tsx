import type { Metadata } from 'next'
import { Suspense } from 'react'
import { StaysSearchClient } from '@/components/stays/search/stays-search-client'

export const metadata: Metadata = { title: 'Search Stays | Golafly Stays' }

export default function StaysSearchPage() {
  return <Suspense><StaysSearchClient /></Suspense>
}