"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { usePlaceSuggestions } from "@/features/flights/hooks";
import type { PlaceSuggestion } from "@/features/flights/types";

interface AirportInputProps {
  value: string;
  onChange: (iataCode: string) => void;
  label: string;
  placeholder?: string;
  /** Skip the outer container — use when the parent already provides the card/border */
  naked?: boolean;
}

export function AirportInput({ value, onChange, label, placeholder, naked = false }: AirportInputProps) {
  const [query, setQuery]         = useState(value);
  const [open, setOpen]           = useState(false);
  const [debounced, setDebounced] = useState(value);
  const wrapperRef                = useRef<HTMLDivElement>(null);

  /* Sync display when parent resets (e.g. swap) */
  useEffect(() => { setQuery(value); }, [value]);

  /* 300 ms debounce */
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  /* Close on outside click */
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const { data, isFetching } = usePlaceSuggestions(debounced);
  const suggestions: PlaceSuggestion[] = data?.data ?? [];

  function select(s: PlaceSuggestion) {
    const iata = s.iata_code ?? "";
    const display = iata ? `${s.name} (${iata})` : s.name;
    setQuery(display);
    onChange(iata);
    setOpen(false);
  }

  const inputEl = (
    <div className="flex items-center gap-1.5">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder ?? "City or airport"}
        className="w-full bg-transparent text-[13px] font-medium text-foreground outline-none placeholder:text-muted-foreground"
      />
      {isFetching && <Loader2 className="h-3 w-3 shrink-0 animate-spin text-muted-foreground" />}
    </div>
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      {naked ? (
        inputEl
      ) : (
        <div className="flex flex-col justify-center rounded-xl border border-border bg-muted px-4 py-2.5">
          {inputEl}
          {label && (
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground">{label}</span>
          )}
        </div>
      )}

      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 top-full z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-border bg-background shadow-xl">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(s)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-primary/10"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">{s.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {s.iata_code ?? s.type}
                    {s.iata_country_code ? ` · ${s.iata_country_code}` : ""}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
