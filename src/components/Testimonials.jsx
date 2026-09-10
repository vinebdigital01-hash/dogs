import React from "react";
import { Star, Quote } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";
import { TESTIMONIALS } from "../data/testimonials.js";

export default function Testimonials() {
  return (
    <section className="relative bg-brand-tealLight/50 py-20">
      <PawDecoration className="pointer-events-none absolute right-10 top-10 h-12 w-12 rotate-12 text-brand-teal/15" />
      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker">
            <PawDecoration className="h-3 w-3" /> Testimonials
          </span>
          <h2 className="mt-4 h-display text-brand-ink">
            Loved By Pet Parents{" "}
            <span className="text-brand-coral">❤️</span>
          </h2>
          <p className="mt-3 text-lg text-brand-charcoalSoft">
            Real words from families who found their forever puppy with us.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="relative flex h-full flex-col rounded-3xl bg-white p-5 shadow-card ring-1 ring-black/[0.03] transition hover:-translate-y-1 hover:shadow-pop sm:rounded-4xl sm:p-6"
            >
              <Quote className="h-8 w-8 text-brand-gold" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-charcoalSoft">
                “{t.review}”
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-brand-cream pt-5">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-tealLight"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-brand-ink">
                    {t.name}
                  </p>
                  <p className="text-xs text-brand-charcoalSoft">
                    {t.location} · {t.breed}
                  </p>
                </div>
                <div className="flex items-center gap-0.5 text-brand-gold">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
