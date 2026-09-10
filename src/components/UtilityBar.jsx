import React from "react";
import { Phone } from "lucide-react";
import { OWNER_PHONE_NUMBER } from "../config/config.js";
import { useCity } from "../context/CityContext.jsx";

export default function UtilityBar() {
  const { city, setCity, cities } = useCity();

  return (
    <div className="border-b border-white/10 bg-brand-ink text-white">
      <div className="section flex flex-wrap items-center justify-between gap-2 py-2 text-[12px] sm:text-[13px]">
        <a
          href={`tel:${OWNER_PHONE_NUMBER.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-1.5 font-medium text-white/90 hover:text-white"
        >
          <Phone className="h-3.5 w-3.5 text-brand-gold" />
          Need Help? {OWNER_PHONE_NUMBER}
        </a>
        <label className="inline-flex items-center gap-2">
          <span className="hidden text-white/60 sm:inline">City</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="max-w-[10rem] rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] outline-none sm:max-w-none"
            aria-label="Select city"
          >
            {cities.map((c) => (
              <option key={c} value={c} className="text-brand-ink">
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
