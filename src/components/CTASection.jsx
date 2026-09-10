import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";
import { buildWhatsAppUrl } from "../services/enquiryService.js";
import { DEFAULT_WHATSAPP_MESSAGE } from "../config/config.js";

export default function CTASection() {
  return (
    <section className="relative py-16">
      <div className="section">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-teal-gradient px-6 py-14 text-center text-brand-cream shadow-pop sm:px-10 sm:py-20">
          {/* decorative paws */}
          <PawDecoration className="pointer-events-none absolute -left-4 top-6 h-16 w-16 rotate-[-18deg] text-white/10" />
          <PawDecoration className="pointer-events-none absolute right-6 top-10 h-10 w-10 rotate-12 text-white/10" />
          <PawDecoration className="pointer-events-none absolute bottom-6 left-1/3 h-12 w-12 rotate-[24deg] text-white/10" />
          <PawDecoration className="pointer-events-none absolute -right-6 bottom-2 h-20 w-20 rotate-[-12deg] text-white/10" />

          <span className="badge bg-white/10 text-brand-gold ring-1 ring-white/20">
            <PawDecoration className="h-3 w-3" /> Ready when you are
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,3.75rem)] font-700 leading-[1.05] text-white">
            Your New Best Friend Is Waiting <span aria-hidden="true">🐾</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-brand-cream/80 sm:text-lg">
            Explore our available puppies and take the first step toward
            bringing home your new companion.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/puppies" className="btn-gold">
              Explore Puppies <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
