import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BreedCard from "./BreedCard.jsx";
import PawDecoration from "./PawDecoration.jsx";
import { BREEDS } from "../data/breeds.js";
import { PUPPIES } from "../data/puppies.js";

export default function BreedSection({ limit }) {
  const counts = useMemo(() => {
    const map = new Map();
    PUPPIES.forEach((p) => {
      if (p.availability === "Available") {
        map.set(p.breed, (map.get(p.breed) || 0) + 1);
      }
    });
    return map;
  }, []);

  const list = limit ? BREEDS.slice(0, limit) : BREEDS;

  return (
    <section className="relative py-12 sm:py-20">
      <div className="section">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="kicker">
              <PawDecoration className="h-3 w-3" /> Breed Categories
            </span>
            <h2 className="mt-4 h-display text-brand-ink">
              Explore Puppies By Breed
            </h2>
            <p className="mt-3 max-w-lg text-lg text-brand-charcoalSoft">
              Choose your preferred breed and discover available puppies ready
              to become a part of your family.
            </p>
          </div>
          <Link
            to="/breeds"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal transition hover:text-brand-tealDark"
          >
            View all breeds <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {list.map((breed) => (
            <BreedCard
              key={breed.slug}
              breed={breed}
              availableCount={counts.get(breed.name) || 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
