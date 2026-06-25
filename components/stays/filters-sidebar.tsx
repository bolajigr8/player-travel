"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { STAY_FILTERS } from "@/store/travel";

interface Props {
  activeFilters: string[];
  toggleFilter: (f: string) => void;
  activeTypes: string[];
  toggleType: (t: string) => void;
}

export function StayFiltersSidebar({ activeFilters, toggleFilter, activeTypes, toggleType }: Props) {
  return (
    <aside className="space-y-6 rounded-xl border border-border bg-card p-4">
      {/* Popular filters */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Popular Filters
        </h3>
        <div className="space-y-2">
          {STAY_FILTERS.popularFilters.map(f => (
            <label key={f} className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={activeFilters.includes(f)}
                  onChange={() => toggleFilter(f)}
                  className="accent-primary h-3.5 w-3.5 cursor-pointer"
                />
                <span className="text-[13px] text-foreground">{f}</span>
              </div>
              <span className="font-mono text-[9px] text-primary">on</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price per night */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Price per Night
        </h3>
        <div className="flex items-center justify-between font-mono text-[11px] text-primary">
          <span>€50</span><span>€1,000+</span>
        </div>
        <input type="range" min={50} max={1000} defaultValue={450} className="mt-1.5 w-full accent-primary" />
      </div>

      {/* Property type */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Property Type
        </h3>
        <div className="space-y-1.5">
          {STAY_FILTERS.propertyTypes.map(type => (
            <motion.button
              key={type}
              onClick={() => toggleType(type)}
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-left text-[13px] transition-colors",
                activeTypes.includes(type)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted/30 text-foreground hover:border-primary/30",
              )}
              whileTap={{ scale: 0.98 }}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Guest rating */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Guest Rating
        </h3>
        <div className="space-y-2">
          {STAY_FILTERS.guestRatings.map(r => (
            <label key={r.value} className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-2.5">
                <input type="checkbox" defaultChecked className="accent-primary h-3.5 w-3.5 cursor-pointer" />
                <span className="text-[13px] text-foreground">{r.label}</span>
              </div>
              <span className="font-mono text-[9px] text-primary">on</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
