import React from "react";
import TrustStrip from "../components/TrustStrip.jsx";
import { OWNER_EMAIL, OWNER_PHONE_NUMBER } from "../config/config.js";
import usePageTitle from "../hooks/usePageTitle.js";

const SECTIONS = [
  {
    title: "1. General Information",
    body: "This Privacy Policy explains how Madhav Kennal collects and uses information when you browse listings, submit enquiries or list a puppy on our website.",
  },
  {
    title: "2. Information We Collect",
    body: "We may collect name, phone/WhatsApp number, city, email and messages you share when enquiring about or listing a puppy. Technical data such as device/browser type may also be collected for site performance.",
  },
  {
    title: "3. How We Use Information",
    body: "Information is used to respond to enquiries, coordinate puppy handovers, improve our services and communicate updates related to your request.",
  },
  {
    title: "4. Sharing",
    body: "We do not sell personal information. Details may be shared only as needed with logistics partners or service providers assisting a confirmed puppy transfer, or when required by law.",
  },
  {
    title: "5. Data Security & Retention",
    body: "We take reasonable steps to protect enquiry data. Information is retained only as long as needed to fulfil the purpose of your request or meet legal obligations.",
  },
  {
    title: "6. Your Choices",
    body: "You may request updates or deletion of your contact details by emailing or calling Madhav Kennal using the contacts below.",
  },
  {
    title: "7. Contact",
    body: `Questions about privacy: ${OWNER_EMAIL} · ${OWNER_PHONE_NUMBER}`,
  },
];

export default function PrivacyPolicy() {
  usePageTitle("Privacy Policy | Madhav Kennal");

  return (
    <>
      <section className="page-banner">
        <div className="section">
          <h1 className="font-display text-4xl font-extrabold">Privacy Policy</h1>
        </div>
      </section>
      <section className="section max-w-3xl space-y-8 py-12 text-sm leading-relaxed text-brand-charcoalSoft">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-extrabold text-brand-ink">{s.title}</h2>
            <p className="mt-2">{s.body}</p>
          </div>
        ))}
      </section>
      <TrustStrip />
    </>
  );
}
