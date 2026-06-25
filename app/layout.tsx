// import type { Metadata } from "next";
// import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

// import { Navbar } from "@/components/navbar";
// import { ThemeProvider } from "@/components/theme-provider";
// import { Footer } from "@/components/footer";
// import { GoogleTranslateProvider } from "@/components/google-translate";
// import { Providers } from "@/components/providers";

// import "./globals.css";

// /*
//  * Fonts from Figma:
//  *   Space Grotesk  → headings, buttons, large bold text
//  *   Inter          → body copy, descriptions, form text
//  *   JetBrains Mono → labels, tracking text, monospace values
//  */
// const spaceGrotesk = Space_Grotesk({
//   variable: "--font-heading",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

// const inter = Inter({
//   variable: "--font-sans",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

// const jetbrainsMono = JetBrains_Mono({
//   variable: "--font-mono",
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Golafly Travel — Flights · Stays · eSIM, all in one place",
//   description: "Travel fully connected: book flights, stays and high-speed eSIM data plans in 200+ countries.",
//   icons: {
//     icon: [{ url: "/favicon-new.png", type: "image/png" }],
//     apple: [{ url: "/favicon-new.png", type: "image/png" }],
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html
//       lang="en"
//       suppressHydrationWarning
//       className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col bg-background text-foreground">
//         <Providers>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {/* Navbar — sticky pill with breathing room from screen edges */}
//             <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
//               <Navbar />
//             </header>

//             {/* Google Translate hidden container */}
//             <GoogleTranslateProvider />

//             <div className="flex flex-1 flex-col">{children}</div>

//             <Footer />
//           </ThemeProvider>
//         </Providers>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { Providers } from '@/components/providers'

import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Golafly Travel',
  description: 'Flights, stays and eSIMs',
  icons: {
    icon: [{ url: '/favicon-new.png', type: 'image/png' }],
    apple: [{ url: '/favicon-new.png', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className='min-h-full bg-background text-foreground'>
        <Providers>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
