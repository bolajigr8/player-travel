import type { SocialIconKey } from '@/components/social-icons'

/* ─── Social links ────────────────────────────────────────────── */
export interface SocialLink {
  name: SocialIconKey
  href: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/golafly/' },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61589922166546',
  },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/68992893' },
  { name: 'Twitter', href: 'https://x.com/golafly?s=20' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@golafly' },
  { name: 'WhatsApp', href: 'https://wa.me/34667068018' },
]

/* ─── Navbar links ────────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Flights', href: '/flights' },
  { label: 'Stays', href: '/stays' },
  { label: 'eSIM', href: '/esim' },
  { label: 'Offers', href: '/offers' },
  { label: 'Help', href: '/help' },
] as const

/* ─── Footer nav columns ──────────────────────────────────────── */
export const FOOTER_COLUMNS = [
  {
    heading: 'Travel',
    links: [
      { label: 'Flights', href: '/flights' },
      { label: 'Stays', href: '/stays' },
      { label: 'eSIM', href: '/esim' },
      { label: 'Bundles', href: '/offers' },
    ],
  },
  {
    heading: 'Discover',
    links: [
      { label: 'Offers', href: '/offers' },
      { label: 'Destinations', href: '/offers' },
      { label: 'Travel insurance', href: '/flights/extras' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/help' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Refund Policy', href: '/legal/refund' },
    ],
  },
] as const

/* ─── Offices ─────────────────────────────────────────────────── */
export const OFFICES = [
  {
    city: 'London',
    lines: ['128 City Road · EC1V 2NX', 'United Kingdom'],
  },
  {
    city: 'Barcelona',
    lines: ['C/ Cal Ciso 69 · 08038', 'Spain'],
  },
] as const

/* ─── Contact ─────────────────────────────────────────────────── */
export const CONTACT = {
  email: 'contact@golafly.com',
  phone: '+1 123 466 7899',
  whatsapp: 'https://wa.me/34667068018',
} as const

/* ─── Brand ───────────────────────────────────────────────────── */
export const BRAND = {
  name:    "Golafly",
  tagline: "Travel fully connected. Flights, stays and eSIM in 200+ countries — book your whole trip in one place.",
  logo:    "/logo.png",
  legal:   "© 2026 Golafly Ltd. All rights reserved.",
  badges:  ["FIFA Licensed", "Ethical Representation", "Transparent Fees"],
} as const;
