'use client'

import { PaymentSidebar } from '@/components/dashboard/payment/payment-sidebar'
import { PaymentOverviewCard } from '@/components/dashboard/payment/payment-view-card'
import { TransactionsAndMethods } from '@/components/dashboard/payment/transaction-methods'

export function PaymentsClient() {
  return (
    <div className='p-4 sm:p-6 space-y-6'>
      <div>
        <h1 className='font-heading text-[26px] sm:text-[36px] font-bold leading-tight text-foreground dark:text-primary'>
          Payments
        </h1>
        <p className='mt-1 text-[12px] sm:text-[14px] text-muted-foreground'>
          Manage your payments, methods and transaction history.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]'>
        <div className='space-y-4'>
          <PaymentOverviewCard />
          <TransactionsAndMethods />
        </div>
        <PaymentSidebar />
      </div>
    </div>
  )
}
