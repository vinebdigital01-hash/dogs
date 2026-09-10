/** Local assets from /public/images */

export const IMG = {
  husky: ["/images/husky-1.jpg", "/images/husky-2.jpg", "/images/husky-3.jpg"],
  beagle: ["/images/beagle-1.jpg", "/images/beagle-2.jpg", "/images/beagle-3.jpg"],
  lab: ["/images/lab-1.jpg", "/images/lab-2.jpg", "/images/lab-3.jpg", "/images/lab-4.jpg"],
  golden: ["/images/golden-1.jpg", "/images/golden-2.jpg", "/images/golden-3.jpg", "/images/golden-4.jpg"],
  shihtzu: ["/images/shihtzu-1.jpg", "/images/shihtzu-2.jpg", "/images/shihtzu-3.jpg"],
  pom: ["/images/pom-1.jpg", "/images/pom-2.jpg", "/images/pom-3.jpg"],
  gsd: ["/images/gsd-1.jpg", "/images/gsd-2.jpg", "/images/gsd-3.jpg", "/images/gsd-4.jpg"],
  pug: ["/images/pug-1.jpg", "/images/pug-2.jpg", "/images/pug-3.jpg"],
  frenchie: ["/images/frenchie-1.jpg", "/images/frenchie-2.jpg", "/images/frenchie-3.jpg"],
  rottie: ["/images/rottie-1.jpg", "/images/rottie-2.jpg", "/images/rottie-3.jpg"],
  dobe: ["/images/dobe-1.jpg", "/images/dobe-2.jpg", "/images/dobe-3.jpg"],
  cocker: ["/images/cocker-1.jpg", "/images/cocker-2.jpg", "/images/cocker-3.jpg"],
  family: "/images/family-1.jpg",
  sleep: "/images/sleep-1.jpg",
  people: ["/images/person-1.jpg", "/images/person-2.jpg", "/images/person-3.jpg", "/images/person-4.jpg"],
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
