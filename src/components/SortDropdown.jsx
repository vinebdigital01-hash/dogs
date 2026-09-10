import React from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "age-asc", label: "Age: Youngest first" },
  { value: "age-desc", label: "Age: Oldest first" },
];

export default function SortDropdown({ value, onChange, className = "" }) {
  return (
    <label
      className={`relative inline-flex w-full min-w-0 items-center gap-2 rounded-full border border-brand-teal/20 bg-white px-4 py-2.5 pr-10 shadow-sm transition focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/15 sm:w-auto ${className}`}
    >
      <ArrowUpDown className="h-4 w-4 flex-shrink-0 text-brand-teal" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 appearance-none bg-transparent text-sm font-medium text-brand-charcoal outline-none sm:pr-4"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            Sort by: {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/60" />
    </label>
  );
}
