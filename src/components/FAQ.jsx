import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";
import { FAQS } from "../data/faqs.js";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-20">
      <div className="section grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="kicker">
            <PawDecoration className="h-3 w-3" /> FAQs
          </span>
          <h2 className="mt-4 h-display text-brand-ink">
            Questions? We've Got You.
          </h2>
          <p className="mt-4 max-w-md text-lg text-brand-charcoalSoft">
            Everything you might want to know before bringing home your new
            puppy. Still need help? Reach out on WhatsApp.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-3xl border transition ${
                  isOpen
                    ? "border-brand-teal bg-white shadow-card"
                    : "border-brand-cream bg-white/70 hover:border-brand-teal/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="font-display text-base font-700 text-brand-ink sm:text-lg">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full transition ${
                      isOpen
                        ? "bg-brand-teal text-white rotate-180"
                        : "bg-brand-tealLight text-brand-teal"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 text-sm leading-relaxed text-brand-charcoalSoft sm:px-6">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
