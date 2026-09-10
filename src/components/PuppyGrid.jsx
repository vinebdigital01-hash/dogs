import React from "react";
import { PawPrint } from "lucide-react";
import PuppyCard from "./PuppyCard.jsx";

export default function PuppyGrid({ puppies, emptyState, columns = "listing" }) {
  if (!puppies || puppies.length === 0) {
    return (
      emptyState || (
        <div className="mx-auto max-w-md rounded-4xl bg-brand-cream/60 p-10 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-teal shadow-soft">
            <PawPrint className="h-6 w-6" />
          </span>
          <h3 className="mt-5 font-display text-xl font-700 text-brand-ink">
            No puppies match your filters
          </h3>
          <p className="mt-2 text-sm text-brand-charcoalSoft">
            Try widening the price range or clearing a few filters.
          </p>
        </div>
      )
    );
  }

  const gridClass =
    columns === "four"
      ? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
      : "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";

  return (
    <div className={gridClass}>
      {puppies.map((p) => (
        <PuppyCard key={p.id} puppy={p} />
      ))}
    </div>
  );
}
