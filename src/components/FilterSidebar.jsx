import React from "react";
import { RotateCcw, X } from "lucide-react";
import PriceRangeSlider from "./PriceRangeSlider.jsx";
import { BREED_NAMES } from "../data/breeds.js";
import { PRICE_LIMITS } from "../config/config.js";

const AGE_BUCKETS = [
  { label: "All Ages", value: "all" },
  { label: "0 – 2 Months", value: "0-2" },
  { label: "2 – 4 Months", value: "2-4" },
  { label: "4 – 6 Months", value: "4-6" },
  { label: "6+ Months", value: "6+" },
];

const GENDERS = ["All", "Male", "Female"];
const AVAILABILITY = ["Available", "Reserved", "Sold"];

export default function FilterSidebar({
  filters,
  setFilters,
  onReset,
  onClose, // provided in mobile drawer
  resultCount = 0,
}) {
  const setField = (patch) => setFilters((f) => ({ ...f, ...patch }));

  const toggleAvailability = (opt) => {
    const set = new Set(filters.availability);
    set.has(opt) ? set.delete(opt) : set.add(opt);
    setField({ availability: Array.from(set) });
  };

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-4xl bg-white shadow-card ring-1 ring-black/[0.03]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-cream px-6 py-5">
        <div>
          <p className="font-display text-lg font-700 text-brand-ink">Filters</p>
          <p className="text-xs text-brand-charcoalSoft">
            {resultCount} {resultCount === 1 ? "puppy" : "puppies"} matched
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-teal transition hover:bg-brand-tealLight"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Clear All Filters
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="grid h-9 w-9 place-items-center rounded-full bg-brand-cream lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
        {/* Breed */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
            Breed
          </p>
          <div className="relative mt-3">
            <select
              value={filters.breed}
              onChange={(e) => setField({ breed: e.target.value })}
              className="w-full appearance-none rounded-2xl border border-brand-teal/20 bg-brand-cream/60 px-4 py-3 pr-9 text-sm font-medium text-brand-charcoal outline-none transition focus:border-brand-teal"
            >
              {BREED_NAMES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-teal">
              ▾
            </span>
          </div>
        </div>

        {/* Gender */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
            Gender
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {GENDERS.map((g) => {
              const active = filters.gender === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setField({ gender: g })}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-brand-teal text-white shadow-soft"
                      : "bg-brand-cream text-brand-charcoal hover:bg-brand-tealLight"
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Age */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
            Age
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {AGE_BUCKETS.map((b) => {
              const active = filters.ageBucket === b.value;
              return (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setField({ ageBucket: b.value })}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "border-brand-teal bg-brand-teal text-white"
                      : "border-brand-teal/20 bg-white text-brand-charcoal hover:border-brand-teal hover:text-brand-teal"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
            Price Range
          </p>
          <div className="mt-4 rounded-3xl bg-brand-cream/60 p-5">
            <PriceRangeSlider
              min={filters.minPrice}
              max={filters.maxPrice}
              limits={PRICE_LIMITS}
              onChange={({ min, max }) =>
                setField({ minPrice: min, maxPrice: max })
              }
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
            Availability
          </p>
          <div className="mt-3 space-y-2">
            {AVAILABILITY.map((opt) => {
              const active = filters.availability.includes(opt);
              return (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "border-brand-teal bg-brand-tealLight text-brand-teal"
                      : "border-brand-cream bg-white text-brand-charcoal hover:border-brand-teal/40"
                  }`}
                >
                  <span>{opt}</span>
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-brand-teal"
                    checked={active}
                    onChange={() => toggleAvailability(opt)}
                  />
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {onClose && (
        <div className="border-t border-brand-cream p-5 lg:hidden">
          <button type="button" onClick={onClose} className="btn-primary w-full">
            Show {resultCount} Puppies
          </button>
        </div>
      )}
    </aside>
  );
}

// Helper — check if a puppy's ageInMonths falls into a bucket
export const ageInBucket = (months, bucket) => {
  switch (bucket) {
    case "0-2":
      return months < 2;
    case "2-4":
      return months >= 2 && months < 4;
    case "4-6":
      return months >= 4 && months < 6;
    case "6+":
      return months >= 6;
    case "all":
    default:
      return true;
  }
};
