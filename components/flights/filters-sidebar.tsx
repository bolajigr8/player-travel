"use client";

const STOPS_OPTIONS = ["Direct", "1 Stop", "2+ Stops"] as const;

interface Props {
  selectedStops: string[];
  toggleStop: (s: string) => void;
  /** Airlines present in the current results, with their lowest total price */
  airlines: { name: string; minPrice: number }[];
  activeAirlines: string[];
  toggleAirline: (a: string) => void;
  /** Min/max total price across the current results */
  priceBounds?: { min: number; max: number };
  /** Current "up to" price — null means no cap */
  maxPrice: number | null;
  onMaxPriceChange: (v: number) => void;
  currencySymbol?: string;
}

export function FlightFiltersSidebar({
  selectedStops,
  toggleStop,
  airlines,
  activeAirlines,
  toggleAirline,
  priceBounds,
  maxPrice,
  onMaxPriceChange,
  currencySymbol = "€",
}: Props) {
  const priceValue = maxPrice ?? priceBounds?.max ?? 0;

  return (
    <aside className="space-y-6 rounded-xl border border-border bg-card p-4">
      {/* Stops */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Stops
        </h3>
        <div className="space-y-2">
          {STOPS_OPTIONS.map(stop => (
            <label key={stop} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={selectedStops.includes(stop)}
                onChange={() => toggleStop(stop)}
                className="accent-primary h-3.5 w-3.5 cursor-pointer rounded"
              />
              <span className="text-[13px] text-foreground">{stop}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Max Price
        </h3>
        {priceBounds ? (
          <>
            <div className="flex items-center justify-between font-mono text-[11px] text-primary">
              <span>{currencySymbol}{priceBounds.min}</span>
              <span>up to {currencySymbol}{priceValue}</span>
            </div>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              value={priceValue}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="mt-1.5 w-full accent-primary"
            />
          </>
        ) : (
          <p className="text-[11px] text-muted-foreground">Search to filter by price.</p>
        )}
      </div>

      {/* Airlines */}
      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Airlines
        </h3>
        {airlines.length > 0 ? (
          <div className="space-y-2">
            {airlines.map(a => (
              <label key={a.name} className="flex cursor-pointer items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={activeAirlines.includes(a.name)}
                    onChange={() => toggleAirline(a.name)}
                    className="accent-primary h-3.5 w-3.5 cursor-pointer"
                  />
                  <span className="text-[13px] text-foreground">{a.name}</span>
                </div>
                <span className="font-mono text-[10px] text-primary">from {currencySymbol}{a.minPrice}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-muted-foreground">Search to filter by airline.</p>
        )}
      </div>
    </aside>
  );
}
