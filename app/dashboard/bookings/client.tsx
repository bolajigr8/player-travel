'use client'

import { BookingsMainColumn } from '@/components/dashboard/bookings/bookings-main-column'
import { BookingsRightSidebar } from '@/components/dashboard/bookings/bookings-right-sidebar'

export function BookingsClient() {
  return (
    <div className='p-4 sm:p-6'>
      <div className='mb-5 sm:mb-6'>
        <h1 className='font-heading text-[26px] sm:text-[36px] font-bold leading-tight text-foreground dark:text-primary'>
          My Bookings
        </h1>
        <p className='mt-1 text-[12px] sm:text-[14px] text-muted-foreground'>
          View and manage all your flights, stays and eSIM bookings in one
          place.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]'>
        <BookingsMainColumn />
        <BookingsRightSidebar />
      </div>
    </div>
  )
}
