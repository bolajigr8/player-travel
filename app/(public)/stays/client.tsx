// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'
// import {
//   Search,
//   ShieldCheck,
//   Star,
//   Headphones,
//   MapPin,
//   ArrowRight,
// } from 'lucide-react'

// const TRUST = [
//   { icon: ShieldCheck, t: 'Free Cancellation', b: 'On most rooms' },
//   { icon: Star, t: 'Best Price', b: 'We match any price' },
//   { icon: Star, t: 'Verified Reviews', b: 'From real guests' },
//   { icon: Headphones, t: '24/7 Support', b: "We're always here" },
// ]

// const CATEGORIES = [
//   {
//     id: 'city',
//     label: 'City Breaks',
//     body: "Boutique stays in the heart of Europe's most loved cities.",
//     cta: 'Explore stays',
//     href: '/stays/search',
//     image: '/b01eef212cfdae3dc78a4a2ae45b51bea5321ad5.png',
//   },
//   {
//     id: 'beach',
//     label: 'Beach Escapes',
//     body: 'Resorts and villas steps from the water, from $230 a night.',
//     cta: 'See resorts',
//     href: '/stays/search',
//     image: '/7a586d726fe648e46cf473e1282c5f6522a5af8a.png',
//   },
// ]

// const DESTINATIONS = [
//   {
//     name: 'Dubai',
//     flag: '🇦🇪',
//     country: 'UAE',
//     from: 326,
//     image: '/ae0ab7a4e80b791ec1d798d3e2285729eb0194b6.png',
//   },
//   {
//     name: 'Paris',
//     flag: '🇫🇷',
//     country: 'France',
//     from: 216,
//     image: '/c5902ebd4561e008b4d3a49c231b9b87ed04c7cb.png',
//   },
//   {
//     name: 'Lisbon',
//     flag: '🇵🇹',
//     country: 'Portugal',
//     from: 276,
//     image: '/7a586d726fe648e46cf473e1282c5f6522a5af8a.png',
//   },
//   {
//     name: 'Amsterdam',
//     flag: '🇳🇱',
//     country: 'Netherlands',
//     from: 185,
//     image: '/daf4cd06de656d37ff8c620a8913ef7119a6e9fc.png',
//   },
//   {
//     name: 'Tokyo',
//     flag: '🇯🇵',
//     country: 'Japan',
//     from: 480,
//     image: '/7d339df8f415673a11b4d88dc76a9959c419ca5f.png',
//   },
//   {
//     name: 'Rome',
//     flag: '🇮🇹',
//     country: 'Italy',
//     from: 174,
//     image: '/1524a9703d60ba170b8762ae15b7455b02fe81f8.png',
//   },
// ]

// export function StaysClient() {
//   const router = useRouter()
//   const [destination, setDestination] = useState('')
//   const [checkIn, setCheckIn] = useState('')
//   const [checkOut, setCheckOut] = useState('')
//   const [guests, setGuests] = useState('2 Guests · 1 Room')

//   function handleSearch() {
//     const q = new URLSearchParams()
//     if (destination) q.set('q', destination)
//     if (checkIn) q.set('checkin', checkIn)
//     if (checkOut) q.set('checkout', checkOut)
//     router.push(`/stays/search?${q.toString()}`)
//   }

//   return (
//     <div className='min-h-screen bg-background'>
//       {/* ── Hero ── */}
//       <section className='relative overflow-hidden bg-background pb-8 pt-10 sm:pb-12 sm:pt-14'>
//         <div className='page-container'>
//           <p className='mb-4 font-mono text-[10px] tracking-[2.5px] text-muted-foreground'>
//             GOLAFLY · STAYS
//           </p>

//           <h1 className='font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
//             Find Your <span className='text-primary'>Perfect</span> Stay
//           </h1>
//           <p className='mt-3 text-sm text-muted-foreground sm:text-base'>
//             Compare thousands of hotels, apartments &amp; villas · Free
//             cancellation · Best price guarantee
//           </p>

//           {/* Search form */}
//           <div className='mt-6 grid grid-cols-1 gap-2 rounded-2xl border border-border bg-card p-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]'>
//             <div className='flex flex-col justify-center rounded-xl border border-border bg-background px-4 py-3'>
//               <p className='font-mono text-[9px] tracking-widest text-muted-foreground uppercase'>
//                 Destination
//               </p>
//               <input
//                 value={destination}
//                 onChange={(e) => setDestination(e.target.value)}
//                 placeholder='Where are you going?'
//                 className='mt-0.5 bg-transparent text-[13px] font-medium text-foreground placeholder:text-muted-foreground focus:outline-none'
//               />
//             </div>
//             <div className='flex flex-col justify-center rounded-xl border border-border bg-background px-4 py-3'>
//               <p className='font-mono text-[9px] tracking-widest text-muted-foreground uppercase'>
//                 Check-in
//               </p>
//               <input
//                 type='date'
//                 value={checkIn}
//                 onChange={(e) => setCheckIn(e.target.value)}
//                 className='mt-0.5 bg-transparent text-[13px] font-medium text-foreground focus:outline-none'
//               />
//             </div>
//             <div className='flex flex-col justify-center rounded-xl border border-border bg-background px-4 py-3'>
//               <p className='font-mono text-[9px] tracking-widest text-muted-foreground uppercase'>
//                 Check-out
//               </p>
//               <input
//                 type='date'
//                 value={checkOut}
//                 onChange={(e) => setCheckOut(e.target.value)}
//                 className='mt-0.5 bg-transparent text-[13px] font-medium text-foreground focus:outline-none'
//               />
//             </div>
//             <div className='flex flex-col justify-center rounded-xl border border-border bg-background px-4 py-3'>
//               <p className='font-mono text-[9px] tracking-widest text-muted-foreground uppercase'>
//                 Guests &amp; rooms
//               </p>
//               <input
//                 value={guests}
//                 onChange={(e) => setGuests(e.target.value)}
//                 className='mt-0.5 bg-transparent text-[13px] font-medium text-foreground focus:outline-none'
//               />
//             </div>
//             <button
//               onClick={handleSearch}
//               className='flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_16px_rgba(183,255,0,0.4)] transition-all hover:shadow-[0_0_28px_rgba(183,255,0,0.55)]'
//             >
//               <Search className='size-4' /> Search
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ── Trust badges ── */}
//       <section className='border-y border-border bg-muted/30'>
//         <div className='page-container grid grid-cols-2 gap-px sm:grid-cols-4'>
//           {TRUST.map(({ icon: Icon, t, b }) => (
//             <div key={t} className='flex items-center gap-3 px-4 py-4 sm:py-5'>
//               <div className='grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10'>
//                 <Icon className='size-4 text-primary' />
//               </div>
//               <div>
//                 <p className='text-[12px] font-bold text-foreground'>{t}</p>
//                 <p className='text-[11px] text-muted-foreground'>{b}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── Categories ── */}
//       <section className='page-container py-10 sm:py-14'>
//         <div className='grid gap-4 sm:grid-cols-2'>
//           {CATEGORIES.map((cat) => (
//             <motion.div
//               key={cat.id}
//               className='group relative h-52 overflow-hidden rounded-2xl sm:h-64'
//               whileHover={{ scale: 1.01 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Image
//                 src={cat.image}
//                 alt={cat.label}
//                 fill
//                 sizes='(max-width: 640px) 100vw, 50vw'
//                 className='object-cover transition-transform duration-500 group-hover:scale-105'
//               />
//               <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />
//               <div className='absolute bottom-0 left-0 p-5'>
//                 <h2 className='font-heading text-xl font-bold text-white sm:text-2xl'>
//                   {cat.label}
//                 </h2>
//                 <p className='mt-1 text-[12px] text-white/80'>{cat.body}</p>
//                 <Link
//                   href={cat.href}
//                   className='mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-primary'
//                 >
//                   <ArrowRight className='size-3' /> {cat.cta}
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ── Popular destinations ── */}
//       <section className='page-container pb-14'>
//         <div className='mb-5 flex items-center justify-between'>
//           <div>
//             <p className='font-mono text-[10px] tracking-[2.5px] text-primary'>
//               Popular Destinations
//             </p>
//             <h2 className='mt-1 font-heading text-2xl font-bold text-foreground'>
//               Where to Next?
//             </h2>
//           </div>
//           <Link
//             href='/stays/search'
//             className='font-mono text-[11px] text-primary hover:underline'
//           >
//             View all stays →
//           </Link>
//         </div>

//         <div className='flex gap-3 overflow-x-auto pb-4 scrollbar-hide'>
//           {DESTINATIONS.map((dest, i) => (
//             <motion.div
//               key={dest.name}
//               className='group relative h-40 min-w-[180px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl sm:h-48 sm:min-w-[200px]'
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: i * 0.06, duration: 0.4 }}
//               whileHover={{ y: -4 }}
//             >
//               <Image
//                 src={dest.image}
//                 alt={dest.name}
//                 fill
//                 sizes='(max-width: 640px) 180px, 200px'
//                 className='object-cover transition-transform duration-500 group-hover:scale-105'
//               />
//               <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
//               <div className='absolute bottom-0 left-0 p-3'>
//                 <p className='flex items-center gap-1.5 font-heading text-[14px] font-bold text-white'>
//                   <MapPin className='size-3 text-primary' /> {dest.name}
//                 </p>
//                 <p className='mt-0.5 font-mono text-[10px] text-white/60'>
//                   {dest.country}
//                 </p>
//                 <p className='font-mono text-[11px] font-bold text-primary'>
//                   from ${dest.from} / night
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   )
// }
