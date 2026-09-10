import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Heart, ShieldCheck, Sparkles } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";

const TRUST = [
  { icon: Check, label: "Multiple Breeds" },
  { icon: Heart, label: "Loving Care" },
  { icon: ShieldCheck, label: "Puppy Guidance" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* Decorative paw prints */}
      <PawDecoration className="pointer-events-none absolute -left-6 top-16 h-16 w-16 rotate-[-18deg] text-brand-gold/25" />
      <PawDecoration className="pointer-events-none absolute right-[45%] top-8 hidden h-10 w-10 rotate-12 text-brand-teal/20 md:block" />
      <PawDecoration className="pointer-events-none absolute bottom-10 left-1/3 hidden h-12 w-12 rotate-[24deg] text-brand-coral/25 md:block" />

      <div className="section grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:py-24">
        {/* LEFT */}
        <div className="animate-fade-up">
          <span className="kicker">
            <PawDecoration className="h-3 w-3" /> Trusted Puppy Kennel
          </span>

          <h1 className="mt-6 text-balance font-display text-[clamp(2rem,8vw,4.75rem)] font-700 leading-[1.05] text-brand-ink">
            Find Your{" "}
            <span className="relative inline-block text-brand-teal">
              Perfect
              <svg
                aria-hidden="true"
                viewBox="0 0 220 20"
                className="absolute -bottom-2 left-0 h-3 w-full text-brand-gold"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 14 C 60 2, 150 2, 218 12"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            <br />
            Four-Legged Companion
          </h1>

          <p className="mt-6 max-w-xl text-base text-brand-charcoalSoft sm:text-lg">
            Discover adorable puppies from a wide range of popular breeds and
            find the perfect companion for your family — with warm care,
            transparent details and personal guidance.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link to="/puppies" className="btn-primary w-full sm:w-auto">
              Explore Puppies <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/breeds" className="btn-ghost w-full sm:w-auto">
              View All Breeds
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-brand-charcoal"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-teal text-white">
                  <Icon className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
              ].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                />
              ))}
            </div>
            <div className="text-xs text-brand-charcoalSoft">
              <p className="text-sm font-semibold text-brand-ink">
                500+ Happy Pet Families
              </p>
              <p>across Delhi NCR & beyond</p>
            </div>
          </div>
        </div>

        {/* RIGHT — composed image mosaic */}
        <div className="relative mx-auto w-full max-w-lg px-1 sm:px-0">
          <div className="relative mx-auto grid aspect-[1/1.05] max-w-lg grid-cols-6 grid-rows-6 gap-2.5 sm:gap-5">
            {/* Big photo */}
            <div className="relative col-span-4 row-span-4 min-h-0 overflow-hidden rounded-[1.5rem] shadow-pop ring-1 ring-black/[0.04] sm:rounded-[2.25rem]">
              <img
                src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=80"
                alt="Golden Retriever puppy sitting on grass"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-3 sm:p-5">
                <span className="badge bg-white/95 text-[10px] text-brand-teal sm:text-[11px]">
                  <PawDecoration className="h-3 w-3" /> Golden Retriever
                </span>
              </div>
            </div>

            {/* Two smaller photos */}
            <div className="relative col-span-2 row-span-2 min-h-0 overflow-hidden rounded-[1.1rem] shadow-card ring-1 ring-black/[0.04] sm:rounded-[1.75rem]">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80"
                alt="Labrador puppy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative col-span-2 row-span-2 min-h-0 overflow-hidden rounded-[1.1rem] shadow-card ring-1 ring-black/[0.04] sm:rounded-[1.75rem]">
              <img
                src="https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=800&q=80"
                alt="Shih Tzu puppy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative col-span-3 row-span-2 min-h-0 overflow-hidden rounded-[1.1rem] shadow-card ring-1 ring-black/[0.04] sm:rounded-[1.75rem]">
              <img
                src="https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80"
                alt="German Shepherd puppy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative col-span-3 row-span-2 min-h-0 overflow-hidden rounded-[1.1rem] shadow-card ring-1 ring-black/[0.04] sm:rounded-[1.75rem]">
              <img
                src="https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=800&q=80"
                alt="Pomeranian puppy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating cards */}
            <div className="pointer-events-none absolute -left-2 top-4 hidden animate-float-slow rounded-2xl bg-white p-3 pr-4 shadow-pop ring-1 ring-black/[0.04] sm:-left-4 sm:top-6 sm:flex">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-tealLight text-brand-teal">
                  <PawDecoration className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-teal">
                    Available now
                  </p>
                  <p className="text-sm font-semibold text-brand-ink">
                    Multiple Breeds
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-2 bottom-2 hidden animate-float-slower rounded-2xl bg-white p-3 pr-4 shadow-pop ring-1 ring-black/[0.04] sm:-right-3 sm:bottom-4 sm:flex">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-coral/15 text-brand-coral">
                  <Heart className="h-4 w-4" fill="currentColor" />
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-coralDark">
                    Loved
                  </p>
                  <p className="text-sm font-semibold text-brand-ink">
                    by Pet Families
                  </p>
                </div>
              </div>
            </div>

            {/* Sparkle */}
            <Sparkles className="pointer-events-none absolute -top-4 right-8 hidden h-6 w-6 text-brand-gold md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
