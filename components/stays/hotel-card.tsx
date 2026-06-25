"use client";

import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import type { StayResult } from "@/store/travel";

export function HotelCard({ stay, index }: { stay: StayResult; index: number }) {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-border bg-card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48 lg:w-56">
          <motion.img
            src={stay.image}
            alt={stay.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 }}
          />
          <button className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60">
            ♡
          </button>
          <div className="absolute left-2.5 top-2.5 flex gap-0.5">
            {Array.from({ length: stay.stars }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-3 p-4">
          <div>
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-start">
              <div className="flex-1">
                <h3 className="text-[15px] font-bold text-foreground">{stay.name}</h3>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span>{stay.location}</span>
                </div>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                {stay.originalPrice && (
                  <p className="text-[11px] text-muted-foreground line-through">€{stay.originalPrice}</p>
                )}
                <p className="text-[20px] font-bold text-primary">€{stay.pricePerNight}</p>
                <p className="text-[10px] text-muted-foreground">per night</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {stay.amenities.map(a => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[9px] text-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-9 items-center justify-center rounded-lg bg-primary text-[12px] font-bold text-primary-foreground">
                {stay.rating}
              </span>
              <div>
                <p className="text-[12px] font-semibold text-foreground">{stay.ratingLabel}</p>
                <p className="text-[10px] text-muted-foreground">
                  {stay.reviewCount.toLocaleString()} reviews
                </p>
              </div>
              {stay.isBestDeal && (
                <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[9px] font-bold text-primary">
                  Best Deal
                </span>
              )}
            </div>

            {/* CTA */}
            <motion.button
              className="w-full rounded-full bg-primary px-4 py-2 text-[12px] font-bold text-primary-foreground shadow-[0_0_8px_rgba(183,255,0,0.3)] transition-all hover:shadow-[0_0_16px_rgba(183,255,0,0.5)] sm:w-auto"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            >
              View Property
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
