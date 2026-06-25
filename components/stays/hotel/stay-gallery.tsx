'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LayoutGrid, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function StayGallery({ images }: { images: string[] }) {
  const [showAll, setShowAll] = useState(false)
  const [hero, second, third, fourth, fifth] = images

  return (
    <>
      {/* ✅ Fixed: explicit height on the grid container + grid-rows with defined row heights */}
      <div className='grid h-[420px] grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr_1fr] sm:grid-rows-2'>
        {/* Hero — spans 2 rows on the left */}
        <div className='relative overflow-hidden rounded-2xl sm:row-span-2'>
          <Image
            src={hero}
            alt='Hero'
            fill
            sizes='(max-width: 640px) 100vw, 66vw'
            className='object-cover'
          />
        </div>

        {/* Top-right two */}
        <div className='relative overflow-hidden rounded-2xl'>
          <Image
            src={second}
            alt='Pool'
            fill
            sizes='(max-width: 640px) 100vw, 33vw'
            className='object-cover'
          />
        </div>
        <div className='relative overflow-hidden rounded-2xl'>
          <Image
            src={third}
            alt='Room'
            fill
            sizes='(max-width: 640px) 100vw, 33vw'
            className='object-cover'
          />{' '}
        </div>

        {/* Bottom-right two */}
        <div className='relative overflow-hidden rounded-2xl'>
          <Image
            src={fourth}
            alt='Exterior'
            fill
            sizes='(max-width: 640px) 100vw, 33vw'
            className='object-cover'
          />
        </div>
        <button
          onClick={() => setShowAll(true)}
          className='group relative overflow-hidden rounded-2xl'
        >
          <Image
            src={fifth}
            alt='Deck'
            fill
            sizes='(max-width: 640px) 100vw, 33vw'
            className='object-cover'
          />{' '}
          <div className='absolute inset-0 flex items-center justify-center bg-black/55 transition-colors group-hover:bg-black/65'>
            <span className='flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white'>
              <LayoutGrid className='size-3.5' />
              Show all photos
            </span>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4'
            onClick={() => setShowAll(false)}
          >
            <button
              onClick={() => setShowAll(false)}
              className='absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20'
            >
              <X className='size-5' />
            </button>
            <div className='grid max-h-[85vh] w-full max-w-4xl gap-3 overflow-y-auto sm:grid-cols-2'>
              {images.map((img, i) => (
                <div
                  key={i}
                  className='relative h-64 overflow-hidden rounded-xl'
                >
                  <Image
                    src={img}
                    alt={`Photo ${i + 1}`}
                    fill
                    sizes='(max-width: 640px) 100vw, 50vw'
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
