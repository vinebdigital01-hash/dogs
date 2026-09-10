import React from "react";
import { Link } from "react-router-dom";

export default function BreedCircle({ breed }) {
  return (
    <Link
      to={`/breed/${breed.slug}`}
      className="group flex w-[88px] flex-shrink-0 flex-col items-center gap-2 sm:w-[100px]"
    >
      <span className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-white shadow-soft transition duration-500 ease-out group-hover:scale-110 group-hover:ring-brand-gold group-hover:shadow-pop sm:h-24 sm:w-24">
        <img
          src={breed.thumb || breed.image}
          alt={breed.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-brand-teal/0 transition group-hover:bg-brand-teal/10" />
      </span>
      <span className="text-center text-xs font-semibold text-brand-ink transition group-hover:text-brand-teal">
        {breed.name}
      </span>
    </Link>
  );
}
