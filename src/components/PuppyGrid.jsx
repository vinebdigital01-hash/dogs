import React from "react";
import { PawPrint } from "lucide-react";
import PuppyCard from "./PuppyCard.jsx";

export default function PuppyGrid({ puppies, animated = false, emptyMessage }) {
  if (!puppies?.length) {
    return (
      <div className="rounded-3xl bg-brand-beige/60 p-10 text-center animate-fade-up">
        <PawPrint className="mx-auto h-8 w-8 text-brand-teal animate-wiggle" />
        <p className="mt-3 font-display text-xl font-extrabold">No puppies found</p>
        <p className="mt-1 text-sm text-brand-charcoalSoft">
          {emptyMessage || "Try adjusting filters."}
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
      {puppies.map((p, i) => (
        <PuppyCard key={p.id} puppy={p} index={i} animated={animated} />
      ))}
    </div>
  );
}
