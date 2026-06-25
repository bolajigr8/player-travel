'use client'

import { AccountSection } from '@/components/dashboard/settings/account-section'
import { SettingsMain } from '@/components/dashboard/settings/settings-main'
import { SettingsSidebar } from '@/components/dashboard/settings/settings-sidebar'

export function SettingsClient() {
  return (
    <div className='p-4 sm:p-6 space-y-6'>
      <div>
        <h1 className='font-heading text-[26px] sm:text-[36px] font-bold leading-tight text-foreground dark:text-primary'>
          Settings
        </h1>
        <p className='mt-1 text-[12px] sm:text-[14px] text-muted-foreground'>
          Manage your account, preferences and security.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]'>
        <div className='space-y-6'>
          <AccountSection />
          <SettingsMain />
        </div>
        <SettingsSidebar />
      </div>
    </div>
  )
}
