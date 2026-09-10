import React from "react";
import { PhoneCall } from "lucide-react";
import { OWNER_PHONE_NUMBER } from "../config/config.js";

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-teal text-brand-cream">
      <div className="section flex items-center justify-between gap-4 py-2 text-[12px] sm:text-[13px]">
        <p className="flex-1 truncate text-center font-medium tracking-wide sm:text-left">
          <span aria-hidden="true">🐾</span> Find Your Perfect Puppy
          <span className="mx-2 opacity-40">|</span>
          Multiple Breeds Available
          <span className="mx-2 opacity-40">|</span>
          Trusted Puppy Care
        </p>
        <a
          href={`tel:${OWNER_PHONE_NUMBER.replace(/\s/g, "")}`}
          className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-white/10 px-3 py-1 font-semibold text-brand-cream ring-1 ring-white/15 transition hover:bg-white/20 sm:inline-flex"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          {OWNER_PHONE_NUMBER}
        </a>
      </div>
    </div>
  );
}
