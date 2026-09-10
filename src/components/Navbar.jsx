import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import PawDecoration from "./PawDecoration.jsx";
import { BREEDS } from "../data/breeds.js";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/puppies", label: "All Puppies" },
  { to: "/sell", label: "Sell a Puppy" },
  { to: "/faqs", label: "FAQs" },
  { to: "/blogs", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [breedOpen, setBreedOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setBreedOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition ${
      isActive ? "bg-brand-tealLight text-brand-teal" : "text-brand-charcoal hover:bg-brand-cream"
    }`;

  const drawer =
    typeof document !== "undefined"
      ? createPortal(
          <div className={`fixed inset-0 z-[100] lg:hidden ${open ? "" : "pointer-events-none"}`}>
            <div
              className={`absolute inset-0 bg-brand-ink/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
              onClick={() => setOpen(false)}
            />
            <aside
              className={`absolute right-0 top-0 flex h-[100dvh] w-[min(88vw,22rem)] flex-col bg-white shadow-pop transition-transform duration-300 ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between border-b border-brand-beige px-4 py-4">
                <span className="font-display text-lg font-extrabold text-brand-ink">Madhav Kennal</span>
                <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-brand-cream" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {NAV.map((l) => (
                  <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `block rounded-2xl px-4 py-3 font-semibold ${isActive ? "bg-brand-tealLight text-brand-teal" : "text-brand-charcoal"}`}>
                    {l.label}
                  </NavLink>
                ))}
                <p className="px-4 pt-3 text-xs font-semibold uppercase tracking-wider text-brand-charcoalSoft">Puppy Breeds</p>
                {BREEDS.slice(0, 10).map((b) => (
                  <Link key={b.slug} to={`/breed/${b.slug}`} className="block rounded-2xl px-4 py-2.5 text-sm text-brand-charcoal">
                    {b.name}
                  </Link>
                ))}
                <Link to="/about-us" className="block rounded-2xl px-4 py-3 font-semibold">About Us</Link>
                <Link to="/buying-pet" className="block rounded-2xl px-4 py-3 font-semibold">Buying a Puppy</Link>
                <Link to="/selling-pet" className="block rounded-2xl px-4 py-3 font-semibold">Selling a Puppy</Link>
              </nav>
              <div className="safe-pb border-t border-brand-beige p-4">
                <Link to="/login" className="btn-primary w-full" onClick={() => setOpen(false)}>
                  Login / Signup
                </Link>
              </div>
            </aside>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-brand-beige bg-white/95 backdrop-blur-md">
        <nav className="section flex items-center justify-between gap-3 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-teal text-white">
              <PawDecoration className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold leading-tight text-brand-ink sm:text-xl">
              Madhav Kennal
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.slice(0, 2).map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="relative">
              <button
                type="button"
                onClick={() => setBreedOpen((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-brand-charcoal hover:bg-brand-cream"
              >
                Puppy Breeds <ChevronDown className="h-4 w-4" />
              </button>
              {breedOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 grid w-[28rem] grid-cols-2 gap-1 rounded-2xl bg-white p-3 shadow-pop ring-1 ring-black/5">
                  {BREEDS.map((b) => (
                    <Link
                      key={b.slug}
                      to={`/breed/${b.slug}`}
                      onClick={() => setBreedOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm hover:bg-brand-cream"
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {NAV.slice(2).map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link to="/login" className="btn-primary !py-2.5 !text-xs">
              Login / Signup
            </Link>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-brand-teal/25 text-brand-teal lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>
      {drawer}
    </>
  );
}
