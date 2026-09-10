import React from "react";
import { TESTIMONIALS } from "../data/faqs.js";

export default function TestimonialStrip() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className="overflow-hidden border-y border-brand-beige bg-white py-4">
      <div className="flex w-max animate-marquee gap-4">
        {loop.map((t, i) => (
          <div
            key={`${t.id}-${i}`}
            className="w-[280px] flex-shrink-0 rounded-2xl bg-brand-cream px-4 py-3 ring-1 ring-brand-beige sm:w-[320px]"
          >
            <p className="text-sm text-brand-charcoalSoft">“{t.text}”</p>
            <p className="mt-2 text-xs font-semibold text-brand-teal">
              {t.name} · {t.breed}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
