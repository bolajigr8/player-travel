'use client'

import { ProfileHero } from '@/components/dashboard/profile/profile-hero'
import { ProfileContent } from '@/components/dashboard/profile/profile-content'
import { ProfileSidebar } from '@/components/dashboard/profile/profile-sidebar'

export function ProfileClient() {
  return (
    <div className='p-4 sm:p-6'>
      <div className='mb-5 sm:mb-6'>
        <h1 className='font-heading text-xl sm:text-2xl font-bold text-foreground dark:text-primary'>
          My Profile
        </h1>
        <p className='mt-1 text-[12px] sm:text-[13px] text-muted-foreground'>
          Manage your account and travel preferences.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]'>
        <div className='min-w-0 space-y-6'>
          <ProfileHero />
          <ProfileContent />
        </div>
        <div className='min-w-0'>
          <ProfileSidebar />
        </div>
      </div>
    </div>
  )
}
