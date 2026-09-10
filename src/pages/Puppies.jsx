import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import FilterSidebar, { ageInBucket } from "../components/FilterSidebar.jsx";
import PuppyGrid from "../components/PuppyGrid.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import PawDecoration from "../components/PawDecoration.jsx";
import { PUPPIES } from "../data/puppies.js";
import { PRICE_LIMITS } from "../config/config.js";
import { puppyMatchesBreed } from "../utils/filterPuppies.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

const DEFAULT_FILTERS = {
  breed: "All Breeds",
  gender: "All",
  ageBucket: "all",
  minPrice: PRICE_LIMITS.min,
  maxPrice: PRICE_LIMITS.max,
  availability: ["Available"],
  q: "",
};

const filtersFromUrl = (sp) => {
  const availability = sp.get("availability");
  return {
    breed: sp.get("breed") || DEFAULT_FILTERS.breed,
    gender: sp.get("gender") || DEFAULT_FILTERS.gender,
    ageBucket: sp.get("age") || DEFAULT_FILTERS.ageBucket,
    minPrice: Number(sp.get("minPrice")) || DEFAULT_FILTERS.minPrice,
    maxPrice: Number(sp.get("maxPrice")) || DEFAULT_FILTERS.maxPrice,
    availability: availability
      ? availability.split(",").filter(Boolean)
      : DEFAULT_FILTERS.availability,
    q: sp.get("q") || "",
  };
};

const filtersToUrl = (f, { sort, favorites } = {}) => {
  const sp = new URLSearchParams();
  if (f.breed !== DEFAULT_FILTERS.breed) sp.set("breed", f.breed);
  if (f.gender !== DEFAULT_FILTERS.gender) sp.set("gender", f.gender);
  if (f.ageBucket !== DEFAULT_FILTERS.ageBucket) sp.set("age", f.ageBucket);
  if (f.minPrice !== DEFAULT_FILTERS.minPrice) sp.set("minPrice", String(f.minPrice));
  if (f.maxPrice !== DEFAULT_FILTERS.maxPrice) sp.set("maxPrice", String(f.maxPrice));
  if (
    f.availability.join(",") !== DEFAULT_FILTERS.availability.join(",") &&
    f.availability.length
  ) {
    sp.set("availability", f.availability.join(","));
  }
  if (f.q) sp.set("q", f.q);
  if (sort && sort !== "newest") sp.set("sort", sort);
  if (favorites) sp.set("favorites", "1");
  return sp;
};

const sortPuppies = (list, sort) => {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "age-asc":
      return copy.sort((a, b) => a.ageInMonths - b.ageInMonths);
    case "age-desc":
      return copy.sort((a, b) => b.ageInMonths - a.ageInMonths);
    case "newest":
    default:
      return copy.sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
  }
};

export default function Puppies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { ids: favoriteIds } = useFavorites();
  const filters = filtersFromUrl(searchParams);
  const sort = searchParams.get("sort") || "newest";
  const showFavorites = searchParams.get("favorites") === "1";
  const [drawerOpen, setDrawerOpen] = useState(false);

  usePageTitle(
    showFavorites
      ? "Saved Puppies | Madhav Kennal"
      : "Available Puppies | Madhav Kennal"
  );

  const writeParams = (nextFilters, nextSort = sort, nextFav = showFavorites) => {
    setSearchParams(filtersToUrl(nextFilters, { sort: nextSort, favorites: nextFav }), {
      replace: true,
    });
  };

  const setFilters = (updater) => {
    const next = typeof updater === "function" ? updater(filters) : updater;
    writeParams(next, sort, showFavorites);
  };

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return PUPPIES.filter((p) => {
      if (showFavorites && !favoriteIds.includes(p.id)) return false;
      if (!puppyMatchesBreed(p, filters.breed)) return false;
      if (filters.gender !== "All" && p.gender !== filters.gender) return false;
      if (!ageInBucket(p.ageInMonths, filters.ageBucket)) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (
        filters.availability.length > 0 &&
        !filters.availability.includes(p.availability)
      )
        return false;
      if (q) {
        const hay = `${p.name} ${p.breed} ${p.color} ${p.id}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [filters, showFavorites, favoriteIds]);

  const sorted = useMemo(() => sortPuppies(filtered, sort), [filtered, sort]);

  const resetAll = () => writeParams(DEFAULT_FILTERS, "newest", false);

  const activeFilterCount =
    (filters.breed !== "All Breeds" ? 1 : 0) +
    (filters.gender !== "All" ? 1 : 0) +
    (filters.ageBucket !== "all" ? 1 : 0) +
    (filters.minPrice !== PRICE_LIMITS.min || filters.maxPrice !== PRICE_LIMITS.max ? 1 : 0) +
    (filters.availability.join(",") !== "Available" ? 1 : 0) +
    (filters.q ? 1 : 0) +
    (showFavorites ? 1 : 0);

  return (
    <section className="relative py-10 sm:py-14">
      <div className="section">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="kicker">
              <PawDecoration className="h-3 w-3" /> Browse
            </span>
            <h1 className="mt-3 h-display text-brand-ink">
              {showFavorites ? "Saved Puppies" : "Available Puppies"}
            </h1>
            <p className="mt-2 text-brand-charcoalSoft">
              {showFavorites
                ? "Puppies you’ve saved while browsing."
                : "Find a loving companion that's right for you."}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:w-auto">
            <SearchBar
              value={filters.q}
              onChange={(v) => setFilters((f) => ({ ...f, q: v }))}
              className="w-full sm:min-w-[16rem] sm:flex-1 md:w-72 md:flex-none"
            />
            <SortDropdown
              value={sort}
              onChange={(value) => writeParams(filters, value, showFavorites)}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      <div className="section mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-24 h-[calc(100vh-7rem)]">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={resetAll}
              resultCount={sorted.length}
            />
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-brand-cream/60 px-5 py-3">
            <p className="text-sm font-semibold text-brand-ink">
              <span className="text-brand-teal">{sorted.length}</span>{" "}
              {sorted.length === 1 ? "Puppy" : "Puppies"} Found
            </p>
            <div className="flex items-center gap-2">
              {showFavorites && (
                <button
                  type="button"
                  onClick={() => writeParams(filters, sort, false)}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-coral"
                >
                  Clear saved view
                </button>
              )}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="btn-ghost !py-2 !text-xs lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            </div>
          </div>
          <PuppyGrid puppies={sorted} />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          drawerOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          className={`absolute inset-0 bg-brand-ink/50 backdrop-blur-sm transition-opacity ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[92vh] transition-transform duration-300 ${
            drawerOpen ? "translate-y-0" : "translate-y-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Filter puppies"
        >
          <div className="mx-auto max-w-3xl">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={resetAll}
              onClose={() => setDrawerOpen(false)}
              resultCount={sorted.length}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
