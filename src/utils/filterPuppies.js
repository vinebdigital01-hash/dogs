import { AGE_OPTIONS } from "../data/cities.js";
import { BREEDS } from "../data/breeds.js";

const KNOWN_BREEDS = new Set(BREEDS.map((b) => b.name));

export const resolveBreedName = (breed) => breed;

export const puppyMatchesBreed = (puppy, breed) => {
  if (!breed || breed === "All Breeds") return true;
  if (breed === "Other") return !KNOWN_BREEDS.has(puppy.breed);
  return puppy.breed === breed || puppy.breed.toLowerCase().includes(String(breed).toLowerCase());
};

export function ageMatches(ageWeeks, ageValue) {
  if (!ageValue || ageValue === "all") return true;
  const opt = AGE_OPTIONS.find((a) => a.value === ageValue);
  if (!opt || opt.min == null) return true;
  return ageWeeks >= opt.min && ageWeeks <= opt.max;
}

export function applyPuppyFilters(list, filters = {}) {
  const {
    q = "",
    breeds = [],
    breed = "",
    gender = "All",
    size = "all",
    age = "all",
    minPrice = 0,
    maxPrice = 100000,
    city = "",
  } = filters;

  const qLower = q.trim().toLowerCase();

  return list.filter((p) => {
    if (qLower) {
      const hay = `${p.name} ${p.breed} ${p.city} ${p.color}`.toLowerCase();
      if (!hay.includes(qLower)) return false;
    }
    if (breeds?.length && !breeds.includes(p.breed)) return false;
    if (breed && !puppyMatchesBreed(p, breed)) return false;
    if (gender && gender !== "All") {
      if (p.gender.toLowerCase() !== gender.toLowerCase()) return false;
    }
    if (size && size !== "all" && size !== "training") {
      if (p.size !== size) return false;
    }
    if (!ageMatches(p.ageWeeks ?? 0, age)) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (city) {
      const slugCity = city.toLowerCase().replace(/-/g, " ");
      const puppyCity = (p.city || p.location || "").toLowerCase();
      if (!puppyCity.includes(slugCity) && !slugCity.includes(puppyCity)) return false;
    }
    return true;
  });
}

export function sortPuppies(list, sort = "newest") {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "age-asc":
      return copy.sort((a, b) => (a.ageWeeks || 0) - (b.ageWeeks || 0));
    case "age-desc":
      return copy.sort((a, b) => (b.ageWeeks || 0) - (a.ageWeeks || 0));
    case "newest":
    default:
      return copy.sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
  }
}
