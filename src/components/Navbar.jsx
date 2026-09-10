import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, X, MessageCircle } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";
import { buildWhatsAppUrl } from "../services/enquiryService.js";
import { DEFAULT_WHATSAPP_MESSAGE } from "../config/config.js";
import { useFavorites } from "../context/FavoritesContext.jsx";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/puppies", label: "Puppies" },
  { to: "/breeds", label: "Breeds" },
  { to: "/about", label: "About Us" },
  { to: "/why-choose-us", label: "Why Choose Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { count: favCount } = useFavorites();

  const goSearch = (value) => {
    const q = value.trim();
    if (!q) return;
    navigate(`/puppies?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Lock body scroll + Escape when drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const mobileMenu =
    typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 z-[100] lg:hidden ${
              open ? "" : "pointer-events-none"
            }`}
            aria-hidden={!open}
          >
            <div
              className={`absolute inset-0 bg-brand-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setOpen(false)}
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={`absolute right-0 top-0 flex h-[100dvh] w-[min(88vw,22rem)] flex-col bg-white shadow-pop transition-transform duration-300 ease-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between border-b border-brand-cream px-4 py-4 sm:px-5">
                <Link
                  to="/"
                  className="flex min-w-0 items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-brand-teal text-brand-cream">
                    <PawDecoration className="h-5 w-5" />
                  </span>
                  <span className="truncate font-display text-base font-700 sm:text-lg">
                    Madhav Kennal
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-brand-cream text-brand-teal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-4 py-4 sm:px-5">
                <label className="flex items-center gap-2 rounded-full border border-brand-teal/20 bg-brand-cream/60 px-4 py-3">
                  <Search className="h-4 w-4 flex-shrink-0 text-brand-teal" />
                  <input
                    type="search"
                    placeholder="Search breeds or puppies…"
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-brand-charcoal/50"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") goSearch(e.currentTarget.value);
                    }}
                  />
                </label>
              </div>

              <ul className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 pb-4">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-3.5 text-base font-semibold transition ${
                          isActive
                            ? "bg-brand-tealLight text-brand-teal"
                            : "text-brand-charcoal active:bg-brand-cream"
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <Link
                    to="/puppies?favorites=1"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-brand-charcoal active:bg-brand-cream"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Heart className="h-4 w-4 text-brand-coral" /> Saved
                    </span>
                    {favCount > 0 && (
                      <span className="rounded-full bg-brand-coral px-2 py-0.5 text-[11px] text-white">
                        {favCount}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>

              <div className="safe-pb border-t border-brand-cream p-4 sm:p-5">
                <Link
                  to="/puppies"
                  className="btn-primary w-full"
                  onClick={() => setOpen(false)}
                >
                  Enquire Now
                </Link>
              </div>
            </aside>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-soft backdrop-blur-md"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <nav className="section flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-3.5">
          {/* Logo */}
          <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-brand-teal text-brand-cream shadow-soft sm:h-11 sm:w-11">
              <PawDecoration className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-700 text-brand-ink sm:text-xl">
                Madhav
              </span>
              <span className="block -mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-brand-teal sm:text-[10px] sm:tracking-[0.3em]">
                Kennal
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm font-semibold transition xl:px-4 ${
                      isActive
                        ? "bg-brand-tealLight text-brand-teal"
                        : "text-brand-charcoal hover:bg-brand-tealLight/60 hover:text-brand-teal"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right actions — desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              aria-label="Search puppies"
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-brand-charcoal transition hover:bg-brand-tealLight hover:text-brand-teal"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/puppies?favorites=1"
              aria-label="Saved puppies"
              className="relative grid h-10 w-10 place-items-center rounded-full text-brand-charcoal transition hover:bg-brand-coral/10 hover:text-brand-coral"
            >
              <Heart className="h-5 w-5" />
              {favCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-coral px-1 text-[10px] font-bold text-white">
                  {favCount}
                </span>
              )}
            </Link>
            <Link to="/puppies" className="btn-primary !py-2.5 !text-xs">
              Enquire Now
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex flex-shrink-0 items-center gap-1.5 lg:hidden">
            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp us"
              className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white shadow-soft"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-teal/25 bg-white text-brand-teal shadow-sm"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Desktop search dropdown */}
        {searchOpen && (
          <div className="hidden border-t border-brand-tealLight bg-white lg:block">
            <div className="section py-4">
              <label className="flex items-center gap-3 rounded-full border border-brand-teal/20 bg-brand-cream/60 px-5 py-3">
                <Search className="h-5 w-5 text-brand-teal" />
                <input
                  type="search"
                  autoFocus
                  placeholder="Search breeds or puppy names — e.g. Golden Retriever, Bruno"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-brand-charcoal/50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") goSearch(e.currentTarget.value);
                  }}
                />
                <span className="text-xs text-brand-charcoal/60">Press Enter</span>
              </label>
            </div>
          </div>
        )}
      </header>

      {mobileMenu}
    </>
  );
}
