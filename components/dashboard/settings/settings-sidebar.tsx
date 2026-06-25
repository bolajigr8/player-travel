'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Bell,
  CreditCard,
  Users,
  MapPin,
  HelpCircle,
  ChevronRight,
  DollarSign,
  TrendingDown,
  WifiOff,
  Gauge,
  Headphones,
  FileText,
  Shield,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

function Toggle({
  checked,
  onToggle,
}: {
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      role='switch'
      aria-checked={checked}
      onClick={onToggle}
      className={cn(
        'relative inline-flex h-6.5 w-11.5 shrink-0 items-center rounded-full transition-colors duration-200',
        checked ? 'bg-primary' : 'bg-muted',
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 rounded-full bg-card shadow-sm transition-transform duration-200 border border-border/30',
          checked ? 'translate-x-5.75' : 'translate-x-0.75',
        )}
      />
    </button>
  )
}

const QUICK_SHORTCUTS = [
  {
    icon: Bell,
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
    label: 'Notification Preferences',
  },
  {
    icon: CreditCard,
    iconBg: 'bg-[#60A5FA]/15',
    iconColor: 'text-[#60A5FA]',
    label: 'Payment Methods',
  },
  {
    icon: Users,
    iconBg: 'bg-[#C084FC]/15',
    iconColor: 'text-[#C084FC]',
    label: 'Saved Travellers',
  },
  {
    icon: MapPin,
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    label: 'Address Book',
  },
  {
    icon: HelpCircle,
    iconBg: 'bg-muted/50',
    iconColor: 'text-muted-foreground',
    label: 'Help Centre',
  },
]

const SUPPORT_ITEMS = [
  { icon: HelpCircle, label: 'Help Centre' },
  { icon: Headphones, label: 'Contact Support' },
  { icon: FileText, label: 'Terms & Conditions' },
  { icon: Shield, label: 'Privacy Policy' },
]

export function SettingsSidebar() {
  const [appPrefs, setAppPrefs] = useState({
    autoCurrency: true,
    priceAlerts: true,
    offlineAccess: false,
    dataSaver: true,
  })
  const toggle = (key: keyof typeof appPrefs) =>
    setAppPrefs((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className='space-y-4'>
      {/* Quick Shortcuts */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.38 }}
        className='rounded-2xl border border-border bg-card'
      >
        <div className='px-5 pt-5 pb-3'>
          <h2 className='font-heading text-[17px] font-bold text-foreground dark:text-primary'>
            Quick Shortcuts
          </h2>
        </div>
        <div className='divide-y divide-border'>
          {QUICK_SHORTCUTS.map(({ icon: Icon, iconBg, iconColor, label }) => (
            <button
              key={label}
              className='flex w-full items-center gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors text-left'
            >
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                  iconBg,
                )}
              >
                <Icon className={cn('h-3.5 w-3.5', iconColor)} />
              </div>
              <span className='flex-1 font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                {label}
              </span>
              <ChevronRight className='h-4 w-4 shrink-0 text-muted-foreground' />
            </button>
          ))}
        </div>
      </motion.div>

      {/* App Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.38 }}
        className='rounded-2xl border border-border bg-card'
      >
        <div className='px-5 pt-5 pb-3'>
          <h2 className='font-heading text-[17px] font-bold text-foreground dark:text-primary'>
            App Preferences
          </h2>
        </div>
        <div className='divide-y divide-border'>
          {[
            {
              key: 'autoCurrency' as const,
              icon: DollarSign,
              iconBg: 'bg-primary/15',
              iconColor: 'text-primary',
              label: 'Auto Currency',
              sub: 'Automatically convert prices to your currency.',
            },
            {
              key: 'priceAlerts' as const,
              icon: TrendingDown,
              iconBg: 'bg-[#60A5FA]/15',
              iconColor: 'text-[#60A5FA]',
              label: 'Price Alerts',
              sub: 'Get notified when prices drop for saved trips.',
            },
            {
              key: 'offlineAccess' as const,
              icon: WifiOff,
              iconBg: 'bg-[#C084FC]/15',
              iconColor: 'text-[#C084FC]',
              label: 'Offline Access',
              sub: 'Access your bookings and trip details offline.',
            },
            {
              key: 'dataSaver' as const,
              icon: Gauge,
              iconBg: 'bg-amber-500/15',
              iconColor: 'text-amber-400',
              label: 'Data Saver',
              sub: 'Reduce data usage while browsing.',
            },
          ].map(({ key, icon: Icon, iconBg, iconColor, label, sub }) => (
            <div key={label} className='flex items-center gap-3 px-5 py-3.5'>
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                  iconBg,
                )}
              >
                <Icon className={cn('h-3.5 w-3.5', iconColor)} />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                  {label}
                </p>
                <p className='text-[11px] text-muted-foreground mt-0.5 leading-snug'>
                  {sub}
                </p>
              </div>
              <Toggle checked={appPrefs[key]} onToggle={() => toggle(key)} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Support & Legal */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.38 }}
        className='rounded-2xl border border-border bg-card'
      >
        <div className='px-5 pt-5 pb-3'>
          <h2 className='font-heading text-[17px] font-bold text-foreground dark:text-primary'>
            Support & Legal
          </h2>
        </div>
        <div className='divide-y divide-border'>
          {SUPPORT_ITEMS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className='flex w-full items-center gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors text-left'
            >
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted/40'>
                <Icon className='h-3.5 w-3.5 text-muted-foreground' />
              </div>
              <span className='flex-1 font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                {label}
              </span>
              <ChevronRight className='h-4 w-4 shrink-0 text-muted-foreground' />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Promo banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.38 }}
        className='relative overflow-hidden rounded-2xl border border-border bg-card'
      >
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent' />
        <div className='pointer-events-none absolute bottom-0 right-0 w-32 opacity-20 dark:opacity-40'>
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Soccer_ball.svg/480px-Soccer_ball.svg.png'
            alt=''
            width={128}
            height={128}
            className='w-full drop-shadow-lg'
          />
        </div>
        <div className='pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-transparent to-card' />

        <div className='relative z-10 p-5'>
          <h3 className='font-heading text-[18px] font-bold text-foreground dark:text-primary leading-tight'>
            Your experience,
            <br />
            your way.
          </h3>
          <p className='mt-2 text-[12px] text-muted-foreground leading-snug max-w-40'>
            Update your settings to get the most out of Golafly.
          </p>
          <Link
            href='#'
            className='mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-heading text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90'
          >
            Learn More <ArrowRight className='h-3.5 w-3.5' />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
