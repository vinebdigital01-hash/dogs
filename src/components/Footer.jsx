import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";
import {
  BRAND,
  LOCATION,
  OWNER_EMAIL,
  OWNER_PHONE_NUMBER,
  SOCIALS,
} from "../config/config.js";

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-ink text-brand-cream">
      <div className="section grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gold text-brand-ink">
              <PawDecoration className="h-6 w-6" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-xl font-700">{BRAND.name}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Est. {BRAND.established}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm text-brand-cream/70">
            A professional kennel dealing in all popular breeds. We help families
            find the perfect four-legged companion with care and integrity.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/5 transition hover:bg-brand-gold hover:text-brand-ink"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={SOCIALS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/5 transition hover:bg-brand-gold hover:text-brand-ink"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={SOCIALS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/5 transition hover:bg-brand-gold hover:text-brand-ink"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Explore
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-brand-cream/80">
            {[
              ["Home", "/"],
              ["All Puppies", "/puppies"],
              ["Browse Breeds", "/breeds"],
              ["About Us", "/about"],
              ["Why Choose Us", "/why-choose-us"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-brand-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Breeds */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Popular Breeds
          </h4>
          <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 text-sm text-brand-cream/80">
            {[
              "Golden Retriever",
              "Labrador",
              "German Shepherd",
              "Shih Tzu",
              "Pomeranian",
              "Siberian Husky",
              "Beagle",
              "Pug",
            ].map((b) => (
              <li key={b}>
                <Link
                  to={`/puppies?breed=${encodeURIComponent(b)}`}
                  className="transition hover:text-brand-gold"
                >
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Contact
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-brand-cream/80">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-brand-gold" />
              <a
                href={`tel:${OWNER_PHONE_NUMBER.replace(/\s/g, "")}`}
                className="hover:text-brand-gold"
              >
                {OWNER_PHONE_NUMBER}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-brand-gold" />
              <a href={`mailto:${OWNER_EMAIL}`} className="hover:text-brand-gold">
                {OWNER_EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-gold" />
              <a
                href={LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-gold"
              >
                {LOCATION.address}
              </a>
            </li>
          </ul>
          <p className="mt-5 rounded-2xl bg-white/5 px-4 py-3 text-xs text-brand-cream/70">
            {LOCATION.hours}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section grid gap-3 py-6 text-center text-xs text-brand-cream/60 sm:grid-cols-3 sm:items-center">
          <p className="sm:text-left">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="sm:text-center">
            Design by{" "}
            <span className="font-semibold tracking-wide text-brand-gold">
              VINE B Digital 
            </span>
          </p>
          <p className="hidden sm:block sm:text-right">
            Trusted puppy kennel
          </p>
        </div>
      </div>
    </footer>
  );
}
