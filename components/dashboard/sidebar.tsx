'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Home,
  Plane,
  BedDouble,
  Wifi,
  Mail,
  Star,
  User,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Headphones,
  X,
  Sun,
  Moon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BRAND } from '@/store/data'
import Image from 'next/image'

const NAV_ITEMS = [
  { label: 'Home', href: '/dashboard', icon: Home, badge: null, count: null },
  {
    label: 'Inbox',
    href: '/dashboard/inbox',
    icon: Mail,
    badge: null,
    count: 2,
  },
  {
    label: 'Bookings',
    href: '/dashboard/bookings',
    icon: Plane,
    badge: null,
    count: null,
  },
  {
    label: 'Trips',
    href: '/dashboard/trips',
    icon: BedDouble,
    badge: 'New',
    count: null,
  },
  {
    label: 'Rewards',
    href: '/dashboard/rewards',
    icon: Star,
    badge: null,
    count: null,
  },
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    badge: null,
    count: null,
  },
  {
    label: 'Payments',
    href: '/dashboard/payments',
    icon: CreditCard,
    badge: null,
    count: null,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    badge: null,
    count: null,
  },
] as const

export let openMobileSidebar: () => void = () => {}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    openMobileSidebar = () => setMobileOpen(true)
  }, [])
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isDark = mounted && resolvedTheme === 'dark'

  const SidebarInner = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className='flex h-full flex-col'>
      {/* Logo */}
      <div
        className={cn(
          'flex items-center py-5 transition-all',
          !isMobile && collapsed ? 'justify-center px-0' : 'px-4',
        )}
      >
        <Link href='/dashboard' className='flex shrink-0 items-center'>
          {!isMobile && collapsed ? (
            <Image
              alt={BRAND.name}
              src={BRAND.logo}
              width={36}
              height={36}
              className='h-9 w-9 rounded-xl object-cover'
            />
          ) : (
            <Image
              alt={BRAND.name}
              src={BRAND.logo}
              width={52}
              height={52}
              className='h-13 w-13 rounded-xl object-cover'
            />
          )}
        </Link>
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className='ml-auto rounded-lg p-1.5 text-muted-foreground hover:text-foreground'
          >
            <X className='h-5 w-5' />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className='flex-1 overflow-y-auto px-2 py-1'>
        <div className='space-y-0.5'>
          {NAV_ITEMS.map(({ label, href, icon: Icon, badge, count }) => {
            const active =
              href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(href)
            const showLabel = isMobile || !collapsed
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150',
                  !isMobile && collapsed && 'justify-center px-0',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
                )}
              >
                <Icon className='h-4 w-4 shrink-0' />
                <AnimatePresence initial={false}>
                  {showLabel && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.18 }}
                      className='flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap'
                    >
                      <span className='font-heading text-[13px] font-semibold'>
                        {label}
                      </span>
                      {badge && (
                        <span
                          className={cn(
                            'rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold leading-none',
                            active
                              ? 'bg-primary-foreground/20 text-primary-foreground'
                              : 'bg-primary text-primary-foreground',
                          )}
                        >
                          {badge}
                        </span>
                      )}
                      {count != null && (
                        <span
                          className={cn(
                            'rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold leading-none',
                            active
                              ? 'bg-primary-foreground/20 text-primary-foreground'
                              : 'bg-primary text-primary-foreground',
                          )}
                        >
                          {count}
                        </span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!isMobile && collapsed && (badge != null || count != null) && (
                  <span className='absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary' />
                )}
              </Link>
            )
          })}
        </div>

        <div className='mt-16' />

        {/* Invite card */}
        <AnimatePresence initial={false}>
          {(isMobile || !collapsed) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className='mb-2 overflow-hidden rounded-xl border border-border bg-muted/40 p-3'
            >
              <p className='font-heading text-[13px] font-bold text-foreground'>
                Invite a friend.
              </p>
              <p className='font-heading text-[13px] font-bold text-primary'>
                Both get 500 points!
              </p>
              <p className='mt-1 text-[11px] leading-relaxed text-muted-foreground'>
                Share your referral link and earn points when they book.
              </p>
              <button className='mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-heading text-[12px] font-bold text-primary-foreground transition-opacity hover:opacity-90'>
                Invite Now <ChevronRight className='h-3 w-3' />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className='pb-2' />
      </nav>

      {/* Theme toggle */}
      <div
        className={cn(
          'flex shrink-0 items-center border-t border-border px-3 py-2.5',
          !isMobile && collapsed ? 'justify-center px-0' : 'gap-2.5',
        )}
      >
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label='Toggle theme'
          className='inline-flex items-center justify-center rounded-full border border-border p-1.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground'
        >
          {mounted && isDark ? (
            <Sun className='h-4 w-4' strokeWidth={1.5} />
          ) : (
            <Moon className='h-4 w-4' strokeWidth={1.5} />
          )}
        </button>
        <AnimatePresence initial={false}>
          {(isMobile || !collapsed) && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              className='overflow-hidden whitespace-nowrap font-heading text-[12px] font-semibold text-muted-foreground'
            >
              {mounted && isDark ? 'Light mode' : 'Dark mode'}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Help */}
      <Link
        href='/help'
        className={cn(
          'flex shrink-0 items-center gap-2.5 border-t border-border px-3 py-3 text-muted-foreground transition-colors hover:text-foreground',
          !isMobile && collapsed && 'justify-center px-0',
        )}
      >
        <Headphones className='h-4 w-4 shrink-0' />
        {(isMobile || !collapsed) && (
          <div className='flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap'>
            <div>
              <p className='text-[11px] font-semibold text-foreground'>
                Need help?
              </p>
              <p className='text-[10px] text-muted-foreground'>
                Visit our Help Centre
              </p>
            </div>
            <ChevronRight className='h-3 w-3 shrink-0' />
          </div>
        )}
      </Link>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className='relative hidden shrink-0 md:block'>
        <motion.aside
          animate={{ width: collapsed ? 72 : 240 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className='flex h-screen flex-col border-r border-border bg-card'
        >
          <SidebarInner />
        </motion.aside>
        <button
          onClick={() => setCollapsed((p) => !p)}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
          className='absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-colors hover:border-primary/40 hover:text-foreground'
        >
          {collapsed ? (
            <ChevronRight className='h-3 w-3' />
          ) : (
            <ChevronLeft className='h-3 w-3' />
          )}
        </button>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key='backdrop'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-40 bg-black/50 md:hidden'
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key='drawer'
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className='fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card md:hidden'
            >
              <SidebarInner isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
