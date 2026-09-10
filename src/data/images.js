/** Local assets from /public/images (WebP, compressed for fast loads) */

export const IMG = {
  husky: ["/images/husky-1.webp", "/images/husky-2.webp", "/images/husky-3.webp"],
  beagle: ["/images/beagle-1.webp", "/images/beagle-2.webp", "/images/beagle-3.webp"],
  lab: ["/images/lab-1.webp", "/images/lab-2.webp", "/images/lab-3.webp", "/images/lab-4.webp"],
  golden: ["/images/golden-1.webp", "/images/golden-2.webp", "/images/golden-3.webp", "/images/golden-4.webp"],
  shihtzu: ["/images/shihtzu-1.webp", "/images/shihtzu-2.webp", "/images/shihtzu-3.webp"],
  pom: ["/images/pom-1.webp", "/images/pom-2.webp", "/images/pom-3.webp"],
  gsd: ["/images/gsd-1.webp", "/images/gsd-2.webp", "/images/gsd-3.webp", "/images/gsd-4.webp"],
  pug: ["/images/pug-1.webp", "/images/pug-2.webp", "/images/pug-3.webp"],
  frenchie: ["/images/frenchie-1.webp", "/images/frenchie-2.webp", "/images/frenchie-3.webp"],
  rottie: ["/images/rottie-1.webp", "/images/rottie-2.webp", "/images/rottie-3.webp"],
  dobe: ["/images/dobe-1.webp", "/images/dobe-2.webp", "/images/dobe-3.webp"],
  cocker: ["/images/cocker-1.webp", "/images/cocker-2.webp", "/images/cocker-3.webp"],
  family: "/images/family-1.webp",
  sleep: "/images/sleep-1.webp",
  people: ["/images/person-1.webp", "/images/person-2.webp", "/images/person-3.webp", "/images/person-4.webp"],
};

const BREED_KEY = {
  "Siberian Husky": "husky",
  Beagle: "beagle",
  Labrador: "lab",
  "Golden Retriever": "golden",
  "Shih-Tzu": "shihtzu",
  Pomeranian: "pom",
  "German Shepherd": "gsd",
  Pug: "pug",
  "French Bulldog": "frenchie",
  Rottweiler: "rottie",
  Doberman: "dobe",
  "Cocker Spaniel": "cocker",
};

export function breedImages(breedName, count = 3) {
  const key = BREED_KEY[breedName] || "lab";
  const list = IMG[key] || IMG.lab;
  const out = [];
  for (let i = 0; i < count; i++) out.push(list[i % list.length]);
  return out;
}

export function breedHero(breedName) {
  return breedImages(breedName, 1)[0];
}

/** Rotate kennel photos for city cards / blogs when no dedicated city art exists */
export function kennelPhoto(index = 0) {
  const pool = [
    ...IMG.lab,
    ...IMG.golden,
    ...IMG.beagle,
    ...IMG.husky,
    IMG.family,
    IMG.sleep,
    ...IMG.gsd,
    ...IMG.pom,
  ];
  return pool[index % pool.length];
}
