import React from "react";
import { Link } from "react-router-dom";
import TrustStrip from "../components/TrustStrip.jsx";
import { IMG } from "../data/images.js";
import usePageTitle from "../hooks/usePageTitle.js";

const STEPS = [
  {
    n: 1,
    title: "Share your puppy details",
    text: "Photos, breed, age, health notes and asking price — submitted for Madhav Kennal review.",
    image: IMG.pom[0],
  },
  {
    n: 2,
    title: "Families show interest",
    text: "Serious enquiries come through us so conversations stay organised.",
    image: IMG.shihtzu[0],
  },
  {
    n: 3,
    title: "We help coordinate",
    text: "Verification and confirmation steps are guided so both sides stay clear.",
    image: IMG.pug[0],
  },
  {
    n: 4,
    title: "Handover planning",
    text: "Trusted travel partners can help with pickup when a listing is confirmed.",
    image: IMG.rottie[0],
  },
];

export default function SellingPet() {
  usePageTitle("How to Sell a Puppy | Madhav Kennal");

  return (
    <>
      <section className="relative overflow-hidden">
        <img src={IMG.frenchie[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brand-ink/70" />
        <div className="section relative py-16 sm:py-20">
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">List a puppy with us</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            A clear path for responsible sellers — review, interest, coordination, handover.
          </p>
          <Link to="/sell" className="btn-gold mt-6">Start listing</Link>
        </div>
      </section>

      <section className="section space-y-12 py-12 sm:py-16">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
          >
            <img src={s.image} alt={s.title} className="rounded-3xl shadow-card object-cover aspect-[4/3] w-full" />
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-teal text-lg font-extrabold text-white">
                {s.n}
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">{s.title}</h2>
              <p className="mt-3 text-brand-charcoalSoft leading-relaxed">{s.text}</p>
            </div>
          </div>
        ))}
      </section>

      <TrustStrip />
    </>
  );
}
