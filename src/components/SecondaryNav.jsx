import React from "react";
import { Link } from "react-router-dom";

const LINKS = [
  { to: "/about-us", label: "About Us" },
  { to: "/buying-pet", label: "Buying a Puppy" },
  { to: "/selling-pet", label: "Selling a Puppy" },
];

export default function SecondaryNav() {
  return (
    <div className="hidden border-b border-brand-beige bg-white md:block">
      <div className="section flex items-center gap-6 py-2 text-xs font-medium text-brand-charcoalSoft">
        {LINKS.map((l) => (
          <Link key={l.to} to={l.to} className="hover:text-brand-teal">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
