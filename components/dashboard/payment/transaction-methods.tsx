'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plane,
  BedDouble,
  Wifi,
  Car,
  Package,
  CreditCard,
  Plus,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TRANSACTIONS, PAYMENT_CARDS } from '@/store/dashboard'

const TXN_ICON: Record<string, React.ElementType> = {
  flight: Plane,
  stay: BedDouble,
  esim: Wifi,
  transfer: Car,
  bundle: Package,
}

const TXN_BG: Record<string, string> = {
  flight: 'bg-primary/15',
  stay: 'bg-[#C084FC]/15',
  esim: 'bg-[#34D399]/15',
  transfer: 'bg-[#60A5FA]/15',
  bundle: 'bg-amber-500/15',
}

const TXN_COLOR: Record<string, string> = {
  flight: 'text-primary',
  stay: 'text-[#C084FC]',
  esim: 'text-[#34D399]',
  transfer: 'text-[#60A5FA]',
  bundle: 'text-amber-400',
}

const CARD_BG: Record<string, string> = {
  VISA: 'from-blue-600 to-blue-800',
  Mastercard: 'from-gray-700 to-gray-900',
}

export function TransactionsAndMethods() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'methods'>(
    'transactions',
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16, duration: 0.38 }}
      className='rounded-2xl border border-border bg-card'
    >
      {/* Tabs */}
      <div className='flex border-b border-border'>
        {[
          { key: 'transactions' as const, label: 'Transactions' },
          { key: 'methods' as const, label: 'Payment Methods' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              'px-5 py-3.5 font-heading text-[13px] font-semibold transition-colors',
              activeTab === key
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Transactions */}
      {activeTab === 'transactions' && (
        <div>
          <div className='flex items-center justify-between px-5 py-3 border-b border-border'>
            <p className='font-mono text-[11px] text-muted-foreground'>
              {TRANSACTIONS.length} transactions
            </p>
            <button className='flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground'>
              Filter <ChevronDown className='h-3 w-3' />
            </button>
          </div>
          <div className='divide-y divide-border'>
            {TRANSACTIONS.map((txn) => {
              const Icon = TXN_ICON[txn.type] ?? Package
              return (
                <div
                  key={txn.id}
                  className='flex items-center gap-3 px-5 py-3.5'
                >
                  <div
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                      TXN_BG[txn.type] ?? 'bg-muted/50',
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4',
                        TXN_COLOR[txn.type] ?? 'text-muted-foreground',
                      )}
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                      {txn.title}
                    </p>
                    <p className='truncate text-[11px] text-muted-foreground'>
                      {txn.subtitle}
                    </p>
                  </div>
                  <div className='text-right shrink-0'>
                    <p className='font-heading text-[13px] font-bold text-foreground dark:text-primary'>
                      −€
                      {txn.amount.toLocaleString('en', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className='font-mono text-[10px] text-muted-foreground'>
                      {txn.date}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='p-4 border-t border-border'>
            <button className='flex w-full items-center justify-center font-heading text-[12px] font-bold text-primary'>
              View all transactions
            </button>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      {activeTab === 'methods' && (
        <div className='p-5 space-y-4'>
          {PAYMENT_CARDS.map((card) => (
            <div
              key={card.id}
              className={cn(
                'relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white',
                CARD_BG[card.brand] ?? 'from-gray-700 to-gray-900',
              )}
            >
              {card.primary && (
                <span className='absolute right-4 top-4 rounded-full bg-white/20 px-2 py-0.5 font-mono text-[9px] font-bold text-white'>
                  PRIMARY
                </span>
              )}
              <CreditCard className='h-6 w-6 text-white/60' />
              <p className='mt-4 font-mono text-[15px] tracking-widest text-white'>
                •••• •••• •••• {card.last4}
              </p>
              <div className='mt-3 flex items-center justify-between'>
                <p className='font-heading text-[13px] font-semibold text-white/80'>
                  {card.holder}
                </p>
                <p className='font-mono text-[12px] text-white/60'>
                  {card.expiry}
                </p>
              </div>
            </div>
          ))}
          <button className='flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-4 font-heading text-[13px] font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary'>
            <Plus className='h-4 w-4' /> Add Payment Method
          </button>
        </div>
      )}
    </motion.div>
  )
}
