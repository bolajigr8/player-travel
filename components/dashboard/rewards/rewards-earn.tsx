'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Plane,
  BedDouble,
  Wifi,
  Package,
  Users,
} from 'lucide-react'
import { EARN_WAYS } from '@/store/dashboard'

const EARN_ICONS = [Plane, BedDouble, Wifi, Package, Users]

export function RewardsEarnSection() {
  return (
    <section className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h2 className='font-heading text-[15px] sm:text-[16px] font-bold text-foreground dark:text-primary'>
          Earn Points
        </h2>
        <Link
          href='#'
          className='flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground hover:text-foreground'
        >
          View all ways to earn <ArrowRight className='h-3 w-3' />
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-3 sm:grid-cols-5'>
        {EARN_WAYS.map((way, i) => {
          const Icon = EARN_ICONS[i]
          return (
            <motion.div
              key={way.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className='flex flex-col items-center rounded-2xl border border-border bg-card p-3 sm:p-4 text-center'
            >
              <div className='flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/10'>
                <Icon className='h-4 w-4 sm:h-5 sm:w-5 text-primary' />
              </div>
              <p className='mt-2 sm:mt-2.5 font-heading text-[11px] sm:text-[12px] font-bold text-foreground dark:text-primary'>
                {way.label}
              </p>
              <p className='mt-0.5 font-heading text-[13px] sm:text-[15px] font-bold text-primary'>
                +{way.points} pts
              </p>
              <p className='mt-0.5 text-[9px] sm:text-[10px] text-muted-foreground'>
                {way.unit}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
