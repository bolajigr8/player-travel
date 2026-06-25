'use client'

import {
  Waves,
  Sparkles,
  Wifi,
  Dumbbell,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  pool: Waves,
  spa: Sparkles,
  wifi: Wifi,
  gym: Dumbbell,
  restaurant: UtensilsCrossed,
  bar: Wine,
}

export function StayAmenitiesGrid({
  amenities,
}: {
  amenities: { label: string; icon: string }[]
}) {
  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
      {amenities.map((a) => {
        const Icon = ICONS[a.icon] ?? Wifi
        return (
          <div
            key={a.label}
            className='flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3'
          >
            <div className='grid size-8 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary'>
              <Icon className='size-4' />
            </div>
            <span className='text-sm font-medium'>{a.label}</span>
          </div>
        )
      })}
    </div>
  )
}
