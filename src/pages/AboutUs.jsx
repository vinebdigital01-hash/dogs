import React from "react";
import { Link } from "react-router-dom";
import { HeartHandshake, ShieldCheck, Stethoscope, Users } from "lucide-react";
import TrustStrip from "../components/TrustStrip.jsx";
import { IMG } from "../data/images.js";
import usePageTitle from "../hooks/usePageTitle.js";

const WHY = [
  {
    icon: ShieldCheck,
    title: "Purebred clarity",
    text: "Breed details shared plainly so families know what they are welcoming home.",
  },
  {
    icon: Users,
    title: "Home-first matching",
    text: "We talk through space, routine and energy — not just photos and price.",
  },
  {
    icon: Stethoscope,
    title: "Health transparency",
    text: "Vaccination and care notes are part of every serious conversation.",
  },
  {
    icon: HeartHandshake,
    title: "Support after arrival",
    text: "Early guidance for settling in, feeding rhythm and first weeks together.",
  },
];

export default function AboutUs() {
  usePageTitle("About Us | Madhav Kennal");

  return (
    <>
      <section className="relative min-h-[42vh] overflow-hidden">
        <img src={IMG.family} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brand-ink/65" />
        <div className="section relative flex min-h-[42vh] flex-col justify-end pb-12 pt-24">
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">About Madhav Kennal</h1>
          <p className="mt-3 max-w-xl text-white/90">
            A family-facing kennel helping people across India find healthy purebred puppies — with patience and clarity.
          </p>
        </div>
      </section>

      <section className="section py-12 sm:py-16">
        <h2 className="h-display text-center text-3xl">What we stand for</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {WHY.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-soft p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tealLight text-brand-teal">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-extrabold">{title}</h3>
              <p className="mt-2 text-sm text-brand-charcoalSoft leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <img src={IMG.lab[1]} alt="Labrador at Madhav Kennal" className="h-full min-h-[320px] w-full object-cover" />
        <div className="flex flex-col justify-center bg-cream-wash px-8 py-12 sm:px-12">
          <h2 className="font-display text-3xl font-extrabold">Our mission</h2>
          <p className="mt-4 text-brand-charcoalSoft leading-relaxed">
            Make finding a puppy feel warm and trustworthy. Clear listings, honest advice, and support that continues
            after the first day home.
          </p>
          <Link to="/puppies" className="btn-primary mt-6 w-fit">Explore puppies</Link>
        </div>
      </section>

      <section className="section grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-extrabold">How we work</h2>
          <p className="mt-4 text-brand-charcoalSoft leading-relaxed">
            Families usually move from breed shortlist → health review → confirmation → travel planning → follow-up.
            Each step is conversational — we prefer questions over pressure.
          </p>
        </div>
        <img src={IMG.golden[2]} alt="Golden Retriever puppy" className="rounded-3xl shadow-card" />
      </section>

      <section className="bg-brand-beige/50 py-12 sm:py-16">
        <div className="section grid items-center gap-8 lg:grid-cols-2">
          <img src={IMG.beagle[1]} alt="Beagle puppy" className="rounded-3xl shadow-card" />
          <div>
            <h2 className="font-display text-3xl font-extrabold">Our promise</h2>
            <p className="mt-4 text-brand-charcoalSoft leading-relaxed">
              Health transparency, breed clarity, and ongoing support. If something is unclear, ask —
              we would rather slow down than surprise you.
            </p>
          </div>
        </div>
      </section>

      <TrustStrip />
    </>
  );
}
