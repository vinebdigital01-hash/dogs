import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function PuppyCard({ puppy, index = 0, animated = false }) {
  const card = (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.04] transition duration-500 ease-out hover:-translate-y-2 hover:shadow-pop sm:rounded-3xl">
      <Link to={`/puppy/${puppy.id}`} className="relative aspect-[4/5] overflow-hidden bg-brand-beige">
        <img
          src={puppy.images[0]}
          alt={`${puppy.name} ${puppy.breed}`}
          loading="lazy"
          className="img-zoom h-full w-full object-cover"
        />
        <span
          className={`badge absolute left-3 top-3 transition duration-300 group-hover:scale-105 ${
            puppy.availability === "Available" ? "badge-available" : "badge-reserved"
          }`}
        >
          {puppy.availability}
        </span>
        <span className="absolute bottom-3 right-3 translate-y-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-brand-teal opacity-95 shadow-soft transition duration-300 group-hover:translate-y-0 group-hover:scale-105">
          ₹{puppy.price.toLocaleString("en-IN")}
        </span>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-extrabold text-brand-ink transition group-hover:text-brand-teal">
          <Link to={`/puppy/${puppy.id}`}>{puppy.name}</Link>
          <span className="block text-sm font-semibold text-brand-teal">{puppy.breed}</span>
        </h3>
        <p className="mt-2 text-xs capitalize text-brand-charcoalSoft">
          {puppy.gender} · {puppy.age}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(puppy.badges || []).slice(0, 3).map((b) => (
            <span key={b} className="badge badge-cert">{b}</span>
          ))}
        </div>
        <div className="mt-auto flex gap-2 pt-4">
          <Link to={`/puppy/${puppy.id}`} className="btn-ghost !px-3 !py-2.5 flex-1 !text-[11px]">
            View
          </Link>
          <Link to={`/puppy/${puppy.id}?enquire=1`} className="btn-primary !px-3 !py-2.5 flex-1 !text-[11px]">
            <MessageCircle className="h-3.5 w-3.5" /> Ask
          </Link>
        </div>
      </div>
    </article>
  );

  if (!animated) return card;
  return (
    <Reveal variant="up" delay={Math.min(index * 80, 480)} className="h-full">
      {card}
    </Reveal>
  );
}
