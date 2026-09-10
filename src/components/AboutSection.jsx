import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";
import { BRAND } from "../config/config.js";

const POINTS = [
  {
    title: "About Madhav Kennal",
    desc: "A trusted kennel with years of experience raising happy, healthy puppies across all popular breeds.",
  },
  {
    title: "Our Approach",
    desc: "Ethical care, honest information and personal guidance for every family that walks through our doors.",
  },
  {
    title: "Our Support",
    desc: "We stay in touch long after your puppy comes home — for tips, questions and anything you need.",
  },
];

export default function AboutSection() {
  return (
    <section className="relative py-20">
      <div className="section grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Image collage */}
        <div className="relative">
          <div className="relative aspect-[5/6] overflow-hidden rounded-[2.5rem] shadow-pop ring-1 ring-black/[0.04]">
            <img
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80"
              alt="Family cuddling with their new puppy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden aspect-[4/5] w-40 overflow-hidden rounded-3xl shadow-pop ring-4 ring-white sm:block">
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80"
              alt="Puppy portrait"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -left-4 top-6 flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-pop ring-1 ring-black/[0.04]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gold/20 text-brand-goldDark">
              <PawDecoration className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-goldDark">
                Since {BRAND.established}
              </p>
              <p className="text-sm font-semibold text-brand-ink">
                Trusted by 500+ families
              </p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <span className="kicker">
            <PawDecoration className="h-3 w-3" /> About us
          </span>
          <h2 className="mt-4 h-display text-brand-ink">
            More Than A Puppy.
            <br />
            <span className="text-brand-teal">A New Family Member.</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg text-brand-charcoalSoft">
            At Madhav Kennal, we believe bringing a puppy home is the beginning
            of a beautiful relationship. Our goal is to help families discover
            loving companions and make their puppy journey simple and
            comfortable.
          </p>

          <ul className="mt-8 space-y-5">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-4">
                <CheckCircle2
                  className="mt-0.5 h-6 w-6 flex-shrink-0 text-brand-teal"
                  strokeWidth={2}
                />
                <div>
                  <p className="font-display text-lg font-700 text-brand-ink">
                    {p.title}
                  </p>
                  <p className="mt-1 text-sm text-brand-charcoalSoft">
                    {p.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/puppies" className="btn-primary">
              Explore Puppies
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
