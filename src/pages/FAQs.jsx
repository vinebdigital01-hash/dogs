import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FAQAccordion from "../components/FAQAccordion.jsx";
import TrustStrip from "../components/TrustStrip.jsx";
import { FAQS, FAQ_CATEGORIES } from "../data/faqs.js";
import { IMG } from "../data/images.js";
import { OWNER_PHONE_NUMBER } from "../config/config.js";
import usePageTitle from "../hooks/usePageTitle.js";

const CATEGORY_CARDS = [
  {
    title: "Dog Care",
    desc: "Daily routines, training basics and settling tips.",
    image: IMG.sleep,
    category: "Dog Care",
  },
  {
    title: "Dog Food",
    desc: "Feeding guidance for growing puppies.",
    image: IMG.beagle[1],
    category: "Dog Food",
  },
  {
    title: "Puppy Buying",
    desc: "Pricing, delivery and what to expect when you enquire.",
    image: IMG.lab[2],
    category: "Puppy Buying",
  },
];

export default function FAQsPage() {
  usePageTitle("FAQs | Madhav Kennal");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    return FAQS.filter((f) => {
      if (cat !== "All" && f.category !== cat) return false;
      if (!q.trim()) return true;
      const hay = `${f.q} ${f.a}`.toLowerCase();
      return hay.includes(q.trim().toLowerCase());
    });
  }, [q, cat]);

  return (
    <>
      <section className="relative overflow-hidden">
        <img src={IMG.cocker[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brand-ink/70" />
        <div className="section relative max-w-3xl py-16 sm:py-20">
          <h1 className="font-display text-4xl font-extrabold text-white">Madhav Kennal FAQs</h1>
          <p className="mt-3 text-white/90">
            Answers about puppies, care, pricing and working with our team
          </p>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search FAQs..."
            className="mt-6 w-full rounded-2xl border-0 px-5 py-3.5 text-brand-ink outline-none"
          />
        </div>
      </section>

      <section className="section py-10 sm:py-14">
        <div className="flex flex-wrap gap-2">
          {FAQ_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                cat === c ? "bg-brand-teal text-white" : "bg-white ring-1 ring-brand-beige"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <FAQAccordion items={filtered} allowMultiple />
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-extrabold">Browse by topic</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {CATEGORY_CARDS.map((c) => (
              <button
                key={c.title}
                type="button"
                onClick={() => {
                  setCat(c.category);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="card-soft overflow-hidden text-left transition hover:-translate-y-1"
              >
                <img src={c.image} alt={c.title} className="aspect-[3/2] w-full object-cover" />
                <div className="p-4">
                  <p className="font-display text-lg font-extrabold">{c.title}</p>
                  <p className="mt-1 text-sm text-brand-charcoalSoft">{c.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl">
          <div className="relative px-8 py-12 text-center text-white sm:px-12">
            <img src={IMG.dobe[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-brand-ink/75" />
            <div className="relative">
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Still have a question?</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/90">
                Call {OWNER_PHONE_NUMBER} or message us on WhatsApp — we reply the same day in working hours.
              </p>
              <Link to="/puppies" className="btn-gold mt-6">
                Browse puppies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />
    </>
  );
}
