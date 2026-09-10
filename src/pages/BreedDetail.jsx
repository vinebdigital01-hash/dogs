import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Home, PawPrint, Scale, Smile } from "lucide-react";
import FAQAccordion from "../components/FAQAccordion.jsx";
import TrustStrip from "../components/TrustStrip.jsx";
import { getBreedBySlug, BREEDS } from "../data/breeds.js";
import { breedImages } from "../data/images.js";
import usePageTitle from "../hooks/usePageTitle.js";

const ANCHORS = [
  { id: "price", label: "Price Range" },
  { id: "expenses", label: "Monthly Expenses" },
  { id: "facts", label: "Quick Facts" },
  { id: "faqs", label: "FAQs" },
];

export default function BreedDetail() {
  const { breedName } = useParams();
  const breed = getBreedBySlug(breedName);
  const [priceTab, setPriceTab] = useState("city");

  usePageTitle(breed ? `${breed.name} Breed Guide | Madhav Kennal` : "Breed | Madhav Kennal");

  if (!breed) {
    return (
      <section className="section py-24 text-center">
        <h1 className="h-display">Breed not found</h1>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {BREEDS.slice(0, 8).map((b) => (
            <Link key={b.slug} to={`/breed/${b.slug}`} className="btn-ghost !py-2">
              {b.name}
            </Link>
          ))}
        </div>
      </section>
    );
  }

  const monthlyTotal = [
    breed.monthlyExpenses.food[0] + breed.monthlyExpenses.grooming[0] + breed.monthlyExpenses.vet[0],
    breed.monthlyExpenses.food[1] + breed.monthlyExpenses.grooming[1] + breed.monthlyExpenses.vet[1],
  ];

  return (
    <>
      <section className="page-banner">
        <div className="section">
          <h1 className="font-display text-3xl font-extrabold sm:text-5xl">Everything About {breed.name}</h1>
          <p className="mt-3 max-w-2xl text-white/90">{breed.intro}</p>
        </div>
      </section>

      <div className="sticky top-0 z-20 border-b border-brand-beige bg-white/95 backdrop-blur">
        <div className="section flex gap-4 overflow-x-auto py-3 text-sm font-semibold no-scrollbar">
          {ANCHORS.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="whitespace-nowrap text-brand-charcoalSoft hover:text-brand-teal">
              {a.label}
            </a>
          ))}
        </div>
      </div>

      <section className="section py-10">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {breedImages(breed.name, 4).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${breed.name} ${i + 1}`}
              className="h-40 w-56 flex-shrink-0 rounded-2xl object-cover sm:h-52 sm:w-72"
            />
          ))}
        </div>

        <div id="price" className="mt-12 scroll-mt-24 card-soft p-6 sm:p-8">
          <h2 className="font-display text-2xl font-extrabold">Price Range</h2>
          <p className="mt-3 font-display text-4xl font-extrabold text-brand-teal">
            ₹{breed.priceRange.min.toLocaleString("en-IN")} – ₹{breed.priceRange.max.toLocaleString("en-IN")}
          </p>
          <p className="mt-2 text-sm text-brand-charcoalSoft">Based on city, lineage and quality</p>
          <Link to={`/puppies/breed/${breed.slug}`} className="btn-primary mt-6">
            View {breed.name} Puppies
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              ["city", "Price by City"],
              ["gender", "by Gender"],
              ["color", "by Color"],
              ["quality", "by Quality"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPriceTab(id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  priceTab === id ? "bg-brand-teal text-white" : "bg-brand-cream"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {priceTab === "city" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {breed.cityPrices.map((c) => (
                <div key={c.city} className="rounded-2xl bg-brand-cream p-4">
                  <p className="font-semibold text-brand-ink">{c.city}</p>
                  <p className="mt-1 text-sm text-brand-teal">
                    From ₹{c.from.toLocaleString("en-IN")} · To ₹{c.to.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          )}
          {priceTab !== "city" && (
            <p className="mt-6 text-sm text-brand-charcoalSoft">
              {priceTab === "gender" && "Male and female pricing can vary slightly by demand and lineage — enquire for current options."}
              {priceTab === "color" && "Coat colour preferences may influence availability more than base price."}
              {priceTab === "quality" && "Show-quality and KCI-registered puppies typically sit toward the higher end of the range."}
            </p>
          )}
        </div>

        <div id="expenses" className="mt-12 scroll-mt-24">
          <h2 className="font-display text-2xl font-extrabold">Monthly Expenses</h2>
          <p className="mt-2 text-brand-charcoalSoft">
            Typical care budget: ₹{monthlyTotal[0].toLocaleString("en-IN")} – ₹{monthlyTotal[1].toLocaleString("en-IN")} / month
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["Food Costs", breed.monthlyExpenses.food],
              ["Grooming", breed.monthlyExpenses.grooming],
              ["Vet Checkups", breed.monthlyExpenses.vet],
            ].map(([label, range]) => (
              <div key={label} className="card-soft p-5">
                <p className="font-semibold text-brand-ink">{label}</p>
                <p className="mt-2 text-brand-teal">
                  ₹{range[0].toLocaleString("en-IN")} – ₹{range[1].toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="facts" className="mt-12 scroll-mt-24 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Quick Facts</h2>
            <h3 className="mt-6 font-semibold text-brand-ink">History and Origin</h3>
            <p className="mt-2 text-sm text-brand-charcoalSoft leading-relaxed">
              {breed.name} dogs have a rich working and companion history. Early beginnings focused on
              utility and temperament; later refinement shaped the friendly family companion many
              Indian homes love today. Cultural significance remains strong wherever people seek loyal,
              trainable pets.
            </p>
            <h3 className="mt-6 font-semibold text-brand-ink">Popularity in India</h3>
            <ul className="mt-2 space-y-2 text-sm text-brand-charcoalSoft">
              <li><strong className="text-brand-ink">Family-Friendly</strong> — suited to warm, engaged homes.</li>
              <li><strong className="text-brand-ink">Versatile Use</strong> — companionship first, with training potential.</li>
              <li><strong className="text-brand-ink">Adaptability</strong> — thrives with routine, exercise and care.</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              [Smile, "Lifespan", breed.lifespan],
              [PawPrint, "Size", breed.sizeLabel],
              [Scale, "Weight", breed.weight],
              [Home, "Temperament", breed.temperament],
            ].map(([Icon, label, value]) => (
              <div key={label} className="card-soft p-4">
                <Icon className="h-5 w-5 text-brand-teal" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-charcoalSoft">{label}</p>
                <p className="mt-1 text-sm font-semibold text-brand-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl font-extrabold">How Much Friendly?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["Families with Kids", breed.friendliness.kids],
              ["Other Pets", breed.friendliness.pets],
              ["Apartment Living", breed.friendliness.apartment],
            ].map(([title, desc]) => (
              <div key={title} className="card-soft p-5">
                <p className="font-semibold text-brand-ink">{title}</p>
                <p className="mt-2 text-sm text-brand-charcoalSoft">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="faqs" className="mt-12 scroll-mt-24">
          <h2 className="mb-6 font-display text-2xl font-extrabold">{breed.name} FAQs</h2>
          <FAQAccordion items={(breed.faqs || []).map((f, i) => ({ id: i, q: f.q, a: f.a }))} />
        </div>

        <div className="mt-12 text-center">
          <Link to={`/puppies/breed/${breed.slug}`} className="btn-primary">
            View all {breed.name} Puppies available
          </Link>
        </div>
      </section>

      <TrustStrip />
    </>
  );
}
