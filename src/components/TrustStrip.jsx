import React from "react";
import { MessageCircle, Phone, Star, Store, Truck } from "lucide-react";
import { LOCATION, OWNER_PHONE_NUMBER } from "../config/config.js";
import Reveal from "./Reveal.jsx";

const ITEMS = [
  { icon: Truck, title: "Delivery available", sub: "pan India" },
  { icon: Store, title: "Pickup available", sub: "from any metro city" },
  { icon: Star, title: "Rating 4.8/5", sub: "from verified users" },
  { icon: Phone, title: LOCATION.hours, sub: OWNER_PHONE_NUMBER },
  { icon: MessageCircle, title: "Message us", sub: "respond same day" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-brand-beige bg-white py-8">
      <div className="section grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map(({ icon: Icon, title, sub }, i) => (
          <Reveal key={title} variant="up" delay={i * 70}>
            <div className="hover-lift flex items-start gap-3 rounded-2xl bg-brand-cream/70 p-4">
              <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-brand-tealLight text-brand-teal transition hover:rotate-6">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-ink">{title}</p>
                <p className="text-xs text-brand-charcoalSoft">{sub}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
