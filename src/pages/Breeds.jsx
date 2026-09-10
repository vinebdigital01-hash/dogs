import React from "react";
import BreedSection from "../components/BreedSection.jsx";
import CTASection from "../components/CTASection.jsx";
import PawDecoration from "../components/PawDecoration.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

export default function Breeds() {
  usePageTitle("Puppy Breeds | Madhav Kennal");
  return (
    <>
      <section className="relative bg-hero-gradient py-16">
        <div className="section text-center">
          <span className="kicker mx-auto">
            <PawDecoration className="h-3 w-3" /> All breeds
          </span>
          <h1 className="mt-4 h-display text-brand-ink">
            Popular Puppy Breeds At Madhav Kennal
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-brand-charcoalSoft">
            Explore our full catalogue of breeds — click any breed to see the
            puppies currently available for that breed.
          </p>
        </div>
      </section>
      <BreedSection />
      <CTASection />
    </>
  );
}
