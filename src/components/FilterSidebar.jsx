import React from "react";
import { RotateCcw, X } from "lucide-react";
import { BREED_FILTER_LIST } from "../data/breeds.js";
import { AGE_OPTIONS, SIZE_OPTIONS } from "../data/cities.js";
import { PRICE_LIMITS } from "../config/config.js";
import PriceRangeSlider from "./PriceRangeSlider.jsx";

export default function FilterSidebar({
  filters,
  setFilters,
  onReset,
  onClose,
  resultCount = 0,
}) {
  const setField = (patch) => setFilters((f) => ({ ...f, ...patch }));

  const toggleBreed = (breed) => {
    const set = new Set(filters.breeds || []);
    set.has(breed) ? set.delete(breed) : set.add(breed);
    setField({ breeds: Array.from(set) });
  };

  return (
    <aside className="flex max-h-[92vh] flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/[0.04]">
      <div className="flex items-center justify-between border-b border-brand-beige px-5 py-4">
        <div>
          <p className="font-display text-lg font-extrabold">Filters</p>
          <p className="text-xs text-brand-charcoalSoft">{resultCount} puppies</p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onReset} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-tealLight">
            <RotateCcw className="h-3.5 w-3.5" /> Clear
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-brand-cream lg:hidden">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-charcoalSoft">Search</label>
          <input
            value={filters.q}
            onChange={(e) => setField({ q: e.target.value })}
            placeholder="Search for good pets"
            className="mt-2 w-full rounded-2xl border border-brand-beige bg-brand-cream/50 px-4 py-3 text-sm outline-none focus:border-brand-teal"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-charcoalSoft">Breed</p>
          <div className="mt-2 max-h-48 space-y-1 overflow-y-auto rounded-2xl border border-brand-beige p-3">
            {BREED_FILTER_LIST.map((b) => (
              <label key={b} className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-brand-cream">
                <span>{b}</span>
                <input
                  type="checkbox"
                  className="accent-brand-teal"
                  checked={(filters.breeds || []).includes(b)}
                  onChange={() => toggleBreed(b)}
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-charcoalSoft">Price Range</p>
          <div className="mt-3 rounded-2xl bg-brand-cream/70 p-4">
            <PriceRangeSlider
              min={filters.minPrice}
              max={filters.maxPrice}
              limits={PRICE_LIMITS}
              onChange={({ min, max }) => setField({ minPrice: min, maxPrice: max })}
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-charcoalSoft">Gender</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {["All", "Male", "Female"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setField({ gender: g })}
                className={`rounded-full px-2 py-2 text-xs font-semibold ${
                  filters.gender === g ? "bg-brand-teal text-white" : "bg-brand-cream text-brand-charcoal"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-charcoalSoft">Size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setField({ size: s.value })}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  filters.size === s.value
                    ? "border-brand-teal bg-brand-teal text-white"
                    : "border-brand-beige bg-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-charcoalSoft">Age</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {AGE_OPTIONS.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => setField({ age: a.value })}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  filters.age === a.value
                    ? "border-brand-teal bg-brand-teal text-white"
                    : "border-brand-beige bg-white"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {onClose && (
        <div className="border-t border-brand-beige p-4 lg:hidden">
          <button type="button" onClick={onClose} className="btn-primary w-full">
            Show {resultCount} Puppies
          </button>
        </div>
      )}
    </aside>
  );
}
