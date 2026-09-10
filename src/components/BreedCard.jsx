import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function BreedCard({ breed, availableCount = 0 }) {
  return (
    <Link
      to={`/puppies?breed=${encodeURIComponent(breed.name)}`}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-pop sm:rounded-4xl"
    >
      <div
        className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${breed.accent}`}
      >
        <img
          src={breed.image}
          alt={`${breed.name} puppy`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-brand-teal shadow-soft sm:left-4 sm:top-4 sm:px-3 sm:text-[11px]">
          {availableCount > 0 ? `${availableCount} available` : "Enquire"}
        </span>
        <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-brand-ink/70 text-white opacity-100 backdrop-blur-sm transition-all duration-300 sm:right-4 sm:top-4 sm:h-9 sm:w-9 sm:opacity-0 sm:group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5 sm:py-4">
        <div className="min-w-0">
          <h3 className="truncate font-display text-sm font-700 text-brand-ink sm:text-lg">
            {breed.name}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-[10px] text-brand-charcoalSoft sm:text-xs">
            {breed.tagline}
          </p>
        </div>
        <span className="hidden w-fit flex-shrink-0 rounded-full bg-brand-tealLight px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-teal transition group-hover:bg-brand-teal group-hover:text-white sm:inline-flex">
          View Puppies
        </span>
      </div>
    </Link>
  );
}
