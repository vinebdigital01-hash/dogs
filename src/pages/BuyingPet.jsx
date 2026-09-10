import React from "react";
import TrustStrip from "../components/TrustStrip.jsx";
import { IMG } from "../data/images.js";
import usePageTitle from "../hooks/usePageTitle.js";

const STEPS = [
  {
    n: 1,
    title: "Browse with real photos",
    text: "Open listings for breed, age, health notes and pricing — then shortlist what fits your home.",
    image: IMG.lab[0],
  },
  {
    n: 2,
    title: "Ask us anything",
    text: "Use Ask About Me or WhatsApp. We help with temperament, size and everyday care expectations.",
    image: IMG.golden[0],
  },
  {
    n: 3,
    title: "Confirm when you’re ready",
    text: "We walk through details and share simple prep notes for the first days at home.",
    image: IMG.beagle[0],
  },
  {
    n: 4,
    title: "Welcome home carefully",
    text: "Travel is planned for comfort. Metro pickup can be arranged when it suits the schedule.",
    image: IMG.family,
  },
];

export default function BuyingPet() {
  usePageTitle("How to Buy a Puppy | Madhav Kennal");

  return (
    <>
      <section className="relative overflow-hidden">
        <img src={IMG.gsd[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brand-ink/70" />
        <div className="section relative py-16 sm:py-20">
          <h1 className="font-display text-4xl font-extrabold text-white">How to buy a puppy</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Four calm steps — browse, ask, confirm, and welcome home with Madhav Kennal.
          </p>
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
