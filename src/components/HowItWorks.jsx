import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, MessageCircle, PawPrint, Search } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";

const STEPS = [
  {
    icon: PawPrint,
    title: "Choose Your Breed",
    desc: "Browse our full range of puppy breeds and pick your favourite.",
  },
  {
    icon: Search,
    title: "Find Your Puppy",
    desc: "Filter by breed, age, gender and budget to find the perfect match.",
  },
  {
    icon: MessageCircle,
    title: "Send Your Enquiry",
    desc: "Send a WhatsApp enquiry with one tap — we reply personally.",
  },
  {
    icon: Home,
    title: "Welcome Your Companion",
    desc: "Visit us or arrange delivery and welcome your new family member home.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20">
      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker">
            <PawDecoration className="h-3 w-3" /> How it works
          </span>
          <h2 className="mt-4 h-display text-brand-ink">
            Bringing Home a Puppy, Made Simple
          </h2>
          <p className="mt-3 text-lg text-brand-charcoalSoft">
            Four gentle steps between you and your new best friend.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-white to-brand-cream p-7 shadow-card ring-1 ring-black/[0.03]"
            >
              <span className="absolute right-4 top-4 font-display text-6xl font-700 text-brand-teal/10">
                0{i + 1}
              </span>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-teal text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-700 text-brand-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoalSoft">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/puppies" className="btn-primary">
            Start Browsing Puppies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
