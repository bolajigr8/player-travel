"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FLIGHT_STEPS = [
  "Flight & Fare",
  "Bags",
  "Seats",
  "Extras",
  "Checkout",
] as const;

export type FlightStep = 1 | 2 | 3 | 4 | 5;

export function StepProgress({
  currentStep,
  steps = FLIGHT_STEPS,
}: {
  currentStep: number;
  steps?: readonly string[];
}) {
  return (
    <motion.div
      className="flex flex-wrap items-center gap-y-2"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {steps.map((step, i) => {
        const num = i + 1;
        const done = num < currentStep;
        const active = num === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <motion.span
                className={cn(
                  "flex size-[22px] shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold tracking-wider",
                  done && "border-border bg-muted text-muted-foreground",
                  active && "border-primary bg-primary text-primary-foreground shadow-[0_0_8px_rgba(183,255,0,0.4)]",
                  !done && !active && "border-muted-foreground/40 text-muted-foreground/60",
                )}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.07, duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
              >
                {done ? "✓" : num}
              </motion.span>
              <motion.span
                className={cn(
                  "hidden font-mono text-[10px] tracking-wider sm:block",
                  active ? "text-primary" : "text-muted-foreground",
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.07 + 0.1, duration: 0.3 }}
              >
                {step}
              </motion.span>
            </div>
            {i < steps.length - 1 && (
              <motion.div
                className="mx-2 h-px w-8 bg-border/50 sm:mx-4 sm:w-14"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: i * 0.07 + 0.15, duration: 0.3 }}
                style={{ originX: 0 }}
              />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
