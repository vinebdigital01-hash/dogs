import React from "react";
import { HandHeart, Heart, PawPrint, ShieldCheck } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";

const ITEMS = [
  {
    icon: PawPrint,
    color: "bg-brand-tealLight text-brand-teal",
    title: "Wide Range of Breeds",
    desc: "Explore puppies from many popular breeds — all under one trusted kennel.",
  },
  {
    icon: Heart,
    color: "bg-brand-coral/15 text-brand-coralDark",
    title: "Loving Care",
    desc: "Every puppy deserves care, attention and a warm, loving environment.",
  },
  {
    icon: ShieldCheck,
    color: "bg-brand-gold/20 text-brand-goldDark",
    title: "Guidance",
    desc: "Get honest guidance while choosing the right puppy for your family.",
  },
  {
    icon: HandHeart,
    color: "bg-brand-beige text-brand-tealDark",
    title: "Support",
    desc: "We're here to support you through every step of your puppy journey.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-brand-cream/60 py-20">
      <PawDecoration className="pointer-events-none absolute right-8 top-8 h-16 w-16 rotate-12 text-brand-teal/10" />
      <PawDecoration className="pointer-events-none absolute bottom-8 left-8 h-12 w-12 -rotate-12 text-brand-gold/20" />

      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker">
            <PawDecoration className="h-3 w-3" /> Why choose us
          </span>
          <h2 className="mt-4 h-display text-brand-ink">
            Why Families Choose Madhav Kennal
          </h2>
          <p className="mt-3 text-lg text-brand-charcoalSoft">
            Everything we do is designed around one goal — helping families and
            puppies find each other with confidence.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, desc, color }) => (
            <article
              key={title}
              className="group rounded-4xl bg-white p-7 shadow-card ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-pop"
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl ${color} transition-transform duration-300 group-hover:rotate-[-6deg]`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-700 text-brand-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoalSoft">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
