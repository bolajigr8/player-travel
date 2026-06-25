'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'

export function StayLocationMap({ location }: { location: string }) {
  return (
    <section>
      <h2 className='mb-3 font-heading text-base font-black uppercase tracking-wide'>
        Location
      </h2>
      <div className='relative h-72 overflow-hidden rounded-2xl border border-border bg-muted'>
        <Image
          src='/stays/map.jpeg'
          alt='Map'
          fill
          sizes='(max-width: 640px) 100vw, 50vw' // adjust to your layout width
          className='object-cover'
        />{' '}
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full'>
          <MapPin className='size-9 fill-primary text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]' />
        </div>
        <div className='absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur-sm'>
          <MapPin className='size-3 text-primary' />
          {location}
        </div>
      </div>
    </section>
  )
}
