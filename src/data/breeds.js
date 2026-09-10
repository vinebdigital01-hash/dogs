/**
 * Breed catalogue.
 * `image` fields use high-quality Unsplash photography.
 * Available-puppy counts are derived dynamically from puppies.js at runtime.
 */

export const BREEDS = [
  {
    slug: "golden-retriever",
    name: "Golden Retriever",
    tagline: "Friendly · Loyal · Family favourite",
    image:
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80",
    accent: "from-amber-200 to-amber-50",
  },
  {
    slug: "labrador",
    name: "Labrador",
    tagline: "Playful · Gentle · Great with kids",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
    accent: "from-yellow-200 to-yellow-50",
  },
  {
    slug: "german-shepherd",
    name: "German Shepherd",
    tagline: "Intelligent · Protective · Trainable",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=900&q=80",
    accent: "from-orange-200 to-orange-50",
  },
  {
    slug: "shih-tzu",
    name: "Shih Tzu",
    tagline: "Affectionate · Small · Cuddly",
    image:
      "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=80",
    accent: "from-rose-200 to-rose-50",
  },
  {
    slug: "pomeranian",
    name: "Pomeranian",
    tagline: "Fluffy · Compact · Full of personality",
    image:
      "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=80",
    accent: "from-amber-100 to-orange-50",
  },
  {
    slug: "husky",
    name: "Siberian Husky",
    tagline: "Energetic · Striking · Social",
    image:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=900&q=80",
    accent: "from-sky-200 to-sky-50",
  },
  {
    slug: "beagle",
    name: "Beagle",
    tagline: "Curious · Merry · Friendly",
    image:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=900&q=80",
    accent: "from-orange-200 to-yellow-50",
  },
  {
    slug: "rottweiler",
    name: "Rottweiler",
    tagline: "Confident · Loyal · Guardian",
    image:
      "https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&w=900&q=80",
    accent: "from-neutral-300 to-neutral-100",
  },
  {
    slug: "doberman",
    name: "Doberman",
    tagline: "Alert · Sleek · Devoted",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
    accent: "from-neutral-300 to-neutral-100",
  },
  {
    slug: "pug",
    name: "Pug",
    tagline: "Charming · Playful · Compact",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
    accent: "from-amber-100 to-amber-50",
  },
  {
    slug: "french-bulldog",
    name: "French Bulldog",
    tagline: "Adaptable · Sweet · Iconic",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
    accent: "from-stone-200 to-stone-50",
  },
  {
    slug: "cocker-spaniel",
    name: "Cocker Spaniel",
    tagline: "Gentle · Affectionate · Elegant",
    image:
      "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=900&q=80",
    accent: "from-amber-200 to-rose-50",
  },
];

// Convenience list for filter dropdowns
export const BREED_NAMES = ["All Breeds", ...BREEDS.map((b) => b.name), "Other"];
