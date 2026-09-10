import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion({ items = [], allowMultiple = false }) {
  const [open, setOpen] = useState(allowMultiple ? [] : 0);

  const isOpen = (i) => (allowMultiple ? open.includes(i) : open === i);

  const toggle = (i) => {
    if (allowMultiple) {
      setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
    } else {
      setOpen((prev) => (prev === i ? -1 : i));
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={item.q + i}
          className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ease-out ${
            isOpen(i)
              ? "border-brand-teal shadow-card scale-[1.01]"
              : "border-brand-beige hover:border-brand-teal/40"
          }`}
        >
          <button
            type="button"
            onClick={() => toggle(i)}
            className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
            aria-expanded={isOpen(i)}
          >
            <span className="font-display text-sm font-extrabold text-brand-ink sm:text-base">
              {item.q}
            </span>
            <span
              className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full transition duration-300 ${
                isOpen(i) ? "rotate-180 bg-brand-teal text-white" : "bg-brand-cream text-brand-teal"
              }`}
            >
              <ChevronDown className="h-4 w-4" />
            </span>
          </button>
          <div
            className={`grid transition-all duration-300 ease-out ${
              isOpen(i) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-4 pb-5 text-sm leading-relaxed text-brand-charcoalSoft sm:px-5">
                {item.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
