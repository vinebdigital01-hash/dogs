import React, { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import PawDecoration from "../components/PawDecoration.jsx";
import { submitEnquiry, buildWhatsAppUrl } from "../services/enquiryService.js";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  LOCATION,
  OWNER_EMAIL,
  OWNER_PHONE_NUMBER,
} from "../config/config.js";
import { BREEDS } from "../data/breeds.js";
import usePageTitle from "../hooks/usePageTitle.js";

export default function Contact() {
  usePageTitle("Contact | Madhav Kennal");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    breed: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim()) {
      setError("Please share at least your name and mobile number.");
      return;
    }
    setError("");
    submitEnquiry({
      customer: {
        name: form.name,
        mobile: form.mobile,
        city: "",
        message: `Preferred Breed: ${form.breed || "Any"}\n${form.message || ""}`,
      },
      puppy: null,
      source: "whatsapp",
    });
    setSent(true);
  };

  return (
    <>
      <section className="relative bg-hero-gradient py-16">
        <div className="section text-center">
          <span className="kicker mx-auto">
            <PawDecoration className="h-3 w-3" /> Contact us
          </span>
          <h1 className="mt-4 h-display text-brand-ink">
            Looking For A Specific Breed?
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-brand-charcoalSoft">
            Can't find the breed you're looking for? Contact Madhav Kennal and
            tell us what you're looking for — we'll do our best to help.
          </p>
        </div>
      </section>

      <section className="relative py-16">
        <div className="section grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Form card */}
          <div className="rounded-4xl bg-white p-6 shadow-card ring-1 ring-black/[0.03] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-teal">
              Send Enquiry
            </p>
            <h2 className="mt-2 font-display text-3xl font-700 text-brand-ink">
              Tell us what you're looking for
            </h2>

            {sent ? (
              <div className="mt-8 rounded-3xl bg-emerald-50 p-6 text-emerald-800">
                <p className="font-display text-xl font-700">Thank you!</p>
                <p className="mt-2 text-sm">
                  Your enquiry has opened in WhatsApp. If it didn't open,{" "}
                  <a
                    href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                  >
                    click here to open WhatsApp
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Field
                  label="Your Name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="e.g. Priya Verma"
                  required
                />
                <Field
                  label="Mobile Number"
                  value={form.mobile}
                  onChange={(v) => setForm((f) => ({ ...f, mobile: v }))}
                  placeholder="10-digit number"
                  type="tel"
                  required
                />
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
                    Preferred Breed
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      value={form.breed}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, breed: e.target.value }))
                      }
                      className="w-full appearance-none rounded-2xl border border-brand-teal/20 bg-brand-cream/50 px-4 py-3 pr-9 text-sm outline-none transition focus:border-brand-teal focus:bg-white"
                    >
                      <option value="">Any / Not sure yet</option>
                      {BREEDS.map((b) => (
                        <option key={b.slug} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-teal">
                      ▾
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell us anything about the puppy you're looking for…"
                    className="mt-1.5 w-full resize-none rounded-2xl border border-brand-teal/20 bg-brand-cream/50 px-4 py-3 text-sm outline-none transition focus:border-brand-teal focus:bg-white"
                  />
                </div>

                {error && (
                  <p className="text-sm text-brand-coralDark">{error}</p>
                )}

                <button type="submit" className="btn-primary w-full">
                  <Send className="h-4 w-4" /> Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Contact details */}
          <div className="space-y-6">
            <ContactCard
              icon={Phone}
              label="Call us"
              value={OWNER_PHONE_NUMBER}
              href={`tel:${OWNER_PHONE_NUMBER.replace(/\s/g, "")}`}
              color="bg-brand-tealLight text-brand-teal"
            />
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value="Chat with us instantly"
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              color="bg-[#25D366]/15 text-[#128C4B]"
              external
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value={OWNER_EMAIL}
              href={`mailto:${OWNER_EMAIL}`}
              color="bg-brand-gold/15 text-brand-goldDark"
            />
            <ContactCard
              icon={MapPin}
              label="Visit us"
              value={LOCATION.address}
              href={LOCATION.mapsUrl}
              color="bg-brand-coral/15 text-brand-coralDark"
              external
            />
            <div className="rounded-3xl bg-brand-ink p-6 text-brand-cream">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gold text-brand-ink">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold">
                    Hours
                  </p>
                  <p className="text-sm font-semibold">{LOCATION.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-brand-charcoalSoft">
        {label} {required && <span className="text-brand-coral">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-2xl border border-brand-teal/20 bg-brand-cream/50 px-4 py-3 text-sm outline-none transition focus:border-brand-teal focus:bg-white"
      />
    </div>
  );
}

function ContactCard({ icon: Icon, label, value, href, color, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-black/[0.03] transition hover:-translate-y-0.5 hover:shadow-pop"
    >
      <span className={`grid h-12 w-12 place-items-center rounded-2xl ${color}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-charcoalSoft">
          {label}
        </p>
        <p className="text-sm font-semibold text-brand-ink">{value}</p>
      </div>
    </a>
  );
}
