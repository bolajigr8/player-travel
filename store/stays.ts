/* ─── Stays types & dummy data ──────────────────────────────────── */

export interface StayRoom {
  id: string
  name: string
  description: string
  size: string
  bedInfo: string
  sleeps: number
  pricePerNight: number
  cancellation: 'Free cancellation' | 'Non-refundable'
  thumbnail?: string
}

export interface StayReview {
  id: string
  initial: string
  name: string
  country: string
  date: string
  score: number
  title: string
  body: string
}

export interface StayRatingBreakdown {
  cleanliness: number
  location: number
  staff: number
  comfort: number
  facilities: number
  value: number
}

export interface StayDetail {
  id: string
  name: string
  type: 'Resort' | 'Hotel' | 'Apartment' | 'Villa' | 'Hostel'
  stars: number
  rating: number
  ratingLabel: string
  reviewCount: number
  location: string
  country: string
  fullLocation: string
  pricePerNight: number
  originalPrice?: number
  discountPercent?: number
  isLimitedDeal?: boolean
  description: string
  amenities: { label: string; icon: string }[]
  images: string[]
  rooms: StayRoom[]
  ratingBreakdown: StayRatingBreakdown
  reviews: StayReview[]
  mapImage: string
  taxRate: number // fraction, e.g. 0.12
}

/* ─── Search result card type (existing) ────────────────────────── */
export interface StayResult {
  id: string
  name: string
  location: string
  country: string
  flag: string
  stars: number
  rating: number
  ratingLabel: string
  reviewCount: number
  pricePerNight: number
  originalPrice?: number
  amenities: string[]
  image: string
  isBestDeal?: boolean
}

/* ─── Single canonical "stay" used everywhere (Sunset Beach Resort) ─ */
export const STAY_DETAIL: StayDetail = {
  id: 'sunset-beach-resort',
  name: 'Sunset Beach Resort',
  type: 'Resort',
  stars: 5,
  rating: 9.0,
  ratingLabel: 'Exceptional',
  reviewCount: 1890,
  location: 'Kata Beach, Phuket',
  country: 'Thailand',
  fullLocation: 'Kata Beach, Phuket, Thailand',
  pricePerNight: 260,
  originalPrice: 330,
  discountPercent: 21,
  isLimitedDeal: true,
  description:
    'A beachfront resort above Kata Bay with cascading pools, a spa, and sunset views from every balcony — a few steps from the sand and the evening market.',
  amenities: [
    { label: 'Pool', icon: 'pool' },
    { label: 'Spa', icon: 'spa' },
    { label: 'WiFi', icon: 'wifi' },
    { label: 'Gym', icon: 'gym' },
    { label: 'Restaurant', icon: 'restaurant' },
    { label: 'Bar', icon: 'bar' },
  ],
  images: [
    '/stays/Bairo1.jpeg',
    '/stays/Bairo2.jpeg',
    '/stays/bali.jpeg',
    '/stays/beach-escapes.jpeg',
    '/stays/Bairo3.jpeg',
  ],
  rooms: [
    {
      id: 'garden-room',
      name: 'Garden Room',
      description: 'Tropical garden',
      size: '30 m²',
      bedInfo: '1 King Bed',
      sleeps: 2,
      pricePerNight: 260,
      cancellation: 'Free cancellation',
    },
    {
      id: 'ocean-view-room',
      name: 'Ocean View Room',
      description: 'Sea-facing balcony',
      size: '34 m²',
      bedInfo: '1 King Bed',
      sleeps: 2,
      pricePerNight: 340,
      cancellation: 'Free cancellation',
    },
    {
      id: 'pool-villa',
      name: 'Pool Villa',
      description: 'Private plunge pool',
      size: '',
      bedInfo: '1 King Bed + Sofa',
      sleeps: 3,
      pricePerNight: 520,
      cancellation: 'Non-refundable',
    },
  ],
  ratingBreakdown: {
    cleanliness: 9.3,
    location: 9.4,
    staff: 9.2,
    comfort: 9.1,
    facilities: 8.8,
    value: 8.7,
  },
  reviews: [
    {
      id: 'r1',
      initial: 'S',
      name: 'Sofia M.',
      country: 'Spain',
      date: 'March 2026',
      score: 9.6,
      title: 'Unforgettable stay',
      body: 'Spotless rooms, incredibly helpful staff and the location could not be better. We will absolutely return.',
    },
    {
      id: 'r2',
      initial: 'J',
      name: 'James T.',
      country: 'United Kingdom',
      date: 'February 2026',
      score: 9.0,
      title: 'Great value for the area',
      body: 'Comfortable bed, fast WiFi and a fantastic breakfast spread. Check-in was quick and friendly.',
    },
    {
      id: 'r3',
      initial: 'A',
      name: 'Aiko N.',
      country: 'Japan',
      date: 'February 2026',
      score: 8.8,
      title: 'Beautiful design',
      body: 'Stylish interiors and a calm atmosphere. The bathroom was a little compact but everything else was perfect.',
    },
    {
      id: 'r4',
      initial: 'L',
      name: 'Lucas P.',
      country: 'Brazil',
      date: 'January 2026',
      score: 9.4,
      title: 'Felt like home',
      body: 'The team went out of their way to help with restaurant bookings and late checkout. Highly recommended.',
    },
    {
      id: 'r5',
      initial: 'E',
      name: 'Emma R.',
      country: 'United States',
      date: 'January 2026',
      score: 8.5,
      title: 'Excellent location',
      body: 'Walking distance to everything we wanted to see. Rooms are quiet despite being central.',
    },
  ],
  mapImage: '/stays/map-world.jpg',
  taxRate: 0.12, // ~$94 on $780
}

/* ─── Search results list (kept from existing store) ─────────────── */
export const STAY_RESULTS: StayResult[] = [
  {
    id: 'sunset-beach-resort',
    name: 'Sunset Beach Resort',
    location: 'Kata Beach, Phuket',
    country: 'Thailand',
    flag: '🇹🇭',
    stars: 5,
    rating: 9.0,
    ratingLabel: 'Exceptional',
    reviewCount: 1890,
    pricePerNight: 260,
    originalPrice: 330,
    amenities: ['Pool', 'Spa', 'WiFi', 'Gym', 'Restaurant'],
    image: '/stays/beach-escapes.jpeg',
    isBestDeal: true,
  },
]

/* ─── Filters (kept from existing store) ─────────────────────────── */
export const STAY_FILTERS = {
  popularFilters: [
    'Free cancellation',
    'Pool',
    'Breakfast included',
    '5-star only',
    'Pet friendly',
  ],
  propertyTypes: ['Hotel', 'Apartment', 'Villa', 'Hostel', 'Resort'],
  guestRatings: [
    { label: 'Wonderful', value: 9 },
    { label: 'Very good', value: 8 },
    { label: 'Good', value: 7 },
  ],
  amenitiesList: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'],
} as const

export const PRICE_INSIGHTS_STAYS = {
  isLow: true,
  avgPerNight: 258,
  bestDeal: 185,
  message: 'Prices are 12% lower than usual this week.',
}

/* ─── Landing page content ──────────────────────────────────────── */
export const STAY_PROMO_CARDS = [
  {
    id: 'city-breaks',
    tag: 'Trending Now',
    title: 'City Breaks',
    description: "Boutique stays in the heart of Europe's most loved cities.",
    cta: 'Explore stays',
    image: '/stays/city-breaks.jpeg',
    variant: 'primary' as const,
  },
  {
    id: 'beach-escapes',
    tag: 'Sun & Sand',
    title: 'Beach Escapes',
    description: 'Resorts and villas steps from the water, from $230 a night.',
    cta: 'See resorts',
    image: '/stays/beach-escapes.jpeg',
    variant: 'outline' as const,
  },
] as const

export const STAY_DESTINATIONS = [
  {
    code: 'DXB',
    name: 'Dubai',
    country: 'UAE',
    price: 320,
    image: '/stays/dubai.jpeg',
  },
  {
    code: 'PAR',
    name: 'Paris',
    country: 'France',
    price: 210,
    image: '/stays/paris.jpeg',
  },
  {
    code: 'LIS',
    name: 'Lisbon',
    country: 'Portugal',
    price: 270,
    image: '/stays/lisbon.jpeg',
  },
  {
    code: 'AMS',
    name: 'Amsterdam',
    country: 'Netherlands',
    price: 185,
    image: '/stays/amsterdan.jpeg',
  },
  {
    code: 'TYO',
    name: 'Tokyo',
    country: 'Japan',
    price: 480,
    image: '/stays/tokyo.jpeg',
  },
  {
    code: 'ROM',
    name: 'Rome',
    country: 'Italy',
    price: 175,
    image: '/stays/rome.jpeg',
  },
] as const

export const STAY_TRUST_BADGES = [
  { icon: 'shield', title: 'Free Cancellation', subtitle: 'On most rooms' },
  { icon: 'tag', title: 'Best Price', subtitle: 'We match any price' },
  { icon: 'star', title: 'Verified Reviews', subtitle: 'From real guests' },
  { icon: 'message', title: '24/7 Support', subtitle: "We're always here" },
] as const
