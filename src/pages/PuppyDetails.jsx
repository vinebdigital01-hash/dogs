import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Check,
  Heart,
  MapPin,
  MessageCircle,
  Palette,
  Share2,
  ShieldCheck,
  Syringe,
  User,
} from "lucide-react";
import PawDecoration from "../components/PawDecoration.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import PuppyCard from "../components/PuppyCard.jsx";
import { getPuppyById, getRelatedPuppies } from "../data/puppies.js";
import { buildWhatsAppUrl } from "../services/enquiryService.js";
import { puppyWhatsAppMessage } from "../config/config.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

const availabilityBadge = (a) => {
  switch (a) {
    case "Available":
      return "badge-available";
    case "Reserved":
      return "badge-reserved";
    default:
      return "badge-sold";
  }
};

export default function PuppyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const puppy = getPuppyById(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  const [activeImg, setActiveImg] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [shared, setShared] = useState(false);
  const fav = puppy ? isFavorite(puppy.id) : false;

  usePageTitle(
    puppy
      ? `${puppy.name} · ${puppy.breed} | Madhav Kennal`
      : "Puppy | Madhav Kennal"
  );

  // Auto-open enquiry when arriving with ?enquire=1
  useEffect(() => {
    if (searchParams.get("enquire") === "1") {
      setEnquiryOpen(true);
      const sp = new URLSearchParams(searchParams);
      sp.delete("enquire");
      setSearchParams(sp, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveImg(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const related = useMemo(() => (puppy ? getRelatedPuppies(puppy, 3) : []), [puppy]);

  if (!puppy) {
    return (
      <section className="section py-24 text-center">
        <h1 className="h-display text-brand-ink">Puppy not found</h1>
        <p className="mt-2 text-brand-charcoalSoft">
          The puppy you're looking for may have been adopted.
        </p>
        <Link to="/puppies" className="btn-primary mt-6 inline-flex">
          Browse Available Puppies
        </Link>
      </section>
    );
  }

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${puppy.name} — ${puppy.breed} | Madhav Kennal`,
          text: puppyWhatsAppMessage(puppy),
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <>
      <section className="relative pb-32 pt-8 sm:pb-16 sm:pt-12">
        <div className="section">
          {/* Breadcrumb */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-teal transition hover:text-brand-tealDark"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 text-xs text-brand-charcoalSoft"
          >
            <Link to="/" className="link-underline">
              Home
            </Link>{" "}
            <span className="mx-1 text-brand-charcoal/40">/</span>{" "}
            <Link to="/puppies" className="link-underline">
              Puppies
            </Link>{" "}
            <span className="mx-1 text-brand-charcoal/40">/</span>{" "}
            <Link
              to={`/puppies?breed=${encodeURIComponent(puppy.breed)}`}
              className="link-underline"
            >
              {puppy.breed}
            </Link>{" "}
            <span className="mx-1 text-brand-charcoal/40">/</span>{" "}
            <span className="text-brand-ink">{puppy.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
            {/* LEFT — Gallery */}
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem] bg-brand-cream shadow-pop">
                <img
                  src={puppy.images[activeImg]}
                  alt={`${puppy.name} photo ${activeImg + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span
                  className={`badge absolute left-5 top-5 shadow-soft ${availabilityBadge(
                    puppy.availability
                  )}`}
                >
                  {puppy.availability}
                </span>
                <button
                  type="button"
                  onClick={() => toggleFavorite(puppy.id)}
                  aria-label={fav ? "Remove favorite" : "Save favorite"}
                  className={`absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full backdrop-blur-sm transition ${
                    fav
                      ? "bg-brand-coral text-white"
                      : "bg-white/90 text-brand-charcoal hover:bg-brand-coral hover:text-white"
                  }`}
                >
                  <Heart className="h-5 w-5" fill={fav ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share puppy"
                  className="absolute right-20 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-brand-charcoal backdrop-blur-sm transition hover:bg-brand-teal hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                {shared && (
                  <span className="absolute right-5 top-20 rounded-full bg-brand-ink/80 px-3 py-1 text-[11px] text-white">
                    Link copied!
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
                {puppy.images.map((src, i) => (
                  <button
                    type="button"
                    key={src + i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-2xl ring-2 transition ${
                      activeImg === i
                        ? "ring-brand-teal"
                        : "ring-transparent hover:ring-brand-teal/30"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Info */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-teal">
                Puppy ID · {puppy.id}
              </p>
              <h1 className="mt-2 font-display text-4xl font-700 leading-tight text-brand-ink sm:text-5xl">
                {puppy.name}
              </h1>
              <p className="mt-1 text-lg text-brand-teal">{puppy.breed}</p>

              <p className="mt-5 text-sm leading-relaxed text-brand-charcoalSoft">
                {puppy.description}
              </p>

              {/* Info grid */}
              <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-2">
                <InfoTile icon={User} label="Gender" value={puppy.gender} />
                <InfoTile icon={Calendar} label="Age" value={puppy.age} />
                <InfoTile icon={MapPin} label="Location" value={puppy.location} />
                <InfoTile icon={Palette} label="Color" value={puppy.color} />
                <InfoTile icon={Syringe} label="Vaccination" value={puppy.vaccination} />
                <InfoTile
                  icon={ShieldCheck}
                  label="Health"
                  value={puppy.healthInfo}
                />
              </ul>

              {/* Price + CTAs */}
              <div className="mt-8 rounded-4xl bg-gradient-to-br from-brand-cream to-white p-6 shadow-card ring-1 ring-black/[0.03]">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-charcoalSoft">
                      Price
                    </p>
                    <p className="font-display text-4xl font-700 text-brand-ink">
                      ₹{puppy.price.toLocaleString("en-IN")}
                    </p>
                    <p className="mt-1 text-xs text-brand-charcoalSoft">
                      Delivery & booking assistance available
                    </p>
                  </div>
                  <span
                    className={`badge ${availabilityBadge(puppy.availability)} shadow-soft`}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                    {puppy.availability}
                  </span>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setEnquiryOpen(true)}
                    className="btn-primary w-full"
                  >
                    Enquire About This Puppy
                  </button>
                  <a
                    href={buildWhatsAppUrl(puppyWhatsAppMessage(puppy))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Now
                  </a>
                </div>
              </div>

              {/* Trust chips */}
              <ul className="mt-6 flex flex-wrap gap-2 text-xs text-brand-charcoalSoft">
                <TrustChip icon={ShieldCheck}>Vet-checked</TrustChip>
                <TrustChip icon={Heart}>Personally cared</TrustChip>
                <TrustChip icon={PawDecoration}>Ready for a new home</TrustChip>
              </ul>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <div className="flex items-end justify-between gap-3">
                <h2 className="h-display text-brand-ink">
                  More {puppy.breed} Puppies
                </h2>
                <Link
                  to={`/puppies?breed=${encodeURIComponent(puppy.breed)}`}
                  className="text-sm font-semibold text-brand-teal hover:text-brand-tealDark"
                >
                  View all
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {related.map((p) => (
                  <PuppyCard key={p.id} puppy={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile sticky CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-cream bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <a
            href={buildWhatsAppUrl(puppyWhatsAppMessage(puppy))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 !py-3"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setEnquiryOpen(true)}
            className="btn-primary flex-1 !py-3"
          >
            <Heart className="h-4 w-4" /> Enquire Now
          </button>
        </div>
      </div>

      <EnquiryForm
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        puppy={puppy}
      />
    </>
  );
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <li className="rounded-2xl border border-brand-cream bg-white p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-brand-charcoalSoft">
        <Icon className="h-3.5 w-3.5 text-brand-teal" />
        {label}
      </div>
      <p className="mt-1.5 text-sm font-semibold text-brand-ink">{value}</p>
    </li>
  );
}

function TrustChip({ icon: Icon, children }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full bg-brand-tealLight px-3 py-1.5 font-semibold text-brand-teal">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </li>
  );
}
