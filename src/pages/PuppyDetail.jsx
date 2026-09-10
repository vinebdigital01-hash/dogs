import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import PuppyCard from "../components/PuppyCard.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import TrustStrip from "../components/TrustStrip.jsx";
import { getPuppyById, getRelatedPuppies } from "../data/puppies.js";
import { getBreedByName } from "../data/breeds.js";
import usePageTitle from "../hooks/usePageTitle.js";

export default function PuppyDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const puppy = getPuppyById(id);
  const [imgIdx, setImgIdx] = useState(0);
  const [enquireOpen, setEnquireOpen] = useState(false);

  usePageTitle(puppy ? `${puppy.name} — ${puppy.breed} | Madhav Kennal` : "Puppy | Madhav Kennal");

  useEffect(() => {
    if (searchParams.get("enquire") === "1") setEnquireOpen(true);
  }, [searchParams]);

  useEffect(() => {
    setImgIdx(0);
  }, [id]);

  if (!puppy) {
    return (
      <section className="section py-24 text-center">
        <h1 className="h-display">Puppy not found</h1>
        <Link to="/puppies" className="btn-primary mt-6">Browse Puppies</Link>
      </section>
    );
  }

  const breed = getBreedByName(puppy.breed);
  const related = getRelatedPuppies(puppy, 4);
  const images = puppy.images?.length ? puppy.images : ["/images/lab-1.jpg"];

  return (
    <>
      <section className="section py-8 sm:py-12">
        <Link to="/puppies" className="text-sm font-semibold text-brand-teal hover:underline">
          ← Back to all puppies
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-beige shadow-card">
              <img src={images[imgIdx]} alt={puppy.name} className="h-full w-full object-cover" />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow"
                    onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow"
                    onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImgIdx(i)}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl ring-2 ${
                      i === imgIdx ? "ring-brand-teal" : "ring-transparent"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="kicker">{puppy.availability}</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold text-brand-ink sm:text-4xl">
              {puppy.name}
            </h1>
            <p className="mt-1 text-lg font-semibold text-brand-teal">{puppy.breed}</p>
            <p className="mt-4 font-display text-3xl font-extrabold text-brand-ink">
              ₹{puppy.price.toLocaleString("en-IN")}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge badge-cert capitalize">{puppy.gender}</span>
              <span className="badge badge-cert">{puppy.age}</span>
              {(puppy.badges || []).map((b) => (
                <span key={b} className="badge badge-cert">{b}</span>
              ))}
            </div>

            <button type="button" className="btn-primary mt-8 w-full sm:w-auto" onClick={() => setEnquireOpen(true)}>
              <MessageCircle className="h-4 w-4" /> Ask About Me
            </button>

            <div className="mt-10 space-y-4">
              <h2 className="font-display text-xl font-extrabold">About {puppy.name}</h2>
              <p className="text-brand-charcoalSoft leading-relaxed">{puppy.description}</p>
              <p className="text-sm text-brand-charcoalSoft">
                <strong className="text-brand-ink">Health:</strong> {puppy.healthInfo}
                <br />
                <strong className="text-brand-ink">Vaccination:</strong> {puppy.vaccination}
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-brand-beige">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Breed", puppy.breed],
                    ["Age", puppy.age],
                    ["Gender", puppy.gender],
                    ["Color", puppy.color],
                    ["Vaccination", puppy.vaccination],
                    ["Location", puppy.city || puppy.location],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-brand-beige last:border-0">
                      <th className="bg-brand-cream/60 px-4 py-3 text-left font-semibold text-brand-ink">{k}</th>
                      <td className="px-4 py-3 capitalize text-brand-charcoalSoft">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {breed && (
              <Link to={`/breed/${breed.slug}`} className="mt-6 inline-block text-sm font-semibold text-brand-teal hover:underline">
                Everything about {breed.name} →
              </Link>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="h-display text-2xl sm:text-3xl">You may also like</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
              {related.map((p) => (
                <PuppyCard key={p.id} puppy={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      <EnquiryForm open={enquireOpen} onClose={() => setEnquireOpen(false)} puppy={puppy} />
      <TrustStrip />
    </>
  );
}
