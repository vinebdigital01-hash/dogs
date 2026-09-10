import React from "react";
import PawDecoration from "./PawDecoration.jsx";
import { GALLERY } from "../data/gallery.js";

const spanFor = (aspect) => {
  switch (aspect) {
    case "tall":
      return "row-span-2 aspect-[3/4]";
    case "wide":
      // Avoid breaking the 2-col mobile grid; expand only from md up
      return "col-span-1 aspect-[16/10] md:col-span-2";
    case "square":
    default:
      return "aspect-square";
  }
};

export default function Gallery() {
  return (
    <section className="relative py-20">
      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker">
            <PawDecoration className="h-3 w-3" /> Puppy gallery
          </span>
          <h2 className="mt-4 h-display text-brand-ink">
            Little Moments, Big Love
          </h2>
          <p className="mt-3 text-lg text-brand-charcoalSoft">
            A glimpse into daily life at Madhav Kennal — playful, warm and full
            of wagging tails.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:gap-5 md:grid-cols-4">
          {GALLERY.map((g, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-3xl shadow-card ring-1 ring-black/[0.04] ${spanFor(
                g.aspect
              )}`}
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <PawDecoration className="h-3 w-3" /> {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
