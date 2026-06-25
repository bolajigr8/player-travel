import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GoogleTranslateProvider } from '@/components/google-translate'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className='sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4'>
        <Navbar />
      </header>

      <GoogleTranslateProvider />

      <div className='flex min-h-screen flex-col'>
        <main className='flex-1'>{children}</main>
        <Footer />
      </div>
    </>
  )
}
