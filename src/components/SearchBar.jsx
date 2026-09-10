import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search breed or puppy name…",
  className = "",
}) {
  return (
    <label
      className={`flex items-center gap-2 rounded-full border border-brand-teal/20 bg-white px-4 py-2.5 shadow-sm transition focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/15 ${className}`}
    >
      <Search className="h-4 w-4 text-brand-teal" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-brand-charcoal/50"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="grid h-6 w-6 place-items-center rounded-full text-brand-charcoal/60 transition hover:bg-brand-cream hover:text-brand-teal"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </label>
  );
}
