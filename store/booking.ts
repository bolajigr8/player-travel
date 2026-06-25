import { create } from 'zustand'

function diffNights(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn).getTime()
  const b = new Date(checkOut).getTime()
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 1
}

interface BookingAddOn {
  id: string
  label: string
  description: string
  price: number
  unit: '/ night' | '/ stay'
  icon: string
}

export const ADD_ONS: BookingAddOn[] = [
  {
    id: 'breakfast',
    label: 'Breakfast included',
    description: 'Daily buffet breakfast for all guests',
    price: 18,
    unit: '/ night',
    icon: 'coffee',
  },
  {
    id: 'airport-transfer',
    label: 'Airport transfer',
    description: 'Private round-trip airport pickup & drop-off',
    price: 45,
    unit: '/ stay',
    icon: 'car',
  },
  {
    id: 'early-checkin',
    label: 'Early check-in',
    description: 'Guaranteed room from 9:00 AM on arrival day',
    price: 25,
    unit: '/ stay',
    icon: 'clock',
  },
  {
    id: 'late-checkout',
    label: 'Late check-out',
    description: 'Keep your room until 4:00 PM on departure',
    price: 25,
    unit: '/ stay',
    icon: 'clock',
  },
  {
    id: 'parking',
    label: 'On-site parking',
    description: 'Secure covered parking, in & out access',
    price: 15,
    unit: '/ night',
    icon: 'parking',
  },
  {
    id: 'insurance',
    label: 'Travel insurance',
    description: 'Free cancellation & medical coverage',
    price: 12,
    unit: '/ night',
    icon: 'shield',
  },
]

interface BookingState {
  checkIn: string
  checkOut: string
  guests: string
  selectedRoomId: string | null
  selectedAddOnIds: string[]
  // Guest details
  firstName: string
  lastName: string
  email: string
  countryCode: string
  phone: string
  arrivalTime: string
  specialRequests: string

  setCheckIn: (v: string) => void
  setCheckOut: (v: string) => void
  setGuests: (v: string) => void
  setSelectedRoom: (id: string) => void
  toggleAddOn: (id: string) => void
  setGuestField: (field: string, value: string) => void
  nights: () => number
}

export const useBookingStore = create<BookingState>((set, get) => ({
  checkIn: '2026-06-26',
  checkOut: '2026-06-29',
  guests: '2 Guests · 1 Room',
  selectedRoomId: null,
  selectedAddOnIds: [],
  firstName: '',
  lastName: '',
  email: '',
  countryCode: 'Argentina (+54)',
  phone: '',
  arrivalTime: "I'm not sure",
  specialRequests: '',

  setCheckIn: (v) => set({ checkIn: v }),
  setCheckOut: (v) => set({ checkOut: v }),
  setGuests: (v) => set({ guests: v }),
  setSelectedRoom: (id) => set({ selectedRoomId: id }),
  toggleAddOn: (id) =>
    set((state) => ({
      selectedAddOnIds: state.selectedAddOnIds.includes(id)
        ? state.selectedAddOnIds.filter((x) => x !== id)
        : [...state.selectedAddOnIds, id],
    })),
  setGuestField: (field, value) => set({ [field]: value } as any),
  nights: () => diffNights(get().checkIn, get().checkOut),
}))
