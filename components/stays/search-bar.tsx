"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function StaySearchBar() {
  return (
    <div className="border-b border-border bg-card/60 backdrop-blur-sm">
      <div className="page-container py-4">
        <motion.div
          className="flex flex-wrap items-stretch gap-2"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Destination */}
          <div className="flex min-w-[200px] flex-[2] flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5">
            <input placeholder="City or hotel name" className="bg-transparent text-[13px] font-medium text-foreground outline-none" />
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground">Destination</span>
          </div>

          {/* Check-in */}
          <div className="flex min-w-[130px] flex-1 flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5">
            <input type="date" defaultValue="2026-06-18" className="bg-transparent text-[13px] font-medium text-foreground outline-none" />
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground">Check-in</span>
          </div>

          {/* Check-out */}
          <div className="flex min-w-[130px] flex-1 flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5">
            <input type="date" defaultValue="2026-06-20" className="bg-transparent text-[13px] font-medium text-foreground outline-none" />
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground">Check-out</span>
          </div>

          {/* Guests */}
          <div className="flex min-w-[150px] flex-1 flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5">
            <select className="bg-transparent text-[13px] font-medium text-foreground outline-none">
              <option>2 Guests, 1 Room</option>
              <option>1 Guest, 1 Room</option>
              <option>4 Guests, 2 Rooms</option>
            </select>
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground">Guests</span>
          </div>

          {/* Search */}
          <motion.button
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground shadow-[0_0_12px_rgba(183,255,0,0.35)] transition-all hover:shadow-[0_0_20px_rgba(183,255,0,0.5)]"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
