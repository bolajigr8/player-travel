'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane,
  Bed,
  Wifi,
  CreditCard,
  User,
  Search,
  ChevronDown,
  MessageCircle,
  Mail,
  MessageSquare,
  ShieldCheck,
  Zap,
  Headphones,
  Tag,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  {
    icon: Plane,
    title: 'Flights',
    body: 'Booking issues\nChanges & cancellations\nRefunds & compensation',
  },
  {
    icon: Bed,
    title: 'Stays',
    body: 'Reservation details\nCheck-in / check-out\nProperty issues',
  },
  {
    icon: Wifi,
    title: 'eSIM',
    body: 'Installation guide\nActivation & usage\nTroubleshooting',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    body: 'Payment methods\nFailed payments\nRefund timelines',
  },
  {
    icon: User,
    title: 'Account',
    body: 'Login & security\nProfile settings\nManage bookings',
  },
]

const ESIM_FAQ_CATEGORIES = [
  'All',
  'Understanding eSIMs',
  'Getting Started',
  'Managing Your eSIM',
  'Calls, SMS & Data',
  'Network & Connectivity',
  'Plans & Billing',
  'Device Settings',
  'Troubleshooting',
] as const

type EsimFaqCategory = (typeof ESIM_FAQ_CATEGORIES)[number]

const ESIM_FAQS: { cat: EsimFaqCategory; q: string; a: string }[] = [
  // --- Understanding eSIMs ---
  {
    cat: 'Understanding eSIMs',
    q: 'What is an eSIM?',
    a: 'An eSIM (embedded SIM) is a digital SIM card built directly into your device. Unlike a physical SIM, there is nothing to insert or swap. You activate a mobile data plan by scanning a QR code or entering details manually, making it perfect for travelers who want local data without changing SIM cards.',
  },
  {
    cat: 'Understanding eSIMs',
    q: 'How is an eSIM different from a physical SIM card?',
    a: 'A physical SIM is a removable card you insert into your device. An eSIM is built into the hardware and stores your plan digitally. This means you can switch between plans without handling any physical card, and you can keep your home SIM active at the same time.',
  },
  {
    cat: 'Understanding eSIMs',
    q: 'Does my device support eSIM?',
    a: "Most modern smartphones, tablets, and smartwatches support eSIM. You can confirm by checking your device's cellular settings or your manufacturer's website. Your device also needs to be network unlocked to use an eSIM from a provider other than your home carrier.",
  },

  // --- Getting Started ---
  {
    cat: 'Getting Started',
    q: 'How do I install my eSIM?',
    a: "You can install your eSIM using a QR code or by entering the details manually. For QR code installation, go to your device's cellular or mobile settings and scan the QR code provided. For manual installation, enter the activation code in the same section. Step-by-step guides with screenshots for both iOS and Android are available in the app.",
  },
  {
    cat: 'Getting Started',
    q: 'Do I need to activate my eSIM right away after purchase?',
    a: "In most cases, no. You can activate your eSIM at any time after purchase. However, some plans require activation within a set window, typically 90 days from purchase. A small number of eSIMs activate automatically the moment they are installed. Check your specific plan's details for any time restrictions.",
  },
  {
    cat: 'Getting Started',
    q: 'What network name will appear on my device after installing?',
    a: "This depends on the network provider behind your plan. You may see the local operator's name or a generic label. Either way, this is completely normal and will not affect your connectivity.",
  },
  {
    cat: 'Getting Started',
    q: 'What errors might I encounter during eSIM activation?',
    a: 'The most common activation errors are: a "Couldn\'t activate service" message (usually on Android, often caused by a corrupted download or a previously installed eSIM), an unsupported device error (your phone may not be eSIM-compatible), a no internet connection error (an active connection is required during installation), and a multiple device error (an eSIM can only be installed on one device at a time). If you run into any of these, contact our support team and we will help you resolve it.',
  },

  // --- Managing Your eSIM ---
  {
    cat: 'Managing Your eSIM',
    q: 'How do I change my eSIM label?',
    a: 'On iOS, go to Settings > Cellular, tap the eSIM, then tap Cellular Plan Label to rename it. On Samsung, go to Settings > Connections > SIM Card Manager, select the eSIM, and rename it. On Google Pixel, go to Settings > Network & Internet > SIMs, select the eSIM, and tap the pencil icon. We recommend a name like "Italy eSIM" for easy identification.',
  },
  {
    cat: 'Managing Your eSIM',
    q: 'Can I reinstall an eSIM?',
    a: 'In most cases, no. Once an eSIM is removed from your device, it typically cannot be reinstalled. We strongly recommend temporarily disabling your eSIM instead of deleting it when you are not using it. If you have already removed it, contact our support team and we will check if a reinstallation is possible for your plan.',
  },
  {
    cat: 'Managing Your eSIM',
    q: 'Can I install my eSIM on multiple devices?',
    a: 'No. Each eSIM is tied to the device it was first installed on and cannot be transferred or reinstalled on another device. If you have not installed your eSIM yet, you can share the QR code with a friend to install it on their compatible device instead.',
  },
  {
    cat: 'Managing Your eSIM',
    q: 'How do I remove an eSIM from my iOS device?',
    a: 'Go to Settings, tap Cellular/Mobile Data, select the eSIM you want to remove, then tap "Remove Mobile Data Plan" (this may also appear as Remove eSIM or Delete Mobile Plan depending on your device). Only remove an eSIM if its data has expired, you no longer need it, or you are replacing it with a new one for the same destination.',
  },

  // --- Calls, SMS & Data ---
  {
    cat: 'Calls, SMS & Data',
    q: 'What is the Discover+ Global eSIM?',
    a: "The Discover+ Global eSIM keeps you connected worldwide with data, calls, and texts. It includes a US-based international phone number (+1 country code), so always include the recipient's country code when making calls or sending texts. Top-up packages cover data, calls, and texts as a bundle. You can track your usage anytime in the app and check your eSIM details for the full list of supported countries.",
  },
  {
    cat: 'Calls, SMS & Data',
    q: 'Can I receive calls and texts while using a data-only eSIM?',
    a: 'Yes. If your eSIM is data-only, you can still use your primary SIM for calls and texts. On iOS, go to Settings > Cellular, enable your primary line, and set it as the Default Voice Line. On Android, go to your SIM card settings and set your primary line as preferred for calls and SMS. Keep your eSIM selected for mobile data. Check with your home carrier about any potential roaming charges.',
  },
  {
    cat: 'Calls, SMS & Data',
    q: 'Can I receive calls on my primary number while using an eSIM?',
    a: "Yes, if your device supports Dual SIM. Most modern iPhones and Android devices let you keep your primary SIM active for calls while your eSIM handles data. Go to your device's SIM or cellular settings, set your primary line as the default for calls and SMS, and keep your eSIM selected for mobile data. Roaming charges from your home carrier may apply.",
  },
  {
    cat: 'Calls, SMS & Data',
    q: 'Can I use tethering or a personal hotspot with my eSIM?',
    a: 'Yes, as long as your device and network support it. On iOS, go to Settings > Personal Hotspot and toggle on "Allow Others to Join." On Android, go to Settings > Network & Internet > Hotspot & Tethering and enable Wi-Fi hotspot. If your eSIM requires a manual APN, enter it in the hotspot APN field as well. You can find the APN details in your eSIM installation instructions.',
  },

  // --- Network & Connectivity ---
  {
    cat: 'Network & Connectivity',
    q: 'Will my eSIM automatically connect to the best network available?',
    a: 'Yes. By default, your eSIM connects to the operator with the strongest signal in your area. For a more stable connection, you can disable automatic network selection in your device settings and manually choose a supported network from the list.',
  },
  {
    cat: 'Network & Connectivity',
    q: 'Can I use 5G with my eSIM?',
    a: 'Some eSIMs support 5G. You can check this under the "Network" section in your eSIM details. 5G availability also depends on your device and location. iPhone 12 or later is required for 5G on iOS, and you must be in an area with active 5G coverage.',
  },
  {
    cat: 'Network & Connectivity',
    q: 'Why is 5G not showing in my iPhone status bar?',
    a: 'First, confirm you are in an area with 5G coverage. Then go to Settings > Cellular, tap your eSIM, and open Cellular Data Options to check that Voice & Data is set to "5G On." If 5G is not listed, your eSIM does not support it. If it is enabled but still not showing, toggle Airplane Mode on then off to refresh your connection.',
  },
  {
    cat: 'Network & Connectivity',
    q: 'Do I need a VPN to access the internet in China?',
    a: 'No. Our China, Regional Asia, and Global eSIMs route your data through international gateways outside mainland China, giving you unrestricted access to Google, WhatsApp, and social media without a VPN. This applies as long as you are using your eSIM data. Hotel Wi-Fi is still subject to local restrictions.',
  },

  // --- Plans & Billing ---
  {
    cat: 'Plans & Billing',
    q: 'What are renewals and how do they work?',
    a: 'Renewals automatically top up your eSIM when you have 10% of your data remaining. The renewal matches your current package in terms of data and validity period. To enable it, go to your eSIM details in the app and toggle Renewals on. A saved payment card is required. If your validity period ends before you use enough data, renewals will not trigger and will turn off automatically.',
  },
  {
    cat: 'Plans & Billing',
    q: 'What happens to unused data after my plan expires?',
    a: "Any unused data is lost once your plan's validity period ends. If your eSIM supports top-ups, you can purchase a new package through the app to continue using the same eSIM and stay connected.",
  },
  {
    cat: 'Plans & Billing',
    q: 'Can I get a refund if I bought the wrong eSIM?',
    a: 'Refunds are available for eligible eSIMs that have not been installed or used. Contact our support team before attempting to install the eSIM and we will guide you through the process. If your plans have changed but the eSIM is unused, you can also share the QR code with a friend as an alternative.',
  },

  // --- Device Settings ---
  {
    cat: 'Device Settings',
    q: 'How do I set a data limit on my Android device?',
    a: 'On Samsung, go to Settings > Connections > Data Usage > Billing Cycle and Data Warning. On Google Pixel, go to Settings > Network & Internet > SIMs > Data Warning & Limit. Set the billing cycle to match your arrival date, add a warning slightly below your plan total (for example, 8 GB on a 10 GB plan), and enable a hard limit to automatically cut off data when you reach it.',
  },

  // --- Troubleshooting ---
  {
    cat: 'Troubleshooting',
    q: "Where can I find my eSIM's ICCID number?",
    a: 'Your ICCID is a unique 20-digit identifier for your eSIM starting with "89." You may need it when contacting support. You can find it in the app under your eSIM details — tap the copy icon next to the ICCID and paste it when speaking with the support team.',
  },
  {
    cat: 'Troubleshooting',
    q: 'How do I troubleshoot eSIM issues on an iPad?',
    a: 'Check that your internet connection is stable, as airport Wi-Fi can be unreliable. In your Wi-Fi settings, make sure "Limit IP Address Tracking" is turned off for your connected network. Then toggle Cellular/Mobile Data off and back on up to 3 times, waiting a few minutes each time. If the issue continues after 30 minutes, contact our support team with your ICCID number ready.',
  },
]

const SUPPORT = [
  {
    icon: MessageCircle,
    title: 'Live chat',
    body: 'Chat with our agents in real time',
    cta: 'Start now',
  },
  {
    icon: Mail,
    title: 'Email support',
    body: "We'll get back to you via email",
    cta: 'Email us',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    body: 'Message us on WhatsApp',
    cta: 'Message us',
  },
]

const STATUS = [
  { name: 'Flights', state: 'Operational' },
  { name: 'Stays', state: 'Operational' },
  { name: 'eSIM Delivery', state: 'Operational' },
  { name: 'Payments', state: 'Operational' },
]

const ARTICLES = [
  {
    title: 'Travel planning',
    body: 'Everything you need to plan your trip',
    image: '/figma/c5902ebd4561e008b4d3a49c231b9b87ed04c7cb.png',
  },
  {
    title: 'Connectivity (eSIM)',
    body: 'Setup, activation and troubleshooting',
    image: '/figma/2b2cf42d143460347a49f8bd452c7581be53a270.png',
  },
  {
    title: 'Booking management',
    body: 'Manage your bookings with ease',
    image: '/figma/2a7a76966bc097de36eaf62926eb81a2bbd8c8ab.png',
  },
  {
    title: 'Airport & arrival',
    body: 'Information for a smooth travel experience',
    image: '/figma/052520396ba9e3230e862090ca3497fcc08e1b6d.png',
  },
]

const TOPICS = [
  'Change flight',
  'eSIM installation',
  'Refund status',
  'Cancel booking',
]

export function HelpClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<EsimFaqCategory>('All')

  const filteredFaqs =
    activeCategory === 'All'
      ? ESIM_FAQS
      : ESIM_FAQS.filter((f) => f.cat === activeCategory)

  return (
    <div className='min-h-screen bg-background'>
      <div className='page-container py-10 sm:py-14'>
        {/* Hero */}
        <div className='grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_320px]'>
          <div className='space-y-4'>
            <p className='font-mono text-[11px] tracking-[2.86px] text-primary'>
              + Help Center
            </p>
            <h1 className='font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl'>
              How can we <span className='text-primary'>help</span> <br />
              you?
            </h1>
            <p className='max-w-md text-sm text-muted-foreground'>
              Find answers, get support and manage your bookings across flights,
              stays and eSIM.
            </p>
            <div className='flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5'>
              <Search className='size-4 text-muted-foreground' />
              <input
                className='flex-1 bg-transparent text-sm outline-none'
                placeholder='Search help articles or describe your issue'
              />
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <p className='text-[10px] font-mono text-muted-foreground'>
                Popular searches:
              </p>
              {TOPICS.map((t) => (
                <button
                  key={t}
                  className='rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground hover:border-primary/30 hover:text-primary'
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className='relative h-64 w-full overflow-hidden rounded-2xl border border-border'>
            <img
              src='/figma/daf4cd06de656d37ff8c620a8913ef7119a6e9fc.png'
              alt='Support team'
              className='h-full w-full object-cover'
            />
          </div>
        </div>

        {/* Categories */}
        <section className='mt-12'>
          <p className='mb-4 font-bold'>Browse help by category</p>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
            {CATEGORIES.map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                whileHover={{ y: -2 }}
                className='space-y-2 rounded-2xl border border-border bg-card p-4'
              >
                <div className='grid size-9 place-items-center rounded-lg bg-primary/10 text-primary'>
                  <Icon className='size-4' />
                </div>
                <p className='font-heading text-sm font-bold'>{title}</p>
                <pre className='whitespace-pre-line font-sans text-[11px] leading-relaxed text-muted-foreground'>
                  {body}
                </pre>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ + Support side-by-side */}
        <section className='mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]'>
          {/* eSIM FAQ accordion */}
          <div className='space-y-3 rounded-2xl border border-border bg-card p-5'>
            <div className='flex items-center justify-between'>
              <p className='font-mono text-[11px] text-primary'>
                → eSIM Support
              </p>
              <p className='font-bold'>Frequently asked questions</p>
            </div>

            {/* Category filter tabs */}
            <div className='flex flex-wrap gap-2 pb-1'>
              {ESIM_FAQ_CATEGORIES.map((cat) => {
                const count =
                  cat === 'All'
                    ? ESIM_FAQS.length
                    : ESIM_FAQS.filter((f) => f.cat === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                      setOpenFaq(null)
                    }}
                    className={cn(
                      'rounded-full border px-3 py-1 text-[11px] font-medium transition-colors',
                      activeCategory === cat
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/30 hover:text-primary',
                    )}
                  >
                    {cat}
                    <span
                      className={cn(
                        'ml-1.5 rounded-full px-1.5 py-0.5 font-mono text-[9px]',
                        activeCategory === cat
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Accordion items */}
            <div className='space-y-2'>
              {filteredFaqs.map((faq, i) => (
                <div
                  key={faq.q}
                  className={cn(
                    'rounded-lg border transition-colors',
                    openFaq === i
                      ? 'border-primary bg-primary/5'
                      : 'border-border',
                  )}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className='flex w-full items-center justify-between px-4 py-3 text-left text-sm gap-3'
                  >
                    <span className='font-medium'>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        'size-4 flex-shrink-0 text-muted-foreground transition-transform duration-200',
                        openFaq === i && 'rotate-180 text-primary',
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key='answer'
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className='overflow-hidden'
                      >
                        <p className='border-t border-border px-4 pb-4 pt-3 text-[12.5px] leading-relaxed text-muted-foreground'>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className='space-y-4'>
            <div className='space-y-3 rounded-2xl border border-border bg-card p-5'>
              <p className='font-bold'>Get connected in 3 simple steps</p>
              <div className='grid grid-cols-3 gap-3 text-center'>
                {[
                  {
                    n: 1,
                    t: 'Buy your eSIM',
                    b: 'Pick a plan that fits your trip.',
                  },
                  {
                    n: 2,
                    t: 'Scan QR code',
                    b: 'Use Off Camera & Apple iOS to scan.',
                  },
                  {
                    n: 3,
                    t: 'Activate & enjoy data',
                    b: 'Connect to LTE / 5G in seconds.',
                  },
                ].map((s) => (
                  <div key={s.n} className='space-y-1'>
                    <div className='mx-auto grid size-8 place-items-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary'>
                      {s.n}
                    </div>
                    <p className='text-[12px] font-medium'>{s.t}</p>
                    <p className='text-[10px] text-muted-foreground'>{s.b}</p>
                  </div>
                ))}
              </div>
              <Link
                href='/esim'
                className='flex items-center justify-center gap-1 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground'
              >
                → View full eSIM guide
              </Link>
            </div>

            <div className='space-y-3 rounded-2xl border border-border bg-card p-5'>
              <p className='font-bold'>Still need help?</p>
              <p className='text-xs text-muted-foreground'>
                Our support team is here for you 24/7.
              </p>
              {SUPPORT.map(({ icon: Icon, title, body, cta }) => (
                <div
                  key={title}
                  className='flex items-start gap-3 rounded-lg border border-border bg-background/40 p-3'
                >
                  <div className='grid size-8 place-items-center rounded-lg bg-primary/10 text-primary'>
                    <Icon className='size-4' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-[13px] font-medium'>{title}</p>
                    <p className='text-[10px] text-muted-foreground'>{body}</p>
                  </div>
                  <button className='text-[10px] font-bold text-primary'>
                    {cta} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Status */}
        <section className='mt-12 rounded-2xl border border-border bg-card p-5'>
          <div className='flex items-center justify-between'>
            <p className='flex items-center gap-2 font-bold'>
              <span className='size-2 rounded-full bg-emerald-500' /> All
              systems are operational
            </p>
            <Link href='/help' className='text-[11px] font-mono text-primary'>
              → View status page
            </Link>
          </div>
          <div className='mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4'>
            {STATUS.map((s) => (
              <div
                key={s.name}
                className='flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2.5'
              >
                <span className='size-2 rounded-full bg-emerald-500' />
                <div>
                  <p className='text-[12px] font-medium'>{s.name}</p>
                  <p className='font-mono text-[10px] text-emerald-500'>
                    {s.state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section className='mt-12'>
          <p className='mb-4 font-bold'>Help articles &amp; guides</p>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {ARTICLES.map((a) => (
              <Link
                key={a.title}
                href='/help'
                className='group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40'
              >
                <div className='relative h-32 w-full'>
                  <img
                    src={a.image}
                    alt={a.title}
                    className='h-full w-full object-cover transition-transform group-hover:scale-105'
                  />
                </div>
                <div className='space-y-1 p-4'>
                  <p className='text-sm font-bold'>{a.title}</p>
                  <p className='text-[11px] text-muted-foreground'>{a.body}</p>
                  <p className='flex items-center gap-1 font-mono text-[10px] text-primary'>
                    → Read article
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section className='mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {[
            {
              icon: ShieldCheck,
              t: 'Secure Payments',
              b: 'Your payment is 100% secure.',
            },
            { icon: Zap, t: 'Flexible Booking', b: 'Change or cancel easily.' },
            {
              icon: Headphones,
              t: '24/7 Support',
              b: "We're here to help anytime.",
            },
            {
              icon: Tag,
              t: 'No Hidden Fees',
              b: 'What you see is what you pay.',
            },
          ].map(({ icon: Icon, t, b }) => (
            <div
              key={t}
              className='flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3'
            >
              <div className='grid size-9 place-items-center rounded-lg bg-primary/10 text-primary'>
                <Icon className='size-4' />
              </div>
              <div>
                <p className='text-[13px] font-bold'>{t}</p>
                <p className='text-[11px] text-muted-foreground'>{b}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
