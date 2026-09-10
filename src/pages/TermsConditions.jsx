import React from "react";
import TrustStrip from "../components/TrustStrip.jsx";
import { OWNER_EMAIL, OWNER_PHONE_NUMBER } from "../config/config.js";
import usePageTitle from "../hooks/usePageTitle.js";

const SECTIONS = [
  {
    title: "1. General Information",
    body: "These Terms of Use govern access to Madhav Kennal's website and services for browsing, enquiring about and listing purebred puppies.",
  },
  {
    title: "2. User Responsibilities",
    body: "You agree to provide accurate information in enquiries and listings, and to use the site only for lawful pet-related transactions.",
  },
  {
    title: "3. Listing Rules",
    body: "Sellers must share truthful breed, age, health and pricing details. Madhav Kennal may reject or remove listings that appear incomplete or misleading.",
  },
  {
    title: "4. Payments",
    body: "Payment arrangements are confirmed directly through Madhav Kennal's guided process. Do not share sensitive payment credentials over unsecured channels.",
  },
  {
    title: "5. Liability",
    body: "Madhav Kennal strives for accurate listings and careful coordination. Pet ownership involves ongoing care responsibilities; outcomes after handover depend on proper home care and veterinary follow-up.",
  },
  {
    title: "6. Contact",
    body: `For terms-related questions: ${OWNER_EMAIL} · ${OWNER_PHONE_NUMBER}`,
  },
];

export default function TermsConditions() {
  usePageTitle("Terms of Use | Madhav Kennal");

  return (
    <>
      <section className="page-banner">
        <div className="section">
          <h1 className="font-display text-4xl font-extrabold">Terms of Use</h1>
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
