// store/dashboard.ts

/* ─── User ────────────────────────────────────────────────────── */
export const DASHBOARD_USER = {
  name: 'Alex',
  lastName: 'Morgan',
  fullName: 'Alex M.',
  email: 'alex@email.com',
  phone: '+44 7700 900123',
  location: 'London, UK',
  memberSince: 'Jan 2024',
  points: 2450,
  level: 'Explorer',
  nextLevel: 'Voyager',
  pointsToNext: 550,
  totalPointsForNext: 3000,
  tripsCompleted: 5,
  rewardsRedeemed: 2,
  co2Offset: '8.2',
} as const

/* ─── Next Trip ───────────────────────────────────────────────── */
export const NEXT_TRIP = {
  id: 'trip-001',
  destination: 'Dubai',
  destinationCode: 'DXB',
  origin: 'London',
  originCode: 'LHR',
  departDate: 'Wed, 18 Jun 2025',
  returnDate: 'Sun, 25 Jun 2025',
  departTime: '08:35',
  airline: 'Emirates',
  airlineInitials: 'EK',
  airlineColor: '#C41E3A',
  hotel: 'The Grand Plaza',
  nights: 7,
  countdownDays: '12',
  countdownHrs: '06',
  countdownMins: '44',
  image:
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80',
} as const

/* ─── Bookings ────────────────────────────────────────────────── */
export type BookingStatus = 'CONFIRMED' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED'
export type BookingType = 'flight' | 'stay' | 'esim' | 'bundle'

export interface DashboardBooking {
  id: string
  bookingRef: string
  type: BookingType
  title: string
  subtitle: string
  date: string
  status: BookingStatus
  price: number
  currency: string
  origin?: string
  destination?: string
  airline?: string
  airlineInitials?: string
  airlineColor?: string
  checkIn?: string
  checkOut?: string
  nights?: number
  image: string
}

export const DASHBOARD_BOOKINGS: DashboardBooking[] = [
  {
    id: 'bk-001',
    bookingRef: 'GF-18JUN-EK882',
    type: 'flight',
    title: 'London → Dubai',
    subtitle: 'Emirates · EK882 · Economy',
    date: 'Wed, 18 Jun 2025',
    status: 'CONFIRMED',
    price: 358,
    currency: '€',
    origin: 'LHR',
    destination: 'DXB',
    airline: 'Emirates',
    airlineInitials: 'EK',
    airlineColor: '#C41E3A',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
  },
  {
    id: 'bk-002',
    bookingRef: 'GF-18JUN-HOTEL',
    type: 'stay',
    title: 'The Grand Plaza',
    subtitle: 'Dubai Marina · 7 nights',
    date: '18 Jun – 25 Jun 2025',
    status: 'CONFIRMED',
    price: 420,
    currency: '€',
    checkIn: '18 Jun 2025',
    checkOut: '25 Jun 2025',
    nights: 7,
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
  },
  {
    id: 'bk-003',
    bookingRef: 'GF-UAE-ESIM-10',
    type: 'esim',
    title: 'UAE eSIM · 10GB',
    subtitle: '5G · LTE · 15 days validity',
    date: 'Active from 18 Jun 2025',
    status: 'CONFIRMED',
    price: 8.99,
    currency: '€',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
  },
  {
    id: 'bk-004',
    bookingRef: 'GF-15MAY-BA304',
    type: 'flight',
    title: 'London → Barcelona',
    subtitle: 'British Airways · BA304 · Economy',
    date: 'Thu, 15 May 2025',
    status: 'COMPLETED',
    price: 189,
    currency: '€',
    origin: 'LHR',
    destination: 'BCN',
    airline: 'British Airways',
    airlineInitials: 'BA',
    airlineColor: '#1C2B5B',
    image:
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80',
  },
]

/* ─── Inbox ───────────────────────────────────────────────────── */
export type MessageType =
  | 'flight'
  | 'stay'
  | 'esim'
  | 'payment'
  | 'reward'
  | 'info'
  | 'welcome'
  | 'promo'

export interface InboxMessage {
  id: string
  type: MessageType
  title: string
  preview: string
  time: string
  date: string
  unread: boolean
  category:
    | 'Flights'
    | 'Stays'
    | 'eSIM'
    | 'Payments'
    | 'Rewards'
    | 'Announcements'
}

export const INBOX_MESSAGES: InboxMessage[] = [
  {
    id: 'msg-001',
    type: 'flight',
    title: 'Check-in open for EK882 ✈️',
    preview:
      'Online check-in for your Emirates flight to Dubai is now open. Check in now to select your seat.',
    time: '9:15 AM',
    date: '6 Jun 2025',
    unread: true,
    category: 'Flights',
  },
  {
    id: 'msg-002',
    type: 'stay',
    title: 'Hotel booking confirmed 🏨',
    preview:
      'Your reservation at The Grand Plaza, Dubai is confirmed. Check-in: 18 Jun. Check-out: 25 Jun.',
    time: 'Yesterday',
    date: '5 Jun 2025',
    unread: true,
    category: 'Stays',
  },
  {
    id: 'msg-003',
    type: 'esim',
    title: 'Your UAE eSIM is ready 📱',
    preview:
      'Your 10GB UAE eSIM is ready to install. Tap to view QR code and installation guide.',
    time: '2 days ago',
    date: '4 Jun 2025',
    unread: false,
    category: 'eSIM',
  },
  {
    id: 'msg-004',
    type: 'reward',
    title: 'You earned 350 points! ⭐',
    preview:
      'Great news — your Dubai bundle earned you 350 Golafly points. See what you can redeem.',
    time: '3 days ago',
    date: '3 Jun 2025',
    unread: false,
    category: 'Rewards',
  },
  {
    id: 'msg-005',
    type: 'payment',
    title: 'Payment confirmed ✅',
    preview:
      'Your payment of €786.99 for the Dubai bundle (flight + hotel + eSIM) was successful.',
    time: '3 days ago',
    date: '3 Jun 2025',
    unread: false,
    category: 'Payments',
  },
  {
    id: 'msg-006',
    type: 'promo',
    title: 'Flash deal: Tokyo from €420 🗼',
    preview:
      'Limited time offer. Flights to Tokyo from €420 return. Book before midnight tonight.',
    time: '4 days ago',
    date: '2 Jun 2025',
    unread: false,
    category: 'Announcements',
  },
  {
    id: 'msg-007',
    type: 'info',
    title: 'Dubai travel guide 🌆',
    preview:
      'Everything you need for your Dubai trip — best areas, transport, currency, weather and more.',
    time: '5 days ago',
    date: '1 Jun 2025',
    unread: false,
    category: 'Announcements',
  },
  {
    id: 'msg-008',
    type: 'welcome',
    title: 'Welcome to Golafly! 👋',
    preview:
      'Your account is set up. Start exploring flights, stays and eSIM plans for your next adventure.',
    time: '1 week ago',
    date: '30 May 2025',
    unread: false,
    category: 'Announcements',
  },
]

/* ─── Transactions ────────────────────────────────────────────── */
export type TxnType = 'flight' | 'stay' | 'esim' | 'bundle' | 'transfer'

export const TRANSACTIONS = [
  {
    id: 'txn-001',
    type: 'bundle' as TxnType,
    title: 'Dubai Bundle',
    subtitle: 'Flight + Hotel + eSIM · Ref #GF-18JUN',
    date: '3 Jun 2025',
    time: '11:42 AM',
    amount: 786.99,
    category: 'Bundle',
  },
  {
    id: 'txn-002',
    type: 'flight' as TxnType,
    title: 'London → Barcelona',
    subtitle: 'British Airways · BA304 · Ref #GF-15MAY',
    date: '28 Apr 2025',
    time: '09:20 AM',
    amount: 189.0,
    category: 'Flight',
  },
  {
    id: 'txn-003',
    type: 'stay' as TxnType,
    title: 'Hoxton Amsterdam',
    subtitle: '3 nights · 10–13 Mar 2025',
    date: '18 Feb 2025',
    time: '02:55 PM',
    amount: 555.0,
    category: 'Stay',
  },
  {
    id: 'txn-004',
    type: 'esim' as TxnType,
    title: 'Europe eSIM 15GB',
    subtitle: '30-day plan · Ref #GF-ESIM-EU',
    date: '8 Mar 2025',
    time: '10:05 AM',
    amount: 12.99,
    category: 'eSIM',
  },
  {
    id: 'txn-005',
    type: 'transfer' as TxnType,
    title: 'Airport Transfer',
    subtitle: 'Amsterdam Schiphol → City Centre',
    date: '10 Mar 2025',
    time: '07:30 AM',
    amount: 28.0,
    category: 'Transfer',
  },
]

/* ─── Rewards / Points ────────────────────────────────────────── */
export const EARN_WAYS = [
  { id: 'flight', label: 'Book a flight', points: 150, unit: 'Per booking' },
  { id: 'stay', label: 'Book a stay', points: 100, unit: 'Per booking' },
  { id: 'esim', label: 'Buy an eSIM', points: 50, unit: 'Per plan' },
  { id: 'bundle', label: 'Bundle & save', points: 350, unit: 'Flight + hotel' },
  { id: 'refer', label: 'Refer a friend', points: 500, unit: 'When they book' },
] as const

export const AVAILABLE_REWARDS = [
  {
    id: 'rwd-001',
    title: '10% Off Next Booking',
    subtitle: 'Flights or stays',
    cost: 2000,
    type: 'discount',
  },
  {
    id: 'rwd-002',
    title: 'Airport Lounge Pass',
    subtitle: 'One-time lounge access',
    cost: 3000,
    type: 'experience',
  },
  {
    id: 'rwd-003',
    title: 'Free eSIM Plan',
    subtitle: '5GB data, any country',
    cost: 1500,
    type: 'esim',
  },
  {
    id: 'rwd-004',
    title: 'Priority Check-in',
    subtitle: 'Skip the queue at airport',
    cost: 2500,
    type: 'access',
  },
] as const

export const POINTS_HISTORY = [
  {
    id: 'ph-001',
    type: 'bundle',
    title: 'Bundle booked',
    subtitle: 'Dubai Flight + Hotel + eSIM',
    points: 350,
    date: '3 Jun 2025',
  },
  {
    id: 'ph-002',
    type: 'flight',
    title: 'Flight booked',
    subtitle: 'London → Barcelona',
    points: 150,
    date: '28 Apr 2025',
  },
  {
    id: 'ph-003',
    type: 'stay',
    title: 'Stay booked',
    subtitle: 'Hoxton Amsterdam · 3 nights',
    points: 100,
    date: '18 Feb 2025',
  },
  {
    id: 'ph-004',
    type: 'esim',
    title: 'eSIM purchased',
    subtitle: 'Europe 15GB · 30 days',
    points: 50,
    date: '8 Mar 2025',
  },
  {
    id: 'ph-005',
    type: 'refer',
    title: 'Referral bonus',
    subtitle: 'Friend booked a flight',
    points: 500,
    date: '1 Feb 2025',
  },
]

export const BADGES = [
  {
    id: 'b-001',
    name: 'First Booking',
    description: 'Complete your first booking',
    earned: true,
    date: '28 Apr 2025',
    progress: null,
    locked: false,
  },
  {
    id: 'b-002',
    name: 'Frequent Flyer',
    description: 'Book 5 flights',
    earned: false,
    date: null,
    progress: { current: 2, total: 5 },
    locked: false,
  },
  {
    id: 'b-003',
    name: 'Globe Trotter',
    description: 'Visit 3 different countries',
    earned: false,
    date: null,
    progress: { current: 2, total: 3 },
    locked: false,
  },
  {
    id: 'b-004',
    name: 'Bundle Master',
    description: 'Book 3 flight + hotel bundles',
    earned: false,
    date: null,
    progress: { current: 1, total: 3 },
    locked: false,
  },
  {
    id: 'b-005',
    name: 'Golafly Elite',
    description: 'Earn 10,000 points',
    earned: false,
    date: null,
    progress: null,
    locked: true,
  },
] as const

/* ─── Payment cards ───────────────────────────────────────────── */
export const PAYMENT_CARDS = [
  {
    id: 'card-001',
    brand: 'VISA',
    last4: '4242',
    expiry: '09/27',
    holder: 'Alex Morgan',
    primary: true,
  },
  {
    id: 'card-002',
    brand: 'Mastercard',
    last4: '7731',
    expiry: '03/26',
    holder: 'Alex Morgan',
    primary: false,
  },
] as const
