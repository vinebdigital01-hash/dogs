import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Heart, MapPin, MessageCircle, User } from "lucide-react";
import { buildWhatsAppUrl } from "../services/enquiryService.js";
import { puppyWhatsAppMessage } from "../config/config.js";
import { useFavorites } from "../context/FavoritesContext.jsx";

const availabilityBadge = (a) => {
  switch (a) {
    case "Available":
      return "badge-available";
    case "Reserved":
      return "badge-reserved";
    case "Sold":
    default:
      return "badge-sold";
  }
};

export default function PuppyCard({ puppy }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(puppy.id);
  const isAvailable = puppy.availability === "Available";

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-pop sm:rounded-4xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
        <Link
          to={`/puppy/${puppy.id}`}
          className="block h-full w-full"
          aria-label={`View details of ${puppy.name}`}
        >
          <img
            src={puppy.images[0]}
            alt={`${puppy.name} — ${puppy.breed}`}
            loading="lazy"
            width={600}
            height={750}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        <span
          className={`badge pointer-events-none absolute left-2 top-2 text-[9px] shadow-soft sm:left-4 sm:top-4 sm:text-[11px] ${availabilityBadge(
            puppy.availability
          )}`}
        >
          {puppy.availability}
        </span>

        <button
          type="button"
          onClick={() => toggleFavorite(puppy.id)}
          aria-label={
            fav
              ? `Remove ${puppy.name} from favorites`
              : `Save ${puppy.name} to favorites`
          }
          className={`absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full backdrop-blur-sm transition sm:right-4 sm:top-4 sm:h-10 sm:w-10 ${
            fav
              ? "bg-brand-coral text-white shadow-soft"
              : "bg-white/90 text-brand-charcoal hover:bg-brand-coral hover:text-white"
          }`}
        >
          <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
        </button>

        <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-teal shadow-soft sm:bottom-4 sm:right-4 sm:px-3 sm:py-1.5 sm:text-sm">
          ₹{puppy.price.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-700 text-brand-ink sm:text-xl">
            <Link to={`/puppy/${puppy.id}`} className="hover:text-brand-teal">
              {puppy.name}
            </Link>
          </h3>
          <p className="truncate text-sm text-brand-teal">{puppy.breed}</p>
        </div>

        <ul className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] text-brand-charcoalSoft sm:mt-4 sm:gap-x-3 sm:gap-y-2 sm:text-xs">
          <li className="flex min-w-0 items-center gap-1.5">
            <User className="h-3.5 w-3.5 flex-shrink-0 text-brand-teal" />
            <span className="truncate">{puppy.gender}</span>
          </li>
          <li className="flex min-w-0 items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0 text-brand-teal" />
            <span className="truncate">{puppy.age}</span>
          </li>
          <li className="col-span-2 flex min-w-0 items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-brand-teal" />
            <span className="truncate">{puppy.location}</span>
          </li>
        </ul>

        <p className="mt-2 line-clamp-2 text-[11px] text-brand-charcoalSoft/90 sm:mt-3 sm:text-xs">
          {puppy.description}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:pt-5">
          <Link
            to={`/puppy/${puppy.id}`}
            className="flex-1 rounded-full border border-brand-teal/25 px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-brand-teal transition hover:border-brand-teal hover:bg-brand-tealLight sm:px-4 sm:text-xs"
          >
            View Details
          </Link>
          {isAvailable ? (
            <Link
              to={`/puppy/${puppy.id}?enquire=1`}
              className="flex-1 rounded-full bg-brand-teal px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white transition hover:bg-brand-tealDark sm:px-4 sm:text-xs"
            >
              Enquire Now
            </Link>
          ) : (
            <a
              href={buildWhatsAppUrl(puppyWhatsAppMessage(puppy))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#1EBE57] sm:px-4 sm:text-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
