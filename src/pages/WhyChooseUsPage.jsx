import React from "react";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FAQ from "../components/FAQ.jsx";
import CTASection from "../components/CTASection.jsx";
import PawDecoration from "../components/PawDecoration.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

export default function WhyChooseUsPage() {
  usePageTitle("Why Choose Us | Madhav Kennal");
  return (
    <>
      <section className="relative bg-hero-gradient py-16">
        <div className="section text-center">
          <span className="kicker mx-auto">
            <PawDecoration className="h-3 w-3" /> Why choose us
          </span>
          <h1 className="mt-4 h-display text-brand-ink">
            Reasons Families Trust Madhav Kennal
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-brand-charcoalSoft">
            From breed variety to lifelong support — here's what makes bringing
            home a puppy with us a warm, thoughtful experience.
          </p>
        </div>
      </section>
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
