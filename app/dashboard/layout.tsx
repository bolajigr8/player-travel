import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-dvh overflow-hidden bg-background'>
      <DashboardSidebar />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <DashboardTopbar />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </div>
  )
}
