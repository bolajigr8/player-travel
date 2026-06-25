/* ─── Flights ─────────────────────────────────────────────────── */
export interface FlightResult {
  id: string;
  airline: string;
  flag: string;          // country flag emoji
  from: string;          // IATA code
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  price: number;
  tag?: "Recommended" | "Cheapest" | "Fastest" | "Best Value";
}

export const FLIGHT_RESULTS: FlightResult[] = [
  { id: "ib001",  airline: "Iberia",          flag: "🇪🇸", from: "LHR", to: "DXB", depart: "08:35", arrive: "12:15",    duration: "7h 40m", stops: "Direct",  price: 389, tag: "Recommended" },
  { id: "ba002",  airline: "British Airways",  flag: "🇬🇧", from: "LHR", to: "DXB", depart: "14:20", arrive: "00:05+1",  duration: "1h 45m", stops: "1 Stop",  price: 421 },
  { id: "ek003",  airline: "Emirates",         flag: "🇦🇪", from: "LHR", to: "DXB", depart: "21:30", arrive: "07:25+1",  duration: "7h 55m", stops: "Direct",  price: 358, tag: "Best Value" },
  { id: "af004",  airline: "Air France",       flag: "🇫🇷", from: "LHR", to: "DXB", depart: "11:15", arrive: "07:30+1",  duration: "1h 15m", stops: "2 Stops", price: 612 },
  { id: "tk005",  airline: "Turkish Airlines", flag: "🇹🇷", from: "LHR", to: "DXB", depart: "07:50", arrive: "20:45",    duration: "1h 55m", stops: "1 Stop",  price: 285, tag: "Cheapest" },
  { id: "fz006",  airline: "flydubai",         flag: "🇦🇪", from: "LHR", to: "DXB", depart: "18:40", arrive: "06:25+1",  duration: "9h 45m", stops: "Direct",  price: 260 },
];

export const SORT_TABS = [
  { id: "best",       label: "Best",       price: 354 },
  { id: "cheapest",   label: "Cheapest",   price: 260 },
  { id: "fastest",    label: "Fastest",    price: 592 },
  { id: "best_value", label: "Best Value", price: 384 },
] as const;

export const RECENT_SEARCHES = [
  { label: "London – Dubai",    origin: "LHR", destination: "DXB" },
  { label: "Paris – New York",  origin: "CDG", destination: "JFK" },
  { label: "Istanbul – London", origin: "IST", destination: "LHR" },
  { label: "Rome – Barcelona",  origin: "FCO", destination: "BCN" },
] as const;

/* ─── Stays ───────────────────────────────────────────────────── */
export interface StayResult {
  id: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  stars: number;
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  amenities: string[];
  image: string;
  isBestDeal?: boolean;
}

export const STAY_RESULTS: StayResult[] = [
  {
    id: "gp001",
    name: "The Grand Plaza",
    location: "Dubai Marina, UAE",
    country: "UAE",
    flag: "🇦🇪",
    stars: 5,
    rating: 9.4,
    ratingLabel: "Exceptional",
    reviewCount: 2140,
    pricePerNight: 420,
    originalPrice: 540,
    amenities: ["Pool", "Spa", "WiFi", "Gym"],
    image: "/ae0ab7a4e80b791ec1d798d3e2285729eb0194b6.png",
  },
  {
    id: "hx002",
    name: "Hoxton Amsterdam",
    location: "Amsterdam, Netherlands",
    country: "Netherlands",
    flag: "🇳🇱",
    stars: 4,
    rating: 8.8,
    ratingLabel: "Excellent",
    reviewCount: 1876,
    pricePerNight: 185,
    amenities: ["WiFi", "Restaurant", "Bar"],
    image: "/daf4cd06de656d37ff8c620a8913ef7119a6e9fc.png",
    isBestDeal: true,
  },
  {
    id: "ba003",
    name: "Bairro Alto Hotel",
    location: "Lisbon, Portugal",
    country: "Portugal",
    flag: "🇵🇹",
    stars: 5,
    rating: 9.1,
    ratingLabel: "Exceptional",
    reviewCount: 987,
    pricePerNight: 270,
    originalPrice: 340,
    amenities: ["Pool", "WiFi", "Spa", "Rooftop"],
    image: "/7a586d726fe648e46cf473e1282c5f6522a5af8a.png",
  },
];

export const STAY_FILTERS = {
  popularFilters: [
    "Free cancellation",
    "Pool",
    "Breakfast included",
    "5-star only",
    "Pet friendly",
  ],
  propertyTypes: ["Hotel", "Apartment", "Villa", "Hostel", "Resort"],
  guestRatings: [
    { label: "9+ Exceptional", value: 9 },
    { label: "8+ Excellent",   value: 8 },
    { label: "7+ Good",        value: 7 },
  ],
} as const;

export const PRICE_INSIGHTS_STAYS = {
  isLow: true,
  avgPerNight: 258,
  bestDeal: 185,
  message: "Prices are 12% lower than usual this week.",
};

export const PRICE_INSIGHTS_FLIGHTS = {
  isLow: true,
  saving: 120,
  message: "Prices are currently low — €120 less than usual for your search.",
};
