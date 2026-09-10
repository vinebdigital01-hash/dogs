import React from "react";
import Hero from "../components/Hero.jsx";
import BreedSection from "../components/BreedSection.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import AboutSection from "../components/AboutSection.jsx";
import Gallery from "../components/Gallery.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FAQ from "../components/FAQ.jsx";
import CTASection from "../components/CTASection.jsx";
import FeaturedPuppies from "../components/FeaturedPuppies.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

export default function Home() {
  usePageTitle("Madhav Kennal | Find Your Perfect Puppy");
  return (
    <>
      <Hero />
      <BreedSection limit={8} />
      <FeaturedPuppies />
      <WhyChooseUs />
      <HowItWorks />
      <AboutSection />
      <Gallery />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
