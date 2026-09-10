import React, { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import FilterSidebar from "../components/FilterSidebar.jsx";
import PuppyGrid from "../components/PuppyGrid.jsx";
import TestimonialStrip from "../components/TestimonialStrip.jsx";
import TrustStrip from "../components/TrustStrip.jsx";
import { PUPPIES } from "../data/puppies.js";
import { CITIES_DATA } from "../data/cities.js";
import { getBreedBySlug, getBreedByName } from "../data/breeds.js";
import { PRICE_LIMITS } from "../config/config.js";
import { applyPuppyFilters, sortPuppies } from "../utils/filterPuppies.js";
import { useCity } from "../context/CityContext.jsx";
import usePageTitle from "../hooks/usePageTitle.js";

const PAGE_SIZE = 9;

const DEFAULT_FILTERS = {
  q: "",
  breeds: [],
  gender: "All",
  size: "all",
  age: "all",
  minPrice: PRICE_LIMITS.min,
  maxPrice: PRICE_LIMITS.max,
};

function filtersFromUrl(sp) {
  const breeds = sp.get("breeds");
  return {
    q: sp.get("q") || "",
    breeds: breeds ? breeds.split(",").filter(Boolean) : [],
    gender: sp.get("gender") || "All",
    size: sp.get("size") || "all",
    age: sp.get("age") || "all",
    minPrice: Number(sp.get("minPrice")) || DEFAULT_FILTERS.minPrice,
    maxPrice: Number(sp.get("maxPrice")) || DEFAULT_FILTERS.maxPrice,
  };
}

function filtersToUrl(f, sort) {
  const sp = new URLSearchParams();
  if (f.q) sp.set("q", f.q);
  if (f.breeds?.length) sp.set("breeds", f.breeds.join(","));
  if (f.gender !== "All") sp.set("gender", f.gender);
  if (f.size !== "all") sp.set("size", f.size);
  if (f.age !== "all") sp.set("age", f.age);
  if (f.minPrice !== DEFAULT_FILTERS.minPrice) sp.set("minPrice", String(f.minPrice));
  if (f.maxPrice !== DEFAULT_FILTERS.maxPrice) sp.set("maxPrice", String(f.maxPrice));
  if (sort && sort !== "newest") sp.set("sort", sort);
  return sp;
}

export default function PuppyListing() {
  const { breed: breedParam, city: cityParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { city: selectedCity } = useCity();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filters = filtersFromUrl(searchParams);
  const sort = searchParams.get("sort") || "newest";

  const breedFromPath =
    breedParam
      ? getBreedBySlug(breedParam)?.name || getBreedByName(breedParam)?.name || breedParam
      : "";
  const cityFromPath = cityParam
    ? CITIES_DATA.find((c) => c.slug === cityParam)?.name || cityParam.replace(/-/g, " ")
    : "";

  const displayCity = cityFromPath || selectedCity;

  usePageTitle(
    breedFromPath
      ? `${breedFromPath} Puppies | Madhav Kennal`
      : `Puppies for Sale in ${displayCity} | Madhav Kennal`
  );

  const writeParams = (nextFilters, nextSort = sort) => {
    setSearchParams(filtersToUrl(nextFilters, nextSort), { replace: true });
    setVisible(PAGE_SIZE);
  };

  const setFilters = (updater) => {
    const next = typeof updater === "function" ? updater(filters) : updater;
    writeParams(next, sort);
  };

  const filtered = useMemo(() => {
    let list = applyPuppyFilters(PUPPIES, {
      ...filters,
      breed: breedFromPath,
      city: cityFromPath,
    });
    return sortPuppies(list, sort);
  }, [filters, breedFromPath, cityFromPath, sort]);

  const shown = filtered.slice(0, visible);

  return (
    <>
      <section className="page-banner">
        <div className="section relative z-10">
          <p className="text-sm font-semibold text-white/80">Madhav Kennal Marketplace</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            {filtered.length} Puppies for Sale
            {breedFromPath ? ` — ${breedFromPath}` : ""} in {displayCity}
          </h1>
          {breedFromPath && (
            <Link to={`/breed/${breedParam || breedFromPath.toLowerCase().replace(/\s+/g, "-")}`} className="mt-4 inline-block text-sm font-semibold text-brand-gold hover:underline">
              Learn everything about {breedFromPath} →
            </Link>
          )}
        </div>
      </section>

      <TestimonialStrip />

      <section className="section py-8 sm:py-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="btn-ghost !py-2.5 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => writeParams(filters, e.target.value)}
            className="rounded-full border border-brand-beige bg-white px-4 py-2.5 text-sm font-semibold outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="age-asc">Age: Youngest</option>
            <option value="age-desc">Age: Oldest</option>
          </select>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={() => writeParams(DEFAULT_FILTERS, "newest")}
              resultCount={filtered.length}
            />
          </div>

          <div>
            <PuppyGrid puppies={shown} animated emptyMessage="No puppies match these filters. Try clearing a few." />
            {visible < filtered.length && (
              <div className="mt-10 text-center">
                <button type="button" className="btn-primary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-brand-ink/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[min(92vw,22rem)] overflow-y-auto bg-white p-3 shadow-pop">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={() => writeParams(DEFAULT_FILTERS, "newest")}
              onClose={() => setDrawerOpen(false)}
              resultCount={filtered.length}
            />
          </div>
        </div>
      )}

      <TrustStrip />
    </>
  );
}
