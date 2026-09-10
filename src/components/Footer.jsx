import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";
import { BRAND, SOCIALS } from "../config/config.js";

export default function Footer() {
  return (
    <footer className="border-t border-brand-beige bg-white text-brand-charcoal">
      <div className="section grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-teal text-white">
              <PawDecoration className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-xl font-extrabold text-brand-ink">{BRAND.name}</p>
              <p className="text-xs text-brand-charcoalSoft">{BRAND.tagline}</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            {[
              [SOCIALS.instagram, Instagram, "Instagram"],
              [SOCIALS.facebook, Facebook, "Facebook"],
              [SOCIALS.youtube, Youtube, "YouTube"],
            ].map(([href, Icon, label]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-brand-tealLight text-brand-teal transition hover:bg-brand-teal hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-teal">Shop by Breed</h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-charcoalSoft">
            {["labrador", "german-shepherd", "golden-retriever", "shih-tzu", "siberian-husky"].map((slug) => (
              <li key={slug}>
                <Link to={`/breed/${slug}`} className="capitalize hover:text-brand-teal">
                  {slug.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-teal">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-charcoalSoft">
            {[
              ["About Us", "/about-us"],
              ["FAQs", "/faqs"],
              ["Blogs", "/blogs"],
              ["How to Sell?", "/selling-pet"],
              ["How to Buy?", "/buying-pet"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-brand-teal">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-teal">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-charcoalSoft">
            <li><Link to="/puppies" className="hover:text-brand-teal">All Puppies</Link></li>
            <li><Link to="/sell" className="hover:text-brand-teal">List a Puppy</Link></li>
            <li><Link to="/login" className="hover:text-brand-teal">Login / Signup</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-brand-teal">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-brand-teal">Terms of Use</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-beige bg-brand-beige/40">
        <div className="section grid gap-3 py-6 text-center text-xs text-brand-charcoalSoft sm:grid-cols-3 sm:items-center">
          <p className="sm:text-left">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="sm:text-center">
            Design by <span className="font-semibold text-brand-teal">VINB Digital</span>
          </p>
          <p className="sm:text-right">
            <Link to="/privacy-policy" className="hover:text-brand-teal">Privacy Policy</Link>
            {" · "}
            <Link to="/terms-conditions" className="hover:text-brand-teal">Terms of Use</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
