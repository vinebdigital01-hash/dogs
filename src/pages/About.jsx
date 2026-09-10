import React from "react";
import AboutSection from "../components/AboutSection.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Gallery from "../components/Gallery.jsx";
import Testimonials from "../components/Testimonials.jsx";
import CTASection from "../components/CTASection.jsx";
import PawDecoration from "../components/PawDecoration.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

export default function About() {
  usePageTitle("About Us | Madhav Kennal");
  return (
    <>
      <section className="relative bg-hero-gradient py-16">
        <div className="section text-center">
          <span className="kicker mx-auto">
            <PawDecoration className="h-3 w-3" /> Our story
          </span>
          <h1 className="mt-4 h-display text-brand-ink">
            A Home Built On Love For Puppies
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-brand-charcoalSoft">
            Madhav Kennal is a trusted kennel dealing in all popular breeds —
            with a promise of honest information, warm care and thoughtful
            guidance for every family.
          </p>
        </div>
      </section>
      <AboutSection />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <CTASection />
    </>
  );
}
