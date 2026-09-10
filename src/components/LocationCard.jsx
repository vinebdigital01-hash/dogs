import React from "react";
import { Link } from "react-router-dom";

export default function LocationCard({ city }) {
  return (
    <Link
      to={`/puppies/city/${city.slug}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-pop"
    >
      <img
        src={city.image}
        alt={city.name}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition group-hover:from-black/80" />
      <p className="absolute bottom-3 left-3 font-display text-lg font-extrabold text-white transition duration-300 group-hover:translate-x-1">
        {city.name}
      </p>
    </Link>
  );
}
