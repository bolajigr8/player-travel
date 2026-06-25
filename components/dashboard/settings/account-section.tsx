'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Phone, Mail, Camera } from 'lucide-react'
import { DASHBOARD_USER } from '@/store/dashboard'

export function AccountSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.38 }}
      className='rounded-2xl border border-border bg-card p-5'
    >
      <h2 className='font-heading text-[17px] font-bold text-foreground dark:text-primary mb-5'>
        Account Settings
      </h2>

      <div className='flex flex-col sm:flex-row items-start gap-5'>
        {/* Avatar */}
        <div className='relative shrink-0'>
          <div className='h-20 w-20 overflow-hidden rounded-2xl border-2 border-border'>
            <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500'>
              <span className='font-heading text-3xl font-bold text-white'>
                {DASHBOARD_USER.name[0]}
              </span>
            </div>
          </div>
          <button className='absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-muted hover:bg-muted/80 transition-colors'>
            <Camera className='h-3 w-3 text-muted-foreground' />
          </button>
        </div>

        {/* Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2.5 flex-wrap'>
            <h3 className='font-heading text-[22px] font-bold text-foreground dark:text-primary'>
              {DASHBOARD_USER.fullName}
            </h3>
            <span className='flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary'>
              <CheckCircle2 className='h-3 w-3' /> Verified
            </span>
          </div>
          <div className='mt-2 space-y-1.5'>
            <div className='flex items-center gap-2'>
              <Mail className='h-3.5 w-3.5 text-muted-foreground shrink-0' />
              <p className='font-mono text-[12px] text-muted-foreground'>
                {DASHBOARD_USER.email}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <Phone className='h-3.5 w-3.5 text-muted-foreground shrink-0' />
              <p className='font-mono text-[12px] text-muted-foreground'>
                {DASHBOARD_USER.phone}
              </p>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-between flex-wrap gap-3'>
            <div>
              <p className='font-mono text-[11px] text-muted-foreground'>
                Member since {DASHBOARD_USER.memberSince}
              </p>
              <p className='font-mono text-[11px] text-muted-foreground mt-0.5'>
                {DASHBOARD_USER.location}
              </p>
            </div>
            <button className='rounded-xl border border-border bg-background/40 px-4 py-2 font-heading text-[13px] font-bold text-foreground hover:border-primary/30 hover:text-primary transition-colors'>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
