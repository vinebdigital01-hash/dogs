import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import BreedCircle from "../components/BreedCircle.jsx";
import PuppyGrid from "../components/PuppyGrid.jsx";
import LocationCard from "../components/LocationCard.jsx";
import BlogCard from "../components/BlogCard.jsx";
import FAQAccordion from "../components/FAQAccordion.jsx";
import TrustStrip from "../components/TrustStrip.jsx";
import Reveal from "../components/Reveal.jsx";
import AnimatedWords from "../components/AnimatedWords.jsx";
import { BREEDS } from "../data/breeds.js";
import { PUPPIES } from "../data/puppies.js";
import { CITIES_DATA } from "../data/cities.js";
import { BLOGS } from "../data/blogs.js";
import { FAQS } from "../data/faqs.js";
import { IMG } from "../data/images.js";
import usePageTitle from "../hooks/usePageTitle.js";

const TABS = [
  { id: "all", label: "Training" },
  { id: "small", label: "Small Sized" },
  { id: "medium", label: "Medium Sized" },
  { id: "large", label: "Large Sized" },
];

export default function Home() {
  usePageTitle("Madhav Kennal | Bring Your Puppy Friend Home");
  const [tab, setTab] = useState("all");

  const featured = useMemo(() => {
    const list = PUPPIES.filter((p) => p.availability === "Available");
    if (tab === "all") return list.slice(0, 8);
    return list.filter((p) => p.size === tab).slice(0, 8);
  }, [tab]);

  return (
    <>
      {/* Hero — marketplace style with real photo */}
      <section className="relative overflow-hidden bg-brand-ink">
        <div className="absolute inset-0">
          <img src={IMG.family} alt="" className="h-full w-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/70 to-brand-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/50 via-transparent to-brand-ink/20" />
        </div>
        <div className="section relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-flex animate-fade-up items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              Wide range of puppies
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,3.75rem)] font-extrabold leading-[1.15] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
              <AnimatedWords text="Bring Your Puppy Friend Home Today" delay={180} stagger={80} />
            </h1>
            <p className="mt-4 max-w-lg animate-fade-up text-base text-white/95 sm:text-lg [animation-delay:900ms]">
              Find a happy partner for you — healthy purebred puppies with clear details from Madhav Kennal.
            </p>
            <Link
              to="/puppies"
              className="btn-primary mt-8 group animate-scale-in [animation-delay:1100ms]"
            >
              Explore Puppies
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <Reveal variant="zoom" className="mx-auto w-full max-w-md overflow-hidden rounded-[2rem] shadow-pop ring-4 ring-white/30">
            <img src={IMG.lab[0]} alt="Happy puppy" className="aspect-[4/5] w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Find perfect pet — breed circles */}
      <section className="bg-white py-12 sm:py-16">
        <div className="section">
          <Reveal>
            <h2 className="text-center h-display text-3xl sm:text-4xl">Find Your Perfect Pet</h2>
          </Reveal>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar sm:flex-wrap sm:justify-center">
            {BREEDS.map((b, i) => (
              <Reveal key={b.slug} variant="zoom" delay={i * 40}>
                <BreedCircle breed={b} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Best puppies + size tabs */}
      <section className="bg-cream-wash py-12 sm:py-16">
        <div className="section">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="h-display text-3xl sm:text-4xl">Explore Our Best Puppies</h2>
            <Link to="/puppies" className="text-sm font-semibold text-brand-teal">
              Browse & Buy →
            </Link>
          </Reveal>
          <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === t.id
                    ? "bg-brand-teal text-white shadow-soft"
                    : "bg-white text-brand-charcoal ring-1 ring-brand-beige hover:ring-brand-teal/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <PuppyGrid puppies={featured} animated />
          </div>
        </div>
      </section>

      {/* Benefits — Own / List */}
      <section className="bg-white py-12 sm:py-16">
        <div className="section">
          <Reveal>
            <h2 className="text-center h-display text-3xl sm:text-4xl">All Madhav Kennal Benefits</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-brand-charcoalSoft">
              Whether you are bringing a puppy home or listing one with us, we keep the journey clear and supported.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Reveal variant="right">
              <div className="card-soft h-full p-6 sm:p-8">
                <h3 className="font-display text-2xl font-extrabold text-brand-ink">Own a Puppy</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    [ShieldCheck, "Healthy & Vaccinated Pets", "Vaccination notes shared clearly on every listing."],
                    [CheckCircle2, "Purebred Certification", "Breed clarity so you know what you are welcoming home."],
                    [Stethoscope, "Free Vet Assistance", "Early guidance support through your first months."],
                    [HeartHandshake, "Health Assurance", "Transparent health information before you decide."],
                  ].map(([Icon, title, desc]) => (
                    <li key={title} className="flex gap-3">
                      <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-brand-tealLight text-brand-teal">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-brand-ink">{title}</p>
                        <p className="text-sm text-brand-charcoalSoft">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal variant="left" delay={100}>
              <div className="card-soft h-full p-6 sm:p-8">
                <h3 className="font-display text-2xl font-extrabold text-brand-ink">List Your Puppy</h3>
                <ul className="mt-6 space-y-4 text-sm text-brand-charcoalSoft">
                  {[
                    ["Wide Reach & Visibility", "Reach families actively looking for their next companion."],
                    ["Dedicated Customer Support", "We help coordinate enquiries smoothly for both sides."],
                    ["Customizable Listings", "Share breed, age, health notes, photos and price clearly."],
                    ["Simple & Secure Process", "Structured enquiry flow from interest to confirmation."],
                    ["Increased Sales Potential", "Quality presentation helps serious buyers decide faster."],
                  ].map(([title, desc]) => (
                    <li key={title}>
                      <p className="font-semibold text-brand-ink">{title}</p>
                      <p>{desc}</p>
                    </li>
                  ))}
                </ul>
                <Link to="/sell" className="btn-primary mt-6">
                  List a Puppy
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-cream-wash py-12 sm:py-16">
        <div className="section">
          <Reveal>
            <h2 className="h-display text-center text-3xl sm:text-4xl">Explore Puppies by Location</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
            {CITIES_DATA.map((c, i) => (
              <Reveal key={c.slug} variant="up" delay={Math.min(i * 40, 320)}>
                <LocationCard city={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-white py-12 sm:py-16">
        <div className="section">
          <Reveal className="flex items-end justify-between gap-4">
            <h2 className="h-display text-3xl sm:text-4xl">From Our Blog</h2>
            <Link to="/blogs" className="text-sm font-semibold text-brand-teal">
              View all →
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BLOGS.slice(0, 9).map((p, i) => (
              <Reveal key={p.slug} variant="up" delay={i * 60}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-wash py-12 sm:py-16">
        <div className="section grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <Reveal variant="right">
            <h2 className="h-display text-3xl sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-brand-charcoalSoft">Quick answers before you enquire about a puppy.</p>
            <Link to="/faqs" className="btn-ghost mt-6">
              View all FAQs
            </Link>
          </Reveal>
          <Reveal variant="left" delay={80}>
            <FAQAccordion items={FAQS.slice(0, 5)} />
          </Reveal>
        </div>
      </section>

      {/* SEO / info block */}
      <section className="border-t border-brand-beige bg-white py-12 sm:py-16">
        <Reveal className="section max-w-4xl space-y-6 text-sm leading-relaxed text-brand-charcoalSoft">
          <h2 className="font-display text-2xl font-extrabold text-brand-ink">Why Choose Madhav Kennal</h2>
          <p>
            Madhav Kennal helps families across India discover healthy purebred puppies with clear information,
            personal WhatsApp guidance and support beyond the first day home.
          </p>
          <h3 className="font-display text-xl font-extrabold text-brand-ink">Popular Breed Price Ranges</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              ["Labrador", "₹10,000 – ₹45,000"],
              ["Beagle", "₹12,000 – ₹35,000"],
              ["Shih-Tzu", "₹15,000 – ₹40,000"],
              ["Golden Retriever", "₹18,000 – ₹55,000"],
              ["Pug", "₹8,000 – ₹28,000"],
              ["Siberian Husky", "₹25,000 – ₹65,000"],
            ].map(([breed, price]) => (
              <li key={breed} className="rounded-xl bg-brand-beige/60 px-4 py-3 font-medium text-brand-ink">
                {breed}: <span className="text-brand-teal">{price}</span>
              </li>
            ))}
          </ul>
          <p>
            Buying online is easier when listings include photos, health notes and responsive support.
            Delivery coordination and documentation guidance are part of a careful handover.
          </p>
          <p>
            Explore breed pages:{" "}
            {BREEDS.slice(0, 6).map((b, i) => (
              <span key={b.slug}>
                {i > 0 && ", "}
                <Link to={`/breed/${b.slug}`} className="font-semibold text-brand-teal hover:underline">
                  {b.name} price
                </Link>
              </span>
            ))}
            .
          </p>
        </Reveal>
      </section>

      <TrustStrip />
    </>
  );
}
