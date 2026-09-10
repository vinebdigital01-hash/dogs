import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import TrustStrip from "../components/TrustStrip.jsx";
import { BREED_FILTER_LIST } from "../data/breeds.js";
import { CITIES } from "../config/config.js";
import { OWNER_WHATSAPP_NUMBER } from "../config/config.js";
import usePageTitle from "../hooks/usePageTitle.js";

const STEPS = ["Photos", "Details", "Price", "Health", "Contact", "Review"];

const blank = {
  photosNote: "",
  breed: "",
  ageWeeks: "",
  gender: "male",
  color: "",
  price: "",
  vaccination: "",
  healthNotes: "",
  ownerName: "",
  phone: "",
  city: CITIES[0],
};

export default function SellForm() {
  usePageTitle("Sell a Puppy | Madhav Kennal");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(blank);
  const [done, setDone] = useState(false);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const msg = encodeURIComponent(
      `Hello Madhav Kennal, I want to list a puppy.\nBreed: ${form.breed}\nAge: ${form.ageWeeks} weeks\nGender: ${form.gender}\nColor: ${form.color}\nPrice: ₹${form.price}\nVaccination: ${form.vaccination}\nHealth: ${form.healthNotes}\nOwner: ${form.ownerName}\nPhone: ${form.phone}\nCity: ${form.city}\nPhotos: ${form.photosNote || "Will share separately"}`
    );
    window.open(`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
    setDone(true);
  };

  if (done) {
    return (
      <section className="section py-24 text-center">
        <h1 className="h-display">Listing submitted for review</h1>
        <p className="mt-3 text-brand-charcoalSoft">WhatsApp opened with your details. Our team will follow up soon.</p>
        <Link to="/" className="btn-primary mt-8">Back Home</Link>
      </section>
    );
  }

  return (
    <>
      <section className="page-banner">
        <div className="section">
          <h1 className="font-display text-4xl font-extrabold">Sell a Puppy</h1>
          <p className="mt-3 text-white/90">Multi-step listing — submitted for Madhav Kennal review</p>
        </div>
      </section>

      <section className="section max-w-2xl py-10 sm:py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                i === step ? "bg-brand-teal text-white" : i < step ? "bg-brand-tealLight text-brand-teal" : "bg-brand-cream"
              }`}
            >
              {i < step && <Check className="h-3 w-3" />}
              {label}
            </span>
          ))}
        </div>

        <div className="card-soft p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-extrabold">Puppy photos / video</h2>
              <p className="text-sm text-brand-charcoalSoft">Describe links or note that you will share media on WhatsApp.</p>
              <textarea
                rows={4}
                value={form.photosNote}
                onChange={(e) => set({ photosNote: e.target.value })}
                placeholder="e.g. 5 clear photos + short video ready"
                className="w-full rounded-2xl border border-brand-beige bg-brand-cream/40 px-4 py-3 text-sm outline-none focus:border-brand-teal"
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-extrabold">Breed, age, gender, color</h2>
              <select
                value={form.breed}
                onChange={(e) => set({ breed: e.target.value })}
                className="w-full rounded-2xl border border-brand-beige px-4 py-3 text-sm"
              >
                <option value="">Select breed</option>
                {BREED_FILTER_LIST.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Age in weeks"
                value={form.ageWeeks}
                onChange={(e) => set({ ageWeeks: e.target.value })}
                className="w-full rounded-2xl border border-brand-beige px-4 py-3 text-sm"
              />
              <div className="flex gap-2">
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => set({ gender: g })}
                    className={`flex-1 rounded-full py-2.5 text-sm font-semibold capitalize ${
                      form.gender === g ? "bg-brand-teal text-white" : "bg-brand-cream"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <input
                placeholder="Color"
                value={form.color}
                onChange={(e) => set({ color: e.target.value })}
                className="w-full rounded-2xl border border-brand-beige px-4 py-3 text-sm"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-extrabold">Asking price (₹)</h2>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set({ price: e.target.value })}
                className="w-full rounded-2xl border border-brand-beige px-4 py-3 text-sm"
                placeholder="e.g. 35000"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-extrabold">Health & vaccination</h2>
              <input
                placeholder="Vaccination status"
                value={form.vaccination}
                onChange={(e) => set({ vaccination: e.target.value })}
                className="w-full rounded-2xl border border-brand-beige px-4 py-3 text-sm"
              />
              <textarea
                rows={3}
                placeholder="Health notes / deworming"
                value={form.healthNotes}
                onChange={(e) => set({ healthNotes: e.target.value })}
                className="w-full rounded-2xl border border-brand-beige px-4 py-3 text-sm"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-extrabold">Owner contact</h2>
              <input
                placeholder="Your name"
                value={form.ownerName}
                onChange={(e) => set({ ownerName: e.target.value })}
                className="w-full rounded-2xl border border-brand-beige px-4 py-3 text-sm"
              />
              <input
                placeholder="Phone / WhatsApp"
                value={form.phone}
                onChange={(e) => set({ phone: e.target.value })}
                className="w-full rounded-2xl border border-brand-beige px-4 py-3 text-sm"
              />
              <select
                value={form.city}
                onChange={(e) => set({ city: e.target.value })}
                className="w-full rounded-2xl border border-brand-beige px-4 py-3 text-sm"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3 text-sm">
              <h2 className="font-display text-xl font-extrabold">Review & submit</h2>
              {[
                ["Breed", form.breed],
                ["Age", `${form.ageWeeks} weeks`],
                ["Gender", form.gender],
                ["Color", form.color],
                ["Price", form.price ? `₹${Number(form.price).toLocaleString("en-IN")}` : ""],
                ["Vaccination", form.vaccination],
                ["Health", form.healthNotes],
                ["Owner", form.ownerName],
                ["Phone", form.phone],
                ["City", form.city],
              ].map(([k, v]) => (
                <p key={k}><strong className="text-brand-ink">{k}:</strong> <span className="capitalize text-brand-charcoalSoft">{v || "—"}</span></p>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {step > 0 && (
              <button type="button" className="btn-ghost" onClick={back}>Back</button>
            )}
            {step < STEPS.length - 1 ? (
              <button type="button" className="btn-primary" onClick={next}>Continue</button>
            ) : (
              <button type="button" className="btn-primary" onClick={submit}>Submit for Review</button>
            )}
          </div>
        </div>
      </section>

      <TrustStrip />
    </>
  );
}
