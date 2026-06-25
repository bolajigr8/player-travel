'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone, MapPin, Calendar, Camera } from 'lucide-react'
import { DASHBOARD_USER } from '@/store/dashboard'

const CONTACT_ROWS = [
  { Icon: Mail, value: DASHBOARD_USER.email, verified: true },
  { Icon: Phone, value: DASHBOARD_USER.phone, verified: false },
  { Icon: MapPin, value: DASHBOARD_USER.location, verified: false },
  {
    Icon: Calendar,
    value: `Member since ${DASHBOARD_USER.memberSince}`,
    verified: false,
  },
]

export function ProfileHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='w-full rounded-2xl border border-border bg-card p-5 sm:p-8 lg:p-10 flex flex-col justify-between'
    >
      {/* Top: avatar + info */}
      <div className='flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8 sm:pl-4 lg:pl-16 sm:pt-4 lg:pt-8'>
        {/* Avatar */}
        <div className='relative shrink-0'>
          <div className='h-28 w-28 sm:h-40 sm:w-40 lg:h-52 lg:w-52 overflow-hidden rounded-full ring-4 ring-border'>
            <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500'>
              <span className='font-heading text-5xl sm:text-7xl font-bold text-white'>
                {DASHBOARD_USER.name[0]}
              </span>
            </div>
          </div>
          <button className='absolute bottom-1 right-1 sm:bottom-2 sm:right-2 lg:bottom-3 lg:right-3 flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:text-foreground'>
            <Camera className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
          </button>
        </div>

        {/* Name + contact */}
        <div className='flex flex-col items-center sm:items-start'>
          <h2 className='font-heading text-[32px] sm:text-[38px] lg:text-[46px] font-bold text-foreground dark:text-primary text-center sm:text-left'>
            {DASHBOARD_USER.fullName}
          </h2>
          <div className='mt-4 space-y-2.5 sm:space-y-4'>
            {CONTACT_ROWS.map(({ Icon, value, verified }) => (
              <div
                key={value}
                className='flex items-center gap-2.5 sm:gap-3 text-[13px] sm:text-[15px] lg:text-[17px] text-muted-foreground'
              >
                <Icon className='h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/70 shrink-0' />
                <span className='truncate max-w-55 sm:max-w-none'>{value}</span>
                {verified && (
                  <span className='flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[9px] sm:text-[11px] font-bold text-primary'>
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className='mt-6 sm:mt-12 grid grid-cols-3 overflow-hidden rounded-xl border border-border bg-muted/60 dark:bg-black/30 backdrop-blur-md'>
        <div className='flex flex-col items-center justify-center py-4 sm:py-5 lg:py-6'>
          <span className='text-[10px] sm:text-xs text-muted-foreground text-center px-1'>
            Trips Completed
          </span>
          <span className='text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground dark:text-primary mt-1'>
            {DASHBOARD_USER.tripsCompleted}
          </span>
        </div>
        <div className='flex flex-col items-center justify-center py-4 sm:py-5 lg:py-6 border-x border-border dark:border-white/10'>
          <span className='text-[10px] sm:text-xs text-muted-foreground'>
            Points
          </span>
          <span className='text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mt-1'>
            {DASHBOARD_USER.points.toLocaleString()}
          </span>
        </div>
        <div className='flex flex-col items-center justify-center py-4 sm:py-5 lg:py-6'>
          <span className='text-[10px] sm:text-xs text-muted-foreground text-center px-1'>
            Rewards Redeemed
          </span>
          <span className='text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground dark:text-primary mt-1'>
            {DASHBOARD_USER.rewardsRedeemed}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
