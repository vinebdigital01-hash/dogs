import { BREEDS } from "../data/breeds.js";

const KNOWN_BREEDS = new Set(BREEDS.map((b) => b.name));

const BREED_ALIASES = {
  Husky: "Siberian Husky",
  "Frenchie": "French Bulldog",
};

export const resolveBreedName = (breed) => BREED_ALIASES[breed] || breed;

export const puppyMatchesBreed = (puppy, breed) => {
  if (!breed || breed === "All Breeds") return true;
  if (breed === "Other") return !KNOWN_BREEDS.has(puppy.breed);
  const resolved = resolveBreedName(breed);
  if (puppy.breed === resolved || puppy.breed === breed) return true;
  if (breed === "Husky") return puppy.breed.toLowerCase().includes("husky");
  return false;
};
