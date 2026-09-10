import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";
import PuppyGrid from "./PuppyGrid.jsx";
import { PUPPIES } from "../data/puppies.js";

export default function FeaturedPuppies() {
  const featured = useMemo(
    () =>
      PUPPIES.filter((p) => p.availability === "Available")
        .slice()
        .sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn))
        .slice(0, 4),
    []
  );

  return (
    <section className="relative py-20">
      <div className="section">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="kicker">
              <PawDecoration className="h-3 w-3" /> Newly listed
            </span>
            <h2 className="mt-4 h-display text-brand-ink">Available Puppies</h2>
            <p className="mt-3 max-w-lg text-lg text-brand-charcoalSoft">
              Find a loving companion that's right for you — every listing is
              hand-updated with the latest details.
            </p>
          </div>
          <Link
            to="/puppies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal transition hover:text-brand-tealDark"
          >
            View all puppies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <PuppyGrid puppies={featured} columns="four" />
      </div>
    </section>
  );
}
